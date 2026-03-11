'use strict';

// ============================================================
// app.js — Navigation, section routing, and section entry hooks
// Scrub & Scale | AI Readiness Demo
// ============================================================

// Section definitions in order
const SECTIONS = [
  { id: 'landing',  label: null,       stepNum: null },
  { id: 'step-1',   label: 'RAW DATA', stepNum: 1 },
  { id: 'step-2',   label: 'QUERY',    stepNum: 2 },
  { id: 'step-3',   label: 'PROBLEMS', stepNum: 3 },
  { id: 'step-4',   label: 'AUDITOR',  stepNum: 4 },
  { id: 'step-5',   label: 'THE FIX',  stepNum: 5 },
  { id: 'step-6',   label: 'MONITOR',  stepNum: 6 },
  { id: 'closing',  label: null,       stepNum: null }
];

let currentIndex = 0;
let charInitialized = false;

// ============================================================
// NAVIGATION
// ============================================================

function goToSection(newIndex, direction) {
  if (newIndex < 0 || newIndex >= SECTIONS.length) return;
  if (newIndex === currentIndex) return;

  const oldSection = document.getElementById(SECTIONS[currentIndex].id);
  const newSection = document.getElementById(SECTIONS[newIndex].id);
  if (!oldSection || !newSection) return;

  const dir = direction || (newIndex > currentIndex ? 'next' : 'prev');

  oldSection.classList.remove('active', 'from-left');
  newSection.classList.remove('from-left');

  if (dir === 'prev') {
    newSection.classList.add('from-left');
  }

  newSection.classList.add('active');
  currentIndex = newIndex;

  // Reset scroll position as reliably as possible across browsers
  window.scrollTo(0, 0);
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;

  updateNav();
  onSectionEntry(SECTIONS[newIndex].id);
}

function nextSection() { goToSection(currentIndex + 1, 'next'); }
function prevSection() { goToSection(currentIndex - 1, 'prev'); }

// ============================================================
// NAV UPDATES
// ============================================================

function updateNav() {
  const section = SECTIONS[currentIndex];

  // Progress bar
  const steppedSections = SECTIONS.filter(s => s.stepNum !== null && s.id !== 'landing' && s.id !== 'closing');
  const stepsTotal = steppedSections.length; // 6
  let completedSteps = 0;
  if (section.stepNum) completedSteps = section.stepNum - 1;
  else if (section.id === 'closing') completedSteps = stepsTotal;

  const bar = document.getElementById('nav-progress-bar');
  if (bar) bar.style.width = `${(completedSteps / stepsTotal) * 100}%`;

  // Step nodes
  for (let i = 1; i <= 6; i++) {
    const node = document.getElementById(`step-node-${i}`);
    if (!node) continue;
    node.classList.remove('active', 'completed');
    if (section.stepNum === i) node.classList.add('active');
    else if (section.stepNum > i || (section.id === 'closing' && i <= 6)) node.classList.add('completed');
    else if (!section.stepNum && section.id !== 'closing' && i <= 6) { /* landing: all dim */ }
  }

  // Mobile indicator
  const mobileLabel = document.getElementById('step-mobile-indicator');
  if (mobileLabel) {
    if (section.stepNum) mobileLabel.textContent = `STEP ${section.stepNum} OF 6`;
    else if (section.id === 'landing') mobileLabel.textContent = 'START';
    else mobileLabel.textContent = 'SUMMARY';
  }

  // Step label center
  const labelCenter = document.getElementById('step-label-center');
  if (labelCenter) {
    if (section.stepNum) labelCenter.textContent = `STEP ${section.stepNum} OF 6`;
    else if (section.id === 'landing') labelCenter.textContent = '';
    else labelCenter.textContent = 'THE CASE';
  }

  // PREV button
  const prevBtn = document.getElementById('prev-btn');
  if (prevBtn) {
    prevBtn.style.visibility = currentIndex === 0 ? 'hidden' : 'visible';
  }

  // NEXT button
  const nextBtn = document.getElementById('next-btn');
  if (nextBtn) {
    if (currentIndex === SECTIONS.length - 1) {
      nextBtn.textContent = 'RESTART';
    } else {
      nextBtn.textContent = currentIndex === 0 ? 'START DEMONSTRATION' : 'NEXT →';
    }
    nextBtn.disabled = false;
  }

  // Preview chips on landing
  updatePreviewChips();
}

function updatePreviewChips() {
  for (let i = 1; i <= 6; i++) {
    const chip = document.getElementById(`chip-${i}`);
    if (!chip) continue;
    chip.classList.toggle('reached', currentIndex >= i);
  }
}

// ============================================================
// SECTION ENTRY HOOKS
// ============================================================

const sectionInitialized = {};

function onSectionEntry(id) {
  if (sectionInitialized[id]) return;
  sectionInitialized[id] = true;

  switch (id) {
    case 'step-1':
      renderRawTable('step1-table-container');
      break;

    case 'step-2':
      renderSQLPanel('sql-code-panel');
      break;

    case 'step-3':
      renderAuditTable('step3-table-container');
      renderAuditCards('audit-cards-container');
      renderSummaryScorecard('summary-scorecard-container');
      updateGauge(100);
      break;

    case 'step-4':
      renderPythonPanel('python-auditor-panel', SS.pythonAuditorCode);
      break;

    case 'step-5':
      renderStep5Table('step5-table-container');
      renderPythonPanel('python-corrections-panel', SS.pythonCorrectionsCode);
      break;

    case 'step-6':
      renderPythonPanel('python-monitor-panel', SS.pythonMonitorCode);
      // Render chart after a short delay to ensure canvas is visible
      setTimeout(() => renderAuditChart('audit-trend-chart'), 300);
      break;
  }
}

// ============================================================
// KEYBOARD NAVIGATION
// ============================================================

document.addEventListener('keydown', e => {
  if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
  if (e.key === 'ArrowRight' || e.key === 'ArrowDown') nextSection();
  if (e.key === 'ArrowLeft'  || e.key === 'ArrowUp')   prevSection();
});

// ============================================================
// INIT
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

  // Wire up PREV / NEXT buttons
  const nextBtn = document.getElementById('next-btn');
  const prevBtn = document.getElementById('prev-btn');

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      if (currentIndex === SECTIONS.length - 1) {
        goToSection(0, 'prev');
      } else {
        nextSection();
      }
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', prevSection);
  }

  // Landing START button
  const startBtn = document.getElementById('start-btn');
  if (startBtn) {
    startBtn.addEventListener('click', nextSection);
  }

  // Step node clicks
  for (let i = 1; i <= 6; i++) {
    const node = document.getElementById(`step-node-${i}`);
    if (node) {
      node.addEventListener('click', () => {
        // Find the section index for this step
        const idx = SECTIONS.findIndex(s => s.stepNum === i);
        if (idx !== -1) goToSection(idx);
      });
    }
  }

  // Step 2 — Run Query button
  const runQueryBtn = document.getElementById('run-query-btn');
  if (runQueryBtn) runQueryBtn.addEventListener('click', runQuery);

  // Step 3 — Reveal All button
  const revealAllBtn = document.getElementById('reveal-all-btn');
  if (revealAllBtn) revealAllBtn.addEventListener('click', revealAllCards);

  // Step 4 — Run Auditor button
  const runAuditorBtn = document.getElementById('run-auditor-btn');
  if (runAuditorBtn) runAuditorBtn.addEventListener('click', runAuditor);

  // Step 5 — Apply Corrections button
  const applyBtn = document.getElementById('apply-corrections-btn');
  if (applyBtn) applyBtn.addEventListener('click', applyCorrections);

  // Step 5 — Send to Review button
  const reviewBtn = document.getElementById('send-review-btn');
  if (reviewBtn) reviewBtn.addEventListener('click', sendToReview);

  // Step 6 — Activate Monitor
  const monitorBtn = document.getElementById('activate-monitor-btn');
  if (monitorBtn) monitorBtn.addEventListener('click', activateMonitor);

  // Step 6 — Simulate Bad File
  const badFileBtn = document.getElementById('simulate-bad-file-btn');
  if (badFileBtn) badFileBtn.addEventListener('click', simulateBadFile);

  // Closing — Restart
  const restartBtn = document.getElementById('restart-btn');
  if (restartBtn) {
    restartBtn.addEventListener('click', () => goToSection(0, 'prev'));
  }

  // Initial nav state
  updateNav();

  // Static classification label
  const ticker = document.querySelector('.ticker-content');
  if (ticker) {
    ticker.textContent = '// DEMONSTRATION ONLY \u2014 NOTIONAL DATA \u2014 NOT CONTROLLED //';
  }
});
