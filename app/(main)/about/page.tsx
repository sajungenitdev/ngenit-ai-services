"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { getAboutPage } from "@/services/aboutPageApi";
import { AboutPageData, Milestone, Value, Office } from "@/types/admin/aboutPage";

export default function AboutPage() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [data, setData] = useState<AboutPageData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // ============================================================
    // FETCH ABOUT PAGE DATA
    // ============================================================
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);
                const result = await getAboutPage();
                setData(result);
            } catch (error: any) {
                console.error("Error fetching about page:", error);
                setError(error.message || "Failed to load about page");
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
                        const header = entry.target.querySelector('.about-header');
                        if (header) {
                            setTimeout(() => {
                                header.classList.add('visible');
                            }, 100);
                        }

                        const sections = entry.target.querySelectorAll('.about-section');
                        sections.forEach((section, index) => {
                            setTimeout(() => {
                                section.classList.add('visible');
                            }, 200 + index * 150);
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
                            <div className="h-9 md:h-12 w-3/4 max-w-[500px] bg-white/15 rounded-lg skeleton-pulse"></div>
                            <div className="h-9 md:h-12 w-1/2 max-w-[350px] bg-white/15 rounded-lg skeleton-pulse"></div>
                        </div>

                        {/* Description Skeleton */}
                        <div className="space-y-2 mt-6 max-w-[640px]">
                            <div className="h-4 w-full bg-white/10 rounded skeleton-pulse"></div>
                            <div className="h-4 w-4/5 bg-white/10 rounded skeleton-pulse"></div>
                            <div className="h-4 w-3/4 bg-white/10 rounded skeleton-pulse"></div>
                        </div>
                    </div>
                </section>

                {/* Content Skeleton */}
                <section className="py-16 md:py-24 bg-white">
                    <div className="container max-w-[1200px] mx-auto px-6 md:px-8">
                        <div className="space-y-16">
                            {/* Story Section Skeleton */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                                <div className="space-y-4">
                                    <div className="h-6 w-24 bg-grey-200 rounded-full skeleton-pulse"></div>
                                    <div className="h-8 w-3/4 bg-grey-200 rounded-lg skeleton-pulse"></div>
                                    <div className="h-8 w-1/2 bg-grey-200 rounded-lg skeleton-pulse"></div>
                                    <div className="space-y-2">
                                        <div className="h-4 w-full bg-grey-100 rounded skeleton-pulse"></div>
                                        <div className="h-4 w-5/6 bg-grey-100 rounded skeleton-pulse"></div>
                                        <div className="h-4 w-4/5 bg-grey-100 rounded skeleton-pulse"></div>
                                        <div className="h-4 w-full bg-grey-100 rounded skeleton-pulse"></div>
                                        <div className="h-4 w-2/3 bg-grey-100 rounded skeleton-pulse"></div>
                                    </div>
                                </div>

                                {/* Timeline Skeleton */}
                                <div className="space-y-6 pl-8 border-l-2 border-grey-200">
                                    {[1, 2, 3, 4, 5].map((i) => (
                                        <div key={i} className="relative pb-6 last:pb-0">
                                            <div className="absolute -left-[40px] top-1.5 w-3.5 h-3.5 rounded-full bg-cyan/30 skeleton-pulse"></div>
                                            <div className="h-4 w-16 bg-grey-200 rounded skeleton-pulse"></div>
                                            <div className="h-5 w-3/4 bg-grey-200 rounded skeleton-pulse mt-1"></div>
                                            <div className="space-y-1 mt-1">
                                                <div className="h-3 w-full bg-grey-100 rounded skeleton-pulse"></div>
                                                <div className="h-3 w-5/6 bg-grey-100 rounded skeleton-pulse"></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Values Skeleton */}
                            <div>
                                <div className="text-center mb-12">
                                    <div className="h-6 w-24 bg-grey-200 rounded-full skeleton-pulse mx-auto"></div>
                                    <div className="h-8 w-56 bg-grey-200 rounded-lg skeleton-pulse mx-auto mt-4"></div>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                                    {[1, 2, 3, 4].map((i) => (
                                        <div key={i} className="bg-white border border-grey-100 rounded-xl p-7 text-center">
                                            <div className="w-12 h-12 bg-grey-200 rounded-full skeleton-pulse mx-auto mb-3.5"></div>
                                            <div className="h-5 w-24 bg-grey-200 rounded skeleton-pulse mx-auto mb-2"></div>
                                            <div className="space-y-1">
                                                <div className="h-3 w-full bg-grey-100 rounded skeleton-pulse mx-auto"></div>
                                                <div className="h-3 w-3/4 bg-grey-100 rounded skeleton-pulse mx-auto"></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Offices Skeleton */}
                            <div>
                                <div className="text-center mb-12">
                                    <div className="h-6 w-24 bg-grey-200 rounded-full skeleton-pulse mx-auto"></div>
                                    <div className="h-8 w-48 bg-grey-200 rounded-lg skeleton-pulse mx-auto mt-4"></div>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                                    {[1, 2, 3, 4].map((i) => (
                                        <div key={i} className="bg-off-white rounded-xl p-6">
                                            <div className="w-12 h-12 bg-grey-200 rounded-full skeleton-pulse mb-3"></div>
                                            <div className="h-5 w-24 bg-grey-200 rounded skeleton-pulse mb-2"></div>
                                            <div className="h-3 w-full bg-grey-100 rounded skeleton-pulse"></div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Bottom CTA Skeleton */}
                <section className="py-16 md:py-20 bg-navy-mid">
                    <div className="container max-w-[1200px] mx-auto px-6 md:px-8">
                        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                            <div className="space-y-3 text-center lg:text-left">
                                <div className="h-8 w-64 bg-white/10 rounded-lg skeleton-pulse"></div>
                                <div className="h-8 w-48 bg-white/10 rounded-lg skeleton-pulse"></div>
                                <div className="h-4 w-80 bg-white/10 rounded skeleton-pulse"></div>
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
    if (error || !data) {
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
                            <span className="text-white/80">About Us</span>
                        </div>
                        <span className="inline-block px-3.5 py-1.5 rounded-full text-[0.78rem] font-semibold tracking-wide uppercase bg-cyan/15 text-cyan">
                            About NGEN IT
                        </span>
                        <h1 className="text-white text-[clamp(2rem,4vw,2.9rem)] font-extrabold font-plus-jakarta leading-[1.15] mt-4">
                            About Us
                        </h1>
                    </div>
                </section>
                <section className="py-24 bg-white">
                    <div className="container max-w-[1200px] mx-auto px-6 md:px-8">
                        <div className="bg-red-50 border border-red-200 rounded-xl p-12 text-center">
                            <p className="text-red-600 text-lg font-semibold">⚠️ {error || "Page not found"}</p>
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

    if (!data.isActive) {
        return (
            <div className="min-h-screen bg-navy flex items-center justify-center">
                <p className="text-white/60">This page is currently inactive.</p>
            </div>
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
                        <span className="text-white/80">About Us</span>
                    </div>

                    <span className="inline-block px-3.5 py-1.5 rounded-full text-[0.78rem] font-semibold tracking-wide uppercase bg-cyan/15 text-cyan">
                        About NGEN IT
                    </span>
                    <h1
                        className="text-white text-[clamp(2rem,4vw,2.9rem)] font-extrabold font-plus-jakarta leading-[1.15] mt-4"
                        dangerouslySetInnerHTML={{ __html: data.heroTitle }}
                    />
                    <p className="text-white/60 text-[1.05rem] max-w-[640px] leading-relaxed mt-4">
                        {data.heroDescription}
                    </p>
                </div>
            </section>

            {/* About Content */}
            <section className="py-16 md:py-24 bg-white" ref={sectionRef}>
                <div className="container max-w-[1200px] mx-auto px-6 md:px-8">
                    {/* Our Story */}
                    <div className="about-section grid grid-cols-1 lg:grid-cols-2 gap-16 items-start opacity-0 translate-y-[30px] transition-all duration-700">
                        <div>
                            <span className="inline-block px-3.5 py-1.5 rounded-full text-[0.78rem] font-semibold tracking-wide uppercase bg-navy/5 text-navy-mid">
                                Our Story
                            </span>
                            <h2
                                className="font-plus-jakarta font-bold text-[clamp(1.8rem,3.5vw,2.5rem)] leading-[1.15] text-navy mt-4 mb-5"
                                dangerouslySetInnerHTML={{ __html: data.storyTitle }}
                            />
                            <div
                                className="text-grey-600 text-[1.02rem] leading-relaxed space-y-4"
                                dangerouslySetInnerHTML={{ __html: data.storyDescription.replace(/\n/g, '<br />') }}
                            />
                        </div>

                        {/* Timeline */}
                        <div className="relative pl-8 border-l-2 border-grey-200">
                            {data.milestones && data.milestones.map((milestone: Milestone, index: number) => (
                                <div key={index} className="relative pb-8 last:pb-0">
                                    <div className="absolute -left-[40px] top-1.5 w-3.5 h-3.5 rounded-full bg-cyan border-3 border-white shadow-[0_0_0_2px_#00C2CB]"></div>
                                    <div className="text-blue font-extrabold text-sm font-plus-jakarta">
                                        {milestone.year}
                                    </div>
                                    <h4 className="text-navy text-sm font-semibold mt-1">
                                        {milestone.title}
                                    </h4>
                                    <p className="text-grey-600 text-sm leading-relaxed">
                                        {milestone.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Our Values */}
                    {data.values && data.values.length > 0 && (
                        <div className="about-section mt-20 opacity-0 translate-y-[30px] transition-all duration-700">
                            <div className="text-center mb-12">
                                <span className="inline-block px-3.5 py-1.5 rounded-full text-[0.78rem] font-semibold tracking-wide uppercase bg-cyan/15 text-cyan">
                                    Our Values
                                </span>
                                <h2 className="font-plus-jakarta font-bold text-[clamp(1.8rem,3.5vw,2.5rem)] leading-[1.15] text-navy mt-4">
                                    What Guides Our Work
                                </h2>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                                {data.values.map((value: Value, index: number) => (
                                    <div
                                        key={index}
                                        className="bg-white border border-grey-100 rounded-xl p-7 text-center shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
                                    >
                                        <div className="text-3xl mb-3.5">{value.icon}</div>
                                        <h3 className="text-navy text-sm font-semibold mb-2 font-plus-jakarta">
                                            {value.title}
                                        </h3>
                                        <p className="text-grey-400 text-sm leading-relaxed">
                                            {value.description}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Our Offices */}
                    {data.offices && data.offices.length > 0 && (
                        <div className="about-section mt-20 opacity-0 translate-y-[30px] transition-all duration-700">
                            <div className="text-center mb-12">
                                <span className="inline-block px-3.5 py-1.5 rounded-full text-[0.78rem] font-semibold tracking-wide uppercase bg-cyan/15 text-cyan">
                                    Our Offices
                                </span>
                                <h2 className="font-plus-jakarta font-bold text-[clamp(1.8rem,3.5vw,2.5rem)] leading-[1.15] text-navy mt-4">
                                    Where We Operate
                                </h2>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                                {data.offices.map((office: Office, index: number) => (
                                    <div
                                        key={index}
                                        className="bg-off-white rounded-xl p-6 hover:shadow-md transition-all duration-300 hover:-translate-y-1"
                                    >
                                        <div className="text-3xl text-black mb-3">{office.flag}</div>
                                        <h4 className="text-navy text-sm font-semibold font-plus-jakarta">
                                            {office.city}, {office.country}
                                        </h4>
                                        <p className="text-grey-400 text-sm leading-relaxed mt-1">
                                            {office.description}
                                        </p>
                                    </div>
                                ))}
                            </div>
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
                                {data.ctaTitle || "Want to Work with Us?"}
                            </h2>
                            <p className="text-white/60 text-[1rem] mt-3 max-w-[460px] leading-relaxed">
                                {data.ctaDescription || "Tell us about your organization and AI goals — we would love to talk."}
                            </p>
                        </div>
                        <div className="flex flex-col gap-3 min-w-[200px] w-full lg:w-auto">
                            <Link
                                href={data.ctaLink || "/contact"}
                                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-[8px] font-semibold text-[0.95rem] border-2 border-transparent transition-all duration-200 whitespace-nowrap bg-cyan text-navy shadow-[0_4px_20px_rgba(0,194,203,0.3)] hover:bg-cyan-light hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(0,194,203,0.4)]"
                            >
                                {data.ctaButton || "Get in Touch"}
                            </Link>
                            <Link
                                href="/services"
                                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-[8px] font-semibold text-[0.95rem] border-2 border-transparent transition-all duration-200 whitespace-nowrap bg-transparent text-white border-white/40 hover:bg-white/10 hover:border-white"
                            >
                                Explore Our Services →
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <style jsx>{`
                .about-section.visible {
                    opacity: 1 !important;
                    transform: translateY(0) !important;
                }
                .about-section {
                    transition: opacity 0.7s ease, transform 0.7s ease;
                }
                .border-3 {
                    border-width: 3px;
                }
            `}</style>
        </>
    );
}