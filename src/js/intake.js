/**
 * Intake Module — File upload + processing queue display
 */
import { db, addDoc, collection, serverTimestamp } from './firebase-config.js';
import { getCurrentUser } from './auth.js';

/**
 * Compute SHA-256 hash of a file
 */
async function hashFile(file) {
  const buffer = await file.arrayBuffer();
  const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Log uploaded document metadata to Firestore
 */
async function logUpload(file, sha256) {
  const user = getCurrentUser();
  try {
    await addDoc(collection(db, 'documents'), {
      filename: file.name,
      sha256: sha256,
      size_bytes: file.size,
      mime_type: file.type,
      upload_date: serverTimestamp(),
      uploader_uid: user?.uid || 'anonymous',
      uploader_email: user?.email || 'unknown',
      processing_status: 'PENDING',
      extracted_entities: [],
    });
    return true;
  } catch (err) {
    console.warn('[Intake] Firestore log failed:', err.message);
    return false;
  }
}

/**
 * Handle file selection or drop
 */
async function handleFiles(files) {
  const queue = document.getElementById('processingQueue');

  for (const file of files) {
    // Create queue card
    const card = document.createElement('div');
    card.className = 'p-4 rounded-lg bg-zinc-900 border border-zinc-800 space-y-2';

    const sha = await hashFile(file);
    const shortHash = sha.substring(0, 12);

    card.innerHTML = `
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-2">
          <span class="text-sm font-medium text-zinc-200">${file.name}</span>
          <span class="text-[10px] font-mono text-zinc-500">${(file.size / 1024).toFixed(1)} KB</span>
        </div>
        <span class="status-badge px-2 py-0.5 rounded text-[10px] font-mono font-bold status-pending">PENDING</span>
      </div>
      <div class="text-[10px] font-mono text-zinc-600">SHA-256: ${shortHash}…</div>
      <div class="progress-bar w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
        <div class="h-full bg-teal-500 rounded-full transition-all duration-700" style="width: 0%"></div>
      </div>
    `;

    // Replace empty state or append
    if (queue.querySelector('.text-center')) {
      queue.innerHTML = '';
    }
    queue.prepend(card);

    // Log to Firestore
    await logUpload(file, sha);

    // Animate progress stages
    const bar = card.querySelector('.progress-bar > div');
    const badge = card.querySelector('.status-badge');

    // Stage 1: Uploading
    setTimeout(() => {
      bar.style.width = '25%';
      badge.textContent = 'UPLOADING';
      badge.className = 'status-badge px-2 py-0.5 rounded text-[10px] font-mono font-bold status-processing';
    }, 300);

    // Stage 2: Uploaded (waiting for Python pipeline)
    setTimeout(() => {
      bar.style.width = '50%';
      badge.textContent = 'AWAITING PIPELINE';
      badge.className = 'status-badge px-2 py-0.5 rounded text-[10px] font-mono font-bold status-processing';
    }, 1200);

    // Stage 3: The real processing happens on the Python side
    // Status will update via Firestore onSnapshot listener
  }
}

/**
 * Handle paste submission
 */
async function handlePaste() {
  const textarea = document.getElementById('pasteInput');
  const text = textarea?.value?.trim();
  if (!text) return;

  const queue = document.getElementById('processingQueue');
  const card = document.createElement('div');
  card.className = 'p-4 rounded-lg bg-zinc-900 border border-zinc-800 space-y-2';

  const preview = text.substring(0, 80) + (text.length > 80 ? '…' : '');

  card.innerHTML = `
    <div class="flex items-center justify-between">
      <span class="text-sm font-medium text-zinc-200">Pasted Text</span>
      <span class="px-2 py-0.5 rounded text-[10px] font-mono font-bold status-pending">PENDING</span>
    </div>
    <p class="text-xs text-zinc-500">${preview}</p>
  `;

  if (queue.querySelector('.text-center')) {
    queue.innerHTML = '';
  }
  queue.prepend(card);

  // Log to Firestore
  try {
    await addDoc(collection(db, 'documents'), {
      filename: 'pasted_text.txt',
      sha256: '',
      size_bytes: text.length,
      mime_type: 'text/plain',
      upload_date: serverTimestamp(),
      uploader_uid: getCurrentUser()?.uid || 'anonymous',
      uploader_email: getCurrentUser()?.email || 'unknown',
      processing_status: 'PENDING',
      extracted_entities: [],
      raw_text: text.substring(0, 10000), // Store first 10K chars
    });
  } catch (err) {
    console.warn('[Intake] Paste log failed:', err.message);
  }

  textarea.value = '';
}

/**
 * Update processing queue from Firestore documents snapshot
 */
export function updateProcessingQueue(documents) {
  const queue = document.getElementById('processingQueue');
  if (!queue || !documents.length) return;

  queue.innerHTML = documents.slice(0, 20).map(d => {
    const statusClass = {
      'PENDING': 'status-pending',
      'PROCESSING': 'status-processing',
      'VERIFIED': 'status-verified',
      'MERGED': 'status-merged',
    }[d.processing_status] || 'status-pending';

    const date = d.upload_date?.toDate?.()
      ? d.upload_date.toDate().toLocaleDateString()
      : '';

    return `
      <div class="p-4 rounded-lg bg-zinc-900 border border-zinc-800">
        <div class="flex items-center justify-between">
          <div>
            <span class="text-sm font-medium text-zinc-200">${d.filename || 'Unknown'}</span>
            <span class="text-[10px] font-mono text-zinc-600 ml-2">${date}</span>
          </div>
          <span class="px-2 py-0.5 rounded text-[10px] font-mono font-bold ${statusClass}">
            ${d.processing_status || 'PENDING'}
          </span>
        </div>
        ${d.extracted_entities?.length ? `<p class="text-xs text-zinc-500 mt-1">${d.extracted_entities.length} entities extracted</p>` : ''}
      </div>
    `;
  }).join('');
}

/**
 * Initialize intake studio
 */
export function initIntake() {
  const dropZone = document.getElementById('dropZone');
  const fileInput = document.getElementById('fileInput');

  // Click to upload
  dropZone?.addEventListener('click', () => fileInput?.click());

  // File input change
  fileInput?.addEventListener('change', (e) => {
    if (e.target.files.length) handleFiles(e.target.files);
  });

  // Drag & drop
  dropZone?.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropZone.classList.add('border-teal-500/50', 'bg-teal-500/5');
  });
  dropZone?.addEventListener('dragleave', () => {
    dropZone.classList.remove('border-teal-500/50', 'bg-teal-500/5');
  });
  dropZone?.addEventListener('drop', (e) => {
    e.preventDefault();
    dropZone.classList.remove('border-teal-500/50', 'bg-teal-500/5');
    if (e.dataTransfer.files.length) handleFiles(e.dataTransfer.files);
  });

  // Paste submission
  document.getElementById('btnSubmitPaste')?.addEventListener('click', handlePaste);
}
