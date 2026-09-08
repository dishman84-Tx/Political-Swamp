/**
 * Entities Module — Searchable, filterable, sortable entity matrix table
 */
import { focusNode } from './graph.js';
import { openDrawer } from './drawer.js';
import { getEdges } from './firestore.js';

const CARTEL_BADGE = {
  'Developer & Bond Syndicate':                    'cartel-developer',
  'Law Enforcement, Inquest & Death Suppression':  'cartel-law',
  'School Board, CAD & Construction Arbitrage':    'cartel-school',
  'Judicial & Prosecutorial Family Dynasty':       'cartel-judicial',
};

let allEntities = [];
let sortKey = 'risk_score';
let sortDir = -1; // -1 = desc

function getRiskClass(score) {
  if (score >= 90) return 'risk-critical';
  if (score >= 70) return 'risk-high';
  if (score >= 40) return 'risk-medium';
  return 'risk-low';
}

/**
 * Render the entity table
 */
function renderTable(entities) {
  const tbody = document.getElementById('entityTableBody');
  if (!tbody) return;

  tbody.innerHTML = entities.map(e => {
    const score = e.risk_score || 0;
    const badgeClass = CARTEL_BADGE[e.cartel] || 'cartel-developer';
    const degree = e.degree_connectivity || 0;

    return `
      <tr class="hover:bg-zinc-900/50 transition-colors">
        <td class="px-4 py-3">
          <span class="text-zinc-100 font-medium text-sm">${e.label || e.id}</span>
        </td>
        <td class="px-4 py-3 hidden sm:table-cell">
          <span class="text-zinc-400 text-xs font-mono">${e.category || ''}</span>
        </td>
        <td class="px-4 py-3">
          <span class="px-2 py-0.5 rounded-full text-[11px] font-mono font-bold ${badgeClass}">
            ${e.cartel === 'Developer & Bond Syndicate' ? 'Developer' : e.cartel === 'Law Enforcement, Inquest & Death Suppression' ? 'Law Enf / Inquest' : e.cartel === 'School Board, CAD & Construction Arbitrage' ? 'School / CAD' : 'Judicial Dynasty'}
          </span>
        </td>
        <td class="px-4 py-3 hidden lg:table-cell">
          <span class="text-zinc-400 text-xs">${e.role || ''}</span>
        </td>
        <td class="px-4 py-3 text-right">
          <div class="flex items-center justify-end gap-2">
            <span class="text-sm font-mono font-bold" style="color: ${score >= 90 ? '#ef4444' : score >= 70 ? '#f97316' : score >= 40 ? '#eab308' : '#22c55e'}">${score}</span>
            <div class="w-16 h-2 bg-zinc-800 rounded-full overflow-hidden">
              <div class="h-full rounded-full ${getRiskClass(score)}" style="width: ${score}%"></div>
            </div>
          </div>
        </td>
        <td class="px-4 py-3 text-center">
          <span class="text-xs font-mono text-zinc-500">${degree}</span>
        </td>
        <td class="px-4 py-3 text-right">
          <button class="inspect-btn px-3 py-1 rounded-lg text-xs font-medium bg-zinc-800 text-teal-400 border border-zinc-700 hover:bg-zinc-700 transition-colors"
                  data-id="${e.id}">
            Inspect →
          </button>
        </td>
      </tr>
    `;
  }).join('');

  // Attach inspect handlers
  tbody.querySelectorAll('.inspect-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.id;
      const entity = allEntities.find(e => e.id === id);
      if (entity) {
        openDrawer(entity, getEdges());
      }
    });
  });
}

/**
 * Filter and sort entities
 */
function applyFilters() {
  const search = (document.getElementById('entitySearch')?.value || '').toLowerCase();
  const filter = document.getElementById('entityFilter')?.value || 'all';

  let filtered = allEntities.filter(e => {
    const matchSearch = !search ||
      (e.label || '').toLowerCase().includes(search) ||
      (e.role || '').toLowerCase().includes(search) ||
      (e.category || '').toLowerCase().includes(search);
    const matchFilter = filter === 'all' || e.cartel === filter;
    return matchSearch && matchFilter;
  });

  // Sort
  filtered.sort((a, b) => {
    const aVal = a[sortKey] || '';
    const bVal = b[sortKey] || '';
    if (typeof aVal === 'number') return (aVal - bVal) * sortDir;
    return String(aVal).localeCompare(String(bVal)) * sortDir;
  });

  renderTable(filtered);
}

/**
 * Initialize entity matrix
 */
export function initEntities(entities) {
  allEntities = entities;
  applyFilters();

  document.getElementById('entitySearch')?.addEventListener('input', applyFilters);
  document.getElementById('entityFilter')?.addEventListener('change', applyFilters);

  // Column sort handlers
  document.querySelectorAll('[data-sort]').forEach(th => {
    th.addEventListener('click', () => {
      const key = th.dataset.sort;
      if (sortKey === key) {
        sortDir *= -1;
      } else {
        sortKey = key;
        sortDir = key === 'risk_score' ? -1 : 1;
      }
      applyFilters();
    });
  });
}

/**
 * Update entities (for real-time Firestore changes)
 */
export function updateEntities(entities) {
  allEntities = entities;
  applyFilters();
}
