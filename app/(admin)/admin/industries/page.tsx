"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
    Plus,
    Search,
    Edit,
    Trash2,
    Eye,
    Building2,
    Loader2,
    CheckCircle,
    AlertCircle,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";
import { getIndustries, deleteIndustry, toggleIndustryStatus } from "@/services/industryApi";
import { IndustryData } from "@/types/admin/industry";

export default function IndustriesPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [industries, setIndustries] = useState<IndustryData[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        fetchIndustries();
    }, []);

    const fetchIndustries = async () => {
        try {
            setLoading(true);
            const data = await getIndustries();
            setIndustries(data);
        } catch (error) {
            console.error("Error fetching industries:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this industry?")) return;
        try {
            await deleteIndustry(id);
            await fetchIndustries();
        } catch (error) {
            console.error("Error deleting industry:", error);
            alert("Failed to delete industry");
        }
    };

    const handleToggleStatus = async (id: string, currentStatus: boolean) => {
        try {
            await toggleIndustryStatus(id, !currentStatus);
            await fetchIndustries();
        } catch (error) {
            console.error("Error toggling status:", error);
            alert("Failed to update status");
        }
    };

    const filteredIndustries = industries.filter(
        (industry) =>
            industry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            industry.short.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalPages = Math.ceil(filteredIndustries.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedIndustries = filteredIndustries.slice(startIndex, startIndex + itemsPerPage);

    const getStatusBadge = (isActive: boolean) => {
        return isActive ? (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                <CheckCircle className="w-3 h-3" />
                Active
            </span>
        ) : (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
                <AlertCircle className="w-3 h-3" />
                Inactive
            </span>
        );
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-center">
                    <div className="w-12 h-12 border-4 border-cyan border-t-transparent rounded-full animate-spin mx-auto"></div>
                    <p className="text-grey-400 mt-4">Loading industries...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-navy font-plus-jakarta">
                        Industries
                    </h2>
                    <p className="text-grey-400 text-sm">
                        Manage all industry solutions ({industries.length} total)
                    </p>
                </div>
                <Link
                    href="/admin/industries/create"
                    className="px-4 py-2 bg-cyan text-navy rounded-lg font-semibold hover:bg-cyan-light transition-all duration-200 flex items-center gap-2"
                >
                    <Plus className="w-4 h-4" />
                    Create Industry
                </Link>
            </div>

            {/* Search */}
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-grey-400" />
                <input
                    type="text"
                    placeholder="Search industries by name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-grey-200 focus:border-blue outline-none transition-all"
                />
            </div>

            {/* Table */}
            {filteredIndustries.length === 0 ? (
                <div className="bg-white rounded-xl shadow-sm border border-grey-100 p-12 text-center">
                    <Building2 className="w-16 h-16 text-grey-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-navy mb-2">
                        {searchTerm ? "No industries found" : "No industries yet"}
                    </h3>
                    <p className="text-grey-400 mb-4">
                        {searchTerm
                            ? "Try adjusting your search terms"
                            : "Get started by creating your first industry"}
                    </p>
                    {!searchTerm && (
                        <Link
                            href="/admin/industries/create"
                            className="inline-flex items-center gap-2 px-4 py-2 bg-cyan text-navy rounded-lg font-semibold hover:bg-cyan-light transition-colors"
                        >
                            <Plus className="w-4 h-4" />
                            Create Industry
                        </Link>
                    )}
                </div>
            ) : (
                <>
                    <div className="bg-white rounded-xl shadow-sm border border-grey-100 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-off-white text-xs uppercase text-grey-400 font-semibold">
                                    <tr>
                                        <th className="px-6 py-3 text-left">Icon</th>
                                        <th className="px-6 py-3 text-left">Name</th>
                                        <th className="px-6 py-3 text-left">Slug</th>
                                        <th className="px-6 py-3 text-left">Short</th>
                                        <th className="px-6 py-3 text-left">Status</th>
                                        <th className="px-6 py-3 text-left">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-grey-100">
                                    {paginatedIndustries.map((industry) => (
                                        <tr key={industry._id} className="hover:bg-off-white/50 transition-colors">
                                            <td className="px-6 py-4">
                                                <span className="text-2xl">{industry.icon}</span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div>
                                                    <p className="text-sm font-semibold text-navy">{industry.name}</p>
                                                    <p className="text-xs text-grey-400">
                                                        {industry.slug}
                                                    </p>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-grey-600">
                                                {industry.slug}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-grey-400 max-w-[200px] truncate">
                                                {industry.short}
                                            </td>
                                            <td className="px-6 py-4">
                                                {getStatusBadge(industry.isActive || false)}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2">
                                                    <Link
                                                        href={`/industries/${industry.slug}`}
                                                        target="_blank"
                                                        className="p-1.5 text-grey-400 hover:text-cyan transition-colors"
                                                        title="View"
                                                    >
                                                        <Eye className="w-4 h-4" />
                                                    </Link>
                                                    <Link
                                                        href={`/admin/industries/${industry._id}/edit`}
                                                        className="p-1.5 text-grey-400 hover:text-blue transition-colors"
                                                        title="Edit"
                                                    >
                                                        <Edit className="w-4 h-4" />
                                                    </Link>
                                                    <button
                                                        onClick={() => handleDelete(industry._id!)}
                                                        className="p-1.5 text-grey-400 hover:text-red-500 transition-colors"
                                                        title="Delete"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleToggleStatus(industry._id!, industry.isActive || false)}
                                                        className={`text-xs font-medium px-2 py-1 rounded transition-colors ${industry.isActive
                                                                ? "text-red-500 hover:bg-red-50"
                                                                : "text-green-500 hover:bg-green-50"
                                                            }`}
                                                    >
                                                        {industry.isActive ? "Deactivate" : "Activate"}
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="flex items-center justify-between px-4 py-3 bg-white rounded-xl shadow-sm border border-grey-100">
                            <div className="text-sm text-grey-400">
                                Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredIndustries.length)} of {filteredIndustries.length} industries
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                    disabled={currentPage === 1}
                                    className="p-2 rounded-lg border border-grey-200 hover:bg-off-white disabled:opacity-50"
                                >
                                    <ChevronLeft className="w-4 h-4" />
                                </button>
                                <span className="text-sm text-grey-600">
                                    Page {currentPage} of {totalPages}
                                </span>
                                <button
                                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                    disabled={currentPage === totalPages}
                                    className="p-2 rounded-lg border border-grey-200 hover:bg-off-white disabled:opacity-50"
                                >
                                    <ChevronRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}   