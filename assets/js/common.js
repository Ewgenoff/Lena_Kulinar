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
