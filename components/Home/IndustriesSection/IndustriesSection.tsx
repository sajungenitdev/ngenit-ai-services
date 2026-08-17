"use client";

import { useEffect, useRef, useState } from "react";
import IndustryCard from "./IndustryCard";
import Link from "next/link";
import { getIndustries } from "@/services/industryApi";
import { IndustryData } from "@/types/admin/industry";

export default function IndustriesSection() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [industries, setIndustries] = useState<IndustryData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchIndustries();
    }, []);

    const fetchIndustries = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await getIndustries();
            // Filter only active industries for frontend
            setIndustries(data.filter(ind => ind.isActive !== false));
        } catch (error: any) {
            console.error("Error fetching industries:", error);
            setError(error.message || "Failed to load industries");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (loading || industries.length === 0) return;

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

                        // Animate industry cards with stagger
                        const cards = entry.target.querySelectorAll('.industry-card-wrapper');
                        cards.forEach((card, index) => {
                            setTimeout(() => {
                                card.classList.add('visible');
                            }, 200 + index * 60);
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
    // SKELETON LOADER
    // ============================================================
    if (loading) {
        return (
            <section className="py-24 md:py-32 bg-off-white" id="industries" ref={sectionRef}>
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

                    {/* Industry Cards Grid Skeleton */}
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
                            <div
                                key={i}
                                className="bg-white border border-grey-100 rounded-xl p-5 text-center flex flex-col items-center h-[180px]"
                            >
                                {/* Icon Skeleton */}
                                <div className="w-12 h-12 rounded-xl bg-grey-200 skeleton-pulse mb-3"></div>
                                
                                {/* Title Skeleton */}
                                <div className="h-4 w-3/4 bg-grey-200 rounded skeleton-pulse mb-2"></div>
                                
                                {/* Description Skeleton */}
                                <div className="space-y-1 flex-1 w-full">
                                    <div className="h-3 w-full bg-grey-100 rounded skeleton-pulse"></div>
                                    <div className="h-3 w-4/5 bg-grey-100 rounded skeleton-pulse mx-auto"></div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* View All Button Skeleton */}
                    <div className="text-center mt-8">
                        <div className="h-11 w-48 bg-grey-200 rounded-[8px] skeleton-pulse mx-auto"></div>
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
            <section className="py-24 md:py-32 bg-off-white" id="industries" ref={sectionRef}>
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
    if (industries.length === 0) {
        return (
            <section className="py-24 md:py-32 bg-off-white" id="industries" ref={sectionRef}>
                <div className="container max-w-[1200px] mx-auto px-6 md:px-8">
                    <div className="text-center">
                        <div className="bg-white rounded-xl p-12 border border-grey-100">
                            <h3 className="text-lg font-semibold text-navy mb-2">No Industries Available</h3>
                            <p className="text-grey-400">Check back later for our industry solutions.</p>
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
        <section className="py-24 md:py-32 bg-off-white" id="industries" ref={sectionRef}>
            <div className="container max-w-[1200px] mx-auto px-6 md:px-8">
                {/* Section Header */}
                <div className="text-center mb-16 section-header opacity-0 translate-y-[30px] transition-all duration-700">
                    <span className="inline-block px-3.5 py-1.5 rounded-full text-[0.78rem] font-semibold tracking-wide uppercase bg-cyan/15 text-cyan">
                        Industry Solutions
                    </span>
                    <h2 className="font-plus-jakarta font-bold text-[clamp(1.8rem,3.5vw,2.8rem)] leading-[1.15] text-grey-800 my-3 mb-5">
                        AI Solutions for<br />Every Industry
                    </h2>
                    <p className="max-w-[600px] mx-auto text-[1.05rem] text-grey-600 leading-relaxed">
                        We deliver industry-specific AI solutions that address the unique challenges,
                        regulations and data environments of each sector.
                    </p>
                </div>

                {/* Industry Cards Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 items-stretch">
                    {industries.map((industry) => (
                        <div
                            key={industry._id}
                            className="industry-card-wrapper opacity-0 translate-y-[30px] transition-all duration-700 flex"
                        >
                            <IndustryCard
                                id={industry.slug || industry._id!}
                                icon={industry.icon}
                                name={industry.name}
                                short={industry.short || industry.description}
                            />
                        </div>
                    ))}
                </div>

                {/* View All Button */}
                <div className="text-center mt-8">
                    <Link
                        href="/industries"
                        className="inline-flex items-center gap-2 px-7 py-3.5 rounded-[8px] font-semibold text-[0.95rem] border-2 border-transparent transition-all duration-200 whitespace-nowrap bg-transparent text-navy border-grey-200 hover:bg-off-white hover:border-navy"
                    >
                        View All Industries →
                    </Link>
                </div>
            </div>

            <style jsx>{`
                .section-header.visible {
                    opacity: 1 !important;
                    transform: translateY(0) !important;
                }
                .industry-card-wrapper.visible {
                    opacity: 1 !important;
                    transform: translateY(0) !important;
                }
                .industry-card-wrapper {
                    transition: opacity 0.7s ease, transform 0.7s ease;
                }
            `}</style>
        </section>
    );
}