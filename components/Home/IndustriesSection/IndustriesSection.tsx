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

    useEffect(() => {
        fetchIndustries();
    }, []);

    const fetchIndustries = async () => {
        try {
            setLoading(true);
            const data = await getIndustries();
            // Filter only active industries for frontend
            setIndustries(data.filter(ind => ind.isActive !== false));
        } catch (error) {
            console.error("Error fetching industries:", error);
        } finally {
            setLoading(false);
        }
    };

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
    }, [loading]);

    if (loading) {
        return (
            <section className="py-24 md:py-32 bg-off-white" id="industries" ref={sectionRef}>
                <div className="container max-w-[1200px] mx-auto px-6 md:px-8">
                    <div className="text-center">
                        <div className="w-12 h-12 border-4 border-cyan border-t-transparent rounded-full animate-spin mx-auto"></div>
                        <p className="text-grey-400 mt-4">Loading industries...</p>
                    </div>
                </div>
            </section>
        );
    }

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
                                short={industry.short}
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