/**
 * CookBook - Shared Library Scripts
 */

// В каталоге прокрутку восстанавливает search.js вместе с фильтрами
if (!document.body.hasAttribute('data-recipe-id') && 'scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

// Print recipe helper
function printRecipe() {
  window.print();
}

// Collapsible info cards (sources / discrepancies / notes)
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.collapsible-card').forEach(card => {
    const heading = card.querySelector(':scope > .section-heading');
    const body = card.querySelector(':scope > .collapsible-body');
    if (!heading || !body) return;

    const setState = open => {
      card.classList.toggle('is-open', open);
      heading.setAttribute('aria-expanded', open ? 'true' : 'false');
    };

    heading.setAttribute('role', 'button');
    heading.setAttribute('tabindex', '0');
    if (body.id) heading.setAttribute('aria-controls', body.id);
    setState(card.classList.contains('is-open'));

    const toggle = () => setState(!card.classList.contains('is-open'));

    heading.addEventListener('click', toggle);
    heading.addEventListener('keydown', event => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        toggle();
      }
    });
  });
});

// Global initialization
document.addEventListener('DOMContentLoaded', () => {
  // Smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId.length > 1) {
        const el = document.querySelector(targetId);
        if (el) {
          e.preventDefault();
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });
});

// Пищевая ценность: кнопка «?» раскрывает пояснение к расчёту
document.addEventListener('DOMContentLoaded', () => {
  const cards = Array.from(document.querySelectorAll('.kbju-card'));
  if (!cards.length) return;

  const closeCard = card => {
    const pop = card.querySelector('.kbju-popover');
    const btn = card.querySelector('.kbju-info-btn');
    if (!pop) return;
    pop.hidden = true;
    if (btn) btn.setAttribute('aria-expanded', 'false');
  };

  cards.forEach(card => {
    const pop = card.querySelector('.kbju-popover');
    const btn = card.querySelector('.kbju-info-btn');
    if (!pop || !btn) return;

    btn.setAttribute('aria-expanded', 'false');

    btn.addEventListener('click', e => {
      e.preventDefault();
      e.stopPropagation();
      const willOpen = pop.hidden;
      cards.forEach(closeCard);
      if (willOpen) {
        pop.hidden = false;
        btn.setAttribute('aria-expanded', 'true');
      }
    });

    pop.addEventListener('click', e => e.stopPropagation());
  });

  document.addEventListener('click', () => cards.forEach(closeCard));

  document.addEventListener('keydown', e => {
    if (e.key !== 'Escape') return;
    cards.forEach(card => {
      const pop = card.querySelector('.kbju-popover');
      if (pop && !pop.hidden) {
        closeCard(card);
        const btn = card.querySelector('.kbju-info-btn');
        if (btn) btn.focus();
      }
    });
  });
});
