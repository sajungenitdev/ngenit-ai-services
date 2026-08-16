"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { getContactPage } from "@/services/contactPageApi";
import { 
    ContactPageData, 
    ServiceOption, 
    ContactMethod 
} from "@/types/admin/contactPage"; // Add ContactMethod
import ContactForm from "@/components/Home/ConsultSection/ContactForm";

export default function ContactPage() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [data, setData] = useState<ContactPageData | null>(null);
    const [loading, setLoading] = useState(true);
    const [serviceOptions, setServiceOptions] = useState<ServiceOption[]>([]);

    // ============================================================
    // FETCH CONTACT PAGE DATA
    // ============================================================
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const result = await getContactPage();
                setData(result);
                setServiceOptions(result.serviceOptions || []);
            } catch (error) {
                console.error("Error fetching contact page:", error);
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
    }, [loading]);

    // ============================================================
    // HELPER FUNCTIONS
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

    const getLinkTarget = (type: string) => {
        return type === 'whatsapp' ? '_blank' : undefined;
    };

    // ============================================================
    // LOADING STATE
    // ============================================================
    if (loading) {
        return (
            <div className="min-h-screen bg-navy flex items-center justify-center">
                <div className="text-center">
                    <div className="w-12 h-12 border-4 border-cyan border-t-transparent rounded-full animate-spin mx-auto"></div>
                    <p className="text-white/60 mt-4">Loading contact page...</p>
                </div>
            </div>
        );
    }

    if (!data || !data.isActive) {
        return (
            <div className="min-h-screen bg-navy flex items-center justify-center">
                <p className="text-white/60">Contact page is currently inactive.</p>
            </div>
        );
    }

    // Filter active contact methods and sort by order
    const activeMethods = data.contactMethods
        .filter((method: ContactMethod) => method.isActive)
        .sort((a: ContactMethod, b: ContactMethod) => a.order - b.order);

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
                        <span className="text-white/80">Contact / Consult Us</span>
                    </div>

                    <span className="inline-block px-3.5 py-1.5 rounded-full text-[0.78rem] font-semibold tracking-wide uppercase bg-cyan/15 text-cyan">
                        {data.hero.tag}
                    </span>
                    <h1 
                        className="text-white text-[clamp(2rem,4vw,2.9rem)] font-extrabold font-plus-jakarta leading-[1.15] mt-4"
                        dangerouslySetInnerHTML={{ __html: data.hero.title }}
                    />
                    <p className="text-white/60 text-[1.05rem] max-w-[640px] leading-relaxed mt-4">
                        {data.hero.description}
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
                                {activeMethods.length === 0 ? (
                                    <p className="text-grey-400 text-sm">
                                        No contact methods available. Please check back later.
                                    </p>
                                ) : (
                                    activeMethods.map((method: ContactMethod, index: number) => (
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
                                    ))
                                )}
                            </div>
                        </div>

                        {/* Right Side - Form */}
                        <div className="contact-right opacity-0 translate-y-[30px] transition-all duration-700">
                            <div className="bg-white rounded-2xl p-10 shadow-md border border-grey-100">
                                <ContactForm
                                    formData={data.form}
                                    formFields={data.formFields}
                                    serviceOptions={serviceOptions}
                                    className="w-full"
                                    onSuccess={() => {
                                        console.log('Form submitted successfully!');
                                    }}
                                    onError={(error) => {
                                        console.error('Form submission error:', error);
                                    }}
                                />
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
                                Ready to Transform<br />Your Business with AI?
                            </h2>
                            <p className="text-white/60 text-[1rem] mt-3 max-w-[460px] leading-relaxed">
                                Let's discuss how our AI solutions can help you achieve your goals.
                            </p>
                        </div>
                        <div className="flex flex-col gap-3 min-w-[200px] w-full lg:w-auto">
                            <Link
                                href="/services"
                                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-[8px] font-semibold text-[0.95rem] border-2 border-transparent transition-all duration-200 whitespace-nowrap bg-cyan text-navy shadow-[0_4px_20px_rgba(0,194,203,0.3)] hover:bg-cyan-light hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(0,194,203,0.4)]"
                            >
                                Explore Our Services
                            </Link>
                            <Link
                                href="/solutions"
                                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-[8px] font-semibold text-[0.95rem] border-2 border-transparent transition-all duration-200 whitespace-nowrap bg-transparent text-white border-white/40 hover:bg-white/10 hover:border-white"
                            >
                                View AI Solutions →
                            </Link>
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