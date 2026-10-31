"""
Evidence review gate for the Political Swamp intake pipeline.

Identity or keyword matches are leads, not verified wrongdoing. A validated
entity label only confirms a candidate identity association; publication of
allegations requires independently reviewed original records.
"""
import json
import re
from pathlib import Path


def normalize(value):
    return " ".join(re.findall(r"[a-z0-9]+", str(value or "").lower()))


class FactConsensusAuditor:
    def __init__(self, workspace_root=None):
        self.workspace_root = Path(workspace_root) if workspace_root else Path(__file__).resolve().parent.parent
        self.graph_path = self.workspace_root / "public" / "data" / "network_graph.json"
        self.ground_truth = self._load_ground_truth()

    def _load_ground_truth(self):
        # Use local dataset for repeatable, credential-free tests.
        # A Firestore runtime may separately check fresh authoritative records.
        if self.graph_path.exists():
            with open(self.graph_path, "r", encoding="utf-8") as stream:
                obj = json.load(stream)
                if isinstance(obj, dict):
                    return obj
        return {"nodes": [], "edges": []}

    def verify_candidate_entities(self, extracted_payload):
        nodes = self.ground_truth.get("nodes", [])
        results = []
        for family, items in extracted_payload.items():
            if not isinstance(items, list):
                continue
            for item in items:
                phrase = str(item.get("match", "")).strip()
                key = normalize(phrase)
                found = None
                if key and len(key.split()) >= 2:
                    for node in nodes:
                        labels = [node.get("label", "")] + (node.get("aliases") or [])
                        if any(normalize(label) == key for label in labels):
                            found = node
                            break
                # Even exact name equality is not a provenance-checked allegation.
                # Do not treat survey proximity, a surname, or topic keywords as proof.
                status = "IDENTITY_CANDIDATE" if found else "QUARANTINED_LEAD"
                results.append({
                    "source_persona": item.get("persona", family),
                    "entity_type": item.get("entity_type", "entity"),
                    "raw_match": phrase,
                    "vector": item.get("vector", "GENERAL"),
                    "confidence_score": 0.0,
                    "status": status,
                    "ground_truth_node": found.get("id") if found else None,
                    "notes": (
                        "Exact existing label/alias match, identity candidate only; "
                        "requires independently checked original source and decision nexus."
                        if found else "No exact identity anchor; preserve as unverified lead."
                    ),
                })
        return {
            "total_evaluated": len(results),
            "verified_count": 0,
            "identity_candidate_count": sum(r["status"] == "IDENTITY_CANDIDATE" for r in results),
            "quarantined_count": sum(r["status"] == "QUARANTINED_LEAD" for r in results),
            "findings": results,
        }


if __name__ == "__main__":
    auditor = FactConsensusAuditor()
    test = {"title_real_estate": [{"match": "Aaron Cherry A-10", "persona": "Title Reviewer"}]}
    print(json.dumps(auditor.verify_candidate_entities(test), indent=2))
