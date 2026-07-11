window.PORTFOLIO_CASE_STUDIES = {
  "earnings-quality-autopsy": {
    problem: "Most earnings tools either summarize management commentary or calculate ratios. They rarely connect a specific claim to the accounting evidence that should support it, preserve the source trail, and show where the evidence is incomplete or contradictory.",
    role: "I designed and built the complete research system: SEC ingestion, XBRL normalization, forensic modules, claim-testing logic, FastAPI backend, Next.js review interface, production runner, validation gates, and analyst handoff files.",
    build: [
      "Normalized issuer-specific SEC companyfacts into quarterly income statement, balance sheet, cash-flow, trailing-twelve-month, and ratio models with filing provenance.",
      "Built nine forensic modules covering cash conversion, working capital, revenue quality, margins, non-GAAP adjustments, segments, KPI continuity, language drift, and management claims.",
      "Turned each claim into a structured evidence object with its source quote, required checks, supporting evidence, tensions, missing checks, verdict, confidence, and follow-up question.",
      "Created a Next.js and TypeScript review interface for dossiers, evidence maps, segment analysis, source review, and production operations.",
      "Produced portable JSON, Markdown, HTML, CSV, and Excel outputs from the same validated research run."
    ],
    decisions: [
      "Kept the conclusion layer deterministic so a polished narrative cannot outrun the evidence attached to it.",
      "Preserved source and derivation lineage through every normalized metric instead of flattening SEC facts into unexplained ratios.",
      "Represented missing evidence as unresolved rather than treating unavailable disclosures as zero or quietly filling gaps.",
      "Separated research support from investment judgment: the system surfaces support, tension, and questions, but does not issue ratings, targets, or fraud accusations."
    ],
    validation: "The repository collects 187 backend tests, exposes 14 FastAPI routes, and runs finance-specific completion, PM review, source-link, cache, artifact, and production-readiness checks. The real AAPL workflow produces a normalized model, evidence ledger, dossier, research note, and linked workpaper package from one traceable run.",
    limits: "This is an educational research platform, not investment advice. XBRL extensions and source-limited disclosures still require analyst review, and deterministic evidence rules do not replace accounting judgment.",
    next: "The next release would expand issuer and peer coverage, add filing-change monitoring, strengthen extension-tag review, and benchmark analyst time saved and evidence-repair rates across repeated earnings cycles.",
    links: [
      ["AAPL earnings-quality dossier", "files/earnings-quality-autopsy/aapl-earnings-quality-dossier.html"],
      ["PM research note", "files/earnings-quality-autopsy/aapl-pm-research-note.html"],
      ["PM handoff workbook", "files/earnings-quality-autopsy/aapl-pm-handoff-workbook.xlsx"]
    ]
  },
  falsifyr: {
    problem: "Statistical work often stops once a coefficient crosses a threshold. Diagnostics exist, but they are scattered across functions and rarely answer the more useful question: what is the smallest reasonable change that makes the claim disappear?",
    role: "I designed and built the R package, attack engine, S3 methods, plotting and reporting layers, RStudio addin, vignettes, test suite, and CRAN-oriented release workflow.",
    build: [
      "Wrapped eight attack families around lm, glm, and supported hypothesis-test claims: row deletion, uncertainty, covariates, missingness, measurement error, placebos, specifications, and sample splits.",
      "Ranked the smallest kill by severity so an analyst can see the weakest assumption without reading a pile of disconnected diagnostics.",
      "Added survival scoring, leaderboards, static HTML reports, and visual maps that distinguish fragile results from attacks a claim survives.",
      "Stored formula, term, alternative hypothesis, seed, attack settings, package version, R version, and session details with each result.",
      "Built an optional RStudio addin that finds supported model objects and launches the same controlled workflow from the active session."
    ],
    decisions: [
      "Used careful language throughout: a killed claim is fragile under a defined attack, not proven false.",
      "Kept the public API small around attack, smallest_kill, attack_leaderboard, score_survival, report, print, and plot workflows.",
      "Made unavailable attacks and caveats visible instead of silently dropping checks the fitted object cannot support.",
      "Kept deterministic attacks reproducible under a fixed seed and separated optional dependencies from the core install path."
    ],
    validation: "Version 0.1.0 contains 11 exported functions, 65 testthat blocks, and eight attack families. Local R CMD check --as-cran completes with tests passing and two release notes: placeholder maintainer metadata and a local Windows time-verification limitation.",
    limits: "falsifyr is CRAN-targeted and not yet CRAN-published. Its survival score is a heuristic summary, not the probability that a result is true, and no automated attack replaces design quality, domain knowledge, or causal identification.",
    next: "Replace the pre-release maintainer metadata, run the package across CRAN's multi-platform checks, finalize cran-comments.md, submit, and expand evaluation cases for both fragile and resilient claims.",
    links: [
      ["Generated attack report", "files/falsifyr/attack-report.html"]
    ]
  },
  "radiology-value-pipeline": {
    problem: "Radiology AI is often presented as a model score, while the harder operational questions remain unanswered: who reviews the output, how versions are traced, what happens after an override, and how quality and governance are measured over time.",
    role: "I designed and built the complete MVP: product specification, FastAPI backend, PostgreSQL schema, worker orchestration, imaging-model paths, review workspace, audit and feedback systems, SQL marts, Power BI package, tests, and documentation.",
    build: [
      "Registered chest X-ray and brain MRI studies through a normalized ingestion contract with demo and DICOMweb-oriented adapters.",
      "Orchestrated ordered specialist services for representation, view quality, abnormality detection, urgency, explanation, report drafting, and discrepancy review.",
      "Persisted model runs, model versions, prompt versions, structured findings, report drafts, clinician feedback, final reports, audit events, and governance snapshots in PostgreSQL.",
      "Built a browser review workspace and three SQL-first reporting marts for operations, clinical quality, and governance.",
      "Added real-versus-stub labeling so the platform never implies that every component is clinically validated."
    ],
    decisions: [
      "Used a modular monolith plus a database-backed worker instead of premature microservices. Row locking with SKIP LOCKED provides safe concurrent claims without adding a queue broker to an MVP.",
      "Kept DICOM binaries and generated artifacts outside PostgreSQL while storing normalized metadata, retrieval references, and complete lineage in the operational database.",
      "Made AI suggestions assistive only: no autonomous diagnosis, no auto-signing, and no unsupported performance claim.",
      "Kept Power BI downstream of explicit SQL marts so dashboard logic remains inspectable and reproducible."
    ],
    validation: "The portfolio build processed 76 studies, persisted 129 candidate findings, recorded 304 workflow-agent runs, and produced 858 dashboard fact rows. The brain MRI benchmark path reached a held-out macro AUC of 0.9828. Contract tests, smoke scripts, typed APIs, and stored lineage verify system behavior beyond the model itself.",
    limits: "This is a production-style technical MVP, not a cleared medical device. The demonstration datasets and local environment cannot establish real-world clinical utility, site generalization, workflow safety, or prospective performance.",
    next: "The next serious step would be a de-identified clinical integration pilot: DICOMweb ingestion, site-specific validation, reader feedback, subgroup monitoring, latency testing, and prospective measurement under an approved governance process.",
    links: [
      ["Full project PDF", "files/radiology-value-pipeline/radiology_value_pipeline_mayo_portfolio.pdf"],
      ["Power BI export", "files/radiology-value-pipeline/RadiologyValuePipelineDashboard.pdf"],
      ["Operations SQL mart", "files/radiology-value-pipeline/sql/001_ops_dashboard.sql"],
      ["Clinical quality SQL mart", "files/radiology-value-pipeline/sql/002_quality_dashboard.sql"]
    ]
  },
  owl: {
    problem: "Important signals are scattered across email, calendars, code, commerce, chat, and local files. A normal chatbot waits to be asked and rarely maintains enough cross-source memory to notice a developing situation on its own.",
    role: "I architected and implemented the full system from scratch in Node.js, including the daemon, plugin contract, discovery engine, SQLite world model, delivery channels, Electron app, dashboard, MCP server, Docker deployment, documentation, and automated tests.",
    build: [
      "Created a world model for entities, relationships, events, patterns, situations, discoveries, feedback, and graph traversal.",
      "Built quick, deep, and daily scans with cross-source correlation, anomaly detection, quality filtering, and discovery chaining.",
      "Implemented source plugins for Gmail, Calendar, GitHub, Slack, Shopify, files, and mock data behind one watch/query contract.",
      "Delivered discoveries through CLI, Telegram, Slack, Discord, email, webhook, RSS/Atom, and WhatsApp.",
      "Exposed the world model through an Electron desktop app, D3 dashboard, natural-language query command, and 11 MCP tools."
    ],
    decisions: [
      "Kept the system local-first so users retain control of the world model and can use local models through Ollama.",
      "Separated source plugins, discovery logic, and delivery channels so integrations can change without rewriting the core.",
      "Filtered aggressively instead of maximizing notification volume; the product is only useful if it stays quiet when nothing matters.",
      "Fed user reactions back into preference scoring so useful discovery types are reinforced and dismissed patterns are dampened."
    ],
    validation: "The codebase contains more than 8,000 lines of production code and 98 passing tests. It supports 10 entity types, four discovery types, graph traversal, eight delivery channels, and five deployment modes: CLI, desktop, dashboard, Docker, and MCP.",
    limits: "Discovery quality still depends on source coverage, entity resolution, model quality, and enough historical context. Real connectors also introduce OAuth, rate-limit, and source-schema failure modes that mock data cannot reproduce fully.",
    next: "I would expand connector-level integration tests, add evaluation sets for discovery precision and usefulness, harden credential storage, and benchmark graph and scan performance on longer histories.",
    links: [
      ["GitHub repository", "https://github.com/msaule/owl"],
      ["Documentation", "https://msaule.github.io/owl"],
      ["npm package", "https://www.npmjs.com/package/owl-ai"]
    ]
  },
  wayline: {
    problem: "Conventional map products can calculate a route, but they do not plan the human trip particularly well. They rarely explain fuel cadence, overnight choices, hotel practicality, or whether the proposed drive matches the traveler's preferences.",
    role: "I built the product end to end: responsive interface, server-side route orchestration, stop generation, hotel lookup, trip scoring, predictive fit, product instrumentation, session security, paid-API controls, exports, and deployment.",
    build: [
      "Combined Google Routes and Places data into day-by-day plans with fuel stops, overnight cities, hotel options, and map handoff.",
      "Scored candidate stops using route position, detour cost, daily distance, hotel availability, and preference fit, then exposed the rationale to the user.",
      "Engineered trip features for a lightweight predictive-fit layer alongside a transparent rule-based quality score.",
      "Protected paid API usage with email-gated sessions, CSRF checks, rate limits, Redis locks, quotas, and server-side keys.",
      "Generated PDF, text, JSON, share-link, and Google Maps outputs from the same planning run."
    ],
    decisions: [
      "Kept route and scoring logic on the server so paid credentials and business logic are not exposed in the browser.",
      "Used explainable stop scoring because a traveler needs to understand why a city or hotel made the itinerary.",
      "Instrumented the funnel before claiming product success: planner views, gate submissions, runs, quota blocks, results, exports, and shares are structured events.",
      "Treated the predictive layer as lightweight guidance rather than overstating it as a mature recommendation model."
    ],
    validation: "The reference Las Vegas-to-Greensboro run produced a 2,256-mile plan, 32 hours 47 minutes of driving, three driving days, nine fuel stops, two overnight cities, a 67/100 quality score, and an 86% predicted fit. Every output format was generated from the same trip state.",
    limits: "The predictive fit layer needs real user feedback and completed-trip outcomes before it can be evaluated as a learned recommendation system. Route quality and hotel coverage also depend on external API freshness and availability.",
    next: "The next version should learn from accepted, edited, abandoned, and completed itineraries; compare predicted fit with observed behavior; and test stop-ranking quality across varied trip lengths and traveler profiles.",
    links: [
      ["Live application", "https://wayline.vercel.app/"],
      ["Planner", "https://wayline.vercel.app/planner/"],
      ["Application repository", "https://github.com/msaule/wayline-app"],
      ["Public-site repository", "https://github.com/msaule/wayline"]
    ]
  },
  ravel: {
    problem: "Generic AI chat tools do not understand the active RStudio session, and tools that can modify code create a second problem: an analyst must be able to inspect and control every proposed action.",
    role: "I designed, implemented, documented, tested, submitted, and now maintain the R package. That includes RStudio addins, context collection, provider integrations, model interpretation, staged actions, project-root safety, Quarto support, pkgdown documentation, and CRAN release work.",
    build: [
      "Collected active editor code, selections, loaded objects, console output, plots, project files, package metadata, and git state through explicit RStudio-aware helpers.",
      "Added official API and CLI integrations for multiple providers, including OpenAI Responses API support and remote MCP declarations.",
      "Built preview-first code and file actions with approval history and default blocking of writes outside the detected project root.",
      "Added interpretation helpers for lm and glm workflows plus Quarto drafting for methods, results, diagnostics, and interpretation.",
      "Published an installable package, reference site, articles, release assets, and cross-platform checks."
    ],
    decisions: [
      "Used explicit context collection rather than quietly sending an entire project to a provider.",
      "Staged every mutating action for review and avoided .GlobalEnv execution unless a user requests it.",
      "Kept network-backed providers out of examples and tests to meet CRAN expectations and maintain deterministic checks.",
      "Added MCP capability without a new required dependency, preserving a light installation path."
    ],
    validation: "Ravel was accepted on CRAN and is installable with install.packages('ravel'). Version 0.1.2 passed the GitHub Actions matrix on Windows, macOS, Ubuntu release, and Ubuntu devel. The submitted package checks reported zero errors, zero warnings, and one note.",
    limits: "Ravel can provide context and guardrails, but generated analysis still requires human review. Provider behavior, API changes, and user-supplied prompts remain external sources of variability.",
    next: "I would deepen model-diagnostic support, add structured evaluation cases for statistical explanations, broaden provider capability tests, and continue reducing the amount of context required for accurate assistance.",
    links: [
      ["CRAN package", "https://cran.r-project.org/package=ravel"],
      ["Package website", "https://msaule.github.io/ravel/"],
      ["GitHub repository", "https://github.com/msaule/ravel"],
      ["Reference documentation", "https://msaule.github.io/ravel/reference/"]
    ]
  },
  "mercury-market-sim": {
    problem: "Static price models cannot show how order-book rules, heterogeneous strategies, liquidity withdrawal, fees, and regulation interact to create or contain instability.",
    role: "I built the simulator, exchange mechanics, agent strategies, benchmark scenarios, stress controls, metrics, test suite, parameter sweeps, plots, and reproducible reporting workflow.",
    build: [
      "Implemented a continuous double auction with price-time priority, partial fills, cancels, replaces, iceberg orders, pegged orders, and maker-taker accounting.",
      "Designed market-making, momentum, arbitrage, execution, panic, stop-loss, spoofing, and venue-arbitrage agents.",
      "Added flash-crash, cross-asset, fragmented-venue, liquidity-withdrawal, and circuit-breaker experiments.",
      "Built benchmark and sweep tooling that ranks cases by fragility and publishes reproducible plots and reports."
    ],
    decisions: [
      "Modeled events through an actual order book instead of applying exogenous price paths, allowing crashes and dislocations to emerge from interaction.",
      "Kept scenarios configuration-driven so market rules and participant behavior can be compared under the same measurement layer.",
      "Separated simulator, metrics, benchmarks, plotting, and reporting so research outputs do not depend on notebook state."
    ],
    validation: "The system contains 18 benchmark scenarios and 67 passing tests. In the circuit-breaker comparison, measured fragility fell from 54.7493 to 21.0714 and crash detections fell from 45 to 9. Cross-asset and fragmented-venue experiments also produced measurable dislocation, routing, and P&L outputs.",
    limits: "MERCURY is a research simulator, not a calibrated replica of a particular exchange. Agent rules, latency assumptions, and order-flow distributions shape the results and should not be treated as forecasts of real markets.",
    next: "The next step would be calibration against public limit-order-book data, latency sensitivity tests, richer execution algorithms, and formal experiment tracking across seeds and parameter regimes.",
    links: [
      ["Research report", "files/mercury-market-sim/research_report.html"],
      ["Benchmark summary", "files/mercury-market-sim/benchmark-summary.md"],
      ["Reproduction commands", "files/mercury-market-sim/reproduce_commands.txt"]
    ]
  },
  "roblox-brand-worlds": {
    problem: "A branded 3D world has to communicate place, guide movement, support crowds, respect performance budgets, and still feel recognizable to the client. Players decide whether it works within seconds of spawning.",
    role: "Across ten years I worked as a world designer, 3D artist, environment artist, texture artist, builder, vehicle modeler, world-build lead, and former Roblox DevRel QA tester on shipped games and brand activations.",
    build: [
      "Led the Justice Hall area and surrounding environment for the Black Adam promotional event.",
      "Created building assets and supported a full lobby redesign for Bakugan Battle League.",
      "Built major Heaven and Hell environments, props, and catalog assets for the Ava Max launch-party experience.",
      "Produced 30+ vehicles for Anomic and environment expansions, terrain, city layouts, interiors, and world props across multiple games.",
      "Translated work tied to Warner Music, Sony Entertainment, DC, Bakugan, L'Oreal, and other clients into usable interactive spaces."
    ],
    decisions: [
      "Used roads, lighting, landmarks, scale, and sightlines to guide players without relying on instructions.",
      "Balanced visual ambition against lower-end device performance and high concurrent traffic.",
      "Designed event spaces for crowds, social movement, screenshots, timed moments, and client review rather than treating them as static art scenes."
    ],
    validation: "The shipped experiences I contributed to total more than 6.5 billion place visits. I delivered work across major entertainment and consumer-brand activations and was personally commended by Roblox CEO David Baszucki during the platform's early interactive-concert era.",
    limits: "Visit counts belong to the complete experiences and teams, not to a single asset or contributor. Public archives for older live events are incomplete, so the case study separates my specific responsibilities from platform-wide outcomes.",
    next: "I would continue documenting surviving source material, production responsibilities, and before-and-after environment work so the archive preserves more of the design process behind the shipped worlds.",
    links: []
  },
  fulfillment: {
    problem: "A fulfillment dashboard can show that an SLA failed, but it cannot tell leaders which staffing change would have prevented the failure. The decision requires a model of queues, capacity, variability, and system pressure.",
    role: "I built the discrete-event engine, observer process, station metrics, live alert logic, pressure and risk scores, staffing optimizer, structured exports, and four-page Power BI decision layer.",
    build: [
      "Modeled an eight-hour shift with Poisson arrivals, exponential service times, and constrained Pick, Pack, Sort, and Outbound resources.",
      "Sampled WIP, completions, breaches, queues, and active workers every minute while tracking event-based station utilization and queue behavior.",
      "Triggered queue blowup, WIP runaway, and SLA drift alerts during the simulation rather than inventing them afterward.",
      "Combined SLA rate, maximum WIP, and top station pressure into a 0-100 system-risk score.",
      "Ran bounded grid search across thousands of staffing combinations and selected the lowest-headcount feasible plan below the risk threshold."
    ],
    decisions: [
      "Built the engine before the dashboard so every visual is downstream of reproducible simulation output.",
      "Combined utilization with maximum queue length because sustained load and shock congestion describe different failure modes.",
      "Optimized against a transparent risk function and explicit headcount constraint instead of producing an opaque recommendation."
    ],
    validation: "Baseline, surge, and optimized scenarios run through the same engine and produce minute-, station-, event-, scenario-, and optimization-level CSV outputs. Fixed seeds make comparisons reproducible, and the selected plan is traceable to the complete grid-search result set.",
    limits: "Service distributions and routing logic are simplified representations of a facility. Real staffing decisions would require calibration with scan events, labor rules, break schedules, rework, equipment downtime, order mix, and multiple operating days.",
    next: "I would calibrate arrivals and service times from warehouse event data, add labor scheduling and downtime, run repeated seeds with confidence intervals, and compare robust plans across demand forecasts.",
    links: []
  },
  "blockchain-fraud": {
    problem: "A fraud score identifies suspicious claims, but investigators also need a record they can audit and verify after handoffs or attempted modification.",
    role: "I built the Python pipeline end to end: claim preparation, XGBoost scoring, risk classification, SHA-256 block construction, chain validation, JSON export, and Streamlit review interface.",
    build: ["Scored more than 1,000 insurance claims for fraud probability.", "Stored claim and score metadata in hash-linked blocks with previous-hash validation.", "Added analyst views for high-risk claims and portable JSON output for inspection."],
    decisions: ["Kept prediction and audit integrity as separate concerns so a model update does not rewrite the historical ledger.", "Used a small custom chain to demonstrate tamper evidence clearly rather than claiming enterprise blockchain infrastructure."],
    validation: "The workflow produces a fraud probability and immutable-style ledger entry for every processed claim, and chain validation detects broken hash linkage.",
    limits: "A custom ledger does not provide decentralized consensus, production identity, access control, or regulatory compliance. Model performance also depends on the representativeness of the claim data.",
    next: "Add model monitoring, investigator feedback, role-based access, signed events, and comparison with a conventional append-only database audit design.",
    links: []
  },
  "insurance-fraud": {
    problem: "Fraud is an imbalanced classification problem where accuracy can look acceptable even when the model misses nearly every fraudulent claim.",
    role: "I built the complete modeling workflow: cleaning, preprocessing, train-test evaluation, three model families, fraud-class metrics, SHAP interpretation, saved models, and scoring scripts.",
    build: ["Prepared 1,000 claims with 39 policy, claim, demographic, and vehicle features.", "Compared logistic regression, random forest, and XGBoost under the same preprocessing and evaluation workflow.", "Evaluated ROC-AUC, fraud precision, fraud recall, accuracy, and confusion matrices instead of relying on accuracy alone.", "Used SHAP to expose the features driving XGBoost risk estimates and serialized models for reuse."],
    decisions: ["Maintained logistic regression as an interpretable baseline before moving to nonlinear tree models.", "Reported fraud recall and precision alongside AUC because ranking performance alone does not define an investigation policy.", "Did not hide the tradeoff: Random Forest had the strongest AUC, while XGBoost produced substantially better fraud recall."],
    validation: "Logistic regression reached 0.61 ROC-AUC and detected no fraud at the default threshold. Random Forest reached 0.86 AUC; XGBoost reached 0.83 AUC with 0.62 fraud precision, 0.51 fraud recall, and 0.81 accuracy.",
    limits: "The dataset is small and class-imbalanced. Results need repeated cross-validation, threshold tuning tied to investigation capacity, and testing on newer claims before operational use.",
    next: "Evaluate resampling and class-weight strategies, calibrate probabilities, choose thresholds from investigation cost, and expose the model through a monitored scoring API.",
    links: []
  },
  "ai-scheduling": {
    problem: "Patient-access leaders need to know where delay and utilization problems form, which factors drive them, and whether capacity will meet upcoming demand.",
    role: "I designed the synthetic data model, analytical measures, forecasting views, AI-assisted driver analysis, decomposition paths, executive narrative, and Power BI report.",
    build: ["Modeled 25,000 appointments across departments, providers, insurance types, and visit types.", "Built access, delay, utilization, cancellation, and demand measures for operational review.", "Used forecasting, Key Influencers, and decomposition trees to move from KPI monitoring to driver analysis.", "Packaged the findings into an executive-facing dashboard and written report."],
    decisions: ["Used synthetic records to demonstrate the operating workflow without implying access to protected patient data.", "Kept driver visuals alongside departmental context so a correlation is not presented as a universal scheduling rule."],
    validation: "The finished report supports department, provider, payer, and visit-type slicing across 25,000 consistent appointment records and preserves the same metric definitions across pages.",
    limits: "Synthetic data cannot validate real patient behavior, clinical urgency, scheduling policy, or causal interventions. Forecasts are demonstrations until calibrated with production history.",
    next: "Connect de-identified scheduling history, define intervention cohorts, backtest forecasts, and measure whether recommended capacity changes improve access without harming continuity or equity.",
    links: [["Project report", "files/ai-scheduling/Hospital_Efficiency_Report.pdf"]]
  },
  "lung-cancer": {
    problem: "Lung-cancer survival varies sharply, but decision-makers need an interpretable view of which patient and disease factors are most strongly associated with two-year outcomes.",
    role: "I cleaned the SEER cohort, defined survival outcomes, ran statistical tests and logistic regression, exported model outputs, and built the Power BI interpretation layer.",
    build: ["Prepared more than 114,000 Lung and Bronchus cancer cases from SEER 2004-2015.", "Defined two-year survival as the primary outcome and five-year survival as a reference measure.", "Used chi-square tests, t-tests, ANOVA, and multivariable logistic regression across stage, tumor size, lymph nodes, sex, and race.", "Built Power BI views with stage, demographic, tumor, and time filters."],
    decisions: ["Centered interpretation on odds and uncertainty rather than presenting the model as an individual prognosis tool.", "Kept stage and tumor burden visible beside demographic differences because their effects were materially larger."],
    validation: "Localized-stage cases had roughly eight times the modeled odds of two-year survival. Tumor size and lymph-node involvement reduced survival odds, while sex and race showed smaller secondary associations.",
    limits: "Registry analysis is observational and constrained by coding, missingness, treatment detail, and cohort period. Associations do not establish treatment effects or individual prognosis.",
    next: "Add treatment and comorbidity context where available, evaluate calibration and temporal drift, and compare logistic results with survival-analysis methods that use censoring directly.",
    links: [["Analysis PDF", "files/lung-cancer/Cancer-Project.pdf"], ["Power BI snapshot", "files/lung-cancer/powerbi-dashboard-snapshot.pdf"]]
  },
  readmission: {
    problem: "Thirty-day readmissions combine clinical complexity, utilization, and equity concerns. The raw encounter data is too messy for reliable modeling or BI without a disciplined data layer.",
    role: "I built the normalized MySQL schema, staging and mapping workflow, analysis view, R modeling pipeline, subgroup analysis, dashboard exports, and three-page Power BI report.",
    build: ["Loaded and normalized roughly 100,000 encounters from the Diabetes 130-US Hospitals dataset.", "Mapped diagnoses, medications, labs, demographics, and readmission outcomes into an analysis-ready view.", "Built a binary 30-day readmission outcome and logistic model in R.", "Published overview, equity, and clinical-driver pages with consistent measures and subgroup comparisons."],
    decisions: ["Separated staging, normalized entities, and the analysis view so cleaning logic is reusable outside Power BI.", "Reported subgroup gaps with context instead of using equity visuals as causal claims.", "Combined model results with operationally legible thresholds such as diagnoses, medication count, and length of stay."],
    validation: "The cohort showed an overall readmission rate near 11%, a roughly 2.7-point gap between the lowest and highest racial subgroups, and higher observed risk among encounters with more diagnoses, more medications, and longer stays.",
    limits: "The data covers 1999-2008 and lacks many contemporary clinical and social factors. Encounter-level associations are not a validated bedside risk score or evidence that demographic identity causes readmission.",
    next: "Use current data, add confidence intervals and calibration, test temporal and site generalization, and evaluate interventions against capacity, equity, and preventability criteria.",
    links: [["SQL pipeline", "files/readmission/diabetes-readmission.sql"], ["Research report", "files/readmission/diabetes-research-report.pdf"]]
  },
  "hospital-prices": {
    problem: "Hospitals can submit very different charges for comparable inpatient services, and charge figures alone are difficult to interpret without a common payment benchmark and market context.",
    role: "I prepared the 2023 CMS inpatient data, constructed DRG-level charge and Medicare-payment comparisons, analyzed state and regional variation, modeled relationships, and produced the self-contained report.",
    build: ["Compared submitted charges and Medicare payments at the DRG and hospital level.", "Mapped state and regional variation and separated service mix from geographic patterns.", "Built scatter, gap, and market-context views for large outliers and recurring pricing structures."],
    decisions: ["Used Medicare payment as a consistent benchmark rather than treating submitted charge as realized revenue.", "Kept results stratified by service and geography so comparisons do not mix fundamentally different inpatient cases."],
    validation: "The report reproduces state, regional, service-level, and hospital-market views from one 2023 CMS source and makes high-gap observations traceable to the underlying comparison level.",
    limits: "Charges are not negotiated prices or patient out-of-pocket costs. Medicare payment also reflects policy adjustments and should not be interpreted as a complete measure of cost or quality.",
    next: "Add negotiated-price data, hospital characteristics, quality measures, and longitudinal years to separate persistent market structure from one-year variation.",
    links: [["Interactive HTML report", "files/hospital-prices/hospital-price-variation-report.html"]]
  },
  "dying-on-the-margin": {
    problem: "Hospital occupancy is commonly treated as an efficiency measure, but its relationship with mortality is confounded by hospital type, case mix, and the difference between average utilization and true surge pressure.",
    role: "I defined the research question, prepared the hospital-level measures, built simple and adjusted regression models, checked diagnostics, compared rural and urban patterns, and wrote the report.",
    build: ["Modeled risk-adjusted heart-failure mortality against capacity utilization.", "Added hospital context and rural-versus-urban comparisons instead of stopping at a bivariate result.", "Produced diagnostics and relationship plots to examine whether the fitted model was credible."],
    decisions: ["Kept the counterintuitive negative simple-model association visible rather than forcing the expected story.", "Separated statistical association from causal claims and treated occupancy as an imperfect systems signal."],
    validation: "The simple linear model estimated a slope near -2.8731 with p < 0.001. Additional context and diagnostics were used to show why statistical significance alone does not resolve the operational interpretation.",
    limits: "Hospital-level observational data cannot identify short-term crowding effects, patient-level risk, or causality. Average occupancy can hide peaks, staffing shortages, boarding, and internal bottlenecks.",
    next: "Use daily or hourly capacity data, patient-level risk adjustment, nonlinear thresholds, staffing measures, and quasi-experimental designs around demand shocks.",
    links: [["Self-contained HTML report", "files/dying-on-the-margin/dying-on-the-margin.html"]]
  },
  "market-basket": {
    problem: "Millions of order rows contain useful product relationships, but dense transaction matrices and popularity effects can make association mining computationally expensive and commercially misleading.",
    role: "I built the Python workflow for chunked loading, product lookup, snack-department filtering, sparse basket construction, Apriori mining, rule evaluation, visualization, and business interpretation.",
    build: ["Processed more than three million Instacart orders and narrowed the analysis to snacks for a coherent merchandising question.", "Built an order-by-item sparse boolean matrix rather than a dense table.", "Ran Apriori with 0.003 minimum support and maximum itemset length of three.", "Ranked rules by support, confidence, and lift and visualized product networks and tradeoffs."],
    decisions: ["Restricted the domain to reduce noise and keep the resulting rules usable for merchandising.", "Used lift to distinguish genuine co-purchase strength from pairs driven primarily by item popularity.", "Treated rules as hypotheses for promotions and tests, not automatic recommendations."],
    validation: "The analysis recovered coherent clusters including gluten-free granola products, Annie's fruit snacks, and trail mix with unsalted nuts, while also identifying the small set of products dominating snack volume.",
    limits: "Association does not prove that bundling causes incremental sales. Results depend on support thresholds, product taxonomy, order history, and the absence of price and promotion context.",
    next: "Join promotion and price data, test stability over time, evaluate holdout baskets, and use controlled experiments to estimate incremental cross-sell lift.",
    links: []
  },
  "education-wage": {
    problem: "Long-run wage inequality cannot be summarized by one average gap because education premiums, gender differences, and their interaction change over time.",
    role: "I cleaned and reshaped fifty years of wage data, built trend measures, modeled education and gender interactions, produced visual explanations, and wrote the economic interpretation.",
    build: ["Prepared annual wage series spanning 1973-2022.", "Measured the college wage premium and gender gap through time.", "Used regression interactions to test whether education returns differ by gender rather than treating both effects independently."],
    decisions: ["Used interaction terms because an additive model would hide whether education changes the gender gap.", "Kept nominal trend storytelling separate from model interpretation and focused conclusions on persistent patterns."],
    validation: "The analysis shows a growing college wage premium, gradual convergence for women, and persistent differences in the modeled return to higher education across gender over the fifty-year period.",
    limits: "Aggregated observational data cannot isolate occupation, experience, hours, geography, selection into education, or causal returns to a degree.",
    next: "Move to individual microdata, adjust for occupation and labor-force attachment, test cohort effects, and estimate uncertainty around time-varying gaps.",
    links: []
  },
  "bank-loan": {
    problem: "Loan-policy discussions become vague when managers cannot see how weighting credit, debt burden, and other factors changes individual decisions and portfolio risk.",
    role: "I built the workbook architecture, configurable scoring tables, applicant engine, dynamic lookups, risk tiers, policy controls, and management dashboard.",
    build: ["Scored more than 300 applicants through transparent configurable criteria.", "Used dynamic lookup logic to map inputs into points and risk tiers.", "Connected weight changes to approval rates and portfolio distributions in real time.", "Created applicant-level and portfolio-level views in one Excel model."],
    decisions: ["Kept scoring logic visible in tables instead of burying policy inside opaque formulas.", "Separated applicant data, configuration, calculation, and dashboard layers so policy changes are auditable."],
    validation: "Users can change credit and debt-to-income weights and immediately trace the resulting score, tier, approval decision, and portfolio shift across the 300+ applicant dataset.",
    limits: "This is an educational decision model, not a validated underwriting system. Real use would require fair-lending review, outcome labels, calibration, adverse-action logic, and controlled governance.",
    next: "Add repayment outcomes, test discrimination and calibration, define policy constraints, and compare the scorecard with interpretable statistical and machine-learning baselines.",
    links: [["Excel workbook", "files/bank-loan/BankLoanProject.xlsx"]]
  },
  "hospital-forecast": {
    problem: "Hospital budgets are sensitive to reimbursement, inflation, service mix, and avoidable utilization, but static forecasts do not show leaders how those assumptions interact.",
    role: "I built the department-level model, assumptions layer, scenario controls, forecast calculations, exception signals, and executive dashboard in Excel.",
    build: ["Forecast revenue, cost, and profitability by department.", "Added adjustable levers for cost inflation, readmission reduction, and payer reimbursement.", "Linked assumptions to automated performance alerts and summary views."],
    decisions: ["Separated assumptions from calculations so every scenario is inspectable and reversible.", "Used department detail to prevent enterprise averages from hiding financially different service lines."],
    validation: "The workbook recalculates departmental and enterprise outcomes immediately when operating assumptions change and keeps scenario outputs tied to the same baseline logic.",
    limits: "The model is a planning demonstration and does not include a hospital's full contract, acuity, volume, labor, capital, or accounting structure.",
    next: "Connect actual-versus-budget history, estimate uncertainty ranges, add service-line volume drivers, and run probabilistic rather than single-point scenarios.",
    links: []
  },
  "hospital-db": {
    problem: "Hospital workflows depend on related patient, appointment, medication, billing, and departmental records; flat files make integrity, updates, and reporting difficult to control.",
    role: "I designed the relational model, normalization, relationships, validation rules, transactional operations, user forms, CRUD workflows, and reporting queries.",
    build: ["Created a 12-table schema with enforced keys and referential integrity.", "Implemented patient intake, appointments, billing, medication management, and transactional inserts.", "Built operational forms and department-level financial reporting queries."],
    decisions: ["Normalized the operational core to reduce duplication and update anomalies.", "Used explicit relationships and validation rules so data quality is enforced before reporting."],
    validation: "The system supports complete create, read, update, and delete workflows while preserving relationships across twelve tables and producing repeatable departmental reports.",
    limits: "The project is a database-system demonstration, not an EHR. It does not implement clinical interoperability standards, production security, privacy controls, terminology services, or enterprise-scale availability.",
    next: "Add role-based access, audit history, FHIR-oriented interfaces, test data generation, migration tooling, and a production database platform.",
    links: []
  }
};
