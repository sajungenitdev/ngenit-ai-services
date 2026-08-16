"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { getCtaBanner } from "@/services/ctaBannerApi";
import { CtaBannerData } from "@/types/admin/ctaBanner";

export default function CtaBanner() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [data, setData] = useState<CtaBannerData | null>(null);
    const [loading, setLoading] = useState(true);

    // ============================================================
    // FETCH CTA BANNER
    // ============================================================
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const result = await getCtaBanner();
                setData(result);
            } catch (error) {
                console.error("Error fetching CTA banner:", error);
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
    }, [loading]);

    // ============================================================
    // LOADING STATE
    // ============================================================
    if (loading) {
        return (
            <section className="py-16 md:py-20 bg-gradient-to-br from-navy-mid via-navy-light to-[#1a3a8f]" ref={sectionRef}>
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

    // Build WhatsApp link
    const waLink = `https://wa.me/${data.phone.number}?text=Hello%20NGEN%20IT%2C%20I%20am%20interested%20in%20your%20AI%20services.`;

    // ============================================================
    // RENDER
    // ============================================================
    return (
        <section
            className="py-16 md:py-20 relative overflow-hidden bg-gradient-to-br from-navy-mid via-navy-light to-[#1a3a8f]"
            ref={sectionRef}
        >
            {/* Background Glow */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_80%_50%,rgba(0,194,203,0.18)_0%,transparent_60%)]"></div>

            <div className="container max-w-[1200px] mx-auto px-6 md:px-8 relative z-10">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
                    {/* Left Side - Text */}
                    <div className="cta-left opacity-0 translate-y-[30px] transition-all duration-700 text-center lg:text-left">
                        <div className="text-cyan-light text-sm font-semibold tracking-wide uppercase mb-3">
                            {data.tag}
                        </div>
                        <h2
                            className="font-plus-jakarta font-bold text-[clamp(1.8rem,3.5vw,2.8rem)] leading-[1.15] text-white max-w-[560px]"
                            dangerouslySetInnerHTML={{ __html: data.title }}
                        />
                        <div
                            className="text-white/65 text-[1rem] mt-3 max-w-[460px] leading-relaxed"
                            dangerouslySetInnerHTML={{ __html: data.description }}
                        />
                    </div>

                    {/* Right Side - Buttons */}
                    <div className="cta-right opacity-0 translate-y-[30px] transition-all duration-700 flex flex-col gap-3 min-w-[220px] w-full lg:w-auto">
                        <a
                            href={waLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-[8px] font-semibold text-[0.95rem] border-2 border-transparent transition-all duration-200 whitespace-nowrap bg-green-wa text-white shadow-[0_4px_20px_rgba(37,211,102,0.3)] hover:bg-[#1ebe5d] hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(37,211,102,0.4)]"
                        >
                            <span>💬</span> {data.phone.label}
                        </a>
                        <Link
                            href={data.button.link}
                            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-[8px] font-semibold text-[0.95rem] border-2 border-transparent transition-all duration-200 whitespace-nowrap bg-cyan text-navy shadow-[0_4px_20px_rgba(0,194,203,0.3)] hover:bg-cyan-light hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(0,194,203,0.4)]"
                        >
                            {data.button.label}
                        </Link>
                        <a
                            href={`mailto:${data.email.address}`}
                            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-[8px] font-semibold text-[0.95rem] border-2 border-transparent transition-all duration-200 whitespace-nowrap bg-transparent text-white border-white/40 hover:bg-white/10 hover:border-white"
                        >
                            {data.email.label}
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