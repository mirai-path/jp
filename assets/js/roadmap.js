const ROADMAP_DATA = [
  {
    id: "english",
    title: "English & Communication",
    level: "Beginner",
    time: "2-3 Months",
    icon: "ph-translate",
    why: "Crucial for writing university research proposals, facing international job interviews, taking standardized English tests, and collaborating on global open-source projects.",
    what: [
      "Grammar & Professional Writing Essentials",
      "Speaking & Presentation confidence building",
      "Technical report and research abstract drafting",
      "Daily email communication and corporate etiquette"
    ],
    status: "planned",
    checked: []
  },
  {
    id: "japanese",
    title: "Japanese Language (JLPT)",
    level: "Beginner",
    time: "6-12 Months",
    icon: "ph-book-open",
    why: "Mandatory for local hiring in Tokyo tech giants, highly valuable for the MEXT scholarship visa screen, and crucial for navigating daily life in Japan.",
    what: [
      "Hiragana & Katakana mastery",
      "Basic Kanji (100+ characters) & Vocabulary for JLPT N5",
      "JLPT N4 grammar structures and conversational listening",
      "Intro to business Japanese and polite language (Keigo)"
    ],
    status: "planned",
    checked: []
  },
  {
    id: "fundamentals",
    title: "Programming Fundamentals",
    level: "Beginner",
    time: "2 Months",
    icon: "ph-terminal-window",
    why: "The bedrock of computer science. Builds core computational logic and problem-solving patterns needed in all subsequent web or systems engineering.",
    what: [
      "Memory layouts, variables, and pointers in C",
      "Object-oriented programming principles in C++ or Python",
      "File management and script execution patterns",
      "Recursion, basic loops, and condition controls"
    ],
    status: "planned",
    checked: []
  },
  {
    id: "webdev",
    title: "Modern Web Development",
    level: "Intermediate",
    time: "3-4 Months",
    icon: "ph-code",
    why: "Web development gives you tangible projects. In Japan, startups and digital agencies heavily hire full-stack web and mobile application developer profiles.",
    what: [
      "HTML5 Semantic layouts & CSS3 Grid/Flexbox layouts",
      "Modern JavaScript ES6+ (Async/Await, Fetch, DOM)",
      "Vite & modular bundlers",
      "Intro to component-based development (React or Vue basics)"
    ],
    status: "planned",
    checked: []
  },
  {
    id: "git",
    title: "Git & Version Control",
    level: "Beginner",
    time: "2 Weeks",
    icon: "ph-git-branch",
    why: "Industry gold standard. Showcases your collaboration ability and open-source contributions. A clean GitHub profile is your global tech visa.",
    what: [
      "Git repositories, branching, and cherry-picking",
      "Resolving merge conflicts and rebasing branches",
      "Managing pull requests & GitHub markdown syntax",
      "GitHub Pages static web hosting and Git Actions CI/CD"
    ],
    status: "planned",
    checked: []
  },
  {
    id: "dsa",
    title: "Data Structures & Algorithms",
    level: "Intermediate",
    time: "4-5 Months",
    icon: "ph-tree-structure",
    why: "Top Japanese companies like LINE, Mercari, and Rakuten screen candidates using algorithmic coding tests (LeetCode, AtCoder) which require rigorous DSA practice.",
    what: [
      "Time & Space complexity analysis (Big O)",
      "Arrays, HashTables, Stacks, Queues, and Linked Lists",
      "Binary Trees, Graphs, and Graph traversal (BFS/DFS)",
      "Sorting, Searching, Dynamic Programming, and Greedy algorithms"
    ],
    status: "planned",
    checked: []
  },
  {
    id: "firebase",
    title: "Firebase & Cloud Services",
    level: "Intermediate",
    time: "3 Weeks",
    icon: "ph-cloud-arrow-up",
    why: "Equips static frontend projects with powerful serverless backends (Auth, Firestore DB, storage), mimicking modern scalable startup tech stacks.",
    what: [
      "Firebase project initialization & web SDK integration",
      "User authentication flows (Email, Google Auth)",
      "Firestore real-time document-oriented database read/writes",
      "Serverless functions and Cloud Storage configurations"
    ],
    status: "planned",
    checked: []
  },
  {
    id: "linux",
    title: "Linux & Shell Scripting",
    level: "Intermediate",
    time: "3 Weeks",
    icon: "ph-command",
    why: "The vast majority of web servers and cloud platforms (AWS, GCP) run on Linux. Essential for devops, systems administration, and scientific research.",
    what: [
      "Command-line file manipulation, users, and permissions",
      "Shell variables, piping (|), and standard I/O redirection",
      "Writing Bash script automations",
      "Secure Shell (SSH) connections and server configurations"
    ],
    status: "planned",
    checked: []
  },
  {
    id: "ielts",
    title: "IELTS Preparation",
    level: "Advanced",
    time: "2-3 Months",
    icon: "ph-student",
    why: "An official high IELTS band (6.5+) is usually required for graduate school enrollment in Japan's top national universities and secure MEXT approval.",
    what: [
      "Academic Reading techniques (skimming and scanning)",
      "Structured Writing tasks (describing graphics & essay formulation)",
      "Listening comprehension under standard accents",
      "Speaking fluency and logical structure under examiner cues"
    ],
    status: "planned",
    checked: []
  },
  {
    id: "portfolio",
    title: "Portfolio & Career Strategy",
    level: "Advanced",
    time: "1 Month",
    icon: "ph- briefcase-metal",
    why: "Combines your skills into a cohesive, jaw-dropping career pitch. Essential for recruiting events like the Boston Career Forum or direct corporate applications.",
    what: [
      "Building a customized static responsive portfolio website",
      "Writing a professional English-Japanese Resume (Rirekisho & Shokumukeirekisho)",
      "Formatting active student projects with polished READMEs",
      "LinkedIn optimization & setting up accounts on Japan-specific portals (Wantedly, Tokyodev)"
    ],
    status: "planned",
    checked: []
  }
];

class RoadmapManager {
  constructor() {
    this.nodes = [];
    this.currentNodeId = null;
    this.initElements();
    this.loadData();
    this.renderRoadmap();
    this.setupEventListeners();
    this.updateProgressUI();
  }

  initElements() {
    this.roadmapPath = document.getElementById('roadmap-path');
    this.drawer = document.getElementById('roadmap-drawer');
    this.drawerOverlay = document.getElementById('drawer-overlay');
    this.drawerCloseBtn = document.getElementById('drawer-close');
    
    // Drawer detail elements
    this.drawerTitleText = document.getElementById('drawer-node-title');
    this.drawerIcon = document.getElementById('drawer-node-icon');
    this.drawerLevel = document.getElementById('drawer-level');
    this.drawerTime = document.getElementById('drawer-time');
    this.drawerWhy = document.getElementById('drawer-why');
    this.drawerChecklist = document.getElementById('drawer-checklist');
    this.statusButtons = document.querySelectorAll('.status-btn');
    
    // Progress elements
    this.circleProgress = document.querySelector('.progress-ring__circle');
    this.percentageText = document.getElementById('progress-percentage');
    this.completedCountText = document.getElementById('completed-count');
    this.learningCountText = document.getElementById('learning-count');
    this.plannedCountText = document.getElementById('planned-count');
    this.activeModulesList = document.getElementById('active-modules-list');
  }

  loadData() {
    const saved = localStorage.getItem('mirai_roadmap_data');
    if (saved) {
      try {
        this.nodes = JSON.parse(saved);
        
        // Handle migration / backward compatibility if data schema changes
        if (this.nodes.length !== ROADMAP_DATA.length) {
          this.mergeWithDefaultData();
        }
      } catch (e) {
        console.error("Error loading roadmap data, falling back to defaults", e);
        this.nodes = JSON.parse(JSON.stringify(ROADMAP_DATA));
      }
    } else {
      this.nodes = JSON.parse(JSON.stringify(ROADMAP_DATA));
    }
  }

  mergeWithDefaultData() {
    const updated = [];
    ROADMAP_DATA.forEach(defNode => {
      const existing = this.nodes.find(n => n.id === defNode.id);
      if (existing) {
        updated.push({
          ...defNode,
          status: existing.status || defNode.status,
          checked: existing.checked || defNode.checked || []
        });
      } else {
        updated.push(defNode);
      }
    });
    this.nodes = updated;
    this.saveData();
  }

  saveData() {
    localStorage.setItem('mirai_roadmap_data', JSON.stringify(this.nodes));
  }

  renderRoadmap() {
    if (!this.roadmapPath) return;
    this.roadmapPath.innerHTML = '';
    
    this.nodes.forEach(node => {
      const nodeEl = document.createElement('div');
      nodeEl.className = `roadmap-node reveal status-${node.status}`;
      nodeEl.dataset.id = node.id;
      
      let statusLabel = 'Planned';
      if (node.status === 'completed') statusLabel = 'Completed';
      else if (node.status === 'learning') statusLabel = 'Learning';

      // Fix icon rendering
      const actualIcon = node.icon.replace(' briefcase-metal', 'briefcase');

      nodeEl.innerHTML = `
        <span class="node-badge">${statusLabel}</span>
        <div class="node-icon-wrapper">
          <i class="ph-bold ${actualIcon}"></i>
        </div>
        <h3>${node.title}</h3>
        <div class="node-meta">
          <span><i class="ph ph-bar-chart"></i> ${node.level}</span>
          <span>•</span>
          <span><i class="ph ph-clock"></i> ${node.time}</span>
        </div>
      `;
      
      nodeEl.addEventListener('click', () => this.openDrawer(node.id));
      this.roadmapPath.appendChild(nodeEl);
    });

    // Make sure reveal classes are caught by scroll triggers if registered later
    if (window.initializeRevealAnimations) {
      window.initializeRevealAnimations();
    }
  }

  openDrawer(nodeId) {
    const node = this.nodes.find(n => n.id === nodeId);
    if (!node) return;
    
    this.currentNodeId = nodeId;
    
    // Inject node elements
    this.drawerTitleText.textContent = node.title;
    
    const actualIcon = node.icon.replace(' briefcase-metal', 'briefcase');
    this.drawerIcon.className = `ph-bold ${actualIcon}`;
    this.drawerLevel.textContent = node.level;
    this.drawerTime.textContent = node.time;
    this.drawerWhy.textContent = node.why;
    
    // Render status buttons state
    this.statusButtons.forEach(btn => {
      if (btn.dataset.status === node.status) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    // Render Sub-Checklist
    this.drawerChecklist.innerHTML = '';
    node.what.forEach((item, index) => {
      const isChecked = node.checked && node.checked.includes(index);
      
      const itemEl = document.createElement('label');
      itemEl.className = 'checklist-item';
      itemEl.innerHTML = `
        <input type="checkbox" data-index="${index}" ${isChecked ? 'checked' : ''}>
        <span>${item}</span>
      `;
      
      // Bind checkbox change
      const checkbox = itemEl.querySelector('input');
      checkbox.addEventListener('change', (e) => this.toggleChecklistItem(index, e.target.checked));
      
      this.drawerChecklist.appendChild(itemEl);
    });
    
    // Open drawer
    this.drawer.classList.add('open');
    this.drawerOverlay.classList.add('open');
    document.body.style.overflow = 'hidden'; // Lock body scroll
  }

  closeDrawer() {
    this.drawer.classList.remove('open');
    this.drawerOverlay.classList.remove('open');
    document.body.style.overflow = ''; // Unlock body scroll
    this.currentNodeId = null;
  }

  toggleChecklistItem(index, isChecked) {
    if (!this.currentNodeId) return;
    const node = this.nodes.find(n => n.id === this.currentNodeId);
    if (!node) return;
    
    if (!node.checked) node.checked = [];
    
    if (isChecked) {
      if (!node.checked.includes(index)) {
        node.checked.push(index);
      }
    } else {
      node.checked = node.checked.filter(i => i !== index);
    }
    
    // Auto-update status to "learning" if they check an item but it was "planned"
    if (isChecked && node.status === 'planned') {
      this.updateNodeStatus('learning');
      // Update UI active buttons
      this.statusButtons.forEach(btn => {
        if (btn.dataset.status === 'learning') btn.classList.add('active');
        else btn.classList.remove('active');
      });
    }

    // Auto-update to completed if all checked
    if (node.checked.length === node.what.length && node.status !== 'completed') {
      this.updateNodeStatus('completed');
      this.statusButtons.forEach(btn => {
        if (btn.dataset.status === 'completed') btn.classList.add('active');
        else btn.classList.remove('active');
      });
    }
    
    this.saveData();
    this.updateProgressUI();
  }

  updateNodeStatus(newStatus) {
    if (!this.currentNodeId) return;
    const node = this.nodes.find(n => n.id === this.currentNodeId);
    if (!node) return;
    
    const oldStatus = node.status;
    node.status = newStatus;
    
    // Visual node styling sync
    const nodeEl = document.querySelector(`.roadmap-node[data-id="${node.id}"]`);
    if (nodeEl) {
      nodeEl.className = `roadmap-node status-${newStatus}`;
      const badge = nodeEl.querySelector('.node-badge');
      if (badge) {
        let statusLabel = 'Planned';
        if (newStatus === 'completed') statusLabel = 'Completed';
        else if (newStatus === 'learning') statusLabel = 'Learning';
        badge.textContent = statusLabel;
      }
    }
    
    this.saveData();
    this.updateProgressUI();
  }

  setupEventListeners() {
    // Drawer close interactions
    if (this.drawerCloseBtn) {
      this.drawerCloseBtn.addEventListener('click', () => this.closeDrawer());
    }
    if (this.drawerOverlay) {
      this.drawerOverlay.addEventListener('click', () => this.closeDrawer());
    }
    
    // Status button click handlers
    this.statusButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const newStatus = btn.dataset.status;
        this.statusButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.updateNodeStatus(newStatus);
      });
    });

    // Watch for Escape key to close active panel
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.drawer.classList.contains('open')) {
        this.closeDrawer();
      }
    });
  }

  updateProgressUI() {
    const total = this.nodes.length;
    const completed = this.nodes.filter(n => n.status === 'completed').length;
    const learning = this.nodes.filter(n => n.status === 'learning').length;
    const planned = this.nodes.filter(n => n.status === 'planned').length;
    
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
    
    // Save counts
    if (this.completedCountText) this.completedCountText.textContent = completed;
    if (this.learningCountText) this.learningCountText.textContent = learning;
    if (this.plannedCountText) this.plannedCountText.textContent = planned;
    
    // Animate SVG Ring
    if (this.circleProgress) {
      const radius = this.circleProgress.r.baseVal.value;
      const circumference = radius * 2 * Math.PI;
      this.circleProgress.style.strokeDasharray = `${circumference} ${circumference}`;
      
      const offset = circumference - (percentage / 100) * circumference;
      this.circleProgress.style.strokeDashoffset = offset;
    }
    
    // Update center percent text
    if (this.percentageText) {
      this.percentageText.textContent = `${percentage}%`;
    }
    
    // Render Active Learning modules checklist in Progress Dashboard
    if (this.activeModulesList) {
      const activeNodes = this.nodes.filter(n => n.status === 'learning' || n.status === 'completed');
      
      if (activeNodes.length === 0) {
        this.activeModulesList.innerHTML = `
          <div class="empty-progress-state">
            <i class="ph ph-leaf"></i>
            <p>No active modules! Click any node on the roadmap above to start tracking your path.</p>
          </div>
        `;
      } else {
        this.activeModulesList.innerHTML = '';
        activeNodes.forEach(node => {
          const itemEl = document.createElement('div');
          itemEl.className = 'active-module-item';
          
          let statusText = 'Learning';
          let statusClass = 'status-learning';
          if (node.status === 'completed') {
            statusText = 'Completed';
            statusClass = 'status-completed';
          }

          const actualIcon = node.icon.replace(' briefcase-metal', 'briefcase');
          
          itemEl.innerHTML = `
            <div class="module-info">
              <i class="ph-bold ${actualIcon}"></i>
              <div class="module-text">
                <span class="module-name">${node.title}</span>
              </div>
            </div>
            <span class="module-status-badge ${statusClass}">${statusText}</span>
          `;
          
          // Click handler to open it back up quickly
          itemEl.style.cursor = 'pointer';
          itemEl.addEventListener('click', () => this.openDrawer(node.id));
          
          this.activeModulesList.appendChild(itemEl);
        });
      }
    }
  }
}

// Initialise
document.addEventListener('DOMContentLoaded', () => {
  window.roadmapManager = new RoadmapManager();
});
