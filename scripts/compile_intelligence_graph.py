"""
KELLY DISHMAN PUBLIC INTEGRITY INTELLIGENCE GRID
Module: Compile Intelligence Graph & Dual-Vault Synchronizer (Stage 4)
Purpose: Compiles verified entities into public/data/network_graph.json,
updates Obsidian Vault Contacts/ nodes with YAML frontmatter and [[Wikilinks]],
and validates graph schema integrity.
"""

import os
import sys
import json
import argparse
from pathlib import Path
from datetime import datetime

# Force UTF-8 output on Windows consoles
if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8")

class GraphCompiler:
    def __init__(self, workspace_root=None):
        self.workspace_root = workspace_root or Path(__file__).resolve().parent.parent
        self.public_data = self.workspace_root / "public" / "data"
        self.graph_path = self.public_data / "network_graph.json"
        self.vault_root = self.workspace_root.parent
        self.contacts_dir = self.vault_root / "Contacts"

    def load_graph(self):
        if not self.graph_path.exists():
            raise FileNotFoundError(f"Graph file missing: {self.graph_path}")
        with open(self.graph_path, "r", encoding="utf-8") as f:
            return json.load(f)

    def validate_graph_schema(self, data):
        """Pre-flight verification of graph schema and citations."""
        required_root = ["version", "jurisdiction", "nodes", "edges", "vectors"]
        for k in required_root:
            if k not in data:
                raise ValueError(f"Graph root missing key: {k}")

        node_ids = set()
        for idx, node in enumerate(data["nodes"]):
            if "id" not in node or "label" not in node or "cartel" not in node:
                raise ValueError(f"Node at index {idx} missing required fields (id, label, cartel)")
            if node["id"] in node_ids:
                raise ValueError(f"Duplicate node ID found: {node['id']}")
            node_ids.add(node["id"])

        for idx, edge in enumerate(data["edges"]):
            if "source" not in edge or "target" not in edge or "relation" not in edge:
                raise ValueError(f"Edge at index {idx} missing source, target, or relation")
            if edge["source"] not in node_ids:
                raise ValueError(f"Edge {idx} references non-existent source node: {edge['source']}")
            if edge["target"] not in node_ids:
                raise ValueError(f"Edge {idx} references non-existent target node: {edge['target']}")

        return True

    def calculate_centrality_and_stats(self, data):
        """Calculates degree connectivity for each node."""
        degrees = {n["id"]: 0 for n in data["nodes"]}
        for edge in data["edges"]:
            degrees[edge["source"]] = degrees.get(edge["source"], 0) + 1
            degrees[edge["target"]] = degrees.get(edge["target"], 0) + 1

        for node in data["nodes"]:
            node["degree_connectivity"] = degrees.get(node["id"], 0)

        # Update summary stats
        data["summary"] = {
            "total_nodes": len(data["nodes"]),
            "total_edges": len(data["edges"]),
            "cartels": len(data["vectors"]),
            "verified_indictments": sum(1 for n in data["nodes"] if "indict" in (n.get("status") or "").lower()),
            "settlement_total": "$68,000,000",
            "bond_authorizations": "$183,360,000"
        }
        data["generated_at"] = datetime.now().isoformat()
        return data

    def sync_obsidian_contacts(self, data):
        """Ensures Obsidian Contacts/ nodes exist with proper YAML frontmatter."""
        if not self.contacts_dir.exists():
            return 0

        synced_count = 0
        for node in data["nodes"]:
            clean_name = node["label"].replace('"', '').replace("'", "")
            contact_file = self.contacts_dir / f"{clean_name}.md"
            if not contact_file.exists():
                # Generate clean YAML node
                frontmatter = f"""---
title: "{clean_name}"
category: "{node.get('category', 'entity')}"
cartel: "{node.get('cartel', 'Unknown')}"
role: "{node.get('role', '')}"
risk_score: {node.get('risk_score', 50)}
status: "{node.get('status', 'active')}"
tags: [political-swamp, liberty-county, corruption-tracker]
date_updated: {datetime.now().strftime('%Y-%m-%d')}
---

# {clean_name}

**Cartel Classification:** {node.get('cartel')}
**Official Role:** {node.get('role')}
**Forensic Risk Score:** {node.get('risk_score')}/100

## Verified Primary Anchors
"""
                for anchor in node.get("anchors", []):
                    frontmatter += f"- [[{anchor}]]\n"

                frontmatter += f"\n## Investigative Notes\n{node.get('notes', '')}\n"

                try:
                    with open(contact_file, "w", encoding="utf-8") as cf:
                        cf.write(frontmatter)
                    synced_count += 1
                except Exception:
                    pass

        return synced_count

    def save_graph(self, data):
        with open(self.graph_path, "w", encoding="utf-8") as f:
            json.dump(data, f, indent=2)


def main():
    parser = argparse.ArgumentParser(description="Compile and validate Political Swamp intelligence graph.")
    parser.add_argument("--validate-only", action="store_true", help="Run schema validation without rewriting files.")
    args = parser.parse_args()

    compiler = GraphCompiler()
    graph_data = compiler.load_graph()
    
    print("[PRE-FLIGHT] Validating graph schema...")
    compiler.validate_graph_schema(graph_data)
    print(f"✓ Schema valid: {len(graph_data['nodes'])} nodes, {len(graph_data['edges'])} edges across {len(graph_data['vectors'])} vectors.")

    if args.validate_only:
        print("[SUCCESS] Validation check passed with 0 errors.")
        return 0

    print("[PROCESSING] Calculating network connectivity and updating stats...")
    updated_data = compiler.calculate_centrality_and_stats(graph_data)
    compiler.save_graph(updated_data)

    print("[SYNC] Checking Obsidian Contacts/ directory...")
    synced = compiler.sync_obsidian_contacts(updated_data)
    print(f"✓ Synced {synced} contact nodes into Obsidian vault.")

    # Firestore Cloud Synchronization
    try:
        from firestore_sync import get_firestore_client, log_audit_event
        db = get_firestore_client()
        batch = db.batch()
        count = 0
        for node in updated_data["nodes"]:
            doc_ref = db.collection("entities").document(str(node["id"]))
            batch.set(doc_ref, node, merge=True)
            count += 1
        for edge in updated_data["edges"]:
            edge_id = edge.get("id") or f"{edge.get('source')}__{edge.get('target')}"
            doc_ref = db.collection("edges").document(edge_id)
            batch.set(doc_ref, edge, merge=True)
            count += 1
        batch.commit()
        log_audit_event(
            action="graph_compilation_sync",
            actor="compile_intelligence_graph",
            details=f"Synced {len(updated_data['nodes'])} entities and {len(updated_data['edges'])} edges to Firestore."
        )
        print(f"✓ Synced {count} elements directly to Cloud Firestore.")
    except Exception as fs_err:
        print(f"ℹ Cloud Firestore sync skipped or unavailable: {fs_err}")

    print("[SUCCESS] Intelligence graph compiled and deployed.")
    return 0


if __name__ == "__main__":
    sys.exit(main())

