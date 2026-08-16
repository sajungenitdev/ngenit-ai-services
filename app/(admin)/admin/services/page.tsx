"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
    Plus,
    Search,
    Edit,
    Trash2,
    Eye,
    Layers,
    Loader2,
    X,
    CheckCircle2,
    XCircle,
    ChevronLeft,
    ChevronRight,
    Sparkles,
    ArrowUpRight,
    Check,
    Calendar,
    Clock,
} from "lucide-react";
import { getServices, deleteService, toggleServiceStatus } from "@/services/serviceApi";
import { ServiceData } from "@/types/admin/service";

export default function ServicesPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [services, setServices] = useState<ServiceData[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState<"all" | "active" | "inactive">("all");
    const [selectedService, setSelectedService] = useState<ServiceData | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async () => {
        try {
            setLoading(true);
            const data = await getServices();
            setServices(data || []);
        } catch (error) {
            console.error("Error fetching services:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this service? This action cannot be undone.")) return;

        try {
            setActionLoadingId(id);
            await deleteService(id);
            await fetchServices();
        } catch (error) {
            console.error("Error deleting service:", error);
            alert("Failed to delete service. Please try again.");
        } finally {
            setActionLoadingId(null);
        }
    };

    const handleToggleStatus = async (id: string, currentStatus: boolean) => {
        try {
            setActionLoadingId(id);
            await toggleServiceStatus(id, !currentStatus);
            await fetchServices();
        } catch (error) {
            console.error("Error toggling service status:", error);
            alert("Failed to update service status. Please try again.");
        } finally {
            setActionLoadingId(null);
        }
    };

    const handleView = (service: ServiceData) => {
        setSelectedService(service);
        setShowModal(true);
    };

    const filteredServices = useMemo(() => {
        return services.filter((service) => {
            const matchesSearch =
                service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                service.tagline.toLowerCase().includes(searchTerm.toLowerCase()) ||
                service.summary?.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesStatus =
                statusFilter === "all" ||
                (statusFilter === "active" && service.isActive) ||
                (statusFilter === "inactive" && !service.isActive);

            return matchesSearch && matchesStatus;
        });
    }, [services, searchTerm, statusFilter]);

    // Reset page index on filter change
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, statusFilter]);

    // Pagination parameters
    const totalPages = Math.ceil(filteredServices.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedServices = filteredServices.slice(startIndex, startIndex + itemsPerPage);

    const stats = useMemo(() => ({
        total: services.length,
        active: services.filter((s) => s.isActive).length,
        inactive: services.filter((s) => !s.isActive).length,
    }), [services]);

    if (loading) {
        return (
            <div className="min-h-[400px] flex items-center justify-center bg-white">
                <div className="flex flex-col items-center gap-3">
                    <div className="relative">
                        <div className="w-12 h-12 rounded-full border-2 border-slate-200 border-t-indigo-600 animate-spin" />
                        <Sparkles className="w-5 h-5 text-indigo-600 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                    </div>
                    <p className="text-sm font-medium text-slate-500 animate-pulse">Loading AI Services...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto space-y-8 min-h-screen">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
                <div>
                    <div className="flex items-center gap-2">
                        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                            AI Services
                        </h1>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700 border border-indigo-200">
                            Manage
                        </span>
                    </div>
                    <p className="text-sm text-slate-500 mt-1">
                        Configure, publish, and monitor your platform AI capabilities.
                    </p>
                </div>
                <Link
                    href="/admin/services/create"
                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-sm rounded-xl shadow-sm hover:shadow transition-all duration-200 active:scale-[0.98]"
                >
                    <Plus className="w-4 h-4" />
                    Create Service
                </Link>
            </div>

            {/* Metrics Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <button
                    onClick={() => setStatusFilter("all")}
                    className={`p-4 rounded-2xl border text-left transition-all duration-200 ${statusFilter === "all"
                        ? "bg-white border-indigo-500 ring-2 ring-indigo-500/10 shadow-sm"
                        : "bg-white border-slate-200 hover:border-slate-300"
                        }`}
                >
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Total Services</span>
                        <Layers className="w-4 h-4 text-indigo-600" />
                    </div>
                    <div className="text-2xl font-bold text-slate-900 mt-2">{stats.total}</div>
                </button>

                <button
                    onClick={() => setStatusFilter("active")}
                    className={`p-4 rounded-2xl border text-left transition-all duration-200 ${statusFilter === "active"
                        ? "bg-white border-emerald-500 ring-2 ring-emerald-500/10 shadow-sm"
                        : "bg-white border-slate-200 hover:border-slate-300"
                        }`}
                >
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Active</span>
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    </div>
                    <div className="text-2xl font-bold text-emerald-600 mt-2">{stats.active}</div>
                </button>

                <button
                    onClick={() => setStatusFilter("inactive")}
                    className={`p-4 rounded-2xl border text-left transition-all duration-200 ${statusFilter === "inactive"
                        ? "bg-white border-amber-500 ring-2 ring-amber-500/10 shadow-sm"
                        : "bg-white border-slate-200 hover:border-slate-300"
                        }`}
                >
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Inactive</span>
                        <XCircle className="w-4 h-4 text-amber-600" />
                    </div>
                    <div className="text-2xl font-bold text-amber-600 mt-2">{stats.inactive}</div>
                </button>
            </div>

            {/* Control Toolbar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="relative w-full sm:max-w-md">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search by name, tagline, or summary..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-white text-slate-900 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all shadow-sm"
                    />
                    {searchTerm && (
                        <button
                            onClick={() => setSearchTerm("")}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                        >
                            <X className="w-3.5 h-3.5" />
                        </button>
                    )}
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                    <div className="inline-flex rounded-xl p-1 bg-slate-100 border border-slate-200 text-xs font-medium">
                        <button
                            onClick={() => setStatusFilter("all")}
                            className={`px-3 py-1.5 rounded-lg transition-all ${statusFilter === "all"
                                ? "bg-white text-slate-900 shadow-sm font-semibold"
                                : "text-slate-600 hover:text-slate-900"
                                }`}
                        >
                            All
                        </button>
                        <button
                            onClick={() => setStatusFilter("active")}
                            className={`px-3 py-1.5 rounded-lg transition-all ${statusFilter === "active"
                                ? "bg-white text-slate-900 shadow-sm font-semibold"
                                : "text-slate-600 hover:text-slate-900"
                                }`}
                        >
                            Active
                        </button>
                        <button
                            onClick={() => setStatusFilter("inactive")}
                            className={`px-3 py-1.5 rounded-lg transition-all ${statusFilter === "inactive"
                                ? "bg-white text-slate-900 shadow-sm font-semibold"
                                : "text-slate-600 hover:text-slate-900"
                                }`}
                        >
                            Inactive
                        </button>
                    </div>
                </div>
            </div>

            {/* Content Table / Data Cards */}
            {filteredServices.length === 0 ? (
                <div className="bg-white rounded-2xl border border-dashed border-slate-200 p-12 text-center">
                    <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto mb-4 text-slate-400">
                        <Layers className="w-6 h-6" />
                    </div>
                    <h3 className="text-base font-semibold text-slate-900 mb-1">
                        {searchTerm || statusFilter !== "all" ? "No matching services" : "No services configured"}
                    </h3>
                    <p className="text-sm text-slate-500 max-w-sm mx-auto mb-6">
                        {searchTerm || statusFilter !== "all"
                            ? "Try modifying your active search terms or status filters."
                            : "Get started by adding your first service to the admin dashboard."}
                    </p>
                    {!searchTerm && statusFilter === "all" && (
                        <Link
                            href="/admin/services/create"
                            className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-medium shadow-sm"
                        >
                            <Plus className="w-4 h-4" />
                            Create Service
                        </Link>
                    )}
                </div>
            ) : (
                <div className="space-y-4">
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm">
                                <thead>
                                    <tr className="border-b border-slate-200 bg-slate-50 text-xs uppercase font-semibold text-slate-500">
                                        <th className="px-6 py-4">Sl</th>
                                        <th className="px-6 py-4">Service</th>
                                        <th className="px-6 py-4">Tagline & Summary</th>
                                        <th className="px-6 py-4">Features</th>
                                        <th className="px-6 py-4">Status</th>
                                        <th className="px-6 py-4 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {paginatedServices.map((service, index) => {
                                        const isLoadingThis = actionLoadingId === service._id;
                                        return (
                                            <tr
                                                key={service._id}
                                                className="group hover:bg-slate-50/80 transition-colors"
                                            >
                                                <td className="text-black text-center">{index+1}</td>
                                                {/* Service Icon & Name */}
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-xl shrink-0">
                                                            {service.icon || "✨"}
                                                        </div>
                                                        <div className="min-w-0">
                                                            <p className="font-semibold text-slate-900 truncate">
                                                                {service.name}
                                                            </p>
                                                            <span className="text-xs text-slate-400 block font-mono">
                                                                ID: {service._id?.slice(-6)}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </td>

                                                {/* Tagline & Summary */}
                                                <td className="px-6 py-4 max-w-xs">
                                                    <p className="font-medium text-slate-800 truncate">
                                                        {service.tagline}
                                                    </p>
                                                    <p className="text-xs text-slate-500 truncate mt-0.5">
                                                        {service.summary || "No summary provided"}
                                                    </p>
                                                </td>

                                                {/* Metadata Counts */}
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-1.5 text-xs">
                                                        <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-slate-100 border border-slate-200 font-medium text-slate-600">
                                                            {service.benefits?.length || 0} benefits
                                                        </span>
                                                        <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-slate-100 border border-slate-200 font-medium text-slate-600">
                                                            {service.capabilities?.length || 0} features
                                                        </span>
                                                    </div>
                                                </td>

                                                {/* Status Badge Toggle */}
                                                <td className="px-6 py-4">
                                                    <button
                                                        onClick={() => handleToggleStatus(service._id!, service.isActive || false)}
                                                        disabled={isLoadingThis}
                                                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border transition-all ${service.isActive
                                                            ? "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100"
                                                            : "bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200"
                                                            }`}
                                                    >
                                                        <span
                                                            className={`w-1.5 h-1.5 rounded-full ${service.isActive ? "bg-emerald-500 animate-pulse" : "bg-slate-400"
                                                                }`}
                                                        />
                                                        {service.isActive ? "Active" : "Disabled"}
                                                    </button>
                                                </td>

                                                {/* Action Toolbar */}
                                                <td className="px-6 py-4 text-right">
                                                    <div className="flex items-center justify-end gap-1 opacity-90 group-hover:opacity-100">
                                                        <button
                                                            onClick={() => handleView(service)}
                                                            className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                                                            title="View Details"
                                                        >
                                                            <Eye className="w-4 h-4" />
                                                        </button>
                                                        <Link
                                                            href={`/admin/services/${service._id}/edit`}
                                                            className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                            title="Edit Service"
                                                        >
                                                            <Edit className="w-4 h-4" />
                                                        </Link>
                                                        <button
                                                            onClick={() => handleDelete(service._id!)}
                                                            disabled={isLoadingThis}
                                                            className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors disabled:opacity-50"
                                                            title="Delete Service"
                                                        >
                                                            {isLoadingThis ? (
                                                                <Loader2 className="w-4 h-4 animate-spin" />
                                                            ) : (
                                                                <Trash2 className="w-4 h-4" />
                                                            )}
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Pagination Controls */}
                    {totalPages > 1 && (
                        <div className="flex items-center justify-between px-4 py-3 bg-white rounded-xl border border-slate-200 shadow-sm">
                            <span className="text-xs text-slate-500">
                                Showing <span className="font-semibold text-slate-800">{startIndex + 1}</span> to{" "}
                                <span className="font-semibold text-slate-800">
                                    {Math.min(startIndex + itemsPerPage, filteredServices.length)}
                                </span>{" "}
                                of <span className="font-semibold text-slate-800">{filteredServices.length}</span> entries
                            </span>

                            <div className="flex items-center gap-1.5">
                                <button
                                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                                    disabled={currentPage === 1}
                                    className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:hover:bg-transparent transition-colors"
                                >
                                    <ChevronLeft className="w-4 h-4" />
                                </button>
                                <span className="text-xs font-medium text-slate-600 px-2">
                                    Page {currentPage} of {totalPages}
                                </span>
                                <button
                                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                                    disabled={currentPage === totalPages}
                                    className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:hover:bg-transparent transition-colors"
                                >
                                    <ChevronRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* Inspector Modal */}
            {showModal && selectedService && (
                <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
                    <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[85vh] shadow-2xl border border-slate-200 flex flex-col overflow-hidden">
                        {/* Modal Header */}
                        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-white">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-2xl">
                                    {selectedService.icon || "✨"}
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-slate-900">
                                        {selectedService.name}
                                    </h3>
                                    <p className="text-xs text-slate-500 font-medium">{selectedService.tagline}</p>
                                </div>
                            </div>
                            <button
                                onClick={() => {
                                    setShowModal(false);
                                    setSelectedService(null);
                                }}
                                className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Modal Scrollable Content */}
                        <div className="p-6 overflow-y-auto space-y-6 text-sm bg-white">
                            {/* Summary */}
                            <div>
                                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Summary</h4>
                                <p className="text-slate-700 bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                                    {selectedService.summary || "No summary provided."}
                                </p>
                            </div>

                            {/* Description HTML */}
                            {selectedService.description && (
                                <div>
                                    <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Description</h4>
                                    <div
                                        className="prose prose-sm max-w-none text-slate-700"
                                        dangerouslySetInnerHTML={{ __html: selectedService.description }}
                                    />
                                </div>
                            )}

                            {/* Benefits */}
                            {selectedService.benefits && selectedService.benefits.length > 0 && (
                                <div>
                                    <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">Key Benefits</h4>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        {selectedService.benefits.map((benefit, index) => (
                                            <div
                                                key={index}
                                                className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50"
                                            >
                                                <div className="font-semibold text-slate-900">{benefit.label}</div>
                                                <div className="text-xs text-slate-500 mt-1">{benefit.description}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Capabilities */}
                            {selectedService.capabilities && selectedService.capabilities.length > 0 && (
                                <div>
                                    <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">Included Capabilities</h4>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                        {selectedService.capabilities.map((capability, index) => (
                                            <div key={index} className="flex items-center gap-2 text-slate-700">
                                                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                                                <span className="text-xs">{capability}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Use Cases */}
                            {selectedService.useCases && selectedService.useCases.length > 0 && (
                                <div>
                                    <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">Example Use Cases</h4>
                                    <div className="space-y-2">
                                        {selectedService.useCases.map((useCase, index) => (
                                            <div key={index} className="flex items-center gap-2 text-slate-700">
                                                <ArrowUpRight className="w-4 h-4 text-indigo-600 shrink-0" />
                                                <span className="text-xs">{useCase}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Call-to-Actions */}
                            {selectedService.ctaButtons && (
                                <div>
                                    <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">Actions & Links</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {selectedService.ctaButtons.primary && (
                                            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-50 text-indigo-700 border border-indigo-200 text-xs font-medium">
                                                {selectedService.ctaButtons.primary.label}
                                                <span className="text-slate-400 font-normal">({selectedService.ctaButtons.primary.link})</span>
                                            </span>
                                        )}
                                        {selectedService.ctaButtons.secondary && (
                                            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 border border-slate-200 text-xs font-medium">
                                                {selectedService.ctaButtons.secondary.label}
                                                <span className="text-slate-400 font-normal">({selectedService.ctaButtons.secondary.link})</span>
                                            </span>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* Timestamp Details */}
                            <div className="pt-4 border-t border-slate-100 flex flex-wrap gap-4 text-xs text-slate-400">
                                <div className="flex items-center gap-1">
                                    <Calendar className="w-3.5 h-3.5" />
                                    Created: {new Date(selectedService.createdAt || "").toLocaleDateString()}
                                </div>
                                <div className="flex items-center gap-1">
                                    <Clock className="w-3.5 h-3.5" />
                                    Updated: {new Date(selectedService.updatedAt || "").toLocaleDateString()}
                                </div>
                            </div>
                        </div>

                        {/* Sticky Action Footer */}
                        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-2">
                            <button
                                onClick={() => {
                                    setShowModal(false);
                                    setSelectedService(null);
                                }}
                                className="px-4 py-2 border border-slate-200 text-slate-700 rounded-xl font-medium text-xs hover:bg-slate-100 transition-colors"
                            >
                                Close
                            </button>
                            <Link
                                href={`/admin/services/${selectedService._id}/edit`}
                                className="inline-flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-medium text-xs shadow-sm transition-colors"
                            >
                                <Edit className="w-3.5 h-3.5" />
                                Edit Service
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}