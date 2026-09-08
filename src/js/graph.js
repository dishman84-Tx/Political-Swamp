/**
 * Graph Module — Cytoscape.js Network Visualization v4.1
 * High-contrast cartel colors, spacious layout, contextual edge labeling,
 * click-to-isolate cluster focus, zoom controls.
 */
import { openDrawer } from './drawer.js';

let cy = null;

export const CARTEL_COLORS = {
  'Developer & Bond Syndicate':                    '#14b8a6', // Teal
  'Law Enforcement, Inquest & Death Suppression':  '#ef4444', // Red
  'School Board, CAD & Construction Arbitrage':    '#f59e0b', // Amber / Gold
  'Judicial & Prosecutorial Family Dynasty':       '#a855f7', // Purple
};

const EDGE_TYPE_COLORS = {
  corporate:            '#14b8a6',
  campaign_finance:     '#f59e0b',
  familial:             '#f97316',
  ch171_conflict:       '#a855f7',
  police_coverup:       '#ef4444',
  inquest_rubberstamp:  '#ef4444',
  deed_overlap:         '#14b8a6',
  bond_authorization:   '#14b8a6',
  election_admin:       '#f59e0b',
  financial_conduit:    '#f59e0b',
  forensic_suppression: '#ef4444',
  dna_exclusion:        '#ef4444',
  default:              '#71717a',
};

export function getCartelColor(cartel) {
  return CARTEL_COLORS[cartel] || '#71717a';
}

function getEdgeColor(type) {
  return EDGE_TYPE_COLORS[type] || EDGE_TYPE_COLORS.default;
}

/**
 * Initialize Cytoscape graph
 */
export function initGraph(entities, edges) {
  const container = document.getElementById('cy');
  if (!container) return;

  const elements = [];

  // Nodes
  for (const node of entities) {
    elements.push({
      group: 'nodes',
      data: {
        id: node.id,
        label: node.label || node.id,
        cartel: node.cartel || 'Unknown',
        category: node.category || '',
        role: node.role || '',
        status: node.status || '',
        risk_score: node.risk_score || 0,
        anchors: node.anchors || [],
        surveys: node.surveys || [],
        notes: node.notes || '',
        degree_connectivity: node.degree_connectivity || 0,
        color: getCartelColor(node.cartel),
      }
    });
  }

  // Edges
  for (const edge of edges) {
    const rawLabel = (edge.label || edge.type || '').replace(/_/g, ' ');
    elements.push({
      group: 'edges',
      data: {
        id: edge.id || `${edge.source}-${edge.target}-${edge.type}`,
        source: edge.source,
        target: edge.target,
        label: rawLabel.toUpperCase(),
        type: edge.type || '',
        color: getEdgeColor(edge.type),
      }
    });
  }

  cy = cytoscape({
    container,
    elements,
    minZoom: 0.15,
    maxZoom: 3.5,
    wheelSensitivity: 0.2,
    style: [
      // Base Node
      {
        selector: 'node',
        style: {
          'background-color': 'data(color)',
          'border-width': 3,
          'border-color': '#ffffff',
          'border-opacity': 0.7,
          'label': 'data(label)',
          'font-family': '"DM Sans", system-ui, sans-serif',
          'font-size': '13px',
          'font-weight': 700,
          'color': '#ffffff',
          'text-outline-width': 3,
          'text-outline-color': '#09090b',
          'text-wrap': 'wrap',
          'text-max-width': '170px',
          'text-valign': 'bottom',
          'text-margin-y': 10,
          'width': 'mapData(risk_score, 0, 100, 42, 80)',
          'height': 'mapData(risk_score, 0, 100, 42, 80)',
          'transition-property': 'opacity, border-width, border-color',
          'transition-duration': '0.2s',
        }
      },
      // Hover Node
      {
        selector: 'node.hovered',
        style: {
          'border-width': 5,
          'border-color': '#ffffff',
          'border-opacity': 1,
          'font-size': '15px',
          'z-index': 99,
        }
      },
      // Selected/Focused Node
      {
        selector: 'node.highlighted',
        style: {
          'border-width': 6,
          'border-color': '#38bdf8',
          'border-opacity': 1,
          'font-size': '16px',
          'color': '#38bdf8',
          'z-index': 100,
        }
      },
      // Dimmed Node when another is focused
      {
        selector: 'node.dimmed',
        style: {
          'opacity': 0.2,
        }
      },
      // Base Edge — Clean line, hidden label by default to eradicate clutter
      {
        selector: 'edge',
        style: {
          'width': 2,
          'line-color': 'data(color)',
          'line-opacity': 0.45,
          'target-arrow-color': 'data(color)',
          'target-arrow-shape': 'triangle',
          'arrow-scale': 1.1,
          'curve-style': 'bezier',
          'label': '', // Hidden by default for crisp reading
          'transition-property': 'line-opacity, width, opacity',
          'transition-duration': '0.2s',
        }
      },
      // Highlighted/Connected Edge — Shows label brightly with dark pill outline
      {
        selector: 'edge.highlighted, edge.hovered',
        style: {
          'width': 4,
          'line-opacity': 1,
          'line-color': '#38bdf8',
          'target-arrow-color': '#38bdf8',
          'label': 'data(label)',
          'font-family': '"JetBrains Mono", monospace',
          'font-size': '12px',
          'font-weight': 700,
          'color': '#38bdf8',
          'text-outline-width': 3,
          'text-outline-color': '#09090b',
          'text-rotation': 'autorotate',
          'text-margin-y': -10,
          'z-index': 90,
        }
      },
      // Dimmed Edge
      {
        selector: 'edge.dimmed',
        style: {
          'opacity': 0.08,
        }
      }
    ],
    layout: {
      name: 'cose',
      animate: false, // Instant exact calculation
      nodeRepulsion: () => 3800000,
      idealEdgeLength: () => 190,
      edgeElasticity: () => 40,
      gravity: 0.22,
      padding: 60,
      nodeOverlap: 20,
      randomize: false,
    }
  });

  // Fit all elements immediately upon initialization
  cy.fit(cy.elements(), 60);

  // Node Click -> Isolate Cluster & Open Drawer
  cy.on('tap', 'node', (evt) => {
    const node = evt.target;
    const data = node.data();

    isolateCluster(node);
    openDrawer(data, edges);
  });

  // Background Click -> Reset isolation
  cy.on('tap', (evt) => {
    if (evt.target === cy) {
      resetHighlights();
    }
  });

  // Hover effects
  cy.on('mouseover', 'node', (evt) => {
    evt.target.addClass('hovered');
  });
  cy.on('mouseout', 'node', (evt) => {
    evt.target.removeClass('hovered');
  });
  cy.on('mouseover', 'edge', (evt) => {
    evt.target.addClass('hovered');
  });
  cy.on('mouseout', 'edge', (evt) => {
    evt.target.removeClass('hovered');
  });

  // Update footer count
  const countEl = document.getElementById('entityCount');
  if (countEl) {
    countEl.textContent = `${entities.length} Entities • ${edges.length} Edges`;
  }
}

/**
 * Visually isolate a node and its direct 1st-degree connections
 */
function isolateCluster(node) {
  if (!cy) return;

  const connectedEdges = node.connectedEdges();
  const connectedNodes = connectedEdges.connectedNodes();

  // Dim all
  cy.elements().addClass('dimmed').removeClass('highlighted locked');

  // Highlight connected neighborhood
  node.removeClass('dimmed').addClass('highlighted');
  connectedNodes.removeClass('dimmed');
  connectedEdges.removeClass('dimmed').addClass('highlighted locked');
}

/**
 * Clear isolation
 */
export function resetHighlights() {
  if (!cy) return;
  cy.elements().removeClass('dimmed highlighted locked');
}

/**
 * Update graph with new data (for Firestore real-time updates)
 */
export function updateGraph(entities, edges) {
  if (cy) {
    cy.destroy();
  }
  initGraph(entities, edges);
}

/**
 * Reset graph layout with generous spacing
 */
export function resetLayout() {
  if (!cy) return;
  resetHighlights();
  const l = cy.layout({
    name: 'cose',
    animate: false,
    nodeRepulsion: () => 3800000,
    idealEdgeLength: () => 190,
    edgeElasticity: () => 40,
    gravity: 0.22,
    padding: 60,
  });
  l.run();
  cy.fit(cy.elements(), 60);
}

/**
 * Fit all nodes in view
 */
export function fitGraph() {
  if (!cy) return;
  cy.stop();
  cy.resize();
  cy.animate({
    fit: {
      eles: cy.elements(),
      padding: 60
    },
    duration: 350
  });
}

/**
 * Zoom In
 */
export function zoomIn() {
  if (!cy) return;
  cy.stop();
  const currentZoom = cy.zoom();
  const targetZoom = Math.min(cy.maxZoom(), currentZoom * 1.35);
  const pan = cy.pan();
  const w = cy.width() || window.innerWidth;
  const h = cy.height() || window.innerHeight;
  const center = { x: w / 2, y: h / 2 };
  
  cy.animate({
    zoom: {
      level: targetZoom,
      renderedPosition: center
    },
    duration: 250
  });
}

/**
 * Zoom Out
 */
export function zoomOut() {
  if (!cy) return;
  cy.stop();
  const currentZoom = cy.zoom();
  const targetZoom = Math.max(cy.minZoom(), currentZoom / 1.35);
  const w = cy.width() || window.innerWidth;
  const h = cy.height() || window.innerHeight;
  const center = { x: w / 2, y: h / 2 };

  cy.animate({
    zoom: {
      level: targetZoom,
      renderedPosition: center
    },
    duration: 250
  });
}

/**
 * Focus on a specific node by ID
 */
export function focusNode(nodeId) {
  if (!cy) return;
  const node = cy.getElementById(nodeId);
  if (node.length) {
    isolateCluster(node);
    cy.animate({ center: { eles: node }, zoom: 1.4 }, { duration: 500 });
    openDrawer(node.data(), null);
  }
}

// Expose on window for direct access
if (typeof window !== 'undefined') {
  window.__zoomIn = zoomIn;
  window.__zoomOut = zoomOut;
  window.__fitGraph = fitGraph;
  window.__resetLayout = resetLayout;
}

export function getCy() { return cy; }

