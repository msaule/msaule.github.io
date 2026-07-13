window.PORTFOLIO_CASE_NARRATIVES = {
  "earnings-quality-autopsy": [
    {
      title: "From earnings call to evidence trail",
      paragraphs: [
        "I built this around the work that happens after a company makes a polished earnings claim. The system ingests SEC filings and companyfacts, normalizes quarterly statements and trailing-twelve-month measures, and keeps the source and derivation path attached to each metric.",
        "That gives the analyst a way to move from a management statement to the revenue, margin, cash conversion, working-capital, segment, or non-GAAP evidence that should support it. The point is to make the work reviewable instead of leaving the reasoning inside a spreadsheet or a summary paragraph."
      ]
    },
    {
      title: "A claim-by-claim research workflow",
      paragraphs: [
        "The research engine runs nine forensic modules across cash conversion, working capital, revenue quality, margins, non-GAAP adjustments, segments, KPI continuity, language drift, and management claims. Each claim becomes a structured object with the exact quote, required checks, supporting evidence, tension points, unresolved items, confidence, and follow-up question.",
        "I built the review experience in Next.js and TypeScript so a user can work through dossiers, evidence maps, segment analysis, source review, and production runs in one place. The same run produces JSON, Markdown, HTML, CSV, and Excel outputs for a portfolio-manager handoff."
      ]
    },
    {
      title: "Built to be inspected",
      paragraphs: [
        "The project has 14 FastAPI routes and 187 backend tests covering completion, source links, artifacts, cache behavior, production checks, and PM review. The AAPL run creates a normalized financial model, evidence ledger, dossier, research note, and linked workpaper package from a single traceable workflow.",
        "That structure matters because it keeps the research useful after the first read. A reviewer can follow the path from a narrative claim back to the filing evidence, the calculation, and the questions that still need an answer."
      ]
    }
  ],
  falsifyr: [
    {
      title: "Testing the result after it looks significant",
      paragraphs: [
        "falsifyr starts where many analysis workflows end. Once a model produces a notable coefficient, the package asks how stable that result is under reasonable changes to the data, specification, uncertainty estimate, and sampling setup.",
        "I designed the package around a practical question: what is the smallest attack that changes the claim? That turns a long diagnostic checklist into a ranked, reproducible investigation."
      ]
    },
    {
      title: "One engine, eight attack families",
      paragraphs: [
        "The package supports lm, glm, and selected hypothesis-test claims through row deletion, uncertainty, covariate, missingness, measurement-error, placebo, specification, and sample-split attacks. Every run records the formula, focal term, alternative hypothesis, seed, attack settings, package version, R version, and session details.",
        "The output includes a survival score, smallest-kill result, leaderboard, static HTML report, and plots. Each result keeps the attack itself visible, so an analyst can see what changed and why instead of receiving a black-box score."
      ]
    },
    {
      title: "Package-level engineering",
      paragraphs: [
        "I built the R package, S3 methods, plotting layer, reporting layer, RStudio addin, vignettes, and test suite as one release workflow. The addin finds supported model objects in an active RStudio session and launches the same controlled analysis without forcing a separate environment.",
        "Version 0.1.0 contains 11 exported functions, 65 testthat blocks, and eight attack families. Local R CMD check --as-cran completes with the test suite passing."
      ]
    }
  ],
  "radiology-value-pipeline": [
    {
      title: "A workflow around the model",
      paragraphs: [
        "I designed Radiology Value Pipeline around the work that follows an imaging prediction. A study enters through a normalized ingestion contract, moves through an ordered pipeline, and leaves behind structured findings, urgency suggestions, report drafts, feedback events, final reports, discrepancy records, and audit history.",
        "FastAPI handles the product APIs, PostgreSQL holds the operational state and lineage, and a database-backed worker claims jobs with row locking. The modular-monolith design keeps the system runnable and understandable while preserving clean boundaries for ingestion, pipeline services, reporting, feedback, governance, and dashboard marts."
      ]
    },
    {
      title: "Two imaging paths, one operating model",
      paragraphs: [
        "The chest X-ray path covers the high-throughput workflow: study registration, view-quality checks, target probabilities, assistive urgency, structured report drafting, review feedback, discrepancy handling, and dashboard publication. The brain MRI path adds multi-class tumor classification, context-aware slice analysis, segmentation-backed localization, and patient-level 3D corroboration.",
        "Each specialist service records its version, status, latency, inputs, outputs, and artifacts. The held-out brain MRI benchmark reached a macro AUC of 0.9828, while the chest X-ray bundle exposes target-level performance rather than hiding variation inside a single score."
      ]
    },
    {
      title: "The product surface",
      paragraphs: [
        "The browser workspace gives a reviewer the study context, image preview, candidate findings, model posture, evidence references, draft report, feedback controls, discrepancy events, agent ledger, and audit trail in one review surface. Structured findings come before the human-readable report text, which keeps the information usable downstream.",
        "I also built SQL-first marts and Power BI outputs for operations, clinical quality, governance, model inventory, and agent lineage. The portfolio run processed 76 studies, stored 129 candidate findings, recorded 304 workflow-agent runs, and produced 858 dashboard fact rows."
      ]
    }
  ],
  ravel: [
    {
      title: "Built inside the analyst's workspace",
      paragraphs: [
        "Ravel lives in the place where statistical work already happens. It collects selected code, active editor content, loaded objects, console output, plots, project files, package metadata, and git state through explicit RStudio-aware helpers.",
        "That context supports code explanation, debugging, model interpretation, modeling comparisons, and Quarto drafting without making the analyst reconstruct their project in a separate chat window."
      ]
    },
    {
      title: "Actions stay reviewable",
      paragraphs: [
        "I built preview-first code and file actions so an analyst can inspect a proposed change before it is applied. Ravel records approval history and blocks writes outside the detected project root unless the user explicitly allows them.",
        "The package also includes helpers for lm and glm interpretation, Quarto methods and results drafting, provider configuration, and remote MCP declarations. The design keeps the useful parts of AI assistance close to reproducible analysis work."
      ]
    },
    {
      title: "A real CRAN release workflow",
      paragraphs: [
        "Ravel is published on CRAN and installs through install.packages('ravel'). I prepared the documentation, test suite, examples, release assets, pkgdown site, GitHub Actions matrix, and submission materials as part of the package itself.",
        "Version 0.1.2 added OpenAI Responses API support, remote MCP declarations, refreshed provider defaults, and stronger file-action controls. The release passed checks across Windows, macOS, Ubuntu release, and Ubuntu devel."
      ]
    }
  ],
  wayline: [
    {
      title: "Planning the trip, not just the route",
      paragraphs: [
        "Wayline turns a long drive into a plan someone can actually use. The planner takes origin, destination, number of days, fuel cadence, route preference, and travel assumptions, then combines Google Routes and Places data into a day-by-day itinerary.",
        "A completed run includes fuel stops, overnight cities, hotel options, map handoff, export files, and the reasoning behind the plan. The reference Las Vegas-to-Greensboro route covered 2,256 miles in 32 hours and 47 minutes across three driving days, with nine fuel stops and two overnight cities."
      ]
    },
    {
      title: "Explainable trip scoring",
      paragraphs: [
        "I scored candidate stops using route position, detour cost, daily distance, hotel availability, and preference fit. The planner surfaces the tradeoffs so a traveler can see why a city or hotel was chosen instead of getting an unexplained recommendation.",
        "The same trip state feeds a transparent quality score and a lightweight predictive-fit layer. The reference itinerary produced a 67 out of 100 quality score and an 86 percent predicted fit, alongside PDF, text, JSON, share-link, and Google Maps outputs."
      ]
    },
    {
      title: "Designed as an operating product",
      paragraphs: [
        "Paid map APIs and product measurement shaped the backend. I kept route logic server-side and added email-gated sessions, CSRF checks, rate limits, Redis locks, quotas, and server-side keys around the planning flow.",
        "The product tracks planner views, gate submissions, planning runs, quota blocks, result views, exports, and shares. That event layer gives future iterations a clean base for funnel analysis and trip-quality evaluation."
      ]
    }
  ],
  owl: [
    {
      title: "A living model of the work around you",
      paragraphs: [
        "OWL is built around a local SQLite world model of entities, relationships, events, patterns, situations, discoveries, and user feedback. Gmail, Calendar, GitHub, Slack, Shopify, local files, and mock data flow through one plugin contract, which keeps the core independent from any single source.",
        "I implemented two-tier entity extraction, fuzzy resolution, relationship traversal, and a graph that can surface paths, clusters, bridges, and hubs across the information a person already has."
      ]
    },
    {
      title: "Finding the signal",
      paragraphs: [
        "The daemon runs quick, deep, and daily scans across connected sources. It correlates events, detects anomalies, filters low-value findings, chains discoveries together, and learns from reactions to avoid sending noise back to the user.",
        "Each discovery carries type, urgency, confidence, and source context. That gives the user a path from a surfaced pattern back to the underlying events and entities that produced it."
      ]
    },
    {
      title: "Built to live on a machine",
      paragraphs: [
        "I delivered OWL through a CLI, Electron desktop app, D3 dashboard, Docker setup, MCP server, and eight delivery channels including Slack, Discord, Telegram, email, webhooks, RSS, and WhatsApp. The desktop experience includes a tray feed, native notifications, a global hotkey, reconnect behavior, and persisted window state.",
        "The codebase contains more than 8,000 lines of production code and 98 passing tests. It supports 10 entity types, four discovery types, 11 MCP tools, and five deployment modes."
      ]
    }
  ],
  "mercury-market-sim": [
    {
      title: "The exchange engine",
      paragraphs: [
        "MERCURY starts with a continuous double auction rather than a prewritten price path. The exchange handles price-time priority, partial fills, cancels, replaces, iceberg orders, pegged orders, and maker-taker accounting, so prices, depth, and spreads emerge from the interaction inside the book.",
        "I added market-making, momentum, arbitrage, execution, panic, stop-loss, spoofing, and venue-arbitrage agents to give the market different sources of liquidity, pressure, and feedback."
      ]
    },
    {
      title: "Stress behavior as a measurable output",
      paragraphs: [
        "The scenario library covers flash-crash formation, liquidity withdrawal, cross-asset spillovers, fragmented venues, fee economics, and circuit-breaker controls. Each experiment records market-quality and strategy outcomes rather than relying on a single price chart.",
        "In the circuit-breaker comparison, measured fragility fell from 54.7493 to 21.0714 and crash detections fell from 45 to 9. Cross-asset and venue experiments also produced dislocation, routing, and P&L measures that can be compared across runs."
      ]
    },
    {
      title: "Research workflow around the simulator",
      paragraphs: [
        "I built benchmark, sweep, plotting, and reporting tooling around the exchange so one scenario can become a repeatable research family. Parameters, objectives, rankings, and visual outputs are kept outside notebook state and published through the same workflow.",
        "The platform includes 18 benchmark scenarios and 67 passing tests across matching mechanics, metrics, reporting, and visualizations. The report bundle lets a reader inspect the conditions, figures, and results without rebuilding the environment from scratch."
      ]
    }
  ],
  "roblox-brand-worlds": [
    {
      title: "A decade of shipped 3D work",
      paragraphs: [
        "Before analytics became the center of my portfolio, I spent ten years building Roblox worlds and assets for live games, expansions, and branded events. My work covered environment design, terrain, texture work, props, vehicles, background buildings, city layouts, interiors, and world build.",
        "I worked across roleplay, music, film, toy, beauty, nonprofit, horror, and consumer-brand experiences. The projects included work connected to Warner Music, Sony Entertainment, DC's Black Adam, Bakugan, L'Oreal, and other large campaigns."
      ]
    },
    {
      title: "Designing places people can use immediately",
      paragraphs: [
        "World design had to do more than look good. Roads, lighting, landmarks, scale, and sightlines carried the player from the first spawn point through social spaces, event moments, and brand areas without a manual explaining where to go.",
        "I balanced those visual decisions against lower-end device performance, large crowds, client review, screenshots, and live-event deadlines. The work translated client concepts into spaces that felt legible, memorable, and usable once players arrived."
      ]
    },
    {
      title: "Selected production work",
      paragraphs: [
        "For Black Adam, I led the Justice Hall area and the surrounding world environment. For Bakugan Battle League, I created building assets and supported a full lobby redesign. For the Ava Max launch party, I helped shape the map and built the major Heaven and Hell environments, props, and catalog assets.",
        "I also produced more than 30 vehicles for Anomic, built stylized props and expansion environments for Spirit Guides, and helped develop Dreamworld RP from the ground up. The experiences I contributed to total more than 6.5 billion place visits, and Roblox CEO David Baszucki personally commended my work during the early interactive-concert era."
      ]
    }
  ],
  fulfillment: [
    {
      title: "The operating model",
      paragraphs: [
        "I modeled an eight-hour fulfillment shift in SimPy with Poisson order arrivals, exponential service times, and capacity-constrained Pick, Pack, Sort, and Outbound stations. Every order follows the same lifecycle through the facility, allowing queue buildup and SLA pressure to emerge from the operating rules.",
        "A fixed random seed makes baseline, surge, and staffing scenarios comparable. The engine tracks work in process at creation and completion, which makes runaway accumulation visible before the facility only shows a final SLA failure."
      ]
    },
    {
      title: "Minute-level observability",
      paragraphs: [
        "A dedicated observer samples the system every minute: WIP, completions, breaches, breach rate, queue length by station, and active workers. Those records feed the Power BI time series directly instead of relying on post-run estimates.",
        "The alert layer runs during the simulation and raises queue blowup, WIP runaway, and SLA-drift events. Station metrics combine busy time, utilization, queue behavior, and pressure into a view of which part of the flow is starting to constrain the rest of the system."
      ]
    },
    {
      title: "Turning risk into a staffing decision",
      paragraphs: [
        "I combined SLA performance, maximum WIP, and the highest station-pressure score into a transparent 0 to 100 system-risk measure. The model then evaluates staffing combinations through a bounded grid search and ranks feasible plans by headcount and risk.",
        "The final outputs include minute, station, event, scenario, and optimization-level CSVs plus a four-page Power BI layer. A reader can trace a staffing recommendation back to the simulated pressure, queue, risk, and SLA behavior that produced it."
      ]
    }
  ],
  "insurance-fraud": [
    {
      title: "A reusable modeling pipeline",
      paragraphs: [
        "The project starts with 1,000 insurance claims and 39 policy, claim, demographic, and vehicle features. I mapped the fraud target, split numeric and categorical inputs, applied median and most-frequent imputation, and used a scikit-learn ColumnTransformer so every model used the same preprocessing path.",
        "Each candidate model lives inside a pipeline with its preprocessing, training, evaluation, and serialization steps. That made the comparison repeatable and left behind saved models and scoring scripts instead of a one-time notebook result."
      ]
    },
    {
      title: "Comparing the real tradeoff",
      paragraphs: [
        "I compared logistic regression, random forest, and XGBoost on ROC-AUC, fraud precision, fraud recall, accuracy, confusion matrices, and ROC curves. The baseline logistic model reached 0.61 AUC and detected no fraud at the default threshold.",
        "Random Forest reached 0.86 AUC and XGBoost reached 0.83. XGBoost produced the more useful screening balance in this run, with 0.62 fraud precision, 0.51 fraud recall, and 0.81 accuracy."
      ]
    },
    {
      title: "Making the score inspectable",
      paragraphs: [
        "I added SHAP analysis to show how the XGBoost model was separating high- and low-risk claims. Major-damage and total-loss indicators carried strong positive influence, while policy, vehicle, and customer signals added context to the prediction.",
        "The result is an end-to-end fraud-screening workflow that pairs model performance with feature-level explanation, reusable model artifacts, and a clear path from raw claim fields to a risk score."
      ]
    }
  ],
  "lung-cancer": [
    {
      title: "A clinically grounded cohort",
      paragraphs: [
        "I worked with more than 114,000 lung and bronchus cancer cases from the SEER registry between 2004 and 2015. The analysis kept first primary cancers, cleaned survival months, and created two-year survival as the main outcome with five-year survival as a reference view.",
        "The project is personal to me because my father died from cancer. I wanted to use a large public dataset to understand which clinical factors stand out most clearly in the survival record and to build a reporting layer that makes those relationships easier to inspect."
      ]
    },
    {
      title: "From descriptive tests to a model",
      paragraphs: [
        "I used chi-square tests for stage, sex, and race; t-tests and ANOVA for tumor size; and a multivariable logistic regression across stage, tumor size, positive lymph nodes, sex, and race. Cleaned data and model outputs were exported from R for Power BI.",
        "Stage dominated the results. Localized disease had 8.13 times the modeled odds of two-year survival, regional disease had 3.20 times the odds, and tumor burden and positive lymph nodes moved survival in the opposite direction."
      ]
    },
    {
      title: "A dashboard for the pattern behind the outcome",
      paragraphs: [
        "The Power BI layer makes the cohort readable through stage, demographic, tumor, and time filters. It pairs survival rates with the regression drivers so the reader can move between raw group patterns and the adjusted model.",
        "Localized cases had a 65.6 percent two-year survival rate compared with 12.0 percent for distant disease. That gap, more than any single dashboard visual, is the central finding of the work."
      ]
    }
  ],
  readmission: [
    {
      title: "A data layer before the dashboard",
      paragraphs: [
        "I started with roughly 100,000 encounters from the Diabetes 130-US Hospitals dataset and built a normalized MySQL foundation around patients, encounters, diagnoses, medications, reference codes, and raw staging data. The raw CSV was mapped through a repeatable ETL flow into reusable entities and an analysis-ready view.",
        "That separation meant the cleaning logic lived in the data layer instead of being buried inside Power BI transformations. R and the dashboard could both use the same definitions for demographics, utilization, clinical complexity, and 30-day readmission."
      ]
    },
    {
      title: "Risk, utilization, and equity in one analysis",
      paragraphs: [
        "In R, I defined the binary under-30-day readmission outcome and modeled it against encounter characteristics. The cohort's overall readmission rate was near 11 percent, with higher observed risk among encounters with more diagnoses, more medications, and longer stays.",
        "I also kept subgroup comparisons visible in the report. The observed gap between the lowest and highest racial subgroups was about 2.7 percentage points, giving the analysis a way to connect operational risk patterns with equity monitoring."
      ]
    },
    {
      title: "A consistent reporting surface",
      paragraphs: [
        "The final Power BI report has overview, equity, and clinical-driver pages. Each page uses the same analysis view and measures, so the story stays connected as a reviewer moves from a hospital-level KPI to a subgroup pattern or a clinical-complexity signal.",
        "The deliverables include the SQL pipeline, R report, Power BI package, and dashboard exports. Together they show the full path from raw encounter data through normalized storage, analysis, and decision-ready reporting."
      ]
    }
  ],
  "hospital-prices": [
    {
      title: "Comparing like with like",
      paragraphs: [
        "I used 2023 CMS inpatient pricing data to focus the analysis on comparable services rather than mixing unrelated procedures. The report centers on a high-volume DRG and uses Medicare payment as a common benchmark for comparing submitted hospital charges across hospitals, states, and regions.",
        "The workflow calculates percentile spread, charge-to-payment ratios, state medians, regional medians, and market context so a reader can separate a general price level from an unusually wide benchmark gap."
      ]
    },
    {
      title: "What the price spread showed",
      paragraphs: [
        "For the focal service, submitted charges ranged from about $30,936 at the 10th percentile to $133,639 at the 90th percentile. State medians ranged from about $24,611 in Maryland to $148,155 in Nevada.",
        "The strongest payment disconnect appeared in the West, where median submitted charges were about 5.1 times median Medicare payment for the same DRG. Metropolitan hospitals also tended to post materially higher charges than small-town and rural hospitals."
      ]
    },
    {
      title: "A benchmarking report for the next conversation",
      paragraphs: [
        "I packaged the work as a self-contained HTML report with service-level dispersion, regional comparisons, state views, and charge-versus-payment charts. The sequence starts with the comparable service, then moves into geography and the gap between list prices and the payment benchmark.",
        "The result gives a hospital or market analyst a sharper question to investigate: where does the organization's pricing posture sit against true peers, and what part of the gap comes from market structure rather than the service itself?"
      ]
    }
  ],
  "dying-on-the-margin": [
    {
      title: "Treating utilization as a systems signal",
      paragraphs: [
        "I built a hospital-level analysis around capacity utilization, bed size, teaching status, rural context, and risk-adjusted heart-failure mortality. The goal was to see what occupancy reveals once it is placed beside the hospital characteristics that shape how capacity is used.",
        "The workflow starts with a simple linear relationship, then adds controls, a quadratic occupancy term, rural interaction, and diagnostic checks. That sequence makes the change in the story visible as the model becomes more realistic."
      ]
    },
    {
      title: "The result was more interesting than the expected story",
      paragraphs: [
        "The simple model estimated a negative occupancy slope of about -2.8731 with p below 0.001. The stronger quadratic specification kept the negative direction and found meaningful curvature, with a centered linear term near -1.749 and a quadratic term near -4.4503.",
        "Rural hospitals remained at a higher modeled mortality level than similar urban hospitals. The interaction analysis separated that baseline difference from the shape of the occupancy relationship itself."
      ]
    },
    {
      title: "Making the finding useful",
      paragraphs: [
        "The report includes relationship plots, rural-versus-urban prediction curves, residual and influence diagnostics, and a full self-contained analysis. It turns the headline result into an operating question about capacity, service mix, referral patterns, staffing, and hospital capability.",
        "That is the part I cared about most: showing how an apparently simple throughput measure can carry a deeper systems story once the model and context are built around it."
      ]
    }
  ]
};
