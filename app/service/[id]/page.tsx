"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { SERVICES } from "@/lib/data";
import { notFound } from "next/navigation";

export default function ServiceDetailPage() {
    const params = useParams();
    const serviceId = params.id as string;

    // Find the service by ID
    const service = SERVICES.find((s) => s.id === serviceId);

    // If service not found, show 404
    if (!service) {
        notFound();
    }

    // Get other services for sidebar
    const otherServices = SERVICES.filter((s) => s.id !== serviceId).slice(0, 5);

    return (
        <>
            {/* Page Hero */}
            <section className="relative bg-navy pt-40 pb-20 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy-mid to-navy">
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_80%_20%,rgba(0,194,203,0.18)_0%,transparent_60%)]"></div>
                </div>
                <div className="container max-w-[1200px] mx-auto px-6 md:px-8 relative z-10">
                    {/* Breadcrumb */}
                    <div className="flex items-center gap-2 text-white/40 text-sm mb-5">
                        <Link href="/" className="hover:text-cyan transition-colors">Home</Link>
                        <span>/</span>
                        <Link href="/services" className="hover:text-cyan transition-colors">AI Services</Link>
                        <span>/</span>
                        <span className="text-white/80">{service.name}</span>
                    </div>

                    {/* Icon */}
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-navy-mid to-blue flex items-center justify-center text-3xl mb-5">
                        {service.icon}
                    </div>

                    {/* Tagline */}
                    <span className="inline-block px-3.5 py-1.5 rounded-full text-[0.78rem] font-semibold tracking-wide uppercase bg-cyan/15 text-cyan mb-4">
                        {service.tagline}
                    </span>

                    <h1 className="text-white text-[clamp(2rem,4vw,2.9rem)] font-extrabold font-plus-jakarta leading-[1.15]">
                        {service.name}
                    </h1>
                    <p className="text-white/60 text-[1.05rem] max-w-[640px] leading-relaxed mt-4">
                        {service.summary}
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-wrap gap-4 mt-7">
                        <Link
                            href="/contact"
                            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-[8px] font-semibold text-[0.95rem] border-2 border-transparent transition-all duration-200 whitespace-nowrap bg-cyan text-navy shadow-[0_4px_20px_rgba(0,194,203,0.3)] hover:bg-cyan-light hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(0,194,203,0.4)]"
                        >
                            Book a Free Consultation
                        </Link>
                        <a
                            href={`https://wa.me/8801XXXXXXXXX?text=Hello%20NGEN%20IT%2C%20I%20would%20like%20to%20discuss%20${service.name}.`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-[8px] font-semibold text-[0.95rem] border-2 border-transparent transition-all duration-200 whitespace-nowrap bg-transparent text-white border-white/40 hover:bg-white/10 hover:border-white"
                        >
                            💬 WhatsApp Us
                        </a>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-16 md:py-24 bg-white">
                <div className="container max-w-[1200px] mx-auto px-6 md:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        {/* Main Content - 2/3 width */}
                        <div className="lg:col-span-2">
                            {/* Overview */}
                            <h2 className="text-[clamp(1.5rem,2.5vw,2rem)] font-bold text-navy font-plus-jakarta mb-4">
                                Overview
                            </h2>
                            <p className="text-grey-600 text-[1.02rem] leading-relaxed">
                                {service.description}
                            </p>

                            {/* Benefits Strip */}
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 my-8">
                                {service.benefits.map((benefit, index) => (
                                    <div
                                        key={index}
                                        className="bg-white border border-grey-100 rounded-xl p-4 text-center shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
                                    >
                                        <div className="text-navy text-xl font-extrabold font-plus-jakarta">
                                            {benefit[0]}
                                        </div>
                                        <div className="text-grey-400 text-xs mt-1">
                                            {benefit[1]}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Capabilities */}
                            <h2 className="text-[clamp(1.5rem,2.5vw,2rem)] font-bold text-navy font-plus-jakarta mb-4">
                                What's Included
                            </h2>
                            <div className="flex flex-col gap-3.5">
                                {service.capabilities.map((capability, index) => (
                                    <div
                                        key={index}
                                        className="flex items-start gap-3.5 p-4 bg-white border border-grey-100 rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
                                    >
                                        <div className="w-6 h-6 rounded-full bg-cyan/10 flex items-center justify-center shrink-0 text-cyan font-extrabold text-sm">
                                            ✓
                                        </div>
                                        <p className="text-grey-600 text-sm leading-relaxed">
                                            {capability}
                                        </p>
                                    </div>
                                ))}
                            </div>

                            {/* Use Cases */}
                            <h2 className="text-[clamp(1.5rem,2.5vw,2rem)] font-bold text-navy font-plus-jakarta mt-10 mb-4">
                                Example Use Cases
                            </h2>
                            <div className="flex flex-col gap-3.5">
                                {service.useCases.map((useCase, index) => (
                                    <div
                                        key={index}
                                        className="flex items-start gap-3.5 p-4 bg-white border border-grey-100 rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
                                    >
                                        <div className="w-6 h-6 rounded-full bg-blue/10 flex items-center justify-center shrink-0 text-blue font-extrabold text-sm">
                                            →
                                        </div>
                                        <p className="text-grey-600 text-sm leading-relaxed">
                                            {useCase}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Sidebar - 1/3 width */}
                        <div className="lg:col-span-1">
                            <div className="bg-off-white rounded-2xl p-8 sticky top-24">
                                <h4 className="text-navy text-sm font-semibold mb-4 font-plus-jakarta">
                                    Other AI Services
                                </h4>
                                <div className="space-y-3">
                                    {otherServices.map((s) => (
                                        <Link
                                            key={s.id}
                                            href={`/service/${s.id}`}
                                            className="flex items-center gap-3 py-3 border-b border-grey-200 last:border-0 transition-all duration-200 hover:pl-2 group"
                                        >
                                            <span className="text-lg">{s.icon}</span>
                                            <span className="text-navy text-sm font-semibold group-hover:text-cyan transition-colors">
                                                {s.name}
                                            </span>
                                        </Link>
                                    ))}
                                </div>

                                {/* CTA in Sidebar */}
                                <div className="mt-6 pt-6 border-t border-grey-200">
                                    <Link
                                        href="/contact"
                                        className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-[8px] font-semibold text-[0.95rem] border-2 border-transparent transition-all duration-200 whitespace-nowrap bg-cyan text-navy shadow-[0_4px_20px_rgba(0,194,203,0.3)] hover:bg-cyan-light hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(0,194,203,0.4)]"
                                    >
                                        Request a Consultation
                                    </Link>
                                </div>
                            </div>
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
                                Ready to explore {service.name}<br />for your organization?
                            </h2>
                            <p className="text-white/60 text-[1rem] mt-3 max-w-[460px] leading-relaxed">
                                Tell us about your requirement and our AI specialists will get in touch within one business day.
                            </p>
                        </div>
                        <div className="flex flex-col gap-3 min-w-[200px] w-full lg:w-auto">
                            <Link
                                href="/contact"
                                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-[8px] font-semibold text-[0.95rem] border-2 border-transparent transition-all duration-200 whitespace-nowrap bg-cyan text-navy shadow-[0_4px_20px_rgba(0,194,203,0.3)] hover:bg-cyan-light hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(0,194,203,0.4)]"
                            >
                                Send Your Requirement
                            </Link>
                            <Link
                                href="/services"
                                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-[8px] font-semibold text-[0.95rem] border-2 border-transparent transition-all duration-200 whitespace-nowrap bg-transparent text-white border-white/40 hover:bg-white/10 hover:border-white"
                            >
                                Explore All Services →
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}