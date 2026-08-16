"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
    Save,
    Loader2,
    AlertCircle,
    CheckCircle,
    Plus,
    Trash2,
    GripVertical,
    RefreshCw,
} from "lucide-react";
import RichTextEditor from "@/components/admin/RichTextEditor";
import { getAboutPage, updateAboutPage, resetAboutPage } from "@/services/aboutPageApi";
import { AboutPageData, Milestone, Value, Office } from "@/types/admin/aboutPage";
import toast from 'react-hot-toast';

// ============================================================
// DEFAULT DATA
// ============================================================
const defaultAboutData: AboutPageData = {
    heroTitle: "Practical AI, Delivered by a Trusted Systems Integrator",
    heroDescription: "NGEN IT is a systems integration, licensed software and IoT solutions company headquartered in Dhaka, Bangladesh, with entities and partners across Singapore, the UK, Portugal, the UAE and Southeast Asia.",
    storyTitle: "From Systems Integration to AI Solutions",
    storyDescription: "Since 2009, NGEN IT has helped enterprise, government and industrial organizations select, implement and support technology — from licensed software and industrial hardware to IoT and smart automation.\n\nOur AI Services division builds on that foundation, combining hands-on delivery experience with modern AI capability to help clients move from AI ideas to measurable operational results.",
    milestones: [
        { year: "2009", title: "NGEN IT Founded", description: "Established in Dhaka as a systems integration and licensed software company serving enterprise and government clients." },
        { year: "2015", title: "Regional Expansion", description: "Expanded delivery capability across industrial hardware supply, government tendering and enterprise software distribution." },
        { year: "2021", title: "IoT & Smart Automation", description: "Launched IoT and smart-automation product lines for industrial and utility clients." },
        { year: "2024", title: "International Entities", description: "Established entities and partnerships in Singapore, UK and Portugal to serve international clients." },
        { year: "2026", title: "AI Services Division", description: "Launched a dedicated AI Services division covering consulting, generative AI, automation, analytics, computer vision and industrial AI." },
    ],
    values: [
        { icon: "🎯", title: "Practical, Not Hype", description: "We focus on measurable business outcomes over trend-chasing." },
        { icon: "🤝", title: "Client Partnership", description: "Long-term relationships built on delivery, not just proposals." },
        { icon: "🔒", title: "Responsible AI", description: "Governance, privacy and security built into every engagement." },
        { icon: "🌍", title: "Local + Global", description: "International technology standards with local deployment capability." },
    ],
    offices: [
        { flag: "🇧🇩", city: "Dhaka", country: "Bangladesh", description: "Head office — sales, engineering and delivery teams" },
        { flag: "🇬🇧", city: "London", country: "UK", description: "Market development and enterprise partnerships" },
        { flag: "🇸🇬", city: "Singapore", country: "Singapore", description: "Regional entity for Southeast Asia operations" },
        { flag: "🇵🇹", city: "Lisbon", country: "Portugal", description: "EU market development and digital services" },
    ],
    ctaTitle: "Want to Work with Us?",
    ctaDescription: "Tell us about your organization and AI goals — we would love to talk.",
    ctaButton: "Get in Touch",
    ctaLink: "/contact",
    isActive: true,
};

// ============================================================
// MAIN COMPONENT
// ============================================================
export default function AboutPageAdmin() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
    const [formData, setFormData] = useState<AboutPageData>(defaultAboutData);
    const [activeTab, setActiveTab] = useState("hero");
    const [existingId, setExistingId] = useState<string | null>(null);

    // ============================================================
    // LOAD DATA
    // ============================================================
    useEffect(() => {
        const loadData = async () => {
            try {
                setLoading(true);
                const data = await getAboutPage();
                setFormData(data);
                setExistingId(data._id || null);
            } catch (error: any) {
                console.error("Error loading about page data:", error);
                toast.error(error.message || "Failed to load about page");
                setFormData(defaultAboutData);
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

    const handleStoryDescriptionChange = (value: string) => {
        setFormData((prev) => ({ ...prev, storyDescription: value }));
    };

    // Milestones
    const handleMilestoneChange = (index: number, field: "year" | "title" | "description", value: string) => {
        const newMilestones = formData.milestones.map((m, i) =>
            i === index ? { ...m, [field]: value } : m
        );
        setFormData((prev) => ({ ...prev, milestones: newMilestones }));
    };

    const addMilestone = () => {
        setFormData((prev) => ({
            ...prev,
            milestones: [...prev.milestones, { year: "", title: "", description: "" }],
        }));
    };

    const removeMilestone = (index: number) => {
        if (formData.milestones.length <= 1) {
            toast.error("At least one milestone is required");
            return;
        }
        setFormData((prev) => ({
            ...prev,
            milestones: prev.milestones.filter((_, i) => i !== index),
        }));
    };

    // Values
    const handleValueChange = (index: number, field: "icon" | "title" | "description", value: string) => {
        const newValues = formData.values.map((v, i) =>
            i === index ? { ...v, [field]: value } : v
        );
        setFormData((prev) => ({ ...prev, values: newValues }));
    };

    const addValue = () => {
        setFormData((prev) => ({
            ...prev,
            values: [...prev.values, { icon: "🎯", title: "", description: "" }],
        }));
    };

    const removeValue = (index: number) => {
        if (formData.values.length <= 1) {
            toast.error("At least one value is required");
            return;
        }
        setFormData((prev) => ({
            ...prev,
            values: prev.values.filter((_, i) => i !== index),
        }));
    };

    // Offices
    const handleOfficeChange = (index: number, field: "flag" | "city" | "country" | "description", value: string) => {
        const newOffices = formData.offices.map((o, i) =>
            i === index ? { ...o, [field]: value } : o
        );
        setFormData((prev) => ({ ...prev, offices: newOffices }));
    };

    const addOffice = () => {
        setFormData((prev) => ({
            ...prev,
            offices: [...prev.offices, { flag: "🇧🇩", city: "", country: "", description: "" }],
        }));
    };

    const removeOffice = (index: number) => {
        if (formData.offices.length <= 1) {
            toast.error("At least one office is required");
            return;
        }
        setFormData((prev) => ({
            ...prev,
            offices: prev.offices.filter((_, i) => i !== index),
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
            const result = await updateAboutPage(formData);
            setFormData(result);
            setExistingId(result._id || null);
            setSaveStatus("saved");
            toast.success("About page saved successfully!");
            setTimeout(() => setSaveStatus("idle"), 2000);
        } catch (err: any) {
            setError(err.message || "Failed to save about page");
            setSaveStatus("error");
            toast.error(err.message || "Failed to save about page");
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
            const data = await resetAboutPage();
            setFormData(data);
            setExistingId(data._id || null);
            setSaveStatus("saved");
            toast.success("About page reset to defaults!");
            setTimeout(() => setSaveStatus("idle"), 2000);
        } catch (err: any) {
            setError(err.message || "Failed to reset about page");
            setSaveStatus("error");
            toast.error(err.message || "Failed to reset about page");
            setTimeout(() => setSaveStatus("idle"), 3000);
        } finally {
            setSaving(false);
        }
    };

    // ============================================================
    // TABS
    // ============================================================
    const tabs = [
        { id: "hero", label: "Hero Section" },
        { id: "story", label: "Our Story" },
        { id: "milestones", label: "Timeline" },
        { id: "values", label: "Values" },
        { id: "offices", label: "Offices" },
        { id: "cta", label: "CTA" },
    ];

    // ============================================================
    // LOADING STATE
    // ============================================================
    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-center">
                    <div className="w-12 h-12 border-4 border-cyan border-t-transparent rounded-full animate-spin mx-auto"></div>
                    <p className="text-grey-400 mt-4">Loading about page...</p>
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
                        About Us
                    </h2>
                    <p className="text-grey-400 text-sm">
                        Manage the About Us page content
                    </p>
                </div>

                <div className="flex items-center gap-3 flex-wrap">
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

            {/* Form Content */}
            <div className="bg-white rounded-xl shadow-sm border border-grey-100 p-6">
                {/* Hero Tab */}
                {activeTab === "hero" && (
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-navy font-plus-jakarta mb-4">
                            Hero Section
                        </h3>
                        <div>
                            <label className="block text-sm font-semibold text-grey-800 mb-1.5">
                                Hero Title *
                            </label>
                            <input
                                type="text"
                                name="heroTitle"
                                value={formData.heroTitle}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 rounded-lg border border-grey-200 focus:border-blue outline-none transition-all"
                                placeholder="Practical AI, Delivered by a Trusted Systems Integrator"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-grey-800 mb-1.5">
                                Hero Description *
                            </label>
                            <textarea
                                name="heroDescription"
                                value={formData.heroDescription}
                                onChange={handleInputChange}
                                rows={4}
                                className="w-full px-4 py-3 rounded-lg border border-grey-200 focus:border-blue outline-none transition-all resize-vertical"
                                placeholder="NGEN IT is a systems integration..."
                            />
                        </div>
                        <div className="flex items-center gap-3 mt-4">
                            <label className="text-sm font-semibold text-grey-800">
                                Page Active
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
                            <span className="text-sm text-grey-600">
                                {formData.isActive ? "Active" : "Inactive"}
                            </span>
                        </div>
                    </div>
                )}

                {/* Story Tab */}
                {activeTab === "story" && (
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-navy font-plus-jakarta mb-4">
                            Our Story
                        </h3>
                        <div>
                            <label className="block text-sm font-semibold text-grey-800 mb-1.5">
                                Story Title *
                            </label>
                            <input
                                type="text"
                                name="storyTitle"
                                value={formData.storyTitle}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 rounded-lg border border-grey-200 focus:border-blue outline-none transition-all"
                                placeholder="From Systems Integration to AI Solutions"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-grey-800 mb-1.5">
                                Story Description *
                            </label>
                            <RichTextEditor
                                value={formData.storyDescription}
                                onChange={handleStoryDescriptionChange}
                                placeholder="Since 2009, NGEN IT has helped enterprise..."
                                height={200}
                            />
                        </div>
                    </div>
                )}

                {/* Milestones Tab */}
                {activeTab === "milestones" && (
                    <div className="space-y-4">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-navy font-plus-jakarta">
                                Company Timeline
                            </h3>
                            <button
                                type="button"
                                onClick={addMilestone}
                                className="text-sm text-cyan hover:text-cyan-light font-medium flex items-center gap-1"
                            >
                                <Plus className="w-4 h-4" />
                                Add Milestone
                            </button>
                        </div>
                        <div className="space-y-4">
                            {formData.milestones.map((milestone, index) => (
                                <div
                                    key={index}
                                    className="border border-grey-100 rounded-lg p-4 hover:border-grey-200 transition-colors"
                                >
                                    <div className="flex items-start gap-3">
                                        <div className="w-8 h-8 rounded-full bg-cyan/10 flex items-center justify-center text-cyan font-bold text-sm flex-shrink-0">
                                            {index + 1}
                                        </div>
                                        <div className="flex-1 space-y-3">
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                                <input
                                                    type="text"
                                                    value={milestone.year}
                                                    onChange={(e) => handleMilestoneChange(index, "year", e.target.value)}
                                                    className="px-3 py-2 rounded-lg border border-grey-200 focus:border-blue outline-none transition-all"
                                                    placeholder="2009"
                                                />
                                                <input
                                                    type="text"
                                                    value={milestone.title}
                                                    onChange={(e) => handleMilestoneChange(index, "title", e.target.value)}
                                                    className="px-3 py-2 rounded-lg border border-grey-200 focus:border-blue outline-none transition-all"
                                                    placeholder="NGEN IT Founded"
                                                />
                                                <input
                                                    type="text"
                                                    value={milestone.description}
                                                    onChange={(e) => handleMilestoneChange(index, "description", e.target.value)}
                                                    className="px-3 py-2 rounded-lg border border-grey-200 focus:border-blue outline-none transition-all"
                                                    placeholder="Established in Dhaka..."
                                                />
                                            </div>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => removeMilestone(index)}
                                            className="text-red-400 hover:text-red-600 transition-colors disabled:opacity-30"
                                            disabled={formData.milestones.length <= 1}
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        {formData.milestones.length <= 1 && (
                            <p className="text-xs text-amber-600 bg-amber-50 border border-amber-200 rounded-lg px-4 py-3">
                                ⚠️ At least one milestone is required
                            </p>
                        )}
                    </div>
                )}

                {/* Values Tab */}
                {activeTab === "values" && (
                    <div className="space-y-4">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-navy font-plus-jakarta">
                                Core Values
                            </h3>
                            <button
                                type="button"
                                onClick={addValue}
                                className="text-sm text-cyan hover:text-cyan-light font-medium flex items-center gap-1"
                            >
                                <Plus className="w-4 h-4" />
                                Add Value
                            </button>
                        </div>
                        <div className="space-y-4">
                            {formData.values.map((value, index) => (
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
                                                    value={value.icon}
                                                    onChange={(e) => handleValueChange(index, "icon", e.target.value)}
                                                    className="px-3 py-2 rounded-lg border border-grey-200 focus:border-blue outline-none transition-all"
                                                    placeholder="🎯"
                                                />
                                                <input
                                                    type="text"
                                                    value={value.title}
                                                    onChange={(e) => handleValueChange(index, "title", e.target.value)}
                                                    className="px-3 py-2 rounded-lg border border-grey-200 focus:border-blue outline-none transition-all"
                                                    placeholder="Practical, Not Hype"
                                                />
                                                <input
                                                    type="text"
                                                    value={value.description}
                                                    onChange={(e) => handleValueChange(index, "description", e.target.value)}
                                                    className="px-3 py-2 rounded-lg border border-grey-200 focus:border-blue outline-none transition-all"
                                                    placeholder="We focus on measurable business outcomes..."
                                                />
                                            </div>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => removeValue(index)}
                                            className="text-red-400 hover:text-red-600 transition-colors disabled:opacity-30"
                                            disabled={formData.values.length <= 1}
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        {formData.values.length <= 1 && (
                            <p className="text-xs text-amber-600 bg-amber-50 border border-amber-200 rounded-lg px-4 py-3">
                                ⚠️ At least one value is required
                            </p>
                        )}
                    </div>
                )}

                {/* Offices Tab */}
                {activeTab === "offices" && (
                    <div className="space-y-4">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-navy font-plus-jakarta">
                                Office Locations
                            </h3>
                            <button
                                type="button"
                                onClick={addOffice}
                                className="text-sm text-cyan hover:text-cyan-light font-medium flex items-center gap-1"
                            >
                                <Plus className="w-4 h-4" />
                                Add Office
                            </button>
                        </div>
                        <div className="space-y-4">
                            {formData.offices.map((office, index) => (
                                <div
                                    key={index}
                                    className="border border-grey-100 rounded-lg p-4 hover:border-grey-200 transition-colors"
                                >
                                    <div className="flex items-start gap-3">
                                        <GripVertical className="w-5 h-5 text-grey-300 cursor-move mt-2.5" />
                                        <div className="flex-1 space-y-3">
                                            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                                                <input
                                                    type="text"
                                                    value={office.flag}
                                                    onChange={(e) => handleOfficeChange(index, "flag", e.target.value)}
                                                    className="px-3 py-2 rounded-lg border border-grey-200 focus:border-blue outline-none transition-all"
                                                    placeholder="🇧🇩"
                                                />
                                                <input
                                                    type="text"
                                                    value={office.city}
                                                    onChange={(e) => handleOfficeChange(index, "city", e.target.value)}
                                                    className="px-3 py-2 rounded-lg border border-grey-200 focus:border-blue outline-none transition-all"
                                                    placeholder="Dhaka"
                                                />
                                                <input
                                                    type="text"
                                                    value={office.country}
                                                    onChange={(e) => handleOfficeChange(index, "country", e.target.value)}
                                                    className="px-3 py-2 rounded-lg border border-grey-200 focus:border-blue outline-none transition-all"
                                                    placeholder="Bangladesh"
                                                />
                                                <input
                                                    type="text"
                                                    value={office.description}
                                                    onChange={(e) => handleOfficeChange(index, "description", e.target.value)}
                                                    className="px-3 py-2 rounded-lg border border-grey-200 focus:border-blue outline-none transition-all"
                                                    placeholder="Head office — sales, engineering and delivery teams"
                                                />
                                            </div>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => removeOffice(index)}
                                            className="text-red-400 hover:text-red-600 transition-colors disabled:opacity-30"
                                            disabled={formData.offices.length <= 1}
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        {formData.offices.length <= 1 && (
                            <p className="text-xs text-amber-600 bg-amber-50 border border-amber-200 rounded-lg px-4 py-3">
                                ⚠️ At least one office is required
                            </p>
                        )}
                    </div>
                )}

                {/* CTA Tab */}
                {activeTab === "cta" && (
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-navy font-plus-jakarta mb-4">
                            Call to Action
                        </h3>
                        <div>
                            <label className="block text-sm font-semibold text-grey-800 mb-1.5">
                                CTA Title *
                            </label>
                            <input
                                type="text"
                                name="ctaTitle"
                                value={formData.ctaTitle}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 rounded-lg border border-grey-200 focus:border-blue outline-none transition-all"
                                placeholder="Want to Work with Us?"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-grey-800 mb-1.5">
                                CTA Description *
                            </label>
                            <textarea
                                name="ctaDescription"
                                value={formData.ctaDescription}
                                onChange={handleInputChange}
                                rows={2}
                                className="w-full px-4 py-3 rounded-lg border border-grey-200 focus:border-blue outline-none transition-all resize-vertical"
                                placeholder="Tell us about your organization and AI goals..."
                            />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-grey-800 mb-1.5">
                                    Button Text *
                                </label>
                                <input
                                    type="text"
                                    name="ctaButton"
                                    value={formData.ctaButton}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 rounded-lg border border-grey-200 focus:border-blue outline-none transition-all"
                                    placeholder="Get in Touch"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-grey-800 mb-1.5">
                                    Button Link *
                                </label>
                                <input
                                    type="text"
                                    name="ctaLink"
                                    value={formData.ctaLink}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 rounded-lg border border-grey-200 focus:border-blue outline-none transition-all"
                                    placeholder="/contact"
                                />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}