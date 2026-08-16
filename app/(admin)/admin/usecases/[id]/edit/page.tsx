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
import { getUseCaseById, updateUseCase } from "@/services/useCaseApi";
import { getIndustries } from "@/services/industryApi";
import { getServices } from "@/services/serviceApi";
import { UseCaseData } from "@/types/admin/useCase";

// ============================================================
// DEFAULT DATA
// ============================================================
const defaultUseCaseData: UseCaseData = {
    name: "",
    industry: "",
    service: "",
    desc: "",
    result: "",
    image: "",
    isActive: true,
};

// ============================================================
// MAIN COMPONENT
// ============================================================
export default function EditUseCasePage() {
    const router = useRouter();
    const params = useParams();
    const useCaseId = params.id as string;

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
    const [formData, setFormData] = useState<UseCaseData>(defaultUseCaseData);
    const [industries, setIndustries] = useState<string[]>([]);
    const [services, setServices] = useState<string[]>([]);

    // ============================================================
    // FETCH DATA
    // ============================================================
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                
                // Fetch all data in parallel
                const [industriesData, servicesData, useCaseData] = await Promise.all([
                    getIndustries(),
                    getServices(),
                    getUseCaseById(useCaseId)
                ]);

                setIndustries(industriesData.map(ind => ind.name));
                setServices(servicesData.map(ser => ser.name));
                
                setFormData({
                    name: useCaseData.name || "",
                    industry: useCaseData.industry || "",
                    service: useCaseData.service || "",
                    desc: useCaseData.desc || "",
                    result: useCaseData.result || "",
                    image: useCaseData.image || "",
                    isActive: useCaseData.isActive !== undefined ? useCaseData.isActive : true,
                });
                
            } catch (error) {
                console.error("Error fetching data:", error);
                setError("Failed to load use case data. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        if (useCaseId) {
            fetchData();
        }
    }, [useCaseId]);

    // ============================================================
    // HANDLERS
    // ============================================================
    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleDescriptionChange = (value: string) => {
        setFormData((prev) => ({ ...prev, desc: value }));
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
                throw new Error("Use case name is required");
            }
            if (!formData.industry) {
                throw new Error("Industry is required");
            }
            if (!formData.service) {
                throw new Error("Service is required");
            }
            if (!formData.desc.trim()) {
                throw new Error("Description is required");
            }
            if (!formData.result.trim()) {
                throw new Error("Result is required");
            }

            // API Call
            await updateUseCase(useCaseId, formData);

            setSaveStatus("saved");
            setTimeout(() => {
                router.push("/admin/usecases");
            }, 1000);
        } catch (err: any) {
            setError(err.message || "Failed to update use case");
            setSaveStatus("error");
        } finally {
            setSaving(false);
            setTimeout(() => setSaveStatus("idle"), 3000);
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
                    <p className="text-grey-400 mt-4">Loading use case...</p>
                </div>
            </div>
        );
    }

    // ============================================================
    // RENDER
    // ============================================================
    return (
        <div className="max-w-4xl mx-auto space-y-6">
            {/* ==================== PAGE HEADER ==================== */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <button
                        onClick={() => router.push("/admin/usecases")}
                        className="text-sm text-grey-400 hover:text-navy transition-colors flex items-center gap-1 mb-1"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Use Cases
                    </button>
                    <h2 className="text-2xl font-bold text-navy font-plus-jakarta">
                        Edit Use Case
                    </h2>
                    <p className="text-grey-400 text-sm">
                        Update use case details
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
                        form="usecase-form"
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
                                Update Use Case
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
            <form id="usecase-form" onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-grey-100 p-6">
                <div className="space-y-6">
                    {/* ========== BASIC INFO ========== */}
                    <div className="border-b border-grey-100 pb-6">
                        <h3 className="text-lg font-semibold text-navy font-plus-jakarta mb-4">
                            Basic Information
                        </h3>

                        <div>
                            <label className="block text-sm font-semibold text-grey-800 mb-1.5">
                                Use Case Name *
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 rounded-lg border border-grey-200 focus:border-blue outline-none transition-all"
                                placeholder="Automated Tender Document Preparation"
                                required
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                            <div>
                                <label className="block text-sm font-semibold text-grey-800 mb-1.5">
                                    Industry *
                                </label>
                                <select
                                    name="industry"
                                    value={formData.industry}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 rounded-lg border border-grey-200 focus:border-blue outline-none transition-all"
                                    required
                                >
                                    <option value="">Select Industry</option>
                                    {industries.map((ind) => (
                                        <option key={ind} value={ind}>
                                            {ind}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-grey-800 mb-1.5">
                                    AI Service *
                                </label>
                                <select
                                    name="service"
                                    value={formData.service}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 rounded-lg border border-grey-200 focus:border-blue outline-none transition-all"
                                    required
                                >
                                    <option value="">Select Service</option>
                                    {services.map((svc) => (
                                        <option key={svc} value={svc}>
                                            {svc}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 mt-4">
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
                        </div>
                    </div>

                    {/* ========== DESCRIPTION ========== */}
                    <div className="border-b border-grey-100 pb-6">
                        <h3 className="text-lg font-semibold text-navy font-plus-jakarta mb-4">
                            Description *
                        </h3>
                        <p className="text-sm text-grey-400 mb-3">
                            Describe the use case in detail with rich formatting
                        </p>
                        <RichTextEditor
                            value={formData.desc}
                            onChange={handleDescriptionChange}
                            placeholder="Describe how this AI solution is applied in the real world..."
                            height={150}
                        />
                    </div>

                    {/* ========== RESULT ========== */}
                    <div>
                        <h3 className="text-lg font-semibold text-navy font-plus-jakarta mb-4">
                            Result / Impact *
                        </h3>
                        <p className="text-sm text-grey-400 mb-3">
                            The measurable outcome or benefit achieved
                        </p>
                        <div>
                            <input
                                type="text"
                                name="result"
                                value={formData.result}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 rounded-lg border border-grey-200 focus:border-blue outline-none transition-all"
                                placeholder="~60% faster proposal drafting"
                                required
                            />
                            <p className="text-xs text-grey-400 mt-1">
                                Example: &quot;35–60% less unplanned downtime&quot; or &quot;3x faster response time&quot;
                            </p>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}