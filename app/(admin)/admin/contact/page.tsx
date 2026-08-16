"use client";

import { useState, useEffect } from "react";
import {
    Save,
    Loader2,
    AlertCircle,
    CheckCircle,
    RefreshCw,
    Plus,
    Trash2,
    GripVertical,
} from "lucide-react";
import { getContactPage, updateContactPage, resetContactPage } from "@/services/contactPageApi";
import { ContactPageData, ContactMethod } from "@/types/admin/contactPage";

// ============================================================
// DEFAULT DATA (matches database defaults)
// ============================================================
const defaultContactData: ContactPageData = {
    hero: {
        tag: "Contact Us",
        title: "Let's Talk About Your<br />AI Requirement",
        description: "Reach us via WhatsApp, email or the form below. Our AI Solutions team typically responds within one business day.",
    },
    section: {
        tag: "Consult Us",
        title: "Talk to an<br />AI Specialist",
        description: "Our team will review your requirement and contact you to discuss a practical AI solution for your organization. We typically respond within one business day.",
    },
    contactMethods: [
        {
            icon: "💬",
            label: "Chat on WhatsApp",
            description: "Fastest response — our team is available during business hours",
            link: "https://wa.me/8801XXXXXXXXX",
            type: "whatsapp",
            isActive: true,
            order: 0,
        },
        {
            icon: "📧",
            label: "Email Our AI Team",
            description: "ai@ngenitltd.com — detailed enquiries welcome",
            link: "mailto:ai@ngenitltd.com",
            type: "email",
            isActive: true,
            order: 1,
        },
        {
            icon: "📞",
            label: "Call Us",
            description: "Bangladesh, UK, Singapore, Portugal, Middle East offices",
            link: "#",
            type: "phone",
            isActive: true,
            order: 2,
        },
    ],
    form: {
        title: "Send Your AI Requirement",
        description: "Fill in the form and our AI Solutions team will contact you within one business day.",
        submitButton: "Send My Requirement →",
        successMessage: "✓ Requirement Sent! Our team will contact you soon.",
        consentText: "I consent to NGEN IT contacting me to discuss my AI requirement.",
        privacyPolicyLink: "/privacy",
        footerNote: "🔒 Your information is secure and will only be shared with the NGEN IT AI Solutions team.",
    },
    formFields: {
        name: {
            label: "Full Name",
            placeholder: "Your full name",
            required: true,
        },
        company: {
            label: "Company Name",
            placeholder: "Your organization",
            required: true,
        },
        email: {
            label: "Business Email",
            placeholder: "you@company.com",
            required: true,
        },
        phone: {
            label: "WhatsApp / Mobile",
            placeholder: "+880 / +44 / +65...",
            required: true,
        },
        country: {
            label: "Country",
            placeholder: "Select country",
            required: true,
            options: [
                "Bangladesh",
                "United Kingdom",
                "Singapore",
                "Portugal",
                "UAE / Middle East",
                "Other",
            ],
        },
        service: {
            label: "Interested Service",
            placeholder: "Select a service",
            required: true,
        },
        message: {
            label: "Your Requirement",
            placeholder: "Briefly describe your business challenge, AI idea or project requirement...",
            required: true,
        },
    },
    isActive: true,
};

// ============================================================
// MAIN COMPONENT
// ============================================================
export default function ContactPageAdmin() {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
    const [formData, setFormData] = useState<ContactPageData>(defaultContactData);
    const [activeTab, setActiveTab] = useState("hero");
    const [existingId, setExistingId] = useState<string | null>(null);

    // ============================================================
    // LOAD DATA
    // ============================================================
    useEffect(() => {
        const loadData = async () => {
            try {
                setLoading(true);
                const data = await getContactPage();
                setFormData(data);
                setExistingId(data._id || null);
            } catch (error) {
                console.error("Error loading contact page data:", error);
                setFormData(defaultContactData);
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
    // HERO SECTION HANDLERS
    // ============================================================
    const handleHeroChange = (field: string, value: string) => {
        setFormData((prev) => ({
            ...prev,
            hero: { ...prev.hero, [field]: value },
        }));
    };

    // ============================================================
    // SECTION HANDLERS
    // ============================================================
    const handleSectionChange = (field: string, value: string) => {
        setFormData((prev) => ({
            ...prev,
            section: { ...prev.section, [field]: value },
        }));
    };

    // ============================================================
    // CONTACT METHODS HANDLERS (REPEATER)
    // ============================================================
    const handleMethodChange = (index: number, field: keyof ContactMethod, value: string | boolean) => {
        const newMethods = [...formData.contactMethods];
        newMethods[index] = { ...newMethods[index], [field]: value };
        setFormData((prev) => ({ ...prev, contactMethods: newMethods }));
    };

    const addMethod = () => {
        setFormData((prev) => ({
            ...prev,
            contactMethods: [
                ...prev.contactMethods,
                {
                    icon: "💬",
                    label: "",
                    description: "",
                    link: "",
                    type: "custom",
                    isActive: true,
                    order: prev.contactMethods.length,
                },
            ],
        }));
    };

    const removeMethod = (index: number) => {
        if (formData.contactMethods.length <= 1) {
            setError("At least one contact method is required");
            setTimeout(() => setError(""), 3000);
            return;
        }
        setFormData((prev) => ({
            ...prev,
            contactMethods: prev.contactMethods.filter((_, i) => i !== index),
        }));
    };

    const toggleMethodActive = (index: number) => {
        const newMethods = [...formData.contactMethods];
        newMethods[index] = { ...newMethods[index], isActive: !newMethods[index].isActive };
        setFormData((prev) => ({ ...prev, contactMethods: newMethods }));
    };

    const moveMethod = (index: number, direction: "up" | "down") => {
        const newIndex = direction === "up" ? index - 1 : index + 1;
        if (newIndex < 0 || newIndex >= formData.contactMethods.length) return;

        const newMethods = [...formData.contactMethods];
        [newMethods[index], newMethods[newIndex]] = [newMethods[newIndex], newMethods[index]];
        // Update order
        newMethods.forEach((method, i) => method.order = i);
        setFormData((prev) => ({ ...prev, contactMethods: newMethods }));
    };

    // ============================================================
    // FORM HANDLERS
    // ============================================================
    const handleFormChange = (field: string, value: string) => {
        setFormData((prev) => ({
            ...prev,
            form: { ...prev.form, [field]: value },
        }));
    };

    // ============================================================
    // FORM FIELD HANDLERS
    // ============================================================
    const handleFormFieldChange = (
        field: "name" | "company" | "email" | "phone" | "country" | "service" | "message",
        subField: string,
        value: string | boolean | string[]
    ) => {
        setFormData((prev) => ({
            ...prev,
            formFields: {
                ...prev.formFields,
                [field]: {
                    ...prev.formFields[field],
                    [subField]: value,
                },
            },
        }));
    };

    const handleCountryOptionsChange = (value: string) => {
        const options = value.split(",").map((opt) => opt.trim()).filter((opt) => opt);
        setFormData((prev) => ({
            ...prev,
            formFields: {
                ...prev.formFields,
                country: {
                    ...prev.formFields.country,
                    options: options,
                },
            },
        }));
    };

    // ============================================================
    // TOGGLE PAGE ACTIVE
    // ============================================================
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
            const result = await updateContactPage(formData);
            setFormData(result);
            setExistingId(result._id || null);
            setSaveStatus("saved");
            setTimeout(() => setSaveStatus("idle"), 2000);
        } catch (err: any) {
            setError(err.message || "Failed to save contact page");
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
            const data = await resetContactPage();
            setFormData(data);
            setExistingId(data._id || null);
            setSaveStatus("saved");
            setTimeout(() => setSaveStatus("idle"), 2000);
        } catch (err: any) {
            setError(err.message || "Failed to reset contact page");
            setSaveStatus("error");
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
        { id: "content", label: "Content" },
        { id: "methods", label: "Contact Methods" },
        { id: "form", label: "Form" },
        { id: "fields", label: "Form Fields" },
    ];

    // ============================================================
    // LOADING STATE
    // ============================================================
    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-center">
                    <div className="w-12 h-12 border-4 border-cyan border-t-transparent rounded-full animate-spin mx-auto"></div>
                    <p className="text-grey-400 mt-4">Loading contact page...</p>
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
                        Contact Page
                    </h2>
                    <p className="text-grey-400 text-sm">
                        Manage the Contact Us page content
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

            {/* Tabs */}
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

            {/* Content */}
            <div className="bg-white rounded-xl shadow-sm border border-grey-100 p-6">
                {/* ============================================================
                    HERO TAB
                    ============================================================ */}
                {activeTab === "hero" && (
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-navy font-plus-jakarta mb-4">
                            Hero Section
                        </h3>
                        <div>
                            <label className="block text-sm font-semibold text-grey-800 mb-1.5">
                                Tag *
                            </label>
                            <input
                                type="text"
                                value={formData.hero.tag}
                                onChange={(e) => handleHeroChange("tag", e.target.value)}
                                className="w-full px-4 py-3 rounded-lg border border-grey-200 focus:border-blue outline-none transition-all"
                                placeholder="Contact Us"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-grey-800 mb-1.5">
                                Hero Title *
                            </label>
                            <input
                                type="text"
                                value={formData.hero.title}
                                onChange={(e) => handleHeroChange("title", e.target.value)}
                                className="w-full px-4 py-3 rounded-lg border border-grey-200 focus:border-blue outline-none transition-all"
                                placeholder="Let's Talk About Your<br />AI Requirement"
                            />
                            <p className="text-xs text-grey-400 mt-1">Use &lt;br /&gt; for line breaks</p>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-grey-800 mb-1.5">
                                Hero Description *
                            </label>
                            <textarea
                                value={formData.hero.description}
                                onChange={(e) => handleHeroChange("description", e.target.value)}
                                rows={3}
                                className="w-full px-4 py-3 rounded-lg border border-grey-200 focus:border-blue outline-none transition-all resize-vertical"
                                placeholder="Reach us via WhatsApp, email or the form below..."
                            />
                        </div>
                        <div className="flex items-center gap-3 pt-4 border-t border-grey-100">
                            <label className="text-sm font-semibold text-grey-800">
                                Page Active
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
                )}

                {/* ============================================================
                    CONTENT TAB
                    ============================================================ */}
                {activeTab === "content" && (
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-navy font-plus-jakarta mb-4">
                            Section Content
                        </h3>
                        <div>
                            <label className="block text-sm font-semibold text-grey-800 mb-1.5">
                                Section Tag *
                            </label>
                            <input
                                type="text"
                                value={formData.section.tag}
                                onChange={(e) => handleSectionChange("tag", e.target.value)}
                                className="w-full px-4 py-3 rounded-lg border border-grey-200 focus:border-blue outline-none transition-all"
                                placeholder="Consult Us"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-grey-800 mb-1.5">
                                Section Title *
                            </label>
                            <input
                                type="text"
                                value={formData.section.title}
                                onChange={(e) => handleSectionChange("title", e.target.value)}
                                className="w-full px-4 py-3 rounded-lg border border-grey-200 focus:border-blue outline-none transition-all"
                                placeholder="Talk to an<br />AI Specialist"
                            />
                            <p className="text-xs text-grey-400 mt-1">Use &lt;br /&gt; for line breaks</p>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-grey-800 mb-1.5">
                                Section Description *
                            </label>
                            <textarea
                                value={formData.section.description}
                                onChange={(e) => handleSectionChange("description", e.target.value)}
                                rows={3}
                                className="w-full px-4 py-3 rounded-lg border border-grey-200 focus:border-blue outline-none transition-all resize-vertical"
                                placeholder="Our team will review your requirement and contact you..."
                            />
                        </div>
                    </div>
                )}

                {/* ============================================================
                    CONTACT METHODS TAB (REPEATER)
                    ============================================================ */}
                {activeTab === "methods" && (
                    <div className="space-y-4">
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <h3 className="text-lg font-semibold text-navy font-plus-jakarta">
                                    Contact Methods
                                </h3>
                                <p className="text-sm text-grey-400">
                                    Add, edit, or reorder contact methods
                                </p>
                            </div>
                            <button
                                type="button"
                                onClick={addMethod}
                                className="px-4 py-2 bg-cyan text-navy rounded-lg font-semibold hover:bg-cyan-light transition-all duration-200 flex items-center gap-2 text-sm"
                            >
                                <Plus className="w-4 h-4" />
                                Add Method
                            </button>
                        </div>

                        {/* Repeater */}
                        <div className="space-y-4">
                            {formData.contactMethods.map((method, index) => (
                                <div
                                    key={index}
                                    className={`border rounded-lg p-4 transition-colors ${method.isActive
                                            ? "border-grey-200"
                                            : "border-red-200 bg-red-50/30"
                                        }`}
                                >
                                    <div className="flex items-start gap-3">
                                        {/* Drag Handle */}
                                        <div className="flex flex-col items-center gap-1 mt-2">
                                            <GripVertical className="w-5 h-5 text-grey-300 cursor-move" />
                                            <span className="text-xs text-grey-400">{index + 1}</span>
                                        </div>

                                        {/* Method Fields */}
                                        <div className="flex-1 space-y-3">
                                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                                                <div>
                                                    <label className="block text-xs font-medium text-grey-600 mb-1">
                                                        Icon
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={method.icon}
                                                        onChange={(e) =>
                                                            handleMethodChange(index, "icon", e.target.value)
                                                        }
                                                        className="w-full px-3 py-2 rounded-lg border border-grey-200 focus:border-blue outline-none transition-all text-sm"
                                                        placeholder="💬"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-xs font-medium text-grey-600 mb-1">
                                                        Label *
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={method.label}
                                                        onChange={(e) =>
                                                            handleMethodChange(index, "label", e.target.value)
                                                        }
                                                        className="w-full px-3 py-2 rounded-lg border border-grey-200 focus:border-blue outline-none transition-all text-sm"
                                                        placeholder="Chat on WhatsApp"
                                                        required
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-xs font-medium text-grey-600 mb-1">
                                                        Type
                                                    </label>
                                                    <select
                                                        value={method.type}
                                                        onChange={(e) =>
                                                            handleMethodChange(
                                                                index,
                                                                "type",
                                                                e.target.value as ContactMethod["type"]
                                                            )
                                                        }
                                                        className="w-full px-3 py-2 rounded-lg border border-grey-200 focus:border-blue outline-none transition-all text-sm"
                                                    >
                                                        <option value="whatsapp">WhatsApp</option>
                                                        <option value="email">Email</option>
                                                        <option value="phone">Phone</option>
                                                        <option value="custom">Custom</option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                <div>
                                                    <label className="block text-xs font-medium text-grey-600 mb-1">
                                                        Description
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={method.description}
                                                        onChange={(e) =>
                                                            handleMethodChange(index, "description", e.target.value)
                                                        }
                                                        className="w-full px-3 py-2 rounded-lg border border-grey-200 focus:border-blue outline-none transition-all text-sm"
                                                        placeholder="Fastest response — our team is available during business hours"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-xs font-medium text-grey-600 mb-1">
                                                        Link *
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={method.link}
                                                        onChange={(e) =>
                                                            handleMethodChange(index, "link", e.target.value)
                                                        }
                                                        className="w-full px-3 py-2 rounded-lg border border-grey-200 focus:border-blue outline-none transition-all text-sm"
                                                        placeholder="https://wa.me/8801XXXXXXXXX"
                                                        required
                                                    />
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-4 pt-2">
                                                {/* Active Toggle */}
                                                <div className="flex items-center gap-2">
                                                    <button
                                                        type="button"
                                                        onClick={() => toggleMethodActive(index)}
                                                        className={`relative w-10 h-5 rounded-full transition-colors ${method.isActive ? "bg-cyan" : "bg-grey-300"
                                                            }`}
                                                    >
                                                        <span
                                                            className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform ${method.isActive ? "translate-x-5" : ""
                                                                }`}
                                                        />
                                                    </button>
                                                    <span className="text-xs text-grey-500">
                                                        {method.isActive ? "Active" : "Inactive"}
                                                    </span>
                                                </div>

                                                {/* Move Buttons */}
                                                <div className="flex gap-1">
                                                    <button
                                                        type="button"
                                                        onClick={() => moveMethod(index, "up")}
                                                        disabled={index === 0}
                                                        className="p-1 text-grey-400 hover:text-navy transition-colors disabled:opacity-30"
                                                    >
                                                        ↑
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() => moveMethod(index, "down")}
                                                        disabled={index === formData.contactMethods.length - 1}
                                                        className="p-1 text-grey-400 hover:text-navy transition-colors disabled:opacity-30"
                                                    >
                                                        ↓
                                                    </button>
                                                </div>

                                                {/* Delete Button */}
                                                <button
                                                    type="button"
                                                    onClick={() => removeMethod(index)}
                                                    className="ml-auto text-red-400 hover:text-red-600 transition-colors text-sm flex items-center gap-1 disabled:opacity-30"
                                                    disabled={formData.contactMethods.length <= 1}
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                    Remove
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {formData.contactMethods.length <= 1 && (
                            <p className="text-xs text-amber-600 bg-amber-50 border border-amber-200 rounded-lg px-4 py-3">
                                ⚠️ At least one contact method is required. You cannot delete the last method.
                            </p>
                        )}
                    </div>
                )}

                {/* ============================================================
                    FORM TAB
                    ============================================================ */}
                {activeTab === "form" && (
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-navy font-plus-jakarta mb-4">
                            Form Settings
                        </h3>
                        <div>
                            <label className="block text-sm font-semibold text-grey-800 mb-1.5">
                                Form Title *
                            </label>
                            <input
                                type="text"
                                value={formData.form.title}
                                onChange={(e) => handleFormChange("title", e.target.value)}
                                className="w-full px-4 py-3 rounded-lg border border-grey-200 focus:border-blue outline-none transition-all"
                                placeholder="Send Your AI Requirement"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-grey-800 mb-1.5">
                                Form Description *
                            </label>
                            <textarea
                                value={formData.form.description}
                                onChange={(e) => handleFormChange("description", e.target.value)}
                                rows={2}
                                className="w-full px-4 py-3 rounded-lg border border-grey-200 focus:border-blue outline-none transition-all resize-vertical"
                                placeholder="Fill in the form and our AI Solutions team will contact you..."
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-grey-800 mb-1.5">
                                Submit Button Text *
                            </label>
                            <input
                                type="text"
                                value={formData.form.submitButton}
                                onChange={(e) => handleFormChange("submitButton", e.target.value)}
                                className="w-full px-4 py-3 rounded-lg border border-grey-200 focus:border-blue outline-none transition-all"
                                placeholder="Send My Requirement →"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-grey-800 mb-1.5">
                                Success Message *
                            </label>
                            <input
                                type="text"
                                value={formData.form.successMessage}
                                onChange={(e) => handleFormChange("successMessage", e.target.value)}
                                className="w-full px-4 py-3 rounded-lg border border-grey-200 focus:border-blue outline-none transition-all"
                                placeholder="✓ Requirement Sent! Our team will contact you soon."
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-grey-800 mb-1.5">
                                Consent Text *
                            </label>
                            <textarea
                                value={formData.form.consentText}
                                onChange={(e) => handleFormChange("consentText", e.target.value)}
                                rows={2}
                                className="w-full px-4 py-3 rounded-lg border border-grey-200 focus:border-blue outline-none transition-all resize-vertical"
                                placeholder="I consent to NGEN IT contacting me..."
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-grey-800 mb-1.5">
                                Privacy Policy Link *
                            </label>
                            <input
                                type="text"
                                value={formData.form.privacyPolicyLink}
                                onChange={(e) => handleFormChange("privacyPolicyLink", e.target.value)}
                                className="w-full px-4 py-3 rounded-lg border border-grey-200 focus:border-blue outline-none transition-all"
                                placeholder="/privacy"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-grey-800 mb-1.5">
                                Footer Note *
                            </label>
                            <textarea
                                value={formData.form.footerNote}
                                onChange={(e) => handleFormChange("footerNote", e.target.value)}
                                rows={2}
                                className="w-full px-4 py-3 rounded-lg border border-grey-200 focus:border-blue outline-none transition-all resize-vertical"
                                placeholder="🔒 Your information is secure..."
                            />
                        </div>
                    </div>
                )}

                {/* ============================================================
                    FORM FIELDS TAB
                    ============================================================ */}
                {activeTab === "fields" && (
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-navy font-plus-jakarta mb-4">
                            Form Fields
                        </h3>
                        <p className="text-sm text-grey-400">
                            Configure labels, placeholders, and required status for each form field.
                        </p>

                        {/* Name Field */}
                        <div className="border border-grey-100 rounded-lg p-4">
                            <h4 className="font-semibold text-navy mb-3">Name Field</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <input
                                    type="text"
                                    value={formData.formFields.name.label}
                                    onChange={(e) => handleFormFieldChange("name", "label", e.target.value)}
                                    className="px-3 py-2 rounded-lg border border-grey-200 focus:border-blue outline-none transition-all"
                                    placeholder="Full Name"
                                />
                                <input
                                    type="text"
                                    value={formData.formFields.name.placeholder}
                                    onChange={(e) => handleFormFieldChange("name", "placeholder", e.target.value)}
                                    className="px-3 py-2 rounded-lg border border-grey-200 focus:border-blue outline-none transition-all"
                                    placeholder="Your full name"
                                />
                            </div>
                            <div className="flex items-center gap-3 mt-3">
                                <label className="text-sm text-grey-600">Required</label>
                                <button
                                    type="button"
                                    onClick={() =>
                                        handleFormFieldChange(
                                            "name",
                                            "required",
                                            !formData.formFields.name.required
                                        )
                                    }
                                    className={`relative w-10 h-5 rounded-full transition-colors ${formData.formFields.name.required ? "bg-cyan" : "bg-grey-300"
                                        }`}
                                >
                                    <span
                                        className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform ${formData.formFields.name.required ? "translate-x-5" : ""
                                            }`}
                                    />
                                </button>
                            </div>
                        </div>

                        {/* Company Field */}
                        <div className="border border-grey-100 rounded-lg p-4">
                            <h4 className="font-semibold text-navy mb-3">Company Field</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <input
                                    type="text"
                                    value={formData.formFields.company.label}
                                    onChange={(e) => handleFormFieldChange("company", "label", e.target.value)}
                                    className="px-3 py-2 rounded-lg border border-grey-200 focus:border-blue outline-none transition-all"
                                    placeholder="Company Name"
                                />
                                <input
                                    type="text"
                                    value={formData.formFields.company.placeholder}
                                    onChange={(e) => handleFormFieldChange("company", "placeholder", e.target.value)}
                                    className="px-3 py-2 rounded-lg border border-grey-200 focus:border-blue outline-none transition-all"
                                    placeholder="Your organization"
                                />
                            </div>
                            <div className="flex items-center gap-3 mt-3">
                                <label className="text-sm text-grey-600">Required</label>
                                <button
                                    type="button"
                                    onClick={() =>
                                        handleFormFieldChange(
                                            "company",
                                            "required",
                                            !formData.formFields.company.required
                                        )
                                    }
                                    className={`relative w-10 h-5 rounded-full transition-colors ${formData.formFields.company.required ? "bg-cyan" : "bg-grey-300"
                                        }`}
                                >
                                    <span
                                        className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform ${formData.formFields.company.required ? "translate-x-5" : ""
                                            }`}
                                    />
                                </button>
                            </div>
                        </div>

                        {/* Email Field */}
                        <div className="border border-grey-100 rounded-lg p-4">
                            <h4 className="font-semibold text-navy mb-3">Email Field</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <input
                                    type="text"
                                    value={formData.formFields.email.label}
                                    onChange={(e) => handleFormFieldChange("email", "label", e.target.value)}
                                    className="px-3 py-2 rounded-lg border border-grey-200 focus:border-blue outline-none transition-all"
                                    placeholder="Business Email"
                                />
                                <input
                                    type="text"
                                    value={formData.formFields.email.placeholder}
                                    onChange={(e) => handleFormFieldChange("email", "placeholder", e.target.value)}
                                    className="px-3 py-2 rounded-lg border border-grey-200 focus:border-blue outline-none transition-all"
                                    placeholder="you@company.com"
                                />
                            </div>
                            <div className="flex items-center gap-3 mt-3">
                                <label className="text-sm text-grey-600">Required</label>
                                <button
                                    type="button"
                                    onClick={() =>
                                        handleFormFieldChange(
                                            "email",
                                            "required",
                                            !formData.formFields.email.required
                                        )
                                    }
                                    className={`relative w-10 h-5 rounded-full transition-colors ${formData.formFields.email.required ? "bg-cyan" : "bg-grey-300"
                                        }`}
                                >
                                    <span
                                        className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform ${formData.formFields.email.required ? "translate-x-5" : ""
                                            }`}
                                    />
                                </button>
                            </div>
                        </div>

                        {/* Phone Field */}
                        <div className="border border-grey-100 rounded-lg p-4">
                            <h4 className="font-semibold text-navy mb-3">Phone Field</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <input
                                    type="text"
                                    value={formData.formFields.phone.label}
                                    onChange={(e) => handleFormFieldChange("phone", "label", e.target.value)}
                                    className="px-3 py-2 rounded-lg border border-grey-200 focus:border-blue outline-none transition-all"
                                    placeholder="WhatsApp / Mobile"
                                />
                                <input
                                    type="text"
                                    value={formData.formFields.phone.placeholder}
                                    onChange={(e) => handleFormFieldChange("phone", "placeholder", e.target.value)}
                                    className="px-3 py-2 rounded-lg border border-grey-200 focus:border-blue outline-none transition-all"
                                    placeholder="+880 / +44 / +65..."
                                />
                            </div>
                            <div className="flex items-center gap-3 mt-3">
                                <label className="text-sm text-grey-600">Required</label>
                                <button
                                    type="button"
                                    onClick={() =>
                                        handleFormFieldChange(
                                            "phone",
                                            "required",
                                            !formData.formFields.phone.required
                                        )
                                    }
                                    className={`relative w-10 h-5 rounded-full transition-colors ${formData.formFields.phone.required ? "bg-cyan" : "bg-grey-300"
                                        }`}
                                >
                                    <span
                                        className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform ${formData.formFields.phone.required ? "translate-x-5" : ""
                                            }`}
                                    />
                                </button>
                            </div>
                        </div>

                        {/* Country Field */}
                        <div className="border border-grey-100 rounded-lg p-4">
                            <h4 className="font-semibold text-navy mb-3">Country Field</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <input
                                    type="text"
                                    value={formData.formFields.country.label}
                                    onChange={(e) => handleFormFieldChange("country", "label", e.target.value)}
                                    className="px-3 py-2 rounded-lg border border-grey-200 focus:border-blue outline-none transition-all"
                                    placeholder="Country"
                                />
                                <input
                                    type="text"
                                    value={formData.formFields.country.placeholder}
                                    onChange={(e) => handleFormFieldChange("country", "placeholder", e.target.value)}
                                    className="px-3 py-2 rounded-lg border border-grey-200 focus:border-blue outline-none transition-all"
                                    placeholder="Select country"
                                />
                            </div>
                            <div className="mt-3">
                                <label className="block text-sm text-grey-600 mb-1.5">
                                    Country Options (comma separated)
                                </label>
                                <input
                                    type="text"
                                    value={formData.formFields.country.options.join(", ")}
                                    onChange={(e) => handleCountryOptionsChange(e.target.value)}
                                    className="w-full px-3 py-2 rounded-lg border border-grey-200 focus:border-blue outline-none transition-all"
                                    placeholder="Bangladesh, United Kingdom, Singapore, Portugal, UAE / Middle East, Other"
                                />
                            </div>
                            <div className="flex items-center gap-3 mt-3">
                                <label className="text-sm text-grey-600">Required</label>
                                <button
                                    type="button"
                                    onClick={() =>
                                        handleFormFieldChange(
                                            "country",
                                            "required",
                                            !formData.formFields.country.required
                                        )
                                    }
                                    className={`relative w-10 h-5 rounded-full transition-colors ${formData.formFields.country.required ? "bg-cyan" : "bg-grey-300"
                                        }`}
                                >
                                    <span
                                        className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform ${formData.formFields.country.required ? "translate-x-5" : ""
                                            }`}
                                    />
                                </button>
                            </div>
                        </div>

                        {/* Service Field */}
                        <div className="border border-grey-100 rounded-lg p-4">
                            <h4 className="font-semibold text-navy mb-3">Service Field</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <input
                                    type="text"
                                    value={formData.formFields.service.label}
                                    onChange={(e) => handleFormFieldChange("service", "label", e.target.value)}
                                    className="px-3 py-2 rounded-lg border border-grey-200 focus:border-blue outline-none transition-all"
                                    placeholder="Interested Service"
                                />
                                <input
                                    type="text"
                                    value={formData.formFields.service.placeholder}
                                    onChange={(e) => handleFormFieldChange("service", "placeholder", e.target.value)}
                                    className="px-3 py-2 rounded-lg border border-grey-200 focus:border-blue outline-none transition-all"
                                    placeholder="Select a service"
                                />
                            </div>
                            <div className="flex items-center gap-3 mt-3">
                                <label className="text-sm text-grey-600">Required</label>
                                <button
                                    type="button"
                                    onClick={() =>
                                        handleFormFieldChange(
                                            "service",
                                            "required",
                                            !formData.formFields.service.required
                                        )
                                    }
                                    className={`relative w-10 h-5 rounded-full transition-colors ${formData.formFields.service.required ? "bg-cyan" : "bg-grey-300"
                                        }`}
                                >
                                    <span
                                        className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform ${formData.formFields.service.required ? "translate-x-5" : ""
                                            }`}
                                    />
                                </button>
                            </div>
                            <p className="text-xs text-grey-400 mt-2">
                                Service options are automatically loaded from the Services database.
                            </p>
                        </div>

                        {/* Message Field */}
                        <div className="border border-grey-100 rounded-lg p-4">
                            <h4 className="font-semibold text-navy mb-3">Message Field</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <input
                                    type="text"
                                    value={formData.formFields.message.label}
                                    onChange={(e) => handleFormFieldChange("message", "label", e.target.value)}
                                    className="px-3 py-2 rounded-lg border border-grey-200 focus:border-blue outline-none transition-all"
                                    placeholder="Your Requirement"
                                />
                                <input
                                    type="text"
                                    value={formData.formFields.message.placeholder}
                                    onChange={(e) => handleFormFieldChange("message", "placeholder", e.target.value)}
                                    className="px-3 py-2 rounded-lg border border-grey-200 focus:border-blue outline-none transition-all"
                                    placeholder="Briefly describe your business challenge..."
                                />
                            </div>
                            <div className="flex items-center gap-3 mt-3">
                                <label className="text-sm text-grey-600">Required</label>
                                <button
                                    type="button"
                                    onClick={() =>
                                        handleFormFieldChange(
                                            "message",
                                            "required",
                                            !formData.formFields.message.required
                                        )
                                    }
                                    className={`relative w-10 h-5 rounded-full transition-colors ${formData.formFields.message.required ? "bg-cyan" : "bg-grey-300"
                                        }`}
                                >
                                    <span
                                        className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform ${formData.formFields.message.required ? "translate-x-5" : ""
                                            }`}
                                    />
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}