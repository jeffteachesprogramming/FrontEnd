/**
 * validation.js
 * Shared validation library — mirrors ValidationBoth.cs logic
 */

const Validation = {

  /**
   * Check that a value is not empty
   */
  isThereInput(value, fieldName) {
    if (value === null || value === undefined || String(value).trim() === '') {
      return { ok: false, msg: `${fieldName} is required.\n` };
    }
    return { ok: true, msg: '' };
  },

  /**
   * Check that a value is a valid number (decimal)
   */
  isDecimal(value, fieldName) {
    if (isNaN(value) || value === '') {
      return { ok: false, msg: `${fieldName} must be a valid number.\n` };
    }
    return { ok: true, msg: '' };
  },

  /**
   * Check that a value is a valid integer
   */
  isInteger(value, fieldName) {
    const n = Number(value);
    if (!Number.isInteger(n)) {
      return { ok: false, msg: `${fieldName} must be a whole number.\n` };
    }
    return { ok: true, msg: '' };
  },

  /**
   * Check that a decimal value is within range [min, max]
   */
  isWithinRange(value, fieldName, min, max) {
    const n = parseFloat(value);
    if (n < min || n > max) {
      return {
        ok: false,
        msg: `${fieldName} must be between ${min} and ${max}.\n`
      };
    }
    return { ok: true, msg: '' };
  },

  /**
   * Full decimal field validation: required → numeric → range
   * Returns { valid: bool, errors: string[] }
   */
  validateDecimal(value, fieldName, min, max) {
    const errors = [];

    const inputCheck = this.isThereInput(value, fieldName);
    if (!inputCheck.ok) { errors.push(inputCheck.msg.trim()); return { valid: false, errors }; }

    const decCheck = this.isDecimal(value, fieldName);
    if (!decCheck.ok) { errors.push(decCheck.msg.trim()); return { valid: false, errors }; }

    const rangeCheck = this.isWithinRange(value, fieldName, min, max);
    if (!rangeCheck.ok) { errors.push(rangeCheck.msg.trim()); return { valid: false, errors }; }

    return { valid: true, errors: [] };
  },

  /**
   * Full integer field validation: required → integer → range
   * Returns { valid: bool, errors: string[] }
   */
  validateInteger(value, fieldName, min, max) {
    const errors = [];

    const inputCheck = this.isThereInput(value, fieldName);
    if (!inputCheck.ok) { errors.push(inputCheck.msg.trim()); return { valid: false, errors }; }

    const intCheck = this.isInteger(value, fieldName);
    if (!intCheck.ok) { errors.push(intCheck.msg.trim()); return { valid: false, errors }; }

    const n = parseInt(value, 10);
    if (n < min || n > max) {
      errors.push(`${fieldName} must be between ${min} and ${max}.`);
      return { valid: false, errors };
    }

    return { valid: true, errors: [] };
  }
};

/**
 * Formatting helpers
 */
const Format = {
  currency(n) {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(n);
  },
  decimal(n, places = 2) {
    return Number(n).toFixed(places);
  },
  percent(n) {
    return (Number(n) * 100).toFixed(1) + '%';
  },
  number(n, places = 2) {
    return Number(n).toFixed(places);
  }
};

/**
 * UI helpers shared across all pages
 */
const UI = {
  /**
   * Show an error on a field.
   * @param {HTMLElement} input
   * @param {HTMLElement} errorEl
   * @param {string} message
   */
  showError(input, errorEl, message) {
    input.classList.add('error');
    errorEl.textContent = message;
    errorEl.classList.add('visible');
  },

  /**
   * Clear error state from a field.
   */
  clearError(input, errorEl) {
    input.classList.remove('error');
    errorEl.textContent = '';
    errorEl.classList.remove('visible');
  },

  /**
   * Clear all errors on the page.
   */
  clearAllErrors() {
    document.querySelectorAll('input').forEach(i => i.classList.remove('error'));
    document.querySelectorAll('.field-error').forEach(e => {
      e.textContent = '';
      e.classList.remove('visible');
    });
  },

  /**
   * Show the result panel.
   */
  showResult(panelId) {
    const panel = document.getElementById(panelId);
    if (panel) {
      panel.classList.add('visible');
      panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  },

  /**
   * Hide the result panel.
   */
  hideResult(panelId) {
    const panel = document.getElementById(panelId);
    if (panel) panel.classList.remove('visible');
  },

  /**
   * Attach live-clear-on-input to a field pair.
   */
  attachLiveClear(inputId, errorId) {
    const input = document.getElementById(inputId);
    const errorEl = document.getElementById(errorId);
    if (input && errorEl) {
      input.addEventListener('input', () => this.clearError(input, errorEl));
    }
  },

  /**
   * Mark the correct nav link as active based on current filename.
   */
  setActiveNav() {
    const filename = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('header nav a').forEach(a => {
      const href = a.getAttribute('href');
      a.classList.toggle('active', href === filename);
    });
  }
};
