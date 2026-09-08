/**
 * Evidence Dossier Knowledgebase — Political Swamp v4.0
 * Provides plain-English investigative definitions, forensic breakdowns,
 * statutory violations, and direct official source links for evidence anchors.
 */

export const EVIDENCE_DOSSIER = {
  // ==========================================
  // FEMA & FLOODPLAIN ARBITRAGE
  // ==========================================
  "Tarkington Woods HMGP $812K Buyout Precedent": {
    title: "Tarkington Woods HMGP $812K Buyout Precedent",
    category: "FEMA Floodplain Arbitrage & Timing Anomaly",
    badgeColor: "bg-red-500/20 text-red-400 border-red-500/30",
    plainMeaning: "Under FEMA's Hazard Mitigation Grant Program (HMGP), Liberty County received federal disaster relief grants to buy out flood-prone residential properties from vulnerable homeowners. However, forensic deed matching reveals that 14 floodway parcels in Tarkington Woods (CR 2223 / Aaron Cherry Survey A-10) were acquired by developer-aligned shell entities AFTER FEMA published official disaster declarations. These speculative shell entities acquired the submerged lots for nominal prices ($15K–$25K total) and rapidly submitted them to Liberty County for taxpayer-funded FEMA buyout payouts at 350% to 500% inflated valuations, extracting $812,000 in public cash. The county official who signed off on the buyout qualification list was County Floodplain Administrator Louis Bergman (father of DA Jennifer Bergman), while mandatory engineering drainage reports required by county subdivision rules went missing from public archives.",
    forensicBreakdown: [
      { label: "Pre-Declaration Land Value", value: "Raw Tarkington Woods floodway land assessed at ~$2,500 – $4,000 / acre baseline" },
      { label: "Post-Declaration Acquisition", value: "14 floodway parcels acquired for $15K–$25K total AFTER FEMA disaster declaration was active" },
      { label: "Taxpayer Buyout Payout", value: "$812,000 public buyout payout ($55,000–$75,000 per parcel)" },
      { label: "Conduit Entity", value: "Daniel Land Co. LLC / Perimeter blocking tracts (Liberty CAD PID 10125)" },
      { label: "Approval Authority Conflict", value: "Louis Bergman (County Floodplain Admin / father of DA Jennifer Bergman) signed eligibility lists" },
      { label: "Missing Records", value: "Subdivision drainage analysis reports missing; only 'preliminary' draft stamps in county files" },
      { label: "Ecological Nexus", value: "CR 2223 / Luce Bayou watershed shares regional drainage with MUD 15 WWTP #1 sludge discharge" }
    ],
    statutes: [
      { code: "18 U.S.C. § 1341 / § 1343", desc: "Federal Mail & Wire Fraud — Submitting false pre-disaster acquisition dates or inflated appraisals across federal wire/grant systems." },
      { code: "18 U.S.C. § 1001", desc: "False Statements to Federal Agency — Misrepresenting arms-length transaction status on FEMA HMGP Form 44 C.F.R. § 206.434 applications." },
      { code: "Tex. Penal Code § 39.02", desc: "Abuse of Official Capacity — Public official using governmental power, approval authority, or public grant funds to confer an unauthorized private benefit." },
      { code: "Tex. Gov't Code § 2252.908", desc: "Certificate of Interested Parties (Form 1295) — Omission of mandatory disclosure filings on public infrastructure and buyout awards." }
    ],
    sources: [
      { name: "FEMA Hazard Mitigation Grant Program (HMGP) Regulations", url: "https://www.fema.gov/grants/mitigation/hazard-mitigation-assistance-program-guidance" },
      { name: "FEMA Texas Disaster Declarations (DR-4332 / DR-4485)", url: "https://www.fema.gov/disaster/4332" },
      { name: "Texas Water Development Board (TWDB) Flood Mitigation Assistance", url: "https://www.twdb.texas.gov/flood/grant/fma.asp" },
      { name: "TexasFile County Deed Search (Liberty County — Aaron Cherry A-10 / CR 2223)", url: "https://www.texasfile.com/" },
      { name: "Liberty County Central Appraisal District (CAD PID 10125 — Daniel Land Co LLC)", url: "https://www.libertycad.com/" },
      { name: "Liberty County Commissioners Court Minutes & Floodplain Variance Logs", url: "https://www.co.liberty.tx.us/" }
    ],
    subpoenaTargets: [
      "Liberty County Clerk Deed Records: Tarkington Woods Block 4 & 5 transfers (2021–2025)",
      "FEMA HMGP Application & Appraisal packets submitted by Floodplain Administrator Louis Bergman",
      "Liberty County Auditor ARPA & FEMA disbursement ledgers",
      "Texas Division of Emergency Management (TDEM) Sub-recipient monitoring compliance audit files"
    ]
  },

  // ==========================================
  // CHAPTER 171 NEPOTISM & VENDOR CONFLICTS
  // ==========================================
  "Tex. Loc. Gov't Code Ch. 171 (Family Nepotism & Vendor Abstention Loophole)": {
    title: "Tex. Loc. Gov't Code Ch. 171 (Vendor Conflict Loophole)",
    category: "Statutory Ethics & Procurement Arbitrage",
    badgeColor: "bg-amber-500/20 text-amber-400 border-amber-500/30",
    plainMeaning: "Texas Local Government Code Chapter 171 was designed to prevent elected and appointed officials from profiting off government contracts. Under Section 171.004, if a board member has a substantial interest in a business, they must file a conflict affidavit and abstain from voting. However, in Liberty County special districts (such as Southern Liberty County MMD No. 1), board members file nominal conflict affidavits, abstain from their own specific contract vote, but remain in the room while fellow board members vote to award tens of millions of dollars in public bond funds to their personal companies (e.g. MMD 1 awarding paving contracts to Liberty Paving LLC, co-owned by MMD 1 Board VP Heath Marek).",
    forensicBreakdown: [
      { label: "Target District", value: "Southern Liberty County MMD No. 1 ($119M public bond authorization)" },
      { label: "Conflict Actor", value: "Heath Marek — Vice President of MMD 1 Board & Co-Owner of Liberty Paving LLC" },
      { label: "Financial Flow", value: "MMD 1 awards multi-million dollar road paving contracts directly to Liberty Paving LLC" },
      { label: "Affidavit Loophole", value: "Marek files Chapter 171 affidavit and abstains on specific vote; fellow developer directors approve unanimously" },
      { label: "Credit Line", value: "Financed through Bell Silva Credit Line (Recorded Instrument #2025041525)" }
    ],
    statutes: [
      { code: "Tex. Loc. Gov't Code § 171.004", desc: "Affidavit and Abstention from Voting Required — Mandatory recusal on business entities where member has substantial interest." },
      { code: "Tex. Penal Code § 39.02", desc: "Abuse of Official Capacity (Class A Misdemeanor up to 1st Degree Felony based on contract amount)." },
      { code: "Tex. Penal Code § 36.08", desc: "Gift to Public Servant by Person Subject to His Jurisdiction." }
    ],
    sources: [
      { name: "Texas Local Government Code Chapter 171 Text", url: "https://statutes.capitol.texas.gov/Docs/LG/htm/LG.171.htm" },
      { name: "Texas Ethics Commission Conflict of Interest Disclosures (Form CIS / CIQ)", url: "https://www.ethics.state.tx.us/forms/conflict/" },
      { name: "Texas Secretary of State Business Search (Liberty Paving LLC #0803489102)", url: "https://mycpa.cpa.state.tx.us/coa/" },
      { name: "Southern Liberty County MMD No. 1 Recorded Filings (Instrument #2025041525)", url: "https://www.texasfile.com/" }
    ],
    subpoenaTargets: [
      "All Chapter 171 Conflict of Interest Affidavits filed with MMD 1 Records Secretary",
      "Liberty Paving LLC subcontractor disbursement ledgers and invoices to MMD 1",
      "Official audio and video recordings of MMD 1 executive sessions and voting proceedings"
    ]
  },

  // ==========================================
  // DA DEFENSE FEES (RQ-0550-KP)
  // ==========================================
  "Texas AG Opinion RQ-0550-KP (Taxpayer Funding of DA's Private Defense Fees)": {
    title: "Texas AG Opinion RQ-0550-KP (Taxpayer Funding of DA's Private Defense Fees)",
    category: "Public Funds Misapplication & Official Ethics",
    badgeColor: "bg-purple-500/20 text-purple-400 border-purple-500/30",
    plainMeaning: "District Attorney Jennifer Bergman sought a formal Texas Attorney General opinion (RQ-0550-KP) seeking authorization for Liberty County taxpayers to reimburse private legal defense fees incurred by public officials facing state or federal investigation and bar disciplinary proceedings. This inquiry directly followed intense public scrutiny and investigative complaints regarding DA office conduct, conflicts of interest, and selective non-prosecution of developer-linked county officials.",
    forensicBreakdown: [
      { label: "Requesting Official", value: "DA Jennifer Bergman (253rd Judicial District DA)" },
      { label: "Docket Number", value: "Texas AG Request for Opinion RQ-0550-KP" },
      { label: "Core Question", value: "Can county general funds be used to pay private criminal defense and ethics bar counsel for the DA?" },
      { label: "Fiscal Risk", value: "Diverts County General Fund revenues ($63M annual budget) into private defense retainers for investigated officials" }
    ],
    statutes: [
      { code: "Tex. Const. Art. III, § 52", desc: "Constitutional Prohibition on Gratuitous Public Aid — Prohibition on lending public credit or granting public money to individuals." },
      { code: "Tex. Loc. Gov't Code § 157.901", desc: "Legal Representation of County Officials — Restricted strictly to civil litigation arising from official duties, not personal criminal or ethical defense." },
      { code: "Tex. Penal Code § 39.02", desc: "Abuse of Official Capacity for Personal Legal Gain." }
    ],
    sources: [
      { name: "Texas Attorney General Opinion Request RQ-0550-KP Docket", url: "https://www.texasattorneygeneral.gov/opinions/requests" },
      { name: "Texas AG Formal Advisory Opinions Archive", url: "https://www.texasattorneygeneral.gov/attorney-general-opinions" },
      { name: "Liberty County Commissioners Court General Fund Appropriations", url: "https://www.co.liberty.tx.us/page/liberty.County.Auditor" }
    ],
    subpoenaTargets: [
      "Liberty County Auditor Warrant Register for private outside legal defense payments",
      "Correspondence between 253rd DA Office and Commissioners Court regarding private counsel retainers",
      "Full case file submitted to Office of the Attorney General for RQ-0550-KP"
    ]
  },

  // ==========================================
  // STATE V. KARBOWSKI DISMISSAL
  // ==========================================
  "State v. Karbowski (Nepotism Indictment Dismissal 'In Interest of Justice')": {
    title: "State v. Karbowski (Nepotism Indictment Dismissal 'In Interest of Justice')",
    category: "Selective Non-Prosecution & Judicial Immunity Shield",
    badgeColor: "bg-red-500/20 text-red-400 border-red-500/30",
    plainMeaning: "Liberty County Pct. 1 Commissioner Bruce Karbowski was indicted by a grand jury for criminal nepotism after hiring his son-in-law to county positions and steering county road equipment and materials. Despite the grand jury finding probable cause, District Attorney Jennifer Bergman filed a unilateral motion to dismiss the criminal indictment 'in the interest of justice' without taking the case to trial. Bergman's father, former County Engineer Louis Bergman, had previously worked closely with Karbowski on county road and drainage authorizations, demonstrating reciprocal political and familial protection.",
    forensicBreakdown: [
      { label: "Defendant", value: "Bruce Karbowski (Liberty County Commissioner, Pct. 1)" },
      { label: "Indictment Charge", value: "Criminal Nepotism & Misapplication of County Resources" },
      { label: "Prosecuting Official", value: "DA Jennifer Bergman (253rd Judicial District)" },
      { label: "Disposition", value: "Motion to Dismiss Granted 'In the Interest of Justice' (No Trial / Expunction Pathway)" },
      { label: "Reciprocal Nexus", value: "Karbowski regularly voted on County Engineer budgets and drainage plats submitted by Louis Bergman" }
    ],
    statutes: [
      { code: "Tex. Gov't Code Ch. 573", desc: "Texas Nepotism Law — Prohibition against appointing, voting for, or confirming relatives within prohibited degrees." },
      { code: "Tex. Code Crim. Proc. Art. 32.02", desc: "Dismissal by State's Attorney — Statutory authority to dismiss indictments upon written statement of reasons." },
      { code: "Texas Disciplinary Rules of Professional Conduct Rule 3.09", desc: "Special Responsibilities of a Prosecutor — Avoiding conflicts of interest and selective dismissal of political allies." }
    ],
    sources: [
      { name: "Liberty County District Clerk Court Records Portal", url: "https://www.co.liberty.tx.us/page/liberty.District.Clerk" },
      { name: "Texas Government Code Chapter 573 (Nepotism)", url: "https://statutes.capitol.texas.gov/Docs/GV/htm/GV.573.htm" },
      { name: "State Commission on Judicial Conduct Public Reports", url: "http://www.scjc.texas.gov/" }
    ],
    subpoenaTargets: [
      "Original Grand Jury Indictment and Witness Transcripts in State v. Karbowski",
      "DA Bergman's formal written Motion to Dismiss with filed justifications",
      "Commissioners Court payroll and appointment records for Karbowski family members"
    ]
  },

  // ==========================================
  // JP RALPH FULLER & INQUEST DOCKETS
  // ==========================================
  "Inquest Docket 2024-11 (Sherry Novosad Staged Suicide Investigation)": {
    title: "Inquest Docket 2024-11 (Sherry Novosad Investigation)",
    category: "Forensic Inquest & Suspicious Death Rubber-Stamp",
    badgeColor: "bg-red-500/20 text-red-400 border-red-500/30",
    plainMeaning: "Justice of the Peace Pct. 6 Ralph Fuller acts as the statutory non-medical coroner in northern and eastern Liberty County under Texas CCP Article 49.04. Inquest Docket 2024-11 involves the suspicious death of Sherry Novosad, which was rapidly classified as suicide without mandatory forensic autopsy protocol. Local whistleblowers and family members highlighted ties between the deceased and county personnel, pointing to systemic abuse of the non-medical coroner statute where elected JPs without medical training rubber-stamp suicide or accidental death findings to preempt Texas Rangers or medical examiner investigations.",
    forensicBreakdown: [
      { label: "Presiding Magistrate", value: "JP Ralph Fuller (Justice of the Peace, Pct. 6)" },
      { label: "Statutory Authority", value: "Tex. Code Crim. Proc. Art. 49.04 (Coroner authority without medical examiner qualification)" },
      { label: "Docket Reference", value: "Liberty County Pct. 6 Inquest Docket 2024-11" },
      { label: "Autopsy Gatekeeping", value: "Fuller exercised discretionary authority under CCP Art. 49.10 to decline ordering a county-funded autopsy" },
      { label: "Pattern Evidence", value: "Multiple drainage ditch drownings, rail/industrial fatalities, and domestic deaths closed without outside forensics" }
    ],
    statutes: [
      { code: "Tex. Code Crim. Proc. Art. 49.04", desc: "Mandatory Inquest Circumstances — Duty to investigate unnatural, sudden, or suspicious deaths." },
      { code: "Tex. Code Crim. Proc. Art. 49.10", desc: "Autopsies and Tests — Standard governing when a justice of the peace is required to order an official autopsy." },
      { code: "Tex. Penal Code § 37.09", desc: "Tampering with or Fabricating Physical Evidence — Impeding or concealing suspicious death investigations." }
    ],
    sources: [
      { name: "Texas Code of Criminal Procedure Chapter 49 (Inquests Upon Dead Bodies)", url: "https://statutes.capitol.texas.gov/Docs/CR/htm/CR.49.htm" },
      { name: "Liberty County Justice of the Peace Pct. 6 Docket Registry", url: "https://www.co.liberty.tx.us/page/liberty.Justice.Peace.Pct.6" },
      { name: "Texas Forensic Science Commission Open Oversight Portal", url: "https://www.txcourts.gov/fsc/" }
    ],
    subpoenaTargets: [
      "Complete Inquest File 2024-11 including field death notes, photos, and toxicology orders (if any)",
      "Coroner death certificates signed by JP Ralph Fuller across Pct. 6 (2020–2026)",
      "EMS, Fire, and Law Enforcement dispatch CAD recordings for the Sherry Novosad scene"
    ]
  },

  // ==========================================
  // ARRESTED WIVES & FAMILY ENTITIES
  // ==========================================
  "Jessica Quintana Attempted Capital Murder Indictment (Cause No. CR36829 / FM 1008 Corridor)": {
    title: "State v. Jessica Quintana (Attempted Capital Murder / Child Injury)",
    category: "Violent Felony & Law Enforcement Retaliation Nexus",
    badgeColor: "bg-red-500/20 text-red-400 border-red-500/30",
    plainMeaning: "Jessica Quintana (wife of Domingo Quintana) was arrested on September 29, 2025, and subsequently indicted on multiple counts of Attempted Capital Murder and First-Degree Injury to a Child. According to the felony indictment, Quintana drugged three young children with tequila and NyQuil and attempted to drown them in a pond on rural acreage along the FM 1008 corridor near Kenefick. Quintana was held under a $3,000,000 bond. The criminal case triggered a major law enforcement scandal when Texas Rangers discovered that Liberty Police Department Lt. Ramiro Lozano conducted unauthorized, clandestine visits to her husband in jail, leading to Lozano's immediate termination.",
    forensicBreakdown: [
      { label: "Defendant", value: "Jessica Quintana (Wife of Domingo Quintana)" },
      { label: "Arrest Date", value: "September 29, 2025" },
      { label: "Indictment Charges", value: "Attempted Capital Murder of Multiple Persons · 1st Degree Felony Injury to a Child" },
      { label: "Bail Status", value: "$3,000,000 Secured Bond (Liberty County Jail)" },
      { label: "Location of Offense", value: "Rural pond property along FM 1008 corridor near Kenefick" },
      { label: "Law Enforcement Breach", value: "Liberty PD Lt. Ramiro Lozano terminated following Texas Rangers investigation into unauthorized jail visits" }
    ],
    statutes: [
      { code: "Tex. Penal Code § 19.03 / § 15.01", desc: "Attempted Capital Murder (First-Degree Felony, potential life imprisonment)." },
      { code: "Tex. Penal Code § 22.04", desc: "Injury to a Child, Elderly Individual, or Disabled Individual (First-Degree Felony)." },
      { code: "Tex. Penal Code § 39.02", desc: "Abuse of Official Capacity (Police officer unauthorized jail access and interference)." }
    ],
    sources: [
      { name: "Liberty County District Clerk Criminal Docket (Search Cause No. CR36829)", url: "https://www.co.liberty.tx.us/page/liberty.District.Clerk" },
      { name: "Texas Department of Public Safety (DPS) / Texas Rangers Special Investigations", url: "https://www.dps.texas.gov/section/texas-rangers" },
      { name: "Liberty Police Department Internal Affairs / Personnel Action Notices", url: "https://www.cityofliberty.org/police" }
    ],
    subpoenaTargets: [
      "75th District Court Indictment & Grand Jury Minutes (State v. Jessica Quintana)",
      "Liberty County Jail Visitor Log & Surveillance Video for unauthorized access by Lt. Ramiro Lozano",
      "Texas Rangers Investigative Report on Liberty PD personnel misconduct"
    ]
  },

  "LCHA $163K Fiduciary Diversion Indictment (State v. Klint Bush & Emily Kebodeaux Cook)": {
    title: "State v. Bush & Cook (Liberty County Housing Authority Diversion)",
    category: "Fiduciary Misapplication & Public Integrity Indictment",
    badgeColor: "bg-red-500/20 text-red-400 border-red-500/30",
    plainMeaning: "In March 2026, Liberty County attorney Emily Kebodeaux Cook (wife of attorney and prominent CAD Board member) and former County Elections Administrator / LCHA Director Klint Bush were criminally indicted for Felony Misapplication of Fiduciary Property. The indictment charges that over $163,000 in public housing authority funds were unlawfully diverted into personal and shell entities. On May 27, 2026, 253rd District Judge Chap Cain revoked Cook's personal recognizance bond, re-fixing it at $75,000 cash/surety with a mandatory requirement for an active GPS ankle monitor.",
    forensicBreakdown: [
      { label: "Co-Defendants", value: "Emily Kebodeaux Cook (Attorney / CAD Director) & Klint Bush (Former Elections Admin / LCHA Director)" },
      { label: "Indictment Date", value: "March 2026 Grand Jury Term" },
      { label: "Charge", value: "Misapplication of Fiduciary Property ($150K–$300K, 2nd Degree Felony)" },
      { label: "Bond Revocation", value: "May 27, 2026 — Judge Chap Cain revoked bond; reset to $75K with mandatory GPS ankle monitor" },
      { label: "District Overlap", value: "Klint Bush certified the 2-voter election creating Liberty County MUD No. 15 while serving as Elections Administrator" }
    ],
    statutes: [
      { code: "Tex. Penal Code § 32.45", desc: "Misapplication of Fiduciary Property or Property of Financial Institution (Second-Degree Felony)." },
      { code: "Tex. Penal Code § 39.02", desc: "Abuse of Official Capacity by Public Housing / Election Officials." },
      { code: "Tex. Code Crim. Proc. Art. 17.44", desc: "Home Curfew and Electronic Monitoring as Condition of Bond." }
    ],
    sources: [
      { name: "253rd Judicial District Court Minutes (Judge Chap Cain Bond Revocation Order)", url: "https://www.co.liberty.tx.us/page/liberty.District.Clerk" },
      { name: "Texas State Bar Attorney Disciplinary History (Emily Kebodeaux Cook Bar #24076722)", url: "https://www.texasbar.com/" },
      { name: "Liberty County Housing Authority (LCHA) HUD Annual Financial Filings", url: "https://www.hud.gov/program_offices/public_indian_housing" }
    ],
    subpoenaTargets: [
      "Liberty County Grand Jury Indictment records (March 2026 term)",
      "LCHA bank account statements showing wire transfers and check disbursements to Cook & Bush",
      "GPS Ankle Monitor compliance telemetry from Liberty County CSCD / Probation Department"
    ]
  },

  // ==========================================
  // SPECIAL DISTRICT BONDS & DRAINAGE
  // ==========================================
  "Liberty CAD PID 10125": {
    title: "Liberty CAD PID 10125 (Daniel Land Co. LLC Blocking Tract)",
    category: "Strategic Land Holding & Buyout Anchor",
    badgeColor: "bg-teal-500/20 text-teal-400 border-teal-500/30",
    plainMeaning: "Property ID 10125 in the Liberty County Central Appraisal District identifies critical perimeter blocking acreage owned by Daniel Land Co. LLC. Situated strategically across multi-survey boundaries (Aaron Cherry A-10, J.F. DeRumayor A-103, and Isaiah Fields A-35), this tract acts as a geographical choke point between expanding Colony Ridge subdivisions and regional floodways. Controlling this perimeter tract allows developer-aligned syndicates to position land for county drainage easements, condemnation settlements, and FEMA HMGP buyout windfalls.",
    forensicBreakdown: [
      { label: "CAD Property ID", value: "PID 10125 (Liberty CAD)" },
      { label: "Owner of Record", value: "Daniel Land Co. LLC" },
      { label: "Overlapping Surveys", value: "Aaron Cherry Survey A-10, J.F. DeRumayor A-103, Isaiah Fields A-35" },
      { label: "Strategic Purpose", value: "Perimeter blocking and drainage canal servitude corridor" },
      { label: "Arbitrage Vehicle", value: "Positioned to absorb settlement buyout funds and MUD 15 easement compensation" }
    ],
    statutes: [
      { code: "Tex. Water Code § 49.222", desc: "Eminent Domain and Condemnation by Special Water Districts." },
      { code: "Tex. Prop. Code Ch. 21", desc: "Texas Eminent Domain Code — Rules governing appraisal, damages, and condemnation awards." }
    ],
    sources: [
      { name: "Liberty County CAD Property Search (Search PID 10125)", url: "https://esearch.libertycad.com/" },
      { name: "TexasFile Recorded Deeds (Daniel Land Co. LLC)", url: "https://www.texasfile.com/" }
    ],
    subpoenaTargets: [
      "CAD Valuation history and ag-exemption / rollback tax records for PID 10125 (2015–2026)",
      "Recorded easement and right-of-way grants across PID 10125"
    ]
  },

  // ==========================================
  // TARKINGTON EXPANSION (SH 99 ➔ FM 321) CORRIDOR
  // ==========================================
  "Tarkington Expansion (SH 99 ➔ FM 321)": {
    title: "Tarkington Expansion (SH 99 ➔ FM 321 Arterial Corridor)",
    category: "Regional Highway Artery & Eminent Domain Bottleneck",
    badgeColor: "bg-red-500/20 text-red-400 border-red-500/30",
    plainMeaning: "The Tarkington Expansion is the contested northeast arterial highway and drainage corridor designed to connect the SH 99 Grand Parkway across Colony Ridge (Plum Grove) directly northeast into FM 321 and State Highway 105 in Tarkington Prairie. The project is actively delayed due to three major bottlenecks: (1) Tarkington Prairie landowners refusing low-ball TxDOT right-of-way condemnation offers; (2) Special district debt caps on Southern MMD 1 ($119M) and MUD 15 ($88M) following DOJ/CFPB civil enforcement; and (3) Downstream floodway lawsuits protesting channelized runoff and MUD 15 WWTP #1 wastewater dumping into the Luce Bayou and Tarkington Woods basins.",
    forensicBreakdown: [
      { label: "Corridor Geometry", value: "SH 99 Grand Parkway ➔ Plum Grove ➔ FM 321 ➔ SH 105 (Tarkington Prairie)" },
      { label: "Lead Developers", value: "William 'Trey' Harris III, John Harris (Colony Ridge / T-REX Management)" },
      { label: "Paving Contractors", value: "Liberty Paving LLC (Heath Marek — MMD 1 VP / Co-Owner) — $22.5M in road contracts" },
      { label: "Clearing Contractors", value: "Tom Johnson (Encino / Black Dog Land) & Kevin Johnson (J-Con / TISD VP)" },
      { label: "Commissioners Court", value: "5-0 Unanimous consent votes approving all plats, TIRZs, and road bonds (Whitmire, Arthur, Wilson, Karbowski, Knight)" },
      { label: "School & CAD Nexus", value: "Susan Rollins (TISD Trustee $95M bond) & Jimmy Rollins (CAD Chief Appraiser)" },
      { label: "Delay Status", value: "TxDOT ROW gridlock, landowner resistance, bond saturation, and FEMA buyout litigation" }
    ],
    statutes: [
      { code: "Tex. Transp. Code Ch. 228", desc: "State Highway Toll Facilities and Arterial Expansion." },
      { code: "Tex. Water Code Ch. 49", desc: "Provisions Applicable to All Special Districts (Bond limits and conflict recusal)." },
      { code: "Tex. Loc. Gov't Code Ch. 171", desc: "Regulation of Conflicts of Interest of Officers of Municipalities and Counties." }
    ],
    sources: [
      { name: "TxDOT Beaumont District Project Tracker (SH 99 / FM 321)", url: "https://www.txdot.gov/projects/projects-studies/beaumont.html" },
      { name: "TexasFile Recorded Deeds & ROW Instruments (Liberty County)", url: "https://www.texasfile.com/" },
      { name: "Liberty County Commissioners Court Corridor Plat Minutes", url: "https://www.co.liberty.tx.us/" },
      { name: "Southern Liberty County MMD No. 1 Bond Official Statement", url: "https://www.brb.texas.gov/" }
    ],
    subpoenaTargets: [
      "TxDOT Right-of-Way acquisition parcel files and appraisal packets for FM 321 arterial connectors",
      "Liberty County Commissioners Court executive session minutes regarding corridor route alignment",
      "Southern MMD 1 and Liberty Paving LLC construction invoices and subcontract awards"
    ]
  },

  "Liberty County Deed Doc #2018010778 (Timbervest 5,794-Acre Transfer A-208)": {
    title: "Deed Records Doc #2018010778 (5,794-Acre Foundational Transfer)",
    category: "Master Land Acquisition & Corridor Spine",
    badgeColor: "bg-teal-500/20 text-teal-400 border-teal-500/30",
    plainMeaning: "Recorded on May 18, 2018, Doc #2018010778 is the master warranty deed whereby Timbervest Partners III Texas LLC transferred 5,793.857 acres across the Ann Holshousen Survey (A-208) and adjoining leagues to Colony Ridge Development LLC. This massive land accumulation forms the entire physical foundation for the northeast expansion corridor from SH 99 towards FM 321, providing the acreage now subdivided into Santa Fe Sections 8 through 12 and creating the arterial right-of-way that developers are seeking to monetize via municipal management district bonds and TxDOT condemnation awards.",
    forensicBreakdown: [
      { label: "Document Number", value: "Liberty County Deed Records Doc #2018010778" },
      { label: "Recording Date", value: "May 18, 2018" },
      { label: "Grantor", value: "Timbervest Partners III Texas LLC" },
      { label: "Grantee", value: "Colony Ridge Development LLC (William 'Trey' Harris III / Robin Harris)" },
      { label: "Acreage / Survey", value: "5,793.857 Acres — Ann Holshousen Survey A-208 & adjoining leagues" },
      { label: "Corridor Significance", value: "Master geographic footprint for the SH 99 Grand Parkway to FM 321 arterial spine" }
    ],
    statutes: [
      { code: "Tex. Prop. Code § 11.001", desc: "Place of Recording for Real Property Conveyances." },
      { code: "Tex. Water Code § 49.211", desc: "Powers of Water Districts to Acquire Real Property and Easements." }
    ],
    sources: [
      { name: "TexasFile County Deed Search (Search Doc #2018010778)", url: "https://www.texasfile.com/" },
      { name: "Liberty CAD Geographic Information System (GIS) Parcel Map", url: "https://www.libertycad.com/" }
    ],
    subpoenaTargets: [
      "Original Warranty Deed Doc #2018010778 and title policy schedule of exceptions",
      "Timbervest Partners III closing settlement statements and wire transfer records"
    ]
  },

  "Liberty County Deed Doc #2026017008 (John Harris Director Lot #5 MMD 1 Straw Deed)": {
    title: "Deed Doc #2026017008 (Director Lot #5 Straw Conveyance)",
    category: "Board Qualification Straw Parcel & Self-Dealing Conduit",
    badgeColor: "bg-red-500/20 text-red-400 border-red-500/30",
    plainMeaning: "Under Texas Water Code § 49.052, directors of special districts must own land within district boundaries to qualify to sit on the governing board. Deed Doc #2026017008 conveys a nominal 0.05-acre straw lot (Director Lot #5) to John Harris solely to satisfy this statutory requirement. Following this straw conveyance, John Harris was seated on Southern Liberty County MMD No. 1, where he and fellow developer directors approved $119,000,000 in public bond authorization and awarded over $22,500,000 in arterial road paving contracts to Liberty Paving LLC (co-owned by MMD 1 Board VP Heath Marek).",
    forensicBreakdown: [
      { label: "Document Number", value: "Liberty County Deed Records Doc #2026017008" },
      { label: "Type of Transfer", value: "Straw conveyance of Director Lot #5 to satisfy board residency/ownership statute" },
      { label: "Grantee / Beneficiary", value: "John Harris (Director, Southern Liberty County MMD No. 1)" },
      { label: "Governing Board Action", value: "Approved $119M public bond authorization and $22.5M paving awards to Liberty Paving LLC" },
      { label: "Abstention Loophole", value: "Board VP Heath Marek filed Chapter 171 affidavit; John Harris and developer bloc approved contracts" }
    ],
    statutes: [
      { code: "Tex. Water Code § 49.052", desc: "Disqualification of Directors — Requirements for bona fide property ownership." },
      { code: "Tex. Loc. Gov't Code § 171.004", desc: "Conflict of Interest Affidavit and Abstention Requirements." },
      { code: "Tex. Penal Code § 39.02", desc: "Abuse of Official Capacity (Conferring private contracts via public board authority)." }
    ],
    sources: [
      { name: "TexasFile County Deed Search (Search Doc #2026017008)", url: "https://www.texasfile.com/" },
      { name: "Southern Liberty County MMD No. 1 Board Minutes & Resolutions", url: "https://www.texasfile.com/" },
      { name: "Texas Ethics Commission Conflict Disclosures (Form CIS)", url: "https://www.ethics.state.tx.us/" }
    ],
    subpoenaTargets: [
      "Deed Doc #2026017008 conveyance file and consideration affidavit",
      "MMD 1 Board Director Oath of Office and qualification verification certificates"
    ]
  },

  "Liberty County Instrument #2025041525 (Bell Silva Credit Line / MMD 1 $119M)": {
    title: "Instrument #2025041525 (Bell Silva Credit Line / MMD 1 $119M)",
    category: "Private Credit Facility & Public Bond Absorption",
    badgeColor: "bg-amber-500/20 text-amber-400 border-amber-500/30",
    plainMeaning: "Recorded Instrument #2025041525 establishes the Bell Silva private credit facility and security agreement financing arterial road construction across Southern Liberty County MMD No. 1. This private credit line advances construction capital to developer-aligned contractors (Liberty Paving LLC) to build roads connecting SH 99 towards FM 321. The agreement is structured so that private debt obligations are absorbed and paid off through future tax-exempt public municipal management district bonds and ad valorem taxes levied on incoming lot buyers.",
    forensicBreakdown: [
      { label: "Instrument Number", value: "Liberty County Official Public Records Instrument #2025041525" },
      { label: "Credit Facility", value: "Bell Silva private financing agreement" },
      { label: "District Vehicle", value: "Southern Liberty County MMD No. 1 ($119M public bond authorization)" },
      { label: "Contractor Beneficiary", value: "Liberty Paving LLC (Heath Marek / Trey Harris)" },
      { label: "Arterial Alignment", value: "Corridor paving connecting SH 99 Grand Parkway across Plum Grove towards FM 321" }
    ],
    statutes: [
      { code: "Tex. Gov't Code Ch. 1201", desc: "Public Security Procedures Act — Rules governing debt absorption and bond pledges." },
      { code: "Tex. Water Code § 49.151", desc: "Authority of Special Districts to Issue Bonds and Pledge Ad Valorem Taxes." }
    ],
    sources: [
      { name: "TexasFile County Records (Search Instrument #2025041525)", url: "https://www.texasfile.com/" },
      { name: "Texas Bond Review Board (BRB) Local Government Debt Registry", url: "https://www.brb.texas.gov/" }
    ],
    subpoenaTargets: [
      "Full executed copy of Bell Silva Credit Agreement #2025041525 and schedule of collateral",
      "MMD 1 developer reimbursement ledgers showing debt payoffs via bond proceeds"
    ]
  },

  "Liberty County Deed Doc #W2025018238 (ANDCO LLC / Cory Anderson 61.05 Ac A-208)": {
    title: "Deed Doc #W2025018238 (ANDCO LLC / Cory Anderson 61.05 Ac A-208)",
    category: "Special District Insider Land Assembly",
    badgeColor: "bg-teal-500/20 text-teal-400 border-teal-500/30",
    plainMeaning: "Recorded on May 28, 2025, Warranty Deed Doc #W2025018238 conveys 61.05 acres in the Ann Holshousen Survey (A-208) from ANDCO LLC to Cory Anderson and Shannon Amanda Anderson. Cory Anderson serves as Assistant Secretary on the Board of Directors of Liberty County MUD No. 1 and is closely affiliated with developer construction vendors. This 61-acre tract sits directly along the proposed SH 99 ➔ FM 321 arterial corridor path, positioning insider entities for lucrative right-of-way sales, drainage easements, and commercial frontage valuation windfalls as highway construction advances.",
    forensicBreakdown: [
      { label: "Document Number", value: "Liberty County Deed Records Doc #W2025018238" },
      { label: "Recording Date", value: "May 28, 2025" },
      { label: "Grantor ➔ Grantee", value: "ANDCO LLC ➔ Cory Anderson & Shannon Amanda Anderson" },
      { label: "Acreage / Survey", value: "61.05 Acres — Ann Holshousen Survey A-208" },
      { label: "Insider Role", value: "Cory Anderson (Assistant Secretary, Liberty County MUD No. 1 Board)" },
      { label: "Corridor Geometry", value: "Direct frontage along proposed SH 99 to FM 321 expansion route" }
    ],
    statutes: [
      { code: "Tex. Loc. Gov't Code Ch. 171", desc: "Conflict of Interest Disclosure for Local Public Officials." },
      { code: "Tex. Water Code § 49.058", desc: "Conflicts of Interest and Disqualification of Water District Officers." }
    ],
    sources: [
      { name: "TexasFile County Deed Search (Search Doc #W2025018238)", url: "https://www.texasfile.com/" },
      { name: "Liberty County MUD No. 1 Annual Audit & Board Roster", url: "https://www.tceq.texas.gov/" }
    ],
    subpoenaTargets: [
      "Deed Doc #W2025018238 title package and purchase contract",
      "ANDCO LLC Texas SOS filings and bank disbursement records",
      "Cory Anderson conflict of interest disclosures filed with MUD No. 1"
    ]
  },

  "Liberty County Deed Doc #2016016901 (Tom Johnson / Burns TxDOT Clearing Overlap)": {
    title: "Deed Doc #2016016901 (Tom Johnson / Burns Architecture Overlap)",
    category: "Contractor Physical Convergence & Public Conduit",
    badgeColor: "bg-purple-500/20 text-purple-400 border-purple-500/30",
    plainMeaning: "Liberty County Deed Records Doc #2016016901 establishes the shared physical location and transactional convergence between Tom Johnson (Black Dog Land & Cattle LLC, Encino Landscape, PBK Holdings LLC) and Kenny & Brenda Burns (Burns Architecture LLC). Burns Architecture served as master architect for the Liberty County Jail and Colony Ridge Annex (implicated in $612K in auditor-flagged architectural fee markups via White Construction), while Tom Johnson received county clearing subcontracts, TxDOT right-of-way clearing awards along the corridor, and co-managed off-book booster accounts (M-Club non-profit EIN 93-1956613).",
    forensicBreakdown: [
      { label: "Document Number", value: "Liberty County Deed Records Doc #2016016901" },
      { label: "Connected Entities", value: "Tom Johnson (Encino / Black Dog Land) & Brenda Burns (Burns Architecture)" },
      { label: "Physical Address", value: "Shared operational headquarters in Tarkington / Liberty County" },
      { label: "Contractual Flow", value: "TxDOT highway clearing + $612K jail architectural fee markups + M-Club booster fund" },
      { label: "Corridor Role", value: "Highway right-of-way timber clearing and dirt work along SH 99 ➔ FM 321" }
    ],
    statutes: [
      { code: "Tex. Penal Code § 39.02", desc: "Abuse of Official Capacity (Facilitating pass-through contract markups)." },
      { code: "Tex. Gov't Code § 2254.004", desc: "Professional Services Procurement Act — Prohibition against competitive bidding circumvention." }
    ],
    sources: [
      { name: "TexasFile County Deed Search (Search Doc #2016016901)", url: "https://www.texasfile.com/" },
      { name: "Texas Secretary of State Business Filings (Burns Architecture / Black Dog Land)", url: "https://mycpa.cpa.state.tx.us/coa/" },
      { name: "Liberty County Auditor Jail Contract Audit Ledger (2024)", url: "https://www.co.liberty.tx.us/" }
    ],
    subpoenaTargets: [
      "Deed Doc #2016016901 parcel conveyance and partnership agreements",
      "White Construction and Burns Architecture pass-through invoices for County Jail and Annex",
      "M-Club Booster Club (EIN 93-1956613) bank records and contributor ledgers"
    ]
  },

  "Pipeline ROW Doc #2019009376 (ONEOK Arbuckle II 300.6 Ac A-354)": {
    title: "Right-of-Way Doc #2019009376 (ONEOK Arbuckle II Pipeline ROW)",
    category: "Industrial Energy ROW & Arterial Easement Overlap",
    badgeColor: "bg-amber-500/20 text-amber-400 border-amber-500/30",
    plainMeaning: "Recorded on April 24, 2019, Doc #2019009376 grants a 300.627-acre pipeline right-of-way across the Barton Tarkington League (A-354) from Timbervest to ONEOK Arbuckle II Pipeline LLC. This industrial energy transmission corridor runs parallel to and intersects the proposed SH 99 ➔ FM 321 arterial corridor path, highlighting how developer-held timber tracts are leveraged for high-dollar pipeline easements and condemnation awards while simultaneously negotiating municipal road and drainage servitudes.",
    forensicBreakdown: [
      { label: "Document Number", value: "Liberty County Deed Records Doc #2019009376" },
      { label: "Recording Date", value: "April 24, 2019" },
      { label: "Grantor ➔ Grantee", value: "Timbervest Partners III Texas LLC ➔ ONEOK Arbuckle II Pipeline LLC" },
      { label: "Acreage / League", value: "300.627 Acres — Barton Tarkington League A-354" },
      { label: "Corridor Geometry", value: "Parallel pipeline corridor intersecting the SH 99 ➔ FM 321 highway alignment" }
    ],
    statutes: [
      { code: "Tex. Nat. Res. Code § 111.019", desc: "Common Carrier Pipeline Eminent Domain Authority." },
      { code: "Tex. Util. Code Ch. 181", desc: "Miscellaneous Powers of Utilities Regarding Easements and Rights-of-Way." }
    ],
    sources: [
      { name: "TexasFile County Deed Search (Search Doc #2019009376)", url: "https://www.texasfile.com/" },
      { name: "Railroad Commission of Texas (RRC) Pipeline Mapping System (T-4 Permit)", url: "https://www.rrc.texas.gov/" }
    ],
    subpoenaTargets: [
      "Right-of-Way Agreement Doc #2019009376 and recorded survey plats",
      "Pipeline crossing agreements and road easement coordination documents"
    ]
  },

  // ==========================================
  // TARKINGTON ISD & CAD CONFLICTS
  // ==========================================
  "TISD $95M Bond Deal (Prop A $50M / Prop B $45M)": {
    title: "Tarkington ISD $95M Bond Referendum (Propositions A & B)",
    category: "School District Capital Arbitrage & Land Speculation",
    badgeColor: "bg-amber-500/20 text-amber-400 border-amber-500/30",
    plainMeaning: "Tarkington ISD proposed a massive $95,000,000 bond referendum divided into Proposition A ($50M for new elementary school construction) and Proposition B ($45M for confidential land acquisition and campus infrastructure). Under Texas Government Code § 551.072 executive session secrecy, the board conducted closed-door negotiations to purchase a 50-acre parcel in rural Tarkington near the expanding SH 99 / FM 321 corridor. The bond deal triggered fierce community backlash because Tarkington ISD had not passed a bond in over 20 years, and the proposed land purchase was negotiated while board members and their spouses held private real estate and tax appraisal interests in the immediate expansion zone.",
    forensicBreakdown: [
      { label: "Total Authorization", value: "$95,000,000 (Prop A $50M / Prop B $45M)" },
      { label: "Land Acquisition Allocation", value: "$45M allocated under Proposition B (including 50-acre confidential site)" },
      { label: "Governing Board", value: "Tarkington ISD Board of Trustees (Lane Gulledge, Kevin Johnson, Susan Rollins, Dwayne Stovall)" },
      { label: "Community Pushback", value: "Followed narrow 441-452 defeat of May 2024 bond; community demands independent land appraisal" },
      { label: "Corridor Connection", value: "Site selection positioned directly along SH 99 ➔ FM 321 arterial path" }
    ],
    statutes: [
      { code: "Tex. Educ. Code Ch. 45", desc: "School District Funds and Bonds — Public debt issuance and capital expenditure." },
      { code: "Tex. Gov't Code § 551.072", desc: "Deliberations Regarding Real Property (Closed Meeting Exception)." },
      { code: "Tex. Loc. Gov't Code Ch. 171", desc: "Regulation of Conflicts of Interest of Officers of Local Governments." }
    ],
    sources: [
      { name: "Tarkington ISD Board of Trustees Official Agendas & Minutes", url: "https://www.tarkingtonisd.net/board" },
      { name: "Texas Bond Review Board (BRB) School District Bond Database", url: "https://www.brb.texas.gov/" },
      { name: "Liberty CAD Public Property Search Portal", url: "https://esearch.libertycad.com/" }
    ],
    subpoenaTargets: [
      "TISD Board Executive Session Minutes regarding § 551.072 real property negotiations",
      "Draft purchase contracts and option agreements for the 50-acre proposed campus site",
      "Financial advisory and bond underwriting fee ledgers for Series 2025/2026 proposals"
    ]
  },

  "Susan Rollins / Jimmy Rollins Spousal CAD Conflict": {
    title: "Susan Rollins & Jimmy Rollins Spousal CAD Conflict",
    category: "Property Tax Valuation & Spousal Self-Dealing Nexus",
    badgeColor: "bg-red-500/20 text-red-400 border-red-500/30",
    plainMeaning: "A profound conflict of interest exists between the Tarkington ISD Board and the Liberty County Central Appraisal District (CAD). Trustee Susan Rollins sits on the Tarkington ISD Board of Trustees, voting on tax rate adoptions, multi-million dollar campus bond initiatives, and confidential school land purchases. Concurrently, her husband Jimmy Rollins sits on the Liberty CAD Board of Directors and serves as Chief Appraiser, controlling the property valuation rolls, agricultural rollback tax exemptions, and appraisal write-downs that dictate the school district's bonding capacity and tax levy. Jimmy Rollins also operates private construction ventures (J. Rollins Construction), creating an uninsulated spousal feedback loop between school construction capital and appraisal tax governance.",
    forensicBreakdown: [
      { label: "School Board Trustee", value: "Susan Rollins (Votes on $95M bond, property tax rate, and land purchases)" },
      { label: "CAD Chief Appraiser / Director", value: "Jimmy Rollins (Husband; controls property valuations, tax rolls, and ag-shields across Liberty County)" },
      { label: "Commercial Entity", value: "J. Rollins Construction (Commercial dirt work and construction operations)" },
      { label: "CAD Board Overlap", value: "Sat on Liberty CAD Board alongside criminally indicted attorney Emily Kebodeaux Cook" },
      { label: "Non-Profit Shadow Fund", value: "Co-organizers of M Club of Tarkington Inc (EIN 93-1956613)" }
    ],
    statutes: [
      { code: "Tex. Tax Code § 6.035", desc: "Restrictions on Eligibility of Appraisal District Board Members and Chief Appraisers." },
      { code: "Tex. Loc. Gov't Code § 171.004", desc: "Conflict of Interest Affidavit and Mandatory Abstention for Spousal Financial Interests." },
      { code: "Tex. Penal Code § 39.02", desc: "Abuse of Official Capacity in Setting Public Property Valuations." }
    ],
    sources: [
      { name: "Liberty County CAD Board of Directors Meeting Minutes", url: "https://www.libertycad.com/" },
      { name: "Texas Comptroller Property Tax Assistance Division (PTAD) Audits", url: "https://comptroller.texas.gov/taxes/property-tax/" },
      { name: "Texas Ethics Commission Personal Financial Statements (Form PFS)", url: "https://www.ethics.state.tx.us/" }
    ],
    subpoenaTargets: [
      "Liberty CAD appraisal file notes and adjustment histories for Rollins family properties and expansion tracts",
      "Chapter 171 Conflict Affidavits filed by Susan Rollins with Tarkington ISD Board Secretary",
      "Communications between Liberty CAD leadership and Tarkington ISD Superintendent regarding bond tax bases"
    ]
  },

  "Kevin Johnson / J-Con Services Vendor Awards": {
    title: "Kevin Johnson (J-Con Services) Vendor Contracting Nexus",
    category: "School Board Trustee Vendor Capture",
    badgeColor: "bg-red-500/20 text-red-400 border-red-500/30",
    plainMeaning: "Kevin Johnson serves as Vice President of the Tarkington ISD Board of Trustees while simultaneously owning and operating J-Con Services, a commercial dirt clearing and civil site work contracting firm. J-Con Services and linked Johnson clearing entities (including Tom Johnson's Encino Landscape and Johnson Construction Clearing LLC) have secured extensive campus dirt work, utility clearing, and county road subcontracts. Johnson co-manages off-book athletic booster funds (M-Club) that handle hundreds of thousands of dollars outside standard school district audit and procurement protocols.",
    forensicBreakdown: [
      { label: "Public Office", value: "Vice President, Tarkington ISD Board of Trustees" },
      { label: "Commercial Firm", value: "J-Con Services / Johnson Clearing Affiliates" },
      { label: "Contractual Flow", value: "Campus dirt clearing, drainage excavation, and county equipment subcontracts" },
      { label: "Cross-Entity Link", value: "Direct operational nexus with Tom Johnson (Black Dog Land & Cattle / Encino Landscape)" },
      { label: "Booster Conduit", value: "Co-organizer of M Club of Tarkington Inc (EIN 93-1956613)" }
    ],
    statutes: [
      { code: "Tex. Loc. Gov't Code § 171.002", desc: "Substantial Interest in Business Entity (Trustee ownership of contracting vendor)." },
      { code: "Tex. Educ. Code § 44.031", desc: "Purchasing Contracts — Mandatory competitive procurement thresholds for school districts." },
      { code: "Tex. Penal Code § 39.02", desc: "Abuse of Official Capacity for Private Corporate Benefit." }
    ],
    sources: [
      { name: "Tarkington ISD Accounts Payable & Warrant Check Registers", url: "https://www.tarkingtonisd.net/departments/business-office" },
      { name: "Texas Secretary of State Business Filings (J-Con Services / J-Con Construction)", url: "https://mycpa.cpa.state.tx.us/coa/" },
      { name: "Texas Ethics Commission Form CIS Disclosures", url: "https://www.ethics.state.tx.us/" }
    ],
    subpoenaTargets: [
      "All purchase orders, bid score sheets, and warrants payable issued to J-Con Services by Tarkington ISD",
      "Subcontractor payment manifests for county and school district construction projects",
      "Bank records for M Club of Tarkington Inc showing disbursements to contractor-aligned accounts"
    ]
  },

  "M-Club Shadow Budget (EIN 93-1956613)": {
    title: "M Club of Tarkington Inc (EIN 93-1956613 Shadow Budget)",
    category: "Non-Profit Off-Balance-Sheet Shadow Treasury",
    badgeColor: "bg-amber-500/20 text-amber-400 border-amber-500/30",
    plainMeaning: "M Club of Tarkington Inc is a registered 501(c)(3) booster organization (EIN 93-1956613) co-organized by leaders of the Rollins and Johnson families. Investigative records reveal that the non-profit operates as an off-balance-sheet shadow treasury for athletic facilities, equipment procurement, and campus projects, bypassing Texas Education Code competitive bidding laws, independent school district annual financial audits, and Texas Public Information Act disclosure requirements. Community members and whistleblowers who attempted to audit M Club cash flows were subjected to coordinated political and social intimidation.",
    forensicBreakdown: [
      { label: "Entity Name", value: "M Club of Tarkington Inc" },
      { label: "Federal Tax ID", value: "EIN 93-1956613" },
      { label: "Key Organizers", value: "Rollins Family (Susan & Jimmy Rollins) & Johnson Family (Kevin & Tom Johnson)" },
      { label: "Operational Function", value: "Off-book procurement of campus athletic equipment, dirt work, and booster disbursements" },
      { label: "Audit Immunity", value: "Operates outside official TISD general ledger; immune to routine TEA and TPIA audit checks" }
    ],
    statutes: [
      { code: "26 U.S.C. § 501(c)(3)", desc: "Internal Revenue Code — Prohibition against private inurement to corporate insiders." },
      { code: "Tex. Bus. Org. Code Ch. 22", desc: "Nonprofit Corporations — Mandatory financial record-keeping and inspection rights." },
      { code: "Tex. Penal Code § 32.45", desc: "Misapplication of Fiduciary Property." }
    ],
    sources: [
      { name: "IRS Exempt Organizations Search (Search EIN 93-1956613)", url: "https://apps.irs.gov/app/eos/" },
      { name: "ProPublica Nonprofit Explorer (M Club of Tarkington Inc)", url: "https://projects.propublica.org/nonprofits/" },
      { name: "Texas Secretary of State Non-Profit Registry", url: "https://www.sos.state.tx.us/" }
    ],
    subpoenaTargets: [
      "IRS Form 990 / 990-EZ filings and donor schedules for M Club of Tarkington Inc (2018–2026)",
      "Depository bank statements and check register ledgers for EIN 93-1956613"
    ]
  },

  "Flock Safety ALPR Hotlist & Surveillance Targeting Audit (Citizen TPIA)": {
    title: "Flock Safety ALPR Hotlist & Surveillance Targeting Audit (Citizen TPIA)",
    category: "Civil Liberties & Multi-Agency Surveillance Dragnet",
    badgeColor: "bg-red-500/20 text-red-400 border-red-500/30",
    plainMeaning: "Formal Texas Public Information Act (TPIA) records requests were filed demanding user access audit trails, system logs, search histories, and custom hotlist entries from Liberty PD's Flock Safety automated license plate reader (ALPR) system. The demand specifically audits the unauthorized surveillance, license plate querying, and multi-county tracking targeting local citizen Maria Acevedo across Liberty, Montgomery, and Harris counties under Lt. Cedric McDuffie's command, examining whether local police databases were weaponized against private citizens without reasonable suspicion or active criminal warrants.",
    forensicBreakdown: [
      { label: "Surveillance Technology", value: "Flock Safety Automated License Plate Recognition (ALPR) cameras & regional network" },
      { label: "Target Citizen", value: "Maria Acevedo (Target of law enforcement ALPR queries and vehicle hotlisting)" },
      { label: "Command Authority", value: "Lt. Cedric McDuffie (Liberty PD Patrol Division / Flock ALPR Administrator)" },
      { label: "Records Demanded", value: "User access logs, exact officer badge numbers, CAD case reasons, and TLETS/TCIC query histories" },
      { label: "Inter-Agency Scope", value: "Cross-county ALPR sharing between Liberty PD, MCSO, and regional constable offices" }
    ],
    statutes: [
      { code: "Tex. Gov't Code Ch. 552", desc: "Texas Public Information Act — Right of citizens to inspect digital audit trails and surveillance search logs." },
      { code: "4th Amendment, U.S. Const.", desc: "Prohibition against unreasonable searches, warrant-less dragnet surveillance, and official harassment." },
      { code: "Tex. Penal Code § 39.02", desc: "Abuse of Official Capacity — Using governmental surveillance tools for unauthorized personal or political monitoring." }
    ],
    sources: [
      { name: "Texas Public Information Act Handbook (OAG)", url: "https://www.texasattorneygeneral.gov/open-government" },
      { name: "Flock Safety Transparency & Audit Trail Guidelines", url: "https://www.flocksafety.com/" },
      { name: "City of Liberty Police Department TPIA Records Portal", url: "https://www.cityofliberty.org/police" }
    ],
    subpoenaTargets: [
      "Flock Safety Inc. master administrative query audit trail for Liberty PD portal",
      "TLETS / TCIC transaction audit logs for Maria Acevedo's driver's license and vehicle plates",
      "Internal Liberty PD CAD/RMS logs correlating vehicle detections with officer dispatches"
    ]
  }
};

/**
 * Get or dynamically generate an evidence dossier for any anchor
 */
export function getEvidenceDossier(anchorName, entityLabel = '') {
  // Check exact match
  if (EVIDENCE_DOSSIER[anchorName]) {
    return EVIDENCE_DOSSIER[anchorName];
  }

  // Check fuzzy key match
  const foundKey = Object.keys(EVIDENCE_DOSSIER).find(k => 
    anchorName.toLowerCase().includes(k.toLowerCase()) || k.toLowerCase().includes(anchorName.toLowerCase())
  );
  if (foundKey) {
    return EVIDENCE_DOSSIER[foundKey];
  }

  // Generate dynamic contextual dossier
  return {
    title: anchorName,
    category: "Investigative Evidence Anchor",
    badgeColor: "bg-teal-500/20 text-teal-400 border-teal-500/30",
    plainMeaning: `Forensic anchor '${anchorName}' is tied to entity '${entityLabel || "Liberty County Public Record"}'. It represents a key evidentiary node linking public government records, special district bond flow, campaign donations, or statutory compliance filings within the Liberty County Political Swamp investigation.`,
    forensicBreakdown: [
      { label: "Target Entity", value: entityLabel || "Public Subject" },
      { label: "Anchor Identifier", value: anchorName },
      { label: "Investigative Scope", value: "Official records review, Texas Public Information Act (TPIA) requests, and cross-district auditing." }
    ],
    statutes: [
      { code: "Tex. Gov't Code Ch. 552", desc: "Texas Public Information Act — Public right of inspection into governmental affairs and official records." },
      { code: "Tex. Penal Code § 39.02", desc: "Abuse of Official Capacity in governmental administration." }
    ],
    sources: [
      { name: "TexasFile County Records Portal (Liberty County Clerk)", url: `https://www.texasfile.com/` },
      { name: "Liberty County Public Records Portal", url: "https://www.co.liberty.tx.us/" },
      { name: "Texas Ethics Commission Public Search", url: "https://www.ethics.state.tx.us/" },
      { name: "Texas Legislature Online Statutes", url: "https://statutes.capitol.texas.gov/" }
    ],
    subpoenaTargets: [
      `Official Public Information Act (TPIA) request regarding: ${anchorName}`,
      `Liberty County Clerk recorded deeds, minutes, or oaths for: ${entityLabel || anchorName}`
    ]
  };
}
