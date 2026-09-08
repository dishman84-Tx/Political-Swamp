/**
 * Drawer Module — Slide-out entity detail panel
 */
import { getEdges } from './firestore.js';

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
  anchorsList.innerHTML = anchors.length
    ? anchors.map(a => `<li class="flex items-start gap-2"><span class="text-teal-400 mt-0.5">•</span><span>${a}</span></li>`).join('')
    : '<li class="text-zinc-500">No anchors documented.</li>';

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
 * Initialize drawer event listeners
 */
export function initDrawer() {
  document.getElementById('btnCloseDrawer')?.addEventListener('click', closeDrawer);
  document.getElementById('drawerBackdrop')?.addEventListener('click', closeDrawer);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeDrawer();
  });
}
