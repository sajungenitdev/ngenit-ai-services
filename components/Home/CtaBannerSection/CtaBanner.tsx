"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { getCtaBanner } from "@/services/ctaBannerApi";
import { CtaBannerData } from "@/types/admin/ctaBanner";

export default function CtaBanner() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [data, setData] = useState<CtaBannerData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // ============================================================
    // FETCH CTA BANNER
    // ============================================================
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);
                const result = await getCtaBanner();
                setData(result);
            } catch (error: any) {
                console.error("Error fetching CTA banner:", error);
                setError(error.message || "Failed to load CTA banner");
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
                        // Animate left side
                        const left = entry.target.querySelector('.cta-left');
                        if (left) {
                            setTimeout(() => {
                                left.classList.add('visible');
                            }, 100);
                        }

                        // Animate right side
                        const right = entry.target.querySelector('.cta-right');
                        if (right) {
                            setTimeout(() => {
                                right.classList.add('visible');
                            }, 300);
                        }
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
            <section className="py-16 md:py-20 relative overflow-hidden bg-gradient-to-br from-navy-mid via-navy-light to-[#1a3a8f]" ref={sectionRef}>
                {/* Background Glow Skeleton */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_80%_50%,rgba(0,194,203,0.08)_0%,transparent_60%)]"></div>

                <div className="container max-w-[1200px] mx-auto px-6 md:px-8 relative z-10">
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
                        {/* Left Side Skeleton */}
                        <div className="text-center lg:text-left space-y-4 flex-1">
                            {/* Tag Skeleton */}
                            <div className="h-5 w-32 bg-white/10 rounded skeleton-pulse mx-auto lg:mx-0"></div>
                            
                            {/* Title Skeleton */}
                            <div className="space-y-2">
                                <div className="h-8 md:h-10 w-3/4 max-w-[400px] bg-white/15 rounded skeleton-pulse mx-auto lg:mx-0"></div>
                                <div className="h-8 md:h-10 w-1/2 max-w-[300px] bg-white/15 rounded skeleton-pulse mx-auto lg:mx-0"></div>
                            </div>
                            
                            {/* Description Skeleton */}
                            <div className="space-y-2 max-w-[460px] mx-auto lg:mx-0">
                                <div className="h-4 w-full bg-white/10 rounded skeleton-pulse"></div>
                                <div className="h-4 w-5/6 bg-white/10 rounded skeleton-pulse"></div>
                            </div>
                        </div>

                        {/* Right Side - Buttons Skeleton */}
                        <div className="flex flex-col gap-3 min-w-[220px] w-full lg:w-auto">
                            <div className="h-12 w-full bg-white/10 rounded-[8px] skeleton-pulse"></div>
                            <div className="h-12 w-full bg-white/10 rounded-[8px] skeleton-pulse"></div>
                            <div className="h-12 w-full bg-white/10 rounded-[8px] skeleton-pulse"></div>
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
            <section className="py-16 md:py-20 relative overflow-hidden bg-gradient-to-br from-navy-mid via-navy-light to-[#1a3a8f]" ref={sectionRef}>
                <div className="container max-w-[1200px] mx-auto px-6 md:px-8 relative z-10">
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

    // Build WhatsApp link
    const waLink = `https://wa.me/${data.phone.number}?text=Hello%20NGEN%20IT%2C%20I%20am%20interested%20in%20your%20AI%20services.`;

    // ============================================================
    // RENDER
    // ============================================================
    return (
        <section
            className="py-16 md:py-20 relative overflow-hidden bg-gradient-to-br from-navy-mid via-navy-light to-[#1a3a8f]"
            ref={sectionRef}
        >
            {/* Background Glow */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_80%_50%,rgba(0,194,203,0.18)_0%,transparent_60%)]"></div>

            <div className="container max-w-[1200px] mx-auto px-6 md:px-8 relative z-10">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
                    {/* Left Side - Text */}
                    <div className="cta-left opacity-0 translate-y-[30px] transition-all duration-700 text-center lg:text-left">
                        <div className="text-cyan-light text-sm font-semibold tracking-wide uppercase mb-3">
                            {data.tag}
                        </div>
                        <h2
                            className="font-plus-jakarta font-bold text-[clamp(1.8rem,3.5vw,2.8rem)] leading-[1.15] text-white max-w-[560px]"
                            dangerouslySetInnerHTML={{ __html: data.title }}
                        />
                        <div
                            className="text-white/65 text-[1rem] mt-3 max-w-[460px] leading-relaxed"
                            dangerouslySetInnerHTML={{ __html: data.description }}
                        />
                    </div>

                    {/* Right Side - Buttons */}
                    <div className="cta-right opacity-0 translate-y-[30px] transition-all duration-700 flex flex-col gap-3 min-w-[220px] w-full lg:w-auto">
                        <Link
                            href={waLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-[8px] font-semibold text-[0.95rem] border-2 border-transparent transition-all duration-200 whitespace-nowrap bg-green-wa text-white shadow-[0_4px_20px_rgba(37,211,102,0.3)] hover:bg-[#1ebe5d] hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(37,211,102,0.4)]"
                        >
                            <span>💬</span> {data.phone.label}
                        </Link>
                        <Link
                            href={data.button.link}
                            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-[8px] font-semibold text-[0.95rem] border-2 border-transparent transition-all duration-200 whitespace-nowrap bg-cyan text-navy shadow-[0_4px_20px_rgba(0,194,203,0.3)] hover:bg-cyan-light hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(0,194,203,0.4)]"
                        >
                            {data.button.label}
                        </Link>
                        <Link
                            href={`mailto:${data.email.address}`}
                            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-[8px] font-semibold text-[0.95rem] border-2 border-transparent transition-all duration-200 whitespace-nowrap bg-transparent text-white border-white/40 hover:bg-white/10 hover:border-white"
                        >
                            {data.email.label}
                        </Link>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .cta-left.visible {
                    opacity: 1 !important;
                    transform: translateY(0) !important;
                }
                .cta-right.visible {
                    opacity: 1 !important;
                    transform: translateY(0) !important;
                }
            `}</style>
        </section>
    );
}