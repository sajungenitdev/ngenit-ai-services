"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { getServices } from "@/services/serviceApi";
import { getIndustries } from "@/services/industryApi";
import type { ServiceData } from "@/types/admin/service";
import type { IndustryData } from "@/types/admin/industry";

// Use the imported types
type Service = ServiceData;
type Industry = IndustryData;

export default function Footer() {
    const currentYear = new Date().getFullYear();
    const [services, setServices] = useState<Service[]>([]);
    const [industries, setIndustries] = useState<Industry[]>([]);
    const [loading, setLoading] = useState(true);

    // ============================================================
    // FETCH SERVICES AND INDUSTRIES
    // ============================================================
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [servicesData, industriesData] = await Promise.all([
                    getServices(),
                    getIndustries(),
                ]);
                setServices(servicesData.filter(s => s.isActive !== false));
                setIndustries(industriesData.filter(i => i.isActive !== false));
            } catch (error) {
                console.error("Error fetching footer data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // ============================================================
    // OFFICES DATA (Can also be fetched from API if needed)
    // ============================================================
    const offices = [
        { city: "Dhaka", country: "Bangladesh" },
        { city: "London", country: "UK" },
        { city: "Singapore", country: "Singapore" },
        { city: "Lisbon", country: "Portugal" }
    ];

    // ============================================================
    // SOCIAL LINKS
    // ============================================================
    const socialLinks = [
        { icon: "in", label: "LinkedIn", url: "https://linkedin.com/company/ngen-it" },
        { icon: "𝕏", label: "X", url: "https://x.com/ngenit" },
        { icon: "▶", label: "YouTube", url: "https://youtube.com/@ngenit" }
    ];

    // ============================================================
    // COMPANY LINKS
    // ============================================================
    const companyLinks = [
        { label: "About NGEN IT", href: "/about" },
        { label: "AI Solutions", href: "/solutions" },
        { label: "Use Cases", href: "/usecases" },
        { label: "Insights & Blog", href: "/insights" },
        { label: "Consult Us", href: "/contact" }
    ];

    // ============================================================
    // LOADING STATE
    // ============================================================
    if (loading) {
        return (
            <footer className="bg-navy border-t border-white/5">
                <div className="container max-w-[1200px] mx-auto px-6 md:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 py-16 lg:py-20">
                        {/* Skeleton loading */}
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="animate-pulse">
                                <div className="h-4 w-24 bg-white/10 rounded mb-5"></div>
                                <div className="space-y-3">
                                    <div className="h-3 w-32 bg-white/5 rounded"></div>
                                    <div className="h-3 w-28 bg-white/5 rounded"></div>
                                    <div className="h-3 w-36 bg-white/5 rounded"></div>
                                    <div className="h-3 w-24 bg-white/5 rounded"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </footer>
        );
    }

    // ============================================================
    // RENDER
    // ============================================================
    return (
        <footer className="bg-navy border-t border-white/5">
            <div className="container max-w-[1200px] mx-auto px-6 md:px-8">
                {/* Main Footer Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 py-16 lg:py-20">

                    {/* Brand Column */}
                    <div className="lg:col-span-1">
                        {/* Logo */}
                        <div className="flex items-center gap-2.5 mb-5">
                            <span className="bg-gradient-to-r from-cyan to-blue text-white font-extrabold text-sm px-3 py-1.5 rounded-md shadow-lg shadow-cyan/20">
                                N
                            </span>
                            <span className="font-plus-jakarta font-extrabold text-lg text-white tracking-tight">
                                NGEN IT LIMITED
                            </span>
                        </div>

                        <p className="text-white/40 text-sm leading-relaxed max-w-[280px]">
                            Practical AI Solutions for Business, Industry and Operations.
                            Serving enterprise, government and industrial organizations since 2009.
                        </p>

                        {/* Offices */}
                        <div className="flex flex-wrap gap-4 mt-5">
                            {offices.map((office, index) => (
                                <div key={index} className="flex items-start gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-cyan mt-1.5 shrink-0 animate-pulse"></div>
                                    <p className="text-white/30 text-xs">
                                        {office.city}, {office.country}
                                    </p>
                                </div>
                            ))}
                        </div>

                        {/* Social Icons */}
                        <div className="flex gap-2.5 mt-6">
                            {socialLinks.map((social, index) => (
                                <a
                                    key={index}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={social.label}
                                    className="w-9 h-9 rounded-lg border border-white/10 flex items-center justify-center text-white/40 text-sm transition-all duration-300 hover:bg-white/10 hover:text-white hover:border-white/30 hover:scale-105 hover:-translate-y-0.5"
                                >
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* AI Services Column - Dynamic */}
                    <div>
                        <h4 className="text-white/90 text-sm font-semibold mb-5 font-plus-jakarta tracking-wide">
                            AI Services
                        </h4>
                        <ul className="space-y-2.5">
                            {services.length > 0 ? (
                                services.map((service) => (
                                    <li key={service._id}>
                                        <Link
                                            href={`/services/${service.slug || service._id}`}
                                            className="text-white/40 text-sm transition-all duration-300 hover:text-cyan hover:pl-2 hover:translate-x-0.5 inline-block"
                                        >
                                            {service.name}
                                        </Link>
                                    </li>
                                ))
                            ) : (
                                <li className="text-white/20 text-sm">No services available</li>
                            )}
                        </ul>
                    </div>

                    {/* Industries Column - Dynamic */}
                    <div>
                        <h4 className="text-white/90 text-sm font-semibold mb-5 font-plus-jakarta tracking-wide">
                            Industries
                        </h4>
                        <ul className="space-y-2.5">
                            {industries.length > 0 ? (
                                industries.slice(0, 8).map((industry) => (
                                    <li key={industry._id}>
                                        <Link
                                            href={`/industries/${industry.slug || industry._id}`}
                                            className="text-white/40 text-sm transition-all duration-300 hover:text-cyan hover:pl-2 hover:translate-x-0.5 inline-block"
                                        >
                                            {industry.name}
                                        </Link>
                                    </li>
                                ))
                            ) : (
                                <li className="text-white/20 text-sm">No industries available</li>
                            )}
                            <li>
                                <Link
                                    href="/industries"
                                    className="text-cyan/60 text-sm font-medium transition-all duration-300 hover:text-cyan hover:pl-2 hover:translate-x-0.5 inline-block"
                                >
                                    View All Industries →
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Company Column */}
                    <div>
                        <h4 className="text-white/90 text-sm font-semibold mb-5 font-plus-jakarta tracking-wide">
                            Company
                        </h4>
                        <ul className="space-y-2.5">
                            {companyLinks.map((item, index) => (
                                <li key={index}>
                                    <Link
                                        href={item.href}
                                        className="text-white/40 text-sm transition-all duration-300 hover:text-cyan hover:pl-2 hover:translate-x-0.5 inline-block"
                                    >
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="py-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-white/25 text-xs text-center sm:text-left">
                        © {currentYear} <span className="text-white/40">NGEN IT LIMITED</span>. All rights reserved.
                        Serving Bangladesh, UK, Singapore, Portugal &amp; the Middle East.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
                        {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((item, index) => (
                            <Link
                                key={index}
                                href="#"
                                className="text-white/25 text-xs transition-all duration-300 hover:text-white/60 hover:underline"
                            >
                                {item}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}