"use client";

import { useEffect, useRef, useState } from "react";
import { getContactPage } from "@/services/contactPageApi";
import { 
    ContactPageData, 
    ContactMethod,
    ServiceOption 
} from "@/types/admin/contactPage";
import ContactForm from "./ContactForm";

export default function ConsultSection() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [data, setData] = useState<ContactPageData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [serviceOptions, setServiceOptions] = useState<ServiceOption[]>([]);

    // ============================================================
    // FETCH CONTACT PAGE DATA
    // ============================================================
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);
                const result = await getContactPage();
                setData(result);
                setServiceOptions(result.serviceOptions || []);
            } catch (error: any) {
                console.error("Error fetching contact page:", error);
                setError(error.message || "Failed to load contact data");
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
        if (loading || !data) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const left = entry.target.querySelector('.consult-left');
                        if (left) {
                            setTimeout(() => {
                                left.classList.add('visible');
                            }, 100);
                        }

                        const right = entry.target.querySelector('.consult-right');
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
    }, [loading, data]);

    // ============================================================
    // HELPER: Get background color based on method type
    // ============================================================
    const getMethodBgColor = (type: string) => {
        switch (type) {
            case 'whatsapp':
                return 'bg-green-wa/10';
            case 'email':
                return 'bg-blue/10';
            case 'phone':
                return 'bg-cyan/10';
            default:
                return 'bg-grey-100';
        }
    };

    // ============================================================
    // HELPER: Get border color on hover
    // ============================================================
    const getMethodBorderColor = (type: string) => {
        switch (type) {
            case 'whatsapp':
                return 'hover:border-green-wa';
            case 'email':
                return 'hover:border-blue';
            case 'phone':
                return 'hover:border-cyan';
            default:
                return 'hover:border-cyan';
        }
    };

    // ============================================================
    // HELPER: Get link target based on type
    // ============================================================
    const getLinkTarget = (type: string) => {
        return type === 'whatsapp' ? '_blank' : undefined;
    };

    // ============================================================
    // SKELETON LOADER
    // ============================================================
    if (loading) {
        return (
            <section className="py-24 md:py-32 bg-off-white" id="consult" ref={sectionRef}>
                <div className="container max-w-[1200px] mx-auto px-6 md:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
                        {/* Left Side Skeleton */}
                        <div className="space-y-4">
                            {/* Tag Skeleton */}
                            <div className="h-7 w-24 bg-cyan/20 rounded-full skeleton-pulse"></div>
                            
                            {/* Title Skeleton */}
                            <div className="space-y-2">
                                <div className="h-8 md:h-10 w-3/4 max-w-[400px] bg-grey-200 rounded skeleton-pulse"></div>
                                <div className="h-8 md:h-10 w-1/2 max-w-[300px] bg-grey-200 rounded skeleton-pulse"></div>
                            </div>
                            
                            {/* Description Skeleton */}
                            <div className="space-y-2">
                                <div className="h-4 w-full bg-grey-100 rounded skeleton-pulse"></div>
                                <div className="h-4 w-5/6 bg-grey-100 rounded skeleton-pulse"></div>
                                <div className="h-4 w-4/5 bg-grey-100 rounded skeleton-pulse"></div>
                                <div className="h-4 w-3/4 bg-grey-100 rounded skeleton-pulse"></div>
                            </div>

                            {/* Contact Methods Skeleton */}
                            <div className="space-y-3 mt-6">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="flex items-center gap-4 p-4 bg-white rounded-xl border border-grey-100">
                                        <div className="w-11 h-11 rounded-xl bg-grey-200 shrink-0 skeleton-pulse"></div>
                                        <div className="flex-1 space-y-1.5">
                                            <div className="h-4 w-32 bg-grey-200 rounded skeleton-pulse"></div>
                                            <div className="h-3 w-48 bg-grey-100 rounded skeleton-pulse"></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right Side - Form Skeleton */}
                        <div className="bg-white rounded-2xl p-10 shadow-md border border-grey-100">
                            {/* Form Title Skeleton */}
                            <div className="h-6 w-48 bg-grey-200 rounded skeleton-pulse mb-2"></div>
                            <div className="h-4 w-64 bg-grey-100 rounded skeleton-pulse mb-6"></div>

                            {/* Form Fields Skeleton */}
                            <div className="space-y-4">
                                {/* Row 1 */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <div className="h-3.5 w-20 bg-grey-200 rounded skeleton-pulse"></div>
                                        <div className="h-11 w-full bg-grey-100 rounded-[8px] skeleton-pulse"></div>
                                    </div>
                                    <div className="space-y-1.5">
                                        <div className="h-3.5 w-24 bg-grey-200 rounded skeleton-pulse"></div>
                                        <div className="h-11 w-full bg-grey-100 rounded-[8px] skeleton-pulse"></div>
                                    </div>
                                </div>

                                {/* Row 2 */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <div className="h-3.5 w-24 bg-grey-200 rounded skeleton-pulse"></div>
                                        <div className="h-11 w-full bg-grey-100 rounded-[8px] skeleton-pulse"></div>
                                    </div>
                                    <div className="space-y-1.5">
                                        <div className="h-3.5 w-28 bg-grey-200 rounded skeleton-pulse"></div>
                                        <div className="h-11 w-full bg-grey-100 rounded-[8px] skeleton-pulse"></div>
                                    </div>
                                </div>

                                {/* Row 3 */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <div className="h-3.5 w-16 bg-grey-200 rounded skeleton-pulse"></div>
                                        <div className="h-11 w-full bg-grey-100 rounded-[8px] skeleton-pulse"></div>
                                    </div>
                                    <div className="space-y-1.5">
                                        <div className="h-3.5 w-28 bg-grey-200 rounded skeleton-pulse"></div>
                                        <div className="h-11 w-full bg-grey-100 rounded-[8px] skeleton-pulse"></div>
                                    </div>
                                </div>

                                {/* Message */}
                                <div className="space-y-1.5">
                                    <div className="h-3.5 w-28 bg-grey-200 rounded skeleton-pulse"></div>
                                    <div className="h-28 w-full bg-grey-100 rounded-[8px] skeleton-pulse"></div>
                                </div>

                                {/* Consent */}
                                <div className="flex gap-2.5 items-start">
                                    <div className="w-4 h-4 bg-grey-200 rounded skeleton-pulse mt-1"></div>
                                    <div className="flex-1 space-y-1">
                                        <div className="h-3 w-48 bg-grey-100 rounded skeleton-pulse"></div>
                                        <div className="h-3 w-32 bg-grey-100 rounded skeleton-pulse"></div>
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <div className="h-14 w-full bg-cyan/30 rounded-[8px] skeleton-pulse"></div>
                            </div>
                        </div>
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
            <section className="py-24 md:py-32 bg-off-white" id="consult" ref={sectionRef}>
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
    // DON'T RENDER IF NOT ACTIVE
    // ============================================================
    if (!data || !data.isActive) {
        return null;
    }

    // Filter active contact methods and sort by order
    const activeMethods = data.contactMethods
        .filter((method: ContactMethod) => method.isActive)
        .sort((a: ContactMethod, b: ContactMethod) => a.order - b.order);

    // ============================================================
    // RENDER
    // ============================================================
    return (
        <section className="py-24 md:py-32 bg-off-white" id="consult" ref={sectionRef}>
            <div className="container max-w-[1200px] mx-auto px-6 md:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
                    {/* Left Side - Contact Info */}
                    <div className="consult-left opacity-0 translate-y-[30px] transition-all duration-700">
                        <span className="inline-block px-3.5 py-1.5 rounded-full text-[0.78rem] font-semibold tracking-wide uppercase bg-cyan/15 text-cyan">
                            {data.section.tag}
                        </span>
                        <h2
                            className="font-plus-jakarta font-bold text-[clamp(1.8rem,3.5vw,2.8rem)] leading-[1.15] text-grey-800 mt-4 mb-5"
                            dangerouslySetInnerHTML={{ __html: data.section.title }}
                        />
                        <p className="text-[1.05rem] text-grey-600 leading-relaxed mb-8">
                            {data.section.description}
                        </p>

                        {/* Dynamic Contact Methods - Repeater */}
                        <div className="flex flex-col gap-4">
                            {activeMethods.map((method: ContactMethod, index: number) => (
                                <a
                                    key={index}
                                    href={method.link}
                                    target={getLinkTarget(method.type)}
                                    rel={method.type === 'whatsapp' ? 'noopener noreferrer' : undefined}
                                    className={`flex items-center gap-4 p-4 bg-white rounded-xl border border-grey-100 shadow-sm transition-all duration-300 ${getMethodBorderColor(method.type)} hover:translate-x-1 cursor-pointer`}
                                >
                                    <div className={`w-11 h-11 rounded-xl ${getMethodBgColor(method.type)} flex items-center justify-center text-xl shrink-0`}>
                                        {method.icon}
                                    </div>
                                    <div>
                                        <h4 className="text-[0.9rem] font-semibold text-navy">
                                            {method.label}
                                        </h4>
                                        <p className="text-[0.8rem] text-grey-400">
                                            {method.description}
                                        </p>
                                    </div>
                                </a>
                            ))}
                        </div>

                        {/* Show message if no active methods */}
                        {activeMethods.length === 0 && (
                            <p className="text-grey-400 text-sm">
                                No contact methods available. Please check back later.
                            </p>
                        )}
                    </div>

                    {/* Right Side - Form */}
                    <div className="consult-right opacity-0 translate-y-[30px] transition-all duration-700">
                        <div className="bg-white rounded-2xl p-10 shadow-md border border-grey-100">
                            <ContactForm
                                formData={data.form}
                                formFields={data.formFields}
                                serviceOptions={serviceOptions}
                                className="w-full"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .consult-left.visible {
                    opacity: 1 !important;
                    transform: translateY(0) !important;
                }
                .consult-right.visible {
                    opacity: 1 !important;
                    transform: translateY(0) !important;
                }
            `}</style>
        </section>
    );
}