"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

const WA_LINK = "https://wa.me/8801XXXXXXXXX?text=Hello%20NGEN%20IT%2C%20I%20am%20interested%20in%20your%20AI%20services.";

export default function CtaBanner() {
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
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
    }, []);

    return (
        <section className="py-16 md:py-20 relative overflow-hidden bg-gradient-to-br from-navy-mid via-navy-light to-[#1a3a8f]" ref={sectionRef}>
            {/* Background Glow */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_80%_50%,rgba(0,194,203,0.18)_0%,transparent_60%)]"></div>

            <div className="container max-w-[1200px] mx-auto px-6 md:px-8 relative z-10">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
                    {/* Left Side - Text */}
                    <div className="cta-left opacity-0 translate-y-[30px] transition-all duration-700 text-center lg:text-left">
                        <h2 className="font-plus-jakarta font-bold text-[clamp(1.8rem,3.5vw,2.8rem)] leading-[1.15] text-white max-w-[560px]">
                            Have an AI Idea or<br />Business Challenge?
                        </h2>
                        <p className="text-white/65 text-[1rem] mt-3 max-w-[460px] leading-relaxed">
                            Share your requirement with our team. We will review your business
                            challenge and contact you to discuss a practical AI solution.
                        </p>
                    </div>

                    {/* Right Side - Buttons */}
                    <div className="cta-right opacity-0 translate-y-[30px] transition-all duration-700 flex flex-col gap-3 min-w-[220px] w-full lg:w-auto">
                        <a
                            href={WA_LINK}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-[8px] font-semibold text-[0.95rem] border-2 border-transparent transition-all duration-200 whitespace-nowrap bg-green-wa text-white shadow-[0_4px_20px_rgba(37,211,102,0.3)] hover:bg-[#1ebe5d] hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(37,211,102,0.4)]"
                        >
                            <span>💬</span> Chat on WhatsApp
                        </a>
                        <Link
                            href="/contact"
                            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-[8px] font-semibold text-[0.95rem] border-2 border-transparent transition-all duration-200 whitespace-nowrap bg-cyan text-navy shadow-[0_4px_20px_rgba(0,194,203,0.3)] hover:bg-cyan-light hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(0,194,203,0.4)]"
                        >
                            Send Your Requirement
                        </Link>
                        <a
                            href="mailto:ai@ngenitltd.com"
                            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-[8px] font-semibold text-[0.95rem] border-2 border-transparent transition-all duration-200 whitespace-nowrap bg-transparent text-white border-white/40 hover:bg-white/10 hover:border-white"
                        >
                            Email Our AI Team
                        </a>
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