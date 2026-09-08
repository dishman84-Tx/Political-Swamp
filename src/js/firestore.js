/**
 * Firestore Data Module — Real-time listeners for entities, edges, documents, audit_log
 * Falls back to static network_graph.json if Firestore collections are empty/unavailable
 */
import {
  db, collection, onSnapshot, query, orderBy, limit, getDocs
} from './firebase-config.js';

let entitiesData = [];
let edgesData = [];
let documentsData = [];
let auditLogData = [];

// Callbacks for UI updates
let onEntitiesUpdate = null;
let onEdgesUpdate = null;
let onDocumentsUpdate = null;
let onAuditLogUpdate = null;

/**
 * Load static fallback from network_graph.json
 */
async function loadStaticFallback() {
  try {
    const resp = await fetch('/network_graph.json');
    if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
    const data = await resp.json();

    entitiesData = data.nodes || [];
    edgesData = data.edges || [];

    if (onEntitiesUpdate) onEntitiesUpdate(entitiesData);
    if (onEdgesUpdate) onEdgesUpdate(edgesData);

    console.log(`[Firestore] Loaded static fallback: ${entitiesData.length} entities, ${edgesData.length} edges`);
    return true;
  } catch (err) {
    console.error('[Firestore] Static fallback failed:', err);
    return false;
  }
}

/**
 * Try Firestore first, fall back to static JSON
 */
async function initEntities() {
  try {
    const [entitiesSnap, edgesSnap] = await Promise.all([
      getDocs(collection(db, 'entities')),
      getDocs(collection(db, 'edges'))
    ]);

    if (entitiesSnap.empty) {
      console.log('[Firestore] entities collection empty, loading static fallback');
      await loadStaticFallback();
      return;
    }

    // Populate data immediately so synchronous callers have full dataset
    entitiesData = entitiesSnap.docs.map(d => ({ id: d.id, ...d.data() }));
    edgesData = edgesSnap.docs.map(d => ({ id: d.id, ...d.data() }));

    // Real-time listener for ongoing updates
    onSnapshot(collection(db, 'entities'), (snapshot) => {
      entitiesData = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
      if (onEntitiesUpdate) onEntitiesUpdate(entitiesData);
    });

    onSnapshot(collection(db, 'edges'), (snapshot) => {
      edgesData = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
      if (onEdgesUpdate) onEdgesUpdate(edgesData);
    });
  } catch (err) {
    console.warn('[Firestore] Connection failed, using static fallback:', err.message);
    await loadStaticFallback();
  }
}

/**
 * Initialize documents listener
 */
function initDocuments() {
  try {
    const q = query(collection(db, 'documents'), orderBy('upload_date', 'desc'), limit(50));
    onSnapshot(q, (snapshot) => {
      documentsData = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
      if (onDocumentsUpdate) onDocumentsUpdate(documentsData);
    }, (err) => {
      console.warn('[Firestore] documents listener error:', err.message);
    });
  } catch (err) {
    console.warn('[Firestore] documents init failed:', err.message);
  }
}

/**
 * Initialize audit log listener
 */
function initAuditLog() {
  try {
    const q = query(collection(db, 'audit_log'), orderBy('timestamp', 'desc'), limit(100));
    onSnapshot(q, (snapshot) => {
      auditLogData = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
      if (onAuditLogUpdate) onAuditLogUpdate(auditLogData);
    }, (err) => {
      console.warn('[Firestore] audit_log listener error:', err.message);
    });
  } catch (err) {
    console.warn('[Firestore] audit_log init failed:', err.message);
  }
}

/**
 * Initialize all Firestore listeners
 */
export async function initFirestore(callbacks) {
  onEntitiesUpdate = callbacks.onEntities || null;
  onEdgesUpdate = callbacks.onEdges || null;
  onDocumentsUpdate = callbacks.onDocuments || null;
  onAuditLogUpdate = callbacks.onAuditLog || null;

  await initEntities();
  initDocuments();
  initAuditLog();
}

export function getEntities() { return entitiesData; }
export function getEdges() { return edgesData; }
export function getDocuments() { return documentsData; }
export function getAuditLog() { return auditLogData; }
