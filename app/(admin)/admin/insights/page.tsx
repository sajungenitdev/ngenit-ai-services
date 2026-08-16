"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
    Plus,
    Search,
    Edit,
    Trash2,
    Eye,
    Newspaper,
    Loader2,
} from "lucide-react";
import { getInsights, deleteInsight, toggleInsightStatus } from "@/services/insightApi";
import { InsightData } from "@/types/admin/insight";
import toast from 'react-hot-toast';

export default function AdminInsightsPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [insights, setInsights] = useState<InsightData[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterCategory, setFilterCategory] = useState("all");
    const [categories, setCategories] = useState<string[]>([]);

    // ============================================================
    // FETCH INSIGHTS
    // ============================================================
    const fetchInsights = async () => {
        setLoading(true);
        try {
            const data = await getInsights();
            setInsights(data);
            
            // Extract unique categories
            const cats = [...new Set(data.map(i => i.cat))];
            setCategories(cats);
        } catch (error: any) {
            console.error("Error fetching insights:", error);
            toast.error(error.message || "Failed to load insights");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchInsights();
    }, []);

    // ============================================================
    // HANDLERS
    // ============================================================
    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this insight?")) return;

        try {
            await deleteInsight(id);
            toast.success("Insight deleted successfully");
            fetchInsights();
        } catch (error: any) {
            toast.error(error.message || "Failed to delete insight");
        }
    };

    const handleToggleStatus = async (id: string, currentStatus: boolean) => {
        try {
            const result = await toggleInsightStatus(id, !currentStatus);
            toast.success(`Insight ${result.isActive ? 'published' : 'unpublished'} successfully`);
            fetchInsights();
        } catch (error: any) {
            toast.error(error.message || "Failed to update status");
        }
    };

    // ============================================================
    // FILTER
    // ============================================================
    const filteredInsights = insights.filter((insight) => {
        const matchesSearch =
            insight.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            insight.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory =
            filterCategory === "all" || insight.cat === filterCategory;
        return matchesSearch && matchesCategory;
    });

    // ============================================================
    // LOADING STATE
    // ============================================================
    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-center">
                    <div className="w-12 h-12 border-4 border-cyan border-t-transparent rounded-full animate-spin mx-auto"></div>
                    <p className="text-grey-400 mt-4">Loading insights...</p>
                </div>
            </div>
        );
    }

    // ============================================================
    // RENDER
    // ============================================================
    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-navy font-plus-jakarta">
                        Insights & Blog
                    </h2>
                    <p className="text-grey-400 text-sm">
                        Manage all insights and blog articles
                    </p>
                </div>
                <Link
                    href="/admin/insights/create"
                    className="px-4 py-2 bg-cyan text-navy rounded-lg font-semibold hover:bg-cyan-light transition-all duration-200 flex items-center gap-2"
                >
                    <Plus className="w-4 h-4" />
                    Create Insight
                </Link>
            </div>

            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-grey-400" />
                    <input
                        type="text"
                        placeholder="Search insights..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-grey-200 focus:border-blue outline-none transition-all"
                    />
                </div>
                <select
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    className="px-4 py-2.5 rounded-lg border border-grey-200 focus:border-blue outline-none transition-all"
                >
                    <option value="all">All Categories</option>
                    {categories.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                    ))}
                </select>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white rounded-xl p-4 shadow-sm border border-grey-100">
                    <p className="text-grey-400 text-xs uppercase tracking-wide font-semibold">Total Insights</p>
                    <p className="text-2xl font-extrabold text-navy mt-1">{insights.length}</p>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-sm border border-grey-100">
                    <p className="text-grey-400 text-xs uppercase tracking-wide font-semibold">Categories</p>
                    <p className="text-2xl font-extrabold text-navy mt-1">{categories.length}</p>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-sm border border-grey-100">
                    <p className="text-grey-400 text-xs uppercase tracking-wide font-semibold">Published</p>
                    <p className="text-2xl font-extrabold text-navy mt-1">
                        {insights.filter(i => i.isActive).length}
                    </p>
                </div>
            </div>

            {/* Insights Grid */}
            {filteredInsights.length === 0 ? (
                <div className="bg-white rounded-xl shadow-sm border border-grey-100 p-12 text-center">
                    <Newspaper className="w-16 h-16 text-grey-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-navy mb-2">No insights found</h3>
                    <p className="text-grey-400 mb-4">
                        {searchTerm ? "Try adjusting your search terms" : "Get started by creating your first insight"}
                    </p>
                    {!searchTerm && (
                        <Link
                            href="/admin/insights/create"
                            className="inline-flex items-center gap-2 px-4 py-2 bg-cyan text-navy rounded-lg font-semibold hover:bg-cyan-light transition-colors"
                        >
                            <Plus className="w-4 h-4" />
                            Create Insight
                        </Link>
                    )}
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredInsights.map((insight) => (
                        <div
                            key={insight._id}
                            className="bg-white rounded-xl shadow-sm border border-grey-100 overflow-hidden hover:shadow-md transition-all duration-200 group"
                        >
                            <div className="h-32 bg-gradient-to-br from-navy-mid to-blue flex items-center justify-center text-5xl">
                                {insight.icon || '📄'}
                            </div>
                            <div className="p-5">
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="inline-block px-2.5 py-1 rounded-md bg-navy/5 text-navy-mid text-[0.7rem] font-semibold">
                                        {insight.cat}
                                    </span>
                                    <span className="text-grey-400 text-[0.7rem]">
                                        {insight.date} · {insight.read}
                                    </span>
                                </div>
                                <h3 className="text-[1rem] font-semibold text-navy mb-2 leading-snug font-plus-jakarta line-clamp-2">
                                    {insight.title}
                                </h3>
                                <p className="text-[0.85rem] text-grey-400 leading-relaxed line-clamp-2">
                                    {insight.excerpt}
                                </p>
                                <div className="flex items-center justify-between pt-3 mt-3 border-t border-grey-100">
                                    <button
                                        onClick={() => handleToggleStatus(insight._id!, insight.isActive!)}
                                        className={`px-2 py-0.5 rounded-full text-xs font-medium transition-colors ${
                                            insight.isActive
                                                ? "bg-green-100 text-green-700 hover:bg-green-200"
                                                : "bg-red-100 text-red-700 hover:bg-red-200"
                                        }`}
                                    >
                                        {insight.isActive ? "Published" : "Draft"}
                                    </button>
                                    <div className="flex items-center gap-1">
                                        <Link
                                            href={`/insights/${insight._id}`}
                                            target="_blank"
                                            className="p-1.5 text-grey-400 hover:text-cyan transition-colors"
                                        >
                                            <Eye className="w-4 h-4" />
                                        </Link>
                                        <Link
                                            href={`/admin/insights/${insight._id}/edit`}
                                            className="p-1.5 text-grey-400 hover:text-blue transition-colors"
                                        >
                                            <Edit className="w-4 h-4" />
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(insight._id!)}
                                            className="p-1.5 text-grey-400 hover:text-red-500 transition-colors"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}