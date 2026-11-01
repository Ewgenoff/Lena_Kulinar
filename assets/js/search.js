/**
 * CookBook - Search & Catalog Module
 * Supports multi-ingredient search (AND logic), Russian word stemming,
 * category filtering, sorting, and seamless fallback for file:// protocol.
 */

// Fallback data in case of file:// protocol CORS block
window.RECIPES_FALLBACK = [
  {
    "id": "tort-kievskiy",
    "title": "Торт «Киевский»",
    "category": "Торты и десерты",
    "description": "Легендарный хрустящий торт на ореховом дакуазе с кешью и грецкими орехами, нежным кремом на сгущенке, масляно-заварным муслином с бренди и шоколадной крошкой.",
    "time": "11 ч (активное 1 ч)",
    "timeMinutes": 660,
    "servings": "8 порций (1 торт 18×18 см)",
    "difficulty": "Средняя",
    "image": "assets/images/kievskiy.jpg",
    "url": "recipes/tort-kievskiy.html",
    "ingredients": [
      "яйца куриные",
      "яйца",
      "белки",
      "желтки",
      "сахар",
      "мука пшеничная",
      "мука",
      "орехи",
      "кешью",
      "грецкие орехи",
      "сливочное масло",
      "масло",
      "сгущенка",
      "сгущенное молоко",
      "коньяк",
      "бренди",
      "ром",
      "какао-порошок",
      "какао",
      "сливки",
      "малина"
    ]
  },
  {
    "id": "limonad-tsitrusovyy",
    "title": "Цитрусовый домашний лимонад",
    "category": "Напитки",
    "description": "Освежающий натуральный лимонад на 5 литров из лимонов, апельсинов, грейпфрута и лайма с экстрактом эфирных масел из цедры, сахарным сиропом и опцией маракуйи.",
    "time": "35 мин",
    "timeMinutes": 35,
    "servings": "10 порций (5 литров)",
    "difficulty": "Легкая",
    "image": "assets/images/limonad.jpg",
    "url": "recipes/limonad-tsitrusovyy.html",
    "ingredients": [
      "лимон",
      "лимоны",
      "апельсин",
      "апельсины",
      "грейпфрут",
      "лайм",
      "сахар",
      "сахарный сироп",
      "вода",
      "вода питьевая",
      "лед",
      "маракуйя",
      "пюре маракуйи",
      "лимончелло",
      "цедра",
      "фреш"
    ]
  },
  {
    "id": "konfety-solenaya-karamel",
    "title": "Шоколадные конфеты с солёной карамелью",
    "category": "Конфеты и сладости",
    "description": "Домашние конфеты с жидким карамельным центром: шоколадно-песочная масса с рублеными орехами, солёная карамель мокрым способом и формовка без поликарбонатных форм.",
    "time": "1 ч 10 мин (активное 45 мин)",
    "timeMinutes": 70,
    "servings": "12 конфет по 20 г",
    "difficulty": "Средняя",
    "image": "assets/images/konfety-karamel.jpg",
    "url": "recipes/konfety-solenaya-karamel.html",
    "ingredients": [
      "песочное печенье",
      "печенье",
      "крошка печенья",
      "юбилейное",
      "курабье",
      "орехи",
      "грецкие орехи",
      "арахис",
      "фундук",
      "миндаль",
      "кешью",
      "фисташки",
      "шоколад",
      "молочный шоколад",
      "тёмный шоколад",
      "какао",
      "сливочное масло",
      "масло",
      "сахар",
      "вода",
      "сливки",
      "соль",
      "солёная карамель",
      "карамель",
      "вафельная крошка",
      "кокосовая стружка",
      "кунжут"
    ]
  }
];

let allRecipes = [];
let activeCategory = 'all';
let currentSort = 'default';

document.addEventListener('DOMContentLoaded', () => {
  initSearch();
});

async function initSearch() {
  const searchInput = document.getElementById('recipeSearchInput');
  const clearBtn = document.getElementById('searchClearBtn');
  const chips = document.querySelectorAll('.chip[data-category]');
  const sortSelect = document.getElementById('sortSelect');

  // Try fetching JSON, with fallback
  try {
    const res = await fetch('data/recipes.json');
    if (!res.ok) throw new Error('Fetch failed');
    allRecipes = await res.json();
  } catch (err) {
    console.warn('Could not load data/recipes.json via fetch (likely file:// protocol). Using embedded data fallback.', err);
    allRecipes = window.RECIPES_FALLBACK || [];
  }

  renderRecipes();

  // Search input event
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      if (clearBtn) {
        clearBtn.style.display = e.target.value.trim() ? 'block' : 'none';
      }
      renderRecipes();
    });
  }

  // Clear button
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      searchInput.value = '';
      clearBtn.style.display = 'none';
      searchInput.focus();
      renderRecipes();
    });
  }

  // Category chips
  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      chips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      activeCategory = chip.dataset.category;
      renderRecipes();
    });
  });

  // Sorting
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      currentSort = e.target.value;
      renderRecipes();
    });
  }
}

// Light Russian Stemmer / Normalizer
function cleanWord(word) {
  return word.toLowerCase().replace(/ё/g, 'е').replace(/[^a-zа-я0-9]/g, '');
}

function stemWord(word) {
  let w = cleanWord(word);
  if (w.length <= 3) return w;
  // Strip common Russian nominal / adjectival endings
  return w.replace(/(ов|ев|ом|ем|ами|ями|ах|ях|ую|юю|ое|ее|ые|ие|ый|ий|ой|ей|ам|ям|ов|а|я|о|е|ы|и|у|ю)$/i, '');
}

function filterRecipes() {
  const searchInput = document.getElementById('recipeSearchInput');
  const query = searchInput ? searchInput.value.trim() : '';

  let filtered = [...allRecipes];

  // 1. Category Filter
  if (activeCategory !== 'all') {
    filtered = filtered.filter(r => r.category === activeCategory);
  }

  // 2. Multi-word Search (AND condition)
  if (query) {
    const rawTerms = query.split(/\s+/).filter(t => t.length > 0);
    const searchTerms = rawTerms.map(t => ({
      raw: cleanWord(t),
      stem: stemWord(t)
    }));

    filtered = filtered.filter(recipe => {
      // Prepare corpus of searchable strings for this recipe
      const titleClean = cleanWord(recipe.title);
      const descClean = cleanWord(recipe.description || '');
      const ingList = (recipe.ingredients || []).map(i => cleanWord(i));

      // Each query term must be found in title, description, or ingredients
      return searchTerms.every(term => {
        // Direct substring check
        if (titleClean.includes(term.raw) || descClean.includes(term.raw)) return true;
        if (ingList.some(i => i.includes(term.raw))) return true;

        // Stemmed check
        if (term.stem.length >= 3) {
          if (stemWord(titleClean).includes(term.stem)) return true;
          if (ingList.some(i => stemWord(i).includes(term.stem))) return true;
        }

        return false;
      });
    });
  }

  // 3. Sorting
  if (currentSort === 'name-asc') {
    filtered.sort((a, b) => a.title.localeCompare(b.title, 'ru'));
  } else if (currentSort === 'name-desc') {
    filtered.sort((a, b) => b.title.localeCompare(a.title, 'ru'));
  } else if (currentSort === 'time-asc') {
    filtered.sort((a, b) => (a.timeMinutes || 9999) - (b.timeMinutes || 9999));
  }

  return filtered;
}

function renderRecipes() {
  const grid = document.getElementById('recipesGrid');
  const emptyState = document.getElementById('emptyState');
  if (!grid) return;

  const results = filterRecipes();

  if (results.length === 0) {
    grid.innerHTML = '';
    if (emptyState) emptyState.style.display = 'block';
    return;
  }

  if (emptyState) emptyState.style.display = 'none';

  grid.innerHTML = results.map(recipe => `
    <article class="recipe-card">
      <a href="${recipe.url}" class="card-image-box">
        <img src="${recipe.image}" alt="${recipe.title}" class="card-image" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&auto=format&fit=crop&q=80'">
        <span class="card-category-tag">${recipe.category}</span>
      </a>
      <div class="card-body">
        <h3 class="card-title">
          <a href="${recipe.url}">${recipe.title}</a>
        </h3>
        <p class="card-desc">${recipe.description}</p>
        <div class="card-meta">
          <div class="meta-row meta-row-time">
            <span class="meta-icon">⏱</span>
            <span class="meta-text">${recipe.time}</span>
          </div>
          <div class="meta-row meta-row-bottom">
            <div class="meta-item meta-servings">
              <span class="meta-icon">🍽</span>
              <span class="meta-text">${recipe.servings}</span>
            </div>
            <div class="meta-item meta-difficulty">
              <span class="meta-icon">📊</span>
              <span class="meta-text">${recipe.difficulty}</span>
            </div>
          </div>
        </div>
      </div>
    </article>
  `).join('');
}
