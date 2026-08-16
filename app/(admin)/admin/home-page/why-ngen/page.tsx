"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
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
import RichTextEditor from "@/components/admin/RichTextEditor";
import { getWhyNgen, updateWhyNgen, resetWhyNgen } from "@/services/whyNgenApi";
import { WhyNgenData, WhyFeature } from "@/types/admin/whyNgen";

// ============================================================
// DEFAULT DATA
// ============================================================
const defaultWhyNgenData: WhyNgenData = {
    tag: "Why NGEN IT",
    title: "Your Trusted AI Partner<br />from Strategy to Deployment",
    description: "We combine deep business consulting experience with technical AI expertise and local deployment capability — serving enterprise, government and industrial organizations across multiple markets.",
    button: {
        label: "Discuss Your Requirement",
        link: "/contact",
    },
    features: [
        {
            icon: "🏢",
            title: "Since 2009",
            description: "Established technology company with enterprise and government track record",
        },
        {
            icon: "🌍",
            title: "International Presence",
            description: "Operating across Bangladesh, UK, Singapore, Portugal and the Middle East",
        },
        {
            icon: "🤝",
            title: "Local Deployment",
            description: "Local teams for implementation, training and ongoing support",
        },
        {
            icon: "🔒",
            title: "Secure & Responsible AI",
            description: "Data privacy, governance and responsible AI built into every solution",
        },
    ],
    isActive: true,
};

// ============================================================
// MAIN COMPONENT
// ============================================================
export default function WhyNgenPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
    const [formData, setFormData] = useState<WhyNgenData>(defaultWhyNgenData);
    const [existingId, setExistingId] = useState<string | null>(null);

    // ============================================================
    // LOAD DATA
    // ============================================================
    useEffect(() => {
        const loadData = async () => {
            try {
                setLoading(true);
                const data = await getWhyNgen();
                setFormData(data);
                setExistingId(data._id || null);
            } catch (error) {
                console.error("Error loading why ngen data:", error);
                setFormData(defaultWhyNgenData);
                setExistingId(null);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, []);

    // Auto-save
    useEffect(() => {
        if (!loading && !saving && existingId) {
            const timer = setTimeout(() => {
                handleSave();
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [formData, loading, existingId]);

    // ============================================================
    // HANDLERS
    // ============================================================
    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleDescriptionChange = (value: string) => {
        setFormData((prev) => ({ ...prev, description: value }));
    };

    const handleFeatureChange = (index: number, field: keyof WhyFeature, value: string) => {
        const newFeatures = formData.features.map((f, i) =>
            i === index ? { ...f, [field]: value } : f
        );
        setFormData((prev) => ({ ...prev, features: newFeatures }));
    };

    const addFeature = () => {
        setFormData((prev) => ({
            ...prev,
            features: [
                ...prev.features,
                { icon: "🎯", title: "", description: "" },
            ],
        }));
    };

    const removeFeature = (index: number) => {
        if (formData.features.length <= 1) return;
        setFormData((prev) => ({
            ...prev,
            features: prev.features.filter((_, i) => i !== index),
        }));
    };

    const toggleActive = () => {
        setFormData((prev) => ({ ...prev, isActive: !prev.isActive }));
    };

    // ============================================================
    // SAVE HANDLER
    // ============================================================
    const handleSave = async () => {
        if (saving) return;

        setSaving(true);
        setSaveStatus("saving");
        setError("");

        try {
            const result = await updateWhyNgen(formData);
            setFormData(result);
            setExistingId(result._id || null);
            setSaveStatus("saved");
            setTimeout(() => setSaveStatus("idle"), 2000);
        } catch (err: any) {
            setError(err.message || "Failed to save why ngen");
            setSaveStatus("error");
            setTimeout(() => setSaveStatus("idle"), 3000);
        } finally {
            setSaving(false);
        }
    };

    // ============================================================
    // RESET HANDLER
    // ============================================================
    const handleReset = async () => {
        if (!confirm("Are you sure you want to reset to default values?")) return;

        setSaving(true);
        setSaveStatus("saving");
        setError("");

        try {
            const data = await resetWhyNgen();
            setFormData(data);
            setExistingId(data._id || null);
            setSaveStatus("saved");
            setTimeout(() => setSaveStatus("idle"), 2000);
        } catch (err: any) {
            setError(err.message || "Failed to reset why ngen");
            setSaveStatus("error");
            setTimeout(() => setSaveStatus("idle"), 3000);
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
                    <p className="text-grey-400 mt-4">Loading why ngen...</p>
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
                    <h2 className="text-2xl font-bold text-navy font-plus-jakarta">
                        Why NGEN IT
                    </h2>
                    <p className="text-grey-400 text-sm">
                        Manage the Why NGEN section
                    </p>
                </div>

                <div className="flex items-center gap-3 flex-wrap">
                    <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${formData.isActive
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
                        onClick={handleReset}
                        disabled={saving}
                        className="px-4 py-2 text-sm font-medium text-grey-600 hover:text-red-500 border border-grey-200 rounded-lg transition-colors flex items-center gap-2 disabled:opacity-50"
                    >
                        <RefreshCw className="w-4 h-4" />
                        Reset
                    </button>

                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className="px-6 py-2 bg-cyan text-navy rounded-lg font-semibold hover:bg-cyan-light transition-all duration-200 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {saving ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                Saving...
                            </>
                        ) : (
                            <>
                                <Save className="w-4 h-4" />
                                Save Changes
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

            {/* Form */}
            <div className="bg-white rounded-xl shadow-sm border border-grey-100 p-6 space-y-6">
                {/* Tag */}
                <div>
                    <label className="block text-sm font-semibold text-grey-800 mb-1.5">
                        Tag *
                    </label>
                    <input
                        type="text"
                        name="tag"
                        value={formData.tag}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-lg border border-grey-200 focus:border-blue outline-none transition-all"
                        placeholder="Why NGEN IT"
                        required
                    />
                </div>

                {/* Title */}
                <div>
                    <label className="block text-sm font-semibold text-grey-800 mb-1.5">
                        Title *
                    </label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-lg border border-grey-200 focus:border-blue outline-none transition-all"
                        placeholder="Your Trusted AI Partner<br />from Strategy to Deployment"
                        required
                    />
                    <p className="text-xs text-grey-400 mt-1">Use &lt;br /&gt; for line breaks</p>
                </div>

                {/* Description */}
                <div>
                    <label className="block text-sm font-semibold text-grey-800 mb-1.5">
                        Description *
                    </label>
                    <RichTextEditor
                        value={formData.description}
                        onChange={handleDescriptionChange}
                        placeholder="We combine deep business consulting experience with technical AI expertise..."
                        height={150}
                    />
                </div>

                {/* Button */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-semibold text-grey-800 mb-1.5">
                            Button Label *
                        </label>
                        <input
                            type="text"
                            value={formData.button.label}
                            onChange={(e) =>
                                setFormData((prev) => ({
                                    ...prev,
                                    button: { ...prev.button, label: e.target.value },
                                }))
                            }
                            className="w-full px-4 py-3 rounded-lg border border-grey-200 focus:border-blue outline-none transition-all"
                            placeholder="Discuss Your Requirement"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-grey-800 mb-1.5">
                            Button Link *
                        </label>
                        <input
                            type="text"
                            value={formData.button.link}
                            onChange={(e) =>
                                setFormData((prev) => ({
                                    ...prev,
                                    button: { ...prev.button, link: e.target.value },
                                }))
                            }
                            className="w-full px-4 py-3 rounded-lg border border-grey-200 focus:border-blue outline-none transition-all"
                            placeholder="/contact"
                            required
                        />
                    </div>
                </div>

                {/* Features */}
                <div>
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-navy font-plus-jakarta">
                            Features
                        </h3>
                        <button
                            type="button"
                            onClick={addFeature}
                            className="text-sm text-cyan hover:text-cyan-light font-medium flex items-center gap-1"
                        >
                            <Plus className="w-4 h-4" />
                            Add Feature
                        </button>
                    </div>
                    <div className="space-y-4">
                        {formData.features.map((feature, index) => (
                            <div
                                key={index}
                                className="border border-grey-100 rounded-lg p-4 hover:border-grey-200 transition-colors"
                            >
                                <div className="flex items-start gap-3">
                                    <GripVertical className="w-5 h-5 text-grey-300 cursor-move mt-2.5" />
                                    <div className="flex-1 space-y-3">
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                            <input
                                                type="text"
                                                value={feature.icon}
                                                onChange={(e) => handleFeatureChange(index, "icon", e.target.value)}
                                                className="px-3 py-2 rounded-lg border border-grey-200 focus:border-blue outline-none transition-all"
                                                placeholder="🏢"
                                            />
                                            <input
                                                type="text"
                                                value={feature.title}
                                                onChange={(e) => handleFeatureChange(index, "title", e.target.value)}
                                                className="px-3 py-2 rounded-lg border border-grey-200 focus:border-blue outline-none transition-all"
                                                placeholder="Since 2009"
                                            />
                                            <input
                                                type="text"
                                                value={feature.description}
                                                onChange={(e) => handleFeatureChange(index, "description", e.target.value)}
                                                className="px-3 py-2 rounded-lg border border-grey-200 focus:border-blue outline-none transition-all"
                                                placeholder="Established technology company..."
                                            />
                                        </div>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => removeFeature(index)}
                                        className="text-red-400 hover:text-red-600 transition-colors disabled:opacity-30"
                                        disabled={formData.features.length <= 1}
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    {formData.features.length <= 1 && (
                        <p className="text-xs text-grey-400 mt-2">
                            At least one feature is required
                        </p>
                    )}
                </div>

                {/* Active Toggle */}
                <div className="flex items-center gap-3 pt-2 border-t border-grey-100">
                    <label className="text-sm font-semibold text-grey-800">
                        Active
                    </label>
                    <button
                        type="button"
                        onClick={toggleActive}
                        className={`relative w-12 h-6 rounded-full transition-colors ${formData.isActive ? "bg-cyan" : "bg-grey-300"
                            }`}
                    >
                        <span
                            className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${formData.isActive ? "translate-x-6" : ""
                                }`}
                        />
                    </button>
                    <span className="text-sm text-grey-600">
                        {formData.isActive ? "Active" : "Inactive"}
                    </span>
                </div>
            </div>
        </div>
    );
}