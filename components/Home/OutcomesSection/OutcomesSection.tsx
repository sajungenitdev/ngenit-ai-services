"use client";

import { useEffect, useRef } from "react";
import { OUTCOMES } from "@/lib/data";

export default function OutcomesSection() {
    const sectionRef = useRef<HTMLDivElement>(null);

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

                        // Animate outcome items with stagger
                        const items = entry.target.querySelectorAll('.outcome-item');
                        items.forEach((item, index) => {
                            setTimeout(() => {
                                item.classList.add('visible');
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
    }, []);

    return (
        <section className="py-24 md:py-32 bg-navy" ref={sectionRef}>
            <div className="container max-w-[1200px] mx-auto px-6 md:px-8">
                {/* Section Header */}
                <div className="text-center mb-16 section-header opacity-0 translate-y-[30px] transition-all duration-700">
                    <span className="inline-block px-3.5 py-1.5 rounded-full text-[0.78rem] font-semibold tracking-wide uppercase bg-white/10 text-white/80">
                        Business Outcomes
                    </span>
                    <h2 className="font-plus-jakarta font-bold text-[clamp(1.8rem,3.5vw,2.8rem)] leading-[1.15] text-white my-3 mb-5">
                        What AI Can Do<br />For Your Organization
                    </h2>
                    <p className="max-w-[600px] mx-auto text-[1.05rem] text-white/60 leading-relaxed">
                        We focus on practical, measurable business outcomes — not just technology.
                    </p>
                </div>

                {/* Outcomes Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 rounded-2xl overflow-hidden border border-white/5">
                    {OUTCOMES.map((outcome, index) => (
                        <div
                            key={index}
                            className="outcome-item bg-white/5 p-9 transition-all duration-300 hover:bg-cyan/10 opacity-0 translate-y-[30px]"
                        >
                            <div className="text-4xl mb-4">{outcome.icon}</div>
                            <h3 className="text-[1rem] font-semibold text-white mb-2.5 font-plus-jakarta">
                                {outcome.title}
                            </h3>
                            <p className="text-[0.85rem] leading-relaxed text-white/50">
                                {outcome.description}
                            </p>
                            <div className="mt-4 text-[1.4rem] font-extrabold font-plus-jakarta text-cyan">
                                {outcome.stat}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <style jsx>{`
                .section-header.visible {
                    opacity: 1 !important;
                    transform: translateY(0) !important;
                }
                .outcome-item.visible {
                    opacity: 1 !important;
                    transform: translateY(0) !important;
                }
                .outcome-item {
                    transition: opacity 0.7s ease, transform 0.7s ease, background-color 0.3s ease;
                }
            `}</style>
        </section>
    );
}