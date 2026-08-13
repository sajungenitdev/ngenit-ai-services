"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { SERVICES } from "@/lib/data";

const WA_LINK = "https://wa.me/8801XXXXXXXXX?text=Hello%20NGEN%20IT%2C%20I%20am%20interested%20in%20your%20AI%20services.";
const EMAIL = "ai@ngenitltd.com";

export default function ContactPage() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [formSubmitted, setFormSubmitted] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const left = entry.target.querySelector('.contact-left');
                        if (left) {
                            setTimeout(() => {
                                left.classList.add('visible');
                            }, 100);
                        }

                        const right = entry.target.querySelector('.contact-right');
                        if (right) {
                            setTimeout(() => {
                                right.classList.add('visible');
                            }, 200);
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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setFormSubmitted(true);
        setTimeout(() => {
            setFormSubmitted(false);
        }, 4000);
    };

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
                        <span className="text-white/80">Contact / Consult Us</span>
                    </div>

                    <span className="inline-block px-3.5 py-1.5 rounded-full text-[0.78rem] font-semibold tracking-wide uppercase bg-cyan/15 text-cyan">
                        Contact Us
                    </span>
                    <h1 className="text-white text-[clamp(2rem,4vw,2.9rem)] font-extrabold font-plus-jakarta leading-[1.15] mt-4">
                        Let's Talk About Your<br />AI Requirement
                    </h1>
                    <p className="text-white/60 text-[1.05rem] max-w-[640px] leading-relaxed mt-4">
                        Reach us via WhatsApp, email or the form below. Our AI Solutions team typically
                        responds within one business day.
                    </p>
                </div>
            </section>

            {/* Contact Content */}
            <section className="py-16 md:py-24 bg-off-white" ref={sectionRef}>
                <div className="container max-w-[1200px] mx-auto px-6 md:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
                        {/* Left Side - Contact Info */}
                        <div className="contact-left opacity-0 translate-y-[30px] transition-all duration-700">
                            <span className="inline-block px-3.5 py-1.5 rounded-full text-[0.78rem] font-semibold tracking-wide uppercase bg-cyan/15 text-cyan">
                                Consult Us
                            </span>
                            <h2 className="font-plus-jakarta font-bold text-[clamp(1.8rem,3.5vw,2.8rem)] leading-[1.15] text-grey-800 mt-4 mb-5">
                                Talk to an<br />AI Specialist
                            </h2>
                            <p className="text-[1.05rem] text-grey-600 leading-relaxed mb-8">
                                Our team will review your requirement and contact you to discuss a practical
                                AI solution for your organization. We typically respond within one business day.
                            </p>

                            {/* Contact Methods */}
                            <div className="flex flex-col gap-4">
                                <a
                                    href={WA_LINK}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-4 p-4 bg-white rounded-xl border border-grey-100 shadow-sm transition-all duration-300 hover:border-cyan hover:translate-x-1 cursor-pointer"
                                >
                                    <div className="w-11 h-11 rounded-xl bg-green-wa/10 flex items-center justify-center text-xl shrink-0">
                                        💬
                                    </div>
                                    <div>
                                        <h4 className="text-[0.9rem] font-semibold text-navy">Chat on WhatsApp</h4>
                                        <p className="text-[0.8rem] text-grey-400">Fastest response — our team is available during business hours</p>
                                    </div>
                                </a>

                                <a
                                    href={`mailto:${EMAIL}`}
                                    className="flex items-center gap-4 p-4 bg-white rounded-xl border border-grey-100 shadow-sm transition-all duration-300 hover:border-cyan hover:translate-x-1 cursor-pointer"
                                >
                                    <div className="w-11 h-11 rounded-xl bg-blue/10 flex items-center justify-center text-xl shrink-0">
                                        📧
                                    </div>
                                    <div>
                                        <h4 className="text-[0.9rem] font-semibold text-navy">Email Our AI Team</h4>
                                        <p className="text-[0.8rem] text-grey-400">{EMAIL} — detailed enquiries welcome</p>
                                    </div>
                                </a>

                                <div className="flex items-center gap-4 p-4 bg-white rounded-xl border border-grey-100 shadow-sm transition-all duration-300 hover:border-cyan hover:translate-x-1 cursor-pointer">
                                    <div className="w-11 h-11 rounded-xl bg-cyan/10 flex items-center justify-center text-xl shrink-0">
                                        📞
                                    </div>
                                    <div>
                                        <h4 className="text-[0.9rem] font-semibold text-navy">Call Us</h4>
                                        <p className="text-[0.8rem] text-grey-400">Bangladesh, UK, Singapore, Portugal, Middle East offices</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Side - Form */}
                        <div className="contact-right opacity-0 translate-y-[30px] transition-all duration-700">
                            <div className="bg-white rounded-2xl p-10 shadow-md border border-grey-100">
                                <h3 className="text-[1.1rem] font-semibold text-navy mb-1.5 font-plus-jakarta">
                                    Send Your AI Requirement
                                </h3>
                                <p className="text-[0.85rem] text-grey-400 mb-6">
                                    Fill in the form and our AI Solutions team will contact you within one business day.
                                </p>

                                <form onSubmit={handleSubmit}>
                                    {/* Row 1: Name & Company */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                                        <div>
                                            <label className="block text-[0.82rem] font-semibold text-grey-800 mb-1.5">
                                                Full Name *
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="Your full name"
                                                className="w-full px-4 py-3 rounded-[8px] border border-grey-200 font-inter text-[0.9rem] text-grey-800 bg-white transition-all duration-200 outline-none focus:border-blue focus:shadow-[0_0_0_3px_rgba(30,95,212,0.1)]"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-[0.82rem] font-semibold text-grey-800 mb-1.5">
                                                Company Name *
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="Your organization"
                                                className="w-full px-4 py-3 rounded-[8px] border border-grey-200 font-inter text-[0.9rem] text-grey-800 bg-white transition-all duration-200 outline-none focus:border-blue focus:shadow-[0_0_0_3px_rgba(30,95,212,0.1)]"
                                                required
                                            />
                                        </div>
                                    </div>

                                    {/* Row 2: Email & Phone */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                                        <div>
                                            <label className="block text-[0.82rem] font-semibold text-grey-800 mb-1.5">
                                                Business Email *
                                            </label>
                                            <input
                                                type="email"
                                                placeholder="you@company.com"
                                                className="w-full px-4 py-3 rounded-[8px] border border-grey-200 font-inter text-[0.9rem] text-grey-800 bg-white transition-all duration-200 outline-none focus:border-blue focus:shadow-[0_0_0_3px_rgba(30,95,212,0.1)]"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-[0.82rem] font-semibold text-grey-800 mb-1.5">
                                                WhatsApp / Mobile *
                                            </label>
                                            <input
                                                type="tel"
                                                placeholder="+880 / +44 / +65..."
                                                className="w-full px-4 py-3 rounded-[8px] border border-grey-200 font-inter text-[0.9rem] text-grey-800 bg-white transition-all duration-200 outline-none focus:border-blue focus:shadow-[0_0_0_3px_rgba(30,95,212,0.1)]"
                                                required
                                            />
                                        </div>
                                    </div>

                                    {/* Row 3: Country & Service */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                                        <div>
                                            <label className="block text-[0.82rem] font-semibold text-grey-800 mb-1.5">
                                                Country *
                                            </label>
                                            <select
                                                className="w-full px-4 py-3 rounded-[8px] border border-grey-200 font-inter text-[0.9rem] text-grey-800 bg-white transition-all duration-200 outline-none focus:border-blue focus:shadow-[0_0_0_3px_rgba(30,95,212,0.1)] appearance-none cursor-pointer"
                                                required
                                            >
                                                <option value="">Select country</option>
                                                <option>Bangladesh</option>
                                                <option>United Kingdom</option>
                                                <option>Singapore</option>
                                                <option>Portugal</option>
                                                <option>UAE / Middle East</option>
                                                <option>Other</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-[0.82rem] font-semibold text-grey-800 mb-1.5">
                                                Interested Service *
                                            </label>
                                            <select
                                                className="w-full px-4 py-3 rounded-[8px] border border-grey-200 font-inter text-[0.9rem] text-grey-800 bg-white transition-all duration-200 outline-none focus:border-blue focus:shadow-[0_0_0_3px_rgba(30,95,212,0.1)] appearance-none cursor-pointer"
                                                required
                                            >
                                                <option value="">Select a service</option>
                                                {SERVICES.map((service) => (
                                                    <option key={service.id} value={service.id}>
                                                        {service.name}
                                                    </option>
                                                ))}
                                                <option>Not sure — need advice</option>
                                            </select>
                                        </div>
                                    </div>

                                    {/* Message */}
                                    <div className="mb-4">
                                        <label className="block text-[0.82rem] font-semibold text-grey-800 mb-1.5">
                                            Your Requirement *
                                        </label>
                                        <textarea
                                            placeholder="Briefly describe your business challenge, AI idea or project requirement..."
                                            className="w-full px-4 py-3 rounded-[8px] border border-grey-200 font-inter text-[0.9rem] text-grey-800 bg-white transition-all duration-200 outline-none focus:border-blue focus:shadow-[0_0_0_3px_rgba(30,95,212,0.1)] resize-vertical min-h-[110px]"
                                            required
                                        />
                                    </div>

                                    {/* Consent */}
                                    <div className="flex gap-2.5 items-start mb-6">
                                        <input
                                            type="checkbox"
                                            className="mt-1.5 shrink-0"
                                            required
                                        />
                                        <p className="text-[0.8rem] text-grey-400">
                                            I consent to NGEN IT contacting me to discuss my AI requirement.
                                            I have read the{' '}
                                            <a href="#" className="text-blue hover:underline">
                                                Privacy Policy
                                            </a>
                                            .
                                        </p>
                                    </div>

                                    {/* Submit Button */}
                                    <button
                                        type="submit"
                                        className={`w-full py-4 rounded-[8px] font-semibold text-[1.05rem] border-2 border-transparent transition-all duration-200 cursor-pointer ${formSubmitted
                                                ? 'bg-[#28CA41] text-white'
                                                : 'bg-cyan text-navy shadow-[0_4px_20px_rgba(0,194,203,0.3)] hover:bg-cyan-light hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(0,194,203,0.4)]'
                                            }`}
                                    >
                                        {formSubmitted ? '✓ Requirement Sent! Our team will contact you soon.' : 'Send My Requirement →'}
                                    </button>

                                    <p className="text-center mt-3 text-[0.78rem] text-grey-400">
                                        🔒 Your information is secure and will only be shared with the NGEN IT AI Solutions team.
                                    </p>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <style jsx>{`
                .contact-left.visible {
                    opacity: 1 !important;
                    transform: translateY(0) !important;
                }
                .contact-right.visible {
                    opacity: 1 !important;
                    transform: translateY(0) !important;
                }
            `}</style>
        </>
    );
}