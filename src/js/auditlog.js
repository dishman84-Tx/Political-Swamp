/**
 * Audit Log Module — Real-time Firestore audit feed
 */

const ACTION_ICONS = {
  upload:     '📄',
  extraction: '🔍',
  merge:      '🔗',
  auth:       '🔐',
  pipeline:   '⚙️',
  error:      '⚠️',
  default:    '📋',
};

const ACTION_COLORS = {
  upload:     'text-blue-400',
  extraction: 'text-purple-400',
  merge:      'text-teal-400',
  auth:       'text-amber-400',
  pipeline:   'text-zinc-400',
  error:      'text-red-400',
  default:    'text-zinc-400',
};

/**
 * Render audit log entries
 */
export function renderAuditLog(entries) {
  const feed = document.getElementById('auditLogFeed');
  if (!feed) return;

  const filter = document.getElementById('auditFilter')?.value || 'all';

  const filtered = filter === 'all'
    ? entries
    : entries.filter(e => e.action_type === filter);

  if (!filtered.length) {
    feed.innerHTML = `
      <div class="p-6 rounded-lg bg-zinc-900/50 border border-zinc-800 text-center text-zinc-500 text-sm">
        No audit log entries${filter !== 'all' ? ` for "${filter}"` : ''}. Pipeline activity will appear here in real-time.
      </div>
    `;
    return;
  }

  feed.innerHTML = filtered.map(entry => {
    const type = entry.action_type || 'default';
    const icon = ACTION_ICONS[type] || ACTION_ICONS.default;
    const colorClass = ACTION_COLORS[type] || ACTION_COLORS.default;

    const ts = entry.timestamp?.toDate?.()
      ? entry.timestamp.toDate().toLocaleString()
      : entry.timestamp || '';

    const entities = (entry.affected_entities || []).join(', ');

    return `
      <div class="audit-entry p-3.5 rounded-lg bg-zinc-900/60 border border-zinc-800/60 hover:border-zinc-700 transition-colors">
        <div class="flex items-start gap-3">
          <span class="text-lg">${icon}</span>
          <div class="flex-1 min-w-0">
            <div class="flex items-center justify-between gap-2">
              <span class="text-sm font-medium text-zinc-200">${entry.action || 'Unknown action'}</span>
              <span class="text-[10px] font-mono text-zinc-600 whitespace-nowrap">${ts}</span>
            </div>
            ${entry.detail ? `<p class="text-xs text-zinc-400 mt-0.5">${entry.detail}</p>` : ''}
            <div class="flex items-center gap-2 mt-1.5">
              ${entry.actor ? `<span class="text-[10px] font-mono text-zinc-500">${entry.actor}</span>` : ''}
              ${entities ? `<span class="text-[10px] font-mono ${colorClass}">→ ${entities}</span>` : ''}
              ${entry.source_document ? `<span class="text-[10px] font-mono text-zinc-600">📄 ${entry.source_document}</span>` : ''}
            </div>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

/**
 * Initialize audit log with empty state and filter listener
 */
export function initAuditLog() {
  renderAuditLog([]);

  document.getElementById('auditFilter')?.addEventListener('change', () => {
    // Re-render will be triggered by Firestore snapshot
    // For now just show the current data
    const feed = document.getElementById('auditLogFeed');
    if (feed && feed.dataset.entries) {
      try {
        renderAuditLog(JSON.parse(feed.dataset.entries));
      } catch { /* ignore */ }
    }
  });
}
