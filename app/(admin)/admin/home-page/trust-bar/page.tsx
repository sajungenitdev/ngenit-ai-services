"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
    Save,
    ArrowLeft,
    Loader2,
    AlertCircle,
    CheckCircle,
    RefreshCw,
} from "lucide-react";
import { TrustBarData } from "@/types/admin/trustBar";
import TrustBarGeneralForm from "@/components/Admin/trust-bar/TrustBarGeneralForm";
import TrustBarPartnersForm from "@/components/Admin/trust-bar/TrustBarPartnersForm";
import TrustBarPreview from "@/components/Admin/trust-bar/TrustBarPreview";
import {
    getTrustBar,
    createTrustBar,
    updateTrustBar,
    resetTrustBar,
    deleteTrustBar,
} from "@/services/trustBarApi";

// ============================================================
// DEFAULT DATA
// ============================================================
const defaultTrustBarData: TrustBarData = {
    isEnabled: true,
    leftText: "Technology Ecosystem",
    partners: [
        { id: "1", name: "Microsoft Azure" },
        { id: "2", name: "AWS" },
        { id: "3", name: "Google Cloud" },
        { id: "4", name: "OpenAI" },
        { id: "5", name: "SAP" },
        { id: "6", name: "Salesforce" },
    ],
};

// ============================================================
// MAIN COMPONENT
// ============================================================
export default function TrustBarPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState<TrustBarData>(defaultTrustBarData);
    const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
    const [existingId, setExistingId] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    // ============================================================
    // LOAD DATA
    // ============================================================
    useEffect(() => {
        const loadData = async () => {
            try {
                setLoading(true);
                const data = await getTrustBar();
                setFormData(data);
                setExistingId(data._id || null);
                setErrorMessage(null);
            } catch (error: any) {
                console.error("Error loading trust bar data:", error);
                if (error.message?.includes('404') || error.message?.includes('not found')) {
                    setFormData(defaultTrustBarData);
                    setExistingId(null);
                    setErrorMessage("No trust bar found. Create one by saving.");
                } else {
                    setErrorMessage(error.message || "Failed to load trust bar data");
                }
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, []);

    // ============================================================
    // SAVE HANDLER
    // ============================================================
    const handleSave = async () => {
        if (saving) return;

        setSaving(true);
        setSaveStatus("saving");
        setErrorMessage(null);

        try {
            let savedData: TrustBarData;
            
            if (existingId) {
                savedData = await updateTrustBar(formData);
                setSaveStatus("saved");
            } else {
                savedData = await createTrustBar(formData);
                setExistingId(savedData._id || null);
                setSaveStatus("saved");
            }
            
            setFormData(savedData);
            setErrorMessage(null);
            
            setTimeout(() => setSaveStatus("idle"), 2000);
        } catch (error: any) {
            console.error("Error saving trust bar data:", error);
            setErrorMessage(error.message || "Failed to save trust bar");
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
        setErrorMessage(null);

        try {
            const data = await resetTrustBar();
            setFormData(data);
            setExistingId(data._id || null);
            setSaveStatus("saved");
            setTimeout(() => setSaveStatus("idle"), 2000);
        } catch (error: any) {
            console.error("Error resetting trust bar data:", error);
            setErrorMessage(error.message || "Failed to reset trust bar");
            setSaveStatus("error");
            setTimeout(() => setSaveStatus("idle"), 3000);
        } finally {
            setSaving(false);
        }
    };

    // ============================================================
    // AUTO-SAVE
    // ============================================================
    useEffect(() => {
        if (!loading && !saving && existingId) {
            const timer = setTimeout(() => {
                handleSave();
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [formData, loading, existingId]);

    // ============================================================
    // LOADING STATE
    // ============================================================
    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-center">
                    <div className="w-12 h-12 border-4 border-cyan border-t-transparent rounded-full animate-spin mx-auto"></div>
                    <p className="text-grey-400 mt-4">Loading trust bar...</p>
                </div>
            </div>
        );
    }

    // ============================================================
    // RENDER
    // ============================================================
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
                        Trust Bar
                    </h2>
                    <p className="text-grey-400 text-sm">
                        {existingId ? "Edit the trust bar section" : "Create the trust bar section"}
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

            {/* ==================== FORM ==================== */}
            <div className="grid grid-cols-1 gap-6">
                <div className="bg-white rounded-xl shadow-sm border border-grey-100 p-6 space-y-6">
                    <TrustBarGeneralForm data={formData} onChange={setFormData} />
                    <hr className="border-grey-200" />
                    <TrustBarPartnersForm data={formData} onChange={setFormData} />
                </div>

                {/* ==================== PREVIEW ==================== */}
                <TrustBarPreview data={formData} />
            </div>
        </div>
    );
}