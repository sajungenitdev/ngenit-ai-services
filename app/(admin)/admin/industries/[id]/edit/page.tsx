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
    Plus,
    Trash2,
    GripVertical,
    RefreshCw,
} from "lucide-react";
import { getIndustryById, updateIndustry } from "@/services/industryApi";
import { IndustryData } from "@/types/admin/industry";
import RichTextEditor from "@/components/Admin/RichTextEditor";

// ============================================================
// TYPES
// ============================================================
interface IndustryFormData {
    icon: string;
    name: string;
    slug: string;
    short: string;
    long: string;
    challenges: string[];
    solutions: { title: string; description: string }[];
    focusAreas: string[];
    ctaText: string;
    ctaButtons: {
        primary: { label: string; link: string };
        secondary: { label: string; link: string };
    };
    metaTitle: string;
    metaDescription: string;
    featuredImage: string;
    isActive: boolean;
}

// ============================================================
// DEFAULT DATA
// ============================================================
const defaultIndustryData: IndustryFormData = {
    icon: "🏭",
    name: "",
    slug: "",
    short: "",
    long: "",
    challenges: [""],
    solutions: [{ title: "", description: "" }],
    focusAreas: [""],
    ctaText: "Don't see your industry listed?",
    ctaButtons: {
        primary: { label: "Discuss AI Solutions", link: "/contact" },
        secondary: { label: "💬 WhatsApp Us", link: "https://wa.me/8801XXXXXXXXX" },
    },
    metaTitle: "",
    metaDescription: "",
    featuredImage: "",
    isActive: true,
};

// ============================================================
// MAIN COMPONENT
// ============================================================
export default function EditIndustryPage() {
    const router = useRouter();
    const params = useParams();
    const industryId = params.id as string;

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
    const [formData, setFormData] = useState<IndustryFormData>(defaultIndustryData);
    const [activeTab, setActiveTab] = useState("content");

    // ============================================================
    // LOAD DATA
    // ============================================================
    useEffect(() => {
        const loadData = async () => {
            try {
                setLoading(true);
                const data = await getIndustryById(industryId);
                setFormData({
                    icon: data.icon || "🏭",
                    name: data.name || "",
                    slug: data.slug || "",
                    short: data.short || "",
                    long: data.long || "",
                    challenges: data.challenges?.length ? data.challenges : [""],
                    solutions: data.solutions?.length ? data.solutions : [{ title: "", description: "" }],
                    focusAreas: data.focusAreas?.length ? data.focusAreas : [""],
                    ctaText: data.ctaText || "Don't see your industry listed?",
                    ctaButtons: data.ctaButtons || {
                        primary: { label: "Discuss AI Solutions", link: "/contact" },
                        secondary: { label: "💬 WhatsApp Us", link: "https://wa.me/8801XXXXXXXXX" },
                    },
                    metaTitle: data.metaTitle || "",
                    metaDescription: data.metaDescription || "",
                    featuredImage: data.featuredImage || "",
                    isActive: data.isActive !== undefined ? data.isActive : true,
                });
            } catch (error) {
                console.error("Error loading industry:", error);
                setError("Failed to load industry data");
            } finally {
                setLoading(false);
            }
        };

        if (industryId) {
            loadData();
        }
    }, [industryId]);

    // ============================================================
    // HANDLERS
    // ============================================================
    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleLongDescriptionChange = (value: string) => {
        setFormData((prev) => ({ ...prev, long: value }));
    };

    const generateSlug = (name: string) => {
        return name
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-+|-+$/g, "");
    };

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.value;
        setFormData((prev) => ({
            ...prev,
            name,
            slug: generateSlug(name),
        }));
    };

    // Challenges
    const handleChallengeChange = (index: number, value: string) => {
        const newChallenges = formData.challenges.map((c, i) =>
            i === index ? value : c
        );
        setFormData((prev) => ({ ...prev, challenges: newChallenges }));
    };

    const addChallenge = () => {
        setFormData((prev) => ({
            ...prev,
            challenges: [...prev.challenges, ""],
        }));
    };

    const removeChallenge = (index: number) => {
        if (formData.challenges.length <= 1) return;
        setFormData((prev) => ({
            ...prev,
            challenges: prev.challenges.filter((_, i) => i !== index),
        }));
    };

    // Solutions
    const handleSolutionChange = (index: number, field: "title" | "description", value: string) => {
        const newSolutions = formData.solutions.map((s, i) =>
            i === index ? { ...s, [field]: value } : s
        );
        setFormData((prev) => ({ ...prev, solutions: newSolutions }));
    };

    const addSolution = () => {
        setFormData((prev) => ({
            ...prev,
            solutions: [...prev.solutions, { title: "", description: "" }],
        }));
    };

    const removeSolution = (index: number) => {
        if (formData.solutions.length <= 1) return;
        setFormData((prev) => ({
            ...prev,
            solutions: prev.solutions.filter((_, i) => i !== index),
        }));
    };

    // Focus Areas
    const handleFocusAreaChange = (index: number, value: string) => {
        const newFocusAreas = formData.focusAreas.map((f, i) =>
            i === index ? value : f
        );
        setFormData((prev) => ({ ...prev, focusAreas: newFocusAreas }));
    };

    const addFocusArea = () => {
        setFormData((prev) => ({
            ...prev,
            focusAreas: [...prev.focusAreas, ""],
        }));
    };

    const removeFocusArea = (index: number) => {
        if (formData.focusAreas.length <= 1) return;
        setFormData((prev) => ({
            ...prev,
            focusAreas: prev.focusAreas.filter((_, i) => i !== index),
        }));
    };

    // CTA
    const handleCTAChange = (
        button: "primary" | "secondary",
        field: "label" | "link",
        value: string
    ) => {
        setFormData((prev) => ({
            ...prev,
            ctaButtons: {
                ...prev.ctaButtons,
                [button]: {
                    ...prev.ctaButtons[button],
                    [field]: value,
                },
            },
        }));
    };

    const toggleActive = () => {
        setFormData((prev) => ({ ...prev, isActive: !prev.isActive }));
    };

    // ============================================================
    // SAVE HANDLER
    // ============================================================
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        setSaveStatus("saving");
        setError("");

        try {
            if (!formData.name.trim()) {
                throw new Error("Industry name is required");
            }
            if (!formData.short.trim()) {
                throw new Error("Short description is required");
            }
            if (!formData.long.trim()) {
                throw new Error("Long description is required");
            }
            if (!formData.slug.trim()) {
                throw new Error("Slug is required");
            }

            const filteredData = {
                ...formData,
                challenges: formData.challenges.filter((c) => c.trim()),
                solutions: formData.solutions.filter(
                    (s) => s.title.trim() && s.description.trim()
                ),
                focusAreas: formData.focusAreas.filter((f) => f.trim()),
            };

            await updateIndustry(industryId, filteredData);

            setSaveStatus("saved");
            setTimeout(() => {
                router.push("/admin/industries");
            }, 1000);
        } catch (err: any) {
            setError(err.message || "Failed to update industry");
            setSaveStatus("error");
        } finally {
            setSaving(false);
            setTimeout(() => setSaveStatus("idle"), 3000);
        }
    };

    // ============================================================
    // TABS
    // ============================================================
    const tabs = [
        { id: "content", label: "Content" },
        { id: "seo", label: "SEO & Media" },
    ];

    // ============================================================
    // LOADING STATE
    // ============================================================
    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-center">
                    <div className="w-12 h-12 border-4 border-cyan border-t-transparent rounded-full animate-spin mx-auto"></div>
                    <p className="text-grey-400 mt-4">Loading industry...</p>
                </div>
            </div>
        );
    }

    // ============================================================
    // RENDER
    // ============================================================
    return (
        <div className="max-w-5xl mx-auto space-y-6">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <button
                        onClick={() => router.push("/admin/industries")}
                        className="text-sm text-grey-400 hover:text-navy transition-colors flex items-center gap-1 mb-1"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Industries
                    </button>
                    <h2 className="text-2xl font-bold text-navy font-plus-jakarta">
                        Edit Industry
                    </h2>
                    <p className="text-grey-400 text-sm">
                        Update industry solution details
                    </p>
                </div>

                <div className="flex items-center gap-3 flex-wrap">
                    {/* Status Badge */}
                    <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                            formData.isActive
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                        }`}
                    >
                        {formData.isActive ? "Active" : "Inactive"}
                    </span>

                    {saveStatus === "saving" && (
                        <span className="text-sm text-grey-400 flex items-center gap-1">
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Saving...
                        </span>
                    )}
                    {saveStatus === "saved" && (
                        <span className="text-sm text-green-500 flex items-center gap-1">
                            <CheckCircle className="w-4 h-4" />
                            Saved
                        </span>
                    )}
                    {saveStatus === "error" && (
                        <span className="text-sm text-red-500 flex items-center gap-1">
                            <AlertCircle className="w-4 h-4" />
                            Error saving
                        </span>
                    )}

                    <button
                        type="submit"
                        form="industry-form"
                        disabled={saving}
                        className="px-6 py-2 bg-cyan text-navy rounded-lg font-semibold hover:bg-cyan-light transition-all duration-200 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {saving ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                Updating...
                            </>
                        ) : (
                            <>
                                <Save className="w-4 h-4" />
                                Update Industry
                            </>
                        )}
                    </button>
                </div>
            </div>

            {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg flex items-center gap-2">
                    <AlertCircle className="w-5 h-5" />
                    {error}
                </div>
            )}

            {/* Tabs */}
            <div className="border-b border-grey-200">
                <div className="flex gap-6 overflow-x-auto">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`py-3 px-1 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                                activeTab === tab.id
                                    ? "border-cyan text-cyan"
                                    : "border-transparent text-grey-400 hover:text-navy"
                            }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* ==================== FORM ==================== */}
            <form id="industry-form" onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-grey-100 p-6">
                {/* CONTENT TAB */}
                {activeTab === "content" && (
                    <div className="space-y-6">
                        {/* Basic Info */}
                        <div className="border-b border-grey-100 pb-6">
                            <h3 className="text-lg font-semibold text-navy font-plus-jakarta mb-4">
                                Basic Information
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-grey-800 mb-1.5">
                                        Icon
                                    </label>
                                    <input
                                        type="text"
                                        name="icon"
                                        value={formData.icon}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 rounded-lg border border-grey-200 focus:border-blue outline-none transition-all"
                                        placeholder="🏭"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-grey-800 mb-1.5">
                                        Industry Name *
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={handleNameChange}
                                        className="w-full px-4 py-3 rounded-lg border border-grey-200 focus:border-blue outline-none transition-all"
                                        placeholder="Oil & Gas"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-grey-800 mb-1.5">
                                    Slug *
                                </label>
                                <input
                                    type="text"
                                    name="slug"
                                    value={formData.slug}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 rounded-lg border border-grey-200 focus:border-blue outline-none transition-all"
                                    placeholder="oil-gas"
                                    required
                                />
                                <p className="text-xs text-grey-400 mt-1">
                                    URL-friendly name
                                </p>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-grey-800 mb-1.5">
                                    Short Description *
                                </label>
                                <input
                                    type="text"
                                    name="short"
                                    value={formData.short}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 rounded-lg border border-grey-200 focus:border-blue outline-none transition-all"
                                    placeholder="Pipeline monitoring, predictive maintenance, safety AI"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-grey-800 mb-1.5">
                                    Long Description *
                                </label>
                                <RichTextEditor
                                    value={formData.long}
                                    onChange={handleLongDescriptionChange}
                                    placeholder="Detailed description of the industry..."
                                    height={200}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-grey-800 mb-1.5">
                                    CTA Text
                                </label>
                                <input
                                    type="text"
                                    name="ctaText"
                                    value={formData.ctaText}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 rounded-lg border border-grey-200 focus:border-blue outline-none transition-all"
                                    placeholder="Don't see your industry listed?"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-grey-800 mb-1.5">
                                        Primary CTA Label
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.ctaButtons.primary.label}
                                        onChange={(e) => handleCTAChange("primary", "label", e.target.value)}
                                        className="w-full px-4 py-3 rounded-lg border border-grey-200 focus:border-blue outline-none transition-all"
                                        placeholder="Discuss AI Solutions"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-grey-800 mb-1.5">
                                        Primary CTA Link
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.ctaButtons.primary.link}
                                        onChange={(e) => handleCTAChange("primary", "link", e.target.value)}
                                        className="w-full px-4 py-3 rounded-lg border border-grey-200 focus:border-blue outline-none transition-all"
                                        placeholder="/contact"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-grey-800 mb-1.5">
                                        Secondary CTA Label
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.ctaButtons.secondary.label}
                                        onChange={(e) => handleCTAChange("secondary", "label", e.target.value)}
                                        className="w-full px-4 py-3 rounded-lg border border-grey-200 focus:border-blue outline-none transition-all"
                                        placeholder="💬 WhatsApp Us"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-grey-800 mb-1.5">
                                        Secondary CTA Link
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.ctaButtons.secondary.link}
                                        onChange={(e) => handleCTAChange("secondary", "link", e.target.value)}
                                        className="w-full px-4 py-3 rounded-lg border border-grey-200 focus:border-blue outline-none transition-all"
                                        placeholder="https://wa.me/8801XXXXXXXXX"
                                    />
                                </div>
                            </div>

                            <div className="flex items-center gap-3 mt-4">
                                <label className="text-sm font-semibold text-grey-800">
                                    Active
                                </label>
                                <button
                                    type="button"
                                    onClick={toggleActive}
                                    className={`relative w-12 h-6 rounded-full transition-colors ${
                                        formData.isActive ? "bg-cyan" : "bg-grey-300"
                                    }`}
                                >
                                    <span
                                        className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                                            formData.isActive ? "translate-x-6" : ""
                                        }`}
                                    />
                                </button>
                            </div>
                        </div>

                        {/* Challenges */}
                        <div className="border-b border-grey-100 pb-6">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold text-navy font-plus-jakarta">
                                    Key Challenges
                                </h3>
                                <button
                                    type="button"
                                    onClick={addChallenge}
                                    className="text-sm text-cyan hover:text-cyan-light font-medium flex items-center gap-1"
                                >
                                    <Plus className="w-4 h-4" />
                                    Add Challenge
                                </button>
                            </div>
                            <div className="space-y-3">
                                {formData.challenges.map((challenge, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center gap-3 border border-grey-100 rounded-lg p-3"
                                    >
                                        <span className="text-red-500 font-bold text-sm">!</span>
                                        <input
                                            type="text"
                                            value={challenge}
                                            onChange={(e) => handleChallengeChange(index, e.target.value)}
                                            className="flex-1 px-3 py-2 rounded-lg border border-grey-200 focus:border-blue outline-none transition-all"
                                            placeholder="Unplanned equipment downtime costing millions"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => removeChallenge(index)}
                                            className="text-red-400 hover:text-red-600 transition-colors"
                                            disabled={formData.challenges.length <= 1}
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Solutions */}
                        <div className="border-b border-grey-100 pb-6">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold text-navy font-plus-jakarta">
                                    AI Solutions
                                </h3>
                                <button
                                    type="button"
                                    onClick={addSolution}
                                    className="text-sm text-cyan hover:text-cyan-light font-medium flex items-center gap-1"
                                >
                                    <Plus className="w-4 h-4" />
                                    Add Solution
                                </button>
                            </div>
                            <div className="space-y-3">
                                {formData.solutions.map((solution, index) => (
                                    <div
                                        key={index}
                                        className="flex items-start gap-3 border border-grey-100 rounded-lg p-3"
                                    >
                                        <span className="text-cyan font-bold text-sm mt-2.5">✓</span>
                                        <div className="flex-1 space-y-2">
                                            <input
                                                type="text"
                                                value={solution.title}
                                                onChange={(e) => handleSolutionChange(index, "title", e.target.value)}
                                                className="w-full px-3 py-2 rounded-lg border border-grey-200 focus:border-blue outline-none transition-all"
                                                placeholder="Predictive Maintenance"
                                            />
                                            <input
                                                type="text"
                                                value={solution.description}
                                                onChange={(e) => handleSolutionChange(index, "description", e.target.value)}
                                                className="w-full px-3 py-2 rounded-lg border border-grey-200 focus:border-blue outline-none transition-all"
                                                placeholder="AI models predict equipment failures before they occur..."
                                            />
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => removeSolution(index)}
                                            className="text-red-400 hover:text-red-600 transition-colors mt-2"
                                            disabled={formData.solutions.length <= 1}
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Focus Areas */}
                        <div>
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold text-navy font-plus-jakarta">
                                    Focus Areas
                                </h3>
                                <button
                                    type="button"
                                    onClick={addFocusArea}
                                    className="text-sm text-cyan hover:text-cyan-light font-medium flex items-center gap-1"
                                >
                                    <Plus className="w-4 h-4" />
                                    Add Focus Area
                                </button>
                            </div>
                            <div className="space-y-3">
                                {formData.focusAreas.map((area, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center gap-3 border border-grey-100 rounded-lg p-3"
                                    >
                                        <span className="text-blue font-bold text-sm">#</span>
                                        <input
                                            type="text"
                                            value={area}
                                            onChange={(e) => handleFocusAreaChange(index, e.target.value)}
                                            className="flex-1 px-3 py-2 rounded-lg border border-grey-200 focus:border-blue outline-none transition-all"
                                            placeholder="Predictive Maintenance"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => removeFocusArea(index)}
                                            className="text-red-400 hover:text-red-600 transition-colors"
                                            disabled={formData.focusAreas.length <= 1}
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* SEO & MEDIA TAB */}
                {activeTab === "seo" && (
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-navy font-plus-jakarta mb-4">
                            SEO & Media
                        </h3>
                        <div>
                            <label className="block text-sm font-semibold text-grey-800 mb-1.5">
                                Meta Title
                            </label>
                            <input
                                type="text"
                                name="metaTitle"
                                value={formData.metaTitle}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 rounded-lg border border-grey-200 focus:border-blue outline-none transition-all"
                                placeholder="AI Solutions for Oil & Gas | NGEN IT"
                            />
                            <p className="text-xs text-grey-400 mt-1">
                                Recommended: 50-60 characters
                            </p>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-grey-800 mb-1.5">
                                Meta Description
                            </label>
                            <textarea
                                name="metaDescription"
                                value={formData.metaDescription}
                                onChange={handleInputChange}
                                rows={3}
                                className="w-full px-4 py-3 rounded-lg border border-grey-200 focus:border-blue outline-none transition-all resize-vertical"
                                placeholder="AI-driven pipeline monitoring, predictive maintenance..."
                            />
                            <p className="text-xs text-grey-400 mt-1">
                                Recommended: 150-160 characters
                            </p>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-grey-800 mb-1.5">
                                Featured Image URL
                            </label>
                            <input
                                type="text"
                                name="featuredImage"
                                value={formData.featuredImage}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 rounded-lg border border-grey-200 focus:border-blue outline-none transition-all"
                                placeholder="/images/industries/oil-gas.jpg"
                            />
                        </div>
                    </div>
                )}
            </form>
        </div>
    );
}