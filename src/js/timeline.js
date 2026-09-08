/**
 * Timeline Module — Schemes & chronological events
 */

const TIMELINE_EVENTS = [
  {
    date: '2026-09-04',
    title: "Montgomery County — Dolcefino Confronts Judge Vince Santini ('The Cozy Courthouse')",
    entities: ['wayne_dolcefino', 'judge_vince_santini'],
    cartel: 'Judicial & DA',
    detail: "Wayne Dolcefino calls on 457th District Court Judge Vince Santini to recuse and cease hearing cases involving the spouse of another sitting Montgomery County judge (Tucker). Investigation exposes cronyism, judicial favors, and refusal to step down from conflicted dockets.",
    anchors: ["Dolcefino Media 'The Cozy Courthouse' (Sept 4, 2026)", '457th District Court Recusal Motions'],
  },
  {
    date: '2026-08-24',
    title: 'Mont Belvieu — Dolcefino Exposes Municipal Towing Monopoly',
    entities: ['wayne_dolcefino'],
    cartel: 'Developer & Bond Syndicate',
    detail: 'Dolcefino investigation reveals exclusive municipal towing and impound monopoly in Mont Belvieu on the Harris/Chambers county line, highlighting predatory fees and city hall contract steering without competitive bidding.',
    anchors: ["Dolcefino Media 'Monopoly in Mont Belvieu' (Aug 24, 2026)"],
  },
  {
    date: '2026-08-21',
    title: "Liberty County — Dolcefino Files New Legal Action in Novosad Cover-Up ('Chasing Justice')",
    entities: ['wayne_dolcefino', 'bobby_rader', 'james_mcqueen', 'sherry_novosad'],
    cartel: 'Novosad Homicide',
    detail: 'Dolcefino Consulting files new legal actions targeting Liberty County officials and local judges for withholding deputy bodycam footage from the Sherry Novosad death scene, following Texas OAG orders mandating disclosure under the Public Information Act.',
    anchors: ["Dolcefino Media 'Chasing Justice' (Aug 21, 2026)", 'Cause No. CV24-00192 (Dolcefino v. LCSO)'],
  },
  {
    date: '2026-08-01',
    title: 'Klint Bush Indicted — 11 Counts Child Pornography',
    entities: ['klint_bush'],
    cartel: 'Judicial & DA',
    detail: 'Former Elections Administrator / LCHA Director indicted on 11 counts possession of child pornography. Bush administered the MUD 15 2-voter election that authorized $88M in developer debt.',
    anchors: ['Liberty County Grand Jury Indictment (Aug 2026)'],
  },
  {
    date: '2026-07-03',
    title: 'Jason Grindstaff Surrenders — Official Oppression & Indecent Assault',
    entities: ['jason_grindstaff'],
    cartel: 'Law Enforcement & Police',
    detail: 'Former Liberty PD officer surrendered on indictment for Official Oppression and Indecent Assault. Resigned Feb 27, 2026 while under Texas Rangers investigation.',
    anchors: ['June 2026 Indictment', 'SB 1445 F-5 Separation Audit'],
  },
  {
    date: '2025-11-20',
    title: 'City of Liberty PD — Veteran Struck by Patrol Vehicle / Bodycam Cover-up Exposed',
    entities: ['wayne_dolcefino', 'bobby_rader'],
    cartel: 'Law Enforcement & Police',
    detail: 'City of Liberty PD patrol unit strikes local veteran pedestrian. City police logs minimize crash as accidental side-mirror clip. Dolcefino Consulting uncovers bodycam and DPS Region 2 crash reconstruction proving violent direct impact and narrative manipulation.',
    anchors: ["Dolcefino Consulting Investigation 'Liberty Lies'", 'DPS Region 2 Reconstruction Report'],
  },
  {
    date: '2025-06-15',
    title: 'MUD 15 / Wasteline Engineering — Sludge Export & WWTP Permit WQ0016839001',
    entities: ['wasteline_eng', 'glenn_breisch', 'mud_15'],
    cartel: 'Developer & Bond Syndicate',
    detail: 'Wasteline Engineering, Inc. (Glenn Breisch, President / Jason Breisch, Agent) submits engineering designs for MUD 15 Tarkington WWTP #1 (TCEQ WQ0016839001), authorizing sludge export to Austin and unpermitted drainage bypass into Luce Bayou watershed.',
    anchors: ['TCEQ Permit WQ0016839001', 'Texas SOS File No. 0066609400', 'MUD 15 Minutes'],
  },

  {
    date: '2026-06-01',
    title: 'Emily Kebodeaux Cook — Bond Revoked, GPS Ankle Monitor',
    entities: ['emily_cook'],
    cartel: 'Judicial & DA',
    detail: 'Former LCHA / CAD Board member. Bond revoked May 27, 2026 by Judge Chap Cain. Re-set to $75,000 with mandatory GPS ankle monitor. Explicit bond condition bars contact with co-defendant Klint Bush.',
    anchors: ['Judge Chap Cain Order (May 2026)', '$75K Bond w/ GPS'],
  },
  {
    date: '2026-04-01',
    title: '$68M Colony Ridge Settlement — Zero Victim Restitution',
    entities: ['colony_ridge', 'trey_harris', 'john_harris', 'mud_15'],
    cartel: 'Developer & Bond Syndicate',
    detail: 'DOJ/CFPB/OAG consent decree bypassed Judge Bennett. $48M Fund A (infrastructure) and $20M Fund B (law enforcement). Zero dollars to direct victims.',
    anchors: ['DOJ/CFPB Consent Decree (Feb 2026)', 'Judge Bennett Order (Bypassed)'],
  },
  {
    date: '2026-03-01',
    title: 'Emily Kebodeaux Cook Indicted — Felony Misapplication of Fiduciary Property',
    entities: ['emily_cook', 'klint_bush'],
    cartel: 'Judicial & DA',
    detail: 'Indicted for misapplication of LCHA funds. Co-defendant with Klint Bush in the $163,000+ theft scheme across 14 LCHA transactions.',
    anchors: ['Liberty County Grand Jury (March 2026)'],
  },
  {
    date: '2025-05-01',
    title: 'MUD 15 — $88.36M Bond Authorization with 2 Voters',
    entities: ['mud_15', 'klint_bush'],
    cartel: 'Developer & Bond Syndicate',
    detail: 'Liberty County MUD No. 15 passed $88,360,000 bond authorization with exactly two (2) registered voters. 1-1 tie per proposition. Bush served as Elections Administrator.',
    anchors: ['May 2025 Bond Election Results'],
  },
  {
    date: '2025-04-07',
    title: 'Liberty County Jail Arson — $1.1M Lock Scam Exposed',
    entities: ['burns_architecture'],
    cartel: 'Developer & Bond Syndicate',
    detail: 'Arson by capital murder defendant Marco Elihu Jacquez exposed structural failure of electronic door locks funded by 22% of $5M federal ARPA grant. Commissioners capitalized on incident to push $110M jail expansion bond.',
    anchors: ['ARPA Grant Allocation', 'White Construction $612K Audit Flag'],
  },
  {
    date: '2024-11-18',
    title: 'Sherry Lee Novosad — Death Rubber-Stamped as Suicide',
    entities: ['sherry_novosad', 'james_mcqueen', 'bobby_rader', 'jp_ralph_fuller'],
    cartel: 'Novosad Homicide',
    detail: 'Found dead with .410 caliber gunshot wound to neck. LCSO failed to recuse despite Det. Sgt. McQueen\'s romantic relationship with decedent. Independent forensic testing found unidentified male DNA. Husband Ted Novosad conclusively excluded by DNA. McQueen refuses voluntary buccal swab.',
    anchors: ['National Screening Center Lab WO# 2024-STR', 'Dolcefino TPIA Lawsuit', 'Judge Cain Recusal'],
  },
  {
    date: '2023-11-01',
    title: 'Klint Bush First Indictment — Theft of Public Funds ($163K+)',
    entities: ['klint_bush'],
    cartel: 'Judicial & DA',
    detail: 'First indictment for theft of public funds via 14 LCHA transactions totaling $163,000+. Additional charges followed in April 2026.',
    anchors: ['Liberty County Grand Jury (Nov 2023)'],
  },
];

/**
 * Render timeline events
 */
export function initTimeline() {
  const container = document.getElementById('timelineContainer');
  if (!container) return;

  const CARTEL_DOT = {
    'Developer & Bond Syndicate': 'bg-brand-teal',
    'Law Enforcement & Police':   'bg-brand-orange',
    'Judicial & DA':               'bg-brand-purple',
    'Novosad Homicide':            'bg-brand-red',
  };

  container.innerHTML = `
    <div class="timeline-line pl-10 space-y-6">
      ${TIMELINE_EVENTS.map(evt => {
        const dotClass = CARTEL_DOT[evt.cartel] || 'bg-zinc-500';
        return `
          <div class="relative">
            <div class="absolute left-[-21px] top-1.5 w-4 h-4 rounded-full ${dotClass} border-2 border-zinc-950 z-10"></div>
            <div class="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800/60 hover:border-zinc-700 transition-colors">
              <div class="flex items-center gap-3 mb-2">
                <span class="text-xs font-mono text-zinc-500">${evt.date}</span>
                <span class="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold cartel-${evt.cartel === 'Developer & Bond Syndicate' ? 'developer' : evt.cartel === 'Law Enforcement & Police' ? 'law' : evt.cartel === 'Judicial & DA' ? 'judicial' : 'novosad'}">
                  ${evt.cartel.split(' & ')[0]}
                </span>
              </div>
              <h3 class="text-base font-bold text-zinc-100 mb-1">${evt.title}</h3>
              <p class="text-sm text-zinc-400 leading-relaxed">${evt.detail}</p>
              ${evt.anchors.length ? `
                <div class="mt-3 flex flex-wrap gap-1.5">
                  ${evt.anchors.map(a => `<span class="px-2 py-0.5 rounded bg-zinc-800 text-[10px] font-mono text-zinc-400 border border-zinc-700/50">${a}</span>`).join('')}
                </div>
              ` : ''}
            </div>
          </div>
        `;
      }).join('')}
    </div>
  `;
}
