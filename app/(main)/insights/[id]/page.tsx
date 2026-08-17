"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { getInsightById } from "@/services/insightApi";
import { InsightData } from "@/types/admin/insight";
import { Calendar, Clock, Tag, ArrowLeft, Share2, Copy, Check } from "lucide-react";
import toast from 'react-hot-toast';

export default function InsightDetailPage() {
    const params = useParams();
    const id = params.id as string;

    const [insight, setInsight] = useState<InsightData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);

    // ============================================================
    // FETCH INSIGHT
    // ============================================================
    useEffect(() => {
        const fetchInsight = async () => {
            try {
                setLoading(true);
                setError(null);
                const data = await getInsightById(id);

                // Check if insight is active
                if (!data.isActive) {
                    setError("This insight is currently not available.");
                    return;
                }

                setInsight(data);
            } catch (error: any) {
                console.error("Error fetching insight:", error);
                setError(error.message || "Failed to load insight");
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchInsight();
        }
    }, [id]);

    // ============================================================
    // COPY LINK
    // ============================================================
    const copyLink = () => {
        const url = window.location.href;
        navigator.clipboard.writeText(url).then(() => {
            setCopied(true);
            toast.success("Link copied to clipboard!");
            setTimeout(() => setCopied(false), 2000);
        }).catch(() => {
            toast.error("Failed to copy link");
        });
    };

    // ============================================================
    // SHARE
    // ============================================================
    const shareOnSocial = (platform: string) => {
        const url = window.location.href;
        const title = insight?.title || "Check out this insight";
        let shareUrl = "";

        switch (platform) {
            case "linkedin":
                shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
                break;
            case "twitter":
                shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;
                break;
            case "facebook":
                shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
                break;
            default:
                return;
        }

        window.open(shareUrl, "_blank", "width=600,height=400");
    };

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
                            <div className="h-4 w-16 bg-white/20 rounded skeleton-pulse"></div>
                            <span className="text-white/20">/</span>
                            <div className="h-4 w-20 bg-white/20 rounded skeleton-pulse"></div>
                        </div>

                        {/* Badge Skeleton */}
                        <div className="h-7 w-32 bg-white/10 rounded-full mb-4 skeleton-pulse"></div>

                        {/* Title Skeleton */}
                        <div className="space-y-3 mt-4 max-w-[900px]">
                            <div className="h-10 md:h-14 w-3/4 bg-white/15 rounded-lg skeleton-pulse"></div>
                            <div className="h-10 md:h-14 w-1/2 bg-white/15 rounded-lg skeleton-pulse"></div>
                        </div>

                        {/* Meta Skeleton */}
                        <div className="flex flex-wrap items-center gap-4 mt-5">
                            <div className="h-5 w-24 bg-white/10 rounded skeleton-pulse"></div>
                            <div className="h-5 w-20 bg-white/10 rounded skeleton-pulse"></div>
                            <div className="h-5 w-28 bg-white/10 rounded skeleton-pulse"></div>
                        </div>
                    </div>
                </section>

                {/* Content Skeleton */}
                <section className="py-12 md:py-16 bg-white">
                    <div className="container max-w-[800px] mx-auto px-6 md:px-8">
                        <div className="space-y-6">
                            {/* Icon Skeleton */}
                            <div className="flex justify-center">
                                <div className="w-32 h-32 bg-grey-200 rounded-2xl skeleton-pulse"></div>
                            </div>

                            {/* Excerpt Skeleton */}
                            <div className="p-6 bg-off-white rounded-xl border-l-4 border-grey-200 space-y-2">
                                <div className="h-4 w-full bg-grey-100 rounded skeleton-pulse"></div>
                                <div className="h-4 w-5/6 bg-grey-100 rounded skeleton-pulse"></div>
                                <div className="h-4 w-4/5 bg-grey-100 rounded skeleton-pulse"></div>
                            </div>

                            {/* Content Skeleton */}
                            <div className="space-y-4">
                                <div className="h-8 w-48 bg-grey-200 rounded skeleton-pulse"></div>
                                <div className="space-y-2">
                                    <div className="h-4 w-full bg-grey-100 rounded skeleton-pulse"></div>
                                    <div className="h-4 w-full bg-grey-100 rounded skeleton-pulse"></div>
                                    <div className="h-4 w-5/6 bg-grey-100 rounded skeleton-pulse"></div>
                                    <div className="h-4 w-4/5 bg-grey-100 rounded skeleton-pulse"></div>
                                    <div className="h-4 w-full bg-grey-100 rounded skeleton-pulse"></div>
                                    <div className="h-4 w-3/4 bg-grey-100 rounded skeleton-pulse"></div>
                                </div>
                            </div>

                            {/* Share Skeleton */}
                            <div className="mt-12 pt-8 border-t border-grey-100">
                                <div className="flex flex-wrap items-center justify-between gap-4">
                                    <div className="flex items-center gap-4">
                                        <div className="h-4 w-12 bg-grey-200 rounded skeleton-pulse"></div>
                                        {[1, 2, 3, 4].map((i) => (
                                            <div key={i} className="w-9 h-9 bg-grey-200 rounded-lg skeleton-pulse"></div>
                                        ))}
                                    </div>
                                    <div className="h-9 w-32 bg-grey-200 rounded skeleton-pulse"></div>
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
                                <div className="h-8 w-80 bg-white/10 rounded-lg skeleton-pulse"></div>
                                <div className="h-8 w-56 bg-white/10 rounded-lg skeleton-pulse"></div>
                                <div className="h-4 w-72 bg-white/10 rounded skeleton-pulse"></div>
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

    // ============================================================
    // ERROR STATE
    // ============================================================
    if (error || !insight) {
        return (
            <div className="min-h-screen bg-white">
                <section className="relative bg-navy pt-40 pb-20 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy-mid to-navy">
                        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_80%_20%,rgba(0,194,203,0.18)_0%,transparent_60%)]"></div>
                    </div>
                    <div className="container max-w-[1200px] mx-auto px-6 md:px-8 relative z-10">
                        <div className="flex items-center gap-2 text-white/40 text-sm mb-5 flex-wrap">
                            <Link href="/" className="hover:text-cyan transition-colors">Home</Link>
                            <span>/</span>
                            <Link href="/insights" className="hover:text-cyan transition-colors">Insights</Link>
                        </div>
                        <h1 className="text-white text-3xl font-extrabold font-plus-jakarta leading-[1.15] mt-4">
                            Insight Not Found
                        </h1>
                        <p className="text-white/60 text-lg max-w-[640px] leading-relaxed mt-4">
                            {error || "The insight you're looking for doesn't exist or has been removed."}
                        </p>
                        <Link
                            href="/insights"
                            className="inline-flex items-center gap-2 mt-6 px-6 py-3 bg-cyan text-navy rounded-lg font-semibold hover:bg-cyan-light transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Back to Insights
                        </Link>
                    </div>
                </section>
            </div>
        );
    }

    // ============================================================
    // RENDER
    // ============================================================
    return (
        <div className="min-h-screen bg-white">
            {/* ==================== HERO ==================== */}
            <section className="relative bg-navy pt-40 pb-16 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy-mid to-navy">
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_80%_20%,rgba(0,194,203,0.18)_0%,transparent_60%)]"></div>
                </div>
                <div className="container max-w-[1200px] mx-auto px-6 md:px-8 relative z-10">
                    {/* Breadcrumb */}
                    <div className="flex items-center gap-2 text-white/40 text-sm mb-5 flex-wrap">
                        <Link href="/" className="hover:text-cyan transition-colors">Home</Link>
                        <span>/</span>
                        <Link href="/insights" className="hover:text-cyan transition-colors">Insights</Link>
                        <span>/</span>
                        <span className="text-white/80">{insight.cat}</span>
                    </div>

                    {/* Category Badge */}
                    <span className="inline-block px-3.5 py-1.5 rounded-full text-[0.78rem] font-semibold tracking-wide uppercase bg-cyan/15 text-cyan">
                        {insight.cat}
                    </span>

                    {/* Title */}
                    <h1 className="text-white text-[clamp(2rem,4vw,3.2rem)] font-extrabold font-plus-jakarta leading-[1.15] mt-4 max-w-[900px]">
                        {insight.title}
                    </h1>

                    {/* Meta Info */}
                    <div className="flex flex-wrap items-center gap-4 mt-5 text-white/60 text-sm">
                        <span className="flex items-center gap-1.5">
                            <Calendar className="w-4 h-4" />
                            {insight.date}
                        </span>
                        <span className="flex items-center gap-1.5">
                            <Clock className="w-4 h-4" />
                            {insight.read}
                        </span>
                        <span className="flex items-center gap-1.5">
                            <Tag className="w-4 h-4" />
                            {insight.cat}
                        </span>
                    </div>
                </div>
            </section>

            {/* ==================== CONTENT ==================== */}
            <section className="py-12 md:py-16 bg-white">
                <div className="container max-w-[800px] mx-auto px-6 md:px-8">
                    {/* Feature Image / Icon */}
                    {insight.icon && (
                        <div className="mb-8 flex justify-center">
                            <div className="w-32 h-32 bg-gradient-to-br from-navy-mid to-blue rounded-2xl flex items-center justify-center text-6xl shadow-lg">
                                {insight.icon}
                            </div>
                        </div>
                    )}

                    {/* Excerpt */}
                    <div className="mb-8 p-6 bg-off-white rounded-xl border-l-4 border-cyan">
                        <p className="text-[1.05rem] text-black leading-relaxed italic">
                            {insight.excerpt}
                        </p>
                    </div>

                    {/* Full Content */}
                    <div
                        className="prose prose-lg prose-grey text-black max-w-none prose-headings:text-navy prose-headings:font-plus-jakarta prose-a:text-cyan prose-a:no-underline hover:prose-a:underline prose-strong:text-navy prose-ul:text-grey-600 prose-ol:text-grey-600 prose-blockquote:border-cyan prose-blockquote:bg-off-white prose-blockquote:p-4 prose-blockquote:rounded-lg"
                        dangerouslySetInnerHTML={{ __html: insight.content }}
                    />

                    {/* ==================== SHARE & ACTIONS ==================== */}
                    <div className="mt-12 pt-8 border-t border-grey-100">
                        <div className="flex flex-wrap items-center justify-between gap-4">
                            <div className="flex items-center gap-4">
                                <span className="text-sm font-semibold text-grey-600">Share:</span>
                                <button
                                    onClick={() => shareOnSocial("linkedin")}
                                    className="p-2 bg-off-white rounded-lg hover:bg-cyan/10 transition-colors"
                                    aria-label="Share on LinkedIn"
                                >
                                    <svg className="w-5 h-5 text-navy" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                    </svg>
                                </button>
                                <button
                                    onClick={() => shareOnSocial("twitter")}
                                    className="p-2 bg-off-white rounded-lg hover:bg-cyan/10 transition-colors"
                                    aria-label="Share on Twitter/X"
                                >
                                    <svg className="w-5 h-5 text-navy" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                    </svg>
                                </button>
                                <button
                                    onClick={() => shareOnSocial("facebook")}
                                    className="p-2 bg-off-white rounded-lg hover:bg-cyan/10 transition-colors"
                                    aria-label="Share on Facebook"
                                >
                                    <svg className="w-5 h-5 text-navy" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                    </svg>
                                </button>
                                <button
                                    onClick={copyLink}
                                    className="p-2 bg-off-white rounded-lg hover:bg-cyan/10 transition-colors flex items-center gap-1.5"
                                    aria-label="Copy link"
                                >
                                    {copied ? (
                                        <>
                                            <Check className="w-4 h-4 text-green-500" />
                                            <span className="text-xs text-green-500">Copied!</span>
                                        </>
                                    ) : (
                                        <>
                                            <Copy className="w-4 h-4 text-navy" />
                                            <span className="text-xs text-grey-600">Copy Link</span>
                                        </>
                                    )}
                                </button>
                            </div>

                            {/* Back Button */}
                            <Link
                                href="/insights"
                                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-grey-600 hover:text-navy transition-colors"
                            >
                                <ArrowLeft className="w-4 h-4" />
                                Back to Insights
                            </Link>
                        </div>
                    </div>

                    {/* ==================== RELATED / NAVIGATION ==================== */}
                    <div className="mt-8 pt-8 border-t border-grey-100">
                        <div className="flex flex-col sm:flex-row justify-between gap-4">
                            <div>
                                <p className="text-xs text-grey-400 uppercase font-semibold tracking-wider">Category</p>
                                <Link
                                    href={`/insights?category=${encodeURIComponent(insight.cat)}`}
                                    className="text-cyan hover:underline font-medium"
                                >
                                    {insight.cat}
                                </Link>
                            </div>
                            <div className="text-right">
                                <p className="text-xs text-grey-400 uppercase font-semibold tracking-wider">Published</p>
                                <p className="text-sm text-grey-600">{insight.date}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ==================== BOTTOM CTA ==================== */}
            <section className="py-16 md:py-20 relative overflow-hidden bg-gradient-to-br from-navy-mid via-navy-light to-[#1a3a8f]">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_80%_50%,rgba(0,194,203,0.18)_0%,transparent_60%)]"></div>
                <div className="container max-w-[1200px] mx-auto px-6 md:px-8 relative z-10">
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                        <div className="text-center lg:text-left">
                            <h2 className="font-plus-jakarta font-bold text-[clamp(1.5rem,2.5vw,2.2rem)] leading-[1.15] text-white max-w-[560px]">
                                Have a Question About<br />a Specific AI Topic?
                            </h2>
                            <p className="text-white/60 text-[1rem] mt-3 max-w-[460px] leading-relaxed">
                                Our team is happy to talk through your specific situation — no article required.
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
                                href="mailto:ai@ngenitltd.com"
                                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-[8px] font-semibold text-[0.95rem] border-2 border-transparent transition-all duration-200 whitespace-nowrap bg-transparent text-white border-white/40 hover:bg-white/10 hover:border-white"
                            >
                                Email Our AI Team
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}