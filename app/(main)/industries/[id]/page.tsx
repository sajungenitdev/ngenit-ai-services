"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getIndustryById, getIndustries } from "@/services/industryApi";
import { getServices } from "@/services/serviceApi";
import { IndustryData } from "@/types/admin/industry";
import { ServiceData } from "@/types/admin/service";

export default function IndustryDetailPage() {
    const params = useParams();
    const industryId = params.id as string;
    const [industry, setIndustry] = useState<IndustryData | null>(null);
    const [relatedServices, setRelatedServices] = useState<ServiceData[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const data = await getIndustryById(industryId);
                setIndustry(data);

                // Fetch related services
                const allServices = await getServices();
                setRelatedServices(allServices.slice(0, 4));
            } catch (error) {
                console.error("Error fetching industry:", error);
                notFound();
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [industryId]);

    // ============================================================
    // SKELETON LOADER
    // ============================================================
    if (loading) {
        return (
            <div className="min-h-screen bg-white">
                {/* Hero Skeleton */}
                <section className="relative bg-navy pt-40 pb-20 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy-mid to-navy">
                        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_80%_20%,rgba(0,194,203,0.18)_0%,transparent_60%)]"></div>
                    </div>
                    <div className="container max-w-[1200px] mx-auto px-6 md:px-8 relative z-10">
                        {/* Breadcrumb Skeleton */}
                        <div className="flex items-center gap-2 mb-5">
                            <div className="h-4 w-12 bg-white/10 rounded skeleton-pulse"></div>
                            <span className="text-white/20">/</span>
                            <div className="h-4 w-20 bg-white/20 rounded skeleton-pulse"></div>
                            <span className="text-white/20">/</span>
                            <div className="h-4 w-24 bg-white/20 rounded skeleton-pulse"></div>
                        </div>

                        {/* Icon Skeleton */}
                        <div className="w-16 h-16 rounded-2xl bg-white/10 mb-5 skeleton-pulse"></div>

                        {/* Title Skeleton */}
                        <div className="space-y-3">
                            <div className="h-10 md:h-14 w-3/4 max-w-[600px] bg-white/15 rounded-lg skeleton-pulse"></div>
                        </div>

                        {/* Description Skeleton */}
                        <div className="space-y-2 mt-4 max-w-[640px]">
                            <div className="h-4 w-full bg-white/10 rounded skeleton-pulse"></div>
                            <div className="h-4 w-4/5 bg-white/10 rounded skeleton-pulse"></div>
                            <div className="h-4 w-3/4 bg-white/10 rounded skeleton-pulse"></div>
                        </div>

                        {/* CTA Buttons Skeleton */}
                        <div className="flex flex-wrap gap-4 mt-7">
                            <div className="h-12 w-48 bg-white/10 rounded-[8px] skeleton-pulse"></div>
                            <div className="h-12 w-40 bg-white/10 rounded-[8px] skeleton-pulse"></div>
                        </div>
                    </div>
                </section>

                {/* Content Skeleton */}
                <section className="py-16 md:py-24 bg-white">
                    <div className="container max-w-[1200px] mx-auto px-6 md:px-8">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                            {/* Main Content Skeleton - 2/3 */}
                            <div className="lg:col-span-2 space-y-8">
                                {/* Overview Skeleton */}
                                <div>
                                    <div className="h-8 w-64 bg-grey-200 rounded skeleton-pulse mb-4"></div>
                                    <div className="space-y-2">
                                        <div className="h-4 w-full bg-grey-100 rounded skeleton-pulse"></div>
                                        <div className="h-4 w-5/6 bg-grey-100 rounded skeleton-pulse"></div>
                                        <div className="h-4 w-4/5 bg-grey-100 rounded skeleton-pulse"></div>
                                        <div className="h-4 w-3/4 bg-grey-100 rounded skeleton-pulse"></div>
                                    </div>
                                </div>

                                {/* Challenges Skeleton */}
                                <div>
                                    <div className="h-8 w-56 bg-grey-200 rounded skeleton-pulse mb-4"></div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {[1, 2, 3, 4].map((i) => (
                                            <div key={i} className="flex items-start gap-3.5 p-4 bg-off-white rounded-xl border border-grey-100">
                                                <div className="w-6 h-6 rounded-full bg-red-100 shrink-0 skeleton-pulse"></div>
                                                <div className="flex-1 space-y-1">
                                                    <div className="h-3.5 w-full bg-grey-100 rounded skeleton-pulse"></div>
                                                    <div className="h-3.5 w-3/4 bg-grey-100 rounded skeleton-pulse"></div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Solutions Skeleton */}
                                <div>
                                    <div className="h-8 w-64 bg-grey-200 rounded skeleton-pulse mb-4"></div>
                                    <div className="space-y-3">
                                        {[1, 2, 3].map((i) => (
                                            <div key={i} className="flex items-start gap-3.5 p-4 bg-white border border-grey-100 rounded-xl">
                                                <div className="w-6 h-6 rounded-full bg-cyan/10 shrink-0 skeleton-pulse"></div>
                                                <div className="flex-1 space-y-1">
                                                    <div className="h-4 w-48 bg-grey-200 rounded skeleton-pulse"></div>
                                                    <div className="h-3.5 w-full bg-grey-100 rounded skeleton-pulse"></div>
                                                    <div className="h-3.5 w-4/5 bg-grey-100 rounded skeleton-pulse"></div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Related Services Skeleton */}
                                <div>
                                    <div className="h-8 w-48 bg-grey-200 rounded skeleton-pulse mb-4"></div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {[1, 2].map((i) => (
                                            <div key={i} className="flex items-start gap-3 p-4 bg-white border border-grey-100 rounded-xl">
                                                <div className="w-10 h-10 rounded-lg bg-grey-200 shrink-0 skeleton-pulse"></div>
                                                <div className="flex-1 space-y-1">
                                                    <div className="h-4 w-32 bg-grey-200 rounded skeleton-pulse"></div>
                                                    <div className="h-3.5 w-full bg-grey-100 rounded skeleton-pulse"></div>
                                                    <div className="h-3.5 w-2/3 bg-grey-100 rounded skeleton-pulse"></div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Sidebar Skeleton - 1/3 */}
                            <div className="lg:col-span-1">
                                <div className="bg-off-white rounded-2xl p-8 sticky top-24 space-y-6">
                                    <div className="h-5 w-32 bg-grey-200 rounded skeleton-pulse"></div>
                                    <div className="space-y-4">
                                        <div>
                                            <div className="h-3 w-16 bg-grey-300 rounded skeleton-pulse mb-1"></div>
                                            <div className="h-5 w-24 bg-grey-200 rounded skeleton-pulse"></div>
                                        </div>
                                        <div>
                                            <div className="h-3 w-32 bg-grey-300 rounded skeleton-pulse mb-2"></div>
                                            <div className="flex flex-wrap gap-1.5">
                                                {[1, 2, 3, 4].map((i) => (
                                                    <div key={i} className="h-7 w-16 bg-grey-200 rounded-md skeleton-pulse"></div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="pt-6 border-t border-grey-200 space-y-3">
                                        <div className="h-12 w-full bg-cyan/30 rounded-[8px] skeleton-pulse"></div>
                                        <div className="h-12 w-full bg-grey-200 rounded-[8px] skeleton-pulse"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Bottom CTA Skeleton */}
                <section className="py-16 md:py-20 bg-navy-mid">
                    <div className="container max-w-[1200px] mx-auto px-6 md:px-8">
                        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                            <div className="space-y-3 text-center lg:text-left">
                                <div className="h-8 w-72 bg-white/10 rounded-lg skeleton-pulse"></div>
                                <div className="h-4 w-64 bg-white/10 rounded skeleton-pulse"></div>
                            </div>
                            <div className="flex flex-col gap-3 min-w-[200px]">
                                <div className="h-12 w-full bg-white/10 rounded-[8px] skeleton-pulse"></div>
                                <div className="h-12 w-full bg-white/10 rounded-[8px] skeleton-pulse"></div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Custom Skeleton Pulse Animation */}
                <style jsx>{`
                    .skeleton-pulse {
                        animation: skeletonPulse 1.8s ease-in-out infinite;
                    }
                    
                    @keyframes skeletonPulse {
                        0% {
                            opacity: 0.4;
                        }
                        50% {
                            opacity: 0.7;
                        }
                        100% {
                            opacity: 0.4;
                        }
                    }
                `}</style>
            </div>
        );
    }

    if (!industry) {
        notFound();
    }

    // ============================================================
    // RENDER
    // ============================================================
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
                        <Link href="/industries" className="hover:text-cyan transition-colors">Industries</Link>
                        <span>/</span>
                        <span className="text-white/80">{industry.name}</span>
                    </div>

                    {/* Icon */}
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-navy-mid to-blue flex items-center justify-center text-3xl mb-5">
                        {industry.icon}
                    </div>

                    <h1 className="text-white text-[clamp(2rem,4vw,2.9rem)] font-extrabold font-plus-jakarta leading-[1.15]">
                        AI Solutions for {industry.name}
                    </h1>
                    <p className="text-white/60 text-[1.05rem] max-w-[640px] leading-relaxed mt-4" dangerouslySetInnerHTML={{ __html: industry.long } }/>

                    {/* CTA Buttons */}
                    <div className="flex flex-wrap gap-4 mt-7">
                        <Link
                            href="/contact"
                            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-[8px] font-semibold text-[0.95rem] border-2 border-transparent transition-all duration-200 whitespace-nowrap bg-cyan text-navy shadow-[0_4px_20px_rgba(0,194,203,0.3)] hover:bg-cyan-light hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(0,194,203,0.4)]"
                        >
                            Discuss AI Solutions
                        </Link>
                        <a
                            href={`https://wa.me/8801XXXXXXXXX?text=Hello%20NGEN%20IT%2C%20I%20am%20interested%20in%20AI%20solutions%20for%20${industry.name}.`}
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
                                AI Solutions for {industry.name}
                            </h2>
                            <p className="text-grey-600 text-[1.02rem] leading-relaxed" dangerouslySetInnerHTML={{ __html: industry.long } }/>

                            {/* Key Challenges */}
                            {industry.challenges && industry.challenges.length > 0 && (
                                <>
                                    <h2 className="text-[clamp(1.5rem,2.5vw,2rem)] font-bold text-navy font-plus-jakarta mt-10 mb-4">
                                        Key Challenges We Solve
                                    </h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {industry.challenges.map((challenge, index) => (
                                            <div
                                                key={index}
                                                className="flex items-start gap-3.5 p-4 bg-off-white rounded-xl border border-grey-100 hover:shadow-md transition-all duration-300"
                                            >
                                                <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center shrink-0 text-red-500 font-extrabold text-sm">
                                                    !
                                                </div>
                                                <p className="text-grey-600 text-sm leading-relaxed">
                                                    {challenge}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </>
                            )}

                            {/* Solutions */}
                            {industry.solutions && industry.solutions.length > 0 && (
                                <>
                                    <h2 className="text-[clamp(1.5rem,2.5vw,2rem)] font-bold text-navy font-plus-jakarta mt-10 mb-4">
                                        How AI Transforms {industry.name}
                                    </h2>
                                    <div className="flex flex-col gap-3.5">
                                        {industry.solutions.map((solution, index) => (
                                            <div
                                                key={index}
                                                className="flex items-start gap-3.5 p-4 bg-white border border-grey-100 rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
                                            >
                                                <div className="w-6 h-6 rounded-full bg-cyan/10 flex items-center justify-center shrink-0 text-cyan font-extrabold text-sm">
                                                    ✓
                                                </div>
                                                <div>
                                                    <p className="text-navy text-sm font-semibold">
                                                        {solution.title}
                                                    </p>
                                                    <p className="text-grey-400 text-sm leading-relaxed">
                                                        {solution.description}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </>
                            )}

                            {/* Related Services */}
                            {relatedServices.length > 0 && (
                                <>
                                    <h2 className="text-[clamp(1.5rem,2.5vw,2rem)] font-bold text-navy font-plus-jakarta mt-10 mb-4">
                                        Related AI Services
                                    </h2>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {relatedServices.map((service) => (
                                            <Link
                                                key={service._id}
                                                href={`/services/${service._id}`}
                                                className="group flex items-start gap-3 p-4 bg-white border border-grey-100 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
                                            >
                                                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-navy-mid to-blue flex items-center justify-center text-lg shrink-0">
                                                    {service.icon || '🧠'}
                                                </div>
                                                <div>
                                                    <h4 className="text-navy text-sm font-semibold group-hover:text-cyan transition-colors">
                                                        {service.name}
                                                    </h4>
                                                    <p className="text-grey-400 text-xs leading-relaxed line-clamp-2">
                                                        {service.summary}
                                                    </p>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>

                        {/* Sidebar - 1/3 width */}
                        <div className="lg:col-span-1">
                            <div className="bg-off-white rounded-2xl p-8 sticky top-24">
                                <h4 className="text-navy text-sm font-semibold mb-4 font-plus-jakarta">
                                    Industry Overview
                                </h4>

                                <div className="space-y-4">
                                    <div>
                                        <p className="text-grey-400 text-xs uppercase tracking-wide font-semibold">
                                            Industry
                                        </p>
                                        <p className="text-navy font-semibold">
                                            {industry.name}
                                        </p>
                                    </div>
                                    {industry.focusAreas && industry.focusAreas.length > 0 && (
                                        <div>
                                            <p className="text-grey-400 text-xs uppercase tracking-wide font-semibold">
                                                Key Focus Areas
                                            </p>
                                            <div className="flex flex-wrap gap-1.5 mt-1">
                                                {industry.focusAreas.map((area, index) => (
                                                    <span
                                                        key={index}
                                                        className="px-2.5 py-1 rounded-md bg-white text-navy text-xs font-medium border border-grey-200"
                                                    >
                                                        {area}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* CTA in Sidebar */}
                                <div className="mt-6 pt-6 border-t border-grey-200">
                                    <Link
                                        href="/contact"
                                        className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-[8px] font-semibold text-[0.95rem] border-2 border-transparent transition-all duration-200 whitespace-nowrap bg-cyan text-navy shadow-[0_4px_20px_rgba(0,194,203,0.3)] hover:bg-cyan-light hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(0,194,203,0.4)]"
                                    >
                                        Request Industry Solutions
                                    </Link>
                                    <Link
                                        href="/industries"
                                        className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 mt-3 rounded-[8px] font-semibold text-[0.95rem] border-2 border-transparent transition-all duration-200 whitespace-nowrap bg-transparent text-navy border-grey-200 hover:bg-off-white hover:border-navy"
                                    >
                                        View All Industries →
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
                                {industry.ctaText || "Ready to Transform Your Operations?"}
                            </h2>
                            <p className="text-white/60 text-[1rem] mt-3 max-w-[460px] leading-relaxed">
                                Let's discuss how AI can solve your specific challenges and drive measurable results.
                            </p>
                        </div>
                        <div className="flex flex-col gap-3 min-w-[200px] w-full lg:w-auto">
                            <Link
                                href="/contact"
                                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-[8px] font-semibold text-[0.95rem] border-2 border-transparent transition-all duration-200 whitespace-nowrap bg-cyan text-navy shadow-[0_4px_20px_rgba(0,194,203,0.3)] hover:bg-cyan-light hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(0,194,203,0.4)]"
                            >
                                Start Your AI Journey
                            </Link>
                            <Link
                                href="/industries"
                                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-[8px] font-semibold text-[0.95rem] border-2 border-transparent transition-all duration-200 whitespace-nowrap bg-transparent text-white border-white/40 hover:bg-white/10 hover:border-white"
                            >
                                Explore All Industries →
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}