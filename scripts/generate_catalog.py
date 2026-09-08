"""
KELLY DISHMAN PUBLIC INTEGRITY INTELLIGENCE GRID
Module: Catalog & Index Generator
Purpose: Scans all 158+ files in POLITICAL SWAMP, classifies each file into 5 institutional categories,
extracts key entities, dates, and docket numbers, and writes a comprehensive Obsidian-native catalog
00_MASTER_POLITICAL_SWAMP_CATALOG.md.
"""

import os
import re
from pathlib import Path
from datetime import datetime

workspace = Path(r"C:\Users\kelly\My Drive\POLITICAL SWAMP")
files = [f for f in workspace.iterdir() if f.is_file() and not f.name.startswith("~$")]

# Taxonomy & Classification Rules
def classify_file(filename):
    name_lower = filename.lower()
    ext = Path(filename).suffix.lower()

    if ext in [".png", ".jpg", ".jpeg", ".mp4"]:
        if "deed" in name_lower or "quintana" in name_lower or "abbott" in name_lower:
            return "01_EVIDENCE_EXHIBITS", "Documentary & Photographic Evidence"
        return "03_SOCIAL_AND_VISUAL_INTAKE", "Social Media & Visual Evidence"

    if ext in [".docx", ".gdoc"]:
        if "report" in name_lower or "dossier" in name_lower or "handbook" in name_lower or "audit" in name_lower or "review" in name_lower:
            return "02_INVESTIGATIVE_REPORTS", "Investigative Reports & Briefs"
        return "02_INVESTIGATIVE_REPORTS", "Investigative Working Drafts"

    if ext == ".pdf":
        if "voter" in name_lower or "agenda" in name_lower or "tceq" in name_lower:
            return "04_REGULATORY_AND_AGENDAS", "Regulatory Agendas & Voter Records"
        return "01_EVIDENCE_EXHIBITS", "Public Records & Court Filings"

    if ext in [".xlsx", ".gsheet", ".csv"]:
        return "05_TRACKERS_AND_DATA", "Data Registers & Master Trackers"

    if ext == ".md":
        return "02_INVESTIGATIVE_REPORTS", "Obsidian Core Matrices"

    return "01_EVIDENCE_EXHIBITS", "General Evidence"

def extract_entities(filename):
    name_lower = filename.lower()
    entities = []
    if "bergman" in name_lower: entities.append("[[Jennifer Bergman]]")
    if "harkness" in name_lower: entities.append("[[Zack Harkness]]")
    if "colony" in name_lower or "ridge" in name_lower: entities.append("[[Colony Ridge]]")
    if "mud" in name_lower or "15" in name_lower: entities.append("[[Liberty County MUD No. 15]]")
    if "mcduffie" in name_lower: entities.append("[[Lt. Cedric McDuffie]]")
    if "novosad" in name_lower: entities.append("[[Sherry Lee Novosad]]")
    if "mcqueen" in name_lower: entities.append("[[Lt. James McQueen]]")
    if "fuller" in name_lower: entities.append("[[JP Ralph Fuller]]")
    if "rader" in name_lower: entities.append("[[Sheriff Bobby Rader]]")
    if "bush" in name_lower: entities.append("[[Klint Bush]]")
    if "cook" in name_lower: entities.append("[[Emily Kebodeaux Cook]]")
    if "grindstaff" in name_lower: entities.append("[[Jason Grindstaff]]")
    if "burns" in name_lower: entities.append("[[Burns Architecture]]")
    if "johnson" in name_lower: entities.append("[[Tom Johnson]]")
    if "rollins" in name_lower: entities.append("[[Jimmy & Susan Rollins]]")
    if "tisd" in name_lower or "tarkington" in name_lower: entities.append("[[Tarkington ISD Board]]")
    if "hunter" in name_lower or "pct5" in name_lower or "pct 5" in name_lower: entities.append("[[Constable David Hunter]]")
    if "tceq" in name_lower: entities.append("[[TCEQ]]")
    if "flock" in name_lower: entities.append("[[Flock ALPR]]")
    if "cain" in name_lower: entities.append("[[Hon. Chap B. Cain III]]")
    if "brents" in name_lower: entities.append("[[Tommy Brents]]")
    return ", ".join(entities) if entities else "General Jurisdictional"

# Category directories mapping
CATEGORY_FOLDERS = [
    ("01_evidence", "01_EVIDENCE_EXHIBITS", "Primary Evidence & Instruments"),
    ("02_reports", "02_INVESTIGATIVE_REPORTS", "Investigative Reports & Special Briefs"),
    ("03_media", "03_SOCIAL_AND_VISUAL_INTAKE", "Social Media & Visual Intake"),
    ("04_data", "04_REGULATORY_AND_AGENDAS", "Regulatory Agendas & Master Trackers"),
    ("05_tools", "05_TRACKERS_AND_DATA", "Automation Tools & Analytical Scripts")
]

catalog = {
    "01_EVIDENCE_EXHIBITS": [],
    "02_INVESTIGATIVE_REPORTS": [],
    "03_SOCIAL_AND_VISUAL_INTAKE": [],
    "04_REGULATORY_AND_AGENDAS": [],
    "05_TRACKERS_AND_DATA": []
}

total_files = 0

# 1. Scan categorized subdirectories
for folder_name, cat_code, display_name in CATEGORY_FOLDERS:
    folder_path = workspace / folder_name
    if not folder_path.exists():
        continue
    for f in sorted(folder_path.iterdir(), key=lambda x: x.name.lower()):
        if f.is_file() and not f.name.startswith("~$"):
            total_files += 1
            rel_path = f"{folder_name}/{f.name}"
            size_kb = round(f.stat().st_size / 1024, 1)
            entities = extract_entities(f.name)
            catalog[cat_code].append({
                "name": f.name,
                "rel_path": rel_path,
                "size_kb": size_kb,
                "entities": entities,
                "ext": f.suffix.lower()
            })

# 2. Scan root files (gdoc, gsheet, xlsx, csv, md)
for f in sorted(workspace.iterdir(), key=lambda x: x.name.lower()):
    if f.is_file() and not f.name.startswith("~$"):
        if f.suffix.lower() in [".gdoc", ".gsheet", ".xlsx", ".csv"]:
            total_files += 1
            size_kb = round(f.stat().st_size / 1024, 1) if f.stat().st_size > 0 else 0.1
            entities = extract_entities(f.name)
            target_cat = "04_REGULATORY_AND_AGENDAS" if f.suffix.lower() in [".xlsx", ".csv"] else "02_INVESTIGATIVE_REPORTS"
            catalog[target_cat].append({
                "name": f.name,
                "rel_path": f.name,
                "size_kb": size_kb,
                "entities": entities,
                "ext": f.suffix.lower()
            })

# Build Markdown
now_str = datetime.now().strftime('%Y-%m-%d')
md = f"""---
title: Master Political Swamp Evidence & Document Catalog
aliases: [Political Swamp Index, Liberty County Evidence Register]
tags: [catalog, public-integrity, liberty-county, evidence-manifest, obsidian-architecture]
status: active
date_updated: {now_str}
total_indexed_files: {total_files}
---

# 🏛️ MASTER POLITICAL SWAMP EVIDENCE & DOCUMENT CATALOG
**Jurisdiction:** Liberty County &bull; Montgomery County &bull; Harris County &bull; Polk County  
**Single Source of Truth:** `C:/Users/kelly/My Drive/POLITICAL SWAMP/`  
**Total Tracked Files:** {total_files} Active Files

> **CATALOG PURPOSE & RULES:**
> 1. All investigative reports, public filings, grand jury indictments, and social media leaks are cataloged here with [[Wikilinks]] for instant Obsidian graph connectivity.
> 2. Zero Orphan Files: Every file is mapped to its core entities, statutes, and power center vectors.
> 3. Standard naming conventions allow cross-assistant discovery without duplicate scans or lost context.

---

## 1. EVIDENCE & PRIMARY INSTRUMENTS (`01_evidence/`)
*Primary court filings, TexasFile county clerk recordings, TCEQ water dockets, and verified public records.*

| File Name | Entities Linked | Size | Type |
|---|---|---|---|
"""

for item in catalog["01_EVIDENCE_EXHIBITS"]:
    md += f"| `[{item['name']}]({item['rel_path']})` | {item['entities']} | {item['size_kb']} KB | `{item['ext']}` |\n"

md += f"""
---

## 2. INVESTIGATIVE REPORTS & SPECIAL BRIEFS (`02_reports/`)
*Consolidated dossiers, vulnerability audits, forensic memos, and matrix files.*

| File Name | Entities Linked | Size | Type |
|---|---|---|---|
"""

for item in catalog["02_INVESTIGATIVE_REPORTS"]:
    md += f"| `[{item['name']}]({item['rel_path']})` | {item['entities']} | {item['size_kb']} KB | `{item['ext']}` |\n"

md += f"""
---

## 3. SOCIAL MEDIA & VISUAL INTAKE (`03_media/`)
*Screenshots, whistleblower message leaks, TikTok video captures, and photographic exhibits.*

| File Name | Entities Linked | Size | Type |
|---|---|---|---|
"""

for item in catalog["03_SOCIAL_AND_VISUAL_INTAKE"]:
    md += f"| `[{item['name']}]({item['rel_path']})` | {item['entities']} | {item['size_kb']} KB | `{item['ext']}` |\n"

md += f"""
---

## 4. REGULATORY AGENDAS & MASTER TRACKERS (`04_data/`)
*Commissioners Court regular meeting agendas, TCEQ permits, and voter registration poll lists.*

| File Name | Entities Linked | Size | Type |
|---|---|---|---|
"""

for item in catalog["04_REGULATORY_AND_AGENDAS"]:
    md += f"| `[{item['name']}]({item['rel_path']})` | {item['entities']} | {item['size_kb']} KB | `{item['ext']}` |\n"

md += f"""
---

## 5. AUTOMATION TOOLS & ANALYTICAL SCRIPTS (`05_tools/`)
*Standalone utility scripts, webhook dispatchers, and pipeline helpers.*

| File Name | Entities Linked | Size | Type |
|---|---|---|---|
"""

for item in catalog["05_TRACKERS_AND_DATA"]:
    md += f"| `[{item['name']}]({item['rel_path']})` | {item['entities']} | {item['size_kb']} KB | `{item['ext']}` |\n"

catalog_out = workspace / "00_MASTER_POLITICAL_SWAMP_CATALOG.md"
with open(catalog_out, "w", encoding="utf-8") as f:
    f.write(md)

print(f"[SUCCESS] Generated {catalog_out} indexing {total_files} files.")
