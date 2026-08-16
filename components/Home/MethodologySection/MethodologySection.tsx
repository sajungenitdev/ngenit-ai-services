"use client";

import { useEffect, useRef, useState } from "react";
import { getMethodology } from "@/services/methodologyApi";
import { MethodologyStep } from "@/types/admin/methodology";

export default function MethodologySection() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [steps, setSteps] = useState<MethodologyStep[]>([]);
    const [loading, setLoading] = useState(true);

    // ============================================================
    // FETCH METHODOLOGY STEPS
    // ============================================================
    useEffect(() => {
        const fetchSteps = async () => {
            try {
                setLoading(true);
                const data = await getMethodology();
                setSteps(data);
            } catch (error) {
                console.error("Error fetching methodology:", error);
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
        if (loading) return;

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
    }, [loading]);

    // ============================================================
    // LOADING STATE
    // ============================================================
    if (loading) {
        return (
            <section className="py-24 md:py-32 bg-white" id="methodology" ref={sectionRef}>
                <div className="container max-w-[1200px] mx-auto px-6 md:px-8">
                    <div className="text-center">
                        <div className="w-12 h-12 border-4 border-cyan border-t-transparent rounded-full animate-spin mx-auto"></div>
                        <p className="text-grey-400 mt-4">Loading methodology...</p>
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