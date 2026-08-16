"use client";

import { useState, useEffect } from "react";
import {
    Save,
    Loader2,
    AlertCircle,
    CheckCircle,
    RefreshCw,
} from "lucide-react";
import { getCtaBanner, updateCtaBanner, resetCtaBanner } from "@/services/ctaBannerApi";
import { CtaBannerData } from "@/types/admin/ctaBanner";
import RichTextEditor from "@/components/admin/RichTextEditor";

// ============================================================
// DEFAULT DATA
// ============================================================
const defaultCtaBannerData: CtaBannerData = {
    tag: "Ready to Transform Your Business?",
    title: "Have an AI Idea or<br />Business Challenge?",
    description: "Share your requirement with our team. We will review your business challenge and contact you to discuss a practical AI solution.",
    button: {
        label: "Send Your Requirement",
        link: "/contact",
    },
    phone: {
        number: "8801XXXXXXXXX",
        label: "Chat on WhatsApp",
    },
    email: {
        address: "ai@ngenitltd.com",
        label: "Email Our AI Team",
    },
    isActive: true,
};

// ============================================================
// MAIN COMPONENT
// ============================================================
export default function CtaBannerPage() {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
    const [formData, setFormData] = useState<CtaBannerData>(defaultCtaBannerData);
    const [existingId, setExistingId] = useState<string | null>(null);

    // ============================================================
    // LOAD DATA
    // ============================================================
    useEffect(() => {
        const loadData = async () => {
            try {
                setLoading(true);
                const data = await getCtaBanner();
                setFormData(data);
                setExistingId(data._id || null);
            } catch (error) {
                console.error("Error loading CTA banner data:", error);
                setFormData(defaultCtaBannerData);
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
            const result = await updateCtaBanner(formData);
            setFormData(result);
            setExistingId(result._id || null);
            setSaveStatus("saved");
            setTimeout(() => setSaveStatus("idle"), 2000);
        } catch (err: any) {
            setError(err.message || "Failed to save CTA banner");
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
            const data = await resetCtaBanner();
            setFormData(data);
            setExistingId(data._id || null);
            setSaveStatus("saved");
            setTimeout(() => setSaveStatus("idle"), 2000);
        } catch (err: any) {
            setError(err.message || "Failed to reset CTA banner");
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
                    <p className="text-grey-400 mt-4">Loading CTA banner...</p>
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
                        CTA Banner
                    </h2>
                    <p className="text-grey-400 text-sm">
                        Manage the Call-to-Action banner section
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
                        placeholder="Ready to Transform Your Business?"
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
                        placeholder="Have an AI Idea or<br />Business Challenge?"
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
                        placeholder="Share your requirement with our team..."
                        height={150}
                    />
                </div>

                {/* Main Button */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-grey-100 pt-6">
                    <h3 className="col-span-full text-lg font-semibold text-navy font-plus-jakarta">
                        Main Button
                    </h3>
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
                            placeholder="Send Your Requirement"
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

                {/* Phone / WhatsApp */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-grey-100 pt-6">
                    <h3 className="col-span-full text-lg font-semibold text-navy font-plus-jakarta">
                        WhatsApp / Phone
                    </h3>
                    <div>
                        <label className="block text-sm font-semibold text-grey-800 mb-1.5">
                            WhatsApp Number *
                        </label>
                        <input
                            type="text"
                            value={formData.phone.number}
                            onChange={(e) =>
                                setFormData((prev) => ({
                                    ...prev,
                                    phone: { ...prev.phone, number: e.target.value },
                                }))
                            }
                            className="w-full px-4 py-3 rounded-lg border border-grey-200 focus:border-blue outline-none transition-all"
                            placeholder="8801XXXXXXXXX"
                            required
                        />
                        <p className="text-xs text-grey-400 mt-1">Include country code without +</p>
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-grey-800 mb-1.5">
                            WhatsApp Label *
                        </label>
                        <input
                            type="text"
                            value={formData.phone.label}
                            onChange={(e) =>
                                setFormData((prev) => ({
                                    ...prev,
                                    phone: { ...prev.phone, label: e.target.value },
                                }))
                            }
                            className="w-full px-4 py-3 rounded-lg border border-grey-200 focus:border-blue outline-none transition-all"
                            placeholder="Chat on WhatsApp"
                            required
                        />
                    </div>
                </div>

                {/* Email */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-grey-100 pt-6">
                    <h3 className="col-span-full text-lg font-semibold text-navy font-plus-jakarta">
                        Email
                    </h3>
                    <div>
                        <label className="block text-sm font-semibold text-grey-800 mb-1.5">
                            Email Address *
                        </label>
                        <input
                            type="email"
                            value={formData.email.address}
                            onChange={(e) =>
                                setFormData((prev) => ({
                                    ...prev,
                                    email: { ...prev.email, address: e.target.value },
                                }))
                            }
                            className="w-full px-4 py-3 rounded-lg border border-grey-200 focus:border-blue outline-none transition-all"
                            placeholder="ai@ngenitltd.com"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-grey-800 mb-1.5">
                            Email Label *
                        </label>
                        <input
                            type="text"
                            value={formData.email.label}
                            onChange={(e) =>
                                setFormData((prev) => ({
                                    ...prev,
                                    email: { ...prev.email, label: e.target.value },
                                }))
                            }
                            className="w-full px-4 py-3 rounded-lg border border-grey-200 focus:border-blue outline-none transition-all"
                            placeholder="Email Our AI Team"
                            required
                        />
                    </div>
                </div>

                {/* Active Toggle */}
                <div className="flex items-center gap-3 pt-6 border-t border-grey-100">
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