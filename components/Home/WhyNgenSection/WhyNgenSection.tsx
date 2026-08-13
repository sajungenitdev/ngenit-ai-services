"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { WHY_FEATURES } from "@/lib/data";

export default function WhyNgenSection() {
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
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
    }, []);

    return (
        <section className="py-24 md:py-32 bg-navy-mid" ref={sectionRef}>
            <div className="container max-w-[1200px] mx-auto px-6 md:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Left Side - Text Content */}
                    <div className="why-left opacity-0 translate-y-[30px] transition-all duration-700">
                        <span className="inline-block px-3.5 py-1.5 rounded-full text-[0.78rem] font-semibold tracking-wide uppercase bg-white/10 text-white/80">
                            Why NGEN IT
                        </span>
                        <h2 className="font-plus-jakarta font-bold text-[clamp(1.8rem,3.5vw,2.8rem)] leading-[1.15] text-white mt-4 mb-5">
                            Your Trusted AI Partner<br />from Strategy to Deployment
                        </h2>
                        <p className="text-[1.05rem] text-white/60 leading-relaxed mb-8">
                            We combine deep business consulting experience with technical AI expertise
                            and local deployment capability — serving enterprise, government and
                            industrial organizations across multiple markets.
                        </p>
                        <Link
                            href="/contact"
                            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-[8px] font-semibold text-[0.95rem] border-2 border-transparent transition-all duration-200 whitespace-nowrap bg-cyan text-navy shadow-[0_4px_20px_rgba(0,194,203,0.3)] hover:bg-cyan-light hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(0,194,203,0.4)]"
                        >
                            Discuss Your Requirement
                        </Link>
                    </div>

                    {/* Right Side - Feature Cards Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {WHY_FEATURES.map((feature, index) => (
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