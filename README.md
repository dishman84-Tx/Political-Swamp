# Liberty County Public Integrity Intelligence Grid (Political Swamp v4.1)

An institutional-grade intelligence portal and multi-vector network visualization tracking municipal, judicial, law enforcement, and real estate corruption cartels across Liberty County, Texas.

🌐 **Live Portal**: [https://mission-political-swamp.web.app](https://mission-political-swamp.web.app)

---

## Architecture Overview

- **Frontend**: Vite + Vanilla ES Modules SPA with Tailwind CSS
- **Network Graph Engine**: Cytoscape.js with COSE force-directed layout (7.5M repulsion physics, high-contrast cartel mapping, clutter-free edge labels)
- **Backend / Datastore**: Google Firebase (Spark Free Tier)
  - Firebase Hosting (content-hashed assets, no-cache index)
  - Firebase Authentication (Google Sign-In)
  - Cloud Firestore (real-time collections for entities, edges, intake queue, audit log)
- **Forensic Pipeline**: Python 3.11+ intake engine, document OCR/extraction, entity consensus auditor, and Obsidian-native evidence cataloging

---

## 4 Tracked Cartels & High-Contrast Taxonomy

| Cartel | Color Hex | Key Entities & Vectors |
|---|---|---|
| **Developer & Bond Syndicate** | `#14b8a6` (Teal) | Colony Ridge, MUD 15, Quadvest, Trey Harris, bond underwriting |
| **Law Enforcement, Inquest & Death Suppression** | `#ef4444` (Crimson) | Sheriff Bobby Rader, Lt. Cedric McDuffie, JP Ralph Fuller, Flock ALPR |
| **School Board, CAD & Construction Arbitrage** | `#f59e0b` (Amber) | Tarkington ISD Board, CAD appraisal inflation, Burns Architecture |
| **Judicial & Prosecutorial Family Dynasty** | `#a855f7` (Purple) | DA Jennifer Bergman, Zack Harkness, Hon. Chap B. Cain III, nepotism loops |

---

## Repository Structure

```
POLITICAL SWAMP/
├── 01_evidence/       # Primary instruments, deeds, court filings, open records
├── 02_reports/        # Investigative reports, dossiers, vulnerability audits
├── 03_media/          # Photographic exhibits, video captures, leaks
├── 04_data/           # Spreadsheets, voter rolls, campaign finance registers
├── 05_tools/          # Automation scripts, webhooks, intake dispatchers
├── src/
│   ├── css/main.css   # Custom styling, drawer, floating HUDs
│   ├── js/
│   │   ├── auth.js    # Google Sign-In with popup + redirect fallback
│   │   ├── drawer.js  # Entity dossier slide-out inspection panel
│   │   ├── entities.js# Searchable entity matrix with risk scoring
│   │   ├── firebase-config.js # Firebase app initialization
│   │   ├── firestore.js# Firestore real-time listeners & fallback
│   │   ├── graph.js   # Cytoscape network graph physics & styling
│   │   ├── intake.js  # Intake Studio drag-drop file hashing & queue
│   │   ├── main.js    # SPA coordinator, header controls, tabs
│   │   └── timeline.js# Chronological forensic schemes & timeline
│   └── index.html     # Unified 5-tab SPA interface
├── scripts/           # Python pipeline utilities & catalog generator
├── dist/              # Production Vite bundle deployed to Firebase
├── firebase.json      # Firebase hosting and security headers
└── firestore.rules    # Team allowlist read/write security rules
```

---

## Development & Deployment

### 1. Local Development
```powershell
npm install
npm run dev
```

### 2. Production Build
```powershell
npm run build
```

### 3. Deploy to Firebase
```powershell
npm run deploy
```

---

## Master Catalog & Evidence Manifest

The single source of truth for all documentary evidence and forensic exhibits is cataloged natively in Obsidian format in `00_MASTER_POLITICAL_SWAMP_CATALOG.md`. Run `python scripts/generate_catalog.py` to refresh the index.
