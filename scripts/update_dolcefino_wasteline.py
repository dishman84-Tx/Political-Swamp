import json
from pathlib import Path

WORKSPACE = Path(r"C:\Users\kelly\My Drive\POLITICAL SWAMP")
GRAPH_JSON_PATH = WORKSPACE / "public" / "data" / "network_graph.json"

with open(GRAPH_JSON_PATH, "r", encoding="utf-8") as f:
    data = json.load(f)

nodes = data.get("nodes", [])
edges = data.get("edges", [])

# 1. Update wayne_dolcefino
for n in nodes:
    if n["id"] == "wayne_dolcefino":
        n["label"] = "Wayne Dolcefino"
        n["role"] = "President, Dolcefino Consulting"
        n["status"] = "Investigative Media / TPIA Plaintiff"
        n["risk_score"] = 10
        n["anchors"] = [
            "Cause No. CV24-00192 (Dolcefino v. LCSO & Sheriff Rader)",
            "457th District Court Santini Recusal ('The Cozy Courthouse')",
            "Liberty PD Nov 20 2025 Pedestrian Crash Investigation",
            "Splendora Municipal Retaliation Probe ('Let's Play Ball')",
            "Harris County Probate Cronyism Audit ('DAMN LAWYERS')",
            "Mont Belvieu Towing Monopoly Investigation"
        ]
        n["notes"] = "Forensic investigative media firm uncovering multi-county corruption: (1) Liberty: Novosad death cover-up/DNA suppression, Liberty PD pedestrian collision logs; (2) Montgomery: Judge Vince Santini refusal to recuse ('The Cozy Courthouse'), Splendora sports complex retaliation; (3) Harris: Probate court cronyism and NewQuest court secrecy."
    
    # 2. Update wasteline_eng with full Texas SOS / Comptroller audit
    if n["id"] == "wasteline_eng":
        n["label"] = "Wasteline Engineering, Inc."
        n["category"] = "vendor"
        n["cartel"] = "Developer & Bond Syndicate"
        n["role"] = "Civil & Wastewater Engineering Firm (MUD 15)"
        n["status"] = "TCEQ Permit WQ0016839001 Applicant / Active TX Corp (Inc. 1983)"
        n["risk_score"] = 92
        n["anchors"] = [
            "Texas SOS File No. 0066609400",
            "Comptroller Taxpayer No. 17518943307",
            "TCEQ Permit WQ0016839001 (Tarkington WWTP #1)",
            "PO Box 421 / 5064 E. I-20 Service Rd S, Willow Park, TX",
            "Affiliated Firm: Breisch & Associates, PLLC (SOS 0801202546)"
        ]
        n["notes"] = "Texas corporation founded 08/01/1983 (Aledo/Willow Park, TX). President & Director: Glenn Breisch. Registered Agent: Jason Breisch. Contracted engineering firm for Liberty County MUD 15 wastewater plant, sludge export pipeline, and drainage detention bypass into Luce Bayou watershed affecting Tarkington Woods."

# 3. Add new nodes if not already present
existing_ids = {n["id"] for n in nodes}

new_nodes = [
    {
        "id": "glenn_breisch",
        "label": "Glenn Breisch, P.E.",
        "category": "vendor",
        "cartel": "Developer & Bond Syndicate",
        "role": "President & Director, Wasteline Engineering, Inc.",
        "status": "Lead Engineer for MUD 15 Drainage & WWTP",
        "risk_score": 86,
        "anchors": [
            "Texas SOS File No. 0066609400",
            "Texas Comptroller PIR 2026",
            "111 Rim Rock Rd, Aledo, TX"
        ],
        "surveys": ["Aaron Cherry A-10"],
        "notes": "President and Director of Wasteline Engineering, Inc. Authored engineering plans and variance applications for MUD 15 wastewater treatment plant (TCEQ WQ0016839001) and regional drainage bypass.",
        "degree_connectivity": 2
    },
    {
        "id": "jason_breisch",
        "label": "Jason Breisch",
        "category": "vendor",
        "cartel": "Developer & Bond Syndicate",
        "role": "Registered Agent, Wasteline Eng / Manager, Breisch & Associates PLLC",
        "status": "Corporate Agent & LLC Manager",
        "risk_score": 76,
        "anchors": [
            "Texas SOS File No. 0801202546 (Breisch & Associates)",
            "Comptroller Taxpayer No. 32040797154",
            "1532 Greenleaf Dr, Aledo, TX"
        ],
        "surveys": [],
        "notes": "Registered agent of Wasteline Engineering, Inc. and managing officer of affiliated engineering/survey entity Breisch & Associates, PLLC in Parker County.",
        "degree_connectivity": 2
    },
    {
        "id": "judge_vince_santini",
        "label": "Judge Vince Santini",
        "category": "judicial",
        "cartel": "Judicial & Prosecutorial Family Dynasty",
        "role": "Presiding Judge, 457th District Court (Montgomery County)",
        "status": "Target of Dolcefino Recusal Motion",
        "risk_score": 85,
        "anchors": [
            "Dolcefino Consulting 'The Cozy Courthouse' (Sept 4, 2026)",
            "457th Judicial District Court Docket",
            "State Commission on Judicial Conduct Referral"
        ],
        "surveys": [],
        "notes": "Presiding Judge of Montgomery County 457th District Court. Exposed by Wayne Dolcefino for hearing cases involving the spouse of another sitting Montgomery County judge and refusing mandatory recusal.",
        "degree_connectivity": 2
    }
]

for nn in new_nodes:
    if nn["id"] not in existing_ids:
        nodes.append(nn)
        print(f"[+] Added new node: {nn['id']} ({nn['label']})")

# 4. Add new relationship edges
existing_edge_keys = {f"{e['source']}__{e['target']}" for e in edges}

new_edges = [
    {
        "source": "glenn_breisch",
        "target": "wasteline_eng",
        "relation": "PRESIDENT_AND_DIRECTOR",
        "evidence": "Texas SOS 0066609400 & Comptroller Franchise Tax 2026 PIR",
        "weight": 5
    },
    {
        "source": "jason_breisch",
        "target": "wasteline_eng",
        "relation": "REGISTERED_AGENT",
        "evidence": "Texas SOS 0066609400 Registered Office Willow Park, TX",
        "weight": 4
    },
    {
        "source": "wasteline_eng",
        "target": "mud_15",
        "relation": "ENGINEERING_AND_SLUDGE_DESIGNER",
        "evidence": "TCEQ Permit WQ0016839001 & MUD 15 Board Minutes",
        "weight": 5
    },
    {
        "source": "wayne_dolcefino",
        "target": "bobby_rader",
        "relation": "TPIA_LAWSUIT_DEFENDANT",
        "evidence": "Cause No. CV24-00192 (Dolcefino v. LCSO) & Texas OAG Release Order",
        "weight": 5
    },
    {
        "source": "wayne_dolcefino",
        "target": "judge_vince_santini",
        "relation": "RECUSAL_AND_CONFLICT_PROBE",
        "evidence": "Dolcefino Media Report 'The Cozy Courthouse' (Sept 4, 2026)",
        "weight": 4
    },
    {
        "source": "wayne_dolcefino",
        "target": "james_mcqueen",
        "relation": "BUCCAL_SWAB_REFUSAL_EXPOSURE",
        "evidence": "Independent Forensic DNA Exclusion Audit & Dolcefino 'Scaredy Cop'",
        "weight": 5
    },
    {
        "source": "judge_vince_santini",
        "target": "chap_cain",
        "relation": "REGIONAL_JUDICIAL_NETWORK",
        "evidence": "9th Administrative Judicial Region Coordination",
        "weight": 3
    }
]

for ne in new_edges:
    k = f"{ne['source']}__{ne['target']}"
    if k not in existing_edge_keys:
        edges.append(ne)
        print(f"[+] Added new edge: {k} ({ne['relation']})")

data["nodes"] = nodes
data["edges"] = edges

with open(GRAPH_JSON_PATH, "w", encoding="utf-8") as f:
    json.dump(data, f, indent=2)

print(f"\n[SUCCESS] Updated {GRAPH_JSON_PATH}: {len(nodes)} nodes, {len(edges)} edges.")
