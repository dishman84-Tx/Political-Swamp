"""
KELLY DISHMAN PUBLIC INTEGRITY INTELLIGENCE GRID
Module: Cloud Firestore Seeder
Purpose: Seeds Firestore collections (entities, edges, allowlist, audit_log)
         from public/data/network_graph.json using local Firebase credentials.
"""

import json
from pathlib import Path
from firestore_sync import get_firestore_client, add_allowlist_user, log_audit_event

WORKSPACE = Path(__file__).resolve().parent.parent
GRAPH_JSON_PATH = WORKSPACE / "public" / "data" / "network_graph.json"

AUTHORIZED_USERS = [
    ("kellyldishman84@gmail.com", "Executive Lead"),
    ("dishman84.tx@gmail.com", "Lead Investigator"),
    ("kelly@dishman.com", "Administrator"),
]

def seed():
    print(f"[*] Reading graph dataset from: {GRAPH_JSON_PATH}")
    if not GRAPH_JSON_PATH.exists():
        raise FileNotFoundError(f"Missing {GRAPH_JSON_PATH}")

    with open(GRAPH_JSON_PATH, "r", encoding="utf-8") as f:
        graph_data = json.load(f)

    nodes = graph_data.get("nodes", [])
    edges = graph_data.get("edges", [])

    db = get_firestore_client()
    batch = db.batch()
    batch_count = 0
    total_committed = 0

    print(f"[*] Seeding {len(nodes)} entities into Firestore 'entities' collection...")
    for node in nodes:
        node_id = str(node.get("id"))
        doc_ref = db.collection("entities").document(node_id)
        batch.set(doc_ref, node)
        batch_count += 1
        if batch_count >= 400:
            batch.commit()
            total_committed += batch_count
            batch = db.batch()
            batch_count = 0

    print(f"[*] Seeding {len(edges)} relationship edges into Firestore 'edges' collection...")
    for edge in edges:
        source = edge.get("source", "")
        target = edge.get("target", "")
        edge_id = edge.get("id") or f"{source}__{target}"
        doc_ref = db.collection("edges").document(edge_id)
        batch.set(doc_ref, edge)
        batch_count += 1
        if batch_count >= 400:
            batch.commit()
            total_committed += batch_count
            batch = db.batch()
            batch_count = 0

    if batch_count > 0:
        batch.commit()
        total_committed += batch_count

    print(f"[+] Successfully committed {total_committed} documents (entities + edges).")

    # Seed Allowlist
    print("[*] Seeding authorized team allowlist...")
    for email, role in AUTHORIZED_USERS:
        add_allowlist_user(email, role)

    # Initial Audit Log Event
    print("[*] Recording genesis audit log entry...")
    log_audit_event(
        action="database_initialization",
        actor="system_seeder",
        details=f"Seeded Firestore database with {len(nodes)} entities, {len(edges)} edges, and authorized allowlist.",
        metadata={
            "entity_count": len(nodes),
            "edge_count": len(edges),
            "source_file": "public/data/network_graph.json"
        }
    )

    print("\n[SUCCESS] Cloud Firestore is completely seeded and live!")

if __name__ == "__main__":
    seed()
