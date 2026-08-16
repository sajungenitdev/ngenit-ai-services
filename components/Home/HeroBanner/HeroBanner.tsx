"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

interface HeroData {
    badge: string;
    title: string;
    highlightedText: string;
    subtitle: string;
    buttonPrimary: string;
    buttonPrimaryLink: string;
    buttonSecondary: string;
    buttonSecondaryLink: string;
    stats: {
        years: { value: string; label: string };
        markets: { value: string; label: string };
        partners: { value: string; label: string };
        clients: { value: string; label: string };
    };
    dashboard: {
        title: string;
        services: {
            icon: string;
            name: string;
            tag: string;
        }[];
        metrics: {
            value: string;
            label: string;
            trend: string;
        }[];
    };
    floatingCards: {
        left: string;
        right: string;
    };
    isActive?: boolean;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export default function Hero() {
    const heroRef = useRef<HTMLDivElement>(null);
    const [heroData, setHeroData] = useState<HeroData | null>(null);
    const [loading, setLoading] = useState(true);

    // ============================================================
    // FETCH HERO DATA
    // ============================================================
    useEffect(() => {
        const fetchHeroData = async () => {
            try {
                const response = await fetch(`${API_URL}/hero`);
                const result = await response.json();

                if (result.success && result.data) {
                    setHeroData(result.data);
                }
            } catch (error) {
                console.error("Error fetching hero data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchHeroData();
    }, []);

    // ============================================================
    // PARALLAX EFFECT FOR ORBS
    // ============================================================
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const orbs = document.querySelectorAll(".orb");
            const x = e.clientX / window.innerWidth;
            const y = e.clientY / window.innerHeight;

            orbs.forEach((orb, index) => {
                const speed = 20 + index * 10;
                const moveX = (x - 0.5) * speed;
                const moveY = (y - 0.5) * speed;
                (orb as HTMLElement).style.transform = `translate(${moveX}px, ${moveY}px)`;
            });
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    // ============================================================
    // LOADING STATE
    // ============================================================
    if (loading) {
        return (
            <section className="relative min-h-screen bg-navy flex items-center justify-center overflow-hidden pt-[68px]">
                <div className="text-center">
                    <div className="w-12 h-12 border-4 border-cyan border-t-transparent rounded-full animate-spin mx-auto"></div>
                    <p className="text-white/60 mt-4">Loading...</p>
                </div>
            </section>
        );
    }

    // ============================================================
    // USE DEFAULT DATA IF NO API DATA
    // ============================================================
    const data = heroData || {
        badge: "🚀 Practical AI for Business & Industry",
        title: "Practical AI Solutions for",
        highlightedText: "Business and Industry",
        subtitle: "We help organizations identify, develop and implement AI solutions that automate work, improve decision-making and create measurable operational value.",
        buttonPrimary: "Book an AI Consultation",
        buttonPrimaryLink: "/contact",
        buttonSecondary: "Explore AI Services",
        buttonSecondaryLink: "/services",
        stats: {
            years: { value: "16+", label: "Years of Experience" },
            markets: { value: "5", label: "International Markets" },
            partners: { value: "200+", label: "Business Partners" },
            clients: { value: "50+", label: "Enterprise Clients" },
        },
        dashboard: {
            title: "NGEN IT AI Platform",
            services: [
                { icon: "🧠", name: "AI Consulting", tag: "Strategy →" },
                { icon: "✨", name: "Generative AI", tag: "Deploy →" },
                { icon: "⚡", name: "Automation", tag: "Live →" },
                { icon: "📊", name: "Analytics", tag: "Insights →" },
            ],
            metrics: [
                { value: "40%", label: "Cost Reduction", trend: "↑ Avg. Result" },
                { value: "3x", label: "Faster Decisions", trend: "↑ Reported" },
                { value: "98%", label: "Client Satisfaction", trend: "↑ Ongoing" },
            ],
        },
        floatingCards: {
            left: "AI Automation Active",
            right: "New Enquiry Received",
        },
        isActive: true,
    };

    // ============================================================
    // RENDER
    // ============================================================
    return (
        <section className="relative min-h-screen bg-navy flex items-center overflow-hidden pt-[68px]">
            {/* Background */}
            <div className="absolute inset-0 z-0 bg-gradient-to-br from-navy via-navy-mid to-navy">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_70%_50%,rgba(30,95,212,0.25)_0%,transparent_60%)]"></div>
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_20%_80%,rgba(0,194,203,0.15)_0%,transparent_50%)]"></div>
            </div>

            {/* Animated Grid Pattern */}
            <div
                className="absolute inset-0 z-0 pointer-events-none animate-grid-scroll"
                style={{
                    backgroundImage: `
                        linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)
                    `,
                    backgroundSize: '60px 60px',
                    maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)',
                    WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)'
                }}
            />

            {/* Floating Orbs */}
            <div className="orb absolute w-[500px] h-[500px] rounded-full bg-blue/40 blur-[80px] top-[-100px] right-[-100px] animate-float"></div>
            <div className="orb absolute w-[300px] h-[300px] rounded-full bg-cyan/40 blur-[80px] bottom-[-50px] left-[10%] animate-float-delay"></div>
            <div className="orb absolute w-[200px] h-[200px] rounded-full bg-blue/40 blur-[80px] top-[40%] right-[25%] animate-float-delay-2"></div>

            <div className="container max-w-[1200px] mx-auto px-6 relative z-10 w-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center py-20 lg:py-28">
                    {/* Left Side */}
                    <div className="relative z-10 text-center lg:text-left">
                        <div className="mb-6">
                            <span className="inline-block px-3.5 py-1.5 rounded-full text-[0.78rem] font-semibold tracking-wide uppercase bg-cyan/15 text-cyan">
                                {data.badge}
                            </span>
                        </div>
                        <h1 className="text-white text-[clamp(2.4rem,5vw,3.8rem)] font-extrabold leading-[1.1] mb-6 font-plus-jakarta">
                            {data.title}
                            <br />
                            <span className="bg-gradient-to-r from-cyan to-cyan-light bg-clip-text text-transparent">
                                {data.highlightedText}
                            </span>
                        </h1>
                        <p className="text-white/70 text-[1.15rem] leading-relaxed mb-10 max-w-[520px] mx-auto lg:mx-0">
                            {data.subtitle}
                        </p>
                        <div className="flex flex-wrap gap-4 justify-center lg:justify-start mb-12">
                            <Link
                                href={data.buttonPrimaryLink}
                                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-[8px] font-semibold text-[0.95rem] border-2 border-transparent transition-all duration-200 whitespace-nowrap bg-cyan text-navy shadow-[0_4px_20px_rgba(0,194,203,0.3)] hover:bg-cyan-light hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(0,194,203,0.4)]"
                            >
                                {data.buttonPrimary}
                            </Link>
                            <Link
                                href={data.buttonSecondaryLink}
                                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-[8px] font-semibold text-[0.95rem] border-2 border-transparent transition-all duration-200 whitespace-nowrap bg-transparent text-white border-white/40 hover:bg-white/10 hover:border-white"
                            >
                                {data.buttonSecondary}
                            </Link>
                        </div>
                        <div className="flex flex-wrap gap-8 justify-center lg:justify-start pt-8 border-t border-white/10">
                            <div className="text-center lg:text-left">
                                <div className="font-plus-jakarta font-extrabold text-[1.6rem] text-cyan">
                                    {data.stats.years.value}
                                </div>
                                <div className="text-[0.8rem] text-white/55">{data.stats.years.label}</div>
                            </div>
                            <div className="text-center lg:text-left">
                                <div className="font-plus-jakarta font-extrabold text-[1.6rem] text-cyan">
                                    {data.stats.markets.value}
                                </div>
                                <div className="text-[0.8rem] text-white/55">{data.stats.markets.label}</div>
                            </div>
                            <div className="text-center lg:text-left">
                                <div className="font-plus-jakarta font-extrabold text-[1.6rem] text-cyan">
                                    {data.stats.partners.value}
                                </div>
                                <div className="text-[0.8rem] text-white/55">{data.stats.partners.label}</div>
                            </div>
                            <div className="text-center lg:text-left">
                                <div className="font-plus-jakarta font-extrabold text-[1.6rem] text-cyan">
                                    {data.stats.clients.value}
                                </div>
                                <div className="text-[0.8rem] text-white/55">{data.stats.clients.label}</div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Dashboard */}
                    <div className="relative flex justify-center items-center">
                        {/* Floating Card 1 - Top Left */}
                        <div className="absolute top-[-20px] left-[-40px] bg-white rounded-xl px-4 py-3 shadow-2xl flex items-center gap-2.5 text-[0.8rem] font-semibold text-navy whitespace-nowrap z-0 hidden lg:flex" style={{ animation: 'float 5s ease-in-out infinite' }}>
                            <div className="w-2 h-2 rounded-full bg-cyan" style={{ animation: 'pulse 2s ease-in-out infinite' }}></div>
                            {data.floatingCards.left}
                        </div>

                        {/* Dashboard Card */}
                        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[20px] p-7 w-full max-w-[440px] shadow-[0_32px_80px_rgba(0,0,0,0.4)] z-10" style={{ animation: 'float 6s ease-in-out infinite' }}>
                            {/* Header with dots */}
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]"></div>
                                <div className="w-2.5 h-2.5 rounded-full bg-[#FFBC2E]"></div>
                                <div className="w-2.5 h-2.5 rounded-full bg-[#28CA41]"></div>
                                <span className="text-white/50 text-[0.8rem] ml-auto">
                                    {data.dashboard.title}
                                </span>
                            </div>

                            {/* Services Grid */}
                            <div className="grid grid-cols-2 gap-2.5 mb-5">
                                {data.dashboard.services.map((service, index) => (
                                    <div
                                        key={index}
                                        className="bg-white/5 rounded-xl p-3.5 border border-white/5 transition-all duration-200 hover:bg-cyan/10 hover:border-cyan/30 hover:-translate-y-0.5"
                                    >
                                        <div className="text-[1.4rem] mb-2">{service.icon}</div>
                                        <div className="text-[0.75rem] font-semibold text-white/85">
                                            {service.name}
                                        </div>
                                        <div className="text-[0.65rem] text-cyan mt-0.5">{service.tag}</div>
                                    </div>
                                ))}
                            </div>

                            {/* Metrics */}
                            <div className="flex gap-2.5">
                                {data.dashboard.metrics.map((metric, index) => (
                                    <div key={index} className="flex-1 bg-white/5 rounded-[8px] p-3 border border-white/5">
                                        <div className="font-bold text-[1.2rem] text-white">{metric.value}</div>
                                        <div className="text-[0.65rem] text-white/40 mt-0.5">{metric.label}</div>
                                        <div className="text-cyan text-[0.7rem] mt-1 font-semibold">
                                            {metric.trend}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Floating Card 2 - Bottom Right */}
                        <div className="absolute bottom-5 z-10 right-[-30px] bg-white rounded-xl px-4 py-3 shadow-2xl flex items-center gap-2.5 text-[0.8rem] font-semibold text-navy whitespace-nowrap z-0 hidden lg:flex" style={{ animation: 'float 7s ease-in-out infinite reverse' }}>
                            <div className="w-2 h-2 rounded-full bg-cyan" style={{ animation: 'pulse 2s ease-in-out infinite' }}></div>
                            {data.floatingCards.right}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}