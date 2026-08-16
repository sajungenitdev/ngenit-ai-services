"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import {
    Save,
    ArrowLeft,
    Loader2,
    AlertCircle,
    CheckCircle,
} from "lucide-react";
import RichTextEditor from "@/components/Admin/RichTextEditor";
import { getInsightById, updateInsight } from "@/services/insightApi";
import toast from 'react-hot-toast';

const categories = [
    "AI Strategy",
    "Generative AI",
    "Industrial AI",
    "Governance",
    "Computer Vision",
    "AI Agents",
    "Machine Learning",
    "Data Analytics",
    "Automation",
    "Industry News",
];

export default function EditInsightPage() {
    const router = useRouter();
    const params = useParams();
    const id = params.id as string;

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const [formData, setFormData] = useState({
        icon: "",
        cat: "",
        date: "",
        read: "",
        title: "",
        excerpt: "",
        content: "",
        image: "",
        isActive: true,
    });

    // ============================================================
    // FETCH INSIGHT
    // ============================================================
    useEffect(() => {
        const fetchInsight = async () => {
            try {
                setLoading(true);
                const data = await getInsightById(id);
                setFormData({
                    icon: data.icon || "🧠",
                    cat: data.cat || "",
                    date: data.date || "",
                    read: data.read || "",
                    title: data.title || "",
                    excerpt: data.excerpt || "",
                    content: data.content || "",
                    image: data.image || "",
                    isActive: data.isActive !== undefined ? data.isActive : true,
                });
            } catch (error: any) {
                console.error("Error fetching insight:", error);
                setError(error.message || "Failed to load insight");
                toast.error(error.message || "Failed to load insight");
            } finally {
                setLoading(false);
            }
        };

        fetchInsight();
    }, [id]);

    // ============================================================
    // HANDLERS
    // ============================================================
    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleContentChange = (value: string) => {
        setFormData((prev) => ({ ...prev, content: value }));
    };

    // ============================================================
    // SUBMIT HANDLER
    // ============================================================
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        setError("");

        try {
            if (!formData.title.trim()) throw new Error("Title is required");
            if (!formData.cat) throw new Error("Category is required");
            if (!formData.excerpt.trim()) throw new Error("Excerpt is required");
            if (!formData.content.trim()) throw new Error("Content is required");

            await updateInsight(id, formData);
            toast.success("Insight updated successfully!");
            router.push("/admin/insights");
        } catch (err: any) {
            setError(err.message || "Failed to update insight");
            toast.error(err.message || "Failed to update insight");
        } finally {
            setSaving(false);
        }
    };

    // ============================================================
    // LOADING STATE
    // ============================================================
    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-center">
                    <div className="w-12 h-12 border-4 border-cyan border-t-transparent rounded-full animate-spin mx-auto"></div>
                    <p className="text-grey-400 mt-4">Loading insight...</p>
                </div>
            </div>
        );
    }

    // ============================================================
    // RENDER
    // ============================================================
    return (
        <div className="max-w-5xl mx-auto space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <button
                        onClick={() => router.push("/admin/insights")}
                        className="text-sm text-grey-400 hover:text-navy transition-colors flex items-center gap-1 mb-1"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Insights
                    </button>
                    <h2 className="text-2xl font-bold text-navy font-plus-jakarta">
                        Edit Insight
                    </h2>
                    <p className="text-grey-400 text-sm">Update the insight or blog article</p>
                </div>

                <button
                    type="submit"
                    form="insight-form"
                    disabled={saving}
                    className="px-6 py-2 bg-cyan text-navy rounded-lg font-semibold hover:bg-cyan-light transition-all duration-200 flex items-center gap-2 disabled:opacity-50"
                >
                    {saving ? (
                        <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Saving...
                        </>
                    ) : (
                        <>
                            <Save className="w-4 h-4" />
                            Update Insight
                        </>
                    )}
                </button>
            </div>

            {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg flex items-center gap-2">
                    <AlertCircle className="w-5 h-5" />
                    {error}
                </div>
            )}

            <form id="insight-form" onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-grey-100 p-6 space-y-6">
                <div className="border-b border-grey-100 pb-6">
                    <h3 className="text-lg font-semibold text-navy font-plus-jakarta mb-4">Basic Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-grey-800 mb-1.5">Icon/Emoji</label>
                            <input
                                type="text"
                                name="icon"
                                value={formData.icon}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 rounded-lg border border-grey-200 focus:border-blue outline-none transition-all"
                                placeholder="🧠"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-grey-800 mb-1.5">Category *</label>
                            <select
                                name="cat"
                                value={formData.cat}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 rounded-lg border border-grey-200 focus:border-blue outline-none transition-all"
                                required
                            >
                                <option value="">Select Category</option>
                                {categories.map((cat) => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <div>
                            <label className="block text-sm font-semibold text-grey-800 mb-1.5">Date</label>
                            <input
                                type="text"
                                name="date"
                                value={formData.date}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 rounded-lg border border-grey-200 focus:border-blue outline-none transition-all"
                                placeholder="Jul 2026"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-grey-800 mb-1.5">Read Time</label>
                            <input
                                type="text"
                                value={formData.read || "Auto-calculated"}
                                disabled
                                className="w-full px-4 py-3 rounded-lg border border-grey-200 bg-off-white text-grey-400 cursor-not-allowed"
                            />
                        </div>
                    </div>

                    <div className="mt-4">
                        <label className="block text-sm font-semibold text-grey-800 mb-1.5">Title *</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 rounded-lg border border-grey-200 focus:border-blue outline-none transition-all"
                            placeholder="How to Build an AI Roadmap..."
                            required
                        />
                    </div>

                    <div className="mt-4">
                        <label className="block text-sm font-semibold text-grey-800 mb-1.5">Excerpt / Summary *</label>
                        <textarea
                            name="excerpt"
                            value={formData.excerpt}
                            onChange={handleInputChange}
                            rows={2}
                            className="w-full px-4 py-3 rounded-lg border border-grey-200 focus:border-blue outline-none transition-all resize-vertical"
                            placeholder="A practical framework for prioritizing AI use cases..."
                            required
                        />
                    </div>

                    <div className="flex items-center gap-3 mt-4">
                        <label className="text-sm font-semibold text-grey-800">Published</label>
                        <button
                            type="button"
                            onClick={() => setFormData((prev) => ({ ...prev, isActive: !prev.isActive }))}
                            className={`relative w-12 h-6 rounded-full transition-colors ${formData.isActive ? "bg-cyan" : "bg-grey-300"}`}
                        >
                            <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${formData.isActive ? "translate-x-6" : ""}`} />
                        </button>
                    </div>
                </div>

                <div>
                    <h3 className="text-lg font-semibold text-navy font-plus-jakarta mb-4">Full Content *</h3>
                    <p className="text-sm text-grey-400 mb-3">Write the full article with rich formatting</p>
                    <RichTextEditor
                        value={formData.content}
                        onChange={handleContentChange}
                        placeholder="Write your full article content here..."
                        height={300}
                    />
                </div>
            </form>
        </div>
    );
}