/**
 * Main Entry Point — Political Swamp v4.0
 * Wires auth, Firestore, graph, entities, intake, timeline, audit log
 */
import { initAuth, handleSignIn, handleSignOut } from './auth.js';
import { initFirestore, getEntities, getEdges } from './firestore.js';
import { initGraph, updateGraph, resetLayout, fitGraph, zoomIn, zoomOut, focusNode } from './graph.js';
import { initDrawer } from './drawer.js';
import { initEntities, updateEntities } from './entities.js';
import { initIntake, updateProcessingQueue } from './intake.js';
import { initTimeline } from './timeline.js';
import { initAuditLog, renderAuditLog } from './auditlog.js';

// Expose focusNode globally for drawer edge clicks
window.__focusNode = (nodeId) => {
  switchTab('graph');
  setTimeout(() => focusNode(nodeId), 100);
};

// ============================
// TAB SWITCHING
// ============================
const TAB_IDS = ['graph', 'entities', 'intake', 'timeline', 'auditlog'];

function switchTab(tabId) {
  TAB_IDS.forEach(id => {
    const panel = document.getElementById(`panel${id.charAt(0).toUpperCase() + id.slice(1)}`);
    const btn = document.querySelector(`[data-tab="${id}"]`);
    if (panel) panel.classList.toggle('hidden', id !== tabId);
    if (btn) btn.classList.toggle('active', id === tabId);
  });
}

// Tab button listeners
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => switchTab(btn.dataset.tab));
});

// ============================
// MOBILE CARD LIST
// ============================
const CARTEL_BORDER = {
  'Developer & Bond Syndicate':                    'border-l-teal-500',
  'Law Enforcement, Inquest & Death Suppression':  'border-l-red-500',
  'School Board, CAD & Construction Arbitrage':    'border-l-amber-500',
  'Judicial & Prosecutorial Family Dynasty':       'border-l-purple-500',
};

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

function renderMobileCards(entities) {
  const list = document.getElementById('mobileCardList');
  if (!list) return;

  const sorted = [...entities].sort((a, b) => (b.risk_score || 0) - (a.risk_score || 0));

  list.innerHTML = sorted.map(e => {
    const score = e.risk_score || 0;
    const borderClass = CARTEL_BORDER[e.cartel] || 'border-l-zinc-600';
    const badgeClass = CARTEL_BADGE_CLASS[e.cartel] || 'cartel-developer';
    const cartelShort = (e.cartel || '').split(' & ')[0];
    const degree = e.degree_connectivity || 0;

    return `
      <div class="entity-card p-4 rounded-xl bg-zinc-900/60 border border-zinc-800/60 border-l-4 ${borderClass} cursor-pointer hover:bg-zinc-800/40 transition-all"
           data-id="${e.id}">
        <div class="flex items-start justify-between">
          <div class="flex-1 min-w-0">
            <h3 class="text-base font-bold text-zinc-100 truncate">${e.label || e.id}</h3>
            <p class="text-sm text-zinc-400 mt-0.5 truncate">${e.role || ''}</p>
            <div class="flex items-center gap-2 mt-2">
              <span class="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${badgeClass}">${cartelShort}</span>
              <span class="text-xs text-zinc-600 font-mono">${degree} connections</span>
            </div>
          </div>
          <div class="flex items-center gap-2 ml-3">
            <div class="text-right">
              <span class="text-lg font-bold font-mono" style="color: ${score >= 90 ? '#ef4444' : score >= 70 ? '#f97316' : score >= 40 ? '#eab308' : '#22c55e'}">${score}</span>
              <div class="w-16 h-2 bg-zinc-800 rounded-full overflow-hidden mt-1">
                <div class="h-full rounded-full ${getRiskClass(score)}" style="width: ${score}%"></div>
              </div>
            </div>
            <svg class="w-5 h-5 text-zinc-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
          </div>
        </div>
      </div>
    `;
  }).join('');

  // Tap card → open drawer
  list.querySelectorAll('.entity-card').forEach(card => {
    card.addEventListener('click', () => {
      const id = card.dataset.id;
      const entity = entities.find(e => e.id === id);
      if (entity) {
        import('./drawer.js').then(m => m.openDrawer(entity, getEdges()));
      }
    });
  });
}

// ============================
// AUTH FLOW
// ============================
function showApp(user) {
  document.getElementById('authGate').classList.add('hidden');
  document.getElementById('mainApp').classList.remove('hidden');

  // Update user display
  const nameEl = document.getElementById('userDisplayName');
  const avatarEl = document.getElementById('userAvatar');
  if (nameEl) {
    nameEl.textContent = user.displayName || user.email;
    nameEl.classList.remove('hidden');
  }
  if (avatarEl && user.photoURL) {
    avatarEl.src = user.photoURL;
    avatarEl.classList.remove('hidden');
  }
}

function showAuthGate() {
  document.getElementById('authGate').classList.remove('hidden');
  document.getElementById('mainApp').classList.add('hidden');
}

// ============================
// INITIALIZATION
// ============================
async function init() {
  // Initialize drawer
  initDrawer();

  // Set default active tab
  switchTab('graph');

  // Auth listener
  initAuth(async (user) => {
    if (user) {
      showApp(user);
      await bootApp();
    } else {
      showAuthGate();
    }
  });

  // Sign in button
  document.getElementById('btnGoogleSignIn')?.addEventListener('click', handleSignIn);

  // Sign out button
  document.getElementById('btnSignOut')?.addEventListener('click', handleSignOut);

  // Graph controls
  document.getElementById('btnResetLayout')?.addEventListener('click', resetLayout);
  document.getElementById('btnFitGraph')?.addEventListener('click', fitGraph);
  document.getElementById('btnZoomIn')?.addEventListener('click', zoomIn);
  document.getElementById('btnZoomOut')?.addEventListener('click', zoomOut);

  // Jump to entity search
  const searchInput = document.getElementById('graphEntitySearch');
  searchInput?.addEventListener('change', (e) => {
    const val = e.target.value.trim().toLowerCase();
    if (!val) return;
    const match = getEntities().find(ent =>
      (ent.label || '').toLowerCase() === val ||
      (ent.id || '').toLowerCase() === val
    );
    if (match) {
      focusNode(match.id);
      searchInput.value = '';
    }
  });
}

async function bootApp() {
  // Initialize Firestore with real-time callbacks
  await initFirestore({
    onEntities: (entities) => {
      updateGraph(entities, getEdges());
      updateEntities(entities);
      renderMobileCards(entities);
    },
    onEdges: (edges) => {
      updateGraph(getEntities(), edges);
    },
    onDocuments: (docs) => {
      updateProcessingQueue(docs);
    },
    onAuditLog: (logs) => {
      renderAuditLog(logs);
    },
  });

  // Initialize all modules with current data
  const entities = getEntities();
  const edges = getEdges();

  // Populate quick search datalist
  const datalist = document.getElementById('graphEntityList');
  if (datalist) {
    datalist.innerHTML = entities.map(e => `<option value="${e.label || e.id}">${e.cartel}</option>`).join('');
  }

  initGraph(entities, edges);
  initEntities(entities);
  renderMobileCards(entities);
  initIntake();
  initTimeline();
  initAuditLog();
}

// Boot
init();
