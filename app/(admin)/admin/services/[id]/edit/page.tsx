"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import {
    Save,
    ArrowLeft,
    Loader2,
    Plus,
    Trash2,
    GripVertical,
    AlertCircle,
    CheckCircle,
    RefreshCw,
} from "lucide-react";
import RichTextEditor from "@/components/Admin/RichTextEditor";
import { getServiceById, updateService } from "@/services/serviceApi";
import { ServiceData } from "@/types/admin/service";

// ============================================================
// DEFAULT DATA
// ============================================================
const defaultServiceData: ServiceData = {
    icon: "🧠",
    name: "",
    tagline: "",
    summary: "",
    description: "",
    capabilities: [""],
    benefits: [{ label: "", description: "" }],
    useCases: [""],
    ctaButtons: {
        primary: { label: "Book a Free Consultation", link: "/contact" },
        secondary: { label: "💬 WhatsApp Us", link: "https://wa.me/8801XXXXXXXXX" },
    },
    isActive: true,
};

// ============================================================
// MAIN COMPONENT
// ============================================================
export default function EditServicePage() {
    const router = useRouter();
    const params = useParams();
    const serviceId = params.id as string;

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
    const [formData, setFormData] = useState<ServiceData>(defaultServiceData);
    const [activeTab, setActiveTab] = useState("general");

    // ============================================================
    // LOAD DATA
    // ============================================================
    useEffect(() => {
        const loadData = async () => {
            try {
                setLoading(true);
                const data = await getServiceById(serviceId);
                // Ensure all fields exist
                setFormData({
                    ...defaultServiceData,
                    ...data,
                    capabilities: data.capabilities?.length ? data.capabilities : [""],
                    benefits: data.benefits?.length ? data.benefits : [{ label: "", description: "" }],
                    useCases: data.useCases?.length ? data.useCases : [""],
                });
            } catch (error) {
                console.error("Error loading service:", error);
                setError("Failed to load service data");
            } finally {
                setLoading(false);
            }
        };

        if (serviceId) {
            loadData();
        }
    }, [serviceId]);

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

    // Capabilities
    const handleCapabilityChange = (index: number, value: string) => {
        const newCapabilities = formData.capabilities.map((c, i) =>
            i === index ? value : c
        );
        setFormData((prev) => ({ ...prev, capabilities: newCapabilities }));
    };

    const addCapability = () => {
        setFormData((prev) => ({
            ...prev,
            capabilities: [...prev.capabilities, ""],
        }));
    };

    const removeCapability = (index: number) => {
        if (formData.capabilities.length <= 1) return;
        setFormData((prev) => ({
            ...prev,
            capabilities: prev.capabilities.filter((_, i) => i !== index),
        }));
    };

    // Benefits
    const handleBenefitChange = (index: number, field: "label" | "description", value: string) => {
        const newBenefits = formData.benefits.map((b, i) =>
            i === index ? { ...b, [field]: value } : b
        );
        setFormData((prev) => ({ ...prev, benefits: newBenefits }));
    };

    const addBenefit = () => {
        setFormData((prev) => ({
            ...prev,
            benefits: [...prev.benefits, { label: "", description: "" }],
        }));
    };

    const removeBenefit = (index: number) => {
        if (formData.benefits.length <= 1) return;
        setFormData((prev) => ({
            ...prev,
            benefits: prev.benefits.filter((_, i) => i !== index),
        }));
    };

    // Use Cases
    const handleUseCaseChange = (index: number, value: string) => {
        const newUseCases = formData.useCases.map((u, i) =>
            i === index ? value : u
        );
        setFormData((prev) => ({ ...prev, useCases: newUseCases }));
    };

    const addUseCase = () => {
        setFormData((prev) => ({
            ...prev,
            useCases: [...prev.useCases, ""],
        }));
    };

    const removeUseCase = (index: number) => {
        if (formData.useCases.length <= 1) return;
        setFormData((prev) => ({
            ...prev,
            useCases: prev.useCases.filter((_, i) => i !== index),
        }));
    };

    // CTA Buttons
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

    // Toggle Active Status
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
            // Validate required fields
            if (!formData.name.trim()) {
                throw new Error("Service name is required");
            }
            if (!formData.tagline.trim()) {
                throw new Error("Tagline is required");
            }
            if (!formData.summary.trim()) {
                throw new Error("Summary is required");
            }
            if (!formData.description.trim()) {
                throw new Error("Description is required");
            }

            // Filter out empty values
            const filteredData = {
                ...formData,
                capabilities: formData.capabilities.filter((c) => c.trim()),
                benefits: formData.benefits.filter((b) => b.label.trim() && b.description.trim()),
                useCases: formData.useCases.filter((u) => u.trim()),
            };

            await updateService(serviceId, filteredData);

            setSaveStatus("saved");
            setTimeout(() => {
                router.push("/admin/services");
            }, 1000);
        } catch (err: any) {
            setError(err.message || "Failed to update service");
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
        { id: "general", label: "General" },
        { id: "cta", label: "CTA Buttons" },
        { id: "benefits", label: "Benefits" },
        { id: "capabilities", label: "Capabilities" },
        { id: "usecases", label: "Use Cases" },
    ];

    // ============================================================
    // LOADING STATE
    // ============================================================
    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-center">
                    <div className="w-12 h-12 border-4 border-cyan border-t-transparent rounded-full animate-spin mx-auto"></div>
                    <p className="text-grey-400 mt-4">Loading service...</p>
                </div>
            </div>
        );
    }

    // ============================================================
    // RENDER
    // ============================================================
    return (
        <div className="max-w-5xl mx-auto space-y-6">
            {/* ==================== PAGE HEADER ==================== */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <button
                        onClick={() => router.push("/admin/services")}
                        className="text-sm text-grey-400 hover:text-navy transition-colors flex items-center gap-1 mb-1"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Services
                    </button>
                    <h2 className="text-2xl font-bold text-navy font-plus-jakarta">
                        Edit Service
                    </h2>
                    <p className="text-grey-400 text-sm">
                        Update the AI service details
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
                        form="service-form"
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
                                Update Service
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

            {/* ==================== TABS ==================== */}
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
            <form id="service-form" onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-grey-100 p-6">
                {/* General Tab */}
                {activeTab === "general" && (
                    <div className="space-y-4">
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
                                    placeholder="🧠"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-grey-800 mb-1.5">
                                    Service Name *
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 rounded-lg border border-grey-200 focus:border-blue outline-none transition-all"
                                    placeholder="AI Consulting & Strategy"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-grey-800 mb-1.5">
                                Tagline *
                            </label>
                            <input
                                type="text"
                                name="tagline"
                                value={formData.tagline}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 rounded-lg border border-grey-200 focus:border-blue outline-none transition-all"
                                placeholder="From AI ambition to actionable roadmap"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-grey-800 mb-1.5">
                                Summary *
                            </label>
                            <input
                                type="text"
                                name="summary"
                                value={formData.summary}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 rounded-lg border border-grey-200 focus:border-blue outline-none transition-all"
                                placeholder="AI readiness assessments, roadmap development..."
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-grey-800 mb-1.5">
                                Description *
                            </label>
                            <p className="text-sm text-grey-400 mb-3">
                                Use the rich text editor to format your service description
                            </p>
                            <RichTextEditor
                                value={formData.description}
                                onChange={handleDescriptionChange}
                                placeholder="We help leadership teams cut through AI hype and build a practical, prioritized roadmap..."
                                height={200}
                            />
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
                )}

                {/* CTA Buttons Tab */}
                {activeTab === "cta" && (
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-navy font-plus-jakarta mb-4">
                            Call-to-Action Buttons
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-grey-800 mb-1.5">
                                    Primary Button Label
                                </label>
                                <input
                                    type="text"
                                    value={formData.ctaButtons.primary.label}
                                    onChange={(e) => handleCTAChange("primary", "label", e.target.value)}
                                    className="w-full px-4 py-3 rounded-lg border border-grey-200 focus:border-blue outline-none transition-all"
                                    placeholder="Book a Free Consultation"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-grey-800 mb-1.5">
                                    Primary Button Link
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
                                    Secondary Button Label
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
                                    Secondary Button Link
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
                    </div>
                )}

                {/* Benefits Tab */}
                {activeTab === "benefits" && (
                    <div className="space-y-4">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-navy font-plus-jakarta">
                                Benefits / Stats
                            </h3>
                            <button
                                type="button"
                                onClick={addBenefit}
                                className="text-sm text-cyan hover:text-cyan-light font-medium flex items-center gap-1"
                            >
                                <Plus className="w-4 h-4" />
                                Add Benefit
                            </button>
                        </div>
                        <p className="text-sm text-grey-400 mb-4">
                            Key metrics and benefits displayed on the service page
                        </p>
                        <div className="space-y-3">
                            {formData.benefits.map((benefit, index) => (
                                <div
                                    key={index}
                                    className="flex items-center gap-3 border border-grey-100 rounded-lg p-3 hover:border-grey-200 transition-colors"
                                >
                                    <GripVertical className="w-5 h-5 text-grey-300 cursor-move" />
                                    <input
                                        type="text"
                                        value={benefit.label}
                                        onChange={(e) => handleBenefitChange(index, "label", e.target.value)}
                                        className="w-32 px-3 py-2 rounded-lg border border-grey-200 focus:border-blue outline-none transition-all"
                                        placeholder="3–6 wks"
                                    />
                                    <input
                                        type="text"
                                        value={benefit.description}
                                        onChange={(e) => handleBenefitChange(index, "description", e.target.value)}
                                        className="flex-1 px-3 py-2 rounded-lg border border-grey-200 focus:border-blue outline-none transition-all"
                                        placeholder="Typical strategy engagement"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => removeBenefit(index)}
                                        className="text-red-400 hover:text-red-600 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                                        disabled={formData.benefits.length <= 1}
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            ))}
                        </div>
                        {formData.benefits.length <= 1 && (
                            <p className="text-xs text-grey-400 mt-2">
                                At least one benefit is required
                            </p>
                        )}
                    </div>
                )}

                {/* Capabilities Tab */}
                {activeTab === "capabilities" && (
                    <div className="space-y-4">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-navy font-plus-jakarta">
                                Capabilities / What's Included
                            </h3>
                            <button
                                type="button"
                                onClick={addCapability}
                                className="text-sm text-cyan hover:text-cyan-light font-medium flex items-center gap-1"
                            >
                                <Plus className="w-4 h-4" />
                                Add Capability
                            </button>
                        </div>
                        <div className="space-y-3">
                            {formData.capabilities.map((capability, index) => (
                                <div
                                    key={index}
                                    className="flex items-center gap-3 border border-grey-100 rounded-lg p-3 hover:border-grey-200 transition-colors"
                                >
                                    <span className="text-cyan font-bold text-sm">✓</span>
                                    <input
                                        type="text"
                                        value={capability}
                                        onChange={(e) => handleCapabilityChange(index, e.target.value)}
                                        className="flex-1 px-3 py-2 rounded-lg border border-grey-200 focus:border-blue outline-none transition-all"
                                        placeholder="AI readiness and maturity assessment"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => removeCapability(index)}
                                        className="text-red-400 hover:text-red-600 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                                        disabled={formData.capabilities.length <= 1}
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            ))}
                        </div>
                        {formData.capabilities.length <= 1 && (
                            <p className="text-xs text-grey-400 mt-2">
                                At least one capability is required
                            </p>
                        )}
                    </div>
                )}

                {/* Use Cases Tab */}
                {activeTab === "usecases" && (
                    <div className="space-y-4">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-navy font-plus-jakarta">
                                Example Use Cases
                            </h3>
                            <button
                                type="button"
                                onClick={addUseCase}
                                className="text-sm text-cyan hover:text-cyan-light font-medium flex items-center gap-1"
                            >
                                <Plus className="w-4 h-4" />
                                Add Use Case
                            </button>
                        </div>
                        <div className="space-y-3">
                            {formData.useCases.map((useCase, index) => (
                                <div
                                    key={index}
                                    className="flex items-center gap-3 border border-grey-100 rounded-lg p-3 hover:border-grey-200 transition-colors"
                                >
                                    <span className="text-blue font-bold text-sm">→</span>
                                    <input
                                        type="text"
                                        value={useCase}
                                        onChange={(e) => handleUseCaseChange(index, e.target.value)}
                                        className="flex-1 px-3 py-2 rounded-lg border border-grey-200 focus:border-blue outline-none transition-all"
                                        placeholder="Enterprise AI adoption roadmap for a banking group"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => removeUseCase(index)}
                                        className="text-red-400 hover:text-red-600 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                                        disabled={formData.useCases.length <= 1}
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            ))}
                        </div>
                        {formData.useCases.length <= 1 && (
                            <p className="text-xs text-grey-400 mt-2">
                                At least one use case is required
                            </p>
                        )}
                    </div>
                )}
            </form>
        </div>
    );
}