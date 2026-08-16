"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
    Save,
    ArrowLeft,
    Loader2,
    AlertCircle,
    CheckCircle,
} from "lucide-react";
import { createMethodologyStep } from "@/services/methodologyApi";
import { MethodologyStep } from "@/types/admin/methodology";

const defaultStepData: MethodologyStep = {
    number: 1,
    icon: "🔍",
    title: "",
    description: "",
    isActive: true,
};

export default function CreateMethodologyPage() {
    const router = useRouter();
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
    const [formData, setFormData] = useState<MethodologyStep>(defaultStepData);

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        setSaveStatus("saving");
        setError("");

        try {
            // Validate required fields
            if (!formData.number) {
                throw new Error("Step number is required");
            }
            if (!formData.icon.trim()) {
                throw new Error("Icon is required");
            }
            if (!formData.title.trim()) {
                throw new Error("Title is required");
            }
            if (!formData.description.trim()) {
                throw new Error("Description is required");
            }

            // API Call
            await createMethodologyStep(formData);

            setSaveStatus("saved");
            setTimeout(() => {
                router.push("/admin/home-page/methodology");
            }, 1000);
        } catch (err: any) {
            setError(err.message || "Failed to create methodology step");
            setSaveStatus("error");
        } finally {
            setSaving(false);
            setTimeout(() => setSaveStatus("idle"), 3000);
        }
    };

    return (
        <div className="max-w-3xl mx-auto space-y-6">
            {/* ==================== PAGE HEADER ==================== */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <button
                        onClick={() => router.push("/admin/methodology")}
                        className="text-sm text-grey-400 hover:text-navy transition-colors flex items-center gap-1 mb-1"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Methodology
                    </button>
                    <h2 className="text-2xl font-bold text-navy font-plus-jakarta">
                        Create Methodology Step
                    </h2>
                    <p className="text-grey-400 text-sm">
                        Add a new methodology step
                    </p>
                </div>

                <div className="flex items-center gap-3 flex-wrap">
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
                        form="methodology-form"
                        disabled={saving}
                        className="px-6 py-2 bg-cyan text-navy rounded-lg font-semibold hover:bg-cyan-light transition-all duration-200 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {saving ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                Creating...
                            </>
                        ) : (
                            <>
                                <Save className="w-4 h-4" />
                                Create Step
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

            {/* ==================== FORM ==================== */}
            <form id="methodology-form" onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-grey-100 p-6">
                <div className="space-y-4">
                    {/* Step Number */}
                    <div>
                        <label className="block text-sm font-semibold text-grey-800 mb-1.5">
                            Step Number *
                        </label>
                        <input
                            type="number"
                            name="number"
                            value={formData.number}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 rounded-lg border border-grey-200 focus:border-blue focus:shadow-[0_0_0_3px_rgba(30,95,212,0.1)] outline-none transition-all"
                            placeholder="1"
                            min="1"
                            required
                        />
                        <p className="text-xs text-grey-400 mt-1">
                            The order in which this step appears (e.g., 1, 2, 3...)
                        </p>
                    </div>

                    {/* Icon */}
                    <div>
                        <label className="block text-sm font-semibold text-grey-800 mb-1.5">
                            Icon *
                        </label>
                        <input
                            type="text"
                            name="icon"
                            value={formData.icon}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 rounded-lg border border-grey-200 focus:border-blue outline-none transition-all"
                            placeholder="🔍"
                        />
                        <p className="text-xs text-grey-400 mt-1">
                            Use an emoji as the icon (e.g., 🔍, 📋, 🎨, 🔧, 🚀)
                        </p>
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
                            placeholder="Discover"
                            required
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-semibold text-grey-800 mb-1.5">
                            Description *
                        </label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            rows={3}
                            className="w-full px-4 py-3 rounded-lg border border-grey-200 focus:border-blue outline-none transition-all resize-vertical"
                            placeholder="Understand your business processes, data environment and AI objectives."
                            required
                        />
                    </div>

                    {/* Active Toggle */}
                    <div className="flex items-center gap-3 pt-2 border-t border-grey-100">
                        <label className="text-sm font-semibold text-grey-800">
                            Active
                        </label>
                        <button
                            type="button"
                            onClick={() => setFormData((prev) => ({ ...prev, isActive: !prev.isActive }))}
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
            </form>
        </div>
    );
}