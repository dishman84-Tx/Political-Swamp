/**
 * Intake Studio: records candidate evidence, NEVER verifies allegations.
 * Filename-only uploads are metadata-only until the underlying file can be
 * inspected by a separately authorized document-review process.
 */
import { db, addDoc, collection, serverTimestamp } from './firebase-config.js';
import { getCurrentUser } from './auth.js';
import { getEntities } from './firestore.js';

function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>"']/g, ch => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  })[ch]);
}

function normalizeName(value) {
  return String(value ?? '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
}

/**
 * Conservative candidate-only name matching. Explicit entity names and
 * curated aliases are the only accepted matches. Broad subject keywords,
 * shared surnames, and guessed family ties must never attach a person.
 */
function extractEntitiesFromText(filename, text) {
  const corpus = ' ' + normalizeName(String(filename || '') + ' ' + String(text || '')) + ' ';
  const matches = new Set();
  for (const entity of getEntities()) {
    if (!entity?.id) continue;
    const names = [entity.label, ...(Array.isArray(entity.aliases) ? entity.aliases : [])];
    for (const raw of names) {
      const candidate = normalizeName(String(raw ?? '').replace(
        /^(?:comm\.?|commissioner|judge|rep\.?|sen\.?|sheriff|constable|capt\.?|lt\.?|chief)\s+/i, ''
      ));
      if (candidate.length >= 6 && candidate.split(' ').length >= 2
          && corpus.includes(' ' + candidate + ' ')) {
        matches.add(entity.id);
        break;
      }
    }
  }
  return [...matches];
}

function detectJurisdiction(filename, text) {
  const c = normalizeName(String(filename || '') + ' ' + String(text || ''));
  if (/\bmontgomery\b|\bmcdao\b|\bmcso\b|\bhfd\b/.test(c)) return 'Multiple jurisdictions — review';
  if (/\bliberty\b/.test(c)) return 'Liberty County — tentative';
  return 'Jurisdiction undetermined';
}

async function sha256(bytes) {
  const digest = await crypto.subtle.digest('SHA-256', bytes);
  return [...new Uint8Array(digest)].map(x => x.toString(16).padStart(2, '0')).join('');
}

async function logCandidate({ filename, hash, size, mime, matches, jurisdiction, rawText }) {
  const user = getCurrentUser();
  if (!user?.uid || !user?.email) throw new Error('Sign in required for intake');
  const record = {
    filename, sha256: hash, size_bytes: size, mime_type: mime || 'application/octet-stream',
    upload_date: serverTimestamp(), uploader_uid: user.uid, uploader_email: user.email,
    processing_status: 'NEEDS_REVIEW', extracted_entities: matches,
    summary: matches.length + ' tentative exact-name match(es); no facts verified',
    jurisdiction
  };
  if (rawText !== undefined) record.raw_text = rawText.slice(0, 10000);
  await addDoc(collection(db, 'documents'), record);
}

function badge() {
  return '<span class="text-xs font-bold text-amber-300">NEEDS REVIEW</span>';
}

function entityButtons(ids) {
  const all = getEntities();
  return ids.map(id => {
    const label = all.find(e => e.id === id)?.label || id;
    return '<button type="button" class="px-2 py-1 text-xs text-teal-300 border border-zinc-700 rounded" data-entity-id="'
      + escapeHtml(id) + '">' + escapeHtml(label) + '</button>';
  }).join(' ');
}

function showCandidate({ filename, hash, matches, jurisdiction, persisted, message }) {
  const queue = document.getElementById('processingQueue');
  if (!queue) return;
  const card = document.createElement('div');
  card.className = 'p-4 rounded-lg bg-zinc-900 border border-amber-700/50 space-y-2';
  const storage = persisted ? 'SAVED FOR REVIEW' : 'NOT SAVED — RETRY';
  card.innerHTML =
    '<div class="flex justify-between gap-2"><strong class="text-sm">'
    + escapeHtml(filename) + '</strong>' + badge() + '</div>'
    + '<div class="text-xs text-zinc-400">' + escapeHtml(storage)
    + ' · SHA-256 ' + escapeHtml(hash.slice(0, 12)) + '…</div>'
    + '<div class="text-xs text-zinc-400">' + escapeHtml(jurisdiction) + '</div>'
    + (message ? '<p class="text-xs text-amber-300">' + escapeHtml(message) + '</p>' : '')
    + (matches.length ? '<div class="flex gap-1 flex-wrap">' + entityButtons(matches) + '</div>' : '');
  const empty = queue.querySelector('.text-center');
  if (empty) empty.remove();
  queue.prepend(card);
}

async function handleFiles(files) {
  for (const file of files) {
    const hash = await sha256(await file.arrayBuffer());
    // A filename can supply a candidate lead. File bytes are NOT parsed here.
    const matches = extractEntitiesFromText(file.name, '');
    const jurisdiction = detectJurisdiction(file.name, '');
    let persisted = false, message = 'Filename-only screening; source content not examined';
    try {
      await logCandidate({ filename: file.name, hash, size: file.size,
        mime: file.type, matches, jurisdiction });
      persisted = true;
    } catch (err) {
      console.warn('[Intake] Could not save candidate:', err);
      message += '; database save failed';
    }
    showCandidate({ filename: file.name, hash, matches, jurisdiction, persisted, message });
  }
}

async function handlePaste() {
  const input = document.getElementById('pasteInput');
  const text = input?.value?.trim();
  if (!text) return;
  const hash = await sha256(new TextEncoder().encode(text));
  const matches = extractEntitiesFromText('', text);
  const jurisdiction = detectJurisdiction('', text);
  let persisted = false;
  try {
    await logCandidate({ filename: 'pasted_evidence_text.txt', hash,
      size: new TextEncoder().encode(text).length, mime: 'text/plain',
      matches, jurisdiction, rawText: text });
    persisted = true;
  } catch (err) {
    console.warn('[Intake] Could not save pasted candidate:', err);
  }
  showCandidate({ filename: 'Pasted text', hash, matches, jurisdiction, persisted,
    message: persisted ? 'Unverified text submitted for review' : 'Database save failed' });
  if (persisted) input.value = '';
}

export function updateProcessingQueue(documents) {
  const queue = document.getElementById('processingQueue');
  if (!queue || !Array.isArray(documents) || !documents.length) return;
  queue.innerHTML = '';
  for (const d of documents.slice(0, 25)) {
    const matches = Array.isArray(d.extracted_entities) ? d.extracted_entities : [];
    const status = d.processing_status === 'VERIFIED' || d.processing_status === 'MERGED'
      ? 'LEGACY VERIFIED — REVIEW PROVENANCE' : 'NEEDS REVIEW';
    const date = d.upload_date?.toDate?.()?.toLocaleDateString?.() || 'Date unavailable';
    const card = document.createElement('div');
    card.className = 'p-3 rounded-lg bg-zinc-900 border border-zinc-800 space-y-1';
    card.innerHTML = '<div class="text-sm font-bold">' + escapeHtml(d.filename || 'Evidence record') + '</div>'
      + '<div class="text-xs text-amber-300">' + escapeHtml(status) + ' · ' + escapeHtml(date) + '</div>'
      + '<div class="text-xs text-zinc-400">' + escapeHtml(d.summary || '') + '</div>'
      + (matches.length ? '<div class="flex gap-1 flex-wrap">' + entityButtons(matches) + '</div>' : '');
    queue.appendChild(card);
  }
}

export function initIntake() {
  const zone = document.getElementById('dropZone');
  const input = document.getElementById('fileInput');
  zone?.addEventListener('click', () => input?.click());
  input?.addEventListener('change', e => { if (e.target.files?.length) handleFiles(e.target.files); });
  zone?.addEventListener('dragover', e => { e.preventDefault(); });
  zone?.addEventListener('drop', e => {
    e.preventDefault();
    if (e.dataTransfer.files?.length) handleFiles(e.dataTransfer.files);
  });
  document.getElementById('btnSubmitPaste')?.addEventListener('click', handlePaste);
  document.getElementById('processingQueue')?.addEventListener('click', e => {
    const btn = e.target?.closest?.('[data-entity-id]');
    if (btn && typeof window.__openEntityDrawer === 'function') {
      window.__openEntityDrawer(btn.dataset.entityId);
    }
  });
}
