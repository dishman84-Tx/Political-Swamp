/**
 * Drawer Module — Slide-out entity detail panel
 */
import { getEdges } from './firestore.js';
import { getEvidenceDossier } from './evidence_dossier.js';

const CARTEL_BADGE_CLASS = {
  'Developer & Bond Syndicate':                    'cartel-developer',
  'Law Enforcement, Inquest & Death Suppression':  'cartel-law',
  'School Board, CAD & Construction Arbitrage':    'cartel-school',
  'Judicial & Prosecutorial Family Dynasty':       'cartel-judicial',
};

function getRiskClass(score) {
  if (score >= 90) return 'risk-critical';
  if (score >= 70) return 'risk-high';
  if (score >= 40) return 'risk-medium';
  return 'risk-low';
}

function getRiskColor(score) {
  if (score >= 90) return '#ef4444';
  if (score >= 70) return '#f97316';
  if (score >= 40) return '#eab308';
  return '#22c55e';
}

/**
 * Open the entity detail drawer
 */
export function openDrawer(nodeData, edgesOverride) {
  const drawer = document.getElementById('entityDrawer');
  const backdrop = document.getElementById('drawerBackdrop');

  // Populate fields
  document.getElementById('drawerLabel').textContent = nodeData.label || nodeData.id;
  document.getElementById('drawerRole').textContent = nodeData.role || '';
  document.getElementById('drawerStatus').textContent = nodeData.status || 'Active';
  document.getElementById('drawerNotes').textContent = nodeData.notes || 'No investigative notes available.';

  // Cartel badge
  const badge = document.getElementById('drawerCartelBadge');
  badge.textContent = nodeData.cartel || 'Unknown';
  badge.className = `px-3 py-1 rounded-full text-xs font-mono font-bold ${CARTEL_BADGE_CLASS[nodeData.cartel] || 'cartel-developer'}`;

  // Risk score
  const riskNum = document.getElementById('drawerRiskNum');
  const riskBar = document.getElementById('drawerRiskBar');
  const score = nodeData.risk_score || 0;
  riskNum.textContent = score;
  riskNum.style.color = getRiskColor(score);
  riskBar.style.width = `${score}%`;
  riskBar.className = `h-full rounded-full transition-all duration-500 ${getRiskClass(score)}`;

  // Evidence anchors
  const anchorsList = document.getElementById('drawerAnchors');
  const anchors = nodeData.anchors || [];
  const safeEntityLabel = (nodeData.label || nodeData.id || '').replace(/'/g, "\\'");
  anchorsList.innerHTML = anchors.length
    ? anchors.map(a => {
        const safeAnchor = a.replace(/'/g, "\\'");
        return `
          <li class="p-2.5 rounded-lg bg-zinc-800/40 border border-zinc-700/50 hover:bg-zinc-800 hover:border-teal-500/60 cursor-pointer transition-all duration-150 group"
              onclick="window.__openEvidenceModal && window.__openEvidenceModal('${safeAnchor}', '${safeEntityLabel}')">
            <div class="flex items-start justify-between gap-2">
              <div class="flex items-start gap-2 min-w-0">
                <span class="text-teal-400 shrink-0 mt-0.5">📂</span>
                <span class="text-zinc-200 text-sm font-medium group-hover:text-teal-300 leading-snug">${a}</span>
              </div>
              <span class="text-xs font-mono text-teal-400/80 group-hover:text-teal-300 flex items-center gap-1 shrink-0 pt-0.5">
                Sources <span class="group-hover:translate-x-0.5 transition-transform">→</span>
              </span>
            </div>
          </li>
        `;
      }).join('')
    : '<li class="text-zinc-500 text-sm">No anchors documented.</li>';

  // Connected edges
  const edgesContainer = document.getElementById('drawerEdges');
  const allEdges = edgesOverride || getEdges();
  const connected = allEdges.filter(e => e.source === nodeData.id || e.target === nodeData.id);

  if (connected.length) {
    edgesContainer.innerHTML = connected.map(e => {
      const other = e.source === nodeData.id ? e.target : e.source;
      const typeLabel = (e.label || e.type || '').replace(/_/g, ' ');
      return `
        <div class="flex items-center justify-between p-2.5 rounded-lg bg-zinc-800/50 border border-zinc-700/50 cursor-pointer hover:bg-zinc-800 transition-colors"
             onclick="window.__focusNode && window.__focusNode('${other}')">
          <div class="flex items-center gap-2">
            <span class="text-zinc-400">→</span>
            <span class="text-zinc-200 text-sm font-medium">${other.replace(/_/g, ' ')}</span>
          </div>
          <span class="text-xs font-mono text-zinc-500">${typeLabel}</span>
        </div>
      `;
    }).join('');
  } else {
    edgesContainer.innerHTML = '<p class="text-zinc-500 text-sm">No connections.</p>';
  }

  // Surveys
  const surveys = nodeData.surveys || [];
  const surveysSection = document.getElementById('drawerSurveysSection');
  const surveysList = document.getElementById('drawerSurveys');
  if (surveys.length) {
    surveysSection.classList.remove('hidden');
    surveysList.innerHTML = surveys.map(s => `<li>📍 ${s}</li>`).join('');
  } else {
    surveysSection.classList.add('hidden');
  }

  // Campaign Finance & Disclosures integration
  renderCampaignFinance(nodeData);

  // Flagged Overlaps & Regulatory Oversight
  const overlapsSection = document.getElementById('drawerOverlapsSection');
  const overlapsContent = document.getElementById('drawerOverlapsContent');
  const overlaps = nodeData.overlaps_and_oversight || [];
  if (overlaps.length && overlapsSection && overlapsContent) {
    overlapsSection.classList.remove('hidden');
    overlapsContent.innerHTML = overlaps.map(item => {
      const title = typeof item === 'string' ? item : (item.title || item.breach || '');
      const desc = typeof item === 'string' ? '' : (item.description || item.detail || '');
      const statute = typeof item === 'string' ? '' : (item.statute || '');
      return `
        <div class="p-2.5 rounded-lg bg-red-950/30 border border-red-900/50 text-xs space-y-1">
          <div class="flex items-start justify-between gap-1">
            <span class="font-bold text-red-400 leading-snug">${title}</span>
            ${statute ? `<span class="text-[10px] font-mono px-1.5 py-0.5 rounded bg-red-900/40 text-red-300 shrink-0">${statute}</span>` : ''}
          </div>
          ${desc ? `<p class="text-zinc-300 leading-snug text-[11px]">${desc}</p>` : ''}
        </div>
      `;
    }).join('');
  } else if (overlapsSection) {
    overlapsSection.classList.add('hidden');
  }

  // Quick Trace in Matrix Button
  const btnFocus = document.getElementById('btnDrawerFocusGraph');
  if (btnFocus) {
    btnFocus.onclick = () => {
      closeDrawer();
      if (window.__focusNode) window.__focusNode(nodeData.id);
    };
  }

  // Show drawer
  drawer.classList.remove('translate-x-full');
  backdrop.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

/**
 * Close the drawer
 */
export function closeDrawer() {
  const drawer = document.getElementById('entityDrawer');
  const backdrop = document.getElementById('drawerBackdrop');
  drawer.classList.add('translate-x-full');
  backdrop.classList.add('hidden');
  document.body.style.overflow = '';
}

/**
 * Open Evidence Detail Modal
 */
export function openEvidenceModal(anchorName, entityLabel) {
  const dossier = getEvidenceDossier(anchorName, entityLabel);
  const backdrop = document.getElementById('evidenceModalBackdrop');
  if (!backdrop) return;

  // Title & Header
  document.getElementById('evidenceModalTitle').textContent = dossier.title;
  const catEl = document.getElementById('evidenceModalCategory');
  catEl.textContent = dossier.category;
  catEl.className = `px-2.5 py-0.5 rounded-full text-xs font-mono font-bold border ${dossier.badgeColor || 'bg-teal-500/20 text-teal-400 border-teal-500/30'}`;
  document.getElementById('evidenceModalEntity').textContent = entityLabel ? `• Linked: ${entityLabel}` : '';

  // Meaning
  document.getElementById('evidenceModalMeaning').textContent = dossier.plainMeaning;

  // Forensic Breakdown
  const breakdownContainer = document.getElementById('evidenceModalBreakdown');
  if (dossier.forensicBreakdown && dossier.forensicBreakdown.length) {
    breakdownContainer.innerHTML = dossier.forensicBreakdown.map(item => `
      <div class="flex flex-col sm:flex-row sm:items-baseline justify-between p-2.5 rounded-lg bg-zinc-950 border border-zinc-800 gap-1 sm:gap-4 font-mono">
        <span class="text-zinc-400 text-xs font-semibold shrink-0">${item.label}:</span>
        <span class="text-zinc-200 text-xs sm:text-right font-medium">${item.value}</span>
      </div>
    `).join('');
  } else {
    breakdownContainer.innerHTML = '<p class="text-zinc-500 text-xs">Standard public records filing.</p>';
  }

  // Statutes
  const statutesContainer = document.getElementById('evidenceModalStatutes');
  if (dossier.statutes && dossier.statutes.length) {
    statutesContainer.innerHTML = dossier.statutes.map(s => `
      <div class="p-2.5 rounded-lg bg-red-950/20 border border-red-900/40 text-xs">
        <div class="font-mono font-bold text-red-400 mb-0.5">${s.code}</div>
        <div class="text-zinc-300 leading-snug">${s.desc}</div>
      </div>
    `).join('');
  } else {
    statutesContainer.innerHTML = '<p class="text-zinc-500 text-xs">Administrative audit review.</p>';
  }

  // Sources
  const sourcesContainer = document.getElementById('evidenceModalSources');
  if (dossier.sources && dossier.sources.length) {
    sourcesContainer.innerHTML = dossier.sources.map(src => `
      <a href="${src.url}" target="_blank" rel="noopener noreferrer" 
         class="flex items-center justify-between p-2.5 rounded-lg bg-zinc-950 border border-amber-500/30 hover:border-amber-400 hover:bg-zinc-800/80 text-xs text-amber-300 transition-colors group">
        <span class="font-medium group-hover:text-amber-200 truncate pr-2">${src.name}</span>
        <span class="shrink-0 text-amber-400 group-hover:translate-x-0.5 transition-transform">↗</span>
      </a>
    `).join('');
  } else {
    sourcesContainer.innerHTML = '<p class="text-zinc-500 text-xs">County records archives.</p>';
  }

  // Subpoenas
  const subpoenasContainer = document.getElementById('evidenceModalSubpoenas');
  if (dossier.subpoenaTargets && dossier.subpoenaTargets.length) {
    subpoenasContainer.innerHTML = dossier.subpoenaTargets.map(t => `<li>${t}</li>`).join('');
  } else {
    subpoenasContainer.innerHTML = '<li>Official County Clerk record verification request</li>';
  }

  // Show modal
  backdrop.classList.remove('hidden');
}

/**
 * Close Evidence Detail Modal
 */
export function closeEvidenceModal() {
  const backdrop = document.getElementById('evidenceModalBackdrop');
  if (backdrop) backdrop.classList.add('hidden');
}

// Expose globally for inline onclick
window.__openEvidenceModal = openEvidenceModal;

/**
 * Initialize drawer event listeners
 */
export function initDrawer() {
  document.getElementById('btnCloseDrawer')?.addEventListener('click', closeDrawer);
  document.getElementById('drawerBackdrop')?.addEventListener('click', closeDrawer);

  // Evidence modal listeners
  document.getElementById('btnCloseEvidenceModal')?.addEventListener('click', closeEvidenceModal);
  document.getElementById('btnDismissEvidenceModal')?.addEventListener('click', closeEvidenceModal);
  document.getElementById('evidenceModalBackdrop')?.addEventListener('click', (e) => {
    if (e.target === document.getElementById('evidenceModalBackdrop')) closeEvidenceModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const modalBackdrop = document.getElementById('evidenceModalBackdrop');
      if (modalBackdrop && !modalBackdrop.classList.contains('hidden')) {
        closeEvidenceModal();
      } else {
        closeDrawer();
      }
    }
  });
}

let campaignFinanceData = null;

async function loadCampaignFinance() {
  if (campaignFinanceData) return campaignFinanceData;
  try {
    const res = await fetch('./data/campaign_finance.json');
    if (res.ok) {
      campaignFinanceData = await res.json();
    }
  } catch (err) {
    console.warn('Could not load campaign_finance.json:', err);
  }
  return campaignFinanceData || [];
}

async function renderCampaignFinance(nodeData) {
  const section = document.getElementById('drawerFinanceSection');
  const content = document.getElementById('drawerFinanceContent');
  if (!section || !content) return;

  const data = await loadCampaignFinance();
  if (!data || !data.length) {
    section.classList.add('hidden');
    return;
  }

  // Normalize search tokens
  const label = (nodeData.label || '').toLowerCase();
  const id = (nodeData.id || '').replace(/_/g, ' ').toLowerCase();

  // Match candidate profile
  const match = data.find(c => {
    const cName = c.candidate.toLowerCase();
    return cName.includes(label) || label.includes(cName.split('\n')[0].toLowerCase()) ||
           cName.includes(id) || id.includes(cName.split('\n')[0].toLowerCase());
  });

  if (!match) {
    section.classList.add('hidden');
    return;
  }

  // Parse lines
  const lines = match.filings_notes_flags.split('\n');
  const filings = [];
  const notes = [];
  const flags = [];
  let currentSection = 'filings';

  lines.forEach(l => {
    const trimmed = l.trim();
    if (!trimmed) return;
    if (trimmed.startsWith('Notes:')) { currentSection = 'notes'; return; }
    if (trimmed.startsWith('Flags:')) { currentSection = 'flags'; return; }
    if (trimmed.startsWith('Filings:')) { currentSection = 'filings'; return; }

    if (currentSection === 'filings') filings.push(trimmed.replace(/^•\s*/, ''));
    else if (currentSection === 'notes') notes.push(trimmed);
    else if (currentSection === 'flags') flags.push(trimmed);
  });

  const candidateHeader = match.candidate.split('\n');

  content.innerHTML = `
    <div class="border-b border-zinc-800 pb-2 mb-2">
      <div class="text-zinc-200 font-bold text-sm">${candidateHeader[0]}</div>
      <div class="text-zinc-400 text-xs">${candidateHeader.slice(1).join(' • ')}</div>
    </div>

    ${flags.length ? `
      <div class="space-y-1">
        <span class="text-amber-400 font-bold text-[11px] uppercase tracking-wider block">⚠️ Ethics & Audit Flags</span>
        <div class="space-y-1 pl-1">
          ${flags.map(f => `<div class="text-amber-300 bg-amber-950/40 border border-amber-800/40 p-1.5 rounded text-[11px] leading-relaxed">${f}</div>`).join('')}
        </div>
      </div>
    ` : ''}

    ${notes.length ? `
      <div class="space-y-1 mt-2">
        <span class="text-teal-400 font-bold text-[11px] uppercase tracking-wider block">Financial Audit Notes</span>
        <div class="text-zinc-300 pl-1 text-[11px] leading-relaxed">${notes.join('<br>')}</div>
      </div>
    ` : ''}

    ${filings.length ? `
      <div class="space-y-1 mt-2">
        <span class="text-zinc-400 font-bold text-[11px] uppercase tracking-wider block">C/OH Filings Disclosed (${filings.length})</span>
        <ul class="space-y-1 pl-1 text-zinc-400 text-[11px]">
          ${filings.map(fil => `<li class="flex items-start gap-1.5"><span class="text-teal-500">📄</span><span>${fil}</span></li>`).join('')}
        </ul>
      </div>
    ` : ''}
  `;

  section.classList.remove('hidden');
}

