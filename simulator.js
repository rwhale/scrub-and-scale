'use strict';

// ============================================================
// simulator.js — All interactive simulation logic
// Scrub & Scale | AI Readiness Demo
// ============================================================

// ============================================================
// UTILITIES
// ============================================================

function escapeHTML(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function formatCurrency(val) {
  const n = parseInt(val, 10);
  if (isNaN(n)) return val;
  return '$' + n.toLocaleString();
}

// ============================================================
// SYNTAX HIGHLIGHTERS
// ============================================================

function highlightSQL(code) {
  const escaped = escapeHTML(code);
  const lines = escaped.split('\n');
  return lines.map(line => {
    // Comments first
    const commentIdx = line.indexOf('--');
    if (commentIdx !== -1) {
      const before = line.slice(0, commentIdx);
      const comment = line.slice(commentIdx);
      return processSQLTokens(before) + `<span class="tok-comment">${comment}</span>`;
    }
    return processSQLTokens(line);
  }).join('\n');
}

function processSQLTokens(text) {
  const keywords = /\b(SELECT|FROM|WHERE|AND|OR|ORDER BY|AS|CASE|WHEN|THEN|ELSE|END|IS NOT|IS|NOT|NULL|ROUND|NULLIF|GROUP BY|HAVING|JOIN|LEFT|INNER|ON|LIMIT|DISTINCT|ASC|DESC)\b/gi;
  const functions = /\b(ROUND|NULLIF|SUM|AVG|COUNT|MAX|MIN|COALESCE|UPPER|LOWER|TRIM)\b/gi;
  const strings = /'([^']*)'/g;
  const numbers = /\b(\d+\.?\d*)\b/g;

  return text
    .replace(strings, `<span class="tok-string">'$1'</span>`)
    .replace(functions, `<span class="tok-function">$&</span>`)
    .replace(keywords, `<span class="tok-keyword">$&</span>`)
    .replace(numbers, `<span class="tok-number">$1</span>`);
}

function highlightPython(code) {
  let result = '';
  let i = 0;
  const pyKeywords = new Set([
    'import','from','def','class','return','if','elif','else','for','while',
    'in','and','or','not','is','try','except','pass','with','as','True',
    'False','None','lambda','yield','global','nonlocal','raise','del','assert',
    'continue','break','finally'
  ]);
  const pyBuiltins = new Set([
    'print','len','str','int','float','list','dict','set','tuple','range',
    'enumerate','zip','map','filter','sorted','any','all','sum','min','max',
    'open','type','isinstance','hasattr','getattr','setattr','round','abs',
    'format','repr','bool'
  ]);

  while (i < code.length) {
    // Comments
    if (code[i] === '#') {
      let end = code.indexOf('\n', i);
      if (end === -1) end = code.length;
      result += `<span class="tok-comment">${escapeHTML(code.slice(i, end))}</span>`;
      i = end;
      continue;
    }

    // Triple-quoted strings
    if ((code[i] === '"' || code[i] === "'") &&
        code.slice(i, i + 3) === code[i].repeat(3)) {
      const q = code[i].repeat(3);
      const end = code.indexOf(q, i + 3);
      const str = end === -1 ? code.slice(i) : code.slice(i, end + 3);
      result += `<span class="tok-string">${escapeHTML(str)}</span>`;
      i += str.length;
      continue;
    }

    // Regular strings
    if (code[i] === '"' || code[i] === "'") {
      const q = code[i];
      let j = i + 1;
      while (j < code.length && code[j] !== q && code[j] !== '\n') {
        if (code[j] === '\\') j++;
        j++;
      }
      if (code[j] === q) j++;
      result += `<span class="tok-string">${escapeHTML(code.slice(i, j))}</span>`;
      i = j;
      continue;
    }

    // Identifiers and keywords
    if (/[a-zA-Z_]/.test(code[i])) {
      let j = i;
      while (j < code.length && /\w/.test(code[j])) j++;
      const word = code.slice(i, j);
      if (pyKeywords.has(word)) {
        result += `<span class="tok-keyword">${escapeHTML(word)}</span>`;
      } else if (pyBuiltins.has(word)) {
        result += `<span class="tok-function">${escapeHTML(word)}</span>`;
      } else if (/^[A-Z][a-zA-Z]+$/.test(word)) {
        result += `<span class="tok-builtin">${escapeHTML(word)}</span>`;
      } else {
        result += escapeHTML(word);
      }
      i = j;
      continue;
    }

    // Numbers
    if (/\d/.test(code[i])) {
      let j = i;
      while (j < code.length && /[\d.]/.test(code[j])) j++;
      result += `<span class="tok-number">${escapeHTML(code.slice(i, j))}</span>`;
      i = j;
      continue;
    }

    // Everything else
    result += escapeHTML(code[i]);
    i++;
  }
  return result;
}

// ============================================================
// TABLE RENDERERS
// ============================================================

const TABLE_COLS = [
  'TASK_ID','TASK_NAME','WBS_CODE','OBS_CODE','RESOURCE_NAME',
  'BASELINE_START','BASELINE_FINISH','ACTUAL_START','ACTUAL_FINISH',
  'BCWS','BCWP','ACWP','PCT_COMPLETE','STATUS','NOTES'
];

const CURRENCY_COLS = new Set(['BCWS','BCWP','ACWP']);

/** Render the raw data table (Step 1) — no highlights */
function renderRawTable(targetId) {
  const el = document.getElementById(targetId);
  if (!el) return;

  let html = `<div class="table-wrap">
    <table class="data-table" id="raw-data-table">
      <thead><tr>`;
  TABLE_COLS.forEach(c => { html += `<th>${c}</th>`; });
  html += '</tr></thead><tbody>';

  SS.rawTableData.forEach((row, idx) => {
    html += `<tr data-row="${idx}">`;
    TABLE_COLS.forEach(col => {
      let val = escapeHTML(row[col] || '');
      if (CURRENCY_COLS.has(col) && row[col]) val = formatCurrency(row[col]);
      html += `<td>${val || '<span style="color:var(--text-secondary);font-style:italic">—</span>'}</td>`;
    });
    html += '</tr>';
  });

  html += '</tbody></table></div>';
  el.innerHTML = html;

  // Animate rows in
  const rows = el.querySelectorAll('tbody tr');
  rows.forEach((r, i) => {
    setTimeout(() => r.classList.add('row-visible'), i * 30);
  });
}

/** Render the annotated audit table (Step 3) with bad-cell click handlers */
function renderAuditTable(targetId) {
  const el = document.getElementById(targetId);
  if (!el) return;

  const cardSeverity = { 1:'red',2:'red',3:'amber',4:'red',5:'amber',6:'amber',7:'red',8:'red',9:'amber',10:'amber' };

  let html = `<div class="table-wrap">
    <table class="data-table" id="audit-data-table">
      <thead><tr>`;
  TABLE_COLS.forEach(c => { html += `<th>${c}</th>`; });
  html += '</tr></thead><tbody>';

  SS.rawTableData.forEach((row, idx) => {
    const isDup = row.TASK_ID === 'T-1033';
    html += `<tr data-row="${idx}" class="${isDup ? 'row-dup-marker' : ''}">`;

    TABLE_COLS.forEach(col => {
      const cardNum = row._badCells && row._badCells[col];
      let val = row[col] || '';
      let displayVal = CURRENCY_COLS.has(col) && val ? formatCurrency(val) : escapeHTML(val);
      let cellClass = '';
      let dataAttr = '';
      let tooltip = '';

      if (cardNum) {
        const sev = cardSeverity[cardNum];
        cellClass = `bad-${sev}`;
        dataAttr = `data-card="${cardNum}"`;

        const card = SS.auditCards[cardNum - 1];
        tooltip = `title="ISSUE #${cardNum}: ${card.issueType} — Click to inspect"`;
      }

      if ((col === 'WBS_CODE' || col === 'RESOURCE_NAME') && !val && cardNum) {
        displayVal = '<span style="color:var(--accent-red);font-style:italic;font-size:0.68rem">NULL / BLANK</span>';
      }

      if (!displayVal) displayVal = '<span style="color:var(--text-secondary);font-style:italic">—</span>';

      html += `<td class="${cellClass}" ${dataAttr} ${tooltip}>${displayVal}</td>`;
    });

    html += '</tr>';
  });

  html += '</tbody></table></div>';
  el.innerHTML = html;

  // Animate rows
  const rows = el.querySelectorAll('tbody tr');
  rows.forEach((r, i) => {
    setTimeout(() => r.classList.add('row-visible'), i * 25);
  });

  // Click handlers
  el.querySelectorAll('td[data-card]').forEach(td => {
    td.addEventListener('click', () => {
      const cardNum = parseInt(td.getAttribute('data-card'), 10);
      revealCard(cardNum);
    });
  });
}

// ============================================================
// STEP 3 — HEALTH GAUGE & CARD REVEAL
// ============================================================

let currentHealthScore = 100;
const cardRevealed = {};

const CARD_SCORE_DEDUCTIONS = { 1:12, 2:10, 3:6, 4:10, 5:6, 6:5, 7:10, 8:10, 9:5, 10:6 };

function updateGauge(score) {
  const arc = document.getElementById('gauge-arc-fg');
  const scoreText = document.getElementById('gauge-score-text');
  const labelText = document.getElementById('gauge-label-text');
  if (!arc) return;

  const circumference = 283;
  const offset = circumference - (score / 100) * circumference;
  arc.style.strokeDashoffset = offset;

  if (score >= 75) {
    arc.style.stroke = 'var(--accent-green)';
    if (labelText) labelText.textContent = 'STRONG';
  } else if (score >= 50) {
    arc.style.stroke = 'var(--accent-amber)';
    if (labelText) labelText.textContent = 'FAIR';
  } else if (score >= 30) {
    arc.style.stroke = 'var(--accent-red)';
    if (labelText) labelText.textContent = 'POOR';
  } else {
    arc.style.stroke = 'var(--accent-red)';
    if (labelText) labelText.textContent = 'CRITICAL';
  }

  if (scoreText) scoreText.textContent = score;
}

function animateGaugeTo(targetScore) {
  const startScore = currentHealthScore;
  const startTime = performance.now();
  const duration = 1000;

  function step(now) {
    const progress = Math.min((now - startTime) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.round(startScore + (targetScore - startScore) * eased);
    updateGauge(current);
    if (progress < 1) requestAnimationFrame(step);
    else currentHealthScore = targetScore;
  }
  requestAnimationFrame(step);
}

function revealCard(cardNum) {
  if (cardRevealed[cardNum]) return;
  cardRevealed[cardNum] = true;

  const card = SS.auditCards[cardNum - 1];
  const cardEl = document.getElementById(`audit-card-${cardNum}`);
  if (cardEl) {
    cardEl.classList.add('visible');
    cardEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  const deduction = CARD_SCORE_DEDUCTIONS[cardNum] || 6;
  const newScore = Math.max(42, currentHealthScore - deduction);
  animateGaugeTo(newScore);
}

function revealAllCards() {
  SS.auditCards.forEach((_, idx) => {
    const cardNum = idx + 1;
    if (!cardRevealed[cardNum]) {
      setTimeout(() => revealCard(cardNum), idx * 80);
    }
  });
  setTimeout(() => animateGaugeTo(42), SS.auditCards.length * 80 + 200);
}

function renderAuditCards(targetId) {
  const el = document.getElementById(targetId);
  if (!el) return;

  let html = '';
  SS.auditCards.forEach(card => {
    const sevClass = card.severity === 'HIGH' ? 'sev-high' : 'sev-medium';
    const borderColor = card.severity === 'HIGH' ? 'var(--accent-red)' : 'var(--accent-amber)';
    html += `
    <div class="audit-card" id="audit-card-${card.num}" style="border-left:3px solid ${borderColor}">
      <div class="card-header">
        <span class="card-severity ${sevClass}">${card.severity}</span>
        <span class="card-type">${card.issueType}</span>
        <span class="card-num">#${card.num}</span>
      </div>
      <dl class="card-body">
        <dt>WHAT IT IS</dt>
        <dd>${escapeHTML(card.what)}</dd>

        <dt>AFFECTED ROWS</dt>
        <dd class="affected-rows">${card.affectedRows.map(r => escapeHTML(r)).join(' &nbsp;|&nbsp; ')}</dd>

        <dt>WHAT SQL DOES WITH IT</dt>
        <dd>${escapeHTML(card.sqlImpact)}</dd>

        <dt>WHAT AI DOES WITH IT</dt>
        <dd>${escapeHTML(card.aiImpact)}</dd>

        <dt>RECOMMENDED FIX</dt>
        <dd>${escapeHTML(card.fix)}</dd>
      </dl>
    </div>`;
  });
  el.innerHTML = html;
}

function renderSummaryScorecard(targetId) {
  const el = document.getElementById(targetId);
  if (!el) return;

  let html = `<table class="scorecard-table">
    <thead><tr>
      <th>#</th><th>Issue Type</th><th>Count</th><th>Severity</th><th>AI Risk</th>
    </tr></thead><tbody>`;

  SS.summaryScorecard.forEach(r => {
    const sevClass = r.severity === 'HIGH' ? 'sev-label-high' : 'sev-label-medium';
    html += `<tr>
      <td>${r.num}</td>
      <td>${escapeHTML(r.type)}</td>
      <td>${r.count}</td>
      <td class="${sevClass}">${r.severity}</td>
      <td>${escapeHTML(r.aiRisk)}</td>
    </tr>`;
  });

  html += `</tbody></table>
  <div class="scorecard-footer">
    <div><span>TOTAL ISSUES:</span> 22</div>
    <div><span>DATA HEALTH SCORE:</span> 42/100</div>
    <div><span>STATUS:</span> CRITICAL — NOT AI READY</div>
  </div>`;
  el.innerHTML = html;
}

// ============================================================
// STEP 2 — SQL QUERY & RESULTS
// ============================================================

function renderSQLPanel(targetId) {
  const el = document.getElementById(targetId);
  if (!el) return;
  el.innerHTML = highlightSQL(SS.sqlCode);
}

let queryRan = false;

function runQuery() {
  if (queryRan) return;
  queryRan = true;

  const btn = document.getElementById('run-query-btn');
  if (btn) { btn.textContent = 'RUNNING...'; btn.disabled = true; }

  const resultsSection = document.getElementById('query-results-section');
  if (resultsSection) resultsSection.style.display = 'block';

  const tbody = document.getElementById('query-results-body');
  if (!tbody) return;

  tbody.innerHTML = '';
  SS.queryResultsData.forEach((row, idx) => {
    setTimeout(() => renderQueryRow(tbody, row, idx), idx * 120 + 300);
  });

  // Ghost row
  setTimeout(() => renderGhostRow(tbody), SS.queryResultsData.length * 120 + 500);

  // Callout
  setTimeout(() => {
    const callout = document.getElementById('query-callout');
    if (callout) callout.style.display = 'block';
    if (btn) btn.textContent = 'QUERY COMPLETE';
  }, SS.queryResultsData.length * 120 + 700);
}

function renderQueryRow(tbody, row, idx) {
  const tr = document.createElement('tr');

  let trClass = '';
  let extraStyle = '';
  if (row._type === 'duplicate') trClass = 'result-row-dup';
  if (row._type === 'null-spi')  trClass = 'result-row-null';
  if (row._type === 'zero-cost') trClass = 'result-row-zero';

  tr.className = trClass;

  // TASK_ID cell
  let taskIdCell = `<td class="${row._type === 'duplicate' ? 'has-tooltip' : ''}">
    ${escapeHTML(row.TASK_ID)}
    ${row._tooltip ? `<span class="tooltip-text">${escapeHTML(row._tooltip)}</span>` : ''}
  </td>`;

  // TASK_NAME
  let taskNameCell = `<td style="max-width:180px;overflow:hidden;text-overflow:ellipsis">${escapeHTML(row.TASK_NAME)}</td>`;

  // SPI
  let spiVal = row.SPI;
  let spiCell;
  if (spiVal === '—' || spiVal === null) {
    spiCell = `<td class="has-tooltip cell-null-spi">\u2014<span class="tooltip-text">${escapeHTML(row._tooltip || '')}</span></td>`;
  } else {
    const spiNum = parseFloat(spiVal);
    const spiColor = spiNum < 0.85 ? 'var(--accent-red)' : spiNum < 1.0 ? 'var(--accent-amber)' : 'var(--accent-green)';
    spiCell = `<td style="color:${spiColor};font-weight:600">${spiVal}</td>`;
  }

  // CPI
  let cpiVal = row.CPI;
  let cpiCell;
  if (cpiVal === '0.00' || cpiVal === 0) {
    cpiCell = `<td class="has-tooltip cell-zero-cpi">0.00<span class="tooltip-text">${escapeHTML(row._tooltip || '')}</span></td>`;
  } else if (cpiVal === '—' || cpiVal === null) {
    cpiCell = `<td class="cell-null-spi">\u2014</td>`;
  } else {
    const cpiNum = parseFloat(cpiVal);
    const cpiColor = cpiNum < 0.85 ? 'var(--accent-red)' : cpiNum < 1.0 ? 'var(--accent-amber)' : 'var(--accent-green)';
    cpiCell = `<td style="color:${cpiColor};font-weight:600">${cpiVal}</td>`;
  }

  // Risk flag
  let riskClass = 'risk-on-track';
  if (row.RISK_FLAG === 'HIGH RISK') riskClass = 'risk-high';
  if (row.RISK_FLAG === 'MONITOR')   riskClass = 'risk-monitor';
  const riskCell = `<td><span class="risk-badge ${riskClass}">${escapeHTML(row.RISK_FLAG)}</span></td>`;

  // Resource
  let resourceCell;
  if (!row.RESOURCE_NAME) {
    resourceCell = `<td class="has-tooltip"><span class="cell-blank-resource"></span><span class="tooltip-text">\u26a0 BLANK RESOURCE \u2014 No resource assigned.</span></td>`;
  } else {
    resourceCell = `<td>${escapeHTML(row.RESOURCE_NAME)}</td>`;
  }

  tr.innerHTML = taskIdCell + taskNameCell + spiCell + cpiCell + riskCell + resourceCell +
    `<td>${escapeHTML(row.PCT_COMPLETE)}%</td>
     <td>${escapeHTML(row.BASELINE_FINISH)}</td>
     <td>${escapeHTML(row.ACTUAL_FINISH) || '<span style="color:var(--text-secondary)">—</span>'}</td>`;

  tr.style.opacity = '0';
  tr.style.transform = 'translateX(-8px)';
  tbody.appendChild(tr);
  requestAnimationFrame(() => {
    tr.style.transition = 'opacity 0.2s ease, transform 0.2s ease';
    tr.style.opacity = '1';
    tr.style.transform = 'translateX(0)';
  });
}

function renderGhostRow(tbody) {
  const ghost = SS.queryGhostRow;
  const tr = document.createElement('tr');
  tr.className = 'result-ghost-row';
  tr.innerHTML = `
    <td colspan="9">
      <span style="color:var(--accent-amber);font-family:var(--font-display);font-size:0.6rem;letter-spacing:0.1em;margin-right:0.75rem;">
        1 ROW EXCLUDED
      </span>
      Task T-1041 is 100% complete but STATUS = 'Open'. This query filtered it out.
      A program manager would want to see it.
    </td>`;
  tr.style.borderTop = '1px dashed rgba(245,166,35,0.4)';
  tbody.appendChild(tr);
}

// ============================================================
// STEP 4 — AUDITOR TERMINAL SIMULATION
// ============================================================

let auditorRan = false;

function runAuditor() {
  if (auditorRan) return;
  auditorRan = true;

  const btn = document.getElementById('run-auditor-btn');
  if (btn) { btn.textContent = '▶ RUNNING...'; btn.disabled = true; }

  const terminal = document.getElementById('auditor-terminal-body');
  if (!terminal) return;

  terminal.innerHTML = '';

  SS.auditorTerminalLines.forEach(line => {
    setTimeout(() => {
      const div = document.createElement('div');
      div.className = `terminal-line${line.class ? ' ' + line.class : ''}`;
      div.textContent = line.text;
      terminal.appendChild(div);
      terminal.scrollTop = terminal.scrollHeight;

      // Show JSON report after last line
      if (line === SS.auditorTerminalLines[SS.auditorTerminalLines.length - 1]) {
        setTimeout(() => {
          renderJSONReport('audit-json-panel');
          const jsonPanel = document.getElementById('audit-json-panel');
          if (jsonPanel) jsonPanel.classList.add('visible');
          if (btn) btn.textContent = '▶ AUDIT COMPLETE';
        }, 400);
      }
    }, line.delay);
  });
}

function renderJSONReport(targetId) {
  const el = document.getElementById(targetId);
  if (!el) return;

  const r = SS.auditJsonReport;
  const json = {
    generated_at: r.generated_at,
    total_rows: r.total_rows,
    total_issues: r.total_issues,
    high_severity: r.high_severity,
    medium_severity: r.medium_severity,
    data_health_score: r.data_health_score,
    ai_readiness: r.ai_readiness,
    issues: r.issues.slice(0, 5).concat([{ note: `... and ${r.issues.length - 5} more issues` }])
  };

  el.innerHTML = `<div style="font-family:var(--font-display);font-size:0.52rem;letter-spacing:0.15em;color:var(--accent-amber);margin-bottom:0.75rem;">
    AUDIT REPORT — audit_report_SENTINEL7.json
  </div>${formatJSON(json)}`;
}

function formatJSON(obj, indent = 0) {
  const pad = '  '.repeat(indent);
  const pad1 = '  '.repeat(indent + 1);

  if (Array.isArray(obj)) {
    if (obj.length === 0) return '[]';
    const items = obj.map(item => pad1 + formatJSON(item, indent + 1)).join(',\n');
    return `[\n${items}\n${pad}]`;
  }

  if (obj !== null && typeof obj === 'object') {
    const entries = Object.entries(obj).map(([k, v]) => {
      return `${pad1}<span class="json-key">"${escapeHTML(k)}"</span>: ${formatJSON(v, indent + 1)}`;
    }).join(',\n');
    return `{\n${entries}\n${pad}}`;
  }

  if (typeof obj === 'string') return `<span class="json-str">"${escapeHTML(obj)}"</span>`;
  if (typeof obj === 'number') return `<span class="json-num">${obj}</span>`;
  if (typeof obj === 'boolean') return `<span class="json-bool">${obj}</span>`;
  return `<span class="json-bool">${escapeHTML(String(obj))}</span>`;
}

// ============================================================
// STEP 5 — CORRECTIONS SIMULATION
// ============================================================

let correctionsApplied = false;
let reviewSent = false;

// Column order used in the Step 5 table (must match renderStep5Table cols5)
const STEP5_COLS = ['TASK_ID','TASK_NAME','WBS_CODE','OBS_CODE','RESOURCE_NAME','STATUS','PCT_COMPLETE'];

function flashCell(cell, newVal) {
  if (!cell) return;
  cell.style.transition = 'background 0.3s, color 0.3s';
  cell.style.background = 'rgba(0, 230, 118, 0.2)';
  cell.style.color = 'var(--accent-green)';
  cell.textContent = newVal;
  setTimeout(() => { cell.style.background = ''; cell.style.color = ''; }, 1200);
}

function applyCorrections() {
  if (correctionsApplied) return;
  correctionsApplied = true;

  const btn = document.getElementById('apply-corrections-btn');
  if (btn) { btn.textContent = 'APPLYING...'; btn.disabled = true; }

  // Corrections keyed by task ID. T-1033 handled separately (two rows).
  const correctionCells = {
    'T-1088': { col: 'WBS_CODE',      newVal: '1.2.4.1' },
    'T-1095': { col: 'OBS_CODE',      newVal: 'ENG-GNC' },
    'T-1102': { col: 'OBS_CODE',      newVal: 'SYS-INTG' },
    'T-1021': { col: 'RESOURCE_NAME', newVal: 'Mitchell, J.' },
    'T-1044': { col: 'RESOURCE_NAME', newVal: 'Mitchell, J.' },
    'T-1041': { col: 'STATUS',        newVal: 'Closed' },
    'T-1067': { col: 'STATUS',        newVal: 'Closed' }
  };

  const table = document.getElementById('step5-data-table');
  if (!table) return;

  const rows = table.querySelectorAll('tbody tr');
  let delay = 0;

  rows.forEach(tr => {
    const taskId = tr.querySelector('td')?.textContent?.trim();
    if (!taskId) return;

    // Handle T-1033 duplicates for resource name
    if (taskId === 'T-1033') {
      const resIdx = STEP5_COLS.indexOf('RESOURCE_NAME');
      setTimeout(() => flashCell(tr.querySelectorAll('td')[resIdx], 'Mitchell, J.'), delay);
      delay += 180;
      return;
    }

    const correction = correctionCells[taskId];
    if (!correction) return;

    const colIdx = STEP5_COLS.indexOf(correction.col);
    if (colIdx === -1) return;

    setTimeout(() => flashCell(tr.querySelectorAll('td')[colIdx], correction.newVal), delay);
    delay += 180;
  });

  // Show correction log
  setTimeout(() => {
    const log = document.getElementById('correction-log');
    if (log) {
      log.classList.add('visible');
      SS.correctionLogLines.forEach((line, idx) => {
        setTimeout(() => {
          const div = document.createElement('div');
          div.className = `terminal-line ${line.class || ''}`;
          div.textContent = line.text;
          log.appendChild(div);
          log.scrollTop = log.scrollHeight;
        }, idx * 100);
      });
    }

    // Show send-to-review button
    setTimeout(() => {
      const reviewBtn = document.getElementById('send-review-btn');
      if (reviewBtn) reviewBtn.style.display = 'inline-flex';
      if (btn) btn.textContent = 'CORRECTIONS APPLIED';
    }, SS.correctionLogLines.length * 100 + 200);
  }, 1800);
}

function sendToReview() {
  if (reviewSent) return;
  reviewSent = true;

  const btn = document.getElementById('send-review-btn');
  if (btn) { btn.textContent = 'SENDING...'; btn.disabled = true; }

  const queue = document.getElementById('review-queue');
  if (!queue) return;

  queue.classList.add('visible');

  SS.reviewQueueItems.forEach((item, idx) => {
    setTimeout(() => {
      const div = document.createElement('div');
      div.className = 'hrq-item';
      div.style.animationDelay = `${idx * 0.08}s`;
      div.innerHTML = `
        <span class="hrq-id">${escapeHTML(item.id)}</span>
        <span class="hrq-type">${escapeHTML(item.type)}</span>
        <span class="hrq-tasks">${escapeHTML(item.tasks)}</span>
        <span class="hrq-assign">ASSIGN TO: ${escapeHTML(item.assign)}</span>`;
      queue.querySelector('.review-queue-body').appendChild(div);
    }, idx * 150 + 300);
  });

  setTimeout(() => {
    if (btn) btn.textContent = 'QUEUE SENT';

    // Show post-correction audit
    const postAudit = document.getElementById('post-correction-audit');
    if (postAudit) {
      postAudit.style.display = 'block';
      const termBody = document.getElementById('post-correction-terminal');
      if (termBody) {
        SS.postCorrectionLines.forEach((line, idx) => {
          setTimeout(() => {
            const div = document.createElement('div');
            div.className = `terminal-line ${line.class || ''}`;
            div.textContent = line.text;
            termBody.appendChild(div);
          }, idx * 120);
        });
      }

      // Animate the before/after gauges
      setTimeout(() => {
        animateMiniGauge('gauge-before', 42, 'red');
        animateMiniGauge('gauge-after', 78, 'amber');
        postAudit.style.animation = 'cardSlideIn 0.4s ease both';
      }, SS.postCorrectionLines.length * 120 + 300);
    }
  }, SS.reviewQueueItems.length * 150 + 600);
}

function animateMiniGauge(canvasId, score, colorHint) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const cx = 60, cy = 60, r = 45;
  const startAngle = -Math.PI / 2;
  const endAngle = startAngle + (score / 100) * 2 * Math.PI;
  const trackColor = '#1e2d4a';
  const arcColor = score >= 70 ? '#00e676' : score >= 50 ? '#f5a623' : '#ff3b5c';

  let progress = 0;
  const duration = 1200;
  const startTime = performance.now();

  function draw(now) {
    const elapsed = now - startTime;
    progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const currentEnd = startAngle + eased * (endAngle - startAngle);

    ctx.clearRect(0, 0, 120, 120);

    // Track
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, 2 * Math.PI);
    ctx.strokeStyle = trackColor;
    ctx.lineWidth = 8;
    ctx.stroke();

    // Arc
    ctx.beginPath();
    ctx.arc(cx, cy, r, startAngle, currentEnd);
    ctx.strokeStyle = arcColor;
    ctx.lineWidth = 8;
    ctx.lineCap = 'round';
    ctx.stroke();

    // Score text
    ctx.fillStyle = '#e8edf5';
    ctx.font = 'bold 20px Orbitron, monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(Math.round(eased * score), cx, cy - 6);

    ctx.fillStyle = '#7a8ba8';
    ctx.font = '7px Orbitron, monospace';
    ctx.fillText('/100', cx, cy + 14);

    if (progress < 1) requestAnimationFrame(draw);
  }
  requestAnimationFrame(draw);
}

// ============================================================
// STEP 6 — MONITOR SIMULATION
// ============================================================

let monitorStarted = false;
let badFileSimulated = false;

function activateMonitor() {
  if (monitorStarted) return;
  monitorStarted = true;

  const btn = document.getElementById('activate-monitor-btn');
  if (btn) { btn.textContent = 'MONITOR ACTIVE'; btn.disabled = true; }

  const terminal = document.getElementById('monitor-terminal-body');
  if (!terminal) return;

  terminal.innerHTML = '';
  SS.monitorTerminalLines.forEach(line => {
    setTimeout(() => {
      const div = document.createElement('div');
      div.className = `terminal-line${line.class ? ' ' + line.class : ''}`;
      div.textContent = line.text;
      terminal.appendChild(div);
      terminal.scrollTop = terminal.scrollHeight;
    }, line.delay);
  });

  // Show bad file button after monitor starts
  const lastDelay = SS.monitorTerminalLines[SS.monitorTerminalLines.length - 1].delay;
  setTimeout(() => {
    const badBtn = document.getElementById('simulate-bad-file-btn');
    if (badBtn) badBtn.style.display = 'inline-flex';
  }, lastDelay + 400);
}

function simulateBadFile() {
  if (badFileSimulated) return;
  badFileSimulated = true;

  const btn = document.getElementById('simulate-bad-file-btn');
  if (btn) { btn.textContent = 'SIMULATING...'; btn.disabled = true; }

  const terminal = document.getElementById('monitor-terminal-body');
  if (!terminal) return;

  // Add a blank line
  const blank = document.createElement('div');
  blank.className = 'terminal-line';
  blank.textContent = '';
  terminal.appendChild(blank);

  SS.badFileTerminalLines.forEach(line => {
    setTimeout(() => {
      const div = document.createElement('div');
      div.className = `terminal-line${line.class ? ' ' + line.class : ''}`;
      div.textContent = line.text;
      terminal.appendChild(div);
      terminal.scrollTop = terminal.scrollHeight;
    }, line.delay + 400);
  });

  const lastDelay = SS.badFileTerminalLines[SS.badFileTerminalLines.length - 1].delay;
  setTimeout(() => {
    if (btn) btn.textContent = 'BAD FILE SIMULATED';
  }, lastDelay + 600);
}

// ============================================================
// CHART — Step 6 Audit Trend
// ============================================================

function renderAuditChart(canvasId) {
  const canvas = document.getElementById(canvasId);
  if (!canvas || !window.Chart) return;

  const data = SS.auditChartData;
  const threshold = 70;

  new Chart(canvas, {
    type: 'line',
    data: {
      labels: data.labels,
      datasets: [{
        label: 'Data Health Score',
        data: data.scores,
        borderColor: '#00d4ff',
        backgroundColor: 'rgba(0, 212, 255, 0.08)',
        borderWidth: 2,
        pointBackgroundColor: data.scores.map(s =>
          s >= 75 ? '#00e676' : s >= 50 ? '#f5a623' : '#ff3b5c'
        ),
        pointBorderColor: 'transparent',
        pointRadius: 5,
        tension: 0.4,
        fill: true
      }, {
        label: 'AI-Ready Threshold (70)',
        data: data.labels.map(() => threshold),
        borderColor: 'rgba(245, 166, 35, 0.5)',
        borderWidth: 1,
        borderDash: [6, 4],
        pointRadius: 0,
        fill: false
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: {
          labels: {
            color: '#7a8ba8',
            font: { family: 'IBM Plex Sans', size: 11 }
          }
        },
        annotation: { annotations: {} }
      },
      scales: {
        x: {
          grid: { color: '#0d1830' },
          ticks: { color: '#7a8ba8', font: { family: 'JetBrains Mono', size: 10 } }
        },
        y: {
          min: 40, max: 100,
          grid: { color: '#0d1830' },
          ticks: { color: '#7a8ba8', font: { family: 'JetBrains Mono', size: 10 } }
        }
      }
    }
  });
}

// ============================================================
// CODE PANEL RENDERERS
// ============================================================

function renderPythonPanel(targetId, code) {
  const el = document.getElementById(targetId);
  if (!el) return;
  el.innerHTML = highlightPython(code);
}

function renderStep5Table(targetId) {
  const el = document.getElementById(targetId);
  if (!el) return;

  let html = `<div class="table-wrap">
    <table class="data-table" id="step5-data-table">
      <thead><tr>`;

  // Show a subset of columns for readability
  const cols5 = ['TASK_ID','TASK_NAME','WBS_CODE','OBS_CODE','RESOURCE_NAME','STATUS','PCT_COMPLETE'];
  cols5.forEach(c => { html += `<th>${c}</th>`; });
  html += '</tr></thead><tbody>';

  SS.rawTableData.forEach((row, idx) => {
    html += `<tr data-row="${idx}">`;
    cols5.forEach(col => {
      const val = row[col] || '';
      const isBad = row._badCells && row._badCells[col];
      let cellClass = '';
      if (isBad) {
        cellClass = 'style="background:rgba(245,166,35,0.07);outline:1px solid rgba(245,166,35,0.3)"';
      }
      html += `<td ${cellClass}>${escapeHTML(val) || '<span style="color:var(--text-secondary);font-style:italic">—</span>'}</td>`;
    });
    html += '</tr>';
  });

  html += '</tbody></table></div>';
  el.innerHTML = html;

  // Animate rows
  const rows = el.querySelectorAll('tbody tr');
  rows.forEach((r, i) => {
    setTimeout(() => r.classList.add('row-visible'), i * 20);
  });
}
