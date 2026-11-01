/**
 * CookBook - Interactive Recipe Module
 * Features: Portion recalculator, interactive checklists, sources toggle,
 * collapsible shopping list, and auto-hide header on scroll.
 */

document.addEventListener('DOMContentLoaded', () => {
  initPortionScaler();
  initChecklists();
  initSourcesToggle();
  initShoppingCollapse();
  initAutoHideHeader();
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
        if (Number.isInteger(calculated)) {
          el.textContent = `${calculated} ${unit}`;
        } else {
          const lower = Math.floor(calculated);
          const upper = Math.ceil(calculated);
          const formatted = (Math.round(calculated * 10) / 10).toString().replace('.', ',');
          el.textContent = `${formatted} ${unit} (≈ ${lower}–${upper} шт.)`;
        }
      } else {
        let displayVal;
        if (calculated >= 25) {
          displayVal = Math.round(calculated);
        } else {
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

// 2. Interactive Checklists (Ingredients & Shopping List)
function initChecklists() {
  const recipeId = document.body.dataset.recipeId || 'recipe';

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
}

// 3. Timestamps Toggle ("Таймкоды")
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

// 4. Collapsible Shopping List ("Купить в магазине" свёрнут по умолчанию)
function initShoppingCollapse() {
  const section = document.getElementById('shoppingSection');
  if (!section) return;

  const header = section.querySelector('.shopping-header');
  const toggleBtn = section.querySelector('.shopping-toggle-btn');
  const toggleText = section.querySelector('.shopping-toggle-btn .toggle-text');
  if (!header) return;

  header.style.cursor = 'pointer';
  header.setAttribute('role', 'button');
  header.setAttribute('tabindex', '0');
  header.setAttribute('aria-expanded', 'false');

  const toggle = (e) => {
    // Не реагировать, если клик по чекбоксу или инпуту
    if (e.target.closest('input, label.shopping-item-content')) return;

    const isOpen = section.classList.toggle('is-open');
    header.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    if (toggleBtn) {
      toggleBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    }
    if (toggleText) {
      toggleText.textContent = isOpen ? 'Свернуть' : 'Развернуть';
    }
  };

  header.addEventListener('click', toggle);
  header.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggle(e);
    }
  });
}

// 5. Auto-hide Header on Scroll (скрытие шапки при прокрутке контента)
function initAutoHideHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  let lastScrollY = window.pageYOffset || document.documentElement.scrollTop;
  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const currentScrollY = window.pageYOffset || document.documentElement.scrollTop;
        const delta = currentScrollY - lastScrollY;

        // При скролле вниз (пролистывание страницы вверх) шапка скрывается
        // При скролле вверх или в самом начале страницы шапка возвращается
        if (currentScrollY > 70 && delta > 4) {
          header.classList.add('header-hidden');
        } else if (delta < -4 || currentScrollY <= 20) {
          header.classList.remove('header-hidden');
        }

        lastScrollY = Math.max(0, currentScrollY);
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
}