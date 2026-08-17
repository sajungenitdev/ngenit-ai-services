"use client";

import { useEffect, useRef, useState } from "react";
import { getMethodology } from "@/services/methodologyApi";
import { MethodologyStep } from "@/types/admin/methodology";

export default function MethodologySection() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [steps, setSteps] = useState<MethodologyStep[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // ============================================================
    // FETCH METHODOLOGY STEPS
    // ============================================================
    useEffect(() => {
        const fetchSteps = async () => {
            try {
                setLoading(true);
                setError(null);
                const data = await getMethodology();
                // Filter active steps and sort by number
                const activeSteps = data
                    .filter(step => step.isActive !== false)
                    .sort((a, b) => (a.order || a.number) - (b.order || b.number));
                setSteps(activeSteps);
            } catch (error: any) {
                console.error("Error fetching methodology:", error);
                setError(error.message || "Failed to load methodology");
            } finally {
                setLoading(false);
            }
        };

        fetchSteps();
    }, []);

    // ============================================================
    // SCROLL ANIMATION
    // ============================================================
    useEffect(() => {
        if (loading || steps.length === 0) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const header = entry.target.querySelector('.section-header');
                        if (header) {
                            setTimeout(() => {
                                header.classList.add('visible');
                            }, 100);
                        }

                        const items = entry.target.querySelectorAll('.step-item');
                        items.forEach((item, index) => {
                            setTimeout(() => {
                                item.classList.add('visible');
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
    }, [loading, steps]);

    // ============================================================
    // SKELETON LOADER
    // ============================================================
    if (loading) {
        return (
            <section className="py-24 md:py-32 bg-white" id="methodology" ref={sectionRef}>
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
                        <div className="space-y-2 max-w-[600px] mx-auto">
                            <div className="h-4 w-full bg-grey-100 rounded skeleton-pulse"></div>
                            <div className="h-4 w-5/6 bg-grey-100 rounded skeleton-pulse mx-auto"></div>
                            <div className="h-4 w-4/5 bg-grey-100 rounded skeleton-pulse mx-auto"></div>
                        </div>
                    </div>

                    {/* Steps Grid Skeleton */}
                    <div className="relative">
                        {/* Connecting Line Skeleton */}
                        <div className="absolute top-[40px] left-[calc(10%+40px)] right-[calc(10%+40px)] h-[2px] bg-grey-200 z-0 hidden lg:block skeleton-pulse"></div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 relative z-10">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <div
                                    key={i}
                                    className="text-center flex flex-col items-center"
                                >
                                    {/* Circle Skeleton */}
                                    <div className="relative w-20 h-20 rounded-full bg-grey-200 border-3 border-grey-300 flex items-center justify-center mx-auto mb-5">
                                        <div className="w-8 h-8 bg-grey-300 rounded skeleton-pulse"></div>
                                        <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-cyan/50 text-navy text-[0.7rem] font-extrabold flex items-center justify-center skeleton-pulse">
                                            {i}
                                        </span>
                                    </div>

                                    {/* Title Skeleton */}
                                    <div className="h-5 w-20 bg-grey-200 rounded skeleton-pulse mb-2"></div>

                                    {/* Description Skeleton */}
                                    <div className="space-y-1 max-w-[180px] mx-auto">
                                        <div className="h-3 w-full bg-grey-100 rounded skeleton-pulse"></div>
                                        <div className="h-3 w-4/5 bg-grey-100 rounded skeleton-pulse mx-auto"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
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
            <section className="py-24 md:py-32 bg-white" id="methodology" ref={sectionRef}>
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
    if (steps.length === 0) {
        return (
            <section className="py-24 md:py-32 bg-white" id="methodology" ref={sectionRef}>
                <div className="container max-w-[1200px] mx-auto px-6 md:px-8">
                    <div className="text-center">
                        <div className="bg-off-white rounded-xl p-12">
                            <h3 className="text-lg font-semibold text-navy mb-2">No Methodology Steps Available</h3>
                            <p className="text-grey-400">Check back later for our methodology.</p>
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
        <section className="py-24 md:py-32 bg-white" id="methodology" ref={sectionRef}>
            <div className="container max-w-[1200px] mx-auto px-6 md:px-8">
                {/* Section Header */}
                <div className="text-center mb-16 section-header opacity-0 translate-y-[30px] transition-all duration-700">
                    <span className="inline-block px-3.5 py-1.5 rounded-full text-[0.78rem] font-semibold tracking-wide uppercase bg-cyan/15 text-cyan">
                        Our Methodology
                    </span>
                    <h2 className="font-plus-jakarta font-bold text-[clamp(1.8rem,3.5vw,2.8rem)] leading-[1.15] text-grey-800 my-3 mb-5">
                        How NGEN IT Delivers<br />AI Solutions
                    </h2>
                    <p className="max-w-[600px] mx-auto text-[1.05rem] text-grey-600 leading-relaxed">
                        A structured, low-risk approach to AI implementation — from initial discovery to live deployment and continuous improvement.
                    </p>
                </div>

                {/* Steps */}
                <div className="relative">
                    {/* Connecting Line - Desktop only */}
                    <div className="absolute top-[40px] left-[calc(10%+40px)] right-[calc(10%+40px)] h-[2px] bg-gradient-to-r from-blue to-cyan z-0 hidden lg:block"></div>

                    {/* Steps Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 relative z-10">
                        {steps.map((step) => (
                            <div
                                key={step._id || step.number}
                                className="step-item text-center opacity-0 translate-y-[30px] transition-all duration-700"
                            >
                                {/* Circle with Icon */}
                                <div className="relative w-20 h-20 rounded-full bg-white border-3 border-blue flex items-center justify-center text-[1.8rem] mx-auto mb-5 shadow-[0_0_0_8px_#F5F7FA] transition-all duration-300 hover:bg-navy hover:border-cyan hover:shadow-[0_0_0_8px_rgba(0,194,203,0.1),0_8px_32px_rgba(13,27,62,0.2)] hover:scale-105">
                                    {step.icon}
                                    <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-cyan text-navy text-[0.7rem] font-extrabold flex items-center justify-center">
                                        {step.number}
                                    </span>
                                </div>

                                {/* Content */}
                                <h3 className="text-[1rem] font-semibold text-navy mb-2 font-plus-jakarta">
                                    {step.title}
                                </h3>
                                <p className="text-[0.82rem] text-grey-400 leading-relaxed max-w-[180px] mx-auto">
                                    {step.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <style jsx>{`
                .section-header.visible {
                    opacity: 1 !important;
                    transform: translateY(0) !important;
                }
                .step-item.visible {
                    opacity: 1 !important;
                    transform: translateY(0) !important;
                }
                .border-3 {
                    border-width: 3px;
                }
            `}</style>
        </section>
    );
}