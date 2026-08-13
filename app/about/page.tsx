"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { MILESTONES } from "@/lib/data";

export default function AboutPage() {
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        // Animate header
                        const header = entry.target.querySelector('.about-header');
                        if (header) {
                            setTimeout(() => {
                                header.classList.add('visible');
                            }, 100);
                        }

                        // Animate content sections with stagger
                        const sections = entry.target.querySelectorAll('.about-section');
                        sections.forEach((section, index) => {
                            setTimeout(() => {
                                section.classList.add('visible');
                            }, 200 + index * 150);
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

    const values = [
        {
            icon: "🎯",
            title: "Practical, Not Hype",
            description: "We focus on measurable business outcomes over trend-chasing."
        },
        {
            icon: "🤝",
            title: "Client Partnership",
            description: "Long-term relationships built on delivery, not just proposals."
        },
        {
            icon: "🔒",
            title: "Responsible AI",
            description: "Governance, privacy and security built into every engagement."
        },
        {
            icon: "🌍",
            title: "Local + Global",
            description: "International technology standards with local deployment capability."
        }
    ];

    const offices = [
        { flag: "🇧🇩", city: "Dhaka", country: "Bangladesh", desc: "Head office — sales, engineering and delivery teams" },
        { flag: "🇬🇧", city: "London", country: "UK", desc: "Market development and enterprise partnerships" },
        { flag: "🇸🇬", city: "Singapore", country: "Singapore", desc: "Regional entity for Southeast Asia operations" },
        { flag: "🇵🇹", city: "Lisbon", country: "Portugal", desc: "EU market development and digital services" }
    ];

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
                        <span className="text-white/80">About Us</span>
                    </div>

                    <span className="inline-block px-3.5 py-1.5 rounded-full text-[0.78rem] font-semibold tracking-wide uppercase bg-cyan/15 text-cyan">
                        About NGEN IT
                    </span>
                    <h1 className="text-white text-[clamp(2rem,4vw,2.9rem)] font-extrabold font-plus-jakarta leading-[1.15] mt-4">
                        Practical AI, Delivered by a<br />Trusted Systems Integrator
                    </h1>
                    <p className="text-white/60 text-[1.05rem] max-w-[640px] leading-relaxed mt-4">
                        NGEN IT is a systems integration, licensed software and IoT solutions company
                        headquartered in Dhaka, Bangladesh, with entities and partners across Singapore,
                        the UK, Portugal, the UAE and Southeast Asia.
                    </p>
                </div>
            </section>

            {/* About Content */}
            <section className="py-16 md:py-24 bg-white" ref={sectionRef}>
                <div className="container max-w-[1200px] mx-auto px-6 md:px-8">
                    {/* Our Story */}
                    <div className="about-section grid grid-cols-1 lg:grid-cols-2 gap-16 items-start opacity-0 translate-y-[30px] transition-all duration-700">
                        <div>
                            <span className="inline-block px-3.5 py-1.5 rounded-full text-[0.78rem] font-semibold tracking-wide uppercase bg-navy/5 text-navy-mid">
                                Our Story
                            </span>
                            <h2 className="font-plus-jakarta font-bold text-[clamp(1.8rem,3.5vw,2.5rem)] leading-[1.15] text-navy mt-4 mb-5">
                                From Systems Integration<br />to AI Solutions
                            </h2>
                            <p className="text-grey-600 text-[1.02rem] leading-relaxed mb-4">
                                Since 2009, NGEN IT has helped enterprise, government and industrial organizations
                                select, implement and support technology — from licensed software and industrial
                                hardware to IoT and smart automation.
                            </p>
                            <p className="text-grey-600 text-[1.02rem] leading-relaxed">
                                Our AI Services division builds on that foundation, combining hands-on delivery
                                experience with modern AI capability to help clients move from AI ideas to
                                measurable operational results.
                            </p>
                        </div>

                        {/* Timeline */}
                        <div className="relative pl-8 border-l-2 border-grey-200">
                            {MILESTONES.map((milestone, index) => (
                                <div key={index} className="relative pb-8 last:pb-0">
                                    <div className="absolute -left-[38px] top-1.5 w-3.5 h-3.5 rounded-full bg-cyan border-3 border-white shadow-[0_0_0_2px_#00C2CB]"></div>
                                    <div className="text-blue font-extrabold text-sm font-plus-jakarta">
                                        {milestone.year}
                                    </div>
                                    <h4 className="text-navy text-sm font-semibold mt-1">
                                        {milestone.title}
                                    </h4>
                                    <p className="text-grey-500 text-sm leading-relaxed">
                                        {milestone.desc}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Our Values */}
                    <div className="about-section mt-20 opacity-0 translate-y-[30px] transition-all duration-700">
                        <div className="text-center mb-12">
                            <span className="inline-block px-3.5 py-1.5 rounded-full text-[0.78rem] font-semibold tracking-wide uppercase bg-cyan/15 text-cyan">
                                Our Values
                            </span>
                            <h2 className="font-plus-jakarta font-bold text-[clamp(1.8rem,3.5vw,2.5rem)] leading-[1.15] text-navy mt-4">
                                What Guides Our Work
                            </h2>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                            {values.map((value, index) => (
                                <div
                                    key={index}
                                    className="bg-white border border-grey-100 rounded-xl p-7 text-center shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
                                >
                                    <div className="text-3xl mb-3.5">{value.icon}</div>
                                    <h3 className="text-navy text-sm font-semibold mb-2 font-plus-jakarta">
                                        {value.title}
                                    </h3>
                                    <p className="text-grey-400 text-sm leading-relaxed">
                                        {value.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Our Offices */}
                    <div className="about-section mt-20 opacity-0 translate-y-[30px] transition-all duration-700">
                        <div className="text-center mb-12">
                            <span className="inline-block px-3.5 py-1.5 rounded-full text-[0.78rem] font-semibold tracking-wide uppercase bg-cyan/15 text-cyan">
                                Our Offices
                            </span>
                            <h2 className="font-plus-jakarta font-bold text-[clamp(1.8rem,3.5vw,2.5rem)] leading-[1.15] text-navy mt-4">
                                Where We Operate
                            </h2>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                            {offices.map((office, index) => (
                                <div
                                    key={index}
                                    className="bg-off-white rounded-xl p-6 hover:shadow-md transition-all duration-300 hover:-translate-y-1"
                                >
                                    <div className="text-3xl mb-3">{office.flag}</div>
                                    <h4 className="text-navy text-sm font-semibold font-plus-jakarta">
                                        {office.city}, {office.country}
                                    </h4>
                                    <p className="text-grey-400 text-sm leading-relaxed mt-1">
                                        {office.desc}
                                    </p>
                                </div>
                            ))}
                        </div>
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
                                Want to Work with Us?
                            </h2>
                            <p className="text-white/60 text-[1rem] mt-3 max-w-[460px] leading-relaxed">
                                Tell us about your organization and AI goals — we would love to talk.
                            </p>
                        </div>
                        <div className="flex flex-col gap-3 min-w-[200px] w-full lg:w-auto">
                            <Link
                                href="/contact"
                                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-[8px] font-semibold text-[0.95rem] border-2 border-transparent transition-all duration-200 whitespace-nowrap bg-cyan text-navy shadow-[0_4px_20px_rgba(0,194,203,0.3)] hover:bg-cyan-light hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(0,194,203,0.4)]"
                            >
                                Get in Touch
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
                .about-section.visible {
                    opacity: 1 !important;
                    transform: translateY(0) !important;
                }
                .about-section {
                    transition: opacity 0.7s ease, transform 0.7s ease;
                }
                .border-3 {
                    border-width: 3px;
                }
            `}</style>
        </>
    );
}