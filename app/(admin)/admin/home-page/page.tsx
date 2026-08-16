"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
    Home,
    Layout,
    Award,
    FileText,
    Settings,
    CheckCircle,
    AlertCircle,
    Clock,
    ArrowRight,
} from "lucide-react";

interface SectionStatus {
    id: string;
    name: string;
    icon: React.ReactNode;
    href: string;
    status: "published" | "draft" | "needs-review";
    lastUpdated: string;
}

export default function HomePageOverview() {
    const [sections, setSections] = useState<SectionStatus[]>([
        {
            id: "hero",
            name: "Hero Section",
            icon: <Home className="w-5 h-5" />,
            href: "/admin/home-page/hero-section",
            status: "published",
            lastUpdated: "2 hours ago",
        },
        {
            id: "trust-bar",
            name: "Trust Bar",
            icon: <Award className="w-5 h-5" />,
            href: "/admin/home-page/trust-bar",
            status: "draft",
            lastUpdated: "5 days ago",
        },
        {
            id: "footer",
            name: "Footer",
            icon: <FileText className="w-5 h-5" />,
            href: "/admin/home-page/footer",
            status: "published",
            lastUpdated: "1 day ago",
        },
    ]);

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "published":
                return (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                        <CheckCircle className="w-3 h-3" />
                        Published
                    </span>
                );
            case "draft":
                return (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">
                        <Clock className="w-3 h-3" />
                        Draft
                    </span>
                );
            case "needs-review":
                return (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
                        <AlertCircle className="w-3 h-3" />
                        Needs Review
                    </span>
                );
            default:
                return null;
        }
    };

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div>
                <h2 className="text-2xl font-bold text-navy font-plus-jakarta">
                    Home Page Overview
                </h2>
                <p className="text-grey-400 text-sm">
                    Manage all sections of your homepage
                </p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white rounded-xl p-5 shadow-sm border border-grey-100">
                    <p className="text-grey-400 text-xs uppercase tracking-wide font-semibold">
                        Total Sections
                    </p>
                    <p className="text-2xl font-extrabold text-navy mt-1">
                        {sections.length}
                    </p>
                    <div className="w-full h-1 rounded-full bg-blue-500 mt-3"></div>
                </div>
                <div className="bg-white rounded-xl p-5 shadow-sm border border-grey-100">
                    <p className="text-grey-400 text-xs uppercase tracking-wide font-semibold">
                        Published
                    </p>
                    <p className="text-2xl font-extrabold text-navy mt-1">
                        {sections.filter(s => s.status === "published").length}
                    </p>
                    <div className="w-full h-1 rounded-full bg-green-500 mt-3"></div>
                </div>
                <div className="bg-white rounded-xl p-5 shadow-sm border border-grey-100">
                    <p className="text-grey-400 text-xs uppercase tracking-wide font-semibold">
                        Needs Attention
                    </p>
                    <p className="text-2xl font-extrabold text-navy mt-1">
                        {sections.filter(s => s.status === "draft" || s.status === "needs-review").length}
                    </p>
                    <div className="w-full h-1 rounded-full bg-yellow-500 mt-3"></div>
                </div>
            </div>

            {/* Sections List */}
            <div className="bg-white rounded-xl shadow-sm border border-grey-100 overflow-hidden">
                <div className="px-6 py-4 border-b border-grey-100">
                    <h3 className="text-lg font-bold text-navy font-plus-jakarta">
                        All Sections
                    </h3>
                </div>
                <div className="divide-y divide-grey-100">
                    {sections.map((section) => (
                        <div
                            key={section.id}
                            className="px-6 py-4 flex items-center justify-between hover:bg-off-white/50 transition-colors"
                        >
                            <div className="flex items-center gap-4">
                                <div className="p-2 rounded-lg bg-cyan/10 text-cyan">
                                    {section.icon}
                                </div>
                                <div>
                                    <h4 className="text-sm font-semibold text-navy">
                                        {section.name}
                                    </h4>
                                    <p className="text-xs text-grey-400">
                                        Last updated: {section.lastUpdated}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                {getStatusBadge(section.status)}
                                <Link
                                    href={section.href}
                                    className="text-sm text-cyan hover:text-cyan-light font-medium flex items-center gap-1"
                                >
                                    Edit
                                    <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}