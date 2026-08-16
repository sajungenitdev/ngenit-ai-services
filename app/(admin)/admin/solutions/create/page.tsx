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
    Plus,
    Trash2,
} from "lucide-react";
import RichTextEditor from "@/components/Admin/RichTextEditor";
import { createSolution } from "@/services/solutionApi";
import { SolutionData } from "@/types/admin/solution";

const defaultSolutionData: SolutionData = {
    tag: "🤖 Enterprise AI",
    name: "",
    desc: "",
    tags: [""],
    footer: "",
    image: "",
    isActive: true,
};

export default function CreateSolutionPage() {
    const router = useRouter();
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
    const [formData, setFormData] = useState<SolutionData>(defaultSolutionData);

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleDescriptionChange = (value: string) => {
        setFormData((prev) => ({ ...prev, desc: value }));
    };

    const handleTagChange = (index: number, value: string) => {
        const newTags = formData.tags.map((t, i) =>
            i === index ? value : t
        );
        setFormData((prev) => ({ ...prev, tags: newTags }));
    };

    const addTag = () => {
        setFormData((prev) => ({
            ...prev,
            tags: [...prev.tags, ""],
        }));
    };

    const removeTag = (index: number) => {
        if (formData.tags.length <= 1) return;
        setFormData((prev) => ({
            ...prev,
            tags: prev.tags.filter((_, i) => i !== index),
        }));
    };

    const toggleActive = () => {
        setFormData((prev) => ({ ...prev, isActive: !prev.isActive }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        setSaveStatus("saving");
        setError("");

        try {
            if (!formData.name.trim()) {
                throw new Error("Solution name is required");
            }
            if (!formData.tag.trim()) {
                throw new Error("Tag is required");
            }
            if (!formData.desc.trim()) {
                throw new Error("Description is required");
            }
            if (!formData.footer.trim()) {
                throw new Error("Footer text is required");
            }

            const filteredTags = formData.tags.filter((t) => t.trim());

            await createSolution({
                ...formData,
                tags: filteredTags,
            });

            setSaveStatus("saved");
            setTimeout(() => {
                router.push("/admin/solutions");
            }, 1000);
        } catch (err: any) {
            setError(err.message || "Failed to create solution");
            setSaveStatus("error");
        } finally {
            setSaving(false);
            setTimeout(() => setSaveStatus("idle"), 3000);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <button
                        onClick={() => router.push("/admin/solutions")}
                        className="text-sm text-grey-400 hover:text-navy transition-colors flex items-center gap-1 mb-1"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Solutions
                    </button>
                    <h2 className="text-2xl font-bold text-navy font-plus-jakarta">
                        Create AI Solution
                    </h2>
                    <p className="text-grey-400 text-sm">
                        Add a new packaged AI solution ready to deploy
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
                        form="solution-form"
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
                                Create Solution
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

            <form id="solution-form" onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-grey-100 p-6">
                <div className="space-y-6">
                    <div className="border-b border-grey-100 pb-6">
                        <h3 className="text-lg font-semibold text-navy font-plus-jakarta mb-4">
                            Basic Information
                        </h3>

                        <div>
                            <label className="block text-sm font-semibold text-grey-800 mb-1.5">
                                Tag (Icon + Category) *
                            </label>
                            <input
                                type="text"
                                name="tag"
                                value={formData.tag}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 rounded-lg border border-grey-200 focus:border-blue outline-none transition-all"
                                placeholder="🤖 Enterprise AI"
                                required
                            />
                            <p className="text-xs text-grey-400 mt-1">
                                Example: &quot;🤖 Enterprise AI&quot; or &quot;🏭 Industrial AI&quot;
                            </p>
                        </div>

                        <div className="mt-4">
                            <label className="block text-sm font-semibold text-grey-800 mb-1.5">
                                Solution Name *
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 rounded-lg border border-grey-200 focus:border-blue outline-none transition-all"
                                placeholder="Enterprise AI Assistant"
                                required
                            />
                        </div>

                        <div className="mt-4">
                            <label className="block text-sm font-semibold text-grey-800 mb-1.5">
                                Description *
                            </label>
                            <p className="text-sm text-grey-400 mb-3">
                                Detailed description of the solution with rich formatting
                            </p>
                            <RichTextEditor
                                value={formData.desc}
                                onChange={handleDescriptionChange}
                                placeholder="An intelligent assistant that searches company knowledge, answers employee and customer questions..."
                                height={150}
                            />
                        </div>

                        <div className="py-5">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold text-navy font-plus-jakarta">
                                    Industry Tags
                                </h3>
                                <button
                                    type="button"
                                    onClick={addTag}
                                    className="text-sm text-cyan hover:text-cyan-light font-medium flex items-center gap-1"
                                >
                                    <Plus className="w-4 h-4" />
                                    Add Tag
                                </button>
                            </div>
                            <p className="text-sm text-grey-400 mb-4">
                                Industries or categories this solution applies to
                            </p>
                            <div className="space-y-3">
                                {formData.tags.map((tag, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center gap-3 border border-grey-100 rounded-lg p-3 hover:border-grey-200 transition-colors"
                                    >
                                        <span className="text-grey-400 text-sm">#</span>
                                        <input
                                            type="text"
                                            value={tag}
                                            onChange={(e) => handleTagChange(index, e.target.value)}
                                            className="flex-1 px-3 py-2 rounded-lg border border-grey-200 focus:border-blue outline-none transition-all"
                                            placeholder="All Industries"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => removeTag(index)}
                                            className="text-red-400 hover:text-red-600 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                                            disabled={formData.tags.length <= 1}
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                            {formData.tags.length <= 1 && (
                                <p className="text-xs text-grey-400 mt-2">
                                    At least one tag is required
                                </p>
                            )}
                        </div>

                        <div className="mt-4">
                            <label className="block text-sm font-semibold text-grey-800 mb-1.5">
                                Footer Text *
                            </label>
                            <input
                                type="text"
                                name="footer"
                                value={formData.footer}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 rounded-lg border border-grey-200 focus:border-blue outline-none transition-all"
                                placeholder="Automate · Search · Summarize"
                                required
                            />
                            <p className="text-xs text-grey-400 mt-1">
                                Short description displayed at the bottom of the card
                            </p>
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
                            <span className="text-sm text-grey-600">
                                {formData.isActive ? "Active" : "Inactive"}
                            </span>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}