"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { getWhyNgen } from "@/services/whyNgenApi";
import { WhyNgenData } from "@/types/admin/whyNgen";

export default function WhyNgenSection() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [data, setData] = useState<WhyNgenData | null>(null);
    const [loading, setLoading] = useState(true);

    // ============================================================
    // FETCH WHY NGEN
    // ============================================================
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const result = await getWhyNgen();
                setData(result);
            } catch (error) {
                console.error("Error fetching why ngen:", error);
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
        if (loading) return;

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
    }, [loading]);

    // ============================================================
    // LOADING STATE
    // ============================================================
    if (loading) {
        return (
            <section className="py-24 md:py-32 bg-navy-mid" ref={sectionRef}>
                <div className="container max-w-[1200px] mx-auto px-6 md:px-8">
                    <div className="text-center">
                        <div className="w-12 h-12 border-4 border-cyan border-t-transparent rounded-full animate-spin mx-auto"></div>
                        <p className="text-white/60 mt-4">Loading...</p>
                    </div>
                </div>
            </section>
        );
    }

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