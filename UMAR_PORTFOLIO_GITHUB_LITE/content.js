/* ============================================================
   ИЗМЕНЯТЬ ЗДЕСЬ — весь редактируемый контент сайта.
   Пустые значения не выдумываются: пустой контакт скрывается,
   пустой список отзывов скрывает секцию, пустой список проектов
   показывает честное пустое состояние.
   ============================================================ */
window.SITE_CONTENT = {
  localeDefault: 'en',

  contacts: {
    telegram: 'https://t.me/Pac1fik01',
    phone: '+998975591991',
    whatsapp: 'https://wa.me/998975591991',
    // Create a Formspree form and paste its public endpoint here to activate email submissions.
    formspreeEndpoint: 'https://formspree.io/f/xyekqwon'
  },

  // Проекты: открываются по liveUrl (живой сайт) в новой вкладке.
  // { id:'my-site', title:'Website Type', art:'dental', category:{en:'Short description',ru:'Краткое описание'}, year:'2026', liveUrl:'https://USER.github.io/REPO/' }
  projects: [
    { id: 'vela-dent', title: 'Dental Clinic', art: 'dental', category: { en: 'Gentle care. Confident smiles.', ru: 'Забота о здоровье и красоте улыбки.' }, year: '2026', liveUrl: 'https://umar3767.github.io/business-websites-10/01-dental/' },
    { id: 'march-09', title: 'Barbershop', art: 'barbershop', category: { en: 'Sharp cuts. Timeless style.', ru: 'Стрижки с характером и вниманием к деталям.' }, year: '2026', liveUrl: 'https://umar3767.github.io/business-websites-10/02-barbershop/' },
    { id: 'muse-atelier', title: 'Beauty Studio', art: 'beauty', category: { en: 'A little beauty in every detail.', ru: 'Красота в каждой детали.' }, year: '2026', liveUrl: 'https://umar3767.github.io/business-websites-10/03-beauty-salon/' },
    { id: 'noir-auto', title: 'Car Detailing', art: 'detailing', category: { en: 'Every finish deserves perfection.', ru: 'Безупречный уход за автомобилем.' }, year: '2026', liveUrl: 'https://umar3767.github.io/business-websites-10/04-car-detailing/' },
    { id: 'loop-academy', title: 'Learning Center', art: 'education', category: { en: 'A brighter way to learn.', ru: 'Современный подход к обучению.' }, year: '2026', liveUrl: 'https://umar3767.github.io/business-websites-10/05-learning-center/' },
    { id: 'hush-home', title: 'Cleaning Service', art: 'cleaning', category: { en: 'Fresh spaces. Clear minds.', ru: 'Чистота, в которую хочется вернуться.' }, year: '2026', liveUrl: 'https://umar3767.github.io/business-websites-10/06-cleaning/' },
    { id: 'torq-works', title: 'Auto Repair', art: 'auto-repair', category: { en: 'Expert care for every mile.', ru: 'Надёжный сервис для каждого маршрута.' }, year: '2026', liveUrl: 'https://umar3767.github.io/business-websites-10/07-auto-service/' },
    { id: 'forme-objects', title: 'Furniture Studio', art: 'furniture', category: { en: 'Comfort shaped by design.', ru: 'Удобство, воплощённое в дизайне.' }, year: '2026', liveUrl: 'https://umar3767.github.io/business-websites-10/08-furniture/' },
    { id: 'strata-rooms', title: 'Home Renovation', art: 'renovation', category: { en: 'Better spaces, thoughtfully made.', ru: 'Продуманные перемены для вашего дома.' }, year: '2026', liveUrl: 'https://umar3767.github.io/business-websites-10/09-renovation/' },
    { id: 'petal-parade', title: 'Flower Shop', art: 'flowers', category: { en: 'Flowers for every meaningful moment.', ru: 'Цветы для особенных моментов.' }, year: '2026', liveUrl: 'https://umar3767.github.io/business-websites-10/10-flower-shop/' }
  ],

  // Только НАСТОЯЩИЕ отзывы. Пустой массив = секция скрыта.
  // { id:'t1', rating:5, text:{en:'...',ru:'...'} }
  testimonials: [
    {
      "id": "review-01",
      "rating": 5,
      "category": {
        "en": "Presentation",
        "ru": "Презентация"
      },
      "text": {
        "en": "I urgently needed a presentation and had no time to make it myself. I sent over the text and roughly explained what I wanted. It turned out even better than I had imagined. Thank you so much!",
        "ru": "Нужно было срочно сделать презентацию, сам вообще не успевал. Скинул текст и примерно объяснил, что хочу. В итоге получилось даже лучше, чем представлял. Спасибо большое!"
      }
    },
    {
      "id": "review-02",
      "rating": 5,
      "category": {
        "en": "Website",
        "ru": "Сайт"
      },
      "text": {
        "en": "I ordered a small website for my project. Everything came out clean, with nothing unnecessary. It works well on my phone too. I'm happy with the result.",
        "ru": "Заказывал небольшой сайт для своего проекта. Всё получилось аккуратно, ничего лишнего. На телефоне тоже нормально открывается. Результатом доволен."
      }
    },
    {
      "id": "review-03",
      "rating": 5,
      "category": {
        "en": "Logo",
        "ru": "Логотип"
      },
      "text": {
        "en": "Honestly, at first I didn't even know what kind of logo I wanted 😅 I explained the idea in my own words, and they understood me. After a couple of small changes, it was exactly what I needed.",
        "ru": "Честно, сначала сам не понимал, какой логотип хочу 😅 Объяснил идею своими словами, и меня поняли. После пары небольших изменений получилось именно то, что нужно."
      }
    },
    {
      "id": "review-04",
      "rating": 4,
      "category": {
        "en": "Infographics",
        "ru": "Инфографика"
      },
      "text": {
        "en": "Overall, I liked it. The information is much easier to understand than it was in my document. We had to adjust the colors a little, but that was fixed quickly.",
        "ru": "В целом всё понравилось. Информация теперь выглядит намного понятнее, чем была у меня в документе. Немного пришлось поменять цвета, но это быстро исправили."
      }
    },
    {
      "id": "review-05",
      "rating": 5,
      "category": {
        "en": "Presentation",
        "ru": "Презентация"
      },
      "text": {
        "en": "This is my second time asking for a presentation. I like that the slides aren't overloaded with text and everything looks modern. This time was great too.",
        "ru": "Уже второй раз обращаюсь за презентацией. Нравится, что слайды не перегружены текстом и всё выглядит современно. В этот раз тоже не подвёл."
      }
    },
    {
      "id": "review-06",
      "rating": 5,
      "category": {
        "en": "Website",
        "ru": "Сайт"
      },
      "text": {
        "en": "I spent a long time looking for someone who could build a website without making things complicated. We talked through the details, I showed some examples, and got the finished result. Special thanks for taking my preferences into account.",
        "ru": "Долго искал человека, который сможет сделать сайт без всяких сложностей. Обсудили детали, показал примеры и получил готовый результат. Отдельное спасибо за то, что учёл мои пожелания."
      }
    },
    {
      "id": "review-07",
      "rating": 5,
      "category": {
        "en": "Infographics",
        "ru": "Инфографика"
      },
      "text": {
        "en": "I sent a basic table full of information and received beautiful, easy-to-understand visuals. Now I don't have to spend half an hour explaining where everything is 😂 I loved it.",
        "ru": "Я отправила обычную таблицу с кучей информации, а получила красивые и понятные картинки. Теперь хотя бы не нужно полчаса объяснять, что где находится 😂 Очень понравилось."
      }
    },
    {
      "id": "review-08",
      "rating": 4,
      "category": {
        "en": "Logo",
        "ru": "Логотип"
      },
      "text": {
        "en": "Good work for the price. The first version wasn't quite my style, but I liked the second one. Communication was easy, and all my changes were taken into account.",
        "ru": "Хорошая работа за свои деньги. Первый вариант немного не подошёл по стилю, зато второй уже понравился. Общаться было легко, все правки учли."
      }
    },
    {
      "id": "review-09",
      "rating": 5,
      "category": {
        "en": "Presentation",
        "ru": "Презентация"
      },
      "text": {
        "en": "I needed a presentation for a talk and didn't have much time. Everything was done neatly and on schedule. I especially liked the fonts and slide design — it genuinely looks great.",
        "ru": "Мне нужна была презентация для выступления, причём времени оставалось мало. Всё сделали аккуратно и вовремя. Особенно понравились шрифты и оформление слайдов, смотрится реально красиво."
      }
    },
    {
      "id": "review-10",
      "rating": 5,
      "category": {
        "en": "Website",
        "ru": "Сайт"
      },
      "text": {
        "en": "I didn't expect the website to look this good. I especially liked the animations and how everything looks on a phone. I showed my friends, and they loved it too. Thanks for the work!",
        "ru": "Не ожидал, что сайт получится настолько приятным визуально. Особенно понравились анимации и то, как всё выглядит на телефоне. Показал друзьям, им тоже зашло. Спасибо за работу!"
      }
    }
  ],

  about: {
    name: 'Umar',
    text: {
      en: "My name is Umar, I'm 15 years old, and I live in Uzbekistan. I enjoy learning new things, exploring creative ideas, and constantly improving myself. In my free time, I enjoy playing football and exploring modern technology. I like setting goals and working towards achieving them.",
      ru: 'Меня зовут Умар, мне 15 лет, я живу в Узбекистане. Я люблю узнавать новое, пробовать необычные идеи и постоянно развиваться. В свободное время увлекаюсь футболом и интересуюсь современными технологиями. Мне нравится ставить перед собой цели и постепенно добиваться их.'
    },
    skills: {
      en: ['Web Development & UI/UX', 'Graphic Design & Branding', 'AI Tools & Telegram Bots', 'Presentations & Infographics', 'Video Editing'],
      ru: ['Веб-разработка и дизайн интерфейсов', 'Графический дизайн и брендинг', 'ИИ-инструменты и Telegram-боты', 'Презентации и инфографика', 'Видеомонтаж']
    }
  },

  // Пять направлений; все 10 исходных услуг сохранены в items.
  services: [
    {
      "id": "websites-redesign",
      "en": [
        "Websites & Redesign",
        "New websites and thoughtful updates to existing designs."
      ],
      "ru": [
        "Сайты и редизайн",
        "Создание сайтов и продуманное обновление существующего дизайна."
      ],
      "items": [
        {
          "en": [
            "Website Creation",
            "Fast, clear websites that work on every screen."
          ],
          "ru": [
            "Создание сайтов",
            "Быстрые и понятные сайты для любого экрана."
          ]
        },
        {
          "en": [
            "Design Refresh",
            "A fresh look for something that already exists."
          ],
          "ru": [
            "Обновление дизайна",
            "Свежий вид для уже существующего проекта."
          ]
        }
      ]
    },
    {
      "id": "branding-graphic-design",
      "en": [
        "Branding & Graphic Design",
        "Logos and visual materials with a consistent identity."
      ],
      "ru": [
        "Брендинг и графический дизайн",
        "Логотипы и визуальные материалы в едином стиле."
      ],
      "items": [
        {
          "en": [
            "Graphic Design",
            "Visual materials with a consistent look."
          ],
          "ru": [
            "Графический дизайн",
            "Визуальные материалы в едином стиле."
          ]
        },
        {
          "en": [
            "Logo Design",
            "A simple, memorable mark for your brand."
          ],
          "ru": [
            "Логотипы",
            "Простой запоминающийся знак для вашего бренда."
          ]
        },
        {
          "en": [
            "Social Media Design",
            "Posts and covers that look like one family."
          ],
          "ru": [
            "Дизайн для соцсетей",
            "Посты и обложки в одном стиле."
          ]
        }
      ]
    },
    {
      "id": "presentations-documents",
      "en": [
        "Presentations & Documents",
        "Clear presentations, infographics and well-structured documents."
      ],
      "ru": [
        "Презентации и документы",
        "Понятные презентации, инфографика и аккуратно оформленные документы."
      ],
      "items": [
        {
          "en": [
            "Presentations",
            "Clean slides that make your point easy to follow."
          ],
          "ru": [
            "Презентации",
            "Чистые слайды, которые легко понять."
          ]
        },
        {
          "en": [
            "Infographics",
            "Complex information turned into one clear picture."
          ],
          "ru": [
            "Инфографика",
            "Сложная информация в одной понятной картинке."
          ]
        },
        {
          "en": [
            "Document Design & Formatting",
            "Tidy, consistent, ready-to-send documents."
          ],
          "ru": [
            "Оформление документов",
            "Аккуратные документы, готовые к отправке."
          ]
        }
      ]
    },
    {
      "id": "telegram-bots",
      "en": [
        "Telegram Bots",
        "Practical Telegram bots for orders, answers and reminders."
      ],
      "ru": [
        "Telegram-боты",
        "Практичные Telegram-боты для заказов, ответов и напоминаний."
      ],
      "items": [
        {
          "en": [
            "Telegram Bots",
            "Helpful bots for orders, answers and reminders."
          ],
          "ru": [
            "Telegram-боты",
            "Полезные боты для заказов, ответов и напоминаний."
          ]
        }
      ]
    },
    {
      "id": "video-editing",
      "en": [
        "Video Editing",
        "Editing, pacing and finishing touches for your footage."
      ],
      "ru": [
        "Монтаж видео",
        "Монтаж, ритм и аккуратная обработка ваших видео."
      ],
      "items": [
        {
          "en": [
            "Video Editing",
            "Cutting, pacing and polish for your footage."
          ],
          "ru": [
            "Монтаж видео",
            "Нарезка, ритм и аккуратная обработка ролика."
          ]
        }
      ]
    }
  ],

  ui: {
    en: {
      title: 'Umar Portfolio',
      description: 'Portfolio of Umar — websites, design, video and Telegram bots.',
      skip: 'Skip to content', nav: { works: 'Works', about: 'About', services: 'Services', testimonials: 'Testimonials', contact: 'Contact' },
      menu: 'Menu', closeMenu: 'Close menu', mainNav: 'Main navigation', langSwitch: 'Language', home: 'Umar — home',
      aboutProfileLabel: "PROFILE",
      aboutSkillsLabel: "AREAS OF FOCUS",
      servicesNumberLabel: "NO.",
      servicesDirectionLabel: "DIRECTION",
      servicesScopeLabel: "DESCRIPTION / INCLUDED SERVICES",
      heroSub: 'Design, code & ideas — made to feel alive.', heroEyebrow: 'INDEPENDENT CREATIVE STUDIO', scrollLabel: 'Scroll to projects', scroll: 'Scroll to explore', servicesAside: 'THOUGHTFUL WORK, BUILT TO MATTER.', formHeader: 'A GOOD PROJECT STARTS WITH HELLO. ↗',
      worksTitle: 'SELECTED WORKS', viewAll: 'View All Works ↗', allWorksTitle: 'ALL WORKS', backHome: 'Back to home',
      empty: 'No projects added yet. Add live sites to content.js.', open: 'Open live site', newTab: 'opens in a new tab',
      aboutTitle: 'ABOUT ME', servicesTitle: 'SERVICES', testimonialsTitle: 'TESTIMONIALS', stars: '{n} out of 5 stars',
      contactTitle: "LET'S MAKE SOMETHING GREAT.", contactText: 'Choose the easiest way to reach me — I would love to hear about your project.',
      telegram: 'Telegram', whatsapp: 'WhatsApp', phone: 'Phone',
      name: 'Name', email: 'Email', message: 'Message', send: 'Send Message', sending: 'Sending…',
      formPrivacy: 'Messages are delivered through Formspree. Please do not include passwords or sensitive information.',
      errName: 'Enter your name.', errEmail: 'Enter a valid email address.', errMsg: 'Write a message (up to 3000 characters).',
      success: 'Message sent. Thank you!', errNet: 'Could not send. Check your connection and try again.',
      errServer: 'The service rejected the message. Please try again.', errSetup: 'Sending is not set up yet: add a Formspree endpoint in content.js.',
      footNav: 'Footer navigation', top: 'Back to Top ↑', rights: 'All rights reserved.'
    },
    ru: {
      title: 'Umar Portfolio',
      description: 'Портфолио Umar — сайты, дизайн, видео и Telegram-боты.',
      skip: 'Перейти к содержимому', nav: { works: 'Работы', about: 'Обо мне', services: 'Услуги', testimonials: 'Отзывы', contact: 'Контакты' },
      menu: 'Меню', closeMenu: 'Закрыть меню', mainNav: 'Основная навигация', langSwitch: 'Язык', home: 'Umar — на главную',
      aboutProfileLabel: "ПРОФИЛЬ",
      aboutSkillsLabel: "НАПРАВЛЕНИЯ",
      servicesNumberLabel: "№",
      servicesDirectionLabel: "НАПРАВЛЕНИЕ",
      servicesScopeLabel: "ОПИСАНИЕ / СОСТАВ УСЛУГ",
      heroSub: 'Дизайн, код и идеи, которые оживают.', heroEyebrow: 'НЕЗАВИСИМАЯ ТВОРЧЕСКАЯ СТУДИЯ', scrollLabel: 'Перейти к проектам', scroll: 'Листай вниз', servicesAside: 'ПРОДУМАННАЯ РАБОТА С ХАРАКТЕРОМ.', formHeader: 'ХОРОШИЙ ПРОЕКТ НАЧИНАЕТСЯ С ПРИВЕТА. ↗',
      worksTitle: 'ИЗБРАННЫЕ РАБОТЫ', viewAll: 'Все работы ↗', allWorksTitle: 'ВСЕ РАБОТЫ', backHome: 'На главную',
      empty: 'Проекты пока не добавлены. Добавьте живые сайты в content.js.', open: 'Открыть живой сайт', newTab: 'откроется в новой вкладке',
      aboutTitle: 'ОБО МНЕ', servicesTitle: 'УСЛУГИ', testimonialsTitle: 'ОТЗЫВЫ', stars: '{n} из 5 звёзд',
      contactTitle: 'ДАВАЙ СОЗДАДИМ ЧТО-ТО КРУТОЕ.', contactText: 'Выберите удобный способ связи — буду рад обсудить ваш проект.',
      telegram: 'Telegram', whatsapp: 'WhatsApp', phone: 'Звонок',
      name: 'Имя', email: 'Email', message: 'Сообщение', send: 'Отправить', sending: 'Отправка…',
      formPrivacy: 'Сообщения передаются через Formspree. Не отправляйте пароли и конфиденциальные данные.',
      errName: 'Введите имя.', errEmail: 'Введите корректный email.', errMsg: 'Напишите сообщение (до 3000 символов).',
      success: 'Сообщение отправлено. Спасибо!', errNet: 'Не удалось отправить. Проверьте соединение и повторите.',
      errServer: 'Сервис отклонил сообщение. Попробуйте ещё раз.', errSetup: 'Отправка ещё не настроена: добавьте endpoint Formspree в content.js.',
      footNav: 'Навигация в подвале', top: 'Наверх ↑', rights: 'Все права защищены.'
    }
  }
};
