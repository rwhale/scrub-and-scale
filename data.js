'use strict';

// ============================================================
// data.js — All hardcoded data for the Scrub & Scale demonstration
// Scrub & Scale | AI Readiness Demo | Program: SENTINEL-7
// ============================================================

const SS = {};

// ============================================================
// RAW TABLE DATA — 22 rows, IMS_EXPORT_SENTINEL7.csv
// Bad data seeded per spec. Cards 1–10 map to issue categories.
// ============================================================
SS.rawTableData = [
  // Row 1: T-1021 — RESOURCE_NAME variant "J.Mitchell" (Card 10)
  { TASK_ID:'T-1021', TASK_NAME:'Integrate Guidance Subsystem',
    WBS_CODE:'1.2.3.1', OBS_CODE:'ENG-GNC', RESOURCE_NAME:'J.Mitchell',
    BASELINE_START:'2024-01-08', BASELINE_FINISH:'2024-03-29',
    ACTUAL_START:'2024-01-10', ACTUAL_FINISH:'2024-03-28',
    BCWS:'145000', BCWP:'138000', ACWP:'141000',
    PCT_COMPLETE:'100', STATUS:'Closed', NOTES:'',
    _badCells:{ RESOURCE_NAME:10 } },

  // Row 2: T-1033 — DUPLICATE TASK_ID (Card 4), resource variant (Card 10)
  { TASK_ID:'T-1033', TASK_NAME:'Install RF Payload Assembly',
    WBS_CODE:'1.3.2.1', OBS_CODE:'ENG-RF', RESOURCE_NAME:'J.Mitchell',
    BASELINE_START:'2024-02-05', BASELINE_FINISH:'2024-04-15',
    ACTUAL_START:'2024-02-05', ACTUAL_FINISH:'',
    BCWS:'98000', BCWP:'82000', ACWP:'95000',
    PCT_COMPLETE:'68', STATUS:'Active', NOTES:'',
    _badCells:{ TASK_ID:4, RESOURCE_NAME:10 } },

  // Row 3: T-1059 — NULL WBS_CODE (Card 1)
  { TASK_ID:'T-1059', TASK_NAME:'Conduct Environmental Stress Screening',
    WBS_CODE:'', OBS_CODE:'QA-TEST', RESOURCE_NAME:'P.Harrison',
    BASELINE_START:'2024-01-15', BASELINE_FINISH:'2024-02-28',
    ACTUAL_START:'2024-01-18', ACTUAL_FINISH:'2024-02-22',
    BCWS:'67000', BCWP:'67000', ACWP:'70000',
    PCT_COMPLETE:'100', STATUS:'Closed', NOTES:'',
    _badCells:{ WBS_CODE:1 } },

  // Row 4: T-1041 — STATUS CONFLICT: 100% complete but STATUS = Open (Card 3)
  { TASK_ID:'T-1041', TASK_NAME:'Complete PDR Action Items',
    WBS_CODE:'1.1.4.2', OBS_CODE:'ENG-SE', RESOURCE_NAME:'D.Nguyen',
    BASELINE_START:'2024-01-02', BASELINE_FINISH:'2024-01-31',
    ACTUAL_START:'2024-01-02', ACTUAL_FINISH:'2024-02-01',
    BCWS:'34000', BCWP:'34000', ACWP:'35500',
    PCT_COMPLETE:'100', STATUS:'Open', NOTES:'',
    _badCells:{ STATUS:3 } },

  // Row 5: T-1028 — NULL RESOURCE_NAME (Card 1)
  { TASK_ID:'T-1028', TASK_NAME:'Load Flight Software Build 4.2',
    WBS_CODE:'1.4.1.3', OBS_CODE:'ENG-SW', RESOURCE_NAME:'',
    BASELINE_START:'2024-03-01', BASELINE_FINISH:'2024-04-30',
    ACTUAL_START:'2024-03-04', ACTUAL_FINISH:'',
    BCWS:'112000', BCWP:'78000', ACWP:'88000',
    PCT_COMPLETE:'55', STATUS:'Active', NOTES:'',
    _badCells:{ RESOURCE_NAME:1 } },

  // Row 6: T-1079 — IMPLAUSIBLE EVM: BCWP=485000, BCWS=120000, SPI=4.04 (Card 8)
  { TASK_ID:'T-1079', TASK_NAME:'Verify Thermal Vacuum Performance',
    WBS_CODE:'1.2.4.2', OBS_CODE:'ENG-SE', RESOURCE_NAME:'K.Okafor',
    BASELINE_START:'2024-02-19', BASELINE_FINISH:'2024-03-18',
    ACTUAL_START:'2024-02-19', ACTUAL_FINISH:'2024-03-15',
    BCWS:'120000', BCWP:'485000', ACWP:'118000',
    PCT_COMPLETE:'100', STATUS:'Closed', NOTES:'',
    _badCells:{ BCWP:8, BCWS:8 } },

  // Row 7: T-1072 — NULL WBS_CODE (Card 1)
  { TASK_ID:'T-1072', TASK_NAME:'Submit CDR Data Package',
    WBS_CODE:'', OBS_CODE:'PM-CTRL', RESOURCE_NAME:'M.Castillo',
    BASELINE_START:'2024-02-01', BASELINE_FINISH:'2024-02-29',
    ACTUAL_START:'2024-02-05', ACTUAL_FINISH:'2024-03-01',
    BCWS:'22000', BCWP:'22000', ACWP:'23500',
    PCT_COMPLETE:'100', STATUS:'Closed', NOTES:'',
    _badCells:{ WBS_CODE:1 } },

  // Row 8: T-1088 — DASH FORMAT WBS_CODE "1-2-4-1" (Card 5)
  { TASK_ID:'T-1088', TASK_NAME:'Assemble Propulsion Module',
    WBS_CODE:'1-2-4-1', OBS_CODE:'MFG-ASSY', RESOURCE_NAME:'R.Torres',
    BASELINE_START:'2024-03-11', BASELINE_FINISH:'2024-05-17',
    ACTUAL_START:'2024-03-11', ACTUAL_FINISH:'',
    BCWS:'234000', BCWP:'187000', ACWP:'201000',
    PCT_COMPLETE:'72', STATUS:'Active', NOTES:'',
    _badCells:{ WBS_CODE:5 } },

  // Row 9: T-1048 — DATE LOGIC VIOLATION: finish before start (Card 2)
  { TASK_ID:'T-1048', TASK_NAME:'Conduct Vibration Testing — Payload Bay',
    WBS_CODE:'1.2.5.1', OBS_CODE:'QA-TEST', RESOURCE_NAME:'S.Patel',
    BASELINE_START:'2024-02-12', BASELINE_FINISH:'2024-03-08',
    ACTUAL_START:'2024-02-01', ACTUAL_FINISH:'2024-01-12',
    BCWS:'78000', BCWP:'65000', ACWP:'72000',
    PCT_COMPLETE:'100', STATUS:'Closed', NOTES:'',
    _badCells:{ ACTUAL_FINISH:2, ACTUAL_START:2 } },

  // Row 10: T-1035 — RESOURCE_NAME variant "Mitchell, J" (Card 10)
  { TASK_ID:'T-1035', TASK_NAME:'Perform Power Subsystem Integration',
    WBS_CODE:'1.2.2.3', OBS_CODE:'ENG-SE', RESOURCE_NAME:'Mitchell, J',
    BASELINE_START:'2024-03-18', BASELINE_FINISH:'2024-05-03',
    ACTUAL_START:'2024-03-20', ACTUAL_FINISH:'',
    BCWS:'156000', BCWP:'102000', ACWP:'118000',
    PCT_COMPLETE:'52', STATUS:'Active', NOTES:'',
    _badCells:{ RESOURCE_NAME:10 } },

  // Row 11: T-1046 — NULL RESOURCE_NAME (Card 1)
  { TASK_ID:'T-1046', TASK_NAME:'Generate Integrated Baseline Review Package',
    WBS_CODE:'1.1.2.1', OBS_CODE:'PM-CTRL', RESOURCE_NAME:'',
    BASELINE_START:'2024-01-22', BASELINE_FINISH:'2024-02-16',
    ACTUAL_START:'2024-01-22', ACTUAL_FINISH:'2024-02-14',
    BCWS:'45000', BCWP:'45000', ACWP:'47000',
    PCT_COMPLETE:'100', STATUS:'Closed', NOTES:'',
    _badCells:{ RESOURCE_NAME:1 } },

  // Row 12: T-1093 — WBS_CODE = "TBD" (Card 5), BCWS=0 (null SPI in query)
  { TASK_ID:'T-1093', TASK_NAME:'Conduct Structural Analysis — Bus Frame',
    WBS_CODE:'TBD', OBS_CODE:'ENG-SE', RESOURCE_NAME:'A.Williams',
    BASELINE_START:'2024-04-01', BASELINE_FINISH:'2024-05-15',
    ACTUAL_START:'', ACTUAL_FINISH:'',
    BCWS:'0', BCWP:'0', ACWP:'0',
    PCT_COMPLETE:'0', STATUS:'Active', NOTES:'',
    _badCells:{ WBS_CODE:5 } },

  // Row 13: T-1051 — ZERO COST ANOMALY: ACWP=0 but 82% complete (Card 7)
  { TASK_ID:'T-1051', TASK_NAME:'Process Flight Software Acceptance Testing',
    WBS_CODE:'1.4.1.4', OBS_CODE:'ENG-SW', RESOURCE_NAME:'L.Bergman',
    BASELINE_START:'2024-02-26', BASELINE_FINISH:'2024-04-12',
    ACTUAL_START:'2024-03-15', ACTUAL_FINISH:'',
    BCWS:'134000', BCWP:'110000', ACWP:'0',
    PCT_COMPLETE:'82', STATUS:'Active', NOTES:'',
    _badCells:{ ACWP:7 } },

  // Row 14: T-1063 — 100% COMPLETE but ACTUAL_FINISH blank (Card 2)
  { TASK_ID:'T-1063', TASK_NAME:'Deliver Payload Integration Report',
    WBS_CODE:'1.3.3.1', OBS_CODE:'SYS-INTG', RESOURCE_NAME:'T.Kimura',
    BASELINE_START:'2024-02-05', BASELINE_FINISH:'2024-03-01',
    ACTUAL_START:'2024-02-05', ACTUAL_FINISH:'',
    BCWS:'29000', BCWP:'29000', ACWP:'30500',
    PCT_COMPLETE:'100', STATUS:'Closed', NOTES:'',
    _badCells:{ ACTUAL_FINISH:2 } },

  // Row 15: T-1095 — OBS_CODE typo "ENG-GCN" (should be ENG-GNC) (Card 6)
  { TASK_ID:'T-1095', TASK_NAME:'Calibrate IMU and Star Tracker Assembly',
    WBS_CODE:'1.2.3.3', OBS_CODE:'ENG-GCN', RESOURCE_NAME:'B.Osei',
    BASELINE_START:'2024-03-04', BASELINE_FINISH:'2024-04-08',
    ACTUAL_START:'2024-03-04', ACTUAL_FINISH:'',
    BCWS:'91000', BCWP:'74000', ACWP:'80000',
    PCT_COMPLETE:'58', STATUS:'Active', NOTES:'',
    _badCells:{ OBS_CODE:6 } },

  // Row 16: T-1066 — NULL RESOURCE_NAME (Card 1)
  { TASK_ID:'T-1066', TASK_NAME:'Validate RF Link Budget Analysis',
    WBS_CODE:'1.3.1.2', OBS_CODE:'ENG-RF', RESOURCE_NAME:'',
    BASELINE_START:'2024-02-19', BASELINE_FINISH:'2024-03-15',
    ACTUAL_START:'2024-02-21', ACTUAL_FINISH:'2024-03-14',
    BCWS:'54000', BCWP:'54000', ACWP:'56000',
    PCT_COMPLETE:'100', STATUS:'Closed', NOTES:'',
    _badCells:{ RESOURCE_NAME:1 } },

  // Row 17: T-1044 — RESOURCE_NAME variant "john mitchell" (Card 10)
  { TASK_ID:'T-1044', TASK_NAME:'Configure Ground Support Equipment Interface',
    WBS_CODE:'1.5.1.1', OBS_CODE:'LOG-SUP', RESOURCE_NAME:'john mitchell',
    BASELINE_START:'2024-03-25', BASELINE_FINISH:'2024-05-10',
    ACTUAL_START:'2024-03-25', ACTUAL_FINISH:'',
    BCWS:'67000', BCWP:'45000', ACWP:'53000',
    PCT_COMPLETE:'48', STATUS:'Active', NOTES:'',
    _badCells:{ RESOURCE_NAME:10 } },

  // Row 18: T-1067 — STATUS CONFLICT: 100% but STATUS = Open (Card 3)
  { TASK_ID:'T-1067', TASK_NAME:'Review Subcontractor Deliverable D-0044',
    WBS_CODE:'1.1.3.2', OBS_CODE:'PM-CTRL', RESOURCE_NAME:'C.Barrios',
    BASELINE_START:'2024-01-15', BASELINE_FINISH:'2024-02-02',
    ACTUAL_START:'2024-01-15', ACTUAL_FINISH:'2024-02-02',
    BCWS:'12500', BCWP:'12500', ACWP:'12500',
    PCT_COMPLETE:'100', STATUS:'Open', NOTES:'',
    _badCells:{ STATUS:3 } },

  // Row 19: T-1033 — DUPLICATE TASK_ID (Card 4), resource variant (Card 10)
  { TASK_ID:'T-1033', TASK_NAME:'Install RF Payload Assembly — Rev B',
    WBS_CODE:'1.3.2.1', OBS_CODE:'ENG-RF', RESOURCE_NAME:'john mitchell',
    BASELINE_START:'2024-02-05', BASELINE_FINISH:'2024-04-15',
    ACTUAL_START:'2024-02-10', ACTUAL_FINISH:'',
    BCWS:'103000', BCWP:'86000', ACWP:'98000',
    PCT_COMPLETE:'71', STATUS:'Active', NOTES:'',
    _badCells:{ TASK_ID:4, RESOURCE_NAME:10 } },

  // Row 20: T-1102 — OBS_CODE typo "SYS-NTGR" (should be SYS-INTG) (Card 6)
  { TASK_ID:'T-1102', TASK_NAME:'Coordinate System-Level Integration Test',
    WBS_CODE:'1.2.1.1', OBS_CODE:'SYS-NTGR', RESOURCE_NAME:'F.Park',
    BASELINE_START:'2024-04-08', BASELINE_FINISH:'2024-06-14',
    ACTUAL_START:'2024-04-08', ACTUAL_FINISH:'',
    BCWS:'312000', BCWP:'198000', ACWP:'225000',
    PCT_COMPLETE:'45', STATUS:'Active', NOTES:'',
    _badCells:{ OBS_CODE:6 } },

  // Row 21: T-1077 — DATA IN PROSE: date in NOTES (Card 9)
  { TASK_ID:'T-1077', TASK_NAME:'Close Out Environmental Testing Work Package',
    WBS_CODE:'1.2.5.3', OBS_CODE:'QA-TEST', RESOURCE_NAME:'H.Adeyemi',
    BASELINE_START:'2024-02-26', BASELINE_FINISH:'2024-03-22',
    ACTUAL_START:'2024-02-26', ACTUAL_FINISH:'2024-03-15',
    BCWS:'18500', BCWP:'18500', ACWP:'19000',
    PCT_COMPLETE:'100', STATUS:'Closed',
    NOTES:'Task completed on 3/15/2024, awaiting final closeout docs',
    _badCells:{ NOTES:9 } },

  // Row 22: T-1084 — DATA IN PROSE: dollar amount in NOTES (Card 9)
  { TASK_ID:'T-1084', TASK_NAME:'Update Cost Performance Baseline — Post-CR-119',
    WBS_CODE:'1.1.1.3', OBS_CODE:'PM-CTRL', RESOURCE_NAME:'G.Walsh',
    BASELINE_START:'2024-03-11', BASELINE_FINISH:'2024-04-05',
    ACTUAL_START:'2024-03-11', ACTUAL_FINISH:'',
    BCWS:'8500', BCWP:'4250', ACWP:'5100',
    PCT_COMPLETE:'40', STATUS:'Active',
    NOTES:'Budget revised to $245,000 in March \u2014 see CR-119',
    _badCells:{ NOTES:9 } }
];

// ============================================================
// QUERY RESULTS DATA — 10 simulated rows from the SQL query
// Includes anomalous results and a ghost row
// ============================================================
SS.queryResultsData = [
  { TASK_ID:'T-1033', TASK_NAME:'Install RF Payload Assembly',
    WBS_CODE:'1.3.2.1', OBS_CODE:'ENG-RF', RESOURCE_NAME:'J.Mitchell',
    SPI:'0.84', CPI:'0.86', RISK_FLAG:'HIGH RISK',
    PCT_COMPLETE:'68', STATUS:'Active',
    BASELINE_FINISH:'2024-04-15', ACTUAL_FINISH:'',
    _type:'duplicate', _tooltip:'\u26a0 DUPLICATE KEY \u2014 Which record is authoritative? AI cannot determine this.' },

  { TASK_ID:'T-1033', TASK_NAME:'Install RF Payload Assembly \u2014 Rev B',
    WBS_CODE:'1.3.2.1', OBS_CODE:'ENG-RF', RESOURCE_NAME:'john mitchell',
    SPI:'0.87', CPI:'1.03', RISK_FLAG:'MONITOR',
    PCT_COMPLETE:'71', STATUS:'Active',
    BASELINE_FINISH:'2024-04-15', ACTUAL_FINISH:'',
    _type:'duplicate', _tooltip:'\u26a0 DUPLICATE KEY \u2014 Which record is authoritative? AI cannot determine this.' },

  { TASK_ID:'T-1093', TASK_NAME:'Conduct Structural Analysis \u2014 Bus Frame',
    WBS_CODE:'TBD', OBS_CODE:'ENG-SE', RESOURCE_NAME:'A.Williams',
    SPI:'\u2014', CPI:'\u2014', RISK_FLAG:'MONITOR',
    PCT_COMPLETE:'0', STATUS:'Active',
    BASELINE_FINISH:'2024-05-15', ACTUAL_FINISH:'',
    _type:'null-spi', _tooltip:'\u26a0 DIVISION BY ZERO \u2014 BCWS was 0. NULLIF prevented a crash, but this task is now invisible to AI analysis.' },

  { TASK_ID:'T-1051', TASK_NAME:'Process Flight Software Acceptance Testing',
    WBS_CODE:'1.4.1.4', OBS_CODE:'ENG-SW', RESOURCE_NAME:'L.Bergman',
    SPI:'0.82', CPI:'0.00', RISK_FLAG:'HIGH RISK',
    PCT_COMPLETE:'82', STATUS:'Active',
    BASELINE_FINISH:'2024-04-12', ACTUAL_FINISH:'',
    _type:'zero-cost', _tooltip:'\u26a0 ZERO COST ANOMALY \u2014 This task appears to have cost nothing despite being 82% complete. An AI model would interpret this as near-infinite cost efficiency. This is wrong.' },

  { TASK_ID:'T-1028', TASK_NAME:'Load Flight Software Build 4.2',
    WBS_CODE:'1.4.1.3', OBS_CODE:'ENG-SW', RESOURCE_NAME:'',
    SPI:'0.70', CPI:'0.89', RISK_FLAG:'HIGH RISK',
    PCT_COMPLETE:'55', STATUS:'Active',
    BASELINE_FINISH:'2024-04-30', ACTUAL_FINISH:'',
    _type:'blank-resource', _tooltip:'\u26a0 BLANK RESOURCE \u2014 No resource assigned. This task is unaccountable in any workforce or loading analysis.' },

  { TASK_ID:'T-1088', TASK_NAME:'Assemble Propulsion Module',
    WBS_CODE:'1-2-4-1', OBS_CODE:'MFG-ASSY', RESOURCE_NAME:'R.Torres',
    SPI:'0.87', CPI:'0.93', RISK_FLAG:'MONITOR',
    PCT_COMPLETE:'72', STATUS:'Active',
    BASELINE_FINISH:'2024-05-17', ACTUAL_FINISH:'',
    _type:'normal', _tooltip:null },

  { TASK_ID:'T-1035', TASK_NAME:'Perform Power Subsystem Integration',
    WBS_CODE:'1.2.2.3', OBS_CODE:'ENG-SE', RESOURCE_NAME:'Mitchell, J',
    SPI:'0.91', CPI:'1.02', RISK_FLAG:'MONITOR',
    PCT_COMPLETE:'52', STATUS:'Active',
    BASELINE_FINISH:'2024-05-03', ACTUAL_FINISH:'',
    _type:'normal', _tooltip:null },

  { TASK_ID:'T-1095', TASK_NAME:'Calibrate IMU and Star Tracker Assembly',
    WBS_CODE:'1.2.3.3', OBS_CODE:'ENG-GCN', RESOURCE_NAME:'B.Osei',
    SPI:'0.78', CPI:'0.85', RISK_FLAG:'HIGH RISK',
    PCT_COMPLETE:'58', STATUS:'Active',
    BASELINE_FINISH:'2024-04-08', ACTUAL_FINISH:'',
    _type:'normal', _tooltip:null },

  { TASK_ID:'T-1102', TASK_NAME:'Coordinate System-Level Integration Test',
    WBS_CODE:'1.2.1.1', OBS_CODE:'SYS-NTGR', RESOURCE_NAME:'F.Park',
    SPI:'1.02', CPI:'0.88', RISK_FLAG:'MONITOR',
    PCT_COMPLETE:'45', STATUS:'Active',
    BASELINE_FINISH:'2024-06-14', ACTUAL_FINISH:'',
    _type:'normal', _tooltip:null },

  { TASK_ID:'T-1044', TASK_NAME:'Configure Ground Support Equipment Interface',
    WBS_CODE:'1.5.1.1', OBS_CODE:'LOG-SUP', RESOURCE_NAME:'john mitchell',
    SPI:'0.95', CPI:'0.91', RISK_FLAG:'MONITOR',
    PCT_COMPLETE:'48', STATUS:'Active',
    BASELINE_FINISH:'2024-05-10', ACTUAL_FINISH:'',
    _type:'normal', _tooltip:null }
];

// Ghost row — filtered out of results but shown as excluded
SS.queryGhostRow = {
  TASK_ID:'T-1041', TASK_NAME:'Complete PDR Action Items',
  WBS_CODE:'1.1.4.2', SPI:'N/A', CPI:'N/A',
  RISK_FLAG:'N/A', PCT_COMPLETE:'100', STATUS:'Open'
};

// ============================================================
// AUDIT CARDS — 10 issue categories
// ============================================================
SS.auditCards = [
  {
    num:1, severity:'HIGH', issueType:'NULL CRITICAL FIELDS',
    what:'Required fields WBS_CODE and RESOURCE_NAME are blank on 5 rows.',
    affectedRows:['T-1059 (WBS)', 'T-1072 (WBS)', 'T-1028 (Resource)', 'T-1046 (Resource)', 'T-1066 (Resource)'],
    sqlImpact:'Returns NULL, silently omits these rows from any WBS-filtered query, or groups them incorrectly under a null WBS bucket.',
    aiImpact:'A cost forecasting model that groups tasks by WBS will simply lose these tasks — they won\'t be predicted, they won\'t be monitored, and their cost and schedule impact will never surface in AI outputs. In a large program, this could hide millions of dollars of untracked effort. An anomaly detection model will never flag them because it can\'t find them. They are, effectively, invisible.',
    fix:'WBS_CODE and RESOURCE_NAME must be mandatory fields with validation enforced at data entry in Open Plan.',
    highlightColor:'red'
  },
  {
    num:2, severity:'HIGH', issueType:'DATE LOGIC VIOLATION',
    what:'One task has ACTUAL_FINISH recorded before ACTUAL_START. One task is 100% complete with no finish date.',
    affectedRows:['T-1048 (finish before start)', 'T-1063 (100% complete, no finish date)'],
    sqlImpact:'Query runs without error — SQL doesn\'t know dates have to make chronological sense. Duration calculations return a negative number.',
    aiImpact:'A schedule prediction model trained on this data will learn that negative task durations are possible. When it encounters similar patterns in future data, it may predict impossibly short or negative durations. For a model forecasting program completion dates, this type of corruption can shift predicted delivery dates by weeks. It also corrupts any velocity or throughput calculations the model uses.',
    fix:'Enforce a database constraint: ACTUAL_FINISH must be >= ACTUAL_START, or flag the record for human review.',
    highlightColor:'red'
  },
  {
    num:3, severity:'MEDIUM', issueType:'STATUS / COMPLETION CONFLICT',
    what:'Two tasks show PCT_COMPLETE = 100 but STATUS = \'Open\'.',
    affectedRows:['T-1041', 'T-1067'],
    sqlImpact:'These tasks were excluded from the performance query by the WHERE clause (PCT_COMPLETE < 100), so they silently disappear from the analysis.',
    aiImpact:'A completion classification model would see these tasks as open active work and potentially add them to its remaining-to-complete calculations, inflating the predicted time and cost to finish the program. Worse, any AI trained to identify "stale open tasks" could flag these as anomalies and trigger false alerts to program leadership.',
    fix:'When PCT_COMPLETE reaches 100, STATUS must automatically update to \'Closed\'. This business rule must be enforced in the system, not left to manual input.',
    highlightColor:'amber'
  },
  {
    num:4, severity:'HIGH', issueType:'DUPLICATE PRIMARY KEY',
    what:'TASK_ID T-1033 appears on two rows with slightly different data — a common artifact of merging schedule files from different contractors.',
    affectedRows:['T-1033 (Row 2)', 'T-1033 (Row 19)'],
    sqlImpact:'Any aggregate query (SUM of BCWP, for example) will double-count this task. A JOIN to another table using TASK_ID will return two rows where one is expected, corrupting any downstream calculation.',
    aiImpact:'The AI has no way to determine which T-1033 is the authoritative record. If it uses both, every metric associated with this task is doubled. If it uses one arbitrarily, it may use the wrong one. For a model predicting resource loading, this could appear as a single resource being double-allocated, triggering false overload alerts.',
    fix:'TASK_ID must be a unique key enforced at the database level. Merge procedures must include a deduplication step.',
    highlightColor:'red'
  },
  {
    num:5, severity:'MEDIUM', issueType:'FORMAT INCONSISTENCY',
    what:'WBS_CODE uses three different formats: "1.2.3.4" (dot notation), "1-2-4-1" (dash notation), and "TBD".',
    affectedRows:['T-1088 (dash format)', 'T-1093 (TBD)', 'T-1059 / T-1072 (null)'],
    sqlImpact:'A query filtering WHERE WBS_CODE LIKE \'1.2.%\' will miss all dash-formatted and TBD rows, even though they may belong to the same WBS element.',
    aiImpact:'WBS codes are how the AI groups tasks into meaningful program structures. If the same WBS element appears in three different formats, the AI treats them as three different elements. Cost roll-ups are fragmented. Resource planning by WBS is inaccurate. Any model that predicts performance by program area will produce unreliable results because it can\'t correctly identify which tasks belong to which area.',
    fix:'Enforce a single WBS_CODE format pattern (dot notation) through a field validation rule in Open Plan. "TBD" must not be a valid WBS entry.',
    highlightColor:'amber'
  },
  {
    num:6, severity:'MEDIUM', issueType:'ORPHANED OBS REFERENCE',
    what:'Two OBS_CODE values (ENG-GCN, SYS-NTGR) don\'t match any valid organizational code in the master reference list.',
    affectedRows:['T-1095 (ENG-GCN \u2192 should be ENG-GNC)', 'T-1102 (SYS-NTGR \u2192 should be SYS-INTG)'],
    sqlImpact:'A JOIN between ims_tasks and the org_codes reference table will return NULL for these rows, dropping them from any organization-filtered report.',
    aiImpact:'A resource optimization model that assigns work to org units by OBS code will silently exclude these tasks. An AI assistant asked "show me all Engineering tasks" will miss every task with a misspelled OBS. Over a large schedule, typos in OBS codes can cause entire work packages to go unmonitored.',
    fix:'OBS_CODE must be validated against the master organization breakdown structure list on entry. Invalid codes must be rejected or flagged immediately.',
    highlightColor:'amber'
  },
  {
    num:7, severity:'HIGH', issueType:'ZERO-COST ANOMALY',
    what:'Task T-1051 is 82% complete with an ACTUAL_START recorded, but ACWP = 0. Cost data was never loaded from the accounting system.',
    affectedRows:['T-1051'],
    sqlImpact:'CPI = BCWP / NULLIF(ACWP, 0) returns NULL. This task appears to have performed perfectly at zero cost.',
    aiImpact:'A cost performance model will see this task as extraordinarily efficient. If it\'s included in training data, the model learns that tasks can reach 82% completion with zero expenditure — a pattern that doesn\'t exist in reality. In production, the model may then fail to flag real cost anomalies because it has calibrated its sense of "normal" against this corrupted baseline.',
    fix:'ACWP must be loaded from the financial system on the same schedule as physical progress updates. An ACWP = 0 with PCT_COMPLETE > 20% must trigger an automatic alert.',
    highlightColor:'red'
  },
  {
    num:8, severity:'HIGH', issueType:'IMPLAUSIBLE EVM VALUE',
    what:'Task T-1079 shows BCWP = $485,000 against BCWS = $120,000 — an SPI of 4.04.',
    affectedRows:['T-1079'],
    sqlImpact:'This row appears at the bottom of an ORDER BY SPI ASC sort — it looks like the best-performing task. It is likely a data entry error where BCWP and BCWS were transposed.',
    aiImpact:'Outlier values like this teach AI models that extreme performance is possible and within the range of normal variation. Anomaly detection models may raise their threshold for what counts as suspicious, causing them to miss real problems. Forecasting models that use this task in training will produce optimistic predictions that overestimate program performance.',
    fix:'Implement a business rule: BCWP / BCWS ratio must fall within a defined acceptable range (e.g., 0.1 to 1.5). Values outside this range must be flagged for review before the record is saved.',
    highlightColor:'red'
  },
  {
    num:9, severity:'MEDIUM', issueType:'DATA TRAPPED IN PROSE',
    what:'Two rows contain important information — a completion date and a budget revision — written as sentences in the NOTES field rather than in structured columns.',
    affectedRows:['T-1077 (date in NOTES)', 'T-1084 (dollar amount in NOTES)'],
    sqlImpact:'SQL cannot read a date written inside a sentence. This data is completely invisible to any query, join, or calculation. It exists only as unstructured text.',
    aiImpact:'Natural Language Processing models could theoretically extract this information, but only imperfectly and unreliably. For structured data needs — connecting a completion date to a task record, or linking a budget revision to a cost baseline — the data might as well not exist. Any AI model that should have used "completed 3/15/2024" as a training signal never sees it.',
    fix:'The NOTES field must be supplementary only. Dates must go in date columns. Budget changes must go in revision tracking columns. A data governance policy must explicitly prohibit using NOTES as a substitute for structured fields.',
    highlightColor:'amber'
  },
  {
    num:10, severity:'MEDIUM', issueType:'RESOURCE NAME VARIANTS',
    what:'The same person ("J. Mitchell") appears in three different formats across three rows: "J.Mitchell", "Mitchell, J", "john mitchell".',
    affectedRows:['T-1021 (J.Mitchell)', 'T-1035 (Mitchell, J)', 'T-1044 (john mitchell)', 'T-1033 (J.Mitchell)', 'T-1033-B (john mitchell)'],
    sqlImpact:'A GROUP BY RESOURCE_NAME or a filter WHERE RESOURCE_NAME = \'Mitchell, J\' will treat these as three different people. Resource loading reports will show three separate entries for one person\'s work.',
    aiImpact:'A resource forecasting model will see three different resources where there is one. It may predict that "J.Mitchell" is fully available for new work while simultaneously predicting that "Mitchell, J" is overloaded — because it doesn\'t know they are the same person. Workforce planning outputs built on this data will be structurally incorrect.',
    fix:'Implement a controlled vocabulary for RESOURCE_NAME, ideally linked to an HR or personnel reference table. Name entry must use a lookup/select field, not free text.',
    highlightColor:'amber'
  }
];

// ============================================================
// SUMMARY SCORECARD
// ============================================================
SS.summaryScorecard = [
  { num:1, type:'Null Critical Fields',   count:5, severity:'HIGH',   aiRisk:'Data Loss' },
  { num:2, type:'Date Logic Violation',   count:2, severity:'HIGH',   aiRisk:'Model Corruption' },
  { num:3, type:'Status Conflict',        count:2, severity:'MEDIUM', aiRisk:'False Exclusion' },
  { num:4, type:'Duplicate Primary Key',  count:1, severity:'HIGH',   aiRisk:'Double-Counting' },
  { num:5, type:'Format Inconsistency',   count:3, severity:'MEDIUM', aiRisk:'Fragmentation' },
  { num:6, type:'Orphaned OBS Reference', count:2, severity:'MEDIUM', aiRisk:'Invisible Data' },
  { num:7, type:'Zero-Cost Anomaly',      count:1, severity:'HIGH',   aiRisk:'Calibration Error' },
  { num:8, type:'Implausible EVM Value',  count:1, severity:'HIGH',   aiRisk:'Threshold Skew' },
  { num:9, type:'Data in Prose',          count:2, severity:'MEDIUM', aiRisk:'Unstructured Loss' },
  { num:10,type:'Resource Name Variants', count:3, severity:'MEDIUM', aiRisk:'Wrong Entity' }
];

// ============================================================
// TERMINAL OUTPUT — Step 4 Auditor Run
// ============================================================
SS.auditorTerminalLines = [
  { text:'[AI READINESS AUDITOR v1.0]', delay:0 },
  { text:'[Source: IMS_EXPORT_SENTINEL7.csv]', delay:120 },
  { text:'Loading data... 22 rows, 15 columns.  \u2713', delay:280, class:'term-ok' },
  { text:'\u2500'.repeat(49), delay:450, class:'term-div' },
  { text:'CHECK 1  \u2502 Null Critical Fields       \u2502  5 issues  \u26a0 HIGH',   delay:620, class:'term-high' },
  { text:'CHECK 2  \u2502 Date Logic Violations      \u2502  2 issues  \u26a0 HIGH',   delay:820, class:'term-high' },
  { text:'CHECK 3  \u2502 Status Conflicts           \u2502  2 issues  \u26a0 MEDIUM', delay:980, class:'term-med' },
  { text:'CHECK 4  \u2502 Duplicate Task IDs         \u2502  1 issue   \u26a0 HIGH',   delay:1140, class:'term-high' },
  { text:'CHECK 5  \u2502 WBS Format Consistency     \u2502  3 issues  \u26a0 MEDIUM', delay:1300, class:'term-med' },
  { text:'CHECK 6  \u2502 OBS Code Validity          \u2502  2 issues  \u26a0 MEDIUM', delay:1450, class:'term-med' },
  { text:'CHECK 7  \u2502 Zero-Cost Anomaly          \u2502  1 issue   \u26a0 HIGH',   delay:1600, class:'term-high' },
  { text:'CHECK 8  \u2502 Implausible EVM Values     \u2502  1 issue   \u26a0 HIGH',   delay:1750, class:'term-high' },
  { text:'CHECK 9  \u2502 Data Trapped in Prose      \u2502  2 issues  \u26a0 MEDIUM', delay:1900, class:'term-med' },
  { text:'CHECK 10 \u2502 Resource Name Variants     \u2502  3 issues  \u26a0 MEDIUM', delay:2050, class:'term-med' },
  { text:'\u2500'.repeat(49), delay:2200, class:'term-div' },
  { text:'TOTAL ISSUES FOUND:    22', delay:2380 },
  { text:'HIGH SEVERITY:          8', delay:2480, class:'term-high' },
  { text:'MEDIUM SEVERITY:       14', delay:2560, class:'term-med' },
  { text:'DATA HEALTH SCORE:  42 / 100', delay:2680, class:'term-score' },
  { text:'AI READINESS:       CRITICAL \u2014 NOT AI READY', delay:2800, class:'term-critical' },
  { text:'\u2500'.repeat(49), delay:2960, class:'term-div' },
  { text:'Audit report saved to: audit_report_SENTINEL7.json', delay:3100, class:'term-ok' }
];

SS.auditJsonReport = {
  generated_at: '2024-12-09T14:23:17.441Z',
  total_rows: 22,
  total_issues: 22,
  high_severity: 8,
  medium_severity: 14,
  data_health_score: 42,
  ai_readiness: 'CRITICAL \u2014 NOT AI READY',
  issues: [
    { check:'NULL_CRITICAL_FIELD', severity:'HIGH', task_id:'T-1059', field:'WBS_CODE', message:"Required field 'WBS_CODE' is blank on this task." },
    { check:'NULL_CRITICAL_FIELD', severity:'HIGH', task_id:'T-1072', field:'WBS_CODE', message:"Required field 'WBS_CODE' is blank on this task." },
    { check:'NULL_CRITICAL_FIELD', severity:'HIGH', task_id:'T-1028', field:'RESOURCE_NAME', message:"Required field 'RESOURCE_NAME' is blank on this task." },
    { check:'NULL_CRITICAL_FIELD', severity:'HIGH', task_id:'T-1046', field:'RESOURCE_NAME', message:"Required field 'RESOURCE_NAME' is blank on this task." },
    { check:'NULL_CRITICAL_FIELD', severity:'HIGH', task_id:'T-1066', field:'RESOURCE_NAME', message:"Required field 'RESOURCE_NAME' is blank on this task." },
    { check:'DATE_LOGIC_VIOLATION', severity:'HIGH', task_id:'T-1048', field:'ACTUAL_FINISH', message:'ACTUAL_FINISH (2024-01-12) is before ACTUAL_START (2024-02-01).' },
    { check:'MISSING_FINISH_ON_COMPLETE', severity:'HIGH', task_id:'T-1063', field:'ACTUAL_FINISH', message:'Task is 100% complete but ACTUAL_FINISH is blank.' },
    { check:'STATUS_CONFLICT', severity:'MEDIUM', task_id:'T-1041', field:'STATUS', message:"PCT_COMPLETE is 100% but STATUS is still 'Open'." },
    { check:'STATUS_CONFLICT', severity:'MEDIUM', task_id:'T-1067', field:'STATUS', message:"PCT_COMPLETE is 100% but STATUS is still 'Open'." },
    { check:'DUPLICATE_TASK_ID', severity:'HIGH', task_id:'T-1033', field:'TASK_ID', message:"TASK_ID 'T-1033' appears more than once." },
    { check:'WBS_FORMAT_INVALID', severity:'MEDIUM', task_id:'T-1088', field:'WBS_CODE', message:"WBS_CODE '1-2-4-1' does not match required dot notation format." },
    { check:'WBS_FORMAT_INVALID', severity:'MEDIUM', task_id:'T-1093', field:'WBS_CODE', message:"WBS_CODE 'TBD' does not match required dot notation format." },
    { check:'INVALID_OBS_CODE', severity:'MEDIUM', task_id:'T-1095', field:'OBS_CODE', message:"OBS_CODE 'ENG-GCN' is not in the valid organization reference list." },
    { check:'INVALID_OBS_CODE', severity:'MEDIUM', task_id:'T-1102', field:'OBS_CODE', message:"OBS_CODE 'SYS-NTGR' is not in the valid organization reference list." },
    { check:'ZERO_COST_ANOMALY', severity:'HIGH', task_id:'T-1051', field:'ACWP', message:'ACWP = 0 but task is 82% complete with work started.' },
    { check:'IMPLAUSIBLE_SPI', severity:'HIGH', task_id:'T-1079', field:'BCWP', message:'SPI = 4.04 is outside the plausible range (0.0\u20132.0).' },
    { check:'DATA_IN_PROSE', severity:'MEDIUM', task_id:'T-1077', field:'NOTES', message:'Structured data (date or dollar amount) detected in free-text NOTES field.' },
    { check:'DATA_IN_PROSE', severity:'MEDIUM', task_id:'T-1084', field:'NOTES', message:'Structured data (date or dollar amount) detected in free-text NOTES field.' },
    { check:'RESOURCE_NAME_VARIANT', severity:'MEDIUM', task_id:'MULTIPLE', field:'RESOURCE_NAME', message:"Possible duplicate resources: 'J.Mitchell' and 'Mitchell, J' (similarity: 88%)" },
    { check:'RESOURCE_NAME_VARIANT', severity:'MEDIUM', task_id:'MULTIPLE', field:'RESOURCE_NAME', message:"Possible duplicate resources: 'J.Mitchell' and 'john mitchell' (similarity: 82%)" },
    { check:'RESOURCE_NAME_VARIANT', severity:'MEDIUM', task_id:'MULTIPLE', field:'RESOURCE_NAME', message:"Possible duplicate resources: 'Mitchell, J' and 'john mitchell' (similarity: 74%)" }
  ]
};

// ============================================================
// STEP 5 — CORRECTION LOG & REVIEW QUEUE
// ============================================================
SS.correctionLogLines = [
  { text:'[WBS FORMAT]     T-1088  WBS_CODE: "1-2-4-1" \u2192 "1.2.4.1"', class:'log-wbs' },
  { text:'[OBS CODE]       T-1095  OBS_CODE: "ENG-GCN" \u2192 "ENG-GNC"  (96% match)', class:'log-obs' },
  { text:'[OBS CODE]       T-1102  OBS_CODE: "SYS-NTGR" \u2192 "SYS-INTG" (91% match)', class:'log-obs' },
  { text:'[RESOURCE NAME]  T-1033  RESOURCE_NAME: "J.Mitchell" \u2192 "Mitchell, J."', class:'log-res' },
  { text:'[RESOURCE NAME]  T-1033B RESOURCE_NAME: "john mitchell" \u2192 "Mitchell, J."', class:'log-res' },
  { text:'[RESOURCE NAME]  T-1021  RESOURCE_NAME: "J.Mitchell" \u2192 "Mitchell, J."', class:'log-res' },
  { text:'[STATUS CLOSE]   T-1041  STATUS: "Open" \u2192 "Closed"  (PCT_COMPLETE = 100)', class:'log-status' },
  { text:'[STATUS CLOSE]   T-1067  STATUS: "Open" \u2192 "Closed"  (PCT_COMPLETE = 100)', class:'log-status' },
  { text:'[WHITESPACE]     8 fields trimmed.', class:'log-ws' },
  { text:'\u2500'.repeat(45), class:'log-div' },
  { text:'AUTO-CORRECTIONS APPLIED: 11', class:'log-total' }
];

SS.reviewQueueItems = [
  { id:'HRQ-001', type:'NULL WBS_CODE',         tasks:'T-1059, T-1072',  assign:'Sched Lead' },
  { id:'HRQ-002', type:'DATE LOGIC VIOLATION',  tasks:'T-1048',          assign:'Sched Analyst' },
  { id:'HRQ-003', type:'MISSING FINISH DATE',   tasks:'T-1063',          assign:'Sched Analyst' },
  { id:'HRQ-004', type:'DUPLICATE TASK ID',     tasks:'T-1033 (x2)',     assign:'Sched Lead' },
  { id:'HRQ-005', type:'ZERO COST ANOMALY',     tasks:'T-1051',          assign:'Finance Lead' },
  { id:'HRQ-006', type:'IMPLAUSIBLE SPI (4.04)',tasks:'T-1079',          assign:'BCWS Auth' }
];

SS.postCorrectionLines = [
  { text:'POST-CORRECTION AUDIT \u2014 SENTINEL-7 IMS', class:'term-header' },
  { text:'\u2500'.repeat(49), class:'term-div' },
  { text:'AUTO-CORRECTIONS APPLIED:   11', class:'term-ok' },
  { text:'HUMAN REVIEW ITEMS QUEUED:   6', class:'term-med' },
  { text:'\u2500'.repeat(49), class:'term-div' },
  { text:'DATA HEALTH SCORE:   78 / 100', class:'term-score-good' },
  { text:'AI READINESS:        FAIR \u2014 HUMAN REVIEW REQUIRED', class:'term-med' }
];

// ============================================================
// STEP 6 — MONITOR TERMINAL LINES
// ============================================================
SS.monitorTerminalLines = [
  { text:'[AI READINESS MONITOR \u2014 ACTIVE]', delay:0, class:'term-header' },
  { text:'[Watching: /exports/opp/incoming/]', delay:100 },
  { text:'[Score threshold: 70/100]', delay:200 },
  { text:'\u2550'.repeat(45), delay:320, class:'term-div' },
  { text:'[06:00:01] SCHEDULED DAILY AUDIT \u2014 IMS_DEC08.csv', delay:480 },
  { text:'[06:00:02] Loading data... 22 rows, 15 columns. \u2713', delay:700, class:'term-ok' },
  { text:'[06:00:03] Audit complete. Score: 88/100 \u2014 4 issues found.', delay:960, class:'term-ok' },
  { text:'[06:00:03] Auto-correcting 3 issues...', delay:1150 },
  { text:'[06:00:03] Queuing 1 issue for human review.', delay:1320, class:'term-med' },
  { text:'[06:00:03] \u2713 Clean data forwarded to AI pipeline.', delay:1500, class:'term-ok' },
  { text:'[06:00:03] Audit history logged.', delay:1660 },
  { text:'[06:00:04] Resuming watch...', delay:1820 },
  { text:'', delay:1980 },
  { text:'[14:23:17] NEW FILE DETECTED: IMS_DEC09.csv', delay:2200, class:'term-detect' },
  { text:'[14:23:17] Starting AI Readiness Audit...', delay:2380 },
  { text:'[14:23:18] Audit complete. Score: 91/100 \u2014 3 issues found.', delay:2600, class:'term-ok' },
  { text:'[14:23:18] Auto-correcting 3 issues...', delay:2780 },
  { text:'[14:23:18] \u2713 Clean data forwarded to AI pipeline.', delay:2960, class:'term-ok' },
  { text:'[14:23:18] Audit history logged.', delay:3100 },
  { text:'[14:23:19] Resuming watch...', delay:3250 }
];

SS.badFileTerminalLines = [
  { text:'[16:47:03] NEW FILE DETECTED: IMS_EMERGENCY_REPLAN.csv', delay:0, class:'term-detect' },
  { text:'[16:47:03] Starting AI Readiness Audit...', delay:200 },
  { text:'[16:47:05] Audit complete. Score: 55/100 \u2014 14 issues found.', delay:500, class:'term-warn' },
  { text:'HIGH severity: 8  |  MEDIUM severity: 6', delay:680, class:'term-high' },
  { text:'[16:47:05] \u26a0 Score below threshold (55 < 70).', delay:880, class:'term-warn' },
  { text:'[16:47:05] Routing to human review queue...', delay:1060, class:'term-med' },
  { text:'[16:47:05] \u26a0 ALERT SENT \u2192 Program Controls Team', delay:1260, class:'term-alert' },
  { text:'Subject: \u26a0 AI READINESS ALERT \u2014 Data Health Score: 55/100', delay:1400, class:'term-alert' },
  { text:'Recipients: program.controls@sentinel7.gov', delay:1540 },
  { text:'[16:47:05] \u2717 File NOT forwarded to AI pipeline.', delay:1720, class:'term-fail' },
  { text:'[16:47:05] Audit history logged. Quality event recorded.', delay:1900 },
  { text:'[16:47:06] Resuming watch...', delay:2060 }
];

// ============================================================
// AUDIT TREND CHART DATA — 12 weeks
// ============================================================
SS.auditChartData = {
  labels: ['Wk 1','Wk 2','Wk 3','Wk 4','Wk 5','Wk 6','Wk 7','Wk 8','Wk 9','Wk 10','Wk 11','Wk 12'],
  scores: [62, 68, 71, 74, 65, 72, 78, 82, 55, 76, 88, 91],
  annotations: [
    { week:5,  label:'Sub-K data feed added' },
    { week:9,  label:'Emergency replan event' },
    { week:11, label:'Auto-corrections applied' }
  ]
};

// ============================================================
// SQL CODE — displayed in Step 2
// ============================================================
SS.sqlCode =
`-- ============================================================
-- AI READINESS DEMO: Program Health Query
-- Source: Deltek Open Plan IMS Export \u2014 SENTINEL-7
-- Purpose: Identify tasks with degraded SPI and/or CPI
-- ============================================================

-- SELECT tells the database: return exactly these columns.
SELECT
    TASK_ID,
    TASK_NAME,
    WBS_CODE,
    OBS_CODE,
    RESOURCE_NAME,

    -- SPI = Schedule Performance Index
    -- Formula: Earned Value \u00f7 Planned Value
    -- Below 1.0 = behind schedule. Above 1.0 = ahead.
    -- NULLIF prevents a divide-by-zero crash if BCWS is 0.
    ROUND(BCWP / NULLIF(BCWS, 0), 2)   AS SPI,

    -- CPI = Cost Performance Index
    -- Formula: Earned Value \u00f7 Actual Cost
    -- Below 1.0 = over budget. Above 1.0 = under budget.
    ROUND(BCWP / NULLIF(ACWP, 0), 2)   AS CPI,

    -- This CASE block assigns a risk label based on SPI and CPI together.
    -- Think of it as an IF/THEN/ELSE statement.
    CASE
        WHEN (BCWP / NULLIF(BCWS, 0)) < 1.0
         AND (BCWP / NULLIF(ACWP, 0)) < 1.0
        THEN 'HIGH RISK'

        WHEN (BCWP / NULLIF(BCWS, 0)) < 1.0
          OR (BCWP / NULLIF(ACWP, 0)) < 1.0
        THEN 'MONITOR'

        ELSE 'ON TRACK'
    END                                 AS RISK_FLAG,

    PCT_COMPLETE,
    STATUS,
    BASELINE_FINISH,
    ACTUAL_FINISH

-- FROM tells the database which table to look in.
FROM ims_tasks

-- WHERE filters the results \u2014 only return rows matching ALL of these conditions.
WHERE STATUS != 'Closed'           -- Skip tasks already officially closed
  AND PCT_COMPLETE < 100           -- Skip tasks marked fully complete
  AND BCWS  IS NOT NULL            -- Only include tasks with budget data loaded
  AND BCWP  IS NOT NULL
  AND ACWP  IS NOT NULL

-- Sort results so the most critical tasks appear at the top.
ORDER BY SPI ASC, CPI ASC;`;

// ============================================================
// PYTHON AUDITOR CODE — Step 4
// ============================================================
SS.pythonAuditorCode =
`# ============================================================
# AI READINESS AUDITOR \u2014 v1.0
# Purpose: Validate Deltek Open Plan IMS exports before
#          allowing data to enter AI model pipelines.
# Author:  Rob Hale \u2014 Program Finance Systems Analyst
# ============================================================

import pandas as pd          # The main library for working with tables of data
import re                    # For detecting patterns in text (like dates in sentences)
import json                  # For saving the audit report as a structured file
from datetime import datetime
from difflib import SequenceMatcher  # For fuzzy-matching similar text strings


# ------------------------------------------------------------
# STEP 1: Load the data
# ------------------------------------------------------------
def load_data(filepath):
    """
    Reads the Open Plan export file from disk.
    Returns a DataFrame \u2014 think of it as a Python version of a spreadsheet.
    """
    df = pd.read_csv(filepath, dtype=str)  # Load everything as text first
    print(f"Loaded {len(df)} rows and {len(df.columns)} columns.")
    return df


# ------------------------------------------------------------
# STEP 2: Check for missing values in required fields
# ------------------------------------------------------------
def check_null_critical_fields(df):
    """
    Checks the columns that are absolutely required for AI analysis.
    Returns a list of issues found.
    """
    required_columns = ['TASK_ID', 'WBS_CODE', 'OBS_CODE', 'RESOURCE_NAME',
                        'BCWS', 'BCWP', 'ACWP', 'STATUS']
    issues = []

    for col in required_columns:
        # Find every row where this column is blank or missing
        null_rows = df[df[col].isna() | (df[col].str.strip() == '')]
        for _, row in null_rows.iterrows():
            issues.append({
                'check': 'NULL_CRITICAL_FIELD',
                'severity': 'HIGH',
                'task_id': row.get('TASK_ID', 'UNKNOWN'),
                'field': col,
                'message': f"Required field '{col}' is blank on this task."
            })

    return issues


# ------------------------------------------------------------
# STEP 3: Validate date logic
# ------------------------------------------------------------
def check_date_logic(df):
    """
    Checks that dates make chronological sense.
    A task cannot finish before it starts.
    A 100% complete task must have a recorded finish date.
    """
    issues = []

    for _, row in df.iterrows():
        start  = row.get('ACTUAL_START', '')
        finish = row.get('ACTUAL_FINISH', '')
        pct    = row.get('PCT_COMPLETE', '0')

        # Check: finish before start
        if start and finish:
            try:
                if pd.to_datetime(finish) < pd.to_datetime(start):
                    issues.append({
                        'check': 'DATE_LOGIC_VIOLATION',
                        'severity': 'HIGH',
                        'task_id': row.get('TASK_ID'),
                        'field': 'ACTUAL_FINISH',
                        'message': f"ACTUAL_FINISH ({finish}) is before ACTUAL_START ({start})."
                    })
            except Exception:
                pass

        # Check: 100% complete but no finish date
        try:
            if float(pct) >= 100 and not finish:
                issues.append({
                    'check': 'MISSING_FINISH_ON_COMPLETE',
                    'severity': 'HIGH',
                    'task_id': row.get('TASK_ID'),
                    'field': 'ACTUAL_FINISH',
                    'message': "Task is 100% complete but ACTUAL_FINISH is blank."
                })
        except ValueError:
            pass

    return issues


# ------------------------------------------------------------
# STEP 4: Check for status conflicts
# ------------------------------------------------------------
def check_status_conflict(df):
    """
    Finds tasks where the completion percentage and the status
    field contradict each other.
    """
    issues = []

    for _, row in df.iterrows():
        try:
            pct    = float(row.get('PCT_COMPLETE', 0))
            status = str(row.get('STATUS', '')).strip()

            if pct >= 100 and status == 'Open':
                issues.append({
                    'check': 'STATUS_CONFLICT',
                    'severity': 'MEDIUM',
                    'task_id': row.get('TASK_ID'),
                    'field': 'STATUS',
                    'message': f"PCT_COMPLETE is {pct}% but STATUS is still 'Open'."
                })
        except ValueError:
            pass

    return issues


# ------------------------------------------------------------
# STEP 5: Detect duplicate Task IDs
# ------------------------------------------------------------
def check_duplicate_task_ids(df):
    """
    Looks for Task IDs that appear more than once in the dataset.
    Duplicates are a critical data integrity failure.
    """
    issues = []
    duplicates = df[df.duplicated(subset=['TASK_ID'], keep=False)]

    for _, row in duplicates.iterrows():
        issues.append({
            'check': 'DUPLICATE_TASK_ID',
            'severity': 'HIGH',
            'task_id': row.get('TASK_ID'),
            'field': 'TASK_ID',
            'message': f"TASK_ID '{row.get('TASK_ID')}' appears more than once."
        })

    return issues


# ------------------------------------------------------------
# STEP 6: Check WBS code format consistency
# ------------------------------------------------------------
def check_wbs_format_consistency(df):
    """
    Validates that all WBS_CODE values follow dot notation (e.g., 1.2.3.4).
    Mixed formats fragment the program structure and break AI grouping.
    """
    issues  = []
    pattern = re.compile(r'^\d+(\.\d+)+$')  # Valid: 1.2.3 or 1.2.3.4

    for _, row in df.iterrows():
        wbs = str(row.get('WBS_CODE', '')).strip()
        if wbs and not pattern.match(wbs):
            issues.append({
                'check': 'WBS_FORMAT_INVALID',
                'severity': 'MEDIUM',
                'task_id': row.get('TASK_ID'),
                'field': 'WBS_CODE',
                'message': f"WBS_CODE '{wbs}' does not match required dot notation format."
            })

    return issues


# ------------------------------------------------------------
# STEP 7: Validate OBS codes against the master reference list
# ------------------------------------------------------------
def check_obs_code_validity(df, valid_obs_list):
    """
    Checks every OBS_CODE value against a provided list of valid codes.
    Typos in OBS codes cause tasks to become invisible to
    organization-filtered reports and AI models.
    """
    issues = []

    for _, row in df.iterrows():
        obs = str(row.get('OBS_CODE', '')).strip()
        if obs and obs not in valid_obs_list:
            issues.append({
                'check': 'INVALID_OBS_CODE',
                'severity': 'MEDIUM',
                'task_id': row.get('TASK_ID'),
                'field': 'OBS_CODE',
                'message': f"OBS_CODE '{obs}' is not in the valid organization reference list."
            })

    return issues


# ------------------------------------------------------------
# STEP 8: Detect zero-cost anomalies
# ------------------------------------------------------------
def check_zero_cost_anomaly(df):
    """
    Identifies tasks that show physical progress but have zero
    actual cost recorded. AI will misread this as extraordinary efficiency.
    """
    issues = []

    for _, row in df.iterrows():
        try:
            acwp         = float(row.get('ACWP', 0) or 0)
            pct          = float(row.get('PCT_COMPLETE', 0) or 0)
            actual_start = row.get('ACTUAL_START', '')

            if acwp == 0 and pct > 20 and actual_start:
                issues.append({
                    'check': 'ZERO_COST_ANOMALY',
                    'severity': 'HIGH',
                    'task_id': row.get('TASK_ID'),
                    'field': 'ACWP',
                    'message': f"ACWP = 0 but task is {pct}% complete with work started."
                })
        except ValueError:
            pass

    return issues


# ------------------------------------------------------------
# STEP 9: Flag implausible EVM values
# ------------------------------------------------------------
def check_implausible_evm_values(df):
    """
    Calculates SPI and CPI for each task and flags values outside
    a plausible real-world range. Extreme outliers corrupt the
    statistical baseline that AI models use to define 'normal'.
    """
    issues = []

    for _, row in df.iterrows():
        try:
            bcws = float(row.get('BCWS', 0) or 0)
            bcwp = float(row.get('BCWP', 0) or 0)
            acwp = float(row.get('ACWP', 0) or 0)

            if bcws > 0:
                spi = bcwp / bcws
                if spi > 2.0 or spi < 0:
                    issues.append({
                        'check': 'IMPLAUSIBLE_SPI',
                        'severity': 'HIGH',
                        'task_id': row.get('TASK_ID'),
                        'field': 'BCWP',
                        'message': f"SPI = {round(spi, 2)} is outside the plausible range (0.0\u20132.0)."
                    })

            if acwp > 0:
                cpi = bcwp / acwp
                if cpi > 3.0 or cpi < 0:
                    issues.append({
                        'check': 'IMPLAUSIBLE_CPI',
                        'severity': 'HIGH',
                        'task_id': row.get('TASK_ID'),
                        'field': 'BCWP',
                        'message': f"CPI = {round(cpi, 2)} is outside the plausible range."
                    })
        except (ValueError, ZeroDivisionError):
            pass

    return issues


# ------------------------------------------------------------
# STEP 10: Detect dates or numbers trapped in prose
# ------------------------------------------------------------
def check_data_in_prose(df):
    """
    Scans the NOTES column for patterns that look like dates or dollar amounts.
    These are signals that structured data was entered in the wrong place.
    """
    issues        = []
    date_pattern  = re.compile(r'\b\d{1,2}/\d{1,2}/\d{4}\b')
    dollar_pattern= re.compile(r'\$[\d,]+')

    for _, row in df.iterrows():
        notes = str(row.get('NOTES', '') or '')
        if date_pattern.search(notes) or dollar_pattern.search(notes):
            issues.append({
                'check': 'DATA_IN_PROSE',
                'severity': 'MEDIUM',
                'task_id': row.get('TASK_ID'),
                'field': 'NOTES',
                'message': "Structured data (date or dollar amount) detected in free-text NOTES field."
            })

    return issues


# ------------------------------------------------------------
# STEP 11: Detect resource name variants via fuzzy matching
# ------------------------------------------------------------
def check_resource_name_variants(df):
    """
    Compares all unique resource names using fuzzy string matching.
    Catches 'J.Mitchell' vs 'Mitchell, J' vs 'john mitchell'.
    """
    issues       = []
    names        = df['RESOURCE_NAME'].dropna().str.strip().unique().tolist()
    flagged_pairs= []

    for i in range(len(names)):
        for j in range(i + 1, len(names)):
            similarity = SequenceMatcher(None,
                                         names[i].lower(),
                                         names[j].lower()).ratio()
            if 0.70 < similarity < 1.0:
                pair = tuple(sorted([names[i], names[j]]))
                if pair not in flagged_pairs:
                    flagged_pairs.append(pair)
                    issues.append({
                        'check': 'RESOURCE_NAME_VARIANT',
                        'severity': 'MEDIUM',
                        'task_id': 'MULTIPLE',
                        'field': 'RESOURCE_NAME',
                        'message': (f"Possible duplicate resources: '{names[i]}' and '{names[j]}' "
                                    f"(similarity: {round(similarity * 100)}%)")
                    })

    return issues


# ------------------------------------------------------------
# FINAL: Compile the full audit report
# ------------------------------------------------------------
def generate_audit_report(all_issues, total_rows):
    """
    Aggregates all findings into a structured report with a
    Data Health Score. A score below 70 means the data is
    NOT ready for AI model training or inference.
    """
    high_count   = sum(1 for i in all_issues if i['severity'] == 'HIGH')
    medium_count = sum(1 for i in all_issues if i['severity'] == 'MEDIUM')

    # Score penalty: HIGH issues cost 5 points each, MEDIUM cost 2 points
    score = max(0, 100 - (high_count * 5) - (medium_count * 2))

    if   score >= 90: readiness = "STRONG \u2014 AI READY"
    elif score >= 75: readiness = "GOOD \u2014 MINOR CLEANUP RECOMMENDED"
    elif score >= 60: readiness = "FAIR \u2014 REVIEW REQUIRED BEFORE AI USE"
    elif score >= 40: readiness = "POOR \u2014 SIGNIFICANT REMEDIATION NEEDED"
    else:             readiness = "CRITICAL \u2014 NOT AI READY"

    return {
        'generated_at':      datetime.now().isoformat(),
        'total_rows':        total_rows,
        'total_issues':      len(all_issues),
        'high_severity':     high_count,
        'medium_severity':   medium_count,
        'data_health_score': score,
        'ai_readiness':      readiness,
        'issues':            all_issues
    }


# ------------------------------------------------------------
# MAIN \u2014 Runs all checks in sequence
# ------------------------------------------------------------
def main():
    filepath  = 'IMS_EXPORT_SENTINEL7.csv'
    valid_obs = ['ENG-GNC', 'ENG-SE', 'ENG-RF', 'ENG-SW', 'SYS-INTG',
                 'MFG-FAB', 'MFG-ASSY', 'PM-CTRL', 'QA-TEST', 'LOG-SUP']

    print("\\n[AI READINESS AUDITOR v1.0]")
    print(f"[Source: {filepath}]\\n")

    df = load_data(filepath)
    all_issues  = []
    all_issues += check_null_critical_fields(df)
    all_issues += check_date_logic(df)
    all_issues += check_status_conflict(df)
    all_issues += check_duplicate_task_ids(df)
    all_issues += check_wbs_format_consistency(df)
    all_issues += check_obs_code_validity(df, valid_obs)
    all_issues += check_zero_cost_anomaly(df)
    all_issues += check_implausible_evm_values(df)
    all_issues += check_data_in_prose(df)
    all_issues += check_resource_name_variants(df)

    report = generate_audit_report(all_issues, len(df))

    with open('audit_report.json', 'w') as f:
        json.dump(report, f, indent=2)

    print(f"\\nDATA HEALTH SCORE: {report['data_health_score']} / 100")
    print(f"AI READINESS:      {report['ai_readiness']}")
    print(f"TOTAL ISSUES:      {report['total_issues']}")
    print(f"\\nReport saved to: audit_report.json")

if __name__ == '__main__':
    main()`;

// ============================================================
// PYTHON CORRECTIONS CODE — Step 5
// ============================================================
SS.pythonCorrectionsCode =
`# ============================================================
# AI READINESS AUDITOR \u2014 AUTO-CORRECTION MODULE v1.0
# Purpose: Apply safe, deterministic corrections to IMS data.
#          Flag ambiguous issues for human review.
# Author:  Rob Hale \u2014 Program Finance Systems Analyst
# ============================================================

import pandas as pd
import re
import json
from difflib import SequenceMatcher
from datetime import datetime


# ------------------------------------------------------------
# CORRECTION 1: Standardize WBS code format to dot notation
# "1-2-4-1" becomes "1.2.4.1"
# Only applied when the conversion is unambiguous.
# ------------------------------------------------------------
def correct_wbs_format(df):
    """
    Converts dash-separated WBS codes to dot notation.
    "TBD" or blank values are NOT auto-corrected \u2014 they require
    a human to assign the correct code from the WBS dictionary.
    Returns the corrected DataFrame and a log of changes made.
    """
    log     = []
    col     = 'WBS_CODE'
    dash_re = re.compile(r'^\d+(-\d+)+$')  # Matches: 1-2-4-1 but not TBD or blank

    for idx, row in df.iterrows():
        wbs = str(row[col]).strip()
        if dash_re.match(wbs):
            corrected = wbs.replace('-', '.')
            df.at[idx, col] = corrected
            log.append({
                'correction': 'WBS_FORMAT',
                'task_id':    row['TASK_ID'],
                'field':      col,
                'old_value':  wbs,
                'new_value':  corrected
            })

    return df, log


# ------------------------------------------------------------
# CORRECTION 2: Normalize resource names to "Last, First." format
# Only applied when fuzzy match confidence is >= 95%.
# Lower confidence items are queued for human review.
# ------------------------------------------------------------
def normalize_resource_names(df, canonical_names):
    """
    Standardizes resource name formatting using a canonical
    reference list (typically sourced from the personnel system).
    Uses fuzzy matching to handle typos, abbreviations, and
    format variations like 'J.Mitchell' or 'john mitchell'.

    canonical_names: list of approved "Last, First." formatted names.
    """
    log = []
    col = 'RESOURCE_NAME'

    for idx, row in df.iterrows():
        name = str(row[col]).strip()
        if not name:
            continue  # Blank names go to human review, not auto-correct

        best_match  = None
        best_score  = 0.0

        for canonical in canonical_names:
            score = SequenceMatcher(None,
                                    name.lower(),
                                    canonical.lower()).ratio()
            if score > best_score:
                best_score = score
                best_match = canonical

        # Only auto-correct if confidence is very high
        if best_match and best_score >= 0.90 and name != best_match:
            df.at[idx, col] = best_match
            log.append({
                'correction':  'RESOURCE_NAME_NORM',
                'task_id':     row['TASK_ID'],
                'field':       col,
                'old_value':   name,
                'new_value':   best_match,
                'confidence':  f"{round(best_score * 100)}%"
            })

    return df, log


# ------------------------------------------------------------
# CORRECTION 3: Auto-close tasks that are 100% complete
# Only when ACTUAL_FINISH is also populated (date is on record).
# If ACTUAL_FINISH is blank, that's a separate issue for humans.
# ------------------------------------------------------------
def auto_close_completed_tasks(df):
    """
    Sets STATUS = 'Closed' for any task where:
      - PCT_COMPLETE >= 100, AND
      - ACTUAL_FINISH is populated (date is confirmed)

    Tasks with PCT_COMPLETE = 100 but no ACTUAL_FINISH are NOT
    auto-closed \u2014 they require human confirmation of the finish date.
    """
    log = []

    for idx, row in df.iterrows():
        try:
            pct    = float(row.get('PCT_COMPLETE', 0) or 0)
            status = str(row.get('STATUS', '')).strip()
            finish = str(row.get('ACTUAL_FINISH', '')).strip()

            if pct >= 100 and status == 'Open' and finish:
                df.at[idx, 'STATUS'] = 'Closed'
                log.append({
                    'correction': 'STATUS_AUTO_CLOSE',
                    'task_id':    row['TASK_ID'],
                    'field':      'STATUS',
                    'old_value':  'Open',
                    'new_value':  'Closed',
                    'reason':     f"PCT_COMPLETE = {pct}%, ACTUAL_FINISH = {finish}"
                })
        except (ValueError, TypeError):
            pass

    return df, log


# ------------------------------------------------------------
# ROUTING: Flag issues that require human review
# These cannot be safely auto-corrected by a script.
# ------------------------------------------------------------
def flag_for_human_review(issues):
    """
    Separates auto-correctable issues from those that require
    a credentialed program controls professional to adjudicate.

    Human review is required when:
      - The correct value cannot be determined from the data alone
      - The correction could affect contractual or compliance reporting
      - The issue involves a financial or earned value authorization decision
    """
    review_required_types = {
        'NULL_CRITICAL_FIELD',     # Cannot assume the correct WBS or resource
        'DATE_LOGIC_VIOLATION',    # Could be real event or data entry error
        'DUPLICATE_TASK_ID',       # Cannot determine authoritative record
        'ZERO_COST_ANOMALY',       # Could be legitimate deferral or system failure
        'IMPLAUSIBLE_SPI',         # Could be replan event or critical error
        'IMPLAUSIBLE_CPI'
    }

    review_queue = []

    for issue in issues:
        if issue['check'] in review_required_types:
            review_queue.append({
                **issue,
                'review_status': 'PENDING',
                'queued_at':     datetime.now().isoformat()
            })

    return review_queue


# ------------------------------------------------------------
# EXPORT: Save the corrected dataset
# ------------------------------------------------------------
def export_corrected_data(df, filepath):
    """
    Saves the auto-corrected DataFrame to a new CSV file.
    The original file is NEVER overwritten \u2014 the corrected version
    gets a timestamped filename for full auditability.
    """
    timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
    out_path  = filepath.replace('.csv', f'_CORRECTED_{timestamp}.csv')
    df.to_csv(out_path, index=False)
    print(f"Corrected data saved to: {out_path}")
    return out_path


# ------------------------------------------------------------
# EXPORT: Save the human review queue
# ------------------------------------------------------------
def export_review_queue(review_items, filepath):
    """
    Saves the human review queue as a structured JSON file.
    This file is what gets sent to the program controls team
    for manual adjudication before data can enter the AI pipeline.

    Each item includes: check type, task ID, affected field,
    issue description, suggested assignee, and queued timestamp.
    """
    timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
    out_path  = filepath.replace('.csv', f'_REVIEW_QUEUE_{timestamp}.json')

    with open(out_path, 'w') as f:
        json.dump({
            'program':       'SENTINEL-7',
            'generated_at':  datetime.now().isoformat(),
            'total_items':   len(review_items),
            'items':         review_items
        }, f, indent=2)

    print(f"Human review queue saved to: {out_path}")
    return out_path`;

// ============================================================
// PYTHON MONITOR CODE — Step 6
// ============================================================
SS.pythonMonitorCode =
`# ============================================================
# AI READINESS MONITOR \u2014 v1.0
# Purpose: Continuously watch for new OPP exports and
#          automatically trigger the AI Readiness Auditor.
# Author:  Rob Hale \u2014 Program Finance Systems Analyst
# ============================================================

import time
import os
import json
import schedule                          # For scheduling timed runs
from watchdog.observers import Observer  # For watching a folder for new files
from watchdog.events import FileSystemEventHandler
from datetime import datetime

from ai_readiness_auditor import (load_data, check_null_critical_fields,
                                   check_date_logic, check_status_conflict,
                                   check_duplicate_task_ids, check_wbs_format_consistency,
                                   check_obs_code_validity, check_zero_cost_anomaly,
                                   check_implausible_evm_values, check_data_in_prose,
                                   check_resource_name_variants, generate_audit_report)

# Configuration
WATCH_DIRECTORY  = '/exports/opp/incoming/'
CLEAN_PIPELINE   = '/exports/ai_pipeline/'
REVIEW_QUEUE_DIR = '/exports/review_queue/'
LOG_FILE         = '/logs/audit_history.jsonl'
ALERT_EMAIL      = 'program.controls@sentinel7.gov'
SCORE_THRESHOLD  = 70

VALID_OBS = ['ENG-GNC', 'ENG-SE', 'ENG-RF', 'ENG-SW', 'SYS-INTG',
             'MFG-FAB', 'MFG-ASSY', 'PM-CTRL', 'QA-TEST', 'LOG-SUP']


# ------------------------------------------------------------
# File watcher event handler
# ------------------------------------------------------------
class OPPExportHandler(FileSystemEventHandler):
    """
    Listens for new files in the OPP export folder.
    When a new .csv file appears, triggers the full audit pipeline.
    """

    def on_created(self, event):
        """Called automatically when a new file is created in the watched folder."""
        if not event.is_directory and event.src_path.endswith('.csv'):
            print(f"\\n[{timestamp()}] NEW FILE DETECTED: {event.src_path}")
            run_full_pipeline(event.src_path)


# ------------------------------------------------------------
# The full pipeline: audit \u2192 correct \u2192 route \u2192 alert
# ------------------------------------------------------------
def run_full_pipeline(filepath):
    """
    Runs the complete data quality pipeline on a new OPP export:
    1. Load the data
    2. Run all audit checks
    3. Score the data
    4. Route the result \u2014 to AI pipeline or human review
    5. Send alerts if score is below threshold
    6. Log everything for the audit trail
    """
    print(f"[{timestamp()}] Starting AI Readiness Audit...")

    df = load_data(filepath)

    all_issues = (
        check_null_critical_fields(df) +
        check_date_logic(df) +
        check_status_conflict(df) +
        check_duplicate_task_ids(df) +
        check_wbs_format_consistency(df) +
        check_obs_code_validity(df, VALID_OBS) +
        check_zero_cost_anomaly(df) +
        check_implausible_evm_values(df) +
        check_data_in_prose(df) +
        check_resource_name_variants(df)
    )

    report = generate_audit_report(all_issues, len(df))
    score  = report['data_health_score']

    print(f"[{timestamp()}] Audit complete. Score: {score}/100 \u2014 {len(all_issues)} issues found.")

    if score >= SCORE_THRESHOLD:
        # Data is clean enough \u2014 forward to AI pipeline
        clean_path = os.path.join(CLEAN_PIPELINE, os.path.basename(filepath))
        df.to_csv(clean_path, index=False)
        print(f"[{timestamp()}] \u2713 Clean data forwarded to AI pipeline: {clean_path}")
    else:
        # Data needs attention \u2014 route to review, send alert
        queue_path = os.path.join(REVIEW_QUEUE_DIR, f"review_{os.path.basename(filepath)}")
        df.to_csv(queue_path, index=False)
        print(f"[{timestamp()}] \u26a0 Score below threshold. Routed to human review: {queue_path}")
        notify_program_controls(report, filepath)

    log_audit_history(report, filepath)


# ------------------------------------------------------------
# Send an alert to the program controls team
# ------------------------------------------------------------
def notify_program_controls(report, filepath):
    """
    Sends an alert to the program controls team when a data file
    fails the quality threshold.
    """
    subject = f"\u26a0 AI READINESS ALERT \u2014 Data Health Score: {report['data_health_score']}/100"
    body = (
        f"A new OPP export failed the AI readiness threshold.\\n\\n"
        f"File:          {filepath}\\n"
        f"Score:         {report['data_health_score']} / 100\\n"
        f"Status:        {report['ai_readiness']}\\n"
        f"Total Issues:  {report['total_issues']}\\n"
        f"  HIGH:        {report['high_severity']}\\n"
        f"  MEDIUM:      {report['medium_severity']}\\n"
    )
    print(f"[{timestamp()}] ALERT SENT \u2192 {ALERT_EMAIL}")
    print(f"  Subject: {subject}")


# ------------------------------------------------------------
# Log every audit run to a persistent history file
# ------------------------------------------------------------
def log_audit_history(report, filepath):
    """
    Appends each audit result to a log file as a single JSON line.
    Over time, this log becomes a trend record \u2014 showing whether
    data quality is improving or degrading across reporting cycles.
    """
    entry = {**report, 'source_file': filepath}
    with open(LOG_FILE, 'a') as f:
        f.write(json.dumps(entry) + '\\n')
    print(f"[{timestamp()}] Audit history logged.")


# ------------------------------------------------------------
# Schedule a daily audit regardless of file activity
# ------------------------------------------------------------
def run_scheduled_daily_audit():
    """
    Runs the audit pipeline on the most recent export file
    every day at 06:00. Ensures no stale data persists undetected.
    """
    files = sorted([f for f in os.listdir(WATCH_DIRECTORY) if f.endswith('.csv')])
    if files:
        latest = os.path.join(WATCH_DIRECTORY, files[-1])
        print(f"\\n[{timestamp()}] SCHEDULED DAILY AUDIT \u2014 {latest}")
        run_full_pipeline(latest)
    else:
        print(f"[{timestamp()}] SCHEDULED AUDIT: No export files found.")


def timestamp():
    return datetime.now().strftime('%H:%M:%S')


# ------------------------------------------------------------
# MAIN \u2014 Start the monitor
# ------------------------------------------------------------
def main():
    print("\\n" + "="*60)
    print("  AI READINESS MONITOR \u2014 ACTIVE")
    print(f"  Watching: {WATCH_DIRECTORY}")
    print(f"  Score threshold: {SCORE_THRESHOLD}/100")
    print("="*60 + "\\n")

    event_handler = OPPExportHandler()
    observer      = Observer()
    observer.schedule(event_handler, WATCH_DIRECTORY, recursive=False)
    observer.start()

    schedule.every().day.at("06:00").do(run_scheduled_daily_audit)

    print(f"[{timestamp()}] Monitor active. Waiting for new exports...\\n")

    try:
        while True:
            schedule.run_pending()
            time.sleep(1)
    except KeyboardInterrupt:
        observer.stop()
        print(f"\\n[{timestamp()}] Monitor stopped.")

    observer.join()

if __name__ == '__main__':
    main()`;
