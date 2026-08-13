"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { INDUSTRIES, SERVICES } from "@/lib/data";
import { notFound } from "next/navigation";

// Industry-specific content mappings
const industryContent = {
    "oil-gas": {
        challenges: [
            "Unplanned equipment downtime costing millions",
            "Safety compliance monitoring across remote sites",
            "Pipeline leak detection and prevention",
            "Optimizing production efficiency"
        ],
        solutions: [
            {
                title: "Predictive Maintenance",
                description: "AI models predict equipment failures before they occur, reducing downtime by 35-60%."
            },
            {
                title: "Computer Vision Safety Monitoring",
                description: "Automated PPE and safety compliance monitoring across all sites."
            },
            {
                title: "Pipeline Anomaly Detection",
                description: "Real-time detection of leaks and anomalies in pipeline networks."
            }
        ],
        focusAreas: ["Predictive Maintenance", "Safety", "Pipeline Monitoring", "Asset Management"],
        ctaText: "Ready to Transform Your Oil & Gas Operations?"
    },
    "power-energy": {
        challenges: [
            "Grid stability and load balancing",
            "Energy waste and inefficiency",
            "Equipment failure prediction",
            "Regulatory compliance reporting"
        ],
        solutions: [
            {
                title: "Energy Optimization",
                description: "AI models optimize energy consumption and reduce waste by up to 20%."
            },
            {
                title: "Grid Load Forecasting",
                description: "Predictive analytics for grid stability and load balancing."
            },
            {
                title: "Fault Detection",
                description: "Early detection of equipment faults and anomalies."
            }
        ],
        focusAreas: ["Grid Optimization", "Energy Efficiency", "Fault Detection", "Load Forecasting"],
        ctaText: "Ready to Transform Your Power & Energy Operations?"
    },
    "manufacturing": {
        challenges: [
            "Quality control and defect detection",
            "Production line optimization",
            "Equipment maintenance scheduling",
            "Supply chain visibility"
        ],
        solutions: [
            {
                title: "Visual Quality Inspection",
                description: "Computer vision detects defects with 99%+ accuracy."
            },
            {
                title: "Production Optimization",
                description: "AI-driven optimization of production lines and processes."
            },
            {
                title: "Predictive Maintenance",
                description: "Real-time equipment monitoring and failure prediction."
            }
        ],
        focusAreas: ["Quality Control", "Production", "Maintenance", "Supply Chain"],
        ctaText: "Ready to Transform Your Manufacturing Operations?"
    },
    "banking-finance": {
        challenges: [
            "Fraud detection and prevention",
            "Credit risk assessment",
            "Regulatory compliance",
            "Customer service automation"
        ],
        solutions: [
            {
                title: "Fraud Detection",
                description: "AI models detect and prevent fraudulent transactions in real-time."
            },
            {
                title: "Credit Risk Scoring",
                description: "ML-based scoring improves lending decisions by 40%."
            },
            {
                title: "Regulatory Reporting",
                description: "Automated compliance reporting with AI assistance."
            }
        ],
        focusAreas: ["Risk Management", "Fraud Detection", "Compliance", "Customer Service"],
        ctaText: "Ready to Transform Your Banking & Finance Operations?"
    },
    "government": {
        challenges: [
            "Document processing inefficiency",
            "Citizen service delays",
            "Data silos and analytics",
            "Regulatory compliance"
        ],
        solutions: [
            {
                title: "Document Automation",
                description: "AI-powered document processing and classification."
            },
            {
                title: "Citizen Service Chatbots",
                description: "24/7 multilingual chatbots for citizen services."
            },
            {
                title: "Data Analytics",
                description: "Intelligent analytics for better decision-making."
            }
        ],
        focusAreas: ["Document Processing", "Citizen Services", "Data Analytics", "Compliance"],
        ctaText: "Ready to Transform Your Government Operations?"
    },
    "healthcare": {
        challenges: [
            "Patient data management",
            "Administrative workload",
            "Clinical decision support",
            "Patient engagement"
        ],
        solutions: [
            {
                title: "Administrative Automation",
                description: "AI automates scheduling, billing, and patient records."
            },
            {
                title: "Clinical Decision Support",
                description: "AI-powered tools for better clinical decisions."
            },
            {
                title: "Patient Analytics",
                description: "Predictive analytics for patient outcomes."
            }
        ],
        focusAreas: ["Administration", "Clinical", "Patient Care", "Analytics"],
        ctaText: "Ready to Transform Your Healthcare Operations?"
    },
    "pharma": {
        challenges: [
            "R&D data analysis",
            "Regulatory compliance",
            "Supply chain visibility",
            "Clinical trial optimization"
        ],
        solutions: [
            {
                title: "R&D Analytics",
                description: "AI accelerates drug discovery and research."
            },
            {
                title: "Supply Chain Visibility",
                description: "End-to-end visibility with AI-powered tracking."
            },
            {
                title: "Compliance Monitoring",
                description: "Automated regulatory compliance monitoring."
            }
        ],
        focusAreas: ["R&D", "Compliance", "Supply Chain", "Clinical Trials"],
        ctaText: "Ready to Transform Your Pharmaceutical Operations?"
    },
    "retail": {
        challenges: [
            "Demand forecasting accuracy",
            "Inventory management",
            "Customer personalization",
            "Supply chain optimization"
        ],
        solutions: [
            {
                title: "Demand Forecasting",
                description: "AI predicts demand with 40% better accuracy."
            },
            {
                title: "Personalization",
                description: "AI-powered personalized recommendations."
            },
            {
                title: "Inventory Optimization",
                description: "Optimize inventory levels and reduce waste."
            }
        ],
        focusAreas: ["Forecasting", "Personalization", "Inventory", "Customer Experience"],
        ctaText: "Ready to Transform Your Retail Operations?"
    },
    "logistics": {
        challenges: [
            "Route optimization",
            "Warehouse efficiency",
            "Delivery time prediction",
            "Fleet management"
        ],
        solutions: [
            {
                title: "Route Optimization",
                description: "AI optimizes delivery routes and reduces fuel costs."
            },
            {
                title: "Warehouse Automation",
                description: "AI-powered warehouse management and automation."
            },
            {
                title: "Delivery Prediction",
                description: "Accurate delivery time prediction with AI."
            }
        ],
        focusAreas: ["Route Planning", "Warehouse", "Delivery", "Fleet Management"],
        ctaText: "Ready to Transform Your Logistics Operations?"
    },
    "water-utilities": {
        challenges: [
            "Leak detection",
            "Asset monitoring",
            "Consumption analytics",
            "Infrastructure maintenance"
        ],
        solutions: [
            {
                title: "Leak Detection",
                description: "AI detects leaks and anomalies in water networks."
            },
            {
                title: "Asset Monitoring",
                description: "Real-time monitoring of water infrastructure."
            },
            {
                title: "Consumption Analytics",
                description: "AI analytics for water consumption patterns."
            }
        ],
        focusAreas: ["Monitoring", "Leak Detection", "Analytics", "Infrastructure"],
        ctaText: "Ready to Transform Your Water & Utilities Operations?"
    }
};

// Default content for any industry not specifically mapped
const defaultContent = {
    challenges: [
        "Operational inefficiency",
        "Data management challenges",
        "Compliance and reporting",
        "Customer satisfaction"
    ],
    solutions: [
        {
            title: "AI-Powered Optimization",
            description: "Custom AI solutions for your industry challenges."
        },
        {
            title: "Data-Driven Decisions",
            description: "Intelligent analytics for better decision-making."
        },
        {
            title: "Process Automation",
            description: "Automate repetitive tasks and improve efficiency."
        }
    ],
    focusAreas: ["Operations", "Analytics", "Automation", "Optimization"],
    ctaText: "Ready to Transform Your Operations?"
};

export default function IndustryDetailPage() {
    const params = useParams();
    const industryId = params.id as string;

    // Find the industry by ID
    const industry = INDUSTRIES.find((i) => i.id === industryId);

    // If industry not found, show 404
    if (!industry) {
        notFound();
    }

    // Get industry-specific content or use default
    const content = industryContent[industryId as keyof typeof industryContent] || defaultContent;

    // Get related services (all services)
    const relatedServices = SERVICES.slice(0, 4);

    return (
        <>
            {/* Page Hero */}
            <section className="relative bg-navy pt-40 pb-20 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy-mid to-navy">
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_80%_20%,rgba(0,194,203,0.18)_0%,transparent_60%)]"></div>
                </div>
                <div className="container max-w-[1200px] mx-auto px-6 md:px-8 relative z-10">
                    {/* Breadcrumb */}
                    <div className="flex items-center gap-2 text-white/40 text-sm mb-5 flex-wrap">
                        <Link href="/" className="hover:text-cyan transition-colors">Home</Link>
                        <span>/</span>
                        <Link href="/industries" className="hover:text-cyan transition-colors">Industries</Link>
                        <span>/</span>
                        <span className="text-white/80">{industry.name}</span>
                    </div>

                    {/* Icon */}
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-navy-mid to-blue flex items-center justify-center text-3xl mb-5">
                        {industry.icon}
                    </div>

                    <h1 className="text-white text-[clamp(2rem,4vw,2.9rem)] font-extrabold font-plus-jakarta leading-[1.15]">
                        AI Solutions for {industry.name}
                    </h1>
                    <p className="text-white/60 text-[1.05rem] max-w-[640px] leading-relaxed mt-4">
                        {industry.long}
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-wrap gap-4 mt-7">
                        <Link
                            href="/contact"
                            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-[8px] font-semibold text-[0.95rem] border-2 border-transparent transition-all duration-200 whitespace-nowrap bg-cyan text-navy shadow-[0_4px_20px_rgba(0,194,203,0.3)] hover:bg-cyan-light hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(0,194,203,0.4)]"
                        >
                            Discuss AI Solutions
                        </Link>
                        <a
                            href={`https://wa.me/8801XXXXXXXXX?text=Hello%20NGEN%20IT%2C%20I%20am%20interested%20in%20AI%20solutions%20for%20${industry.name}.`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-[8px] font-semibold text-[0.95rem] border-2 border-transparent transition-all duration-200 whitespace-nowrap bg-transparent text-white border-white/40 hover:bg-white/10 hover:border-white"
                        >
                            💬 WhatsApp Us
                        </a>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-16 md:py-24 bg-white">
                <div className="container max-w-[1200px] mx-auto px-6 md:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        {/* Main Content - 2/3 width */}
                        <div className="lg:col-span-2">
                            {/* Overview */}
                            <h2 className="text-[clamp(1.5rem,2.5vw,2rem)] font-bold text-navy font-plus-jakarta mb-4">
                                AI Solutions for {industry.name}
                            </h2>
                            <p className="text-grey-600 text-[1.02rem] leading-relaxed">
                                {industry.long}
                            </p>

                            {/* Key Challenges */}
                            <h2 className="text-[clamp(1.5rem,2.5vw,2rem)] font-bold text-navy font-plus-jakarta mt-10 mb-4">
                                Key Challenges We Solve
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {content.challenges.map((challenge, index) => (
                                    <div
                                        key={index}
                                        className="flex items-start gap-3.5 p-4 bg-off-white rounded-xl border border-grey-100 hover:shadow-md transition-all duration-300"
                                    >
                                        <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center shrink-0 text-red-500 font-extrabold text-sm">
                                            !
                                        </div>
                                        <p className="text-grey-600 text-sm leading-relaxed">
                                            {challenge}
                                        </p>
                                    </div>
                                ))}
                            </div>

                            {/* Solutions */}
                            <h2 className="text-[clamp(1.5rem,2.5vw,2rem)] font-bold text-navy font-plus-jakarta mt-10 mb-4">
                                How AI Transforms {industry.name}
                            </h2>
                            <div className="flex flex-col gap-3.5">
                                {content.solutions.map((solution, index) => (
                                    <div
                                        key={index}
                                        className="flex items-start gap-3.5 p-4 bg-white border border-grey-100 rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
                                    >
                                        <div className="w-6 h-6 rounded-full bg-cyan/10 flex items-center justify-center shrink-0 text-cyan font-extrabold text-sm">
                                            ✓
                                        </div>
                                        <div>
                                            <p className="text-navy text-sm font-semibold">
                                                {solution.title}
                                            </p>
                                            <p className="text-grey-400 text-sm leading-relaxed">
                                                {solution.description}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Related Services */}
                            <h2 className="text-[clamp(1.5rem,2.5vw,2rem)] font-bold text-navy font-plus-jakarta mt-10 mb-4">
                                Related AI Services
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {relatedServices.map((service) => (
                                    <Link
                                        key={service.id}
                                        href={`/service/${service.id}`}
                                        className="group flex items-start gap-3 p-4 bg-white border border-grey-100 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
                                    >
                                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-navy-mid to-blue flex items-center justify-center text-lg shrink-0">
                                            {service.icon}
                                        </div>
                                        <div>
                                            <h4 className="text-navy text-sm font-semibold group-hover:text-cyan transition-colors">
                                                {service.name}
                                            </h4>
                                            <p className="text-grey-400 text-xs leading-relaxed line-clamp-2">
                                                {service.summary}
                                            </p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Sidebar - 1/3 width */}
                        <div className="lg:col-span-1">
                            <div className="bg-off-white rounded-2xl p-8 sticky top-24">
                                <h4 className="text-navy text-sm font-semibold mb-4 font-plus-jakarta">
                                    Industry Overview
                                </h4>

                                <div className="space-y-4">
                                    <div>
                                        <p className="text-grey-400 text-xs uppercase tracking-wide font-semibold">
                                            Industry
                                        </p>
                                        <p className="text-navy font-semibold">
                                            {industry.name}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-grey-400 text-xs uppercase tracking-wide font-semibold">
                                            Key Focus Areas
                                        </p>
                                        <div className="flex flex-wrap gap-1.5 mt-1">
                                            {content.focusAreas.map((area, index) => (
                                                <span
                                                    key={index}
                                                    className="px-2.5 py-1 rounded-md bg-white text-navy text-xs font-medium border border-grey-200"
                                                >
                                                    {area}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* CTA in Sidebar */}
                                <div className="mt-6 pt-6 border-t border-grey-200">
                                    <Link
                                        href="/contact"
                                        className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-[8px] font-semibold text-[0.95rem] border-2 border-transparent transition-all duration-200 whitespace-nowrap bg-cyan text-navy shadow-[0_4px_20px_rgba(0,194,203,0.3)] hover:bg-cyan-light hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(0,194,203,0.4)]"
                                    >
                                        Request Industry Solutions
                                    </Link>
                                    <Link
                                        href="/industries"
                                        className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 mt-3 rounded-[8px] font-semibold text-[0.95rem] border-2 border-transparent transition-all duration-200 whitespace-nowrap bg-transparent text-navy border-grey-200 hover:bg-off-white hover:border-navy"
                                    >
                                        View All Industries →
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Bottom CTA */}
            <section className="py-16 md:py-20 relative overflow-hidden bg-gradient-to-br from-navy-mid via-navy-light to-[#1a3a8f]">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_80%_50%,rgba(0,194,203,0.18)_0%,transparent_60%)]"></div>
                <div className="container max-w-[1200px] mx-auto px-6 md:px-8 relative z-10">
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                        <div className="text-center lg:text-left">
                            <h2 className="font-plus-jakarta font-bold text-[clamp(1.5rem,2.5vw,2.2rem)] leading-[1.15] text-white max-w-[560px]">
                                {content.ctaText}
                            </h2>
                            <p className="text-white/60 text-[1rem] mt-3 max-w-[460px] leading-relaxed">
                                Let's discuss how AI can solve your specific challenges and drive measurable results.
                            </p>
                        </div>
                        <div className="flex flex-col gap-3 min-w-[200px] w-full lg:w-auto">
                            <Link
                                href="/contact"
                                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-[8px] font-semibold text-[0.95rem] border-2 border-transparent transition-all duration-200 whitespace-nowrap bg-cyan text-navy shadow-[0_4px_20px_rgba(0,194,203,0.3)] hover:bg-cyan-light hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(0,194,203,0.4)]"
                            >
                                Start Your AI Journey
                            </Link>
                            <Link
                                href="/industries"
                                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-[8px] font-semibold text-[0.95rem] border-2 border-transparent transition-all duration-200 whitespace-nowrap bg-transparent text-white border-white/40 hover:bg-white/10 hover:border-white"
                            >
                                Explore All Industries →
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}