"use client";

import { useEffect, useRef, useState } from "react";
import { getSolutions } from "@/services/solutionApi";
import { SolutionData } from "@/types/admin/solution";
import SolutionCard from "./SolutionCard";

export default function SolutionsSection() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [solutions, setSolutions] = useState<SolutionData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // ============================================================
    // FETCH SOLUTIONS
    // ============================================================
    useEffect(() => {
        const fetchSolutions = async () => {
            try {
                setLoading(true);
                setError(null);
                const data = await getSolutions();
                // Only show active solutions on frontend
                setSolutions(data.filter(s => s.isActive !== false));
            } catch (error: any) {
                console.error("Error fetching solutions:", error);
                setError(error.message || "Failed to load solutions");
            } finally {
                setLoading(false);
            }
        };

        fetchSolutions();
    }, []);

    // ============================================================
    // SCROLL ANIMATION
    // ============================================================
    useEffect(() => {
        if (loading || solutions.length === 0) return;

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

                        // Animate solution cards with stagger
                        const cards = entry.target.querySelectorAll('.solution-card-wrapper');
                        cards.forEach((card, index) => {
                            setTimeout(() => {
                                card.classList.add('visible');
                            }, 200 + index * 100);
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
    }, [loading, solutions]);

    // ============================================================
    // SKELETON LOADER
    // ============================================================
    if (loading) {
        return (
            <section className="py-24 md:py-32 bg-off-white" id="solutions" ref={sectionRef}>
                <div className="container max-w-[1200px] mx-auto px-6 md:px-8">
                    {/* Section Header Skeleton */}
                    <div className="text-center mb-16">
                        {/* Badge Skeleton */}
                        <div className="h-6 w-32 bg-cyan/20 rounded-full skeleton-pulse mx-auto"></div>

                        {/* Title Skeleton */}
                        <div className="space-y-2 mt-3 mb-5">
                            <div className="h-8 md:h-10 w-3/4 max-w-[400px] bg-grey-200 rounded skeleton-pulse mx-auto"></div>
                            <div className="h-8 md:h-10 w-1/2 max-w-[300px] bg-grey-200 rounded skeleton-pulse mx-auto"></div>
                        </div>

                        {/* Description Skeleton */}
                        <div className="max-w-[600px] mx-auto">
                            <div className="h-4 w-4/5 bg-grey-100 rounded skeleton-pulse mx-auto"></div>
                        </div>
                    </div>

                    {/* Solutions Grid Skeleton */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[1, 2, 3].map((i) => (
                            <div
                                key={i}
                                className="bg-white border border-grey-100 rounded-xl p-8 shadow-sm flex flex-col h-[280px]"
                            >
                                {/* Tag Skeleton */}
                                <div className="h-6 w-24 bg-blue/10 rounded-full skeleton-pulse mb-4"></div>

                                {/* Title Skeleton */}
                                <div className="h-6 w-3/4 bg-grey-200 rounded skeleton-pulse mb-3"></div>

                                {/* Description Skeleton */}
                                <div className="space-y-2 flex-1">
                                    <div className="h-3.5 w-full bg-grey-100 rounded skeleton-pulse"></div>
                                    <div className="h-3.5 w-5/6 bg-grey-100 rounded skeleton-pulse"></div>
                                    <div className="h-3.5 w-4/5 bg-grey-100 rounded skeleton-pulse"></div>
                                    <div className="h-3.5 w-2/3 bg-grey-100 rounded skeleton-pulse"></div>
                                </div>

                                {/* Tags Skeleton */}
                                <div className="flex flex-wrap gap-1.5 mt-4">
                                    <div className="h-6 w-16 bg-off-white rounded-md skeleton-pulse"></div>
                                    <div className="h-6 w-20 bg-off-white rounded-md skeleton-pulse"></div>
                                    <div className="h-6 w-14 bg-off-white rounded-md skeleton-pulse"></div>
                                </div>

                                {/* Footer Skeleton */}
                                <div className="flex items-center justify-between pt-4 mt-4 border-t border-grey-100">
                                    <div className="h-4 w-20 bg-grey-200 rounded skeleton-pulse"></div>
                                    <div className="h-10 w-24 bg-navy/30 rounded-[8px] skeleton-pulse"></div>
                                </div>
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
            <section className="py-24 md:py-32 bg-off-white" id="solutions" ref={sectionRef}>
                <div className="container max-w-[1200px] mx-auto px-6 md:px-8">
                    <div className="text-center">
                        <div className="bg-red-50 border border-red-200 rounded-xl p-8">
                            <p className="text-red-600 font-semibold">⚠️ {error}</p>
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
    if (solutions.length === 0) {
        return (
            <section className="py-24 md:py-32 bg-off-white" id="solutions" ref={sectionRef}>
                <div className="container max-w-[1200px] mx-auto px-6 md:px-8">
                    <div className="text-center">
                        <div className="bg-white rounded-xl p-12 border border-grey-100">
                            <h3 className="text-lg font-semibold text-navy mb-2">No Solutions Available</h3>
                            <p className="text-grey-400">Check back later for our AI solutions.</p>
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
        <section className="py-24 md:py-32 bg-off-white" id="solutions" ref={sectionRef}>
            <div className="container max-w-[1200px] mx-auto px-6 md:px-8">
                {/* Section Header */}
                <div className="text-center mb-16 section-header opacity-0 translate-y-[30px] transition-all duration-700">
                    <span className="inline-block px-3.5 py-1.5 rounded-full text-[0.78rem] font-semibold tracking-wide uppercase bg-cyan/15 text-cyan">
                        AI Solutions
                    </span>
                    <h2 className="font-plus-jakarta font-bold text-[clamp(1.8rem,3.5vw,2.8rem)] leading-[1.15] text-grey-800 my-3 mb-5">
                        Featured AI Solutions<br />Ready to Deploy
                    </h2>
                    <p className="max-w-[600px] mx-auto text-[1.05rem] text-grey-600 leading-relaxed">
                        Packaged, proven AI solutions designed for rapid implementation and measurable results.
                    </p>
                </div>

                {/* Solutions Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {solutions.map((solution) => (
                        <div
                            key={solution._id}
                            className="solution-card-wrapper opacity-0 translate-y-[30px] transition-all duration-700 flex"
                        >
                            <SolutionCard
                                tag={solution.tag}
                                name={solution.name}
                                desc={solution.desc}
                                tags={solution.tags}
                                footer={solution.footer}
                            />
                        </div>
                    ))}
                </div>
            </div>

            <style jsx>{`
                .section-header.visible {
                    opacity: 1 !important;
                    transform: translateY(0) !important;
                }
                .solution-card-wrapper.visible {
                    opacity: 1 !important;
                    transform: translateY(0) !important;
                }
                .solution-card-wrapper {
                    transition: opacity 0.7s ease, transform 0.7s ease;
                }
            `}</style>
        </section>
    );
}