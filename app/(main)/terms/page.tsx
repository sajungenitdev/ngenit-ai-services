"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface TermsConditions {
    _id?: string;
    title: string;
    content: string;
    version: number;
    publishedAt?: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export default function TermsConditionsPage() {
    const [policy, setPolicy] = useState<TermsConditions | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchPolicy();
    }, []);

    const fetchPolicy = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${API_URL}/terms-conditions/public`);
            const data = await response.json();

            if (data.success && data.data) {
                setPolicy(data.data);
            } else {
                setError("Terms & Conditions not found");
            }
        } catch (error) {
            console.error("Error fetching terms:", error);
            setError("Failed to load terms & conditions");
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
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-12 h-12 border-4 border-cyan border-t-transparent rounded-full animate-spin mx-auto"></div>
                    <p className="text-gray-500 mt-4">Loading terms & conditions...</p>
                </div>
            </div>
        );
    }

    if (error || !policy) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="text-6xl mb-4">📜</div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Terms & Conditions Not Found</h2>
                    <p className="text-gray-500">{error || "Content not available."}</p>
                    <button
                        onClick={fetchPolicy}
                        className="mt-4 px-6 py-2 bg-cyan text-navy rounded-lg font-semibold hover:bg-cyan-light transition"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <section className="relative bg-navy pt-40 pb-16 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy-mid to-navy">
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_80%_20%,rgba(0,194,203,0.18)_0%,transparent_60%)]"></div>
                </div>
                <div className="container max-w-[1200px] mx-auto px-6 md:px-8 relative z-10">
                    <div className="flex items-center gap-2 text-white/40 text-sm mb-5 flex-wrap">
                        <Link href="/" className="hover:text-cyan transition-colors">Home</Link>
                        <span>/</span>
                        <span className="text-white/80">Terms & Conditions</span>
                    </div>
                    <span className="inline-block px-3.5 py-1.5 rounded-full text-[0.78rem] font-semibold tracking-wide uppercase bg-cyan/15 text-cyan">
                        Legal
                    </span>
                    <h1 className="text-white text-[clamp(2rem,4vw,2.9rem)] font-extrabold font-plus-jakarta leading-[1.15] mt-4">
                        {policy.title || "Terms & Conditions"}
                    </h1>
                    <p className="text-white/60 text-[1.05rem] max-w-[640px] leading-relaxed mt-4">
                        Read the terms and conditions that govern your use of NGEN IT's services and website.
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
                        <div
                            dangerouslySetInnerHTML={{ __html: policy.content }}
                            className="policy-content"
                        />

                        <div className="mt-8 p-6 text-black bg-off-white rounded-xl border border-grey-200">
                            <p className="text-sm text-grey-500">
                                These Terms & Conditions were last updated on{" "}
                                <strong>
                                    {policy.publishedAt ? new Date(policy.publishedAt).toLocaleDateString("en-US", {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                    }) : currentDate}
                                </strong>
                                {policy.version > 1 && ` (Version ${policy.version})`}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <style jsx global>{`
                .policy-content h2 {
                    font-size: 1.5rem;
                    font-weight: 700;
                    color: #1a3a8f;
                    margin-top: 2rem;
                    margin-bottom: 1rem;
                }
                .policy-content h3 {
                    font-size: 1.25rem;
                    font-weight: 600;
                    color: #1a3a8f;
                    margin-top: 1.5rem;
                    margin-bottom: 0.75rem;
                }
                .policy-content p {
                    color: #1a1a1a;
                    line-height: 1.8;
                    margin-bottom: 1rem;
                }
                .policy-content ul {
                    color: #4a4a4a;
                    padding-left: 1.5rem;
                    margin-bottom: 1rem;
                }
                .policy-content ul li {
                    margin-bottom: 0.5rem;
                }
                .policy-content a {
                    color: #00c2cb;
                    text-decoration: underline;
                }
                .policy-content a:hover {
                    color: #00d4de;
                }
                .policy-content strong {
                    color: #1a3a8f;
                }
            `}</style>
        </div>
    );
}