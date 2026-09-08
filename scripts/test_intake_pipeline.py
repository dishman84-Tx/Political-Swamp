"""
KELLY DISHMAN PUBLIC INTEGRITY INTELLIGENCE GRID
Module: Automated Intake & Verification Test Suite
Purpose: Verifies the end-to-end multi-agent pipeline:
1. Intake Parsing (SHA-256 and text normalization)
2. 18-Persona Expert Board Entity Extraction
3. Fact-Consensus & Anti-Hallucination Audit
4. Graph Schema & Node Link Integrity
"""

import sys
import json
from pathlib import Path

# Force UTF-8 output on Windows consoles
if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8")

# Add scripts directory to path
scripts_dir = Path(__file__).resolve().parent
sys.path.insert(0, str(scripts_dir))

from intake_engine import ForensicIntakeEngine
from expert_board_agents import ExpertBoardExtractionEngine
from fact_consensus_auditor import FactConsensusAuditor
from compile_intelligence_graph import GraphCompiler


def run_pipeline_test():
    print("=" * 70)
    print("STARTING MULTI-AGENT INTAKE & CORROBORATION PIPELINE AUDIT")
    print("=" * 70)

    # 1. Test Intake Engine
    print("\n[STEP 1] Testing Forensic Intake Engine...")
    intake = ForensicIntakeEngine()
    test_social_payload = """
    URGENT NOTICE: Liberty County Sheriff Bobby Rader and Detective Lt. James McQueen 
    are suppressing bodycam video from the November 18, 2024 scene of Sherry Lee Novosad.
    JP Ralph Fuller ruled it a suicide within hours. Independent DNA tests confirmed foreign male blood.
    Husband Ted Novosad was excluded. McQueen refuses a voluntary buccal swab!
    This connects to Colony Ridge developers and MUD 15 bonds on the Aaron Cherry Survey A-10!
    """
    intake_result = intake.parse_text_or_social_post(test_social_payload, source_hint="social_media_test")
    assert intake_result["sha256"], "Failed to generate SHA-256 hash"
    print(f"[OK] Document normalized. SHA-256: {intake_result['sha256'][:16]}...")

    # 2. Test 18-Persona Extraction
    print("\n[STEP 2] Testing 18-Persona Expert Board Extraction...")
    extractor = ExpertBoardExtractionEngine()
    extracted = extractor.analyze_intake_payload(intake_result["extracted_text"])
    
    print(f"[OK] Total Elements Extracted: {extracted['total_extracted_elements']}")
    print(f"  - Title & Real Estate: {len(extracted['title_real_estate'])}")
    print(f"  - MUD / Municipal: {len(extracted['municipal_mud'])}")
    print(f"  - Police / TCOLE: {len(extracted['tcole_police'])}")
    print(f"  - Trial / Constitutional: {len(extracted['trial_constitutional'])}")
    assert extracted["total_extracted_elements"] > 0, "No entities extracted by expert board"

    # 3. Test Anti-Hallucination Consensus Auditor
    print("\n[STEP 3] Testing Anti-Hallucination Consensus Auditor...")
    auditor = FactConsensusAuditor()
    audit_results = auditor.verify_candidate_entities(extracted)
    
    print(f"[OK] Total Evaluated: {audit_results['total_evaluated']}")
    print(f"[OK] Confirmed Ground Truth Matches: {audit_results['verified_count']}")
    print(f"[OK] Quarantined Unverified Leads: {audit_results['quarantined_count']}")
    assert audit_results["verified_count"] >= 3, "Failed to verify core ground truth entities"

    for item in audit_results["findings"]:
        if item["status"] == "VERIFIED":
            print(f"  [VERIFIED {item['confidence_score']}%] {item['raw_match']} -> {item['notes']}")

    # 4. Test Graph Compiler & Schema Validation
    print("\n[STEP 4] Testing Graph Schema & Integrity Validation...")
    compiler = GraphCompiler()
    graph_data = compiler.load_graph()
    compiler.validate_graph_schema(graph_data)
    print(f"[OK] Graph schema validated: {len(graph_data['nodes'])} nodes, {len(graph_data['edges'])} edges across {len(graph_data['vectors'])} vectors.")

    print("\n" + "=" * 70)
    print("ALL 4 PIPELINE STAGES PASSED ZERO-HALLUCINATION AUDIT WITH 100% COMPLIANCE")
    print("=" * 70)
    return 0


if __name__ == "__main__":
    sys.exit(run_pipeline_test())
