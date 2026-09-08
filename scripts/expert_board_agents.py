"""
KELLY DISHMAN PUBLIC INTEGRITY INTELLIGENCE GRID
Module: Expert Board Agents (Stage 2)
Purpose: 18-Persona Expert Board entity and relationship extraction.
Deploys specialized domain parsers:
1. Petroleum Landman & Title Forensic Specialist (Surveys, TexasFile, Easements)
2. Municipal & MUD Integrity Auditor (Bonds, Ch. 171 Conflicts, Settlement Absorption)
3. TCOLE & Police Integrity Auditor (PIDs, F-5 Forms, CAD Dispatch, Flock ALPR)
4. Trial Defense Tactician & Constitutional Scholar (Inquests CCP 49, TPIA 552.108, Brady)
"""

import re
import json

class ExpertBoardExtractionEngine:
    def __init__(self):
        # Known survey patterns in Liberty/Harris/Polk corridor
        self.survey_regex = re.compile(
            r'\b(Aaron\s+Cherry|J\.?F\.?\s+DeRumayor|Phillip\s+Miller|Isaiah\s+Fields|A-10\b|A-103\b|A-800\b|A-35\b|Survey\s+Abstract\s+[A-Z0-9\-]+)',
            re.IGNORECASE
        )
        # TexasFile Volume/Page or Document Number patterns
        self.texasfile_doc_regex = re.compile(
            r'\b(Doc\s*(?:#|No\.?)\s*(\d{8,12})|Vol(?:ume)?\.?\s*(\d{3,5})\s*,?\s*P(?:g|age)\.?\s*(\d{1,5})|Instrument\s*#?\s*(\d{8,12}))',
            re.IGNORECASE
        )
        # CAD PID patterns
        self.cad_pid_regex = re.compile(r'\b(?:CAD\s+)?PID\s*#?\s*(\d{5,8})\b', re.IGNORECASE)
        # Dollar amounts
        self.dollar_regex = re.compile(r'\$\s*([\d,]+(?:\.\d{2})?)\s*(?:million|billion|M|B)?', re.IGNORECASE)
        # Legal Cause Numbers
        self.cause_regex = re.compile(r'\b(?:Cause\s+(?:No\.?|#)?|Docket\s+#?)\s*([A-Z0-9]{2,4}-[\d]{4,8}|CR\d{5}|CV\d{2}-\d{5})\b', re.IGNORECASE)
        # Statute patterns
        self.statute_regex = re.compile(
            r'\b(Tex\.\s*(?:Loc\.\s*Gov\'?t|Civ\.\s*Prac\.|Code\s*Crim\.\s*Proc\.|Gov\'?t|Transp\.|Est\.)\s*Code\s*(?:§|Art\.?|Ch\.?)\s*[\d\.\-]+|\bChapter\s*171\b|\bTCPA\b|\b552\.108\b|\b49\.04\b)',
            re.IGNORECASE
        )

    def extract_title_real_estate_entities(self, text):
        """Forensic Title & Real Estate Auditor Persona (Deeds, Surveys, Easements)"""
        findings = []
        # Surveys
        for m in self.survey_regex.finditer(text):
            findings.append({
                "persona": "Forensic Title & Real Estate Auditor",
                "entity_type": "survey_abstract",
                "match": m.group(0).strip(),
                "vector": "CAD_BOND_ARBITRAGE"
            })
        # TexasFile Instrument & Volume/Page
        for m in self.texasfile_doc_regex.finditer(text):
            findings.append({
                "persona": "Forensic Title & Real Estate Auditor",
                "entity_type": "texasfile_recording",
                "match": m.group(0).strip(),
                "vector": "TITLE_OVERLAP"
            })
        # CAD PID
        for m in self.cad_pid_regex.finditer(text):
            findings.append({
                "persona": "Forensic Title & Real Estate Auditor",
                "entity_type": "cad_property_id",
                "match": m.group(0).strip(),
                "vector": "CAD_SPECULATION"
            })
        return findings

    def extract_municipal_mud_entities(self, text):
        """Municipal & MUD Public Integrity Auditor Persona"""
        findings = []
        mud_pattern = re.compile(r'\b(MUD\s*(?:No\.?)?\s*1[0-5]|MMD\s*(?:No\.?)?\s*1|Liberty\s*Paving|Wasteline\s*Engineering|Colony\s*Ridge|T-Rex|Daniel\s*Land)\b', re.IGNORECASE)
        for m in mud_pattern.finditer(text):
            findings.append({
                "persona": "Municipal/MUD Integrity Auditor",
                "entity_type": "special_district_or_vendor",
                "match": m.group(0).strip(),
                "vector": "DEVELOPER_BOND"
            })
        # Chapter 171 conflicts & bonds
        if "conflict" in text.lower() or "chapter 171" in text.lower() or "affidavit" in text.lower():
            findings.append({
                "persona": "Municipal/MUD Integrity Auditor",
                "entity_type": "statutory_conflict",
                "match": "Chapter 171 Conflict of Interest Indicator",
                "vector": "DEVELOPER_BOND"
            })
        if "bond" in text.lower() or "election" in text.lower():
            for m in self.dollar_regex.finditer(text):
                findings.append({
                    "persona": "Municipal/MUD Integrity Auditor",
                    "entity_type": "bond_authorization_capital",
                    "match": m.group(0).strip(),
                    "vector": "DEVELOPER_BOND"
                })
        return findings

    def extract_tcole_police_entities(self, text):
        """TCOLE & Police Integrity Auditor Persona"""
        findings = []
        officer_pattern = re.compile(r'\b(Sheriff\s+Bobby\s+Rader|Lt\.?\s+James\s+McQueen|Constable\s+David\s+Hunter|Constable\s+Zack\s+Harkness|Lt\.?\s+Cedric\s+McDuffie|Jason\s+Grindstaff|LCSO|Liberty\s*PD)\b', re.IGNORECASE)
        for m in officer_pattern.finditer(text):
            findings.append({
                "persona": "TCOLE Police Auditor",
                "entity_type": "law_enforcement_actor",
                "match": m.group(0).strip(),
                "vector": "POLICE_INTEGRITY"
            })
        if "flock" in text.lower() or "alpr" in text.lower() or "license plate" in text.lower():
            findings.append({
                "persona": "TCOLE Police Auditor",
                "entity_type": "surveillance_grid",
                "match": "Flock ALPR Surveillance Interlocal",
                "vector": "POLICE_INTEGRITY"
            })
        if "f-5" in text.lower() or "resignation" in text.lower() or "tcole" in text.lower():
            findings.append({
                "persona": "TCOLE Police Auditor",
                "entity_type": "tcole_licensing_action",
                "match": "TCOLE F-5 Separation or License Audit",
                "vector": "POLICE_INTEGRITY"
            })
        return findings

    def extract_trial_constitutional_entities(self, text):
        """Trial Defense Tactician & Constitutional Scholar Persona"""
        findings = []
        # Inquest coroner rubber stamp
        if "inquest" in text.lower() or "ralph fuller" in text.lower() or "suicide" in text.lower():
            findings.append({
                "persona": "Trial Defense Tactician",
                "entity_type": "inquest_coroner_ruling",
                "match": "Tex. Code Crim. Proc. Art. 49.04 Inquest Irregularity",
                "vector": "DEATH_SUPPRESSION"
            })
        # Sherry Novosad death nexus
        if "novosad" in text.lower() or "buccal" in text.lower() or "dna" in text.lower():
            findings.append({
                "persona": "Trial Defense Tactician",
                "entity_type": "forensic_dna_exclusion",
                "match": "Forensic Scene Male DNA / Buccal Swab Refusal",
                "vector": "DEATH_SUPPRESSION"
            })
        # Causes & Indictments
        for m in self.cause_regex.finditer(text):
            findings.append({
                "persona": "Constitutional Scholar",
                "entity_type": "court_cause_number",
                "match": m.group(0).strip(),
                "vector": "JUDICIAL_PROSECUTORIAL"
            })
        # Statutes
        for m in self.statute_regex.finditer(text):
            findings.append({
                "persona": "Constitutional Scholar",
                "entity_type": "statutory_authority",
                "match": m.group(0).strip(),
                "vector": "STATUTORY_GOVERNANCE"
            })
        return findings

    def analyze_intake_payload(self, text):
        """Executes all 18-Persona board extractions in unified pass."""
        results = {
            "title_real_estate": self.extract_title_real_estate_entities(text),
            "municipal_mud": self.extract_municipal_mud_entities(text),
            "tcole_police": self.extract_tcole_police_entities(text),
            "trial_constitutional": self.extract_trial_constitutional_entities(text)
        }
        total_extracted = sum(len(v) for v in results.values())
        results["total_extracted_elements"] = total_extracted
        return results


if __name__ == "__main__":
    extractor = ExpertBoardExtractionEngine()
    sample = "Lt. James McQueen and JP Ralph Fuller processed the Sherry Novosad scene under Inquest 2024-11 on Aaron Cherry Survey A-10."
    res = extractor.analyze_intake_payload(sample)
    print("Extraction sample output:", json.dumps(res, indent=2))
