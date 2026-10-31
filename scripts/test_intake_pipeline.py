"""
Offline intake regression tests. Tests parser and review classifications only.
No Firebase credentials, network calls, independent employees, or assertions
that allegations are verified are required.
"""
import sys
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(Path(__file__).resolve().parent))
from intake_engine import ForensicIntakeEngine
from expert_board_agents import ExpertBoardExtractionEngine
from fact_consensus_auditor import FactConsensusAuditor
from compile_intelligence_graph import GraphCompiler


def run_pipeline_test():
    intake = ForensicIntakeEngine(workspace_root=ROOT)
    claim = ("Liberty County courthouse correspondence refers to "
             "Shelby Cain Buchhorn and Judge Chap B Cain III. "
             "A recorded mineral trust conveyance is mentioned, "
             "but neither improper influence nor current ownership is established.")
    received = intake.parse_text_or_social_post(claim, "regression_test")
    assert len(received["sha256"]) == 64
    assert received["extracted_text"] == claim

    extractor = ExpertBoardExtractionEngine()
    candidates = extractor.analyze_intake_payload(claim)
    assert "total_extracted_elements" in candidates
    auditor = FactConsensusAuditor(workspace_root=ROOT)
    result = auditor.verify_candidate_entities(candidates)
    assert result["verified_count"] == 0, "Unreviewed text cannot verify misconduct"
    assert all(x["status"] != "VERIFIED" for x in result["findings"])

    # Positive: an exact known name can create an identity review candidate.
    # Negative: overlapping subject or surname can never certify a relationship.
    auditor.ground_truth = {"nodes": [
        {"id": "shelby", "label": "Shelby Cain Buchhorn"},
        {"id": "chap", "label": "Chap B Cain III"}
    ]}
    exact = auditor.verify_candidate_entities({"names": [
        {"match": "Shelby Cain Buchhorn", "persona": "Identity review"},
        {"match": "Shelby Cain", "persona": "Identity review"},
        {"match": "Cain minerals", "persona": "Property review"},
        {"match": "medical DWI discovery", "persona": "Public records"}
    ]})
    statuses = [f["status"] for f in exact["findings"]]
    assert statuses == [
        "IDENTITY_CANDIDATE", "QUARANTINED_LEAD",
        "QUARANTINED_LEAD", "QUARANTINED_LEAD"
    ], statuses
    assert exact["verified_count"] == 0

    # Graph integrity check must not mutate production output.
    compiler = GraphCompiler(workspace_root=ROOT)
    graph = compiler.load_graph()
    compiler.validate_graph_schema(graph)
    print(json.dumps({
        "status": "PASS — OFFLINE REGRESSION ONLY",
        "sha256_length": len(received["sha256"]),
        "extractions": candidates["total_extracted_elements"],
        "verified_allegations": exact["verified_count"],
        "identity_test": statuses,
        "nodes": len(graph["nodes"]),
        "edges": len(graph["edges"])
    }, indent=2))
    return 0


if __name__ == "__main__":
    sys.exit(run_pipeline_test())
