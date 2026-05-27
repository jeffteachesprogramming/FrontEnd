/**
 * bmi.js — Production BMI Calculator
 *
 * Supports imperial (ft / in / lbs) and metric (cm / kg) input.
 * Validates all inputs inline, renders an animated gauge, and
 * displays healthy-weight range for the user's specific height.
 */

'use strict';

/* ─── State ─────────────────────────────────────────────────── */
let currentUnit = 'imperial';

/* ─── BMI Category Definitions ──────────────────────────────── */
const CATEGORIES = [
  {
    maxBMI:  18.5,
    label:   'Underweight',
    bgVar:   'var(--clr-under-bg)',
    txtVar:  'var(--clr-under-txt)',
  },
  {
    maxBMI:  25,
    label:   'Normal weight',
    bgVar:   'var(--clr-normal-bg)',
    txtVar:  'var(--clr-normal-txt)',
  },
  {
    maxBMI:  30,
    label:   'Overweight',
    bgVar:   'var(--clr-over-bg)',
    txtVar:  'var(--clr-over-txt)',
  },
  {
    maxBMI:  Infinity,
    label:   'Obese',
    bgVar:   'var(--clr-obese-bg)',
    txtVar:  'var(--clr-obese-txt)',
  },
];

/* ─── Unit Switching ─────────────────────────────────────────── */
function setUnit(unit) {
  currentUnit = unit;

  const isImperial = unit === 'imperial';

  // Toggle button states
  document.getElementById('btn-imperial').classList.toggle('active', isImperial);
  document.getElementById('btn-metric').classList.toggle('active', !isImperial);

  // Show / hide height field groups
  document.getElementById('group-imperial-height').style.display = isImperial ? '' : 'none';
  document.getElementById('group-metric-height').style.display   = isImperial ? 'none' : '';

  // Update weight placeholder and unit label
  document.getElementById('weight').placeholder         = isImperial ? '0' : '0';
  document.getElementById('weight-unit-label').textContent = isImperial ? 'lbs' : 'kg';

  clearErrors();
  hideResult();
}

/* ─── Validation ─────────────────────────────────────────────── */
function clearErrors() {
  ['feet', 'inches-part', 'height-cm', 'weight'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.classList.remove('err');
  });
  ['err-height', 'err-height-cm', 'err-weight'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.textContent = '';
  });
}

/**
 * Validates all active inputs.
 * @returns {{ valid: boolean, heightIn: number, weightLb: number }}
 */
function validateInputs() {
  let valid = true;

  // ── Weight ──
  const weightRaw = parseFloat(document.getElementById('weight').value);
  const isImperial = currentUnit === 'imperial';
  const weightMax  = isImperial ? 1400 : 635;

  if (isNaN(weightRaw) || weightRaw <= 0 || weightRaw > weightMax) {
    document.getElementById('weight').classList.add('err');
    document.getElementById('err-weight').textContent =
      `Enter a valid weight (1–${weightMax} ${isImperial ? 'lbs' : 'kg'})`;
    valid = false;
  }

  // ── Height ──
  let heightIn = 0;

  if (isImperial) {
    const ft    = parseFloat(document.getElementById('feet').value);
    const inch  = parseFloat(document.getElementById('inches-part').value) || 0;

    if (isNaN(ft) || ft < 1 || ft > 9) {
      document.getElementById('feet').classList.add('err');
      document.getElementById('err-height').textContent = 'Enter feet between 1 and 9';
      valid = false;
    } else if (inch < 0 || inch >= 12) {
      document.getElementById('inches-part').classList.add('err');
      document.getElementById('err-height').textContent = 'Inches must be 0–11';
      valid = false;
    } else {
      heightIn = ft * 12 + inch;
    }
  } else {
    const cm = parseFloat(document.getElementById('height-cm').value);

    if (isNaN(cm) || cm < 50 || cm > 280) {
      document.getElementById('height-cm').classList.add('err');
      document.getElementById('err-height-cm').textContent = 'Enter a height between 50–280 cm';
      valid = false;
    } else {
      heightIn = cm / 2.54;
    }
  }

  const weightLb = isImperial ? weightRaw : weightRaw * 2.20462;

  return { valid, heightIn, weightLb };
}

/* ─── BMI Calculation ────────────────────────────────────────── */
/**
 * Standard imperial BMI formula.
 * @param {number} weightLb
 * @param {number} heightIn
 * @returns {number}
 */
function computeBMI(weightLb, heightIn) {
  return (703 * weightLb) / (heightIn * heightIn);
}

/**
 * Returns the category object for a given BMI.
 * @param {number} bmi
 * @returns {object}
 */
function getCategory(bmi) {
  return CATEGORIES.find(c => bmi < c.maxBMI);
}

/* ─── Gauge ──────────────────────────────────────────────────── */
/**
 * Maps a BMI value to a gauge percentage (0–100).
 * Anchored breakpoints keep category regions proportional.
 * @param {number} bmi
 * @returns {number} percentage 0–100
 */
function bmiToGaugePct(bmi) {
  const stops = [
    [10, 0], [18.5, 18], [25, 46], [30, 65], [35, 82], [45, 100],
  ];

  if (bmi <= stops[0][0]) return 0;
  if (bmi >= stops[stops.length - 1][0]) return 100;

  for (let i = 0; i < stops.length - 1; i++) {
    const [b0, p0] = stops[i];
    const [b1, p1] = stops[i + 1];
    if (bmi >= b0 && bmi <= b1) {
      return p0 + ((bmi - b0) / (b1 - b0)) * (p1 - p0);
    }
  }
  return 100;
}

/* ─── Healthy-Weight Range ───────────────────────────────────── */
/**
 * Returns the healthy-weight range string for a given height,
 * formatted in the user's current unit.
 * @param {number} heightIn  height in inches
 * @returns {{ low: string, high: string }}
 */
function healthyWeightRange(heightIn) {
  const heightM   = heightIn * 0.0254;
  const loKg      = 18.5 * heightM * heightM;
  const hiKg      = 24.9 * heightM * heightM;

  if (currentUnit === 'imperial') {
    return {
      low:  Math.round(loKg * 2.20462) + ' lbs',
      high: Math.round(hiKg * 2.20462) + ' lbs',
    };
  }
  return {
    low:  loKg.toFixed(1) + ' kg',
    high: hiKg.toFixed(1) + ' kg',
  };
}

/* ─── DOM Helpers ────────────────────────────────────────────── */
function hideResult() {
  document.getElementById('result-panel').classList.remove('visible');
}

function buildStatsRow(heightIn, weightLb) {
  const range = healthyWeightRange(heightIn);

  const isImperial = currentUnit === 'imperial';
  let heightDisplay;
  if (isImperial) {
    const ft   = Math.floor(heightIn / 12);
    const inch = Math.round(heightIn % 12 * 10) / 10;
    heightDisplay = `${ft}′ ${inch}″`;
  } else {
    heightDisplay = (heightIn * 2.54).toFixed(1) + ' cm';
  }

  const weightDisplay = isImperial
    ? (weightLb).toFixed(1) + ' lbs'
    : (weightLb / 2.20462).toFixed(1) + ' kg';

  return `
    <div class="stat-cell">
      <div class="s-label">Height</div>
      <div class="s-val">${heightDisplay}</div>
    </div>
    <div class="stat-cell">
      <div class="s-label">Weight</div>
      <div class="s-val">${weightDisplay}</div>
    </div>
    <div class="stat-cell">
      <div class="s-label">Healthy range</div>
      <div class="s-val">${range.low}–${range.high}</div>
    </div>
  `;
}

/* ─── Main: Calculate ────────────────────────────────────────── */
function calculate() {
  clearErrors();

  const { valid, heightIn, weightLb } = validateInputs();
  if (!valid) return;

  const bmi      = computeBMI(weightLb, heightIn);
  const rounded  = Math.round(bmi * 10) / 10;
  const category = getCategory(bmi);

  // BMI number
  document.getElementById('bmi-display').textContent = rounded.toFixed(1);

  // Category badge
  const badge = document.getElementById('category-badge');
  badge.textContent        = category.label;
  badge.style.background   = category.bgVar;
  badge.style.color        = category.txtVar;

  // Gauge needle (clamp to 2–98 to stay on-track visually)
  const pct = Math.min(98, Math.max(2, bmiToGaugePct(bmi)));
  document.getElementById('gauge-needle').style.left = pct + '%';

  // Stats
  document.getElementById('stats-row').innerHTML = buildStatsRow(heightIn, weightLb);

  // Reveal panel
  document.getElementById('result-panel').classList.add('visible');
}

/* ─── Main: Clear ────────────────────────────────────────────── */
function clearForm() {
  ['feet', 'inches-part', 'height-cm', 'weight'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = '';
  });
  clearErrors();
  hideResult();
}

/* ─── Keyboard Support ───────────────────────────────────────── */
document.addEventListener('keydown', function (e) {
  if (e.key === 'Enter') calculate();
});
