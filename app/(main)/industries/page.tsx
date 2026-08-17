"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { getIndustries } from "@/services/industryApi";
import { IndustryData } from "@/types/admin/industry";

export default function IndustriesPage() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [industries, setIndustries] = useState<IndustryData[]>([]);
    const [filteredIndustries, setFilteredIndustries] = useState<IndustryData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState("");

    // ============================================================
    // FETCH INDUSTRIES
    // ============================================================
    useEffect(() => {
        const fetchIndustries = async () => {
            try {
                setLoading(true);
                setError(null);
                const data = await getIndustries();
                const activeIndustries = data.filter((industry) => industry.isActive !== false);
                setIndustries(activeIndustries);
                setFilteredIndustries(activeIndustries);
            } catch (error: any) {
                console.error("Error fetching industries:", error);
                setError(error.message || "Failed to load industries");
            } finally {
                setLoading(false);
            }
        };

        fetchIndustries();
    }, []);

    // ============================================================
    // SEARCH FILTER
    // ============================================================
    useEffect(() => {
        if (searchTerm.trim() === "") {
            setFilteredIndustries(industries);
        } else {
            const filtered = industries.filter((industry) =>
                industry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (industry.short && industry.short.toLowerCase().includes(searchTerm.toLowerCase())) ||
                (industry.focusAreas && industry.focusAreas.some(area =>
                    area.toLowerCase().includes(searchTerm.toLowerCase())
                ))
            );
            setFilteredIndustries(filtered);
        }
    }, [searchTerm, industries]);

    // ============================================================
    // SCROLL ANIMATION
    // ============================================================
    useEffect(() => {
        if (loading || industries.length === 0) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const header = entry.target.querySelector('.industries-header');
                        if (header) {
                            setTimeout(() => {
                                header.classList.add('visible');
                            }, 100);
                        }

                        const cards = entry.target.querySelectorAll('.industry-card');
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
    }, [loading, industries]);

    // ============================================================
    // SKELETON LOADER (FIXED - Smooth pulse for text)
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
                            <div className="h-4 w-16 bg-white/20 rounded skeleton-pulse"></div>
                        </div>

                        {/* Tag Skeleton */}
                        <div className="h-7 w-28 bg-white/10 rounded-full mb-4 skeleton-pulse"></div>

                        {/* Title Skeleton */}
                        <div className="space-y-3 mt-4">
                            <div className="h-9 md:h-12 w-3/4 max-w-[450px] bg-white/15 rounded-lg skeleton-pulse"></div>
                            <div className="h-9 md:h-12 w-1/2 max-w-[300px] bg-white/15 rounded-lg skeleton-pulse"></div>
                        </div>

                        {/* Subtitle Skeleton */}
                        <div className="space-y-2 mt-6 max-w-[640px]">
                            <div className="h-4 w-full bg-white/10 rounded skeleton-pulse"></div>
                            <div className="h-4 w-4/5 bg-white/10 rounded skeleton-pulse"></div>
                        </div>
                    </div>
                </section>

                {/* Content Skeleton */}
                <section className="py-16 md:py-24 bg-white">
                    <div className="container max-w-[1200px] mx-auto px-6 md:px-8">
                        {/* Search Bar Skeleton */}
                        <div className="max-w-md mx-auto mb-10">
                            <div className="h-12 w-full bg-grey-100 rounded-xl border border-grey-200 skeleton-pulse"></div>
                        </div>

                        {/* Grid Skeleton */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[1, 2, 3, 4, 5, 6].map((i) => (
                                <div
                                    key={i}
                                    className="bg-white border border-grey-100 rounded-xl p-6 shadow-sm flex flex-col h-[280px]"
                                >
                                    {/* Icon Skeleton */}
                                    <div className="w-14 h-14 rounded-xl bg-grey-200 mb-4 shrink-0 skeleton-pulse"></div>

                                    {/* Title Skeleton */}
                                    <div className="h-6 w-2/3 bg-grey-200 rounded mb-3 skeleton-pulse"></div>

                                    {/* Description Skeleton */}
                                    <div className="space-y-2 flex-1">
                                        <div className="h-3.5 w-full bg-grey-100 rounded skeleton-pulse"></div>
                                        <div className="h-3.5 w-5/6 bg-grey-100 rounded skeleton-pulse"></div>
                                        <div className="h-3.5 w-2/3 bg-grey-100 rounded skeleton-pulse"></div>
                                    </div>

                                    {/* Tags Skeleton */}
                                    <div className="flex gap-1.5 mt-4">
                                        <div className="h-5 w-16 bg-grey-100 rounded-md skeleton-pulse"></div>
                                        <div className="h-5 w-20 bg-grey-100 rounded-md skeleton-pulse"></div>
                                        <div className="h-5 w-12 bg-grey-100 rounded-md skeleton-pulse"></div>
                                    </div>

                                    {/* Footer Link Skeleton */}
                                    <div className="mt-4 pt-4 border-t border-grey-100 flex items-center">
                                        <div className="h-4 w-24 bg-grey-200 rounded skeleton-pulse"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Custom Skeleton Pulse Animation - Smoother */}
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
                    
                    /* Alternative: if you want a shimmer effect instead */
                    .skeleton-shimmer {
                        background: linear-gradient(
                            90deg,
                            #f0f0f0 25%,
                            #e0e0e0 50%,
                            #f0f0f0 75%
                        );
                        background-size: 200% 100%;
                        animation: shimmer 1.5s ease-in-out infinite;
                    }
                    
                    @keyframes shimmer {
                        0% {
                            background-position: -200% 0;
                        }
                        100% {
                            background-position: 200% 0;
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
                            <span className="text-white/80">Industries</span>
                        </div>
                        <span className="inline-block px-3.5 py-1.5 rounded-full text-[0.78rem] font-semibold tracking-wide uppercase bg-cyan/15 text-cyan">
                            Industries
                        </span>
                        <h1 className="text-white text-[clamp(2rem,4vw,2.9rem)] font-extrabold font-plus-jakarta leading-[1.15] mt-4">
                            AI Solutions for<br />Every Industry
                        </h1>
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
    if (industries.length === 0) {
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
                            <span className="text-white/80">Industries</span>
                        </div>
                        <span className="inline-block px-3.5 py-1.5 rounded-full text-[0.78rem] font-semibold tracking-wide uppercase bg-cyan/15 text-cyan">
                            Industries
                        </span>
                        <h1 className="text-white text-[clamp(2rem,4vw,2.9rem)] font-extrabold font-plus-jakarta leading-[1.15] mt-4">
                            AI Solutions for<br />Every Industry
                        </h1>
                    </div>
                </section>
                <section className="py-24 bg-white">
                    <div className="container max-w-[1200px] mx-auto px-6 md:px-8">
                        <div className="bg-off-white rounded-xl p-12 text-center">
                            <h3 className="text-lg font-semibold text-navy mb-2">No Industries Available</h3>
                            <p className="text-grey-400">Check back later for our industry solutions.</p>
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
                        <span className="text-white/80">Industries</span>
                    </div>

                    <span className="inline-block px-3.5 py-1.5 rounded-full text-[0.78rem] font-semibold tracking-wide uppercase bg-cyan/15 text-cyan">
                        Industries
                    </span>
                    <h1 className="text-white text-[clamp(2rem,4vw,2.9rem)] font-extrabold font-plus-jakarta leading-[1.15] mt-4">
                        AI Solutions for<br />Every Industry
                    </h1>
                    <p className="text-white/60 text-[1.05rem] max-w-[640px] leading-relaxed mt-4">
                        Discover how AI can transform your industry — from manufacturing and energy
                        to healthcare, finance, logistics and beyond.
                    </p>
                </div>
            </section>

            {/* Industries Content */}
            <section className="py-16 md:py-24 bg-white" ref={sectionRef}>
                <div className="container max-w-[1200px] mx-auto px-6 md:px-8">
                    <div className="industries-header opacity-0 translate-y-[30px] transition-all duration-700">
                        {/* Search */}
                        <div className="relative max-w-md mx-auto mb-10">
                            <input
                                type="text"
                                placeholder="Search industries..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 rounded-xl border border-grey-200 focus:border-cyan outline-none transition-all bg-white"
                            />
                            <svg
                                className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-grey-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                />
                            </svg>
                            {searchTerm && (
                                <button
                                    onClick={() => setSearchTerm("")}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-grey-400 hover:text-grey-600"
                                >
                                    ✕
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Results Count */}
                    <p className="text-sm text-grey-400 mb-6">
                        {filteredIndustries.length} {filteredIndustries.length === 1 ? 'industry' : 'industries'} found
                    </p>

                    {/* Industries Grid */}
                    {filteredIndustries.length === 0 ? (
                        <div className="bg-off-white rounded-xl p-12 text-center">
                            <h3 className="text-lg font-semibold text-navy mb-2">No industries found</h3>
                            <p className="text-grey-400">
                                Try adjusting your search terms
                            </p>
                            <button
                                onClick={() => setSearchTerm("")}
                                className="mt-4 px-6 py-2 bg-cyan text-navy rounded-lg font-semibold hover:bg-cyan-light transition-colors"
                            >
                                Clear Search
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredIndustries.map((industry) => (
                                <Link
                                    key={industry._id}
                                    href={`/industries/${industry.slug || industry._id}`}
                                    className="group block"
                                >
                                    <div className="industry-card bg-white border border-grey-100 rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1.5 opacity-0 translate-y-[30px] h-full flex flex-col">
                                        {/* Icon */}
                                        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-navy-mid to-blue flex items-center justify-center text-2xl mb-4 group-hover:scale-105 transition-transform duration-300">
                                            {industry.icon || '🏭'}
                                        </div>

                                        {/* Name */}
                                        <h3 className="text-lg font-semibold text-navy mb-2 group-hover:text-cyan transition-colors">
                                            {industry.name}
                                        </h3>

                                        {/* Description */}
                                        <p className="text-grey-400 text-sm leading-relaxed flex-1">
                                            {industry.short || industry.long}
                                        </p>

                                        {/* Focus Areas */}
                                        {industry.focusAreas && industry.focusAreas.length > 0 && (
                                            <div className="flex flex-wrap gap-1.5 mt-4">
                                                {industry.focusAreas.slice(0, 3).map((area, index) => (
                                                    <span
                                                        key={index}
                                                        className="px-2 py-0.5 rounded-md bg-off-white text-black text-[0.65rem] font-medium"
                                                    >
                                                        {area}
                                                    </span>
                                                ))}
                                                {industry.focusAreas.length > 3 && (
                                                    <span className="px-2 py-0.5 rounded-md bg-off-white text-black text-[0.65rem] font-medium">
                                                        +{industry.focusAreas.length - 3}
                                                    </span>
                                                )}
                                            </div>
                                        )}

                                        {/* Learn More */}
                                        <div className="mt-4 pt-4 border-t border-grey-100 flex items-center text-sm font-medium text-cyan opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            Learn More →
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Bottom CTA */}
            <section className="py-16 md:py-20 relative overflow-hidden bg-gradient-to-br from-navy-mid via-navy-light to-[#1a3a8f]">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_80%_50%,rgba(0,194,203,0.18)_0%,transparent_60%)]"></div>
                <div className="container max-w-[1200px] mx-auto px-6 md:px-8 relative z-10">
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                        <div className="text-center lg:text-left">
                            <h2 className="font-plus-jakarta font-bold text-[clamp(1.5rem,2.5vw,2.2rem)] leading-[1.15] text-white max-w-[560px]">
                                Don't See Your Industry?
                            </h2>
                            <p className="text-white/60 text-[1rem] mt-3 max-w-[460px] leading-relaxed">
                                We work across industries. Share your requirement and we will scope a solution.
                            </p>
                        </div>
                        <div className="flex flex-col gap-3 min-w-[200px] w-full lg:w-auto">
                            <Link
                                href="/contact"
                                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-[8px] font-semibold text-[0.95rem] border-2 border-transparent transition-all duration-200 whitespace-nowrap bg-cyan text-navy shadow-[0_4px_20px_rgba(0,194,203,0.3)] hover:bg-cyan-light hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(0,194,203,0.4)]"
                            >
                                Talk to Our Team
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
                .industries-header.visible {
                    opacity: 1 !important;
                    transform: translateY(0) !important;
                }
                .industry-card.visible {
                    opacity: 1 !important;
                    transform: translateY(0) !important;
                }
                .industry-card {
                    transition: opacity 0.7s ease, transform 0.7s ease, box-shadow 0.3s ease, transform 0.3s ease;
                }
            `}</style>
        </>
    );
}