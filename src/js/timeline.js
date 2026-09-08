/**
 * Timeline Module — Schemes & Chronological Forensic Events v4.2
 * Maps the 8 Structural Corruption Schemes + 22 Chronological Events
 * Interactive County Overlap Filter (Liberty Direct, Tri-County, Regional)
 * Full Clickable Entity Interlinking to Drawer & Network Graph
 */
import { getEntities, getEdges } from './firestore.js';

// ==========================================
// 8 FORENSIC CORRUPTION SCHEMES
// ==========================================
export const CORRUPTION_SCHEMES = [
  {
    id: 'scheme_mud_machine',
    schemeNumber: 'SCHEME I',
    title: "Two-Voter MUD Machine & Straw Director Land Conveyance",
    metric: '$88.36M Public Debt Authorized',
    cartel: 'Developer & Bond Syndicate',
    countyOverlap: 'Liberty County Direct',
    overlapReason: 'Direct Liberty County jurisdiction (Plum Grove / Tarkington expansion corridor). MUD 15 bonds authorized via micro-parcels inside Liberty County.',
    summary: 'Colony Ridge hand-picks MUD boards by conveying 20% undivided micro-interests in "Director\'s Lots" (e.g., Correction Special Warranty Deed CF No. 2026017008 from William Harris III to John Monroe Harris) to qualify straw board directors. In May 2025, an $88,360,000 bond authorization was passed with exactly two (2) registered voters (1-1 tie per proposition) administered by indicted Elections Administrator Klint Bush, steering over $22.5M in paving contracts to Liberty Paving LLC and Wasteline Engineering.',
    entities: ['mud_15', 'klint_bush', 'trey_harris', 'john_harris', 'liberty_paving', 'wasteline_eng', 'glenn_breisch', 'david_whitmire'],
    anchors: [
      'Liberty County Deed CF No. 2026017008 (Director\'s Lot #5)',
      'May 2025 MUD 15 Election Canvas ($88.36M Authorization)',
      'TCEQ Special District Oversight File No. 15',
      'Tex. Water Code § 49.052 (Director Qualifications)'
    ]
  },
  {
    id: 'scheme_predatory_churn',
    schemeNumber: 'SCHEME II',
    title: 'Predatory Churn Loop & $68M Settlement Fund Diversion',
    metric: '$68,000,000 Consent Decree / 50x Churn',
    cartel: 'Developer & Bond Syndicate',
    countyOverlap: 'Tri-County Overlap (Liberty • Montgomery • Harris)',
    overlapReason: 'Primary land situs in Liberty County; buyer financing marketed across Houston/Harris County metro; federal court jurisdiction in SDTX Houston.',
    summary: 'Systemic bait-and-switch contract-for-deed financing loop where vulnerable buyers purchase lots lacking basic drainage, water, or sewage at predatory 12-16% interest rates. Properties suffer an estimated 50x foreclosure churn rate, churning 3-5 times per parcel without judicial foreclosure. The Feb/April 2026 $68M DOJ/CFPB consent decree bypassed presiding Judge Alfred Bennett, diverting $48M into developer drainage infrastructure (Fund A) and $20M into county law enforcement (Fund B), completely denying direct restitution to victim families.',
    entities: ['colony_ridge', 'trey_harris', 'john_harris', 'maria_acevedo', 'mud_15', 'bobby_rader'],
    anchors: [
      'DOJ/CFPB v. Colony Ridge (SDTX Civil Action No. 4:23-cv-04799)',
      'Federal Consent Decree Order (Feb 2026 Bypassing Judge Bennett)',
      'Maria Acevedo Formal Federal Objection Brief (Feb 2026)',
      'Equal Credit Opportunity Act (ECOA) & Fair Housing Act Filings'
    ]
  },
  {
    id: 'scheme_lcha_theft',
    schemeNumber: 'SCHEME III',
    title: 'LCHA Housing Authority Embezzlement & Cypritech Shell Conduit',
    metric: '$163,000+ Embezzled / Multi-Felony Indictments',
    cartel: 'Judicial & Prosecutorial Family Dynasty',
    countyOverlap: 'Liberty County Direct',
    overlapReason: 'Liberty County Housing Authority public funds embezzled under county commissioners oversight; prosecuted in 75th / 253rd District Courts.',
    summary: 'Former Elections Administrator and Housing Authority Director Klint Bush indicted alongside former LCHA / CAD Board member Emily Kebodeaux Cook for felony misapplication and theft of $163,000+ in public housing funds across 14 fraudulent transactions. Public voucher funds were laundered through the Cypritech shell entity to finance political campaigns (including a $2,000 retainer to mayoral candidate Tommy Brents). Cook\'s bond was revoked May 27, 2026 by Judge Chap Cain, placing her on GPS ankle monitor with a no-contact order with Bush.',
    entities: ['klint_bush', 'emily_cook', 'chap_cain', 'jay_knight', 'cypritech', 'tommy_brents'],
    anchors: [
      'Liberty County Grand Jury Felony Indictments (Nov 2023, Mar 2026, Apr 2026)',
      'Judge Chap Cain Bond Revocation Order ($75K GPS Ankle Monitor)',
      'Texas Rangers Public Corruption Inquiry File',
      'Tex. Penal Code § 32.45 (Misapplication of Fiduciary Property)'
    ]
  },
  {
    id: 'scheme_tisd_mclub',
    schemeNumber: 'SCHEME IV',
    title: 'Tarkington ISD $45M Prop B Land Deal & M-Club Shadow Treasury',
    metric: '$45,000,000 Real Estate Arbitrage / $95M Bond',
    cartel: 'School Board, CAD & Construction Arbitrage',
    countyOverlap: 'Liberty County Direct',
    overlapReason: 'Tarkington Prairie rural footprint directly within Liberty County; corridor for Grand Parkway (SH 99) to FM 321 developer arterial.',
    summary: 'Tarkington ISD passed a $95M bond package embedding a confidential $45M Proposition B real estate deal executed alongside the M Club of Tarkington Inc (501(c)(3), EIN 93-1956613) and Tarkington Student Foundation. Campus construction and highway corridor clearing contracts were steered to trustee-linked entities (Kevin Johnson / J-Con Services, Tom Johnson / Black Dog Land & Cattle) while Chief Appraiser Jimmy Rollins appraised surrounding expansion tracts.',
    entities: ['tisd_board', 'tarkington_student_foundation', 'm_club_foundation', 'tom_johnson', 'kevin_johnson', 'jimmy_rollins_cad', 'susan_rollins', 'cory_anderson', 'mandy_anderson'],
    anchors: [
      'TISD Bond Proposition B Filings (May 2024)',
      'M Club of Tarkington IRS Form 990 (EIN 93-1956613)',
      'Liberty County Deed Records Doc #2024-009182',
      'Tex. Local Gov\'t Code Ch. 171 Conflict Filings'
    ]
  },
  {
    id: 'scheme_novosad_coverup',
    schemeNumber: 'SCHEME V',
    title: 'LCSO Homicide Suppression & Forensic DNA Tampering: Sherry Lee Novosad',
    metric: 'Foreign Male DNA Suppressed / .410 Neck Wound',
    cartel: 'Law Enforcement, Inquest & Death Suppression',
    countyOverlap: 'Liberty County Direct',
    overlapReason: 'Death scene in Cleveland / Liberty County; investigated by Liberty County Sheriff\'s Office; inquest handled by JP Ralph Fuller.',
    summary: 'Sherry Lee Novosad (DOD 11/18/2024, Cleveland, TX) was found dead with a .410 caliber gunshot wound to the neck, immediately rubber-stamped as \'suicide\' by Sheriff Bobby Rader\'s office and JP Ralph Fuller without a forensic autopsy to protect Detective Sergeant James McQueen (who had an active romantic relationship with decedent). Independent forensic testing by Wayne Dolcefino recovered unidentified foreign male DNA from scene curtains and Sherry\'s clothing; husband Ted Novosad was conclusively excluded. McQueen refuses a voluntary buccal swab, and LCSO withheld bodycam footage under unlawful NDAs, triggering Cause CV24-00192 and Judge Chap Cain\'s recusal.',
    entities: ['sherry_novosad', 'james_mcqueen', 'bobby_rader', 'kathy_hatcher', 'wayne_dolcefino', 'christian_dolcefino', 'ralph_fuller', 'david_meyers', 'ted_novosad', 'chap_cain', 'judge_jd_delaney'],
    anchors: [
      'National Screening Center Lab WO# 2024-STR (Foreign Male DNA Profile)',
      'Cause No. CV24-00192 (Dolcefino Consulting v. LCSO & Bobby Rader)',
      'Texas OAG Open Records Ruling OR2025-Novosad',
      '75th District Court Motion for Judicial Recusal (Judge Chap Cain)'
    ]
  },
  {
    id: 'scheme_jail_arson',
    schemeNumber: 'SCHEME VI',
    title: 'County Jail Arson, $1.1M Lock Scam & ARPA Grant Siphoning',
    metric: '$1.1M Lock Scam / $110M Jail Bond Push',
    cartel: 'Developer & Bond Syndicate',
    countyOverlap: 'Liberty County Direct',
    overlapReason: 'Liberty County Law Enforcement Center (Jail) on State Highway 146 in Liberty, Texas.',
    summary: 'An arson fire ignited April 7, 2025 by capital murder defendant Marco Elihu Jacquez exposed catastrophic structural failure in electronic cell locks funded by 22% of a $5M federal ARPA grant. Commissioners and developer PACs capitalized on the self-inflicted lock failure to push a $110M jail expansion bond. Master architectural contracts were awarded to Burns Architecture (Kenny & Brenda Burns), flagged by county auditors for $612K in questionable fund transfers routed through White Construction.',
    entities: ['burns_architecture', 'kenny_burns', 'brenda_burns', 'marco_jacquez', 'tom_johnson', 'jay_knight', 'david_whitmire'],
    anchors: [
      'Liberty County Jail Fire Incident Report (April 7, 2025)',
      'White Construction $612K Auditor Flagged Transfer Ledger',
      'U.S. Treasury ARPA Compliance Audit (Liberty County Allocation)',
      'Commissioners Court Emergency Session on Detention Facility Bond'
    ]
  },
  {
    id: 'scheme_buckeye_pac',
    schemeNumber: 'SCHEME VII',
    title: 'Buckeye Values PAC Developer Warchest & Unanimity Shield',
    metric: '$1,500,000+ Developer PAC / 99.4% Unanimous Votes',
    cartel: 'Developer & Bond Syndicate',
    countyOverlap: 'Tri-County Overlap (Liberty • Montgomery • Harris)',
    overlapReason: 'Austin PAC conduits underwriting all 4 Liberty County Commissioners, County Judge, DA, and Constables across the multi-county corridor.',
    summary: 'Colony Ridge principals William "Trey" Harris and John Harris funneled over $1.5M through Buckeye Values PAC (#00086542) and American Values First PAC to underwrite the campaigns of all 4 Liberty County Commissioners, County Judge Jay Knight, DA Jennifer Bergman, Sheriff Bobby Rader, and local Constables. In return, the Commissioners Court maintained a 99.4% unanimous voting record (0 recorded NO votes against developer plats or bonds across 8 years), operating as a monolithic rubber-stamp body.',
    entities: ['buckeye_pac', 'trey_harris', 'john_harris', 'jay_knight', 'david_whitmire', 'greg_arthur', 'leon_wilson', 'bruce_karbowski', 'jennifer_bergman', 'bobby_rader', 'murphy_nasica'],
    anchors: [
      'Texas Ethics Commission (TEC) PAC Filing #00086542',
      'Liberty County Commissioners Court Voting Records 2018–2026',
      'TEC Campaign Contribution Statements (Abbott, Bergman, Whitmire)',
      'Tex. Elec. Code § 255.003 Audit Matrix'
    ]
  },
  {
    id: 'scheme_flock_surveillance',
    schemeNumber: 'SCHEME VIII',
    title: 'Tri-County ALPR Surveillance Dragnet & Whistleblower Retaliation',
    metric: 'Cross-County Hotlists / TLETS Database Audits',
    cartel: 'Law Enforcement, Inquest & Death Suppression',
    countyOverlap: 'Tri-County Overlap (Liberty • Montgomery • Harris)',
    overlapReason: 'Surveillance hardware nodes spanning Liberty, Montgomery, Harris, and Walker counties on US-59, I-45, and SH 99.',
    summary: 'Multi-agency deployment of Flock Safety automated license plate reader (ALPR) cameras commanded by City of Liberty PD Lt. Cedric McDuffie across Liberty, Montgomery, and Harris counties. Whistleblower Maria Acevedo was subjected to cross-jurisdictional vehicle tracking and unauthorized TLETS/TCIC database queries after publicly exposing developer deed churn. Acevedo filed a formal TPIA demand auditing raw search logs, custom vehicle hotlists, and inter-agency dispatch records.',
    entities: ['maria_acevedo', 'cedric_mcduffie', 'bobby_rader', 'jason_grindstaff', 'david_meyers', 'texas_rangers'],
    anchors: [
      'TPIA Audit Demand — Maria Acevedo Flock ALPR Logs (July 19, 2026)',
      'TLETS/TCIC Query Audit Trail Records',
      'Flock Safety Multi-Agency Data Sharing Agreement',
      'Texas Rangers Inquiry File on Municipal Police Misconduct'
    ]
  }
];

// ==========================================
// 22 CHRONOLOGICAL FORENSIC EVENTS
// ==========================================
export const TIMELINE_EVENTS = [
  {
    date: '2026-09-04',
    title: "Montgomery County — Dolcefino Confronts Judge Vince Santini ('The Cozy Courthouse')",
    entities: ['wayne_dolcefino', 'judge_vince_santini'],
    cartel: 'Judicial & Prosecutorial Family Dynasty',
    countyOverlap: 'Regional Overlap (Montgomery County)',
    overlapReason: 'Direct precedent on regional judicial recusal standards affecting 75th/253rd visiting dockets and Montgomery County judicial empire.',
    detail: "Wayne Dolcefino calls on 457th District Court Judge Vince Santini to recuse and cease hearing cases involving the spouse of another sitting Montgomery County judge (Tucker). Investigation exposes cronyism, judicial favors, and refusal to step down from conflicted dockets.",
    anchors: ["Dolcefino Media 'The Cozy Courthouse' (Sept 4, 2026)", '457th District Court Recusal Motions']
  },
  {
    date: '2026-08-24',
    title: 'Mont Belvieu — Dolcefino Exposes Municipal Towing Monopoly',
    entities: ['wayne_dolcefino'],
    cartel: 'Business, Corporate Shells & Financial Conduits',
    countyOverlap: 'Regional Overlap (Chambers / Harris / Liberty Line)',
    overlapReason: 'Directly impacts the Chambers-Liberty border corridor (FM 3180 / SH 146) and municipal contract steering without bidding.',
    detail: 'Dolcefino investigation reveals exclusive municipal towing and impound monopoly in Mont Belvieu on the Harris/Chambers county line, highlighting predatory fees and city hall contract steering without competitive bidding.',
    anchors: ["Dolcefino Media 'Monopoly in Mont Belvieu' (Aug 24, 2026)"]
  },
  {
    date: '2026-08-21',
    title: "Liberty County — Dolcefino Files New Legal Action in Novosad Cover-Up ('Chasing Justice')",
    entities: ['wayne_dolcefino', 'bobby_rader', 'james_mcqueen', 'sherry_novosad', 'kathy_hatcher', 'christian_dolcefino', 'david_meyers'],
    cartel: 'Law Enforcement, Inquest & Death Suppression',
    countyOverlap: 'Liberty County Direct',
    overlapReason: 'Liberty County Sheriff\'s Office (LCSO) litigation filed under Cause CV24-00192.',
    detail: 'Dolcefino Consulting files new legal actions targeting Liberty County officials and local judges for withholding deputy bodycam footage from the Sherry Novosad death scene, following Texas OAG orders mandating disclosure under the Public Information Act.',
    anchors: ["Dolcefino Media 'Chasing Justice' (Aug 21, 2026)", 'Cause No. CV24-00192 (Dolcefino v. LCSO)']
  },
  {
    date: '2026-08-01',
    title: 'Klint Bush Indicted — 11 Counts Child Pornography',
    entities: ['klint_bush'],
    cartel: 'Judicial & Prosecutorial Family Dynasty',
    countyOverlap: 'Liberty County Direct',
    overlapReason: 'Liberty County Grand Jury indictment against former county Elections Administrator.',
    detail: 'Former Elections Administrator / LCHA Director indicted on 11 counts possession of child pornography. Bush administered the MUD 15 2-voter election that authorized $88M in developer debt.',
    anchors: ['Liberty County Grand Jury Indictment (Aug 2026)']
  },
  {
    date: '2026-07-19',
    title: 'Maria Acevedo Files Formal TPIA Demand on Flock Safety ALPR Surveillance Grid',
    entities: ['maria_acevedo', 'cedric_mcduffie', 'bobby_rader', 'david_meyers'],
    cartel: 'Law Enforcement, Inquest & Death Suppression',
    countyOverlap: 'Tri-County Overlap (Liberty • Montgomery • Harris)',
    overlapReason: 'Flock Safety camera grid shared across Liberty PD, LCSO, Shenandoah PD, and MCSO.',
    detail: 'Citizen whistleblower Maria Acevedo files a comprehensive Texas Public Information Act (TPIA) demand auditing cross-agency Flock Safety ALPR system logs, custom vehicle hotlist entries, and TLETS/TCIC database queries targeting her across Liberty, Montgomery, and Harris counties under Lt. Cedric McDuffie.',
    anchors: ['TPIA Request — Maria Acevedo Flock ALPR Audit (July 19, 2026)', 'TLETS/TCIC Search History Demand']
  },
  {
    date: '2026-07-03',
    title: 'Jason Grindstaff Surrenders — Official Oppression & Indecent Assault',
    entities: ['jason_grindstaff', 'texas_rangers', 'bobby_rader'],
    cartel: 'Law Enforcement, Inquest & Death Suppression',
    countyOverlap: 'Liberty County Direct',
    overlapReason: 'City of Liberty PD officer booked into Liberty County Jail under Texas Rangers indictment.',
    detail: 'Former Liberty PD officer surrendered on indictment for Official Oppression and Indecent Assault. Resigned Feb 27, 2026 while under Texas Rangers investigation.',
    anchors: ['June 2026 Indictment', 'SB 1445 F-5 Separation Audit', 'Texas Rangers Referral File']
  },
  {
    date: '2026-06-02',
    title: "MUD 15 Director's Lot Straw Conveyance (Doc #2026017008)",
    entities: ['trey_harris', 'john_harris', 'mud_15', 'liberty_paving'],
    cartel: 'Developer & Bond Syndicate',
    countyOverlap: 'Liberty County Direct',
    overlapReason: 'Recorded in Liberty County Official Public Records Doc #2026017008.',
    detail: 'Correction Special Warranty Deed transferred 20% undivided interest in Director\'s Lot 5 from William Harris III to John Monroe Harris to qualify straw board directors who awarded $22.5M in paving contracts to Liberty Paving LLC.',
    anchors: ['Liberty County Clerk Doc #2026017008', 'Tex. Water Code § 49.052']
  },
  {
    date: '2026-06-01',
    title: 'Emily Kebodeaux Cook — Bond Revoked, GPS Ankle Monitor',
    entities: ['emily_cook', 'chap_cain', 'klint_bush'],
    cartel: 'Judicial & Prosecutorial Family Dynasty',
    countyOverlap: 'Liberty County Direct',
    overlapReason: 'Presided over by 75th District Court Judge Chap Cain in Liberty County.',
    detail: 'Former LCHA / CAD Board member. Bond revoked May 27, 2026 by Judge Chap Cain. Re-set to $75,000 with mandatory GPS ankle monitor. Explicit bond condition bars contact with co-defendant Klint Bush.',
    anchors: ['Judge Chap Cain Order (May 2026)', '$75K Bond w/ GPS']
  },
  {
    date: '2026-04-01',
    title: '$68M Colony Ridge Settlement — Zero Victim Restitution',
    entities: ['colony_ridge', 'trey_harris', 'john_harris', 'mud_15', 'bobby_rader'],
    cartel: 'Developer & Bond Syndicate',
    countyOverlap: 'Tri-County Overlap (Liberty • Montgomery • Harris)',
    overlapReason: 'Settlement resolves SDTX litigation over 40,000 acres in Liberty County.',
    detail: 'DOJ/CFPB/OAG consent decree bypassed Judge Bennett. $48M Fund A (infrastructure) and $20M Fund B (law enforcement). Zero dollars to direct victims.',
    anchors: ['DOJ/CFPB Consent Decree (Feb 2026)', 'Judge Bennett Order (Bypassed)']
  },
  {
    date: '2026-03-01',
    title: 'Emily Kebodeaux Cook Indicted — Felony Misapplication of Fiduciary Property',
    entities: ['emily_cook', 'klint_bush', 'texas_rangers'],
    cartel: 'Judicial & Prosecutorial Family Dynasty',
    countyOverlap: 'Liberty County Direct',
    overlapReason: 'Liberty County Grand Jury true bill following Texas Rangers financial audit.',
    detail: 'Indicted for misapplication of LCHA funds. Co-defendant with Klint Bush in the $163,000+ theft scheme across 14 LCHA transactions.',
    anchors: ['Liberty County Grand Jury (March 2026)', 'Texas Rangers LCHA Audit']
  },
  {
    date: '2026-02-15',
    title: 'Maria Acevedo Files Federal Objection Brief to $68M Colony Ridge Consent Decree',
    entities: ['maria_acevedo', 'colony_ridge', 'trey_harris', 'john_harris'],
    cartel: 'Developer & Bond Syndicate',
    countyOverlap: 'Tri-County Overlap (Liberty • Montgomery • Harris)',
    overlapReason: 'Federal SDTX Houston filing objecting to Colony Ridge settlement.',
    detail: 'Named whistleblower and federal witness Maria Acevedo files a formal objection brief in the DOJ/CFPB litigation, challenging the $68M settlement for allocating $48M to developer drainage and $20M to county law enforcement while completely excluding direct restitution to victim families trapped in predatory contract-for-deed loops.',
    anchors: ['Federal Court Docket (DOJ/CFPB v. Colony Ridge)', 'Maria Acevedo Formal Objection Brief']
  },
  {
    date: '2025-11-20',
    title: 'City of Liberty PD — Veteran Struck by Patrol Vehicle / Bodycam Cover-up Exposed',
    entities: ['wayne_dolcefino', 'bobby_rader', 'cedric_mcduffie'],
    cartel: 'Law Enforcement, Inquest & Death Suppression',
    countyOverlap: 'Liberty County Direct',
    overlapReason: 'City of Liberty PD patrol collision inside Liberty city limits.',
    detail: 'City of Liberty PD patrol unit strikes local veteran pedestrian. City police logs minimize crash as accidental side-mirror clip. Dolcefino Consulting uncovers bodycam and DPS Region 2 crash reconstruction proving violent direct impact and narrative manipulation.',
    anchors: ["Dolcefino Consulting Investigation 'Liberty Lies'", 'DPS Region 2 Reconstruction Report']
  },
  {
    date: '2025-11-13',
    title: 'Liberty PD Lt. Ramiro Lozano Terminated Following Texas Rangers Jail Audit',
    entities: ['ramiro_lozano', 'texas_rangers', 'domingo_quintana', 'jessica_quintana'],
    cartel: 'Law Enforcement, Inquest & Death Suppression',
    countyOverlap: 'Liberty County Direct',
    overlapReason: 'Clandestine visits occurred inside Liberty County Jail regarding Kenefick FM 1008 case.',
    detail: 'Liberty PD Lt. Ramiro Lozano terminated following official Texas Rangers audit exposing unauthorized jail visits and personal transport to inmate Domingo Quintana (Kenefick FM 1008 corridor).',
    anchors: ['Texas Rangers Investigation File (Unauthorized Jail Access)', 'Liberty PD Separation Orders']
  },
  {
    date: '2025-09-29',
    title: 'Jessica Quintana Indicted on Attempted Capital Murder on FM 1008 Corridor Acreage',
    entities: ['jessica_quintana', 'domingo_quintana', 'bobby_rader'],
    cartel: 'Law Enforcement, Inquest & Death Suppression',
    countyOverlap: 'Liberty County Direct',
    overlapReason: 'Occurred on family acreage along FM 1008 near Kenefick / Simmons Bottom utility easement.',
    detail: 'Jessica Quintana drugged 3 children with tequila and NyQuil before attempting to drown them in a pond along FM 1008. Indicted on Felony Injury to a Child; held under $3M bond. Land sits squarely in high-stakes Colony Ridge utility easement corridor.',
    anchors: ['Liberty County Grand Jury Indictment (Sept 2025)', 'Sheriff CAD Emergency Dispatch 2025-09-29']
  },
  {
    date: '2025-06-15',
    title: 'MUD 15 / Wasteline Engineering — Sludge Export & WWTP Permit WQ0016839001',
    entities: ['wasteline_eng', 'glenn_breisch', 'mud_15'],
    cartel: 'Developer & Bond Syndicate',
    countyOverlap: 'Liberty County Direct',
    overlapReason: 'TCEQ wastewater permit covering Tarkington Woods and Luce Bayou watershed in Liberty County.',
    detail: 'Wasteline Engineering, Inc. (Glenn Breisch, President / Jason Breisch, Agent) submits engineering designs for MUD 15 Tarkington WWTP #1 (TCEQ WQ0016839001), authorizing sludge export to Austin and unpermitted drainage bypass into Luce Bayou watershed.',
    anchors: ['TCEQ Permit WQ0016839001', 'Texas SOS File No. 0066609400', 'MUD 15 Minutes']
  },
  {
    date: '2025-05-01',
    title: 'MUD 15 — $88.36M Bond Authorization with 2 Voters',
    entities: ['mud_15', 'klint_bush', 'trey_harris'],
    cartel: 'Developer & Bond Syndicate',
    countyOverlap: 'Liberty County Direct',
    overlapReason: 'MUD 15 taxing district situated inside Liberty County boundaries.',
    detail: 'Liberty County MUD No. 15 passed $88,360,000 bond authorization with exactly two (2) registered voters. 1-1 tie per proposition. Bush served as Elections Administrator.',
    anchors: ['May 2025 Bond Election Results', 'Tex. Water Code § 49.106']
  },
  {
    date: '2025-04-07',
    title: 'Liberty County Jail Arson — $1.1M Lock Scam Exposed',
    entities: ['burns_architecture', 'kenny_burns', 'brenda_burns', 'marco_jacquez', 'bobby_rader'],
    cartel: 'Developer & Bond Syndicate',
    countyOverlap: 'Liberty County Direct',
    overlapReason: 'Liberty County Jail on SH 146; ARPA funds administered by Commissioners Court.',
    detail: 'Arson by capital murder defendant Marco Elihu Jacquez exposed structural failure of electronic door locks funded by 22% of $5M federal ARPA grant. Commissioners capitalized on incident to push $110M jail expansion bond.',
    anchors: ['ARPA Grant Allocation', 'White Construction $612K Audit Flag']
  },
  {
    date: '2024-11-18',
    title: 'Sherry Lee Novosad — Death Rubber-Stamped as Suicide',
    entities: ['sherry_novosad', 'james_mcqueen', 'bobby_rader', 'ralph_fuller', 'kathy_hatcher', 'wayne_dolcefino', 'ted_novosad', 'david_meyers'],
    cartel: 'Law Enforcement, Inquest & Death Suppression',
    countyOverlap: 'Liberty County Direct',
    overlapReason: 'Death scene in Cleveland, Liberty County; JP Ralph Fuller Pct 6 inquest docket.',
    detail: 'Found dead with .410 caliber gunshot wound to neck. LCSO failed to recuse despite Det. Sgt. McQueen\'s romantic relationship with decedent. Independent forensic testing found unidentified male DNA. Husband Ted Novosad conclusively excluded by DNA. McQueen refuses voluntary buccal swab.',
    anchors: ['National Screening Center Lab WO# 2024-STR', 'Dolcefino TPIA Lawsuit', 'Judge Cain Recusal']
  },
  {
    date: '2024-08-09',
    title: 'Maria Acevedo Releases Public Recorded Deed & Repossession Notes via Social Media',
    entities: ['maria_acevedo', 'colony_ridge'],
    cartel: 'Developer & Bond Syndicate',
    countyOverlap: 'Liberty County Direct',
    overlapReason: 'Certified deed records and repossessions recorded at Liberty County Clerk\'s office.',
    detail: 'Maria Acevedo publicly releases certified recorded deeds, seller-financing notes, and mechanic liens demonstrating Colony Ridge\'s predatory 3-5x churn loop where lots are repossessed without judicial foreclosure and resold to subsequent buyers.',
    anchors: ['Recorded Liberty County Deed Records', 'Public Integrity Photographic Dossier (Aug 9, 2024)']
  },
  {
    date: '2024-05-01',
    title: 'Tarkington ISD $45M Prop B Confidential Land Deal & M Club Shadow Treasury',
    entities: ['tisd_board', 'tarkington_student_foundation', 'm_club_foundation', 'tom_johnson', 'kevin_johnson', 'cory_anderson', 'mandy_anderson'],
    cartel: 'School Board, CAD & Construction Arbitrage',
    countyOverlap: 'Liberty County Direct',
    overlapReason: 'Tarkington ISD rural taxing district in Liberty County; SH 99 to FM 321 corridor.',
    detail: 'Tarkington ISD passes $95M bond including a confidential $45M Prop B real estate deal executed alongside M Club of Tarkington Inc (EIN 93-1956613) and Tarkington Student Foundation, routing public bond and booster capital through private trustee networks.',
    anchors: ['TISD Bond Proposition B Filings', 'M Club of Tarkington IRS Form 990', 'Liberty County Deed Doc #2024-009182']
  },
  {
    date: '2023-11-01',
    title: 'Klint Bush First Indictment — Theft of Public Funds ($163K+)',
    entities: ['klint_bush', 'texas_rangers'],
    cartel: 'Judicial & Prosecutorial Family Dynasty',
    countyOverlap: 'Liberty County Direct',
    overlapReason: 'Liberty County Housing Authority funds stolen from county accounts.',
    detail: 'First indictment for theft of public funds via 14 LCHA transactions totaling $163,000+. Additional charges followed in April 2026.',
    anchors: ['Liberty County Grand Jury (Nov 2023)', 'Texas Rangers Audit']
  },
  {
    date: '2023-06-18',
    title: 'Rep. Ernest Bailes Passes HB 5323 Creating Liberty County MUD No. 12',
    entities: ['ernest_bailes', 'mud_12', 'colony_ridge', 'trey_harris'],
    cartel: 'Developer & Bond Syndicate',
    countyOverlap: 'Liberty County Direct (Austin Legislative Origin)',
    overlapReason: 'Special district created by Texas Legislature over 764 acres in Liberty County.',
    detail: 'Texas Legislature passes HB 5323 authored by Rep. Ernest Bailes, establishing Liberty County MUD No. 12 with sweeping taxing and eminent domain powers over 764 acres of Colony Ridge expansion land, later triggering conservative voter backlash and Bailes\' 2024 primary defeat.',
    anchors: ['Texas House HB 5323 (88th Leg.)', 'TCEQ Special District Registry No. 12']
  }
];

// Active Filter States
let currentTab = 'all'; // 'all', 'schemes', 'timeline'
let currentCounty = 'all'; // 'all', 'liberty', 'tri-county', 'regional'
let searchQuery = '';

/**
 * Filter badge class helper
 */
function getCountyBadge(overlap) {
  if (overlap.includes('Liberty County Direct')) {
    return {
      label: '📍 Liberty County Direct',
      css: 'bg-teal-500/20 text-teal-300 border-teal-500/40 hover:bg-teal-500/30'
    };
  }
  if (overlap.includes('Tri-County')) {
    return {
      label: '🔄 Tri-County Overlap (Liberty • Montgomery • Harris)',
      css: 'bg-amber-500/20 text-amber-300 border-amber-500/40 hover:bg-amber-500/30'
    };
  }
  return {
    label: overlap,
    css: 'bg-purple-500/20 text-purple-300 border-purple-500/40 hover:bg-purple-500/30'
  };
}

/**
 * Render Clickable Entity Pills
 */
function renderEntityPills(entityIds) {
  const allEntities = getEntities();
  return entityIds.map(id => {
    const ent = allEntities.find(e => e.id === id);
    const name = ent ? (ent.label || id) : id.replace(/_/g, ' ');
    const score = ent ? (ent.risk_score || 0) : 0;
    const scoreColor = score >= 90 ? 'text-red-400' : score >= 70 ? 'text-orange-400' : score >= 40 ? 'text-amber-400' : 'text-emerald-400';

    return `
      <div class="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-zinc-800/80 border border-zinc-700/60 hover:border-teal-500/60 transition-all text-xs font-mono group">
        <button type="button" class="text-zinc-200 hover:text-teal-300 font-medium text-left cursor-pointer" onclick="window.__openEntityDrawer && window.__openEntityDrawer('${id}')" title="Inspect ${name}">
          ${name}
        </button>
        ${score > 0 ? `<span class="text-[10px] font-bold ${scoreColor}">${score}</span>` : ''}
        <button type="button" class="text-zinc-500 hover:text-teal-400 cursor-pointer p-0.5" onclick="window.__focusNode && window.__focusNode('${id}')" title="Locate in Graph">
          ↗
        </button>
      </div>
    `;
  }).join('');
}

/**
 * Filter items by active filters
 */
function matchesFilter(item) {
  // Search
  if (searchQuery) {
    const q = searchQuery.toLowerCase();
    const matchText = (item.title || '') + ' ' + (item.detail || item.summary || '') + ' ' + (item.anchors || []).join(' ');
    const matchEntities = (item.entities || []).join(' ');
    if (!matchText.toLowerCase().includes(q) && !matchEntities.toLowerCase().includes(q)) {
      return false;
    }
  }

  // County Overlap
  if (currentCounty !== 'all') {
    if (currentCounty === 'liberty' && !item.countyOverlap.includes('Liberty County Direct')) return false;
    if (currentCounty === 'tri-county' && !item.countyOverlap.includes('Tri-County')) return false;
    if (currentCounty === 'regional' && !item.countyOverlap.includes('Regional')) return false;
  }

  return true;
}

/**
 * Render Schemes and Timeline UI
 */
export function renderSchemesAndTimeline() {
  const container = document.getElementById('timelineContainer');
  if (!container) return;

  const filteredSchemes = CORRUPTION_SCHEMES.filter(matchesFilter);
  const filteredTimeline = TIMELINE_EVENTS.filter(matchesFilter);

  const CARTEL_BORDER = {
    'Developer & Bond Syndicate':                    'border-teal-500/50 bg-teal-950/10',
    'Business, Corporate Shells & Financial Conduits': 'border-emerald-500/50 bg-emerald-950/10',
    'Law Enforcement, Inquest & Death Suppression':  'border-red-500/50 bg-red-950/10',
    'School Board, CAD & Construction Arbitrage':    'border-amber-500/50 bg-amber-950/10',
    'Judicial & Prosecutorial Family Dynasty':       'border-purple-500/50 bg-purple-950/10',
  };

  const CARTEL_DOT = {
    'Developer & Bond Syndicate':                    'bg-teal-500',
    'Business, Corporate Shells & Financial Conduits': 'bg-emerald-500',
    'Law Enforcement, Inquest & Death Suppression':  'bg-red-500',
    'School Board, CAD & Construction Arbitrage':    'bg-amber-500',
    'Judicial & Prosecutorial Family Dynasty':       'bg-purple-500',
  };

  container.innerHTML = `
    <!-- CONTROLS & COUNTY OVERLAP BAR -->
    <div class="p-4 rounded-xl bg-zinc-900/80 border border-zinc-800 space-y-3 mb-6 shadow-xl">
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-3">
        <!-- Section Toggle -->
        <div class="flex items-center gap-1.5 p-1 rounded-lg bg-zinc-950 border border-zinc-800 text-xs font-mono">
          <button id="btnTabAll" class="px-3 py-1.5 rounded-md transition-all ${currentTab === 'all' ? 'bg-teal-500 text-zinc-950 font-bold' : 'text-zinc-400 hover:text-zinc-200'}">
            All Intelligence (${filteredSchemes.length + filteredTimeline.length})
          </button>
          <button id="btnTabSchemes" class="px-3 py-1.5 rounded-md transition-all ${currentTab === 'schemes' ? 'bg-teal-500 text-zinc-950 font-bold' : 'text-zinc-400 hover:text-zinc-200'}">
            Corruption Schemes (${filteredSchemes.length})
          </button>
          <button id="btnTabTimeline" class="px-3 py-1.5 rounded-md transition-all ${currentTab === 'timeline' ? 'bg-teal-500 text-zinc-950 font-bold' : 'text-zinc-400 hover:text-zinc-200'}">
            Forensic Timeline (${filteredTimeline.length})
          </button>
        </div>

        <!-- Search Input -->
        <div class="relative flex-1 max-w-xs">
          <input id="schemesSearch" type="text" placeholder="Filter schemes, dates, statutes..." value="${searchQuery}"
            class="w-full px-3 py-1.5 rounded-lg text-xs bg-zinc-950 border border-zinc-700 text-zinc-200 placeholder-zinc-500 focus:border-teal-400 focus:outline-none font-mono">
        </div>
      </div>

      <!-- County Overlap Pills (CLICKABLE FILTERS) -->
      <div class="flex flex-wrap items-center gap-2 pt-2 border-t border-zinc-800/60 text-xs font-mono">
        <span class="text-zinc-500 text-[11px] uppercase tracking-wider font-bold mr-1">County Overlap:</span>
        <button class="px-2.5 py-1 rounded-md border transition-all cursor-pointer ${currentCounty === 'all' ? 'bg-zinc-100 text-zinc-950 font-bold border-white' : 'bg-zinc-800 text-zinc-400 border-zinc-700 hover:text-zinc-200'}" data-county-filter="all">
          All Jurisdictions
        </button>
        <button class="px-2.5 py-1 rounded-md border transition-all cursor-pointer ${currentCounty === 'liberty' ? 'bg-teal-500 text-zinc-950 font-bold border-teal-400' : 'bg-teal-950/30 text-teal-300 border-teal-800/60 hover:border-teal-500'}" data-county-filter="liberty">
          📍 Liberty County Direct
        </button>
        <button class="px-2.5 py-1 rounded-md border transition-all cursor-pointer ${currentCounty === 'tri-county' ? 'bg-amber-500 text-zinc-950 font-bold border-amber-400' : 'bg-amber-950/30 text-amber-300 border-amber-800/60 hover:border-amber-500'}" data-county-filter="tri-county">
          🔄 Tri-County Overlap (Liberty • Montgomery • Harris)
        </button>
        <button class="px-2.5 py-1 rounded-md border transition-all cursor-pointer ${currentCounty === 'regional' ? 'bg-purple-500 text-zinc-950 font-bold border-purple-400' : 'bg-purple-950/30 text-purple-300 border-purple-800/60 hover:border-purple-500'}" data-county-filter="regional">
          ⚠️ Regional / Feeder Overlaps
        </button>
      </div>
    </div>

    <!-- SECTION 1: CORRUPTION SCHEMES MATRIX -->
    ${(currentTab === 'all' || currentTab === 'schemes') ? `
      <div class="mb-10 space-y-4">
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-bold text-zinc-100 flex items-center gap-2">
            <span class="h-2.5 w-2.5 rounded-full bg-teal-400"></span>
            Forensic Corruption Schemes Matrix
          </h3>
          <span class="text-xs font-mono text-zinc-500">8 Structural Mechanisms Mapped</span>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
          ${filteredSchemes.map(sch => {
            const badge = getCountyBadge(sch.countyOverlap);
            const borderCls = CARTEL_BORDER[sch.cartel] || 'border-zinc-800 bg-zinc-900/50';

            return `
              <div class="p-5 rounded-xl border ${borderCls} space-y-3.5 hover:border-teal-500/70 transition-all shadow-lg flex flex-col justify-between">
                <div>
                  <div class="flex items-center justify-between gap-2 mb-2">
                    <div class="flex items-center gap-2">
                      <span class="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-zinc-950 text-teal-400 border border-teal-500/30">
                        ${sch.schemeNumber}
                      </span>
                      <span class="px-2 py-0.5 rounded text-[10px] font-mono text-zinc-400 bg-zinc-900 border border-zinc-800">
                        ${sch.cartel}
                      </span>
                    </div>
                    <span class="text-xs font-mono font-bold text-amber-400">${sch.metric}</span>
                  </div>

                  <h4 class="text-base font-bold text-zinc-100 leading-snug mb-1">${sch.title}</h4>

                  <!-- Clickable County Overlap Badge -->
                  <div class="mb-2.5">
                    <button class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-mono font-medium border ${badge.css} transition-all cursor-pointer"
                            onclick="window.__setCountyFilter && window.__setCountyFilter('${sch.countyOverlap.includes('Liberty County Direct') ? 'liberty' : sch.countyOverlap.includes('Tri-County') ? 'tri-county' : 'regional'}')"
                            title="Click to filter all events by this county overlap">
                      ${badge.label}
                    </button>
                    <p class="text-[11px] text-zinc-400 mt-1 italic">${sch.overlapReason}</p>
                  </div>

                  <p class="text-xs text-zinc-300 leading-relaxed">${sch.summary}</p>
                </div>

                <div class="space-y-2.5 pt-3 border-t border-zinc-800/80">
                  <!-- Connected Clickable Entities -->
                  <div>
                    <span class="text-[10px] font-mono uppercase text-zinc-500 tracking-wider block mb-1.5">Connected Key Targets:</span>
                    <div class="flex flex-wrap gap-1.5">
                      ${renderEntityPills(sch.entities)}
                    </div>
                  </div>

                  <!-- Evidence Anchors -->
                  ${sch.anchors?.length ? `
                    <div class="flex flex-wrap gap-1 pt-1">
                      ${sch.anchors.map(a => `<span class="px-2 py-0.5 rounded bg-zinc-950 text-[10px] font-mono text-zinc-400 border border-zinc-800">${a}</span>`).join('')}
                    </div>
                  ` : ''}
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    ` : ''}

    <!-- SECTION 2: CHRONOLOGICAL FORENSIC TIMELINE -->
    ${(currentTab === 'all' || currentTab === 'timeline') ? `
      <div class="space-y-4">
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-bold text-zinc-100 flex items-center gap-2">
            <span class="h-2.5 w-2.5 rounded-full bg-amber-400"></span>
            Chronological Forensic Timeline
          </h3>
          <span class="text-xs font-mono text-zinc-500">${filteredTimeline.length} Verified Evidence Nodes</span>
        </div>

        <div class="timeline-line pl-10 space-y-6">
          ${filteredTimeline.map(evt => {
            const dotClass = CARTEL_DOT[evt.cartel] || 'bg-zinc-500';
            const badge = getCountyBadge(evt.countyOverlap);

            return `
              <div class="relative">
                <div class="absolute left-[-21px] top-2 w-4 h-4 rounded-full ${dotClass} border-2 border-zinc-950 z-10"></div>
                <div class="p-4 rounded-xl bg-zinc-900/70 border border-zinc-800/80 hover:border-zinc-700 transition-colors space-y-2.5 shadow-md">
                  <div class="flex flex-wrap items-center justify-between gap-2">
                    <div class="flex items-center gap-2.5">
                      <span class="text-xs font-mono font-bold text-teal-400">${evt.date}</span>
                      <span class="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-zinc-950 text-zinc-300 border border-zinc-800">
                        ${evt.cartel}
                      </span>
                    </div>

                    <!-- Clickable County Badge -->
                    <button class="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-mono border ${badge.css} transition-all cursor-pointer"
                            onclick="window.__setCountyFilter && window.__setCountyFilter('${evt.countyOverlap.includes('Liberty County Direct') ? 'liberty' : evt.countyOverlap.includes('Tri-County') ? 'tri-county' : 'regional'}')"
                            title="Filter by this county overlap">
                      ${badge.label}
                    </button>
                  </div>

                  <h4 class="text-base font-bold text-zinc-100">${evt.title}</h4>
                  <p class="text-sm text-zinc-300 leading-relaxed">${evt.detail}</p>
                  
                  ${evt.overlapReason ? `<p class="text-xs text-amber-400/90 font-mono">Overlap nexus: ${evt.overlapReason}</p>` : ''}

                  <!-- Clickable Entities in Timeline Card -->
                  ${evt.entities?.length ? `
                    <div class="pt-2 border-t border-zinc-800/60">
                      <span class="text-[10px] font-mono uppercase text-zinc-500 tracking-wider block mb-1">Connected Entities:</span>
                      <div class="flex flex-wrap gap-1.5">
                        ${renderEntityPills(evt.entities)}
                      </div>
                    </div>
                  ` : ''}

                  <!-- Evidence Anchors -->
                  ${evt.anchors?.length ? `
                    <div class="mt-2 flex flex-wrap gap-1.5">
                      ${evt.anchors.map(a => `<span class="px-2 py-0.5 rounded bg-zinc-950 text-[10px] font-mono text-zinc-400 border border-zinc-800">${a}</span>`).join('')}
                    </div>
                  ` : ''}
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    ` : ''}
  `;

  // Attach event listeners
  document.getElementById('btnTabAll')?.addEventListener('click', () => { currentTab = 'all'; renderSchemesAndTimeline(); });
  document.getElementById('btnTabSchemes')?.addEventListener('click', () => { currentTab = 'schemes'; renderSchemesAndTimeline(); });
  document.getElementById('btnTabTimeline')?.addEventListener('click', () => { currentTab = 'timeline'; renderSchemesAndTimeline(); });

  const searchInp = document.getElementById('schemesSearch');
  searchInp?.addEventListener('input', (e) => {
    searchQuery = e.target.value;
    renderSchemesAndTimeline();
  });

  document.querySelectorAll('[data-county-filter]').forEach(btn => {
    btn.addEventListener('click', () => {
      currentCounty = btn.dataset.countyFilter;
      renderSchemesAndTimeline();
    });
  });
}

// Global filter helper so clicking badges anywhere updates state
window.__setCountyFilter = (county) => {
  currentCounty = county;
  renderSchemesAndTimeline();
  document.getElementById('timelineContainer')?.scrollIntoView({ behavior: 'smooth' });
};

/**
 * Initialize timeline module
 */
export function initTimeline() {
  renderSchemesAndTimeline();
}
