//  * IZABELE PORTFOLIO - MOBILE FIRST JAVASCRIPT
//  * Modular, accessible, and performance-optimized

// ===== APPLICATION STATE =====
const AppState = {
  currentLang: 'pt',
  currentTheme: 'dark',
  isQuizActive: false,
  currentQuestion: 0,
  userAnswers: [],

  // State management methods
  setState(key, value) {
    this[key] = value;
    this.saveToStorage(key, value);
  },

  saveToStorage(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.warn('Failed to save to localStorage:', error);
    }
  },

  loadFromStorage(key, defaultValue) {
    try {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : defaultValue;
    } catch (error) {
      console.warn('Failed to load from localStorage:', error);
      return defaultValue;
    }
  }
};

// ===== QUIZ DATA =====
const QuizData = {
  questions: [
    {
      id: 1,
      question: {
        pt: "Qual tipo de projeto mais te empolga?",
        en: "What type of project excites you most?"
      },
      options: [
        {
          id: 'a',
          text: { pt: "Apps móveis inovadores", en: "Innovative mobile apps" },
          points: { android: 3, ux: 2, design: 1 }
        },
        {
          id: 'b',
          text: { pt: "Experiências de usuário incríveis", en: "Amazing user experiences" },
          points: { ux: 3, design: 2, android: 1 }
        },
        {
          id: 'c',
          text: { pt: "Identidades visuais marcantes", en: "Striking visual identities" },
          points: { design: 3, ux: 2, android: 1 }
        }
      ]
    },
    {
      id: 2,
      question: {
        pt: "O que mais valoriza numa desenvolvedora?",
        en: "what do you value most in a developer?"
      },
      options: [
        {
          id: 'a',
          text: { pt: "Experiência internacional", en: "International experience" },
          points: { global: 3, ux: 1, android: 1 }
        },
        {
          id: 'b',
          text: { pt: "Conhecimento técnico sólido", en: "Solid technical knowledge" },
          points: { android: 3, ux: 1, design: 1 }
        },
        {
          id: 'c',
          text: { pt: "Visão criativa única", en: "Unique creative vision" },
          points: { design: 3, ux: 2, android: 1 }
        }
      ]
    },
    {
      id: 3,
      question: {
        pt: "Qual desafio mais te preocupa num projeto?",
        en: "What challenge worries you most in a project?"
      },
      options: [
        {
          id: 'a',
          text: { pt: "Performance e otimização", en: "Performance and optimization" },
          points: { android: 3, ux: 1, design: 1 }
        },
        {
          id: 'b',
          text: { pt: "Usabilidade e acessibilidade", en: "Usability and accessibility" },
          points: { ux: 3, android: 2, design: 1 }
        },
        {
          id: 'c',
          text: { pt: "Consistência visual", en: "Visual consistency" },
          points: { design: 3, ux: 2, android: 1 }
        }
      ]
    },
    {
      id: 4,
      question: {
        pt: "Como prefere trabalhar?",
        en: "How do you prefer to work?"
      },
      options: [
        {
          id: 'a',
          text: { pt: "Em equipes multiculturais", en: "In multicultural teams" },
          points: { global: 3, ux: 2, android: 1 }
        },
        {
          id: 'b',
          text: { pt: "Com metodologias ágeis", en: "With agile methodologies" },
          points: { android: 3, ux: 2, design: 1 }
        },
        {
          id: 'c',
          text: { pt: "Com foco no utilizador", en: "With user focus" },
          points: { ux: 3, design: 2, android: 1 }
        }
      ]
    },
    {
      id: 5,
      question: {
        pt: "O que mais impressiona num portfólio?",
        en: "What impresses you most in a portfolio?"
      },
      options: [
        {
          id: 'a',
          text: { pt: "Apps publicados na Play Store", en: "Apps published on Play Store" },
          points: { android: 3, ux: 1, design: 1 }
        },
        {
          id: 'b',
          text: { pt: "Casos de estudo detalhados", en: "Detailed case studies" },
          points: { ux: 3, design: 2, android: 1 }
        },
        {
          id: 'c',
          text: { pt: "Diversidade de projetos", en: "Project diversity" },
          points: { global: 3, design: 2, ux: 1 }
        }
      ]
    }
  ],

  results: {
    android: {
      title: { pt: "A Izabele Desenvolvedora Android", en: "Izabele, Android Developer" },
      description: {
        pt: "Você precisa de alguém que domine Kotlin e as melhores práticas de desenvolvimento Android. Com experiência em apps reais e conhecimento sólido em arquitetura mobile.",
        en: "You need someone who masters Kotlin and Android development best practices. With real app experience and solid knowledge in mobile architecture."
      },
      skills: ["Kotlin", "Android Studio", "UI Responsiva", "GitHub", "Jetpack Compose"],
      cta: { pt: "Ver Projetos Android", en: "View Android Projects" }
    },
    ux: {
      title: { pt: "A Izabele UX/UI Visionária", en: "The Visionary UX/UI Izabele" },
      description: {
        pt: "Você precisa de alguém que entenda profundamente o utilizador e crie experiências memoráveis. Com background em design e visão centrada no humano.",
        en: "You need someone who deeply understands users and creates memorable experiences. With design background and human-centered vision."
      },
      skills: ["User Research", "Prototyping", "Figma", "Design Systems", "Web Design", "Grids & Layouts", "Accessibility", "Hi-Fi Prototypes", "Responsive Design"],
      cta: { pt: "Ver Casos de Estudo", en: "View Case Studies" }
    },
    design: {
      title: { pt: "A Izabele Designer Criativa", en: "The Creative Designer Izabele" },
      description: {
        pt: "Você precisa de alguém com olhar estético apurado e capacidade de criar identidades visuais marcantes. Com formação em Design Gráfico e experiência internacional.",
        en: "You need someone with refined aesthetic eye and ability to create striking visual identities. With Graphic Design background and international experience."
      },
      skills: ["Visual Identity", "Branding", "Typography", "Illustrator", "Photoshop", "After Effects Básico"],
      cta: { pt: "Ver Portfolio Design", en: "View Design Portfolio" }
    },
    global: {
      title: { pt: "A Izabele Profissional Global", en: "The Global Professional Izabele" },
      description: {
        pt: "Você precisa de alguém com experiência internacional e capacidade de trabalhar em contextos multiculturais. Com vivência em 4 países e fluência em inglês.",
        en: "You need someone with international experience and ability to work in multicultural contexts. With experience in 4 countries and English fluency."
      },
      skills: ["Cross-cultural Communication", "Remote Work", "English intermediate", "Adaptability", "Global Perspective", "Multicultural UX"],
      cta: { pt: "Conhecer Minha Jornada", en: "Know My Journey" }
    }
  }
};

// ===== UTILITY FUNCTIONS =====
const Utils = {
  // Debounce function for performance
  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },

  // Throttle function for scroll events
  throttle(func, limit) {
    let inThrottle;
    return function () {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  },

  // Safe DOM query
  $(selector, context = document) {
    return context.querySelector(selector);
  },

  // Safe DOM query all
  $$(selector, context = document) {
    return Array.from(context.querySelectorAll(selector));
  },

  // Add event listener with error handling
  addEvent(element, event, handler, options = {}) {
    if (!element) return;
    try {
      element.addEventListener(event, handler, options);
    } catch (error) {
      console.warn('Failed to add event listener:', error);
    }
  },

  // Remove event listener safely
  removeEvent(element, event, handler, options = {}) {
    if (!element) return;
    try {
      element.removeEventListener(event, handler, options);
    } catch (error) {
      console.warn('Failed to remove event listener:', error);
    }
  },

  // Announce to screen readers
  announceToScreenReader(message) {
    const announcer = Utils.$('#announcer');
    if (announcer) {
      announcer.textContent = message;
      setTimeout(() => {
        announcer.textContent = '';
      }, 1000);
    }
  }
};

// ===== SPLASH SCREEN MODULE =====
const SplashScreen = {
  element: null,
  duration: 2000,

  init() {
    this.element = Utils.$('#splash-screen');
    if (!this.element) return;

    this.show();
    setTimeout(() => this.hide(), this.duration);
  },

  show() {
    if (!this.element) return;
    this.element.classList.remove('hidden');
    this.element.setAttribute('aria-hidden', 'false');
  },

  hide() {
    if (!this.element) return;
    this.element.classList.add('hidden');
    this.element.setAttribute('aria-hidden', 'true');

    // Remove from DOM after animation
    setTimeout(() => {
      if (this.element) {
        this.element.style.display = 'none';
      }
    }, 500);
  }
};

// ===== THEME MODULE ====
const ThemeManager = {
  toggle: null,

  init() {
    this.toggle = Utils.$('.theme-toggle');
    const savedTheme = AppState.loadFromStorage('currentTheme', 'dark');

    AppState.setState('currentTheme', savedTheme);
    this.applyTheme(savedTheme);

    if (this.toggle) {
      Utils.addEvent(this.toggle, 'click', () => this.toggleTheme());
    }
  },

  toggleTheme() {
    const newTheme = AppState.currentTheme === 'dark' ? 'light' : 'dark';
    AppState.setState('currentTheme', newTheme);
    this.applyTheme(newTheme);

    // Announce theme change
    const themeText = newTheme === 'dark' ? 'Dark theme activated' : 'Light theme activated';
    Utils.announceToScreenReader(themeText);
  },

  applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);

    // Add smooth transition
    document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
    setTimeout(() => {
      document.body.style.transition = '';
    }, 300);
  }
};

// ===== LANGUAGE MODULE ====
const LanguageManager = {
  toggle: null,

  init() {
    this.toggle = Utils.$('.language-toggle');
    const savedLang = AppState.loadFromStorage('currentLang', 'pt');

    AppState.setState('currentLang', savedLang);
    this.setLanguage(savedLang);

    if (this.toggle) {
      Utils.addEvent(this.toggle, 'click', () => this.toggleLanguage());
    }
  },

  toggleLanguage() {
    const newLang = AppState.currentLang === 'pt' ? 'en' : 'pt';
    AppState.setState('currentLang', newLang);
    this.setLanguage(newLang);

    // Announce language change
    const langText = newLang === 'pt' ? 'Idioma alterado para português' : 'Language changed to English';
    Utils.announceToScreenReader(langText);
  },

  setLanguage(lang) {
    const elements = Utils.$$("[data-pt][data-en]");

    elements.forEach(element => {
      if (element.hasAttribute(`data-${lang}`)) {
        // Update text content for most elements
        if (!['INPUT', 'TEXTAREA'].includes(element.tagName)) {
          element.textContent = element.getAttribute(`data-${lang}`);
        }

        // Update placeholders for inputs and textareas
        if (['INPUT', 'TEXTAREA'].includes(element.tagName)) {
          element.placeholder = element.getAttribute(`data-${lang}`);
        }
      }
    });

    // Update select options
    const selectOptions = Utils.$$("select option[data-pt][data-en]");
    selectOptions.forEach(option => {
      if (option.hasAttribute(`data-${lang}`)) {
        option.textContent = option.getAttribute(`data-${lang}`);
      }
    });

    // Update language toggle display
    if (this.toggle) {
      const currentSpan = Utils.$(".language-current", this.toggle);
      const altSpan = Utils.$(".language-alternative", this.toggle);

      if (currentSpan && altSpan) {
        if (lang === "pt") {
          currentSpan.textContent = "PT";
          altSpan.textContent = "EN";
        } else {
          currentSpan.textContent = "EN";
          altSpan.textContent = "PT";
        }
      }
    }

    document.documentElement.setAttribute("lang", lang);
    // Re-render quiz if active
    if (AppState.isQuizActive) {
      QuizManager.renderQuestion(AppState.currentQuestion);
    }
  }
};

// ===== MODAL MODULE ====
const ModalManager = {
  activeModal: null,
  scrollPosition: 0,
  focusableElements: 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',

  init() {
    this.bindEvents();
  },

  bindEvents() {
    // Menu item clicks
    const menuItems = Utils.$$('.menu-item[data-section]');
    menuItems.forEach(item => {
      Utils.addEvent(item, 'click', (e) => this.handleMenuClick(e));
      Utils.addEvent(item, 'keydown', (e) => this.handleMenuKeydown(e));
    });

    // Close button clicks - usar delegação de eventos para modais dinâmicos
    Utils.addEvent(document, 'click', (e) => {
      if (e.target.classList.contains('modal-close')) {
        this.closeModal(e);
      }
    });

    // Close on backdrop click
    Utils.addEvent(document, 'click', (e) => {
      if (e.target.classList.contains('modal') && e.target.classList.contains('visible')) {
        this.closeModal(e);
      }
    });

    // Close on escape key
    Utils.addEvent(document, 'keydown', (e) => this.handleEscapeKey(e));
  },

  handleMenuClick(event) {
    const section = event.currentTarget.getAttribute('data-section');
    if (section) {
      this.openModal(section);
    }
  },

  handleMenuKeydown(event) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.handleMenuClick(event);
    }
  },

  openModal(modalId) {
    // Se modalId não contém '-modal', adiciona
    if (!modalId.includes('-modal')) {
      modalId = modalId === 'quiz' ? 'quiz-modal' : `${modalId}-modal`;
    }

    let modal = Utils.$(`#${modalId}`);

    // Criar modal do quiz dinamicamente se necessário
    if (modalId === 'quiz-modal' && !modal) {
      modal = this.createQuizModal();
      document.body.appendChild(modal);
      QuizManager.start();
    }

    if (!modal) {
      console.error('Modal não encontrado:', modalId);
      return;
    }

    // Salvar posição de scroll atual
    this.scrollPosition = window.pageYOffset || document.documentElement.scrollTop;

    // Configurar modal
    this.activeModal = modal;
    modal.classList.add("visible");
    modal.setAttribute("aria-hidden", "false");

    // Bloquear scroll da página principal
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${this.scrollPosition}px`;
    document.body.style.width = "100%";

    // Gerenciamento de foco
    setTimeout(() => {
      const firstFocusable = Utils.$(this.focusableElements, modal);
      if (firstFocusable) {
        firstFocusable.focus();
      }
    }, 100);

    // Inicializar efeito de digitação para depoimentos
    if (modalId === 'testimonials-modal') {
      setTimeout(() => this.initTestimonialsTyping(), 300);
    }

    // Anunciar abertura do modal
    const modalTitle = Utils.$('h2', modal);
    if (modalTitle) {
      Utils.announceToScreenReader(`${modalTitle.textContent} modal aberto`);
    }
  },

  closeModal(event) {
    let modal = this.activeModal;

    if (!modal && event.target) {
      modal = event.target.closest('.modal');
    }

    if (!modal) return;

    // Limpar estado ativo
    this.activeModal = null;
    modal.classList.remove('visible');
    modal.setAttribute('aria-hidden', 'true');

    // Remover estilos inline forçados
    modal.style.display = '';
    modal.style.position = '';
    modal.style.top = '';
    modal.style.left = '';
    modal.style.width = '';
    modal.style.height = '';
    modal.style.alignItems = '';
    modal.style.justifyContent = '';
    modal.style.zIndex = '';

    // Restaurar estado da página
    document.body.style.overflow = '';
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.width = '';

    // Restaurar posição de scroll
    window.scrollTo(0, this.scrollPosition);

    // Retornar foco para elemento que abriu o modal
    const section = modal.id.replace('-modal', '').replace('-details', '');
    const menuItem = Utils.$(`[data-section="${section}"]`);
    if (menuItem) {
      menuItem.focus();
    }

    Utils.announceToScreenReader('Modal fechado');
  },

  handleEscapeKey(event) {
    if (event.key === 'Escape' && this.activeModal) {
      this.closeModal({ target: this.activeModal });
    }
  },

  createQuizModal() {
    const modal = document.createElement('div');
    modal.id = 'quiz-modal';
    modal.className = 'modal quiz-modal';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-labelledby', 'quiz-title');
    modal.setAttribute('aria-hidden', 'true');

    modal.innerHTML = `
      <div class="modal-content">
        <button class="modal-close" aria-label="Fechar quiz" type="button">&times;</button>
        <div class="quiz-container">
          <h2 id="quiz-title" data-pt="Descubra qual Izabele você precisa!" data-en="Discover which Izabele you need!">
            Descubra qual Izabele você precisa!
          </h2>
          <div class="quiz-content">
            <div class="quiz-progress">
              <div class="progress-bar">
                <div class="progress-fill"></div>
              </div>
              <span class="progress-text">1 / 5</span>
            </div>
            <div class="quiz-question">
              <h3 id="question-text"></h3>
              <div class="quiz-options"></div>
            </div>
            <div class="quiz-result hidden">
              <div class="result-content"></div>
              <div class="result-actions">
                <button class="btn btn-primary" id="view-portfolio" data-pt="Ver Portfólio Completo" data-en="View Full Portfolio" type="button">
                  Ver Portfólio Completo
                </button>
                <button class="btn btn-secondary" id="restart-quiz" data-pt="Refazer Quiz" data-en="Restart Quiz" type="button">
                  Refazer Quiz
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    return modal;
  },

  initTestimonialsTyping() {
    const title = Utils.$('#testimonials-title');
    if (title && !title.classList.contains('typing-complete')) {
      const text = title.textContent;
      this.typeWriter(title, text, 100);
    }
  },

  typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    element.classList.remove('typing-complete');

    const type = () => {
      if (i < text.length) {
        element.innerHTML += text.charAt(i);
        i++;
        setTimeout(type, speed);
      } else {
        setTimeout(() => {
          element.classList.add('typing-complete');
        }, 1000);
      }
    };

    type();
  }
};

// Variável global para armazenar a posição de scroll ANTES de abrir o modal
let scrollPosition = 0;

// ===== QUIZ MODULE ===== 
const QuizManager = {
  init() {
    const startQuizBtn = Utils.$('.quiz-start-btn');
    if (startQuizBtn) {
      Utils.addEvent(startQuizBtn, 'click', () => ModalManager.openModal('quiz'));
    }
  },

  start() {
    AppState.setState('currentQuestion', 0);
    AppState.setState('userAnswers', []);
    AppState.setState('isQuizActive', true);

    const quizQuestion = Utils.$('.quiz-question');
    const quizResult = Utils.$('.quiz-result');

    if (quizQuestion) quizQuestion.classList.remove('hidden');
    if (quizResult) quizResult.classList.add('hidden');

    this.showQuestion();
    Utils.announceToScreenReader('Quiz started');
  },

  showQuestion() {
    const question = QuizData.questions[AppState.currentQuestion];
    if (!question) return;

    this.updateProgress();

    // Update question text
    const questionText = Utils.$('#question-text');
    if (questionText) {
      questionText.textContent = question.question[AppState.currentLang];
    }

    // Update options
    const optionsContainer = Utils.$('.quiz-options');
    if (optionsContainer) {
      optionsContainer.innerHTML = '';

      question.options.forEach((option, index) => {
        const optionElement = document.createElement('button');
        optionElement.className = 'quiz-option';
        optionElement.textContent = option.text[AppState.currentLang];
        optionElement.setAttribute('type', 'button');
        optionElement.setAttribute('aria-label', `Option ${index + 1}: ${option.text[AppState.currentLang]}`);

        Utils.addEvent(optionElement, 'click', () => this.selectOption(option, optionElement));
        optionsContainer.appendChild(optionElement);
      });
    }

    Utils.announceToScreenReader(`Question ${AppState.currentQuestion + 1} of ${QuizData.questions.length}`);
  },

  selectOption(option, buttonElement) {
    const newAnswers = [...AppState.userAnswers, option];
    AppState.setState('userAnswers', newAnswers);

    // Add visual feedback
    if (buttonElement) {
      buttonElement.classList.add('selected');
    }

    // Disable all options temporarily
    const allOptions = Utils.$$('.quiz-option');
    allOptions.forEach(opt => {
      opt.disabled = true;
      opt.setAttribute('aria-disabled', 'true');
    });

    setTimeout(() => {
      const nextQuestion = AppState.currentQuestion + 1;
      AppState.setState('currentQuestion', nextQuestion);

      if (nextQuestion < QuizData.questions.length) {
        this.showQuestion();
      } else {
        this.showResult();
      }
    }, 800);
  },

  updateProgress() {
    const progressFill = Utils.$('.progress-fill');
    const progressText = Utils.$('.progress-text');

    if (progressFill && progressText) {
      const progress = ((AppState.currentQuestion + 1) / QuizData.questions.length) * 100;
      progressFill.style.width = `${progress}%`;
      progressText.textContent = `${AppState.currentQuestion + 1} / ${QuizData.questions.length}`;
    }
  },

  showResult() {
    // Calculate scores
    const scores = { android: 0, ux: 0, design: 0, global: 0 };

    AppState.userAnswers.forEach(answer => {
      Object.keys(answer.points).forEach(skill => {
        scores[skill] += answer.points[skill];
      });
    });

    // Find highest score
    const topSkill = Object.keys(scores).reduce((a, b) => scores[a] > scores[b] ? a : b);
    const result = QuizData.results[topSkill];

    // Hide question, show result
    const quizQuestion = Utils.$('.quiz-question');
    const quizResult = Utils.$('.quiz-result');

    if (quizQuestion) quizQuestion.classList.add('hidden');
    if (quizResult) quizResult.classList.remove('hidden');

    // Update result content
    const resultContent = Utils.$('.result-content');
    if (resultContent) {
      resultContent.innerHTML = `
        <div class="result-header">
          <h3 class="result-title">${result.title[AppState.currentLang]}</h3>
          <p class="result-description">${result.description[AppState.currentLang]}</p>
        </div>
        <div class="result-skills">
          <h4 data-pt="Competências em destaque:" data-en="Featured skills:">
            ${AppState.currentLang === 'pt' ? 'Competências em destaque:' : 'Featured skills:'}
          </h4>
          <div class="skills-list">
            ${result.skills.map(skill => `<span class="skill-badge">${skill}</span>`).join('')}
          </div>
        </div>
      `;
    }

    // Update CTA button
    const viewPortfolioBtn = Utils.$('#view-portfolio');
    if (viewPortfolioBtn) {
      viewPortfolioBtn.textContent = result.cta[AppState.currentLang];
      Utils.addEvent(viewPortfolioBtn, 'click', () => {
        ModalManager.closeModal({ target: Utils.$('#quiz-modal') });
        ModalManager.openModal('projects');
      });
    }

    // Restart quiz button
    const restartBtn = Utils.$('#restart-quiz');
    if (restartBtn) {
      Utils.addEvent(restartBtn, 'click', () => this.start());
    }

    Utils.announceToScreenReader(`Quiz completed. Result: ${result.title[AppState.currentLang]}`);
  }
};

// ===== ACCESSIBILITY MODULE ===== 
const AccessibilityManager = {
  init() {
    this.setupSkipLink();
    this.setupKeyboardNavigation();
    this.setupFocusManagement();
  },

  setupSkipLink() {
    const skipLink = Utils.$('.skip-to-main');
    if (skipLink) {
      Utils.addEvent(skipLink, 'click', (e) => {
        e.preventDefault();
        const mainContent = Utils.$('#main-content');
        if (mainContent) {
          mainContent.focus();
          mainContent.scrollIntoView({ behavior: 'smooth' });
        }
      });
    }
  },

  setupKeyboardNavigation() {
    const menuItems = Utils.$$('.menu-item');
    menuItems.forEach((item, index) => {
      Utils.addEvent(item, 'keydown', (e) => {
        if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
          e.preventDefault();
          const nextIndex = (index + 1) % menuItems.length;
          menuItems[nextIndex].focus();
        } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
          e.preventDefault();
          const prevIndex = (index - 1 + menuItems.length) % menuItems.length;
          menuItems[prevIndex].focus();
        }
      });
    });
  },

  setupFocusManagement() {
    // Trap focus in modals
    Utils.addEvent(document, 'keydown', (e) => {
      if (e.key === 'Tab' && ModalManager.activeModal) {
        this.trapFocus(e, ModalManager.activeModal);
      }
    });
  },

  trapFocus(e, modal) {
    const focusableElements = Utils.$$(ModalManager.focusableElements, modal);
    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];

    if (e.shiftKey) {
      if (document.activeElement === firstFocusable) {
        e.preventDefault();
        lastFocusable.focus();
      }
    } else {
      if (document.activeElement === lastFocusable) {
        e.preventDefault();
        firstFocusable.focus();
      }
    }
  }
};

// ===== FOOTER MODULE ===== 
const FooterManager = {
  init() {
    const toggle = Utils.$('#izabele-toggle');
    const footer = Utils.$('.site-footer');
    const dotIcon = Utils.$('#dot-icon');

    if (toggle && footer && dotIcon) {
      let state = 0;
      const icons = [
        "assets/icons/icon-Z-lavander.svg",
        "assets/icons/icon-Z-orange.svg",
        "assets/icons/icon-Z-degrade.svg"
      ];
      const colors = [
        "#9B5DE5",
        "#FF6F3C",
        "linear-gradient(45deg, #FF6F3C, #9B5DE5)"
      ];

      Utils.addEvent(toggle, 'click', () => {
        state = (state + 1) % 3;
        dotIcon.src = icons[state];
        footer.style.background = colors[state];
        toggle.style.justifyContent = state === 0 ? "flex-start" : state === 1 ? "center" : "flex-end";
      });
    }
  }
};

// ===== PERFORMANCE MODULE ===== 
const PerformanceManager = {
  init() {
    this.monitorPerformance();
    this.setupLazyLoading();
  },

  monitorPerformance() {
    if ('performance' in window) {
      Utils.addEvent(window, 'load', () => {
        setTimeout(() => {
          const perfData = performance.getEntriesByType('navigation')[0];
          if (perfData) {
            console.log('Page load time:', Math.round(perfData.loadEventEnd - perfData.loadEventStart), 'ms');
          }
        }, 0);
      });
    }
  },

  setupLazyLoading() {
    if ('IntersectionObserver' in window) {
      const images = Utils.$$('img[loading="lazy"]');
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src || img.src;
            img.classList.remove('lazy');
            observer.unobserve(img);
          }
        });
      });

      images.forEach(img => imageObserver.observe(img));
    }
  }
};

// ===== ERROR HANDLING ===== 
const ErrorHandler = {
  init() {
    Utils.addEvent(window, 'error', (event) => {
      console.error('JavaScript error:', event.error);

      // Graceful degradation
      if (event.error && event.error.message && event.error.message.includes('quiz')) {
        Utils.announceToScreenReader('Quiz temporarily unavailable. Please try again later.');
      }
    });

    Utils.addEvent(window, 'unhandledrejection', (event) => {
      console.error('Unhandled promise rejection:', event.reason);
    });
  }
};

// ===== APPLICATION INITIALIZATION ===== 
const App = {
  init() {
    // Initialize modules in order
    SplashScreen.init();

    // Initialize after splash screen
    setTimeout(() => {
      ThemeManager.init();
      LanguageManager.init();
      ModalManager.init();
      QuizManager.init();
      AccessibilityManager.init();
      FooterManager.init();
      PerformanceManager.init();
      ErrorHandler.init();

      Utils.announceToScreenReader('Portfolio loaded successfully');
    }, SplashScreen.duration);
  }
};

// ===== DOM READY ===== 
if (document.readyState === 'loading') {
  Utils.addEvent(document, 'DOMContentLoaded', () => App.init());
} else {
  App.init();
}

// ===== GLOBAL FUNCTIONS FOR BACKWARDS COMPATIBILITY ===== 
window.openModal = (modalId) => ModalManager.openModal(modalId);
window.closeModal = (event) => ModalManager.closeModal(event);

// Função para atualizar o botão de CV
function updateCVButton() {
  const cvButton = document.getElementById('cv-download-btn');
  if (cvButton) {
    if (currentLanguage === 'pt') {
      cvButton.href = 'assets/cv/CV-IsabeleCarvalho.pdf';
    } else {
      cvButton.href = 'assets/cv/CV-IsabeleCarvalho-English.pdf';
    }
  }
}

// Sistema Anti-Spam para Formulário de Contato
class AntiSpamProtection {
  constructor() {
    this.captchaAnswer = 0;
    this.formStartTime = 0;
    this.submissionCount = 0;
    this.lastSubmissionTime = 0;
    this.blockedWords = [
      'viagra', 'casino', 'lottery', 'winner', 'congratulations',
      'click here', 'free money', 'make money', 'work from home',
      'bitcoin', 'cryptocurrency', 'investment opportunity'
    ];
    this.init();
  }

  init() {
    this.generateCaptcha();
    this.setFormStartTime();
    this.setupEventListeners();
    this.addCharacterCounter();
  }

  // Gera CAPTCHA matemático simples
  generateCaptcha() {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    const operations = ['+', '-'];
    const operation = operations[Math.floor(Math.random() * operations.length)];

    let question, answer;

    if (operation === '+') {
      question = `${num1} + ${num2} = ?`;
      answer = num1 + num2;
    } else {
      // Garante que a subtração não resulte em número negativo
      const larger = Math.max(num1, num2);
      const smaller = Math.min(num1, num2);
      question = `${larger} - ${smaller} = ?`;
      answer = larger - smaller;
    }

    document.getElementById('captcha-question').textContent = question;
    this.captchaAnswer = answer;
  }

  // Define o tempo de início do formulário
  setFormStartTime() {
    this.formStartTime = Date.now();
    document.getElementById('form-start-time').value = this.formStartTime;
  }

  // Configura event listeners
  setupEventListeners() {
    const form = document.getElementById('contact-form');
    const captchaInput = document.getElementById('captcha');

    form.addEventListener('submit', (e) => this.handleSubmit(e));
    captchaInput.addEventListener('input', () => this.validateCaptcha());

    // Regenera CAPTCHA se estiver incorreto
    captchaInput.addEventListener('blur', () => {
      if (!this.validateCaptcha() && captchaInput.value) {
        setTimeout(() => this.generateCaptcha(), 1000);
      }
    });
  }

  // Adiciona contador de caracteres
  addCharacterCounter() {
    const messageTextarea = document.getElementById('message');
    const maxLength = 1000;

    const counter = document.createElement('div');
    counter.className = 'char-counter';
    counter.textContent = `0/${maxLength}`;

    messageTextarea.parentNode.appendChild(counter);

    messageTextarea.addEventListener('input', () => {
      const length = messageTextarea.value.length;
      counter.textContent = `${length}/${maxLength}`;

      if (length > maxLength * 0.9) {
        counter.className = 'char-counter danger';
      } else if (length > maxLength * 0.8) {
        counter.className = 'char-counter warning';
      } else {
        counter.className = 'char-counter';
      }
    });
  }

  // Valida CAPTCHA
  validateCaptcha() {
    const userAnswer = parseInt(document.getElementById('captcha').value);
    return userAnswer === this.captchaAnswer;
  }

  // Verifica se é um bot (honeypot)
  isBot() {
    const honeypotField = document.getElementById('website');
    return honeypotField.value.trim() !== '';
  }

  // Verifica rate limiting
  checkRateLimit() {
    const now = Date.now();
    const timeSinceLastSubmission = now - this.lastSubmissionTime;
    const minInterval = 30000; // 30 segundos entre envios

    if (timeSinceLastSubmission < minInterval && this.submissionCount > 0) {
      return false;
    }

    // Máximo 3 envios por sessão
    if (this.submissionCount >= 3) {
      return false;
    }

    return true;
  }

  // Verifica se o envio foi muito rápido
  isTooFast() {
    const now = Date.now();
    const timeTaken = now - this.formStartTime;
    const minTime = 5000; // Mínimo 5 segundos para preencher

    return timeTaken < minTime;
  }

  // Filtra palavras suspeitas
  containsSpamWords(text) {
    const lowerText = text.toLowerCase();
    return this.blockedWords.some(word => lowerText.includes(word));
  }

  // Valida email
  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const disposableEmailDomains = [
      '10minutemail.com', 'tempmail.org', 'guerrillamail.com',
      'mailinator.com', 'throwaway.email'
    ];

    if (!emailRegex.test(email)) {
      return false;
    }

    const domain = email.split('@')[1];
    return !disposableEmailDomains.includes(domain);
  }

  // Mostra mensagem de status
  showStatus(message, type) {
    const statusDiv = document.getElementById('form-status');
    statusDiv.textContent = message;
    statusDiv.className = `form-status ${type}`;
    statusDiv.style.display = 'block';

    // Remove a mensagem após 5 segundos
    setTimeout(() => {
      statusDiv.style.display = 'none';
    }, 5000);
  }

  // Manipula o envio do formulário
  async handleSubmit(e) {
    e.preventDefault();

    const submitBtn = document.getElementById('submit-btn');
    const formData = new FormData(e.target);

    // Desabilita o botão durante a validação
    submitBtn.disabled = true;
    submitBtn.classList.add('loading');

    try {
      // Verificações anti-spam
      if (this.isBot()) {
        this.showStatus('Erro: Atividade suspeita detectada.', 'error');
        return;
      }

      if (!this.checkRateLimit()) {
        this.showStatus('Erro: Muitas tentativas. Aguarde antes de enviar novamente.', 'error');
        return;
      }

      if (this.isTooFast()) {
        this.showStatus('Erro: Formulário enviado muito rapidamente. Tente novamente.', 'error');
        return;
      }

      if (!this.validateCaptcha()) {
        this.showStatus('Erro: Verificação de segurança incorreta.', 'error');
        this.generateCaptcha();
        return;
      }

      // Validações de conteúdo
      const email = formData.get('email');
      const message = formData.get('message');
      const name = formData.get('name');

      if (!this.isValidEmail(email)) {
        this.showStatus('Erro: Email inválido ou de domínio temporário.', 'error');
        return;
      }

      if (this.containsSpamWords(message) || this.containsSpamWords(name)) {
        this.showStatus('Erro: Conteúdo suspeito detectado.', 'error');
        return;
      }

      // Se chegou até aqui, o formulário passou em todas as verificações
      await this.submitForm(formData);

    } catch (error) {
      this.showStatus('Erro: Falha no envio. Tente novamente.', 'error');
    } finally {
      submitBtn.disabled = false;
      submitBtn.classList.remove('loading');
    }
  }

  // Envia o formulário usando Web3Forms
  async submitForm(formData) {
    try {
      // Adiciona proteção anti-spam do Web3Forms
      formData.append('botcheck', '');

      // Envia para Web3Forms
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      });

      const result = await response.json();

      if (response.ok && result.success) {
        this.showStatus('Mensagem enviada com sucesso! Obrigada pelo contato.', 'success');

        // Atualiza contadores
        this.submissionCount++;
        this.lastSubmissionTime = Date.now();

        // Limpa o formulário
        document.getElementById('contact-form').reset();
        this.generateCaptcha();
        this.setFormStartTime();

        // Fecha o modal após 3 segundos
        setTimeout(() => {
          document.getElementById('contact-modal').style.display = 'none';
        }, 3000);
      } else {
        throw new Error(result.message || 'Erro ao enviar mensagem');
      }
    } catch (error) {
      console.error('Erro no envio:', error);
      this.showStatus('Erro: Falha no envio. Tente novamente.', 'error');
      throw error;
    }
  }
}

// Inicializa a proteção anti-spam quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
  new AntiSpamProtection();
});

