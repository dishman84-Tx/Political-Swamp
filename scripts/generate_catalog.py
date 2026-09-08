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

# Group files
catalog = {
    "01_EVIDENCE_EXHIBITS": [],
    "02_INVESTIGATIVE_REPORTS": [],
    "03_SOCIAL_AND_VISUAL_INTAKE": [],
    "04_REGULATORY_AND_AGENDAS": [],
    "05_TRACKERS_AND_DATA": []
}

for f in sorted(files, key=lambda x: x.name.lower()):
    cat_code, cat_name = classify_file(f.name)
    entities = extract_entities(f.name)
    size_kb = round(f.stat().st_size / 1024, 1)
    catalog[cat_code].append({
        "name": f.name,
        "cat_name": cat_name,
        "size_kb": size_kb,
        "entities": entities,
        "ext": f.suffix.lower()
    })

# Build Markdown
md = f"""---
title: Master Political Swamp Evidence & Document Catalog
aliases: [Political Swamp Index, Liberty County Evidence Register]
tags: [catalog, public-integrity, liberty-county, evidence-manifest, obsidian-architecture]
status: active
date_updated: {datetime.now().strftime('%Y-%m-%d')}
total_indexed_files: {len(files)}
---

# ?? MASTER POLITICAL SWAMP EVIDENCE & DOCUMENT CATALOG
**Jurisdiction:** Liberty County &bull; Montgomery County &bull; Harris County &bull; Polk County  
**Single Source of Truth:** `C:/Users/kelly/My Drive/POLITICAL SWAMP/`  
**Total Tracked Files:** {len(files)} Active Files

> **CATALOG PURPOSE & RULES:**
> 1. All investigative reports, public filings, grand jury indictments, and social media leaks are cataloged here with [[Wikilinks]] for instant Obsidian graph connectivity.
> 2. Zero Orphan Files: Every file is mapped to its core entities, statutes, and power center vectors.
> 3. Standard naming conventions allow cross-assistant discovery without duplicate scans or lost context.

---

## 1. EVIDENCE & PRIMARY INSTRUMENTS (`01_EVIDENCE_EXHIBITS`)
*Primary court filings, TexasFile county clerk recordings, TCEQ water dockets, and verified public records.*

| File Name | Entities Linked | Size | Type |
|---|---|---|---|
"""

for item in catalog["01_EVIDENCE_EXHIBITS"]:
    md += f"| `[{item['name']}]({item['name']})` | {item['entities']} | {item['size_kb']} KB | `{item['ext']}` |\n"

md += f"""
---

## 2. INVESTIGATIVE REPORTS & SPECIAL BRIEFS (`02_INVESTIGATIVE_REPORTS`)
*Consolidated dossiers, vulnerability audits, forensic memos, and matrix files.*

| File Name | Entities Linked | Size | Type |
|---|---|---|---|
"""

for item in catalog["02_INVESTIGATIVE_REPORTS"]:
    md += f"| `[{item['name']}]({item['name']})` | {item['entities']} | {item['size_kb']} KB | `{item['ext']}` |\n"

md += f"""
---

## 3. SOCIAL MEDIA & VISUAL INTAKE (`03_SOCIAL_AND_VISUAL_INTAKE`)
*Screenshots, whistleblower message leaks, TikTok video captures, and photographic exhibits.*

| File Name | Entities Linked | Size | Type |
|---|---|---|---|
"""

for item in catalog["03_SOCIAL_AND_VISUAL_INTAKE"]:
    md += f"| `[{item['name']}]({item['name']})` | {item['entities']} | {item['size_kb']} KB | `{item['ext']}` |\n"

md += f"""
---

## 4. REGULATORY AGENDAS & VOTER RECORDS (`04_REGULATORY_AND_AGENDAS`)
*Commissioners Court regular meeting agendas, TCEQ permits, and daily voter registration poll lists.*

| File Name | Entities Linked | Size | Type |
|---|---|---|---|
"""

for item in catalog["04_REGULATORY_AND_AGENDAS"]:
    md += f"| `[{item['name']}]({item['name']})` | {item['entities']} | {item['size_kb']} KB | `{item['ext']}` |\n"

md += f"""
---

## 5. DATA REGISTERS & MASTER TRACKERS (`05_TRACKERS_AND_DATA`)
*Master Excel spreadsheets, Google Sheets links, CSV logs, and JSON telemetry feeds.*

| File Name | Entities Linked | Size | Type |
|---|---|---|---|
"""

for item in catalog["05_TRACKERS_AND_DATA"]:
    md += f"| `[{item['name']}]({item['name']})` | {item['entities']} | {item['size_kb']} KB | `{item['ext']}` |\n"

catalog_out = workspace / "00_MASTER_POLITICAL_SWAMP_CATALOG.md"
with open(catalog_out, "w", encoding="utf-8") as f:
    f.write(md)

print(f"[SUCCESS] Generated {catalog_out} indexing {len(files)} files.")
