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
    }, [loading]);

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
    // LOADING STATE
    // ============================================================
    if (loading) {
        return (
            <section className="py-24 md:py-32 bg-off-white" id="consult" ref={sectionRef}>
                <div className="container max-w-[1200px] mx-auto px-6 md:px-8">
                    <div className="text-center">
                        <div className="w-12 h-12 border-4 border-cyan border-t-transparent rounded-full animate-spin mx-auto"></div>
                        <p className="text-grey-400 mt-4">Loading...</p>
                    </div>
                </div>
            </section>
        );
    }

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
                                serviceOptions={[]} // You can pass service options here if needed
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