window.PORTFOLIO_PROJECTS = [
  {
    "slug": "earnings-quality-autopsy",
    "title": "Earnings Quality Autopsy",
    "shortTitle": "Earnings Quality Autopsy",
    "year": "2026",
    "category": "Finance & Risk",
    "image": "images/projects/earnings-quality-autopsy/cover.png",
    "alt": "Claim-to-number evidence map connecting management statements to accounting support and tension",
    "summary": "A full-stack SEC and XBRL research system that tests whether the accounting evidence supports the story management is telling.",
    "detail": "The platform normalizes quarterly statements, maps management claims to source-backed evidence, runs nine forensic analysis modules, and produces traceable dossiers, research notes, and analyst workpapers without pretending to be a stock picker.",
    "stats": [
      [
        "187",
        "backend tests"
      ],
      [
        "14",
        "FastAPI routes"
      ],
      [
        "9",
        "forensic modules"
      ],
      [
        "5",
        "export formats"
      ]
    ],
    "tools": [
      "Python",
      "FastAPI",
      "SEC/XBRL",
      "Next.js"
    ],
    "featured": true,
    "thumbnailSource": "images/projects/earnings-quality-autopsy/cover.png",
    "thumbnail": "images/project-thumbnails/earnings-quality-autopsy.svg"
  },
  {
    "slug": "falsifyr",
    "title": "falsifyr: Adversarial Testing for Statistical Claims",
    "shortTitle": "falsifyr",
    "year": "2026",
    "category": "Open Source",
    "image": "images/projects/falsifyr/cover.png",
    "alt": "falsifyr attack report with a claim verdict and ranked robustness attacks",
    "summary": "A CRAN-targeted R package that searches for the smallest plausible change capable of overturning a statistical claim.",
    "detail": "falsifyr attacks fitted claims through row deletion, uncertainty changes, missingness, measurement error, placebos, specification search, and sample splits, then reports exactly where the result breaks and what it survives.",
    "stats": [
      [
        "11",
        "exported functions"
      ],
      [
        "65",
        "test blocks"
      ],
      [
        "8",
        "attack families"
      ],
      [
        "0.1.0",
        "package version"
      ]
    ],
    "tools": [
      "R",
      "testthat",
      "Robustness",
      "RStudio"
    ],
    "featured": true,
    "thumbnailSource": "images/projects/falsifyr/cover.png",
    "thumbnail": "images/project-thumbnails/falsifyr.svg"
  },
  {
    "slug": "radiology-value-pipeline",
    "title": "Radiology Value Pipeline",
    "shortTitle": "Radiology Value Pipeline",
    "year": "2026",
    "category": "Healthcare AI",
    "image": "images/projects/radiology-value-pipeline/cover.png",
    "alt": "Radiology review workspace showing a brain MRI",
    "summary": "A local-first radiology workflow platform that connects model orchestration, human review, audit trails, governance, and Power BI reporting.",
    "detail": "I built the platform around a strict principle: AI can assist, but the radiologist remains the author of record. Every run keeps its model version, prompt version, findings, feedback, and downstream reporting lineage.",
    "stats": [
      [
        "76",
        "processed studies"
      ],
      [
        "304",
        "agent runs"
      ],
      [
        "858",
        "dashboard fact rows"
      ],
      [
        "0.9828",
        "held-out MRI macro AUC"
      ]
    ],
    "tools": [
      "FastAPI",
      "PostgreSQL",
      "Clinical AI",
      "Power BI"
    ],
    "featured": true,
    "thumbnailSource": "images/projects/radiology-value-pipeline/cover.png",
    "thumbnail": "images/project-thumbnails/radiology-value-pipeline.svg"
  },
  {
    "slug": "ravel",
    "title": "Ravel: CRAN-Published RStudio AI Copilot",
    "shortTitle": "Ravel",
    "year": "2026",
    "category": "Open Source",
    "image": "images/projects/ravel/cover.png",
    "alt": "Ravel R package documentation homepage",
    "summary": "A CRAN-published R package that gives RStudio a context-aware copilot for statistical work, model interpretation, safe actions, and Quarto drafting.",
    "detail": "Ravel understands the active editor, selected code, loaded objects, console output, plots, git state, and package structure. Actions are staged and reviewable instead of silently changing an analyst's work.",
    "stats": [
      [
        "CRAN",
        "accepted package"
      ],
      [
        "0.1.2",
        "current release"
      ],
      [
        "MCP",
        "remote declarations"
      ],
      [
        "Safe",
        "staged actions"
      ]
    ],
    "tools": [
      "R",
      "RStudio",
      "OpenAI API",
      "Quarto"
    ],
    "featured": true,
    "thumbnail": "images/project-thumbnails/ravel.svg",
    "thumbnailSource": "images/projects/ravel/pkgdown-home.png"
  },
  {
    "slug": "wayline",
    "title": "Wayline: Analytics-Driven Road Trip Planner",
    "shortTitle": "Wayline",
    "year": "2026",
    "category": "Product Systems",
    "image": "images/projects/wayline/cover.png",
    "alt": "Wayline road trip planning interface",
    "summary": "A road trip planner that turns routing, fuel cadence, overnight stops, trip-fit scoring, and exports into one explainable planning workflow.",
    "detail": "Wayline is built like a real product rather than a map demo: protected Google Maps infrastructure, predictive scoring, product analytics events, clear stop rationale, and portable PDF, text, and JSON outputs.",
    "stats": [
      [
        "2,256 mi",
        "reference trip"
      ],
      [
        "32h 46m",
        "drive time"
      ],
      [
        "3 days",
        "planned itinerary"
      ],
      [
        "4",
        "export formats"
      ]
    ],
    "tools": [
      "Node.js",
      "Google Maps",
      "Analytics",
      "Predictive Scoring"
    ],
    "featured": true,
    "thumbnail": "images/project-thumbnails/wayline.svg",
    "thumbnailSource": "images/projects/wayline/wayline-architecture.svg"
  },
  {
    "slug": "owl",
    "title": "OWL: Autonomous AI Discovery Daemon",
    "shortTitle": "OWL",
    "year": "2026",
    "category": "Autonomous Systems",
    "image": "images/projects/owl/cover.svg",
    "alt": "OWL autonomous discovery system diagram",
    "summary": "A local-first AI daemon that watches real data sources, builds a living world model, and speaks first only when it finds something worth knowing.",
    "detail": "The system includes the daemon, plugin framework, discovery engine, SQLite knowledge graph, Electron app, web dashboard, MCP server, delivery channels, and Docker deployment.",
    "stats": [
      [
        "8K+",
        "lines of production code"
      ],
      [
        "98",
        "passing tests"
      ],
      [
        "7",
        "source plugins"
      ],
      [
        "5",
        "deployment modes"
      ]
    ],
    "tools": [
      "Node.js",
      "Electron",
      "SQLite",
      "MCP"
    ],
    "featured": true,
    "thumbnailSource": "images/projects/owl/cover.svg",
    "thumbnail": "images/project-thumbnails/owl.svg"
  },
  {
    "slug": "mercury-market-sim",
    "title": "MERCURY: Market Microstructure Simulation Lab",
    "shortTitle": "MERCURY",
    "year": "2026",
    "category": "Simulation",
    "image": "images/projects/mercury-market-sim/cover.png",
    "alt": "MERCURY market simulation benchmark charts",
    "summary": "A research-grade exchange simulator for liquidity shocks, flash crashes, fragmented venues, fee economics, and strategy interaction.",
    "detail": "MERCURY combines a continuous double auction, realistic limit-order-book behavior, heterogeneous trading agents, stress experiments, benchmark suites, parameter sweeps, and reproducible reports.",
    "stats": [
      [
        "18",
        "benchmark scenarios"
      ],
      [
        "67",
        "passing tests"
      ],
      [
        "61%",
        "fragility reduction"
      ],
      [
        "9,549",
        "rebalancer net P&L"
      ]
    ],
    "tools": [
      "Python",
      "Agent Simulation",
      "Pytest",
      "Quarto"
    ],
    "featured": true,
    "thumbnailSource": "images/projects/mercury-market-sim/cover.png",
    "thumbnail": "images/project-thumbnails/mercury-market-sim.svg"
  },
  {
    "slug": "roblox-brand-worlds",
    "title": "Roblox Immersive Brand Worlds",
    "shortTitle": "Roblox Brand Worlds",
    "year": "2016-2024",
    "category": "Immersive Worlds",
    "image": "images/projects/roblox-brand-worlds/cover.jpg",
    "alt": "Black Adam immersive Roblox world",
    "summary": "Ten years of worldbuilding across shipped games, early music events, and global brand activations whose experiences total more than 6.5 billion place visits.",
    "detail": "I worked as a world designer, environment artist, builder, texture artist, and DevRel QA tester. The work included Ava Max, Black Adam, Bakugan, L'Oreal, Sony, Warner Music, and other large-scale interactive releases.",
    "stats": [
      [
        "6.5B+",
        "place visits"
      ],
      [
        "10 yrs",
        "building on Roblox"
      ],
      [
        "30+",
        "vehicles for Anomic"
      ],
      [
        "CEO",
        "personal commendation"
      ]
    ],
    "tools": [
      "Roblox Studio",
      "3D Modeling",
      "World Design",
      "Launch QA"
    ],
    "featured": true,
    "thumbnailSource": "images/projects/roblox-brand-worlds/cover.jpg",
    "thumbnail": "images/project-thumbnails/roblox-brand-worlds.svg"
  },
  {
    "slug": "fulfillment",
    "title": "Fulfillment Center Risk Simulation & Staffing Optimization",
    "shortTitle": "Fulfillment Risk Simulation",
    "year": "2025",
    "category": "Simulation",
    "image": "images/projects/fulfillment/cover.png",
    "alt": "Fulfillment center simulation dashboard",
    "summary": "A discrete-event simulation that exposes queues, SLA risk, station pressure, and minimum staffing under normal and peak demand.",
    "detail": "The engine models order flow minute by minute, raises operating alerts, scores system risk, and searches bounded staffing combinations before exporting decision-ready BI tables.",
    "stats": [
      [
        "8 hr",
        "modeled shift"
      ],
      [
        "0-100",
        "system risk score"
      ],
      [
        "4",
        "capacity stations"
      ],
      [
        "Grid",
        "staffing search"
      ]
    ],
    "tools": [
      "Python",
      "SimPy",
      "Optimization",
      "Power BI"
    ],
    "thumbnailSource": "images/projects/fulfillment/cover.png",
    "thumbnail": "images/project-thumbnails/fulfillment.svg"
  },
  {
    "slug": "insurance-fraud",
    "title": "Insurance Fraud Detection",
    "shortTitle": "Insurance Fraud Detection",
    "year": "2025",
    "category": "Machine Learning",
    "image": "images/projects/insurance-fraud/cover.png",
    "alt": "Insurance fraud model comparison",
    "summary": "An end-to-end fraud modeling pipeline with model comparison, explainability, and deployable scoring artifacts.",
    "detail": "I compared logistic regression, random forest, and XGBoost, improved AUC from 0.61 to 0.86, and used SHAP to make the final risk signals interpretable.",
    "stats": [
      [
        "0.86",
        "best AUC"
      ],
      [
        "3",
        "models compared"
      ],
      [
        "SHAP",
        "explainability"
      ],
      [
        "Joblib",
        "deployment artifact"
      ]
    ],
    "tools": [
      "scikit-learn",
      "XGBoost",
      "SHAP",
      "Python"
    ],
    "thumbnail": "images/project-thumbnails/insurance-fraud.svg",
    "thumbnailSource": "images/projects/insurance-fraud/model_auc_comparison.png"
  },
  {
    "slug": "lung-cancer",
    "title": "Lung Cancer Survival: SEER 2004-2015",
    "shortTitle": "Lung Cancer Survival",
    "year": "2025",
    "category": "Healthcare Analytics",
    "image": "images/projects/lung-cancer/cover.png",
    "alt": "Lung cancer survival analysis",
    "summary": "Statistical survival analysis across 114,000 SEER cases, translated into an interpretable Power BI report.",
    "detail": "The R workflow covers cleaning, hypothesis tests, logistic regression, subgroup analysis, and visualization. Stage at diagnosis emerged as the dominant survival driver.",
    "stats": [
      [
        "114K+",
        "patient cases"
      ],
      [
        "8x",
        "localized survival odds"
      ],
      [
        "11 yrs",
        "SEER window"
      ],
      [
        "R + BI",
        "analysis stack"
      ]
    ],
    "tools": [
      "R",
      "Logistic Regression",
      "SEER",
      "Power BI"
    ],
    "thumbnailSource": "images/projects/lung-cancer/cover.png",
    "thumbnail": "images/project-thumbnails/lung-cancer.svg"
  },
  {
    "slug": "readmission",
    "title": "Hospital Readmission Analytics",
    "shortTitle": "Readmission Analytics",
    "year": "2025",
    "category": "Healthcare Analytics",
    "image": "images/projects/readmission/cover.png",
    "alt": "Hospital readmission analytics dashboard",
    "summary": "A normalized SQL-to-R-to-Power BI pipeline for clinical drivers, subgroup equity, and 30-day readmission risk.",
    "detail": "The project turns 100,000 encounters into analysis views, regression outputs, equity measures, and a three-page decision report for clinical operations.",
    "stats": [
      [
        "100K+",
        "encounters"
      ],
      [
        "11%",
        "readmission rate"
      ],
      [
        "2.7%",
        "subgroup gap"
      ],
      [
        "3",
        "report pages"
      ]
    ],
    "tools": [
      "SQL",
      "R",
      "Power BI",
      "Clinical Analytics"
    ],
    "thumbnailSource": "images/projects/readmission/cover.png",
    "thumbnail": "images/project-thumbnails/readmission.svg"
  },
  {
    "slug": "hospital-prices",
    "title": "Hospital Price Variation & Medicare Benchmarking",
    "shortTitle": "Hospital Price Variation",
    "year": "2026",
    "category": "Healthcare Analytics",
    "image": "images/projects/hospital-prices/cover.png",
    "alt": "Hospital price benchmarking maps and charts",
    "summary": "A CMS-based analysis of how inpatient charges vary across DRGs, states, regions, and hospital market contexts.",
    "detail": "The report compares submitted charges with Medicare payments and makes the size and geography of hospital pricing gaps visible without flattening the market context.",
    "stats": [
      [
        "2023",
        "CMS inpatient data"
      ],
      [
        "DRG",
        "service comparison"
      ],
      [
        "US",
        "state and regional views"
      ],
      [
        "HTML",
        "self-contained report"
      ]
    ],
    "tools": [
      "Python",
      "CMS Data",
      "Regression",
      "Visualization"
    ],
    "thumbnailSource": "images/projects/hospital-prices/cover.png",
    "thumbnail": "images/project-thumbnails/hospital-prices.svg"
  },
  {
    "slug": "dying-on-the-margin",
    "title": "Dying on the Margin: Capacity Utilization & Mortality",
    "shortTitle": "Capacity & Mortality",
    "year": "2026",
    "category": "Healthcare Analytics",
    "image": "images/projects/dying-on-the-margin/cover.png",
    "alt": "Hospital utilization and mortality analysis",
    "summary": "A regression study of hospital capacity utilization as a systems signal tied to operating pressure and mortality outcomes.",
    "detail": "The work tests a counterintuitive association carefully, adds hospital context and diagnostics, and separates statistical evidence from causal claims.",
    "stats": [
      [
        "p<.001",
        "simple-model association"
      ],
      [
        "-2.87",
        "estimated slope"
      ],
      [
        "Rural/Urban",
        "context split"
      ],
      [
        "HTML",
        "reproducible report"
      ]
    ],
    "tools": [
      "Python",
      "Regression",
      "Diagnostics",
      "Healthcare Ops"
    ],
    "thumbnailSource": "images/projects/dying-on-the-margin/cover.png",
    "thumbnail": "images/project-thumbnails/dying-on-the-margin.svg"
  }
];
