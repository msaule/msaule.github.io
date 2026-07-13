(function () {
  const projects = window.PORTFOLIO_PROJECTS || [];
  const caseStudies = window.PORTFOLIO_CASE_STUDIES || {};

  const projectGalleries = {
    'earnings-quality-autopsy': [
      ['images/projects/earnings-quality-autopsy/cover.png', 'Claim-to-number evidence map'],
      ['images/projects/earnings-quality-autopsy/dossier.png', 'Analyst dossier and claim ledger'],
      ['images/projects/earnings-quality-autopsy/real-sec-workpaper.png', 'Real SEC workpaper review'],
      ['images/projects/earnings-quality-autopsy/production-console.png', 'Production run console and validation state']
    ],
    falsifyr: [
      ['images/projects/falsifyr/cover.png', 'Generated adversarial attack report'],
      ['images/projects/falsifyr/survival-map.png', 'Claim survival map across attack families']
    ],
    'radiology-value-pipeline': [
      ['images/projects/radiology-value-pipeline/screenshots/study-review-chest-xray.png', 'Chest X-ray review workspace'],
      ['images/projects/radiology-value-pipeline/screenshots/web-operations-dashboard.png', 'Operations dashboard'],
      ['images/projects/radiology-value-pipeline/screenshots/web-governance-dashboard.png', 'Governance and lineage view'],
      ['images/projects/radiology-value-pipeline/diagrams/platform-architecture.png', 'Platform architecture']
    ],
    owl: [
      ['images/projects/owl/architecture.svg', 'System architecture'],
      ['images/projects/owl/discovery-feed.svg', 'Autonomous discovery feed'],
      ['images/projects/owl/source-events.svg', 'Source event distribution']
    ],
    wayline: [
      ['images/projects/wayline/vegas-greensboro-250-desktop.png', 'Completed desktop itinerary'],
      ['images/projects/wayline/planner-empty-desktop.png', 'Route planning workspace'],
      ['images/projects/wayline/vegas-greensboro-250-mobile.png', 'Mobile itinerary']
    ],
    ravel: [
      ['images/projects/ravel/pkgdown-home.png', 'Package documentation home'],
      ['images/projects/ravel/showcase.png', 'Ravel showcase article'],
      ['images/projects/ravel/reference.png', 'Function reference']
    ],
    'mercury-market-sim': [
      ['images/projects/mercury-market-sim/flash_crash_price_path.png', 'Endogenous flash-crash price path'],
      ['images/projects/mercury-market-sim/fragmented_venues_market_state_heatmap.png', 'Fragmented venue state heatmap'],
      ['images/projects/mercury-market-sim/sweep_tradeoff.png', 'Parameter tradeoff surface']
    ],
    'roblox-brand-worlds': [
      ['images/projects/roblox-brand-worlds/bakugan-lobby.jpg', 'Bakugan Battle League environment'],
      ['images/projects/roblox-brand-worlds/city-world.jpg', 'City-scale environment design'],
      ['images/projects/roblox-brand-worlds/futuristic-interior.jpg', 'Futuristic interior production']
    ],
    fulfillment: [
      ['images/projects/fulfillment/image 1.png', 'Simulation output'],
      ['images/projects/fulfillment/image 2.png', 'Station pressure analysis'],
      ['images/projects/fulfillment/image 3.png', 'Staffing optimization output']
    ],
    'blockchain-fraud': [
      ['images/projects/blockchain-fraud/image 1.png', 'Fraud-scoring workflow'],
      ['images/projects/blockchain-fraud/image 2.png', 'Ledger architecture'],
      ['images/projects/blockchain-fraud/image 3.png', 'Analyst interface']
    ],
    'insurance-fraud': [
      ['images/projects/insurance-fraud/model_auc_comparison.png', 'Model AUC comparison'],
      ['images/projects/insurance-fraud/xgboost_shap_summary.png', 'SHAP driver summary'],
      ['images/projects/insurance-fraud/xgboost_confusion_matrix.png', 'XGBoost confusion matrix']
    ],
    'ai-scheduling': [
      ['images/projects/ai-scheduling/Screenshot_2025-10-30_213821.png', 'Patient access dashboard'],
      ['images/projects/ai-scheduling/Screenshot_2025-10-30_213839.png', 'Scheduling analysis view']
    ],
    'lung-cancer': [
      ['images/projects/lung-cancer/survival-by-stage.png', 'Survival by stage'],
      ['images/projects/lung-cancer/odds-ratio-drivers.png', 'Modeled survival drivers']
    ],
    readmission: [
      ['images/projects/readmission/erd-sql-report.png', 'Readmission data model and report']
    ],
    'hospital-prices': [
      ['images/projects/hospital-prices/state-map.png', 'State-level price variation'],
      ['images/projects/hospital-prices/regional-gap.png', 'Regional payment gap'],
      ['images/projects/hospital-prices/payment-scatter.png', 'Charges versus Medicare payment']
    ],
    'dying-on-the-margin': [
      ['images/projects/dying-on-the-margin/rural-urban.png', 'Rural and urban comparison'],
      ['images/projects/dying-on-the-margin/diagnostics.png', 'Model diagnostics'],
      ['images/projects/dying-on-the-margin/pairplot.png', 'Variable relationships']
    ],
    'market-basket': [
      ['images/projects/market-basket/image 1.png', 'Product association output'],
      ['images/projects/market-basket/image 3.png', 'Rule network'],
      ['images/projects/market-basket/image 5.png', 'Lift and confidence analysis']
    ],
    'education-wage': [
      ['images/projects/education-wage/image 1.png', 'Long-run wage trends'],
      ['images/projects/education-wage/image 3.png', 'Education premium analysis'],
      ['images/projects/education-wage/image 5.png', 'Gender and education model']
    ],
    'bank-loan': [
      ['images/projects/bank-loan/Screenshot_2025-10-09_150840.png', 'Loan risk dashboard'],
      ['images/projects/bank-loan/Screenshot_2025-10-09_151247.png', 'Applicant scoring engine'],
      ['images/projects/bank-loan/Screenshot_2025-10-09_151440.png', 'Risk policy controls']
    ],
    'hospital-forecast': [
      ['images/projects/hospital-forecast/image 1.png', 'Hospital financial forecast'],
      ['images/projects/hospital-forecast/image 3.png', 'Department analysis'],
      ['images/projects/hospital-forecast/image 5.png', 'Scenario controls']
    ],
    'hospital-db': [
      ['images/projects/hospital-db/image 1.png', 'Hospital database interface'],
      ['images/projects/hospital-db/image 4.png', 'Relational schema'],
      ['images/projects/hospital-db/image 8.png', 'Operational reporting query']
    ]
  };

  const toggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (toggle && navLinks) {
    toggle.addEventListener('click', () => {
      const open = navLinks.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
      toggle.textContent = open ? 'Close' : 'Menu';
    });
  }

  const progress = document.querySelector('.page-progress');
  const updateProgress = () => {
    if (!progress) return;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.width = max > 0 ? `${Math.min(100, (window.scrollY / max) * 100)}%` : '0%';
  };
  updateProgress();
  window.addEventListener('scroll', updateProgress, { passive: true });

  const revealItems = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -6% 0px' });
    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add('is-visible'));
  }

  document.querySelectorAll('[data-year]').forEach((item) => {
    item.textContent = new Date().getFullYear();
  });

  const projectIndex = document.querySelector('[data-project-index]');
  if (projectIndex) renderProjectIndex(projectIndex);

  const projectPage = document.querySelector('[data-project-page]');
  if (projectPage) renderProjectPage(projectPage);

  function renderProjectIndex(container) {
    const count = document.querySelector('[data-work-count]');
    const filters = [...document.querySelectorAll('.filter-button')];

    projects.forEach((project, index) => {
      const thumbnail = project.thumbnail || project.image;
      const link = document.createElement('a');
      link.className = 'project-row';
      link.href = `project.html?slug=${encodeURIComponent(project.slug)}`;
      link.dataset.category = project.category;
      link.dataset.image = thumbnail;
      link.dataset.featured = String(Boolean(project.featured));
      link.innerHTML = `
        <span class="row-number">${String(index + 1).padStart(2, '0')}</span>
        <span class="row-thumb"><img src="${thumbnail}" alt=""></span>
        <span class="row-title">${project.title}</span>
        <span class="row-category">${project.category}</span>
        <span class="row-year">${project.year}</span>
        <span class="row-arrow" aria-hidden="true">↗</span>`;
      container.appendChild(link);
    });

    const updateCount = () => {
      const visible = container.querySelectorAll('.project-row:not([hidden])').length;
      if (count) count.textContent = `${String(visible).padStart(2, '0')} projects`;
    };
    const applyFilter = (selected) => {
      container.querySelectorAll('.project-row').forEach((row) => {
        if (selected === 'Selected') {
          row.hidden = row.dataset.featured !== 'true';
        } else {
          row.hidden = selected !== 'All' && row.dataset.category !== selected;
        }
      });
      updateCount();
    };

    applyFilter(filters.find((item) => item.classList.contains('is-active'))?.dataset.filter || 'All');

    filters.forEach((button) => {
      button.addEventListener('click', () => {
        filters.forEach((item) => item.classList.remove('is-active'));
        button.classList.add('is-active');
        applyFilter(button.dataset.filter);
      });
    });
  }

  function renderProjectPage(container) {
    const params = new URLSearchParams(window.location.search);
    const slug = params.get('slug') || 'radiology-value-pipeline';
    const project = projects.find((item) => item.slug === slug) || projects[0];
    if (!project) return;
    const study = caseStudies[project.slug] || {};

    document.title = `${project.shortTitle} — Markuss Saule`;
    const category = document.querySelector('[data-project-category]');
    const year = document.querySelector('[data-project-year]');
    const title = document.querySelector('[data-project-title]');
    const cover = document.querySelector('[data-project-cover]');
    const coverStage = document.querySelector('[data-project-cover-stage]');
    const summary = document.querySelector('[data-project-summary]');
    const ownership = document.querySelector('[data-project-ownership]');
    const detail = document.querySelector('[data-project-detail]');
    const stats = document.querySelector('[data-project-stats]');
    const tools = document.querySelector('[data-project-tools]');
    const gallery = document.querySelector('[data-project-gallery]');
    const nextLink = document.querySelector('[data-next-project]');
    const nextTitle = document.querySelector('[data-next-title]');
    const problem = document.querySelector('[data-case-problem]');
    const role = document.querySelector('[data-case-role]');
    const build = document.querySelector('[data-case-build]');
    const decisions = document.querySelector('[data-case-decisions]');
    const validation = document.querySelector('[data-case-validation]');
    const narrative = document.querySelector('[data-case-narrative]');
    const narrativeSection = document.querySelector('[data-project-narrative-section]');
    const links = document.querySelector('[data-case-links]');
    const resourcesSection = document.querySelector('[data-project-resources-section]');

    if (category) category.textContent = project.category;
    if (year) year.textContent = project.year;
    if (title) title.textContent = project.title;
    if (cover) { cover.src = project.image; cover.alt = project.alt; }
    if (coverStage) coverStage.dataset.category = project.category;
    if (summary) summary.textContent = project.summary;
    if (ownership) ownership.textContent = study.ownership || 'Independent build. End-to-end ownership from the operating question through the model, system, interface, and handoff.';
    if (detail) detail.textContent = project.detail;
    if (problem) problem.textContent = study.problem || project.summary;
    if (role) role.textContent = study.role || 'Independent project with end-to-end ownership.';
    if (validation) validation.textContent = study.validation || 'Validated through reproducible outputs and the project evidence shown below.';

    if (build) {
      (study.build || []).forEach((text) => {
        const item = document.createElement('li');
        item.textContent = text;
        build.appendChild(item);
      });
    }

    if (decisions) {
      (study.decisions || []).forEach((text) => {
        const item = document.createElement('li');
        item.textContent = text;
        decisions.appendChild(item);
      });
    }

    const narrativeSections = (window.PORTFOLIO_CASE_NARRATIVES || {})[project.slug] || [];
    if (narrative && narrativeSections.length) {
      narrativeSections.forEach((section, index) => {
        const article = document.createElement('article');
        article.className = 'deep-dive-card';
        const paragraphs = (section.paragraphs || []).map((text) => `<p>${text}</p>`).join('');
        article.innerHTML = `<span>${String(index + 1).padStart(2, '0')}</span><h3>${section.title}</h3>${paragraphs}`;
        narrative.appendChild(article);
      });
    } else if (narrativeSection) {
      narrativeSection.hidden = true;
    }

    if (stats) {
      project.stats.forEach(([value, label]) => {
        const stat = document.createElement('div');
        stat.className = 'project-stat';
        stat.innerHTML = `<strong>${value}</strong><span>${label}</span>`;
        stats.appendChild(stat);
      });
    }

    if (tools) {
      project.tools.forEach((tool) => {
        const item = document.createElement('li');
        item.textContent = tool;
        tools.appendChild(item);
      });
    }

    if (gallery) {
      const images = projectGalleries[project.slug] || [[project.image, project.alt]];
      images.forEach(([src, caption], index) => {
        const figure = document.createElement('figure');
        figure.className = index === 0 ? 'evidence-item evidence-item--wide' : 'evidence-item';
        figure.innerHTML = `<div class="evidence-media"><img src="${src}" alt="${caption}"></div><figcaption>${String(index + 1).padStart(2, '0')} / ${caption}</figcaption>`;
        const image = figure.querySelector('img');
        image.addEventListener('load', () => {
          if (image.naturalWidth / image.naturalHeight < 1.15) {
            figure.classList.add('evidence-item--wide', 'evidence-item--portrait');
          }
        }, { once: true });
        gallery.appendChild(figure);
      });
    }

    if (links && study.links && study.links.length) {
      study.links.forEach(([label, href], index) => {
        const anchor = document.createElement('a');
        anchor.href = href;
        anchor.target = '_blank';
        anchor.rel = 'noopener';
        anchor.innerHTML = `<span>${String(index + 1).padStart(2, '0')}</span><strong>${label}</strong><span aria-hidden="true">↗</span>`;
        links.appendChild(anchor);
      });
    } else if (resourcesSection) {
      resourcesSection.hidden = true;
    }

    const projectIndex = projects.indexOf(project);
    const nextProject = projects[(projectIndex + 1) % projects.length];
    if (nextLink && nextProject) nextLink.href = `project.html?slug=${encodeURIComponent(nextProject.slug)}`;
    if (nextTitle && nextProject) nextTitle.textContent = nextProject.shortTitle;
  }
})();
