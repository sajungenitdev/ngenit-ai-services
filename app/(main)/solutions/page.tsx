"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { getSolutions } from "@/services/solutionApi";
import { SolutionData } from "@/types/admin/solution";

export default function SolutionsPage() {
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
                // Filter active solutions
                const activeSolutions = data.filter(s => s.isActive !== false);
                setSolutions(activeSolutions);
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

                        // Animate cards with stagger
                        const cards = entry.target.querySelectorAll('.solution-card');
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
            <>
                {/* Hero Skeleton */}
                <section className="relative bg-navy pt-40 pb-20 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy-mid to-navy">
                        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_80%_20%,rgba(0,194,203,0.18)_0%,transparent_60%)]"></div>
                    </div>
                    <div className="container max-w-[1200px] mx-auto px-6 md:px-8 relative z-10">
                        {/* Breadcrumb Skeleton */}
                        <div className="flex items-center gap-2 mb-5">
                            <div className="h-4 w-12 bg-white/10 rounded skeleton-pulse"></div>
                            <span className="text-white/20">/</span>
                            <div className="h-4 w-20 bg-white/20 rounded skeleton-pulse"></div>
                        </div>

                        {/* Tag Skeleton */}
                        <div className="h-7 w-28 bg-white/10 rounded-full mb-4 skeleton-pulse"></div>

                        {/* Title Skeleton */}
                        <div className="space-y-3 mt-4">
                            <div className="h-9 md:h-12 w-3/4 max-w-[450px] bg-white/15 rounded-lg skeleton-pulse"></div>
                            <div className="h-9 md:h-12 w-1/2 max-w-[300px] bg-white/15 rounded-lg skeleton-pulse"></div>
                        </div>

                        {/* Description Skeleton */}
                        <div className="space-y-2 mt-6 max-w-[640px]">
                            <div className="h-4 w-full bg-white/10 rounded skeleton-pulse"></div>
                            <div className="h-4 w-4/5 bg-white/10 rounded skeleton-pulse"></div>
                        </div>
                    </div>
                </section>

                {/* Solutions Grid Skeleton */}
                <section className="py-16 md:py-24 bg-white">
                    <div className="container max-w-[1200px] mx-auto px-6 md:px-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[1, 2, 3, 4, 5, 6].map((i) => (
                                <div
                                    key={i}
                                    className="bg-white border border-grey-100 rounded-xl p-8 shadow-sm flex flex-col h-[320px]"
                                >
                                    {/* Tag Skeleton */}
                                    <div className="h-7 w-24 bg-blue/10 rounded-full mb-4 skeleton-pulse"></div>

                                    {/* Title Skeleton */}
                                    <div className="h-6 w-3/4 bg-grey-200 rounded mb-3 skeleton-pulse"></div>

                                    {/* Description Skeleton */}
                                    <div className="space-y-2 flex-1">
                                        <div className="h-3.5 w-full bg-grey-100 rounded skeleton-pulse"></div>
                                        <div className="h-3.5 w-5/6 bg-grey-100 rounded skeleton-pulse"></div>
                                        <div className="h-3.5 w-4/5 bg-grey-100 rounded skeleton-pulse"></div>
                                        <div className="h-3.5 w-2/3 bg-grey-100 rounded skeleton-pulse"></div>
                                    </div>

                                    {/* Tags Skeleton */}
                                    <div className="flex flex-wrap gap-1.5 mt-5">
                                        <div className="h-6 w-16 bg-off-white rounded-md skeleton-pulse"></div>
                                        <div className="h-6 w-20 bg-off-white rounded-md skeleton-pulse"></div>
                                        <div className="h-6 w-14 bg-off-white rounded-md skeleton-pulse"></div>
                                    </div>

                                    {/* Footer Skeleton */}
                                    <div className="flex items-center justify-between pt-5 mt-5 border-t border-grey-100">
                                        <div className="h-4 w-20 bg-grey-200 rounded skeleton-pulse"></div>
                                        <div className="h-10 w-24 bg-navy-mid/30 rounded-[8px] skeleton-pulse"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Bottom CTA Skeleton */}
                <section className="py-16 md:py-20 bg-navy-mid">
                    <div className="container max-w-[1200px] mx-auto px-6 md:px-8">
                        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                            <div className="space-y-3 text-center lg:text-left">
                                <div className="h-8 w-80 bg-white/10 rounded-lg skeleton-pulse"></div>
                                <div className="h-8 w-56 bg-white/10 rounded-lg skeleton-pulse"></div>
                                <div className="h-4 w-72 bg-white/10 rounded skeleton-pulse"></div>
                            </div>
                            <div className="flex flex-col gap-3 min-w-[200px]">
                                <div className="h-12 w-full bg-white/10 rounded-[8px] skeleton-pulse"></div>
                                <div className="h-12 w-full bg-white/10 rounded-[8px] skeleton-pulse"></div>
                            </div>
                        </div>
                    </div>
                </section>

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
            </>
        );
    }

    // ============================================================
    // ERROR STATE
    // ============================================================
    if (error) {
        return (
            <>
                <section className="relative bg-navy pt-40 pb-20 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy-mid to-navy">
                        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_80%_20%,rgba(0,194,203,0.18)_0%,transparent_60%)]"></div>
                    </div>
                    <div className="container max-w-[1200px] mx-auto px-6 md:px-8 relative z-10">
                        <div className="flex items-center gap-2 text-white/40 text-sm mb-5 flex-wrap">
                            <Link href="/" className="hover:text-cyan transition-colors">Home</Link>
                            <span>/</span>
                            <span className="text-white/80">AI Solutions</span>
                        </div>
                        <span className="inline-block px-3.5 py-1.5 rounded-full text-[0.78rem] font-semibold tracking-wide uppercase bg-cyan/15 text-cyan">
                            AI Solutions
                        </span>
                        <h1 className="text-white text-[clamp(2rem,4vw,2.9rem)] font-extrabold font-plus-jakarta leading-[1.15] mt-4">
                            Featured AI Solutions,Ready to Deploy
                        </h1>
                        <p className="text-white/60 text-[1.05rem] max-w-[640px] leading-relaxed mt-4">
                            Packaged, proven AI solutions designed for rapid implementation and measurable results across industries.
                        </p>
                    </div>
                </section>
                <section className="py-24 bg-white">
                    <div className="container max-w-[1200px] mx-auto px-6 md:px-8">
                        <div className="bg-red-50 border border-red-200 rounded-xl p-12 text-center">
                            <p className="text-red-600 text-lg font-semibold">⚠️ {error}</p>
                            <button
                                onClick={() => window.location.reload()}
                                className="mt-4 px-6 py-2 bg-cyan text-navy rounded-lg font-semibold hover:bg-cyan-light transition-colors"
                            >
                                Refresh Page
                            </button>
                        </div>
                    </div>
                </section>
            </>
        );
    }

    // ============================================================
    // EMPTY STATE
    // ============================================================
    if (solutions.length === 0) {
        return (
            <>
                <section className="relative bg-navy pt-40 pb-20 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy-mid to-navy">
                        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_80%_20%,rgba(0,194,203,0.18)_0%,transparent_60%)]"></div>
                    </div>
                    <div className="container max-w-[1200px] mx-auto px-6 md:px-8 relative z-10">
                        <div className="flex items-center gap-2 text-white/40 text-sm mb-5 flex-wrap">
                            <Link href="/" className="hover:text-cyan transition-colors">Home</Link>
                            <span>/</span>
                            <span className="text-white/80">AI Solutions</span>
                        </div>
                        <span className="inline-block px-3.5 py-1.5 rounded-full text-[0.78rem] font-semibold tracking-wide uppercase bg-cyan/15 text-cyan">
                            AI Solutions
                        </span>
                        <h1 className="text-white text-[clamp(2rem,4vw,2.9rem)] font-extrabold font-plus-jakarta leading-[1.15] mt-4">
                            Featured AI Solutions,<br />Ready to Deploy
                        </h1>
                        <p className="text-white/60 text-[1.05rem] max-w-[640px] leading-relaxed mt-4">
                            Packaged, proven AI solutions designed for rapid implementation and measurable results across industries.
                        </p>
                    </div>
                </section>
                <section className="py-24 bg-white">
                    <div className="container max-w-[1200px] mx-auto px-6 md:px-8">
                        <div className="bg-off-white rounded-xl p-12 text-center">
                            <h3 className="text-lg font-semibold text-navy mb-2">No Solutions Available</h3>
                            <p className="text-grey-400">Check back later for our AI solutions.</p>
                        </div>
                    </div>
                </section>
            </>
        );
    }

    // ============================================================
    // RENDER
    // ============================================================
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
                        <span className="text-white/80">AI Solutions</span>
                    </div>

                    <span className="inline-block px-3.5 py-1.5 rounded-full text-[0.78rem] font-semibold tracking-wide uppercase bg-cyan/15 text-cyan">
                        AI Solutions
                    </span>
                    <h1 className="text-white text-[clamp(2rem,4vw,2.9rem)] font-extrabold font-plus-jakarta leading-[1.15] mt-4">
                        Featured AI Solutions,Ready to Deploy
                    </h1>
                    <p className="text-white/60 text-[1.05rem] max-w-[640px] leading-relaxed mt-4">
                        Packaged, proven AI solutions designed for rapid implementation and measurable results across industries.
                    </p>
                </div>
            </section>

            {/* Solutions Content */}
            <section className="py-16 md:py-24 bg-white" ref={sectionRef}>
                <div className="container max-w-[1200px] mx-auto px-6 md:px-8">
                    <div className="section-header opacity-0 translate-y-[30px] transition-all duration-700" />

                    {/* Solutions Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {solutions.map((solution, index) => (
                            <div
                                key={solution._id || index}
                                className="solution-card bg-white border border-grey-100 rounded-xl p-8 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg flex flex-col opacity-0 translate-y-[30px]"
                            >
                                {/* Tag */}
                                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue/10 text-blue text-[0.75rem] font-semibold mb-4 self-start">
                                    {solution.tag}
                                </div>

                                {/* Title */}
                                <h3 className="text-[1.1rem] font-semibold text-navy mb-3 font-plus-jakarta">
                                    {solution.name}
                                </h3>

                                {/* Description */}
                                <p className="text-[0.875rem] text-grey-400 leading-relaxed flex-1" dangerouslySetInnerHTML={{ __html: solution.desc }}
                                    />

                                {/* Industry Tags */}
                                {solution.tags && solution.tags.length > 0 && (
                                    <div className="flex flex-wrap gap-1.5 mt-5">
                                        {solution.tags.map((tag, tagIndex) => (
                                            <span
                                                key={tagIndex}
                                                className="px-2.5 py-1 rounded-md bg-off-white text-grey-600 text-[0.72rem] font-medium"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                )}

                                {/* Footer */}
                                <div className="flex items-center justify-between pt-5 mt-5 border-t border-grey-100">
                                    <span className="text-[0.8rem] text-grey-400">
                                        {solution.footer}
                                    </span>
                                    <Link
                                        href="/contact"
                                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[8px] font-semibold text-[0.875rem] border-2 border-transparent transition-all duration-200 whitespace-nowrap bg-navy-mid text-white hover:bg-navy-light hover:-translate-y-0.5"
                                    >
                                        Discuss →
                                    </Link>
                                </div>
                            </div>
                        ))}
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
                                Want a Solution Tailored<br />to Your Exact Requirement?
                            </h2>
                            <p className="text-white/60 text-[1rem] mt-3 max-w-[460px] leading-relaxed">
                                Every solution can be customized. Share your requirement and we will scope a fit.
                            </p>
                        </div>
                        <div className="flex flex-col gap-3 min-w-[200px] w-full lg:w-auto">
                            <Link
                                href="/contact"
                                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-[8px] font-semibold text-[0.95rem] border-2 border-transparent transition-all duration-200 whitespace-nowrap bg-cyan text-navy shadow-[0_4px_20px_rgba(0,194,203,0.3)] hover:bg-cyan-light hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(0,194,203,0.4)]"
                            >
                                Share Your Requirement
                            </Link>
                            <Link
                                href="/services"
                                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-[8px] font-semibold text-[0.95rem] border-2 border-transparent transition-all duration-200 whitespace-nowrap bg-transparent text-white border-white/40 hover:bg-white/10 hover:border-white"
                            >
                                Explore All Services →
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <style jsx>{`
                .section-header.visible {
                    opacity: 1 !important;
                    transform: translateY(0) !important;
                }
                .solution-card.visible {
                    opacity: 1 !important;
                    transform: translateY(0) !important;
                }
                .solution-card {
                    transition: opacity 0.7s ease, transform 0.7s ease, box-shadow 0.3s ease, transform 0.3s ease;
                }
            `}</style>
        </>
    );
}