"use client";

import { useEffect, useRef, useState } from "react";
import ServiceCard from "./ServiceCard";
import { getServices } from "@/services/serviceApi";
import { ServiceData } from "@/types/admin/service";

export default function ServicesSection() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [services, setServices] = useState<ServiceData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await getServices();
            // Filter active services
            const activeServices = data.filter(s => s.isActive !== false);
            setServices(activeServices);
        } catch (error: any) {
            console.error("Error fetching services:", error);
            setError(error.message || "Failed to load services");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (loading || services.length === 0) return;

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

                        // Animate cards with stagger
                        const cards = entry.target.querySelectorAll('.service-card-wrapper');
                        cards.forEach((card, index) => {
                            setTimeout(() => {
                                card.classList.add('visible');
                            }, 200 + index * 80);
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
    }, [loading, services]);

    // ============================================================
    // SKELETON LOADER
    // ============================================================
    if (loading) {
        return (
            <section className="py-24 md:py-32 bg-white" id="services" ref={sectionRef}>
                <div className="container max-w-[1200px] mx-auto px-6 md:px-8">
                    {/* Section Header Skeleton */}
                    <div className="text-center mb-16">
                        {/* Badge Skeleton */}
                        <div className="h-6 w-24 bg-grey-200 rounded-full skeleton-pulse mx-auto"></div>

                        {/* Title Skeleton */}
                        <div className="space-y-2 mt-3 mb-5">
                            <div className="h-8 md:h-10 w-3/4 max-w-[400px] bg-grey-200 rounded skeleton-pulse mx-auto"></div>
                            <div className="h-8 md:h-10 w-1/2 max-w-[300px] bg-grey-200 rounded skeleton-pulse mx-auto"></div>
                        </div>

                        {/* Description Skeleton */}
                        <div className="space-y-2 max-w-[600px] mx-auto">
                            <div className="h-4 w-full bg-grey-100 rounded skeleton-pulse"></div>
                            <div className="h-4 w-5/6 bg-grey-100 rounded skeleton-pulse mx-auto"></div>
                            <div className="h-4 w-4/5 bg-grey-100 rounded skeleton-pulse mx-auto"></div>
                        </div>
                    </div>

                    {/* Services Grid Skeleton */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                        {[1, 2, 3, 4].map((i) => (
                            <div
                                key={i}
                                className="bg-white border border-grey-100 rounded-xl p-6 shadow-sm flex flex-col h-[220px]"
                            >
                                {/* Icon Skeleton */}
                                <div className="w-12 h-12 rounded-xl bg-grey-200 mb-4 skeleton-pulse"></div>

                                {/* Title Skeleton */}
                                <div className="h-5 w-3/4 bg-grey-200 rounded skeleton-pulse mb-2"></div>

                                {/* Description Skeleton */}
                                <div className="space-y-1.5 flex-1">
                                    <div className="h-3.5 w-full bg-grey-100 rounded skeleton-pulse"></div>
                                    <div className="h-3.5 w-5/6 bg-grey-100 rounded skeleton-pulse"></div>
                                    <div className="h-3.5 w-4/5 bg-grey-100 rounded skeleton-pulse"></div>
                                </div>

                                {/* "Learn More" Skeleton */}
                                <div className="mt-4 pt-4 border-t border-grey-100">
                                    <div className="h-4 w-24 bg-grey-200 rounded skeleton-pulse"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

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
            </section>
        );
    }

    // ============================================================
    // ERROR STATE
    // ============================================================
    if (error) {
        return (
            <section className="py-24 md:py-32 bg-white" id="services" ref={sectionRef}>
                <div className="container max-w-[1200px] mx-auto px-6 md:px-8">
                    <div className="text-center">
                        <div className="bg-red-50 border border-red-200 rounded-xl p-8">
                            <p className="text-red-600 font-semibold">⚠️ {error}</p>
                            <button
                                onClick={() => window.location.reload()}
                                className="mt-4 px-6 py-2 bg-cyan text-navy rounded-lg font-semibold hover:bg-cyan-light transition-colors"
                            >
                                Refresh Page
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    // ============================================================
    // EMPTY STATE
    // ============================================================
    if (services.length === 0) {
        return (
            <section className="py-24 md:py-32 bg-white" id="services" ref={sectionRef}>
                <div className="container max-w-[1200px] mx-auto px-6 md:px-8">
                    <div className="text-center">
                        <div className="bg-off-white rounded-xl p-12">
                            <h3 className="text-lg font-semibold text-navy mb-2">No Services Available</h3>
                            <p className="text-grey-400">Check back later for our AI services.</p>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    // ============================================================
    // RENDER
    // ============================================================
    return (
        <section className="py-24 md:py-32 bg-white" id="services" ref={sectionRef}>
            <div className="container max-w-[1200px] mx-auto px-6 md:px-8">
                {/* Section Header */}
                <div className="text-center mb-16 section-header opacity-0 translate-y-[30px] transition-all duration-700">
                    <span className="inline-block px-3.5 py-1.5 rounded-full text-[0.78rem] font-semibold tracking-wide uppercase bg-cyan/15 text-cyan">
                        AI Services
                    </span>
                    <h2 className="font-plus-jakarta font-bold text-[clamp(1.8rem,3.5vw,2.8rem)] leading-[1.15] text-grey-800 my-3 mb-5">
                        Complete AI Services for<br />Modern Organizations
                    </h2>
                    <p className="max-w-[600px] mx-auto text-[1.05rem] text-grey-600 leading-relaxed">
                        From AI strategy and intelligent automation to custom applications,
                        computer vision and industrial AI — we help organizations move from
                        AI ideas to measurable results.
                    </p>
                </div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                    {services.map((service) => (
                        <div
                            key={service._id}
                            className="service-card-wrapper opacity-0 translate-y-[30px] transition-all duration-700"
                        >
                            <ServiceCard
                                id={service._id!}
                                icon={service.icon}
                                name={service.name}
                                summary={service.summary}
                            />
                        </div>
                    ))}
                </div>
            </div>

            <style jsx>{`
                .section-header.visible {
                    opacity: 1 !important;
                    transform: translateY(0) !important;
                }
                .service-card-wrapper.visible {
                    opacity: 1 !important;
                    transform: translateY(0) !important;
                }
            `}</style>
        </section>
    );
}