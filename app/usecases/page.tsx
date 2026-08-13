"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { USE_CASES } from "@/lib/data";

export default function UseCasesPage() {
    const [activeFilter, setActiveFilter] = useState("All");
    const sectionRef = useRef<HTMLDivElement>(null);

    // Get unique industries for filter
    const industries = ["All", ...Array.from(new Set(USE_CASES.map((u) => u.industry)))];

    // Filter use cases based on active filter
    const filteredCases = activeFilter === "All"
        ? USE_CASES
        : USE_CASES.filter((u) => u.industry === activeFilter);

    // Intersection Observer for scroll animation
    useEffect(() => {
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
                        const cards = entry.target.querySelectorAll('.usecase-card');
                        cards.forEach((card, index) => {
                            setTimeout(() => {
                                card.classList.add('visible');
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
    }, [filteredCases]); // Re-run when filtered cases change

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
                        <span className="text-white/80">Use Cases</span>
                    </div>

                    <span className="inline-block px-3.5 py-1.5 rounded-full text-[0.78rem] font-semibold tracking-wide uppercase bg-cyan/15 text-cyan">
                        Use Cases
                    </span>
                    <h1 className="text-white text-[clamp(2rem,4vw,2.9rem)] font-extrabold font-plus-jakarta leading-[1.15] mt-4">
                        AI Use Cases Across Industries
                    </h1>
                    <p className="text-white/60 text-[1.05rem] max-w-[640px] leading-relaxed mt-4">
                        Real-world examples of how organizations apply AI to reduce cost, save time and improve decision-making.
                    </p>
                </div>
            </section>

            {/* Use Cases Content */}
            <section className="py-16 md:py-24 bg-white" ref={sectionRef}>
                <div className="container max-w-[1200px] mx-auto px-6 md:px-8">
                    {/* Section Header - For scroll animation */}
                    <div className="section-header opacity-0 translate-y-[30px] transition-all duration-700">
                        {/* Filter Buttons */}
                        <div className="flex flex-wrap gap-2.5 justify-center mb-10">
                            {industries.map((industry) => (
                                <button
                                    key={industry}
                                    onClick={() => setActiveFilter(industry)}
                                    className={`px-4 py-2 rounded-full text-sm font-semibold border-2 transition-all duration-300 ${activeFilter === industry
                                            ? "bg-navy border-navy text-white"
                                            : "bg-white border-grey-200 text-grey-600 hover:border-cyan hover:text-navy"
                                        }`}
                                >
                                    {industry}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Use Cases Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {filteredCases.map((useCase, index) => (
                            <div
                                key={index}
                                className="usecase-card bg-white border border-grey-100 rounded-xl p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md opacity-0 translate-y-[30px]"
                            >
                                {/* Tags */}
                                <div className="flex flex-wrap gap-1.5 mb-3.5">
                                    <span className="px-2.5 py-1 rounded-md bg-off-white text-grey-600 text-[0.72rem] font-medium">
                                        {useCase.industry}
                                    </span>
                                    <span className="px-2.5 py-1 rounded-md bg-blue/10 text-blue text-[0.72rem] font-medium">
                                        {useCase.service}
                                    </span>
                                </div>

                                {/* Title */}
                                <h3 className="text-[0.98rem] font-semibold text-navy mb-2.5 font-plus-jakarta">
                                    {useCase.name}
                                </h3>

                                {/* Description */}
                                <p className="text-[0.85rem] text-grey-400 leading-relaxed">
                                    {useCase.desc}
                                </p>

                                {/* Result */}
                                <div className="mt-4 pt-4 border-t border-grey-100">
                                    <span className="text-[0.8rem] font-bold text-blue">
                                        {useCase.result}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Empty State */}
                    {filteredCases.length === 0 && (
                        <div className="text-center py-12">
                            <p className="text-grey-400 text-lg">
                                No use cases found for <span className="font-semibold text-navy">{activeFilter}</span>
                            </p>
                            <button
                                onClick={() => setActiveFilter("All")}
                                className="mt-4 text-cyan font-semibold hover:underline"
                            >
                                View all use cases
                            </button>
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
                                Have a Similar Challenge<br />in Your Business?
                            </h2>
                            <p className="text-white/60 text-[1rem] mt-3 max-w-[460px] leading-relaxed">
                                Tell us about it — we will show you how AI could help, with no obligation.
                            </p>
                        </div>
                        <div className="flex flex-col gap-3 min-w-[200px] w-full lg:w-auto">
                            <Link
                                href="/contact"
                                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-[8px] font-semibold text-[0.95rem] border-2 border-transparent transition-all duration-200 whitespace-nowrap bg-cyan text-navy shadow-[0_4px_20px_rgba(0,194,203,0.3)] hover:bg-cyan-light hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(0,194,203,0.4)]"
                            >
                                Discuss Your Challenge
                            </Link>
                            <Link
                                href="/services"
                                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-[8px] font-semibold text-[0.95rem] border-2 border-transparent transition-all duration-200 whitespace-nowrap bg-transparent text-white border-white/40 hover:bg-white/10 hover:border-white"
                            >
                                Explore AI Services →
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
                .usecase-card.visible {
                    opacity: 1 !important;
                    transform: translateY(0) !important;
                }
                .usecase-card {
                    transition: opacity 0.7s ease, transform 0.7s ease, box-shadow 0.3s ease, transform 0.3s ease;
                }
            `}</style>
        </>
    );
}