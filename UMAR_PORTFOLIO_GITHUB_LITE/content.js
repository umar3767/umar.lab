/* ============================================================
   ИЗМЕНЯТЬ ЗДЕСЬ — весь редактируемый контент сайта.
   Пустые значения не выдумываются: пустой контакт скрывается,
   пустой список отзывов скрывает секцию, пустой список проектов
   показывает честное пустое состояние.
   ============================================================ */
window.SITE_CONTENT = {
  localeDefault: 'en',

  contacts: {
    telegram: '',          // например: 'https://t.me/username'
    phone: '',             // например: '+10000000000'
    formspreeEndpoint: ''  // например: 'https://formspree.io/f/xxxxxxxx'
  },

  // Проекты: открываются по liveUrl (живой сайт) в новой вкладке.
  // { id:'my-site', title:'My Site', category:{en:'Website',ru:'Сайт'}, year:'2026', liveUrl:'https://USER.github.io/REPO/' }
  projects: [],

  // Только НАСТОЯЩИЕ отзывы. Пустой массив = секция скрыта.
  // { id:'t1', rating:5, text:{en:'...',ru:'...'} }
  testimonials: [],

  about: {
    name: 'Umar',
    text: {
      en: 'Placeholder text — replace with your own. I design and build websites, visuals and small tools, with a focus on clear structure and clean details.',
      ru: 'Демонстрационный текст — замените своим. Я делаю сайты, визуальные материалы и небольшие инструменты — с упором на ясную структуру и аккуратные детали.'
    },
    skills: {
      en: ['Web development', 'Graphic design', 'Typography', 'Video editing', 'Telegram bots'],
      ru: ['Веб-разработка', 'Графический дизайн', 'Типографика', 'Монтаж видео', 'Telegram-боты']
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
      contactTitle: "LET'S MAKE SOMETHING GREAT.", contactText: 'Tell me about your project — I will reply by email.',
      telegram: 'Telegram', phone: 'Phone',
      name: 'Name', email: 'Email', message: 'Message', send: 'Send Message', sending: 'Sending…',
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
      contactTitle: 'ДАВАЙ СОЗДАДИМ ЧТО-ТО КРУТОЕ.', contactText: 'Расскажите о проекте — отвечу по почте.',
      telegram: 'Telegram', phone: 'Телефон',
      name: 'Имя', email: 'Email', message: 'Сообщение', send: 'Отправить', sending: 'Отправка…',
      errName: 'Введите имя.', errEmail: 'Введите корректный email.', errMsg: 'Напишите сообщение (до 3000 символов).',
      success: 'Сообщение отправлено. Спасибо!', errNet: 'Не удалось отправить. Проверьте соединение и повторите.',
      errServer: 'Сервис отклонил сообщение. Попробуйте ещё раз.', errSetup: 'Отправка ещё не настроена: добавьте endpoint Formspree в content.js.',
      footNav: 'Навигация в подвале', top: 'Наверх ↑', rights: 'Все права защищены.'
    }
  }
};
