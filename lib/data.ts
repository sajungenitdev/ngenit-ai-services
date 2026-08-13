import { Service, Industry, Solution, UseCase, Insight, Milestone } from "@/types";

export const SERVICES: Service[] = [
    {
        id: "ai-consulting",
        icon: "🧠",
        name: "AI Consulting & Strategy",
        tagline: "From AI ambition to actionable roadmap",
        summary:
            "AI readiness assessments, roadmap development, governance frameworks and technology selection for enterprise organizations.",
        description:
            "We help leadership teams cut through AI hype and build a practical, prioritized roadmap. Our consultants assess your data, systems and processes, identify the highest-value use cases, and define a governance framework so AI is adopted responsibly and sustainably.",
        capabilities: [
            "AI readiness and maturity assessment",
            "Use-case identification and ROI prioritization",
            "AI strategy and 12–24 month roadmap",
            "AI governance and responsible-AI framework",
            "Technology and vendor selection",
            "Change management and team upskilling",
        ],
        benefits: [
            ["3–6 wks", "Typical strategy engagement"],
            ["10+", "Use cases evaluated per assessment"],
            ["100%", "Vendor-neutral recommendations"],
            ["1", "Prioritized roadmap delivered"],
        ],
        useCases: [
            "Enterprise AI adoption roadmap for a banking group",
            "Government agency AI governance framework",
            "Manufacturing AI opportunity assessment",
        ],
    },
    {
        id: "generative-ai",
        icon: "✨",
        name: "Generative AI Solutions",
        tagline: "Custom LLM-powered applications",
        summary:
            "Custom LLM-powered applications for document processing, content generation, knowledge search and customer interactions.",
        description:
            "We design and build generative AI applications on top of leading LLM platforms — tailored to your data, brand and workflows. From internal knowledge assistants to customer-facing content tools, we handle prompt engineering, retrieval architecture, integration and safety guardrails.",
        capabilities: [
            "Custom LLM application development",
            "Retrieval-augmented generation (RAG) on company data",
            "Document summarization and generation",
            "Multilingual content and translation tools",
            "Prompt engineering and model fine-tuning",
            "AI safety guardrails and output validation",
        ],
        benefits: [
            ["70%", "Faster content production"],
            ["24/7", "Always-on generation"],
            ["5+", "LLM platforms supported"],
            ["90%", "Accuracy with RAG grounding"],
        ],
        useCases: [
            "Automated tender and proposal drafting",
            "Multilingual customer content generation",
            "Contract and report summarization engine",
        ],
    },
    {
        id: "ai-agents",
        icon: "🤖",
        name: "AI Agents & Assistants",
        tagline: "Enterprise knowledge and workflow bots",
        summary:
            "Enterprise AI assistants that search company knowledge, answer questions, summarize documents and assist with business workflows.",
        description:
            "We build AI agents that plug into your existing systems — email, CRM, document stores, ERP — to answer questions, complete multi-step tasks and hand off to a human when needed. Agents are scoped tightly to your data and monitored for safe, reliable operation.",
        capabilities: [
            "Enterprise knowledge-search assistants",
            "Task-automating AI agents (multi-step workflows)",
            "Customer support and sales chat agents",
            "Internal employee help-desk bots",
            "Agent orchestration across multiple tools/APIs",
            "Human-in-the-loop escalation design",
        ],
        benefits: [
            ["90%", "Faster knowledge retrieval"],
            ["3x", "Faster customer response"],
            ["24/7", "Availability"],
            ["60%", "Reduction in routine tickets"],
        ],
        useCases: [
            "Internal HR & policy assistant for a 500-staff company",
            "24/7 WhatsApp sales enquiry agent",
            "Procurement document Q&A assistant",
        ],
    },
    {
        id: "automation",
        icon: "⚡",
        name: "Intelligent Process Automation",
        tagline: "RPA + AI for end-to-end automation",
        summary:
            "End-to-end process automation combining RPA with AI to eliminate repetitive tasks, streamline workflows and reduce manual effort.",
        description:
            "We combine robotic process automation with AI decision-making to automate processes that were previously too complex for rules-based bots — reading documents, judging exceptions, and routing work — reducing manual effort and error rates.",
        capabilities: [
            "Process discovery and automation assessment",
            "RPA bot design and development",
            "AI-assisted document and data processing",
            "Workflow orchestration across systems",
            "Exception handling with AI decisioning",
            "Automation monitoring dashboards",
        ],
        benefits: [
            ["70%", "Time reduction on routine tasks"],
            ["99%", "Processing accuracy"],
            ["45%", "Avg. operational cost reduction"],
            ["24/7", "Unattended operation"],
        ],
        useCases: [
            "Invoice and purchase-order automation",
            "Automated compliance reporting pipeline",
            "Employee onboarding workflow automation",
        ],
    },
    {
        id: "data-analytics",
        icon: "📊",
        name: "Data Analytics & Machine Learning",
        tagline: "Turn raw data into decisions",
        summary:
            "Predictive analytics, machine learning models, BI dashboards and data pipelines that turn raw data into actionable business insights.",
        description:
            "We design data pipelines and machine learning models that give leadership real-time visibility and predictive insight — from demand forecasting to risk scoring — delivered through dashboards your team will actually use.",
        capabilities: [
            "Data pipeline and warehouse design",
            "Predictive and prescriptive ML models",
            "Executive BI dashboards and reporting",
            "Demand forecasting and trend analysis",
            "Risk scoring and anomaly detection",
            "Data quality and governance setup",
        ],
        benefits: [
            ["40%", "Improved forecast accuracy"],
            ["80%", "Faster report preparation"],
            ["Real-time", "Executive dashboards"],
            ["1", "Unified data pipeline"],
        ],
        useCases: [
            "Sales demand forecasting for retail chain",
            "Credit risk scoring model for a lender",
            "Executive KPI dashboard for group leadership",
        ],
    },
    {
        id: "computer-vision",
        icon: "👁️",
        name: "Computer Vision",
        tagline: "AI that sees, inspects and monitors",
        summary:
            "AI-powered visual inspection, quality control, safety monitoring and anomaly detection for industrial and commercial environments.",
        description:
            "Our computer vision solutions use camera and sensor data to detect defects, monitor safety compliance and track assets in real time — deployed on-premise or at the edge for industrial and commercial sites.",
        capabilities: [
            "Automated visual quality inspection",
            "PPE and safety-compliance monitoring",
            "People and vehicle counting/tracking",
            "Defect and anomaly detection",
            "Edge deployment for low-latency inference",
            "Integration with existing CCTV/camera infrastructure",
        ],
        benefits: [
            ["99%+", "Defect detection accuracy"],
            ["24/7", "Continuous monitoring"],
            ["60%", "Faster inspection cycles"],
            ["Edge", "On-site low-latency processing"],
        ],
        useCases: [
            "Production-line defect detection for a garments factory",
            "Safety-helmet compliance monitoring on a plant floor",
            "Automated vehicle counting at a logistics yard",
        ],
    },
    {
        id: "industrial-ai",
        icon: "🏭",
        name: "Industrial AI",
        tagline: "Predictive maintenance & operational intelligence",
        summary:
            "Predictive maintenance, equipment monitoring, energy optimization and operational intelligence for manufacturing and industrial sectors.",
        description:
            "We combine IIoT sensor data with AI models to predict equipment failures before they happen, optimize energy usage and give plant managers real-time operational intelligence — reducing downtime and extending asset life.",
        capabilities: [
            "Predictive maintenance modeling",
            "Real-time equipment health monitoring",
            "Energy consumption optimization",
            "SCADA/IIoT sensor integration",
            "Operational intelligence dashboards",
            "Root-cause and failure-pattern analysis",
        ],
        benefits: [
            ["35–60%", "Reduction in unplanned downtime"],
            ["20%", "Avg. energy savings"],
            ["Real-time", "Asset health monitoring"],
            ["IIoT", "Sensor & SCADA integration"],
        ],
        useCases: [
            "Predictive maintenance for pipeline pumping stations",
            "Energy optimization for a manufacturing plant",
            "Fleet and equipment health monitoring dashboard",
        ],
    },
    {
        id: "ai-integration",
        icon: "🔗",
        name: "AI Integration & Infrastructure",
        tagline: "Connect AI to your existing systems",
        summary:
            "Seamless integration of AI capabilities with ERP, CRM, IoT platforms and cloud infrastructure using APIs and modern architectures.",
        description:
            "AI only creates value when it is connected to where work actually happens. We integrate AI capabilities into your ERP, CRM, IoT and cloud infrastructure using secure, well-documented APIs and modern architecture patterns.",
        capabilities: [
            "ERP/CRM AI integration (SAP, Salesforce, Dynamics, etc.)",
            "Cloud AI infrastructure setup (Azure, AWS, GCP)",
            "API design and secure integration layers",
            "IoT platform and device integration",
            "Model deployment and MLOps pipelines",
            "Security, access control and monitoring",
        ],
        benefits: [
            ["3", "Major cloud platforms supported"],
            ["API-first", "Integration architecture"],
            ["MLOps", "Production model deployment"],
            ["Secure", "Enterprise access control"],
        ],
        useCases: [
            "AI assistant embedded inside existing CRM",
            "IoT sensor data pipeline into cloud AI platform",
            "Legacy ERP integration with a new analytics layer",
        ],
    },
];

export const INDUSTRIES: Industry[] = [
    {
        id: "oil-gas",
        icon: "🛢️",
        name: "Oil & Gas",
        short: "Pipeline monitoring, predictive maintenance, safety AI",
        long: "AI-driven pipeline monitoring, predictive maintenance on pumping and compression equipment, and computer-vision safety monitoring for upstream, midstream and downstream operations.",
    },
    {
        id: "power-energy",
        icon: "⚡",
        name: "Power & Energy",
        short: "Grid optimization, energy forecasting, fault detection",
        long: "Load forecasting, grid anomaly and fault detection, and energy-optimization models for utilities and independent power producers.",
    },
    {
        id: "manufacturing",
        icon: "🏭",
        name: "Manufacturing",
        short: "Quality control, production optimization, visual inspection",
        long: "Computer-vision quality control, production-line optimization and predictive maintenance to reduce downtime and defects on the factory floor.",
    },
    {
        id: "banking-finance",
        icon: "🏦",
        name: "Banking & Finance",
        short: "Risk analytics, fraud detection, intelligent reporting",
        long: "Credit risk scoring, transaction fraud detection and AI-assisted regulatory reporting for banks, NBFIs and fintechs.",
    },
    {
        id: "government",
        icon: "🏛️",
        name: "Government",
        short: "Smart document processing, citizen services, analytics",
        long: "Document automation, citizen-service chatbots and data analytics for public-sector agencies and government tenders.",
    },
    {
        id: "healthcare",
        icon: "🏥",
        name: "Healthcare",
        short: "Clinical AI, patient data analysis, administrative automation",
        long: "Administrative workflow automation, patient data analytics and decision-support tools for hospitals and healthcare networks.",
    },
    {
        id: "pharma",
        icon: "💊",
        name: "Pharmaceuticals",
        short: "R&D analytics, compliance monitoring, supply chain AI",
        long: "R&D data analytics, regulatory compliance monitoring and AI-driven supply-chain visibility for pharmaceutical manufacturers and distributors.",
    },
    {
        id: "retail",
        icon: "🛒",
        name: "Retail & E-commerce",
        short: "Demand forecasting, personalization, customer AI",
        long: "Demand forecasting, personalized recommendations and AI customer-service agents for retail and e-commerce businesses.",
    },
    {
        id: "logistics",
        icon: "🚚",
        name: "Logistics",
        short: "Route optimization, warehouse AI, delivery prediction",
        long: "Route and fleet optimization, warehouse automation and delivery-time prediction models for logistics and distribution companies.",
    },
    {
        id: "water-utilities",
        icon: "💧",
        name: "Water & Utilities",
        short: "Asset monitoring, consumption analytics, anomaly detection",
        long: "IoT-based asset monitoring, consumption analytics and leak/anomaly detection for water and utility operators.",
    },
];

export const SOLUTIONS: Solution[] = [
    {
        tag: "🤖 Enterprise AI",
        name: "Enterprise AI Assistant",
        desc: "An intelligent assistant that searches company knowledge, answers employee and customer questions, summarizes documents and generates reports from your data.",
        tags: ["All Industries", "Enterprise", "Government"],
        footer: "Automate · Search · Summarize",
    },
    {
        tag: "🏭 Industrial AI",
        name: "Predictive Maintenance AI",
        desc: "Monitor equipment health in real time, detect anomalies before failures occur and schedule maintenance proactively — reducing unplanned downtime and costs.",
        tags: ["Oil & Gas", "Manufacturing", "Power"],
        footer: "Monitor · Predict · Prevent",
    },
    {
        tag: "📄 Document AI",
        name: "Smart Document Processing",
        desc: "Extract, classify, validate and route information from any document type — invoices, contracts, applications, reports — with high accuracy and zero manual effort.",
        tags: ["Banking", "Insurance", "Government"],
        footer: "Extract · Classify · Route",
    },
    {
        tag: "👁️ Vision AI",
        name: "AI Visual Inspection",
        desc: "Computer vision systems that detect defects, measure components and monitor safety conditions on production lines and industrial sites — faster and more accurately than human inspection.",
        tags: ["Manufacturing", "Pharma", "Energy"],
        footer: "Detect · Measure · Alert",
    },
    {
        tag: "💬 Customer AI",
        name: "AI Customer Support",
        desc: "Intelligent chatbot and virtual assistant that handles customer enquiries, resolves common issues, escalates complex cases and captures leads around the clock.",
        tags: ["Retail", "Telecom", "Financial"],
        footer: "Respond · Resolve · Route",
    },
    {
        tag: "📊 Analytics AI",
        name: "Executive AI Dashboard",
        desc: "Real-time executive dashboards powered by AI that consolidate KPIs, surface anomalies, generate narrative summaries and recommend priority actions.",
        tags: ["All Sectors", "C-Suite", "Operations"],
        footer: "Consolidate · Analyse · Act",
    },
];

export const USE_CASES: UseCase[] = [
    {
        name: "Automated Tender Document Preparation",
        industry: "Government",
        service: "Generative AI",
        desc: "Generates compliant technical and financial proposal drafts from historical tender data, cutting preparation time significantly.",
        result: "~60% faster proposal drafting",
    },
    {
        name: "Pipeline Predictive Maintenance",
        industry: "Oil & Gas",
        service: "Industrial AI",
        desc: "Sensor-driven models flag pump and valve failure risk days in advance, enabling planned maintenance windows.",
        result: "35–60% less unplanned downtime",
    },
    {
        name: "Production-Line Defect Detection",
        industry: "Manufacturing",
        service: "Computer Vision",
        desc: "Camera-based inspection identifies surface and assembly defects in real time on the production line.",
        result: "99%+ detection accuracy",
    },
    {
        name: "Credit Risk Scoring Model",
        industry: "Banking & Finance",
        service: "Data Analytics",
        desc: "ML-based scoring incorporates alternative data sources to improve lending decisions and reduce default risk.",
        result: "40% better forecast accuracy",
    },
    {
        name: "24/7 WhatsApp Sales Assistant",
        industry: "Retail & E-commerce",
        service: "AI Agents",
        desc: "A WhatsApp-based AI agent answers product questions, captures leads and routes qualified enquiries to sales staff.",
        result: "3x faster response time",
    },
    {
        name: "Citizen Service Chatbot",
        industry: "Government",
        service: "AI Agents",
        desc: "A multilingual chatbot answers citizen queries about services, permits and procedures, reducing counter workload.",
        result: "90% faster query resolution",
    },
    {
        name: "Invoice & PO Automation",
        industry: "Manufacturing",
        service: "Intelligent Automation",
        desc: "AI extracts and validates invoice data, matches it to purchase orders and routes exceptions for approval.",
        result: "70% less manual processing",
    },
    {
        name: "Safety-Helmet Compliance Monitoring",
        industry: "Oil & Gas",
        service: "Computer Vision",
        desc: "Vision AI monitors camera feeds for PPE compliance and alerts safety officers to violations in real time.",
        result: "24/7 automated monitoring",
    },
    {
        name: "Energy Consumption Optimization",
        industry: "Power & Energy",
        service: "Industrial AI",
        desc: "AI models analyze consumption patterns and recommend load-shifting and efficiency measures across facilities.",
        result: "~20% average energy savings",
    },
    {
        name: "Internal Knowledge Assistant",
        industry: "Banking & Finance",
        service: "AI Agents",
        desc: "An internal assistant lets staff search policies, procedures and past cases instantly instead of digging through folders.",
        result: "90% faster knowledge retrieval",
    },
    {
        name: "Demand Forecasting Engine",
        industry: "Retail & E-commerce",
        service: "Data Analytics",
        desc: "ML forecasting models predict SKU-level demand to optimize inventory and reduce stockouts and overstock.",
        result: "Improved inventory accuracy",
    },
    {
        name: "Water Network Anomaly Detection",
        industry: "Water & Utilities",
        service: "Industrial AI",
        desc: "IoT sensor data feeds anomaly-detection models that flag leaks and unusual consumption patterns early.",
        result: "Faster leak identification",
    },
];

export const INSIGHTS: Insight[] = [
    {
        icon: "🧠",
        cat: "AI Strategy",
        date: "Jul 2026",
        read: "6 min read",
        title: "How to Build an AI Roadmap Your Board Will Actually Approve",
        excerpt:
            "A practical framework for prioritizing AI use cases by business value and implementation risk.",
    },
    {
        icon: "✨",
        cat: "Generative AI",
        date: "Jun 2026",
        read: "5 min read",
        title: "RAG vs Fine-Tuning: Choosing the Right Approach for Enterprise LLMs",
        excerpt:
            "What actually determines whether retrieval-augmented generation or fine-tuning fits your use case.",
    },
    {
        icon: "🏭",
        cat: "Industrial AI",
        date: "Jun 2026",
        read: "7 min read",
        title: "Predictive Maintenance ROI: What the Numbers Really Show",
        excerpt:
            "Benchmarks and lessons from real predictive-maintenance deployments across energy and manufacturing.",
    },
    {
        icon: "🔒",
        cat: "Governance",
        date: "May 2026",
        read: "4 min read",
        title: "A Practical AI Governance Framework for Regulated Industries",
        excerpt:
            "Building responsible-AI guardrails without slowing delivery — a checklist for banking and government teams.",
    },
    {
        icon: "👁️",
        cat: "Computer Vision",
        date: "May 2026",
        read: "5 min read",
        title: "Computer Vision on the Factory Floor: Getting Past the Pilot Stage",
        excerpt:
            "Why so many vision-AI pilots stall — and what it takes to move from proof-of-concept to production.",
    },
    {
        icon: "🤖",
        cat: "AI Agents",
        date: "Apr 2026",
        read: "6 min read",
        title: "Designing AI Agents That Know When to Hand Off to a Human",
        excerpt:
            "Practical patterns for human-in-the-loop escalation so agents stay reliable at scale.",
    },
];

export const MILESTONES: Milestone[] = [
    {
        year: "2009",
        title: "NGEN IT Founded",
        desc: "Established in Dhaka as a systems integration and licensed software company serving enterprise and government clients.",
    },
    {
        year: "2015",
        title: "Regional Expansion",
        desc: "Expanded delivery capability across industrial hardware supply, government tendering and enterprise software distribution.",
    },
    {
        year: "2021",
        title: "IoT & Smart Automation",
        desc: "Launched IoT and smart-automation product lines for industrial and utility clients.",
    },
    {
        year: "2024",
        title: "International Entities",
        desc: "Established entities and partnerships in Singapore, UK and Portugal to serve international clients.",
    },
    {
        year: "2026",
        title: "AI Services Division",
        desc: "Launched a dedicated AI Services division covering consulting, generative AI, automation, analytics, computer vision and industrial AI.",
    },
];

export const OUTCOMES = [
    {
        icon: "⏱️",
        title: "Reduce Manual Work",
        description: "Automate repetitive document processing, data entry and reporting tasks.",
        stat: "Up to 70%"
    },
    {
        icon: "💬",
        title: "Improve Customer Response",
        description: "AI assistants handle enquiries 24/7 and route complex issues instantly.",
        stat: "3x Faster"
    },
    {
        icon: "🔍",
        title: "Find Information Faster",
        description: "AI-powered knowledge search across all company data and systems.",
        stat: "90%"
    },
    {
        icon: "📈",
        title: "Better Decision-Making",
        description: "Real-time analytics and AI forecasting for faster, confident decisions.",
        stat: "40%"
    },
    {
        icon: "🔧",
        title: "Reduce Equipment Downtime",
        description: "Predictive maintenance AI detects failure signals before breakdowns.",
        stat: "35–60%"
    },
    {
        icon: "🛡️",
        title: "Improve Quality & Safety",
        description: "Computer vision detects defects and hazards with high accuracy.",
        stat: "99%+"
    },
    {
        icon: "📑",
        title: "Automated Reports",
        description: "Generate dashboards and reports automatically from multiple sources.",
        stat: "80%"
    },
    {
        icon: "💰",
        title: "Measurable Cost Savings",
        description: "AI implementations deliver ROI through efficiency and error reduction.",
        stat: "20–45%"
    }
];

export const METHODOLOGY_STEPS = [
    {
        number: 1,
        icon: "🔍",
        title: "Discover",
        description: "Understand your business processes, data environment and AI objectives."
    },
    {
        number: 2,
        icon: "📋",
        title: "Assess",
        description: "Evaluate AI readiness, data availability, security and expected value."
    },
    {
        number: 3,
        icon: "🎨",
        title: "Design",
        description: "Prepare the use case, architecture and measurable success criteria."
    },
    {
        number: 4,
        icon: "🔧",
        title: "Develop & Integrate",
        description: "Configure or develop the AI solution and connect it to your systems."
    },
    {
        number: 5,
        icon: "🚀",
        title: "Deploy & Improve",
        description: "Launch the solution, train your team and continuously improve."
    }
];



export const WHY_FEATURES = [
    {
        icon: "🏢",
        title: "Since 2009",
        description: "Established technology company with enterprise and government track record"
    },
    {
        icon: "🌍",
        title: "International Presence",
        description: "Operating across Bangladesh, UK, Singapore, Portugal and the Middle East"
    },
    {
        icon: "🤝",
        title: "Local Deployment",
        description: "Local teams for implementation, training and ongoing support"
    },
    {
        icon: "🔒",
        title: "Secure & Responsible AI",
        description: "Data privacy, governance and responsible AI built into every solution"
    }
];