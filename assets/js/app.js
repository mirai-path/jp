// --- DATA SPECIFICATION FOR RESOURCES ---
const RESOURCES_DATA = [
  {
    title: "JLPT Sensei",
    category: "websites",
    description: "The ultimate grammar database for JLPT prep. Contains comprehensive lists, practice quizzes, and PDF worksheets from N5 to N1.",
    link: "https://jlptsensei.com/"
  },
  {
    title: "Minna no Nihongo I & II",
    category: "books",
    description: "The absolute standard textbook series used in top Japanese language schools worldwide. Excellent for grammar drill and structures.",
    link: "https://www.3anet.co.jp/english/books/books-01.html"
  },
  {
    title: "Tokyodev Career Portal",
    category: "websites",
    description: "Highly curated tech job board specifically for English-speaking developers looking to move to or already living in Japan.",
    link: "https://www.tokyodev.com/"
  },
  {
    title: "Harvard CS50: Intro to CSE",
    category: "courses",
    description: "Harvard University's legendary introduction to the intellectual enterprises of computer science and the art of programming.",
    link: "https://pll.harvard.edu/course/cs50-introduction-computer-science"
  },
  {
    title: "AtCoder Algorithmic Contests",
    category: "practice",
    description: "Japan's premier competitive programming platform. Excellent for preparing for Rakuten, Mercari, and LINE technical screening tests.",
    link: "https://atcoder.jp/"
  },
  {
    title: "Learn Japanese: Nihongo Dekita",
    category: "youtube",
    description: "Sayaka-sensei makes learning Japanese fun and simple. Packed with vocabulary hacks, JLPT tips, and daily conversational guides.",
    link: "https://www.youtube.com/@NihongoDekita"
  },
  {
    title: "Japan Dev Job Board",
    category: "websites",
    description: "A vetted list of modern, foreigner-friendly tech companies in Japan offering competitive salaries, global work environments, and visa sponsorship.",
    link: "https://japan-dev.com/"
  },
  {
    title: "FreeCodeCamp Responsive Web Dev",
    category: "courses",
    description: "Excellent, interactive frontend developer path. Build a solid foundation in HTML, CSS, JavaScript, and modern layout frameworks.",
    link: "https://www.freecodecamp.org/learn/2022/responsive-web-design/"
  },
  {
    title: "LeetCode Algorithms Practice",
    category: "practice",
    description: "The industry standard platform to practice DSA coding questions. A must-solve database for candidates facing global corporate technical interviews.",
    link: "https://leetcode.com/"
  },
  {
    title: "Genki: An Integrated Course",
    category: "books",
    description: "A highly friendly and comprehensive textbook for beginners. Great for self-study with extensive workbook exercises.",
    link: "https://genki3.japantimes.co.jp/en/"
  },
  {
    title: "Tokyo Dev Vlog: Nicholas",
    category: "youtube",
    description: "Vlogs from a software engineer living in Tokyo. Great insights into engineering culture, salaries, housing, and work-life balance in Japan.",
    link: "https://www.youtube.com/@NicholasVlog"
  },
  {
    title: "The Ultimate Guide to MEXT",
    category: "books",
    description: "A comprehensive handbook detailing every single stage of the Japanese Government MEXT scholarship process, written by former scholars.",
    link: "https://www.transenzjapan.com/blog/mext-scholarship-application-guide/"
  }
];

class AppManager {
  constructor() {
    this.initTheme();
    this.initCircularFavicon();
    this.initMobileNav();
    this.initResourceHub();
    this.initProjectFilters();
    this.initHeaderScroll();
    
    // Bind global scroll reveal
    window.initializeRevealAnimations = this.initScrollReveal.bind(this);
    this.initScrollReveal();
  }

  // --- THEME SWITCHER ---
  initTheme() {
    const themeBtn = document.getElementById('theme-toggle');
    const sakuraBtn = document.getElementById('sakura-toggle');
    
    // Auto-detect and set initial theme
    const savedTheme = localStorage.getItem('mirai_theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', initialTheme);
    
    if (themeBtn) {
      themeBtn.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('mirai_theme', newTheme);
      });
    }

    // Sakura toggle listener
    if (sakuraBtn) {
      // Load saved state
      const savedSakura = localStorage.getItem('mirai_sakura');
      if (savedSakura === 'false') {
        sakuraBtn.classList.add('disabled');
        // Let engine load, but stop it on start
        setTimeout(() => {
          if (window.sakuraEngine) window.sakuraEngine.stop();
        }, 100);
      }

      sakuraBtn.addEventListener('click', () => {
        if (window.sakuraEngine) {
          const isActive = window.sakuraEngine.toggle();
          localStorage.setItem('mirai_sakura', isActive ? 'true' : 'false');
          if (isActive) {
            sakuraBtn.classList.remove('disabled');
          } else {
            sakuraBtn.classList.add('disabled');
          }
        }
      });
    }
  }

  // --- CIRCULAR FAVICON BUILDER ---
  initCircularFavicon() {
    const faviconLink = document.querySelector('link[rel="icon"]');
    if (!faviconLink) return;

    const img = new Image();
    img.src = faviconLink.href;

    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 64;
      canvas.height = 64;
      const ctx = canvas.getContext('2d');

      ctx.clearRect(0, 0, 64, 64);

      // Circular clip mask
      ctx.beginPath();
      ctx.arc(32, 32, 31, 0, Math.PI * 2);
      ctx.clip();

      // Draw original favicon inside circle
      ctx.drawImage(img, 0, 0, 64, 64);

      // Replace link href with base64 data URL
      faviconLink.href = canvas.toDataURL('image/png');
    };
  }

  // --- MOBILE NAV MENU ---
  initMobileNav() {
    const hamburger = document.getElementById('hamburger-btn');
    const mobileDrawer = document.getElementById('mobile-menu');
    const overlay = document.getElementById('mobile-overlay');
    const closeBtn = document.getElementById('mobile-close');
    const links = document.querySelectorAll('.mobile-nav-link');
    
    const openMenu = () => {
      mobileDrawer.classList.add('open');
      overlay.classList.add('open');
      document.body.style.overflow = 'hidden';
    };

    const closeMenu = () => {
      mobileDrawer.classList.remove('open');
      overlay.classList.remove('open');
      document.body.style.overflow = '';
    };

    if (hamburger) hamburger.addEventListener('click', openMenu);
    if (closeBtn) closeBtn.addEventListener('click', closeMenu);
    if (overlay) overlay.addEventListener('click', closeMenu);
    
    links.forEach(link => {
      link.addEventListener('click', closeMenu);
    });
  }

  // --- INTERACTION: RESOURCE HUB FILTERS AND SEARCH ---
  initResourceHub() {
    const container = document.getElementById('resource-grid');
    const filterContainer = document.getElementById('hub-filters');
    const searchInput = document.getElementById('resource-search');
    
    if (!container) return;

    let activeFilter = 'all';
    let searchQuery = '';

    // Render Function
    const render = () => {
      container.innerHTML = '';
      
      const filtered = RESOURCES_DATA.filter(res => {
        const matchesCat = activeFilter === 'all' || res.category === activeFilter;
        const matchesSearch = res.title.toLowerCase().includes(searchQuery) ||
                              res.description.toLowerCase().includes(searchQuery);
        return matchesCat && matchesSearch;
      });

      if (filtered.length === 0) {
        container.innerHTML = `
          <div class="empty-progress-state" style="grid-column: 1 / -1; width: 100%;">
            <i class="ph ph-magnifying-glass"></i>
            <p>No learning resources found matching your criteria. Try searching for something else!</p>
          </div>
        `;
        return;
      }

      filtered.forEach(res => {
        const card = document.createElement('div');
        card.className = 'resource-card glass-panel';
        
        let label = res.category;
        if (res.category === 'youtube') label = 'YouTube';
        else if (res.category === 'courses') label = 'Free Course';
        else if (res.category === 'books') label = 'Book';
        else if (res.category === 'websites') label = 'Website';
        else if (res.category === 'practice') label = 'Practice Platform';

        card.innerHTML = `
          <span class="badge">${label}</span>
          <h3>${res.title}</h3>
          <p>${res.description}</p>
          <a href="${res.link}" target="_blank" class="resource-link">
            Explore Resource <i class="ph ph-arrow-square-out"></i>
          </a>
        `;
        container.appendChild(card);
      });
    };

    // Filter Buttons Interaction
    if (filterContainer) {
      const buttons = filterContainer.querySelectorAll('.tab-btn');
      buttons.forEach(btn => {
        btn.addEventListener('click', () => {
          buttons.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          activeFilter = btn.dataset.filter;
          render();
        });
      });
    }

    // Search Keyup Interaction
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value.toLowerCase().trim();
        render();
      });
    }

    // Initial render
    render();
  }

  // --- INTERACTION: PROJECTS SHOWCASE FILTERS ---
  initProjectFilters() {
    const buttons = document.querySelectorAll('.showcase-filters .tab-btn');
    const cards = document.querySelectorAll('.showcase-grid .project-card');

    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        buttons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const filter = btn.dataset.filter;
        
        cards.forEach(card => {
          if (filter === 'all' || card.dataset.category === filter) {
            card.style.display = 'flex';
            card.style.animation = 'fadeIn 0.4s ease forwards';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // --- HEADER SCROLL ACTION ---
  initHeaderScroll() {
    const header = document.querySelector('header');
    if (!header) return;

    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }

  // --- INTERSECTION OBSERVER SCROLL REVEAL ---
  initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal');
    if (reveals.length === 0) return;

    const observerOptions = {
      root: null,
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          // Once animated, stop observing
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    reveals.forEach(el => {
      observer.observe(el);
    });
  }
}

// Global active page helper for single-page style navigation
document.addEventListener('DOMContentLoaded', () => {
  new AppManager();
  
  // Navigation active state syncing on scroll
  const sections = document.querySelectorAll('section, header');
  const navLinks = document.querySelectorAll('.nav-link');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= (sectionTop - 150)) {
        current = section.getAttribute('id') || '';
      }
    });

    const updateActiveLink = (links) => {
      links.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
          link.classList.add('active');
        }
      });
    };

    updateActiveLink(navLinks);
    updateActiveLink(mobileNavLinks);
  });
  
  // Tab-pane switching logic for Japan Guide (MEXT Scholarship vs Student Visa vs cost of living etc.)
  const tabButtons = document.querySelectorAll('.guide-tabs .tab-btn');
  const tabPanes = document.querySelectorAll('.guide-content .tab-pane');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      tabButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const target = btn.dataset.tab;
      tabPanes.forEach(pane => {
        if (pane.getAttribute('id') === target) {
          pane.classList.add('active');
        } else {
          pane.classList.remove('active');
        }
      });
    });
  });
});
