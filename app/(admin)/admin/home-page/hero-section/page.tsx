"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
    Save,
    Eye,
    ArrowLeft,
    Loader2,
    AlertCircle,
    CheckCircle,
    RefreshCw,
    Trash2,
} from "lucide-react";
import { HeroData } from "@/types/admin/hero";
import HeroGeneralForm from "@/components/Admin/hero/HeroGeneralForm";
import HeroStatsForm from "@/components/Admin/hero/HeroStatsForm";
import HeroDashboardForm from "@/components/Admin/hero/HeroDashboardForm";
import HeroFloatingCardsForm from "@/components/Admin/hero/HeroFloatingCardsForm";
import HeroPreview from "@/components/Admin/hero/HeroPreview";
import {
    getHeroBanner,
    createHeroBanner,
    updateHeroBanner,
    resetHeroBanner,
    deleteHeroBanner,
} from "@/services/heroApi";

// ============================================================
// DEFAULT DATA
// ============================================================
const defaultHeroData: HeroData = {
    badge: "🚀 Practical AI for Business & Industry",
    title: "Practical AI Solutions for",
    highlightedText: "Business and Industry",
    subtitle:
        "We help organizations identify, develop and implement AI solutions that automate work, improve decision-making and create measurable operational value.",
    buttonPrimary: "Book an AI Consultation",
    buttonPrimaryLink: "/contact",
    buttonSecondary: "Explore AI Services",
    buttonSecondaryLink: "/services",
    stats: {
        years: { value: "16+", label: "Years of Experience" },
        markets: { value: "5", label: "International Markets" },
        partners: { value: "200+", label: "Business Partners" },
        clients: { value: "50+", label: "Enterprise Clients" },
    },
    dashboard: {
        title: "NGEN IT AI Platform",
        services: [
            { icon: "🧠", name: "AI Consulting", tag: "Strategy →" },
            { icon: "✨", name: "Generative AI", tag: "Deploy →" },
            { icon: "⚡", name: "Automation", tag: "Live →" },
            { icon: "📊", name: "Analytics", tag: "Insights →" },
        ],
        metrics: [
            { value: "40%", label: "Cost Reduction", trend: "↑ Avg. Result" },
            { value: "3x", label: "Faster Decisions", trend: "↑ Reported" },
            { value: "98%", label: "Client Satisfaction", trend: "↑ Ongoing" },
        ],
    },
    floatingCards: {
        left: "AI Automation Active",
        right: "New Enquiry Received",
    },
    isActive: true,
};

// ============================================================
// MAIN COMPONENT
// ============================================================
export default function HeroSectionPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState<HeroData>(defaultHeroData);
    const [activeTab, setActiveTab] = useState("general");
    const [showPreview, setShowPreview] = useState(false);
    const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
    const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
    const [existingId, setExistingId] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    // ============================================================
    // LOAD DATA FROM API
    // ============================================================
    useEffect(() => {
        const loadData = async () => {
            try {
                setLoading(true);
                const data = await getHeroBanner();
                setFormData(data);
                setExistingId(data._id || null);
                setErrorMessage(null);
            } catch (error: any) {
                console.error("Error loading hero data:", error);
                // If 404, it means no data exists yet - use defaults
                if (error.message?.includes('404') || error.message?.includes('not found')) {
                    setFormData(defaultHeroData);
                    setExistingId(null);
                    setErrorMessage("No hero banner found. Create one by saving.");
                } else {
                    setErrorMessage(error.message || "Failed to load hero data");
                }
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, []);

    // ============================================================
    // VALIDATION
    // ============================================================
    const validateForm = (): boolean => {
        const errors: Record<string, string> = {};

        if (!formData.badge.trim()) errors.badge = "Badge is required";
        if (!formData.title.trim()) errors.title = "Title is required";
        if (!formData.highlightedText.trim())
            errors.highlightedText = "Highlighted text is required";
        if (!formData.subtitle.trim()) errors.subtitle = "Subtitle is required";
        if (!formData.buttonPrimary.trim())
            errors.buttonPrimary = "Primary button text is required";
        if (!formData.buttonPrimaryLink.trim())
            errors.buttonPrimaryLink = "Primary button link is required";
        if (!formData.buttonSecondary.trim())
            errors.buttonSecondary = "Secondary button text is required";
        if (!formData.buttonSecondaryLink.trim())
            errors.buttonSecondaryLink = "Secondary button link is required";

        setValidationErrors(errors);
        return Object.keys(errors).length === 0;
    };

    // ============================================================
    // SAVE HANDLER - POST or PUT based on existingId
    // ============================================================
    const handleSave = async () => {
        if (saving) return;

        if (!validateForm()) {
            setSaveStatus("error");
            setTimeout(() => setSaveStatus("idle"), 3000);
            return;
        }

        setSaving(true);
        setSaveStatus("saving");
        setErrorMessage(null);

        try {
            let savedData: HeroData;

            if (existingId) {
                // Update existing
                savedData = await updateHeroBanner(formData);
                setSaveStatus("saved");
            } else {
                // Create new
                savedData = await createHeroBanner(formData);
                setExistingId(savedData._id || null);
                setSaveStatus("saved");
            }

            setFormData(savedData);
            setErrorMessage(null);

            setTimeout(() => setSaveStatus("idle"), 2000);
        } catch (error: any) {
            console.error("Error saving hero data:", error);
            setErrorMessage(error.message || "Failed to save hero banner");
            setSaveStatus("error");
            setTimeout(() => setSaveStatus("idle"), 3000);
        } finally {
            setSaving(false);
        }
    };

    // ============================================================
    // RESET TO DEFAULT
    // ============================================================
    const handleReset = async () => {
        if (!confirm("Are you sure you want to reset to default values?")) return;

        setSaving(true);
        setSaveStatus("saving");
        setErrorMessage(null);

        try {
            const data = await resetHeroBanner();
            setFormData(data);
            setExistingId(data._id || null);
            setSaveStatus("saved");
            setTimeout(() => setSaveStatus("idle"), 2000);
        } catch (error: any) {
            console.error("Error resetting hero data:", error);
            setErrorMessage(error.message || "Failed to reset hero banner");
            setSaveStatus("error");
            setTimeout(() => setSaveStatus("idle"), 3000);
        } finally {
            setSaving(false);
        }
    };

    // ============================================================
    // DELETE HERO BANNER
    // ============================================================
    const handleDelete = async () => {
        if (!confirm("Are you sure you want to delete the hero banner? This action cannot be undone.")) return;

        setSaving(true);
        setSaveStatus("saving");
        setErrorMessage(null);

        try {
            await deleteHeroBanner();
            setExistingId(null);
            setFormData(defaultHeroData);
            setSaveStatus("saved");
            setErrorMessage("Hero banner deleted. Create a new one by saving.");
            setTimeout(() => setSaveStatus("idle"), 2000);
        } catch (error: any) {
            console.error("Error deleting hero data:", error);
            setErrorMessage(error.message || "Failed to delete hero banner");
            setSaveStatus("error");
            setTimeout(() => setSaveStatus("idle"), 3000);
        } finally {
            setSaving(false);
        }
    };

    // ============================================================
    // Auto-save when data changes (only if not loading)
    // ============================================================
    useEffect(() => {
        if (!loading && !saving && existingId) {
            const timer = setTimeout(() => {
                // Auto-save only if validation passes
                if (validateForm()) {
                    handleSave();
                }
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [formData, loading, existingId]);

    // ============================================================
    // TABS CONFIG
    // ============================================================
    const tabs = [
        { id: "general", label: "General" },
        { id: "stats", label: "Stats" },
        { id: "dashboard", label: "Dashboard" },
        { id: "floating", label: "Floating Cards" },
    ];

    // ============================================================
    // RENDER
    // ============================================================
    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-center">
                    <div className="w-12 h-12 border-4 border-cyan border-t-transparent rounded-full animate-spin mx-auto"></div>
                    <p className="text-grey-400 mt-4">Loading hero section...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* ==================== PAGE HEADER ==================== */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <button
                        onClick={() => router.push("/admin/home-page")}
                        className="text-sm text-grey-400 hover:text-navy transition-colors flex items-center gap-1 mb-1"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Overview
                    </button>
                    <h2 className="text-2xl font-bold text-navy font-plus-jakarta">
                        Hero Section
                    </h2>
                    <p className="text-grey-400 text-sm">
                        {existingId ? "Edit the main hero section" : "Create the main hero section"}
                    </p>
                </div>

                <div className="flex items-center gap-3 flex-wrap">
                    {/* Status Indicator */}
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

                    {/* Delete Button (only if exists) */}
                    {existingId && (
                        <button
                            onClick={handleDelete}
                            disabled={saving}
                            className="px-4 py-2 text-sm font-medium text-red-500 hover:text-red-700 border border-red-200 hover:border-red-300 rounded-lg transition-colors flex items-center gap-2 disabled:opacity-50"
                        >
                            <Trash2 className="w-4 h-4" />
                            Delete
                        </button>
                    )}

                    <button
                        onClick={handleReset}
                        disabled={saving}
                        className="px-4 py-2 text-sm font-medium text-grey-600 hover:text-red-500 border border-grey-200 rounded-lg transition-colors flex items-center gap-2 disabled:opacity-50"
                    >
                        <RefreshCw className="w-4 h-4" />
                        Reset
                    </button>

                    <button
                        onClick={() => setShowPreview(!showPreview)}
                        className={`px-4 py-2 text-sm font-medium border rounded-lg transition-colors flex items-center gap-2 ${showPreview
                            ? "bg-cyan text-navy border-cyan"
                            : "text-grey-600 hover:text-navy border-grey-200"
                            }`}
                    >
                        <Eye className="w-4 h-4" />
                        {showPreview ? "Hide Preview" : "Preview"}
                    </button>

                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className="px-6 py-2 bg-cyan text-navy rounded-lg font-semibold hover:bg-cyan-light transition-all duration-200 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {saving ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                {existingId ? "Updating..." : "Creating..."}
                            </>
                        ) : (
                            <>
                                <Save className="w-4 h-4" />
                                {existingId ? "Update" : "Create"}
                            </>
                        )}
                    </button>
                </div>
            </div>

            {/* Error Message */}
            {errorMessage && (
                <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-3 rounded-lg flex items-center gap-2">
                    <AlertCircle className="w-5 h-5" />
                    {errorMessage}
                </div>
            )}

            {/* ==================== TABS ==================== */}
            <div className="border-b border-grey-200">
                <div className="flex gap-6 overflow-x-auto">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`py-3 px-1 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${activeTab === tab.id
                                ? "border-cyan text-cyan"
                                : "border-transparent text-grey-400 hover:text-navy"
                                }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* ==================== CONTENT ==================== */}
            <div className="grid grid-cols-1 gap-6">
                {/* Form */}
                <div className="bg-white rounded-xl shadow-sm border border-grey-100 p-6">
                    {activeTab === "general" && (
                        <HeroGeneralForm
                            data={formData}
                            onChange={setFormData}
                            errors={validationErrors}
                        />
                    )}
                    {activeTab === "stats" && (
                        <HeroStatsForm data={formData} onChange={setFormData} />
                    )}
                    {activeTab === "dashboard" && (
                        <HeroDashboardForm data={formData} onChange={setFormData} />
                    )}
                    {activeTab === "floating" && (
                        <HeroFloatingCardsForm data={formData} onChange={setFormData} />
                    )}
                </div>

                {/* ==================== PREVIEW ==================== */}
                {showPreview && <HeroPreview data={formData} />}
            </div>
        </div>
    );
}