"use client";

import { useEffect, useRef, useState } from "react";
import { getOutcomes } from "@/services/outcomeApi";
import { OutcomeData } from "@/types/admin/outcome";

export default function OutcomesSection() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [outcomes, setOutcomes] = useState<OutcomeData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // ============================================================
    // FETCH OUTCOMES
    // ============================================================
    useEffect(() => {
        const fetchOutcomes = async () => {
            try {
                setLoading(true);
                setError(null);
                const data = await getOutcomes();
                // Only show active outcomes on frontend
                setOutcomes(data.filter(o => o.isActive !== false));
            } catch (error: any) {
                console.error("Error fetching outcomes:", error);
                setError(error.message || "Failed to load outcomes");
            } finally {
                setLoading(false);
            }
        };

        fetchOutcomes();
    }, []);

    // ============================================================
    // SCROLL ANIMATION
    // ============================================================
    useEffect(() => {
        if (loading || outcomes.length === 0) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        // Animate header
                        const header = entry.target.querySelector('.section-header');
                        if (header) {
                            setTimeout(() => {
                                header.classList.add('visible');
                            }, 100);
                        }

                        // Animate outcome items with stagger
                        const items = entry.target.querySelectorAll('.outcome-item');
                        items.forEach((item, index) => {
                            setTimeout(() => {
                                item.classList.add('visible');
                            }, 200 + index * 80);
                        });
                    }
                });
            },
            {
                threshold: 0.1,
                rootMargin: "0px 0px -50px 0px"
            }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
        };
    }, [loading, outcomes]);

    // ============================================================
    // SKELETON LOADER
    // ============================================================
    if (loading) {
        return (
            <section className="py-24 md:py-32 bg-navy" ref={sectionRef}>
                <div className="container max-w-[1200px] mx-auto px-6 md:px-8">
                    {/* Section Header Skeleton */}
                    <div className="text-center mb-16">
                        {/* Badge Skeleton */}
                        <div className="h-6 w-32 bg-white/10 rounded-full skeleton-pulse mx-auto"></div>

                        {/* Title Skeleton */}
                        <div className="space-y-2 mt-3 mb-5">
                            <div className="h-8 md:h-10 w-3/4 max-w-[400px] bg-white/15 rounded skeleton-pulse mx-auto"></div>
                            <div className="h-8 md:h-10 w-1/2 max-w-[300px] bg-white/15 rounded skeleton-pulse mx-auto"></div>
                        </div>

                        {/* Description Skeleton */}
                        <div className="max-w-[600px] mx-auto">
                            <div className="h-4 w-4/5 bg-white/10 rounded skeleton-pulse mx-auto"></div>
                        </div>
                    </div>

                    {/* Outcomes Grid Skeleton */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 rounded-2xl overflow-hidden border border-white/5">
                        {[1, 2, 3, 4].map((i) => (
                            <div
                                key={i}
                                className="bg-white/5 p-9 flex flex-col"
                            >
                                {/* Icon Skeleton */}
                                <div className="w-12 h-12 bg-white/10 rounded-xl skeleton-pulse mb-4"></div>

                                {/* Title Skeleton */}
                                <div className="h-5 w-3/4 bg-white/15 rounded skeleton-pulse mb-2.5"></div>

                                {/* Description Skeleton */}
                                <div className="space-y-1.5 flex-1">
                                    <div className="h-3.5 w-full bg-white/10 rounded skeleton-pulse"></div>
                                    <div className="h-3.5 w-5/6 bg-white/10 rounded skeleton-pulse"></div>
                                    <div className="h-3.5 w-4/5 bg-white/10 rounded skeleton-pulse"></div>
                                </div>

                                {/* Stat Skeleton */}
                                <div className="mt-4 h-7 w-20 bg-cyan/30 rounded skeleton-pulse"></div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Custom Skeleton Pulse Animation */}
                <style jsx>{`
                    .skeleton-pulse {
                        animation: skeletonPulse 1.8s ease-in-out infinite;
                    }
                    
                    @keyframes skeletonPulse {
                        0% {
                            opacity: 0.4;
                        }
                        50% {
                            opacity: 0.7;
                        }
                        100% {
                            opacity: 0.4;
                        }
                    }
                `}</style>
            </section>
        );
    }

    // ============================================================
    // ERROR STATE
    // ============================================================
    if (error) {
        return (
            <section className="py-24 md:py-32 bg-navy" ref={sectionRef}>
                <div className="container max-w-[1200px] mx-auto px-6 md:px-8">
                    <div className="text-center">
                        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-8">
                            <p className="text-red-400 font-semibold">⚠️ {error}</p>
                            <button
                                onClick={() => window.location.reload()}
                                className="mt-4 px-6 py-2 bg-cyan text-navy rounded-lg font-semibold hover:bg-cyan-light transition-colors"
                            >
                                Refresh Page
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    // ============================================================
    // EMPTY STATE
    // ============================================================
    if (outcomes.length === 0) {
        return (
            <section className="py-24 md:py-32 bg-navy" ref={sectionRef}>
                <div className="container max-w-[1200px] mx-auto px-6 md:px-8">
                    <div className="text-center">
                        <div className="bg-white/5 border border-white/10 rounded-xl p-12">
                            <h3 className="text-white text-lg font-semibold mb-2">No Outcomes Available</h3>
                            <p className="text-white/40">Check back later for our business outcomes.</p>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    // ============================================================
    // RENDER
    // ============================================================
    return (
        <section className="py-24 md:py-32 bg-navy" ref={sectionRef}>
            <div className="container max-w-[1200px] mx-auto px-6 md:px-8">
                {/* Section Header */}
                <div className="text-center mb-16 section-header opacity-0 translate-y-[30px] transition-all duration-700">
                    <span className="inline-block px-3.5 py-1.5 rounded-full text-[0.78rem] font-semibold tracking-wide uppercase bg-white/10 text-white/80">
                        Business Outcomes
                    </span>
                    <h2 className="font-plus-jakarta font-bold text-[clamp(1.8rem,3.5vw,2.8rem)] leading-[1.15] text-white my-3 mb-5">
                        What AI Can Do<br />For Your Organization
                    </h2>
                    <p className="max-w-[600px] mx-auto text-[1.05rem] text-white/60 leading-relaxed">
                        We focus on practical, measurable business outcomes — not just technology.
                    </p>
                </div>

                {/* Outcomes Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 rounded-2xl overflow-hidden border border-white/5">
                    {outcomes.map((outcome, index) => (
                        <div
                            key={outcome._id || index}
                            className="outcome-item bg-white/5 p-9 transition-all duration-300 hover:bg-cyan/10 opacity-0 translate-y-[30px]"
                        >
                            <div className="text-4xl mb-4">{outcome.icon}</div>
                            <h3 className="text-[1rem] font-semibold text-white mb-2.5 font-plus-jakarta">
                                {outcome.title}
                            </h3>
                            <p className="text-[0.85rem] leading-relaxed text-white/50">
                                {outcome.description}
                            </p>
                            <div className="mt-4 text-[1.4rem] font-extrabold font-plus-jakarta text-cyan">
                                {outcome.stat}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <style jsx>{`
                .section-header.visible {
                    opacity: 1 !important;
                    transform: translateY(0) !important;
                }
                .outcome-item.visible {
                    opacity: 1 !important;
                    transform: translateY(0) !important;
                }
                .outcome-item {
                    transition: opacity 0.7s ease, transform 0.7s ease, background-color 0.3s ease;
                }
            `}</style>
        </section>
    );
}