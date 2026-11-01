/**
 * CookBook - Interactive Recipe Module
 * Features: Portion recalculator, interactive checklists, source timestamps toggle.
 */

document.addEventListener('DOMContentLoaded', () => {
  initPortionScaler();
  initChecklists();
  initSourcesToggle();
});

// 1. Portion Scaler
function initPortionScaler() {
  const portionValEl = document.getElementById('portionValue');
  const btnMinus = document.getElementById('btnPortionMinus');
  const btnPlus = document.getElementById('btnPortionPlus');
  const btnReset = document.getElementById('btnPortionReset');
  const scalableElements = document.querySelectorAll('[data-base-amount]');
  const shoppingPortionDisplays = document.querySelectorAll('.shopping-portion-val');

  if (!portionValEl || !btnMinus || !btnPlus) return;

  const baseServings = parseFloat(portionValEl.dataset.baseServings) || 8;
  let currentServings = baseServings;

  function updateIngredients() {
    portionValEl.textContent = currentServings;
    shoppingPortionDisplays.forEach(el => {
      el.textContent = currentServings;
    });

    const ratio = currentServings / baseServings;

    scalableElements.forEach(el => {
      const baseAmount = parseFloat(el.dataset.baseAmount);
      if (isNaN(baseAmount)) return;

      const unit = el.dataset.unit || '';
      const isPiece = el.dataset.piece === 'true';
      const calculated = baseAmount * ratio;

      if (isPiece) {
        // Handle whole piece ingredients like eggs, berries
        if (Number.isInteger(calculated)) {
          el.textContent = `${calculated} ${unit}`;
        } else {
          const lower = Math.floor(calculated);
          const upper = Math.ceil(calculated);
          const formatted = (Math.round(calculated * 10) / 10).toString().replace('.', ',');
          el.textContent = `${formatted} ${unit} (≈ ${lower}–${upper} шт.)`;
        }
      } else {
        // Grams, ml, tsp
        let displayVal;
        if (calculated >= 25) {
          displayVal = Math.round(calculated);
        } else {
          // Keep 1 decimal for small amounts (e.g. tsp of cocoa)
          displayVal = Math.round(calculated * 10) / 10;
          displayVal = displayVal.toString().replace('.', ',');
        }
        el.textContent = `${displayVal} ${unit}`;
      }
    });
  }

  btnMinus.addEventListener('click', () => {
    if (currentServings > 1) {
      currentServings -= (currentServings > 4 ? 2 : 1);
      if (currentServings < 1) currentServings = 1;
      updateIngredients();
    }
  });

  btnPlus.addEventListener('click', () => {
    if (currentServings < 50) {
      currentServings += (currentServings >= 4 ? 2 : 1);
      updateIngredients();
    }
  });

  if (btnReset) {
    btnReset.addEventListener('click', () => {
      currentServings = baseServings;
      updateIngredients();
    });
  }
}

// 2. Interactive Checklists (Ingredients, Shopping List & Steps)
function initChecklists() {
  const recipeId = document.body.dataset.recipeId || 'kiev-cake';

  // Recipe Ingredients & Shopping List Checkboxes
  const listCheckboxes = document.querySelectorAll('.ingredient-checkbox, .shopping-checkbox');
  listCheckboxes.forEach((cb, index) => {
    const storageKey = `cb_chk_${recipeId}_${index}`;
    const itemEl = cb.closest('.ingredient-item, .shopping-item');

    if (sessionStorage.getItem(storageKey) === 'true') {
      cb.checked = true;
      if (itemEl) itemEl.classList.add('checked');
    }

    cb.addEventListener('change', () => {
      if (cb.checked) {
        if (itemEl) itemEl.classList.add('checked');
        sessionStorage.setItem(storageKey, 'true');
      } else {
        if (itemEl) itemEl.classList.remove('checked');
        sessionStorage.removeItem(storageKey);
      }
    });
  });

  // Steps Complete Toggle
  const stepCheckboxes = document.querySelectorAll('.step-checkbox');
  stepCheckboxes.forEach((cb, index) => {
    const storageKey = `cb_step_${recipeId}_${index}`;
    const stepCard = cb.closest('.step-card');

    if (sessionStorage.getItem(storageKey) === 'true') {
      cb.checked = true;
      stepCard.classList.add('completed');
    }

    cb.addEventListener('change', () => {
      if (cb.checked) {
        stepCard.classList.add('completed');
        sessionStorage.setItem(storageKey, 'true');
      } else {
        stepCard.classList.remove('completed');
        sessionStorage.removeItem(storageKey);
      }
    });
  });
}

// 3. Timestamps Toggle ("Показать источники")
function initSourcesToggle() {
  const toggle = document.getElementById('toggleSources');
  if (!toggle) return;

  const savedState = localStorage.getItem('cookbook_show_sources');
  if (savedState === 'true') {
    toggle.checked = true;
    document.body.classList.add('show-sources');
  }

  toggle.addEventListener('change', () => {
    if (toggle.checked) {
      document.body.classList.add('show-sources');
      localStorage.setItem('cookbook_show_sources', 'true');
    } else {
      document.body.classList.remove('show-sources');
      localStorage.setItem('cookbook_show_sources', 'false');
    }
  });
}
