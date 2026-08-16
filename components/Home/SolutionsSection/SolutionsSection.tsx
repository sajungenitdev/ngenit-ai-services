"use client";

import { useEffect, useRef, useState } from "react";
import { getSolutions } from "@/services/solutionApi";
import { SolutionData } from "@/types/admin/solution";
import SolutionCard from "./SolutionCard";

export default function SolutionsSection() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [solutions, setSolutions] = useState<SolutionData[]>([]);
    const [loading, setLoading] = useState(true);

    // ============================================================
    // FETCH SOLUTIONS
    // ============================================================
    useEffect(() => {
        const fetchSolutions = async () => {
            try {
                setLoading(true);
                const data = await getSolutions();
                // Only show active solutions on frontend
                setSolutions(data.filter(s => s.isActive !== false));
            } catch (error) {
                console.error("Error fetching solutions:", error);
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
        if (loading) return;

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

                        // Animate solution cards with stagger
                        const cards = entry.target.querySelectorAll('.solution-card-wrapper');
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
    }, [loading]);

    // ============================================================
    // LOADING STATE
    // ============================================================
    if (loading) {
        return (
            <section className="py-24 md:py-32 bg-off-white" id="solutions" ref={sectionRef}>
                <div className="container max-w-[1200px] mx-auto px-6 md:px-8">
                    <div className="text-center">
                        <div className="w-12 h-12 border-4 border-cyan border-t-transparent rounded-full animate-spin mx-auto"></div>
                        <p className="text-grey-400 mt-4">Loading solutions...</p>
                    </div>
                </div>
            </section>
        );
    }

    // ============================================================
    // RENDER
    // ============================================================
    return (
        <section className="py-24 md:py-32 bg-off-white" id="solutions" ref={sectionRef}>
            <div className="container max-w-[1200px] mx-auto px-6 md:px-8">
                {/* Section Header */}
                <div className="text-center mb-16 section-header opacity-0 translate-y-[30px] transition-all duration-700">
                    <span className="inline-block px-3.5 py-1.5 rounded-full text-[0.78rem] font-semibold tracking-wide uppercase bg-cyan/15 text-cyan">
                        AI Solutions
                    </span>
                    <h2 className="font-plus-jakarta font-bold text-[clamp(1.8rem,3.5vw,2.8rem)] leading-[1.15] text-grey-800 my-3 mb-5">
                        Featured AI Solutions<br />Ready to Deploy
                    </h2>
                    <p className="max-w-[600px] mx-auto text-[1.05rem] text-grey-600 leading-relaxed">
                        Packaged, proven AI solutions designed for rapid implementation and measurable results.
                    </p>
                </div>

                {/* Solutions Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {solutions.map((solution) => (
                        <div
                            key={solution._id}
                            className="solution-card-wrapper opacity-0 translate-y-[30px] transition-all duration-700 flex"
                        >
                            <SolutionCard
                                tag={solution.tag}
                                name={solution.name}
                                desc={solution.desc}
                                tags={solution.tags}
                                footer={solution.footer}
                            />
                        </div>
                    ))}
                </div>
            </div>

            <style jsx>{`
                .section-header.visible {
                    opacity: 1 !important;
                    transform: translateY(0) !important;
                }
                .solution-card-wrapper.visible {
                    opacity: 1 !important;
                    transform: translateY(0) !important;
                }
                .solution-card-wrapper {
                    transition: opacity 0.7s ease, transform 0.7s ease;
                }
            `}</style>
        </section>
    );
}