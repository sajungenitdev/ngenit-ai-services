"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { INSIGHTS } from "@/lib/data";

export default function InsightsPage() {
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        // Animate header
                        const header = entry.target.querySelector('.insights-header');
                        if (header) {
                            setTimeout(() => {
                                header.classList.add('visible');
                            }, 100);
                        }

                        // Animate cards with stagger
                        const cards = entry.target.querySelectorAll('.insight-card');
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
    }, []);

    // Get unique categories for filter
    const categories = ["All", ...Array.from(new Set(INSIGHTS.map((i) => i.cat)))];

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
                        <span className="text-white/80">Insights</span>
                    </div>

                    <span className="inline-block px-3.5 py-1.5 rounded-full text-[0.78rem] font-semibold tracking-wide uppercase bg-cyan/15 text-cyan">
                        Insights &amp; Blog
                    </span>
                    <h1 className="text-white text-[clamp(2rem,4vw,2.9rem)] font-extrabold font-plus-jakarta leading-[1.15] mt-4">
                        AI Insights for<br />Business Leaders
                    </h1>
                    <p className="text-white/60 text-[1.05rem] max-w-[640px] leading-relaxed mt-4">
                        Practical thinking on AI strategy, implementation and results — written for decision-makers, not data scientists.
                    </p>
                </div>
            </section>

            {/* Insights Content */}
            <section className="py-16 md:py-24 bg-white" ref={sectionRef}>
                <div className="container max-w-[1200px] mx-auto px-6 md:px-8">
                    {/* Section Header - For scroll animation */}
                    <div className="insights-header opacity-0 translate-y-[30px] transition-all duration-700">
                        {/* Optional filter buttons */}
                        {/* <div className="flex flex-wrap gap-2.5 justify-center mb-10">
                            {categories.map((category) => (
                                <button
                                    key={category}
                                    className="px-4 py-2 rounded-full text-sm font-semibold border-2 border-grey-200 bg-white text-grey-600 hover:border-cyan hover:text-navy transition-all duration-300"
                                >
                                    {category}
                                </button>
                            ))}
                        </div> */}
                    </div>

                    {/* Insights Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {INSIGHTS.map((insight, index) => (
                            <div
                                key={index}
                                className="insight-card bg-white border border-grey-100 rounded-xl overflow-hidden shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg opacity-0 translate-y-[30px]"
                            >
                                {/* Thumbnail / Icon */}
                                <div className="h-36 bg-gradient-to-br from-navy-mid to-blue flex items-center justify-center text-4xl">
                                    {insight.icon}
                                </div>

                                {/* Content */}
                                <div className="p-6">
                                    {/* Meta */}
                                    <div className="flex items-center gap-2.5 mb-3">
                                        <span className="inline-block px-2.5 py-1 rounded-md bg-navy/5 text-navy-mid text-[0.7rem] font-semibold">
                                            {insight.cat}
                                        </span>
                                        <span className="text-grey-400 text-[0.7rem]">
                                            {insight.date} · {insight.read}
                                        </span>
                                    </div>

                                    {/* Title */}
                                    <h3 className="text-[1rem] font-semibold text-navy mb-2.5 leading-snug font-plus-jakarta">
                                        {insight.title}
                                    </h3>

                                    {/* Excerpt */}
                                    <p className="text-[0.85rem] text-grey-400 leading-relaxed">
                                        {insight.excerpt}
                                    </p>
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
                                Have a Question About<br />a Specific AI Topic?
                            </h2>
                            <p className="text-white/60 text-[1rem] mt-3 max-w-[460px] leading-relaxed">
                                Our team is happy to talk through your specific situation — no article required.
                            </p>
                        </div>
                        <div className="flex flex-col gap-3 min-w-[200px] w-full lg:w-auto">
                            <Link
                                href="/contact"
                                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-[8px] font-semibold text-[0.95rem] border-2 border-transparent transition-all duration-200 whitespace-nowrap bg-cyan text-navy shadow-[0_4px_20px_rgba(0,194,203,0.3)] hover:bg-cyan-light hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(0,194,203,0.4)]"
                            >
                                Ask Our Team
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
                .insights-header.visible {
                    opacity: 1 !important;
                    transform: translateY(0) !important;
                }
                .insight-card.visible {
                    opacity: 1 !important;
                    transform: translateY(0) !important;
                }
                .insight-card {
                    transition: opacity 0.7s ease, transform 0.7s ease, box-shadow 0.3s ease, transform 0.3s ease;
                }
            `}</style>
        </>
    );
}