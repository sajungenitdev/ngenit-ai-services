"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { getWhyNgen } from "@/services/whyNgenApi";
import { WhyNgenData } from "@/types/admin/whyNgen";

export default function WhyNgenSection() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [data, setData] = useState<WhyNgenData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // ============================================================
    // FETCH WHY NGEN
    // ============================================================
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);
                const result = await getWhyNgen();
                setData(result);
            } catch (error: any) {
                console.error("Error fetching why ngen:", error);
                setError(error.message || "Failed to load data");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // ============================================================
    // SCROLL ANIMATION
    // ============================================================
    useEffect(() => {
        if (loading || !data) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const left = entry.target.querySelector('.why-left');
                        if (left) {
                            setTimeout(() => {
                                left.classList.add('visible');
                            }, 100);
                        }

                        const cards = entry.target.querySelectorAll('.why-card');
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
    }, [loading, data]);

    // ============================================================
    // SKELETON LOADER
    // ============================================================
    if (loading) {
        return (
            <section className="py-24 md:py-32 bg-navy-mid" ref={sectionRef}>
                <div className="container max-w-[1200px] mx-auto px-6 md:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        {/* Left Side Skeleton */}
                        <div className="space-y-4">
                            {/* Badge Skeleton */}
                            <div className="h-7 w-32 bg-white/10 rounded-full skeleton-pulse"></div>
                            
                            {/* Title Skeleton */}
                            <div className="space-y-2">
                                <div className="h-8 md:h-10 w-3/4 max-w-[400px] bg-white/15 rounded skeleton-pulse"></div>
                                <div className="h-8 md:h-10 w-1/2 max-w-[300px] bg-white/15 rounded skeleton-pulse"></div>
                            </div>
                            
                            {/* Description Skeleton */}
                            <div className="space-y-2">
                                <div className="h-4 w-full bg-white/10 rounded skeleton-pulse"></div>
                                <div className="h-4 w-5/6 bg-white/10 rounded skeleton-pulse"></div>
                                <div className="h-4 w-4/5 bg-white/10 rounded skeleton-pulse"></div>
                                <div className="h-4 w-3/4 bg-white/10 rounded skeleton-pulse"></div>
                            </div>
                            
                            {/* Button Skeleton */}
                            <div className="h-12 w-48 bg-white/10 rounded-[8px] skeleton-pulse"></div>
                        </div>

                        {/* Right Side - Feature Cards Skeleton */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {[1, 2, 3, 4].map((i) => (
                                <div
                                    key={i}
                                    className="bg-white/5 rounded-xl p-6 border border-white/10 flex flex-col h-[160px]"
                                >
                                    {/* Icon Skeleton */}
                                    <div className="w-8 h-8 bg-white/10 rounded skeleton-pulse mb-3"></div>
                                    
                                    {/* Title Skeleton */}
                                    <div className="h-4 w-3/4 bg-white/15 rounded skeleton-pulse mb-2"></div>
                                    
                                    {/* Description Skeleton */}
                                    <div className="space-y-1 flex-1">
                                        <div className="h-3 w-full bg-white/10 rounded skeleton-pulse"></div>
                                        <div className="h-3 w-4/5 bg-white/10 rounded skeleton-pulse"></div>
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
            <section className="py-24 md:py-32 bg-navy-mid" ref={sectionRef}>
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
    // DON'T RENDER IF NOT ACTIVE
    // ============================================================
    if (!data || !data.isActive) {
        return null;
    }

    // ============================================================
    // RENDER
    // ============================================================
    return (
        <section className="py-24 md:py-32 bg-navy-mid" ref={sectionRef}>
            <div className="container max-w-[1200px] mx-auto px-6 md:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Left Side - Text Content */}
                    <div className="why-left opacity-0 translate-y-[30px] transition-all duration-700">
                        <span className="inline-block px-3.5 py-1.5 rounded-full text-[0.78rem] font-semibold tracking-wide uppercase bg-white/10 text-white/80">
                            {data.tag}
                        </span>
                        <h2
                            className="font-plus-jakarta font-bold text-[clamp(1.8rem,3.5vw,2.8rem)] leading-[1.15] text-white mt-4 mb-5"
                            dangerouslySetInnerHTML={{ __html: data.title }}
                        />
                        <div
                            className="text-[1.05rem] text-white/60 leading-relaxed mb-8"
                            dangerouslySetInnerHTML={{ __html: data.description }}
                        />
                        <Link
                            href={data.button.link}
                            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-[8px] font-semibold text-[0.95rem] border-2 border-transparent transition-all duration-200 whitespace-nowrap bg-cyan text-navy shadow-[0_4px_20px_rgba(0,194,203,0.3)] hover:bg-cyan-light hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(0,194,203,0.4)]"
                        >
                            {data.button.label}
                        </Link>
                    </div>

                    {/* Right Side - Feature Cards Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {data.features.map((feature, index) => (
                            <div
                                key={index}
                                className="why-card bg-white/5 rounded-xl p-6 border border-white/10 transition-all duration-300 hover:bg-white/10 opacity-0 translate-y-[30px]"
                            >
                                <div className="text-2xl mb-3">{feature.icon}</div>
                                <h4 className="text-[0.9rem] font-semibold text-white mb-2 font-plus-jakarta">
                                    {feature.title}
                                </h4>
                                <p className="text-[0.8rem] text-white/50 leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <style jsx>{`
                .why-left.visible {
                    opacity: 1 !important;
                    transform: translateY(0) !important;
                }
                .why-card.visible {
                    opacity: 1 !important;
                    transform: translateY(0) !important;
                }
                .why-card {
                    transition: opacity 0.7s ease, transform 0.7s ease, background-color 0.3s ease;
                }
            `}</style>
        </section>
    );
}