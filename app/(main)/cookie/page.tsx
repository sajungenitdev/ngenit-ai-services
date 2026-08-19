"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface CookiePolicy {
    _id?: string;
    title: string;
    content: string;
    version: number;
    publishedAt?: string;
    lastUpdated?: string;
}

// API Base URL from environment
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export default function CookiePolicyPage() {
    const [policy, setPolicy] = useState<CookiePolicy | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchPolicy();
    }, []);

    const fetchPolicy = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${API_URL}/cookie-policy/public`);
            const data = await response.json();

            if (data.success && data.data) {
                setPolicy(data.data);
            } else {
                setError("Cookie policy not found");
            }
        } catch (error) {
            console.error("Error fetching cookie policy:", error);
            setError("Failed to load cookie policy");
        } finally {
            setLoading(false);
        }
    };

    const currentDate = new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    if (loading) {
        return (
            <>
                {/* Page Hero */}
                <section className="relative bg-navy pt-40 pb-16 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy-mid to-navy">
                        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_80%_20%,rgba(0,194,203,0.18)_0%,transparent_60%)]"></div>
                    </div>
                    <div className="container max-w-[1200px] mx-auto px-6 md:px-8 relative z-10">
                        <div className="flex items-center gap-2 text-white/40 text-sm mb-5 flex-wrap">
                            <Link href="/" className="hover:text-cyan transition-colors">Home</Link>
                            <span>/</span>
                            <span className="text-white/80">Cookie Policy</span>
                        </div>
                        <span className="inline-block px-3.5 py-1.5 rounded-full text-[0.78rem] font-semibold tracking-wide uppercase bg-cyan/15 text-cyan">
                            Legal
                        </span>
                        <h1 className="text-white text-[clamp(2rem,4vw,2.9rem)] font-extrabold font-plus-jakarta leading-[1.15] mt-4">
                            Cookie Policy
                        </h1>
                        <p className="text-white/60 text-[1.05rem] max-w-[640px] leading-relaxed mt-4">
                            Loading cookie policy content...
                        </p>
                    </div>
                </section>

                {/* Loading Content */}
                <section className="py-16 md:py-24 bg-white">
                    <div className="container max-w-[1200px] mx-auto px-6 md:px-8">
                        <div className="flex justify-center items-center min-h-[400px]">
                            <div className="text-center">
                                <div className="w-12 h-12 border-4 border-cyan border-t-transparent rounded-full animate-spin mx-auto"></div>
                                <p className="text-gray-500 mt-4">Loading cookie policy...</p>
                            </div>
                        </div>
                    </div>
                </section>
            </>
        );
    }

    if (error || !policy) {
        return (
            <>
                {/* Page Hero */}
                <section className="relative bg-navy pt-40 pb-16 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy-mid to-navy">
                        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_80%_20%,rgba(0,194,203,0.18)_0%,transparent_60%)]"></div>
                    </div>
                    <div className="container max-w-[1200px] mx-auto px-6 md:px-8 relative z-10">
                        <div className="flex items-center gap-2 text-white/40 text-sm mb-5 flex-wrap">
                            <Link href="/" className="hover:text-cyan transition-colors">Home</Link>
                            <span>/</span>
                            <span className="text-white/80">Cookie Policy</span>
                        </div>
                        <span className="inline-block px-3.5 py-1.5 rounded-full text-[0.78rem] font-semibold tracking-wide uppercase bg-cyan/15 text-cyan">
                            Legal
                        </span>
                        <h1 className="text-white text-[clamp(2rem,4vw,2.9rem)] font-extrabold font-plus-jakarta leading-[1.15] mt-4">
                            Cookie Policy
                        </h1>
                    </div>
                </section>

                {/* Error Content */}
                <section className="py-16 md:py-24 bg-white">
                    <div className="container max-w-[1200px] mx-auto px-6 md:px-8">
                        <div className="text-center py-12">
                            <div className="text-6xl mb-4">🍪</div>
                            <h2 className="text-2xl font-bold text-gray-800 mb-2">Cookie Policy Not Found</h2>
                            <p className="text-gray-500">{error || "The cookie policy content is not available."}</p>
                            <button
                                onClick={fetchPolicy}
                                className="mt-4 px-6 py-2 bg-cyan text-navy rounded-lg font-semibold hover:bg-cyan-light transition"
                            >
                                Retry
                            </button>
                        </div>
                    </div>
                </section>
            </>
        );
    }

    return (
        <>
            {/* Page Hero */}
            <section className="relative bg-navy pt-40 pb-16 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy-mid to-navy">
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_80%_20%,rgba(0,194,203,0.18)_0%,transparent_60%)]"></div>
                </div>
                <div className="container max-w-[1200px] mx-auto px-6 md:px-8 relative z-10">
                    {/* Breadcrumb */}
                    <div className="flex items-center gap-2 text-white/40 text-sm mb-5 flex-wrap">
                        <Link href="/" className="hover:text-cyan transition-colors">Home</Link>
                        <span>/</span>
                        <span className="text-white/80">Cookie Policy</span>
                    </div>

                    <span className="inline-block px-3.5 py-1.5 rounded-full text-[0.78rem] font-semibold tracking-wide uppercase bg-cyan/15 text-cyan">
                        Legal
                    </span>
                    <h1 className="text-white text-[clamp(2rem,4vw,2.9rem)] font-extrabold font-plus-jakarta leading-[1.15] mt-4">
                        {policy.title || "Cookie Policy"}
                    </h1>
                    <p className="text-white/60 text-[1.05rem] max-w-[640px] leading-relaxed mt-4">
                        Learn about how NGEN IT uses cookies to enhance your browsing experience and protect your privacy.
                    </p>
                    <p className="text-white/40 text-sm mt-2">
                        Last Updated: {policy.publishedAt ? new Date(policy.publishedAt).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                        }) : currentDate}
                        {policy.version > 1 && ` · Version ${policy.version}`}
                    </p>
                </div>
            </section>

            {/* Content */}
            <section className="py-16 md:py-24 bg-white">
                <div className="container max-w-[1200px] mx-auto px-6 md:px-8">
                    <div className="prose prose-lg prose-grey max-w-none">
                        {/* Dynamic Content from API */}
                        <div
                            dangerouslySetInnerHTML={{ __html: policy.content }}
                            className="cookie-policy-content"
                        />

                        {/* Footer Note */}
                        <div className="mt-8 p-6 text-black bg-off-white rounded-xl border border-grey-200">
                            <p className="text-sm text-grey-500">
                                This Cookie Policy was last updated on{" "}
                                <strong>
                                    {policy.publishedAt ? new Date(policy.publishedAt).toLocaleDateString("en-US", {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                    }) : currentDate}
                                </strong>
                                {policy.version > 1 && ` (Version ${policy.version})`}
                            </p>
                            <p className="text-sm text-grey-500 mt-2">
                                By continuing to use our website, you consent to our use of cookies
                                as described in this policy.
                            </p>
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
                                Have Questions About<br />Our Policies?
                            </h2>
                            <p className="text-white/60 text-[1rem] mt-3 max-w-[460px] leading-relaxed">
                                Our team is here to help. Reach out to us with any questions or concerns.
                            </p>
                        </div>
                        <div className="flex flex-col gap-3 min-w-[200px] w-full lg:w-auto">
                            <Link
                                href="/contact"
                                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-[8px] font-semibold text-[0.95rem] border-2 border-transparent transition-all duration-200 whitespace-nowrap bg-cyan text-navy shadow-[0_4px_20px_rgba(0,194,203,0.3)] hover:bg-cyan-light hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(0,194,203,0.4)]"
                            >
                                Contact Us
                            </Link>
                            <Link
                                href="/privacy-policy"
                                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-[8px] font-semibold text-[0.95rem] border-2 border-transparent transition-all duration-200 whitespace-nowrap bg-transparent text-white border-white/40 hover:bg-white/10 hover:border-white"
                            >
                                View Privacy Policy →
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Styles for dynamic content */}
            <style jsx global>{`
                .cookie-policy-content h2 {
                    font-size: 1.5rem;
                    font-weight: 700;
                    color: #1a3a8f;
                    margin-top: 2rem;
                    margin-bottom: 1rem;
                    font-family: 'Plus Jakarta Sans', sans-serif;
                }
                .cookie-policy-content h3 {
                    font-size: 1.25rem;
                    font-weight: 600;
                    color: #1a3a8f;
                    margin-top: 1.5rem;
                    margin-bottom: 0.75rem;
                    font-family: 'Plus Jakarta Sans', sans-serif;
                }
                .cookie-policy-content p {
                    color: #1a1a1a;
                    line-height: 1.8;
                    margin-bottom: 1rem;
                }
                .cookie-policy-content ul {
                    color: #4a4a4a;
                    padding-left: 1.5rem;
                    margin-bottom: 1rem;
                }
                .cookie-policy-content ul li {
                    margin-bottom: 0.5rem;
                }
                .cookie-policy-content a {
                    color: #00c2cb;
                    text-decoration: underline;
                }
                .cookie-policy-content a:hover {
                    color: #00d4de;
                }
                .cookie-policy-content strong {
                    color: #1a3a8f;
                }
            `}</style>
        </>
    );
}