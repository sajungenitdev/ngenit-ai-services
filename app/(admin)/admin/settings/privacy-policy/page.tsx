"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
    Save,
    Loader2,
    ArrowLeft,
    Eye,
    RefreshCw,
    Trash2,
    Edit2,
    Clock,
    CheckCircle,
    AlertCircle,
    X,
    Archive,
    FileText,
    Shield,
} from "lucide-react";
import toast from "react-hot-toast";
import RichTextEditor from "@/components/Admin/RichTextEditor";

interface PrivacyPolicy {
    _id?: string;
    title: string;
    content: string;
    status: "draft" | "published" | "archived";
    version: number;
    publishedAt?: string;
    lastUpdated?: string;
    updatedBy?: {
        fullName?: string;
    };
    metadata?: {
        wordCount: number;
        characterCount: number;
    };
}

// API Base URL from environment
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

// Simple API fetch - NO TOKEN REQUIRED
const apiFetch = async (endpoint: string, options: RequestInit = {}) => {
    const response = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            ...options.headers,
        },
    });

    const data = await response.json();

    if (!response.ok) {
        throw {
            response: {
                status: response.status,
                data: data,
            },
            message: data.message || "Request failed",
        };
    }

    return data;
};

export default function PrivacyPolicyAdminPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [publishing, setPublishing] = useState(false);
    const [archiving, setArchiving] = useState(false);
    const [policy, setPolicy] = useState<PrivacyPolicy>({
        title: "Privacy Policy",
        content: "",
        status: "draft",
        version: 1,
    });
    const [showPreview, setShowPreview] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [showPublishConfirm, setShowPublishConfirm] = useState(false);
    const [lastSaved, setLastSaved] = useState<string | null>(null);
    const [unsavedChanges, setUnsavedChanges] = useState(false);
    const [versions, setVersions] = useState<PrivacyPolicy[]>([]);
    const [showVersionHistory, setShowVersionHistory] = useState(false);

    // Fetch existing policy
    useEffect(() => {
        fetchPolicy();
        fetchVersions();
    }, []);

    // Auto-save
    useEffect(() => {
        if (!unsavedChanges || !policy.content.trim()) return;

        const timer = setTimeout(() => {
            handleSave(true);
        }, 5000);

        return () => clearTimeout(timer);
    }, [policy.content, policy.title, unsavedChanges]);

    const fetchPolicy = async () => {
        try {
            setLoading(true);
            const data = await apiFetch("/privacy-policy");
            if (data.success && data.data) {
                setPolicy(data.data);
                setLastSaved(data.data.lastUpdated || null);
                setUnsavedChanges(false);
            }
        } catch (error: any) {
            if (error.response?.status === 404) {
                console.log("No existing policy found - creating new one");
                setPolicy({
                    title: "Privacy Policy",
                    content: "",
                    status: "draft",
                    version: 1,
                });
            } else {
                toast.error(error.message || "Failed to load policy");
            }
        } finally {
            setLoading(false);
        }
    };

    const fetchVersions = async () => {
        try {
            const data = await apiFetch("/privacy-policy/versions");
            if (data.success) {
                setVersions(data.data || []);
            }
        } catch (error: any) {
            console.error("Error fetching versions:", error);
        }
    };

    const handleSave = async (silent = false) => {
        if (!policy.title.trim()) {
            toast.error("Title is required");
            return;
        }

        if (!policy.content.trim()) {
            toast.error("Content is required");
            return;
        }

        setSaving(true);
        try {
            const data = await apiFetch("/privacy-policy", {
                method: "POST",
                body: JSON.stringify({
                    title: policy.title,
                    content: policy.content,
                    status: policy.status,
                }),
            });

            if (data.success) {
                setPolicy(data.data);
                setLastSaved(new Date().toISOString());
                setUnsavedChanges(false);
                await fetchVersions();
                if (!silent) {
                    toast.success("Privacy policy saved successfully!");
                }
            }
        } catch (error: any) {
            if (!silent) {
                toast.error(error.message || "Failed to save policy");
            }
        } finally {
            setSaving(false);
        }
    };

    const handlePublish = async () => {
        if (!policy._id) {
            toast.error("Please save the policy first");
            return;
        }

        if (!policy.content.trim()) {
            toast.error("Cannot publish empty policy");
            return;
        }

        setPublishing(true);
        try {
            const data = await apiFetch(`/privacy-policy/${policy._id}/publish`, {
                method: "PATCH",
            });

            if (data.success) {
                setPolicy(data.data);
                await fetchVersions();
                toast.success("🎉 Privacy policy published successfully!");
                setShowPublishConfirm(false);
            }
        } catch (error: any) {
            toast.error(error.message || "Failed to publish policy");
        } finally {
            setPublishing(false);
        }
    };

    const handleArchive = async () => {
        if (!policy._id) {
            toast.error("No policy to archive");
            return;
        }

        setArchiving(true);
        try {
            const data = await apiFetch(`/privacy-policy/${policy._id}/archive`, {
                method: "PATCH",
            });

            if (data.success) {
                setPolicy(data.data);
                await fetchVersions();
                toast.success("Policy archived successfully");
            }
        } catch (error: any) {
            toast.error(error.message || "Failed to archive policy");
        } finally {
            setArchiving(false);
        }
    };

    const handleDelete = async () => {
        if (!policy._id) {
            toast.error("No policy to delete");
            return;
        }

        try {
            const data = await apiFetch(`/privacy-policy/${policy._id}`, {
                method: "DELETE",
            });

            if (data.success) {
                toast.success("Policy deleted successfully");
                setShowDeleteConfirm(false);
                setPolicy({
                    title: "Privacy Policy",
                    content: "",
                    status: "draft",
                    version: 1,
                });
                await fetchVersions();
                router.push("/admin");
            }
        } catch (error: any) {
            toast.error(error.message || "Failed to delete policy");
        }
    };

    const handleContentChange = (value: string) => {
        setPolicy({ ...policy, content: value });
        setUnsavedChanges(true);
    };

    const loadVersion = async (version: number) => {
        try {
            const data = await apiFetch(`/privacy-policy/version/${version}`);
            if (data.success) {
                setPolicy(data.data);
                setUnsavedChanges(false);
                setShowVersionHistory(false);
                toast.success(`Loaded version ${version}`);
            }
        } catch (error: any) {
            toast.error(error.message || "Failed to load version");
        }
    };

    const getStatusBadge = (status: string) => {
        const configs = {
            draft: { color: "bg-amber-100 text-amber-700 border-amber-200", icon: Edit2 },
            published: { color: "bg-emerald-100 text-emerald-700 border-emerald-200", icon: CheckCircle },
            archived: { color: "bg-gray-100 text-gray-700 border-gray-200", icon: Archive },
        };

        const config = configs[status as keyof typeof configs] || configs.draft;
        const Icon = config.icon;

        return (
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${config.color}`}>
                <Icon size={12} />
                {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
        );
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="text-center">
                    <Loader2 className="w-10 h-10 animate-spin text-indigo-600 mx-auto mb-4" />
                    <p className="text-gray-500">Loading privacy policy...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="p-4 md:p-6 lg:p-8">
                <div className="container mx-auto space-y-6">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => router.back()}
                                className="p-2 hover:bg-gray-100 rounded-xl transition"
                            >
                                <ArrowLeft size={20} className="text-gray-500" />
                            </button>
                            <div>
                                <div className="flex items-center gap-2">
                                    <Shield className="w-6 h-6 text-indigo-600" />
                                    <h1 className="text-2xl font-bold text-gray-900">
                                        Privacy Policy Editor
                                    </h1>
                                </div>
                                <div className="flex items-center gap-3 mt-1 flex-wrap">
                                    {getStatusBadge(policy.status)}
                                    {policy.version > 1 && (
                                        <span className="text-xs text-gray-400">
                                            v{policy.version}
                                        </span>
                                    )}
                                    {lastSaved && (
                                        <span className="text-xs text-gray-400 flex items-center gap-1">
                                            <Clock size={12} />
                                            Last saved: {new Date(lastSaved).toLocaleString()}
                                        </span>
                                    )}
                                    {unsavedChanges && (
                                        <span className="text-xs text-amber-600 flex items-center gap-1 animate-pulse">
                                            <AlertCircle size={12} />
                                            Unsaved changes
                                        </span>
                                    )}
                                    {policy.metadata && (
                                        <span className="text-xs text-gray-400 flex items-center gap-1">
                                            <FileText size={12} />
                                            {policy.metadata.wordCount || 0} words
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-wrap items-center gap-2">
                            <button
                                onClick={() => setShowVersionHistory(!showVersionHistory)}
                                className="px-4 py-2 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-xl transition text-sm font-medium flex items-center gap-2"
                            >
                                <Clock size={16} />
                                History ({versions.length})
                            </button>
                            <button
                                onClick={() => setShowPreview(!showPreview)}
                                className="px-4 py-2 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-xl transition text-sm font-medium flex items-center gap-2"
                            >
                                <Eye size={16} />
                                {showPreview ? "Edit" : "Preview"}
                            </button>
                            <button
                                onClick={() => handleSave(false)}
                                disabled={saving}
                                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl transition text-sm font-medium flex items-center gap-2 disabled:opacity-50 shadow-sm"
                            >
                                {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                                Save Draft
                            </button>
                            {policy.status !== "published" && (
                                <button
                                    onClick={() => setShowPublishConfirm(true)}
                                    disabled={publishing || !policy.content.trim()}
                                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl transition text-sm font-medium flex items-center gap-2 disabled:opacity-50 shadow-sm"
                                >
                                    {publishing ? <Loader2 size={16} className="animate-spin" /> : <CheckCircle size={16} />}
                                    Publish
                                </button>
                            )}
                            {policy.status === "published" && (
                                <button
                                    onClick={handleArchive}
                                    disabled={archiving}
                                    className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-xl transition text-sm font-medium flex items-center gap-2 disabled:opacity-50 shadow-sm"
                                >
                                    {archiving ? <Loader2 size={16} className="animate-spin" /> : <RefreshCw size={16} />}
                                    Archive
                                </button>
                            )}
                            {policy._id && (
                                <button
                                    onClick={() => setShowDeleteConfirm(true)}
                                    className="p-2 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition"
                                >
                                    <Trash2 size={18} />
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Version History */}
                    {showVersionHistory && versions.length > 0 && (
                        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                                <h3 className="text-sm font-semibold text-gray-800">Version History</h3>
                                <button
                                    onClick={() => setShowVersionHistory(false)}
                                    className="text-gray-400 hover:text-gray-600"
                                >
                                    <X size={16} />
                                </button>
                            </div>
                            <div className="p-4 space-y-2 max-h-[300px] overflow-y-auto">
                                {versions.map((v) => (
                                    <div
                                        key={v._id}
                                        className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition cursor-pointer"
                                        onClick={() => loadVersion(v.version)}
                                    >
                                        <div className="flex items-center gap-3">
                                            <span className="text-sm font-medium text-gray-800">
                                                v{v.version}
                                            </span>
                                            {getStatusBadge(v.status)}
                                            <span className="text-xs text-gray-400">
                                                {v.updatedBy?.fullName || "System"}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs text-gray-400">
                                                {v.lastUpdated ? new Date(v.lastUpdated).toLocaleDateString() : "N/A"}
                                            </span>
                                            {v._id === policy._id && (
                                                <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full">
                                                    Current
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Main Editor */}
                    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                        <div className="p-6">
                            {/* Title Input */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Policy Title
                                </label>
                                <input
                                    type="text"
                                    value={policy.title}
                                    onChange={(e) => {
                                        setPolicy({ ...policy, title: e.target.value });
                                        setUnsavedChanges(true);
                                    }}
                                    className="w-full px-4 py-2.5 border bg-white border-gray-200 rounded-xl text-gray-800 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 outline-none transition"
                                    placeholder="Enter policy title..."
                                />
                            </div>

                            {/* Content Editor */}
                            {!showPreview ? (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Policy Content
                                    </label>
                                    <RichTextEditor
                                        value={policy.content}
                                        onChange={handleContentChange}
                                        placeholder="Write your privacy policy content here..."
                                        height={500}
                                    />
                                </div>
                            ) : (
                                <div className="prose prose-lg prose-gray max-w-none p-6 bg-gray-50 rounded-xl border border-gray-200 min-h-[400px]">
                                    <div dangerouslySetInnerHTML={{ __html: policy.content }} />
                                    {!policy.content && (
                                        <p className="text-gray-400 text-center py-20">
                                            No content to preview
                                        </p>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Quick Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
                            <p className="text-xs text-gray-500 font-medium">Status</p>
                            <p className="text-sm font-semibold text-gray-800 mt-1">
                                {policy.status.charAt(0).toUpperCase() + policy.status.slice(1)}
                            </p>
                        </div>
                        <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
                            <p className="text-xs text-gray-500 font-medium">Version</p>
                            <p className="text-sm font-semibold text-gray-800 mt-1">
                                v{policy.version}
                            </p>
                        </div>
                        <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
                            <p className="text-xs text-gray-500 font-medium">Word Count</p>
                            <p className="text-sm font-semibold text-gray-800 mt-1">
                                {policy.content.replace(/<[^>]*>/g, "").split(/\s+/).filter(Boolean).length || 0}
                            </p>
                        </div>
                        <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
                            <p className="text-xs text-gray-500 font-medium">Characters</p>
                            <p className="text-sm font-semibold text-gray-800 mt-1">
                                {policy.content.replace(/<[^>]*>/g, "").length || 0}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Publish Confirmation Modal */}
            {showPublishConfirm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl border border-gray-200 shadow-2xl w-full max-w-md p-6">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                <CheckCircle className="w-8 h-8 text-emerald-500" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 mb-2">
                                Publish Privacy Policy
                            </h3>
                            <p className="text-gray-500 text-sm mb-6">
                                This will make the privacy policy publicly visible on your website.
                                Are you sure you want to publish it?
                            </p>
                            <div className="flex gap-3">
                                <button
                                    onClick={handlePublish}
                                    disabled={publishing}
                                    className="flex-1 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition flex items-center justify-center gap-2 disabled:opacity-50"
                                >
                                    {publishing ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                                    Publish
                                </button>
                                <button
                                    onClick={() => setShowPublishConfirm(false)}
                                    className="flex-1 px-4 py-2.5 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-lg transition"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {showDeleteConfirm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl border border-gray-200 shadow-2xl w-full max-w-md p-6">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-rose-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Trash2 className="w-8 h-8 text-rose-500" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 mb-2">
                                Delete Privacy Policy
                            </h3>
                            <p className="text-gray-500 text-sm mb-6">
                                Are you sure you want to delete this privacy policy? This action
                                cannot be undone.
                            </p>
                            <div className="flex gap-3">
                                <button
                                    onClick={handleDelete}
                                    className="flex-1 px-4 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-lg transition"
                                >
                                    Delete
                                </button>
                                <button
                                    onClick={() => setShowDeleteConfirm(false)}
                                    className="flex-1 px-4 py-2.5 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-lg transition"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}