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
  },
  {
    "id": "tort-tri-shokolada",
    "title": "Торт «Три шоколада»",
    "category": "Торты и десерты",
    "description": "Новогодний муссовый торт: влажный шоколадный бисквит на растительном масле, три крема на крем-англезе с тёмным, молочным и белым шоколадом, мусс на маскарпоне, подтёки из ганаша и свежие ягоды.",
    "time": "12–14 ч (активное 1 ч 30 мин)",
    "timeMinutes": 780,
    "servings": "10 порций (торт Ø18 см)",
    "difficulty": "Средняя",
    "image": "assets/images/tri-shokolada.jpg",
    "url": "recipes/tort-tri-shokolada.html",
    "ingredients": [
      "шоколад",
      "тёмный шоколад",
      "молочный шоколад",
      "белый шоколад",
      "какао",
      "какао-порошок",
      "мука",
      "мука пшеничная",
      "сахар",
      "сметана",
      "яйца",
      "яйца куриные",
      "желтки",
      "растительное масло",
      "вода",
      "молоко",
      "желатин",
      "сливки",
      "маскарпоне",
      "бейлис",
      "ликёр",
      "ягоды",
      "малина",
      "смородина",
      "ежевика",
      "ганаш"
    ]
  },
  {
    "id": "sharlotka",
    "title": "Шарлотка с яблоками",
    "category": "Выпечка",
    "description": "Высокая домашняя шарлотка: белки в крепкую меренгу, желтки с сахаром и ванилью, всего 100 г муки на 6 яиц и много яблок дольками с кожурой. Печётся 40 минут при 180 °C в кольце без дна.",
    "time": "2–2,5 ч (активное 25 мин)",
    "timeMinutes": 150,
    "servings": "8 порций (пирог Ø20 см)",
    "difficulty": "Легкая",
    "image": "assets/images/sharlotka.jpg",
    "url": "recipes/sharlotka.html",
    "ingredients": [
      "яблоки",
      "яблоко",
      "яйца",
      "яйца куриные",
      "белки",
      "желтки",
      "сахар",
      "мука",
      "мука пшеничная",
      "ванильный сахар",
      "ваниль",
      "корица",
      "сахарная пудра",
      "пудра",
      "безглютеновая мука",
      "шарлотка"
    ]
  },
  {
    "id": "madlen-zeffir-v-shokolade",
    "title": "Зефир-мадлен с чёрной смородиной в шоколаде",
    "category": "Конфеты и сладости",
    "description": "Домашний зефир на агаре в силиконовых формах для мадлен: яблочно-смородиновая масса, крепкое конфи из чёрной смородины на пектине и глазирование темперированным шоколадом.",
    "time": "7–12 ч (активное 1 ч)",
    "timeMinutes": 480,
    "servings": "12 зефирок",
    "difficulty": "Средняя",
    "image": "assets/images/madlen-zeffir-v-shokolade.jpg",
    "url": "recipes/madlen-zeffir-v-shokolade.html",
    "ingredients": [
      "зефир",
      "агар",
      "агар-агар",
      "яблочное пюре",
      "пюре",
      "смородина",
      "чёрная смородина",
      "белок",
      "белки",
      "яйца",
      "сахар",
      "сироп глюкозы",
      "глюкоза",
      "пектин",
      "лимонная кислота",
      "шоколад",
      "тёмный шоколад",
      "глазурь",
      "мадлен"
    ]
  },
  {
    "id": "yablochnyy-shtrudel",
    "title": "Яблочный штрудель",
    "category": "Выпечка",
    "description": "Домашний штрудель на вытяжном тесте: мука, яйцо, мёд, уксус и кипяток, растягивание пласта до 80×45 см, начинка из антоновки с клюквой и грецкими орехами и хрустящая корочка.",
    "time": "~3 ч (активное 40 мин)",
    "timeMinutes": 180,
    "servings": "8 порций (1 большой штрудель)",
    "difficulty": "Средняя",
    "image": "assets/images/yablochnyy-shtrudel.jpg",
    "url": "recipes/yablochnyy-shtrudel.html",
    "ingredients": [
      "штрудель",
      "тесто",
      "вытяжное тесто",
      "яблоки",
      "яблоко",
      "антоновка",
      "мука",
      "мука пшеничная",
      "яйца",
      "яйцо",
      "мёд",
      "мед",
      "уксус",
      "уксус яблочный",
      "растительное масло",
      "масло",
      "сливочное масло",
      "клюква",
      "орехи",
      "грецкие орехи",
      "сахар",
      "корица",
      "бисквитная крошка",
      "печенье",
      "сахарная пудра"
    ]
  },
  {
    "id": "semifreddo-shokoladno-fistashkovoe",
    "title": "Семифредо шоколадно-фисташковое с вишней",
    "category": "Торты и десерты",
    "description": "Итальянское мороженое без варки: взбитые с сахаром яйца, тёмный шоколад 54,5%, сливки до мягких пик, фисташки и сублимированная вишня. Замораживается в контейнере 6 часов.",
    "time": "3,5–6,5 ч (активное 20 мин)",
    "timeMinutes": 400,
    "servings": "8 порций (~1 л)",
    "difficulty": "Легкая",
    "image": "assets/images/semifreddo.jpg",
    "url": "recipes/semifreddo-shokoladno-fistashkovoe.html",
    "ingredients": [
      "семифредо",
      "мороженое",
      "десерт",
      "яйца",
      "яйцо",
      "меланж",
      "сахар",
      "шоколад",
      "тёмный шоколад",
      "сливки",
      "фисташки",
      "вишня",
      "сублимированная вишня",
      "фисташковая мука"
    ]
  },
  {
    "id": "pesochnye-korzinochki",
    "title": "Песочные корзиночки с зефирным кремом",
    "category": "Торты и десерты",
    "description": "Песочные корзиночки с зефирным кремом на агаре и клубничным конфи: хрустящее тесто, лёгкий розовый крем из протёртого джема и взбитых белков, желе из клубники внутри.",
    "time": "~2,5 ч (активное 50 мин)",
    "timeMinutes": 150,
    "servings": "16 корзиночек по 50 г",
    "difficulty": "Средняя",
    "image": "assets/images/pesochnye-korzinochki.jpg",
    "url": "recipes/pesochnye-korzinochki.html",
    "ingredients": [
      "корзиночки",
      "песочное тесто",
      "тесто",
      "мука",
      "сливочное масло",
      "масло",
      "сахарная пудра",
      "пудра",
      "яйца",
      "яйцо",
      "белок",
      "сметана",
      "разрыхлитель",
      "зефирный крем",
      "зефир",
      "агар",
      "агар-агар",
      "джем",
      "варенье",
      "сахар",
      "клубника",
      "конфи",
      "желатин",
      "лимонная кислота"
    ]
  },
  {
    "id": "samyy-luchshiy-tort",
    "title": "Самый лучший торт с меренгой",
    "category": "Торты и десерты",
    "description": "Прямоугольный торт 13×28 см: тонкий масляный корж, хрустящая меренга с орехами, нежный заварной крем на желтках и кукурузном крахмале со взбитыми сливками.",
    "time": "~4 ч (активное 1 ч)",
    "timeMinutes": 240,
    "servings": "10 порций (торт 13×28 см)",
    "difficulty": "Средняя",
    "image": "assets/images/samyy-luchshiy-tort.jpg",
    "url": "recipes/samyy-luchshiy-tort.html",
    "ingredients": [
      "торт",
      "корж",
      "яйца",
      "молоко",
      "сливочное масло",
      "масло",
      "сахар",
      "мука",
      "разрыхлитель",
      "меренга",
      "белок",
      "белки",
      "лимонная кислота",
      "крем",
      "желтки",
      "крахмал",
      "кукурузный крахмал",
      "сливки",
      "ваниль",
      "миндальные лепестки",
      "орехи"
    ]
  },
  {
    "id": "tort-assorti",
    "title": "Торт «Ассорти»",
    "category": "Торты и десерты",
    "description": "Три разных коржа в одном срезе: ореховое безе с фундуком, песочный корж и шоколадный бисквит. Между ними крем шарлотт на сгущёнке и заварных желтках, сверху сливовая начинка на пектине, бока — в крошке безе.",
    "time": "~16 ч (активное 2 ч 30 мин)",
    "timeMinutes": 960,
    "servings": "10 порций (торт Ø18 см, ~2 кг)",
    "difficulty": "Сложная",
    "image": "assets/images/tort-assorti.jpg",
    "url": "recipes/tort-assorti.html",
    "ingredients": [
      "торт",
      "безе",
      "фундук",
      "орехи",
      "песочное тесто",
      "крем шарлотт",
      "сгущёнка",
      "слива",
      "шоколадный бисквит"
    ]
  },
  {
    "id": "tort-kreshchatyi-yar",
    "title": "Торт «Крещатый Яр»",
    "category": "Торты и десерты",
    "description": "Высокий торт Ø20 см с двумя кремами: сметанным и масло-сгущёнкой. Шоколадный бисквит и шесть песочных коржей с меренгой и грецким орехом, чернослив в прослойке, разлом с M&M и золотой кандурин.",
    "time": "~20 ч (активное 3 ч)",
    "timeMinutes": 1200,
    "servings": "12 порций (торт Ø20 см, 3,5 кг)",
    "difficulty": "Сложная",
    "image": "assets/images/tort-kreshchatyi-yar.jpg",
    "url": "recipes/tort-kreshchatyi-yar.html",
    "ingredients": [
      "торт",
      "шоколадный бисквит",
      "меренга",
      "песочные коржи",
      "сметанный крем",
      "сгущёнка",
      "чернослив",
      "грецкий орех"
    ]
  },
  {
    "id": "tort-leningradskiy",
    "title": "Торт «Ленинградский»",
    "category": "Торты и десерты",
    "description": "Квадратный песочный торт 20×20 см из четырёх коржей с миндальной мукой, шоколадный крем шарлотт на заварной основе с коньяком, сахарная помадка двух оттенков и глазурь гурмэ из молочного шоколада с орехами.",
    "time": "~6 ч (активное 1 ч 30 мин)",
    "timeMinutes": 360,
    "servings": "12 порций (торт 20×20 см)",
    "difficulty": "Средняя",
    "image": "assets/images/tort-leningradskiy.jpg",
    "url": "recipes/tort-leningradskiy.html",
    "ingredients": [
      "торт",
      "песочный торт",
      "миндальная мука",
      "крем шарлотт",
      "сахарная помадка",
      "молочный шоколад",
      "коньяк"
    ]
  },
  {
    "id": "tort-mozhno-vsem",
    "title": "Торт «Можно всем» без сахара и глютена",
    "category": "Торты и десерты",
    "description": "Шоколадный торт без сахара и белой муки: коржи на миндальной и фундучной муке, крем и выравнивание — шоколадный ганаш на шоколаде без сахара, между слоями клубничная пропитка и начинка. Сверху шоколадные подтёки и свежая клубника.",
    "time": "~14 ч (активное 1 ч 30 мин)",
    "timeMinutes": 840,
    "servings": "8 порций (торт Ø16 см)",
    "difficulty": "Средняя",
    "image": "assets/images/tort-mozhno-vsem.jpg",
    "url": "recipes/tort-mozhno-vsem.html",
    "ingredients": [
      "торт",
      "без сахара",
      "без глютена",
      "шоколад",
      "ганаш",
      "клубника",
      "миндальная мука",
      "фундук"
    ]
  },
  {
    "id": "tort-moskva",
    "title": "Торт «Москва» с красной зеркальной глазурью",
    "category": "Торты и десерты",
    "description": "Ореховый торт с четырьмя хрустящими декуазами Ø20 см на меренге 1:1 и жареном фундуке, кремом из варёной сгущёнки с маслом и ореховой крошкой и красной зеркальной глазурью на желатине. По вкусу ближе всего к «эстерхази».",
    "time": "~20 ч (активное 2 ч)",
    "timeMinutes": 1200,
    "servings": "10 порций (торт Ø20 см)",
    "difficulty": "Сложная",
    "image": "assets/images/tort-moskva.jpg",
    "url": "recipes/tort-moskva.html",
    "ingredients": [
      "торт",
      "фундук",
      "декуаз",
      "меренга",
      "сгущёнка",
      "зеркальная глазурь",
      "коньяк",
      "орехи"
    ]
  },
  {
    "id": "tort-novogodnee-chudo",
    "title": "Торт «Новогоднее чудо» в виде ёлки",
    "category": "Торты и десерты",
    "description": "Торт-конструктор из четырёх рулетов: тонкие карамельные коржи, сметанный крем с белым шоколадом, начинка из чернослива, кураги и грецкого ореха. Ярусы складываются пирамидой без внутренней опоры и декорируются зелёными «иголками» насадкой №70.",
    "time": "~12 ч (активное 2 ч)",
    "timeMinutes": 720,
    "servings": "12 порций (4 яруса Ø17–8 см)",
    "difficulty": "Сложная",
    "image": "assets/images/tort-novogodnee-chudo.jpg",
    "url": "recipes/tort-novogodnee-chudo.html",
    "ingredients": [
      "торт",
      "рулет",
      "карамель",
      "сметана",
      "чернослив",
      "курага",
      "грецкий орех",
      "творожный сыр"
    ]
  },
  {
    "id": "tort-polet",
    "title": "Торт «Полёт»",
    "category": "Торты и десерты",
    "description": "Три хрустящих коржа-безе на арахисе, крем «Шарлот» на масле 82,5% и пирожные-полусферы с грецким орехом и черносливом. Кукурузный крахмал в меренге помогает коржам пропечься в домашней духовке.",
    "time": "~6 ч (активное 1 ч 30 мин)",
    "timeMinutes": 360,
    "servings": "10 порций (торт Ø18 см из 3 коржей + пирожные)",
    "difficulty": "Средняя",
    "image": "assets/images/tort-polet.jpg",
    "url": "recipes/tort-polet.html",
    "ingredients": [
      "торт",
      "безе",
      "меренга",
      "арахис",
      "орехи",
      "шарлот",
      "грецкий орех",
      "чернослив"
    ]
  },
  {
    "id": "tort-tsvetaevskiy-pirog",
    "title": "Цветаевский пирог с яблоками",
    "category": "Выпечка",
    "description": "Песочная основа из холодного масла и холодной сметаны, слой яблок и сметанная заливка с кукурузным крахмалом. Тесто не вымешивают — только собирают крошку в комок, поэтому основа получается слоистой.",
    "time": "~2 ч (активное 40 мин)",
    "timeMinutes": 120,
    "servings": "8 порций (пирог Ø20 см)",
    "difficulty": "Легкая",
    "image": "assets/images/tort-tsvetaevskiy-pirog.jpg",
    "url": "recipes/tort-tsvetaevskiy-pirog.html",
    "ingredients": [
      "пирог",
      "цветаевский",
      "яблоки",
      "сметана",
      "песочное тесто",
      "заливка"
    ]
  },
  {
    "id": "tort-chernichnyy",
    "title": "Черничный торт-рулет с маскарпоне",
    "category": "Торты и десерты",
    "description": "Миндальный бисквит без муки, свёрнутый рулетом с черничным соусом и кремом на маскарпоне; в разрезе видна ягодная спираль. Из этой же базы отдельно собирается рулет с черничным муссом.",
    "time": "~8 ч (активное 1 ч 40 мин)",
    "timeMinutes": 480,
    "servings": "12 порций (торт-рулет высотой ~10 см)",
    "difficulty": "Сложная",
    "image": "assets/images/tort-chernichnyy.jpg",
    "url": "recipes/tort-chernichnyy.html",
    "ingredients": [
      "торт",
      "рулет",
      "черника",
      "маскарпоне",
      "бисквит",
      "миндальная мука",
      "желатин"
    ]
  },
  {
    "id": "tort-migel",
    "title": "Торт «Мигель» песочный",
    "category": "Торты и десерты",
    "description": "Высокий песочный торт Ø18 см: семь светлых и шоколадных коржей, плотный творожно-сметанный крем, сливово-ежевичный соус. Снаружи крем-чиз, сиреневые мазки, рисовые слайсы с золотом и свежий инжир.",
    "time": "2 дня (активное ~4 ч)",
    "timeMinutes": 2880,
    "servings": "12 порций (торт Ø18 см, ~3 кг)",
    "difficulty": "Сложная",
    "image": "assets/images/tort-migel.jpg",
    "url": "recipes/tort-migel.html",
    "ingredients": [
      "торт",
      "песочный торт",
      "творог",
      "маскарпоне",
      "сметана",
      "слива",
      "ежевика",
      "рисовая бумага",
      "инжир"
    ]
  },
  {
    "id": "rulet-s-tvorogom",
    "title": "Рулет-вертута с творогом",
    "category": "Выпечка",
    "description": "Дрожжевое тесто со сметаной, тонкий пласт 40×50 см, творожная начинка с ванилью и улитка, испечённая в кольце. Тесто рассчитано так, чтобы на один рулет уходило 500 г.",
    "time": "~3 ч (активное 40 мин)",
    "timeMinutes": 180,
    "servings": "8 порций (1 рулет ~950 г)",
    "difficulty": "Средняя",
    "image": "assets/images/rulet-s-tvorogom.jpg",
    "url": "recipes/rulet-s-tvorogom.html",
    "ingredients": [
      "рулет",
      "вертута",
      "творог",
      "дрожжевое тесто",
      "сметана",
      "выпечка",
      "улитка"
    ]
  },
  {
    "id": "babka-sochnaya-bulka",
    "title": "Бабка сочная булка",
    "category": "Выпечка",
    "description": "Пышная дрожжевая бабка-завиванец на опаре: бриошевое тесто с апельсиновой цедрой, начинки — грильяж, клубника, мак или шоколад. После выпечки пропитывается ромовым сиропом.",
    "time": "~5–6 ч (активное 2 ч)",
    "timeMinutes": 330,
    "servings": "4 бабки (24 куска)",
    "difficulty": "Сложная",
    "image": "assets/images/babka-sochnaya-bulka.jpg",
    "url": "recipes/babka-sochnaya-bulka.html",
    "ingredients": [
      "бабка",
      "завиванец",
      "дрожжевое тесто",
      "бриошь",
      "грильяж",
      "клубника",
      "мак",
      "шоколад",
      "ром",
      "апельсин"
    ]
  },
  {
    "id": "biskvit-klassicheskiy",
    "title": "Классический бисквит",
    "category": "Торты и десерты",
    "description": "База для тортов на пяти яйцах: только яйца, сахар и мука, без разрыхлителя. Выпечка при 180 °C без конвекции 30–35 минут и созревание в холодильнике 6 часов. Плюс пропитка и два крема.",
    "time": "~7–8 ч (активное 40 мин)",
    "timeMinutes": 450,
    "servings": "8 порций (бисквит Ø18–20 см, ~450 г)",
    "difficulty": "Средняя",
    "image": "assets/images/biskvit-klassicheskiy.jpg",
    "url": "recipes/biskvit-klassicheskiy.html",
    "ingredients": [
      "бисквит",
      "корж",
      "яйца",
      "сахар",
      "мука",
      "пропитка",
      "крем",
      "творожный сыр",
      "маскарпоне",
      "сливки"
    ]
  },
  {
    "id": "biskvit-korolevy-viktorii",
    "title": "Бисквит королевы Виктории",
    "category": "Торты и десерты",
    "description": "Шоколадный кексовый бисквит на четырёх коржах Ø20 см: масло, тёмный шоколад, какао и сливки. Белки отделять не нужно, тесто ждёт до часа, выпечка при 180 °C: 23 минуты по коржам или 30 минут в двух формах.",
    "time": "~2 ч (активное 40 мин)",
    "timeMinutes": 120,
    "servings": "8 порций (4 коржа Ø20 см)",
    "difficulty": "Легкая",
    "image": "assets/images/biskvit-korolevy-viktorii.jpg",
    "url": "recipes/biskvit-korolevy-viktorii.html",
    "ingredients": [
      "бисквит",
      "виктория",
      "шоколад",
      "какао",
      "масло",
      "сливки",
      "корж",
      "разрыхлитель"
    ]
  },
  {
    "id": "nachinki-yagodno-fruktovye",
    "title": "Начинки ягодно-фруктовые",
    "category": "Торты и десерты",
    "description": "Три начинки для тортов: слива с черносливом на пектине, инжир с обжаренной клубникой и вишня с бобом тонка на крахмале и желатине. Держат форму в разрезе и хорошо переносят заморозку.",
    "time": "~1 ч (активное 30 мин)",
    "timeMinutes": 60,
    "servings": "3 начинки на слой торта",
    "difficulty": "Средняя",
    "image": "assets/images/nachinki-yagodno-fruktovye.jpg",
    "url": "recipes/nachinki-yagodno-fruktovye.html",
    "ingredients": [
      "начинка",
      "слива",
      "чернослив",
      "инжир",
      "клубника",
      "вишня",
      "пектин",
      "желатин",
      "боб тонка"
    ]
  },
  {
    "id": "verrin-lesnye-yagody",
    "title": "Веррин лесные ягоды",
    "category": "Торты и десерты",
    "description": "Десерт в стаканчике из трёх слоёв: хрустящая ореховая крошка с апельсиновой цедрой, ягодное конфи на яблочном пектине и сливочный мусс на заварной основе с семенами чиа. Слои повторяются дважды.",
    "time": "~4 ч (активное 1 ч)",
    "timeMinutes": 240,
    "servings": "10 порций (стаканчики 230–250 г)",
    "difficulty": "Средняя",
    "image": "assets/images/verrin-lesnye-yagody.jpg",
    "url": "recipes/verrin-lesnye-yagody.html",
    "ingredients": [
      "веррин",
      "лесные ягоды",
      "смородина",
      "малина",
      "черника",
      "ежевика",
      "пектин",
      "чиа",
      "мусс",
      "десерт в стакане"
    ]
  },
  {
    "id": "griby-iz-zefira",
    "title": "Грибы из зефира",
    "category": "Конфеты и сладости",
    "description": "Яблочный зефир на агаре, отсаженный грибами: конусные ножки и круглые шляпки. Сироп до 110 °C, стабилизация 2–4 часа, декор какао и маком под лесную землю.",
    "time": "~4 ч (активное 40 мин)",
    "timeMinutes": 240,
    "servings": "~25 грибочков",
    "difficulty": "Средняя",
    "image": "assets/images/griby-iz-zefira.jpg",
    "url": "recipes/griby-iz-zefira.html",
    "ingredients": [
      "зефир",
      "грибы из зефира",
      "агар",
      "яблочное пюре",
      "белок",
      "какао",
      "мак",
      "конфеты"
    ]
  },
  {
    "id": "zefir-v-shokolade",
    "title": "Зефир в шоколаде",
    "category": "Конфеты и сладости",
    "description": "Домашний зефир на агаре с яблочно-смородиновым пюре: меренга, сироп до 105 °C, отсадка, обваливание в пудре с кукурузным крахмалом и глазировка тёмным шоколадом с какао-маслом по упрощённой схеме с «посевом».",
    "time": "~7–8 ч (активное ~1 ч 30 мин)",
    "timeMinutes": 450,
    "servings": "≈30 зефирок Ø 4–5 см",
    "difficulty": "Сложная",
    "image": "assets/images/zefir-v-shokolade.jpg",
    "url": "recipes/zefir-v-shokolade.html",
    "ingredients": [
      "зефир",
      "зефир в шоколаде",
      "агар",
      "агар-агар",
      "шоколад",
      "тёмный шоколад",
      "какао-масло",
      "чёрная смородина",
      "смородина",
      "яблоко",
      "яблочное пюре",
      "пюре",
      "пектин",
      "белок",
      "белки",
      "яйца",
      "сахарная пудра",
      "кукурузный крахмал",
      "крахмал",
      "сироп глюкозы",
      "конфеты"
    ]
  },
  {
    "id": "kapkeyki-6-vidov",
    "title": "Капкейки 6 видов за один замес",
    "category": "Выпечка",
    "description": "Одно масляно-яичное тесто и шесть вкусов: кокос, брусника с маком, фисташка-малина, орехи, лимон с имбирём и ваниль, а шоколадный вариант — отдельным замесом. Сверху крем на маскарпоне, внутри цитрусовый курд.",
    "time": "~2 ч (активное 50 мин)",
    "timeMinutes": 120,
    "servings": "10 капкейков одного вкуса (капсулы 4×5 см)",
    "difficulty": "Средняя",
    "image": "assets/images/kapkeyki-6-vidov.jpg",
    "url": "recipes/kapkeyki-6-vidov.html",
    "ingredients": [
      "капкейки",
      "капкейк",
      "маскарпоне",
      "творожный сыр",
      "сливочное масло",
      "масло",
      "мука",
      "мука пшеничная",
      "сахар",
      "сахарная пудра",
      "яйца",
      "сливки",
      "кокос",
      "кокосовая стружка",
      "брусника",
      "мак",
      "фисташка",
      "фисташковая паста",
      "орехи",
      "лимон",
      "цедра",
      "имбирь",
      "ваниль",
      "какао",
      "курд",
      "крем"
    ]
  },
  {
    "id": "kapkeyki-orehovye",
    "title": "Ореховые капкейки с вишней",
    "category": "Выпечка",
    "description": "Кексовое тесто на масле 82,5% с обжаренными орехами, вишнёвая начинка-соус на кукурузном крахмале и стабильный крем без сливочного масла на творожном сыре и маскарпоне. Шапочки трёх цветов отсадкой из трёх мешков.",
    "time": "~1 ч 50 мин (активное 50 мин)",
    "timeMinutes": 110,
    "servings": "10 капкейков (капсулы 4×5 см)",
    "difficulty": "Средняя",
    "image": "assets/images/kapkeyki-orehovye.jpg",
    "url": "recipes/kapkeyki-orehovye.html",
    "ingredients": [
      "капкейки",
      "капкейк",
      "орехи",
      "грецкий орех",
      "фундук",
      "миндаль",
      "кешью",
      "маскарпоне",
      "творожный сыр",
      "крем",
      "сливочное масло",
      "масло",
      "мука",
      "мука пшеничная",
      "сахар",
      "сахарная пудра",
      "яйца",
      "сливки",
      "вишня",
      "крахмал",
      "кукурузный крахмал",
      "начинка",
      "коньяк"
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

  renderChipCounts();
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

// Счётчики карточек на чипах категорий
function renderChipCounts() {
  document.querySelectorAll('.chip[data-category]').forEach(chip => {
    const category = chip.dataset.category;
    const count = category === 'all'
      ? allRecipes.length
      : allRecipes.filter(r => r.category === category).length;

    let badge = chip.querySelector('.chip-count');
    if (!badge) {
      badge = document.createElement('span');
      badge.className = 'chip-count';
      chip.appendChild(badge);
    }
    badge.textContent = count;
  });
}

// Вес сложности для сортировки
function difficultyWeight(recipe) {
  const value = (recipe.difficulty || '').toLowerCase();
  if (value.startsWith('легк')) return 1;
  if (value.startsWith('средн')) return 2;
  if (value.startsWith('сложн')) return 3;
  return 4;
}

// Три звезды сложности: закрашены по уровню (легкая — 1, средняя — 2, сложная — 3)
function difficultyStars(value) {
  const v = (value || '').toLowerCase();
  const filled = v.startsWith('средн') ? 2 : v.startsWith('сложн') ? 3 : 1;
  let html = '';
  for (let i = 1; i <= 3; i++) {
    html += `<span class="meta-star ${i <= filled ? 'on' : 'off'}">★</span>`;
  }
  return html;
}

// Часы (контурная иконка в стиле скриншота)
function clockIcon() {
  return '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>';
}

// Вилка и ложка (контурная иконка без тарелки)
function cutleryIcon() {
  return '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M7 2v8M11 2v8M9 2v10M9 12v10"/><path d="M17 3c-1.7 0-3 1.8-3 3.5S15.3 10 17 10s3-1.8 3-3.5S18.7 3 17 3Z"/><path d="M17 10v12"/></svg>';
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
  } else if (currentSort === 'difficulty-asc') {
    filtered.sort((a, b) => difficultyWeight(a) - difficultyWeight(b) || a.title.localeCompare(b.title, 'ru'));
  } else if (currentSort === 'difficulty-desc') {
    filtered.sort((a, b) => difficultyWeight(b) - difficultyWeight(a) || a.title.localeCompare(b.title, 'ru'));
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
            <span class="meta-icon">${clockIcon()}</span>
            <span class="meta-text">${recipe.time}</span>
          </div>
          <div class="meta-row meta-row-bottom">
            <div class="meta-item meta-servings">
              <span class="meta-icon">${cutleryIcon()}</span>
              <span class="meta-text">${recipe.servings}</span>
            </div>
            <div class="meta-item meta-difficulty">
              <span class="meta-difficulty-stars">${difficultyStars(recipe.difficulty)}</span>
              <span class="meta-text">${recipe.difficulty}</span>
            </div>
          </div>
        </div>
      </div>
    </article>
  `).join('');
}
