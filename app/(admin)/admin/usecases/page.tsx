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
    Target,
    Loader2,
    CheckCircle,
    AlertCircle,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";
import { getUseCases, deleteUseCase, toggleUseCaseStatus } from "@/services/useCaseApi";
import { UseCaseData } from "@/types/admin/useCase";

export default function UseCasesPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [useCases, setUseCases] = useState<UseCaseData[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterIndustry, setFilterIndustry] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        fetchUseCases();
    }, []);

    const fetchUseCases = async () => {
        try {
            setLoading(true);
            const data = await getUseCases();
            setUseCases(data);
        } catch (error) {
            console.error("Error fetching use cases:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this use case?")) return;

        try {
            await deleteUseCase(id);
            await fetchUseCases();
        } catch (error) {
            console.error("Error deleting use case:", error);
            alert("Failed to delete use case");
        }
    };

    const handleToggleStatus = async (id: string, currentStatus: boolean) => {
        try {
            await toggleUseCaseStatus(id, !currentStatus);
            await fetchUseCases();
        } catch (error) {
            console.error("Error toggling status:", error);
            alert("Failed to update status");
        }
    };

    const industries = ["all", ...new Set(useCases.map((u) => u.industry))];

    const filteredUseCases = useCases.filter((uc) => {
        const matchesSearch =
            uc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            uc.desc.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesIndustry =
            filterIndustry === "all" || uc.industry === filterIndustry;
        return matchesSearch && matchesIndustry;
    });

    const totalPages = Math.ceil(filteredUseCases.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedUseCases = filteredUseCases.slice(startIndex, startIndex + itemsPerPage);

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
                    <p className="text-grey-400 mt-4">Loading use cases...</p>
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
                        Use Cases
                    </h2>
                    <p className="text-grey-400 text-sm">
                        Real-world examples of how organizations apply AI ({useCases.length} total)
                    </p>
                </div>
                <Link
                    href="/admin/usecases/create"
                    className="px-4 py-2 bg-cyan text-navy rounded-lg font-semibold hover:bg-cyan-light transition-all duration-200 flex items-center gap-2"
                >
                    <Plus className="w-4 h-4" />
                    Create Use Case
                </Link>
            </div>

            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-grey-400" />
                    <input
                        type="text"
                        placeholder="Search use cases..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-grey-200 focus:border-blue outline-none transition-all"
                    />
                </div>
                <select
                    value={filterIndustry}
                    onChange={(e) => setFilterIndustry(e.target.value)}
                    className="px-4 py-2.5 rounded-lg border border-grey-200 focus:border-blue outline-none transition-all"
                >
                    {industries.map((industry) => (
                        <option key={industry} value={industry}>
                            {industry === "all" ? "All Industries" : industry}
                        </option>
                    ))}
                </select>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white rounded-xl p-4 shadow-sm border border-grey-100">
                    <p className="text-grey-400 text-xs uppercase tracking-wide font-semibold">
                        Total Use Cases
                    </p>
                    <p className="text-2xl font-extrabold text-navy mt-1">
                        {useCases.length}
                    </p>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-sm border border-grey-100">
                    <p className="text-grey-400 text-xs uppercase tracking-wide font-semibold">
                        Industries
                    </p>
                    <p className="text-2xl font-extrabold text-navy mt-1">
                        {new Set(useCases.map((u) => u.industry)).size}
                    </p>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-sm border border-grey-100">
                    <p className="text-grey-400 text-xs uppercase tracking-wide font-semibold">
                        Active
                    </p>
                    <p className="text-2xl font-extrabold text-navy mt-1">
                        {useCases.filter((u) => u.isActive).length}
                    </p>
                </div>
            </div>

            {/* Use Cases Table */}
            {filteredUseCases.length === 0 ? (
                <div className="bg-white rounded-xl shadow-sm border border-grey-100 p-12 text-center">
                    <Target className="w-16 h-16 text-grey-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-navy mb-2">
                        {searchTerm ? "No use cases found" : "No use cases yet"}
                    </h3>
                    <p className="text-grey-400 mb-4">
                        {searchTerm
                            ? "Try adjusting your search terms"
                            : "Get started by creating your first use case"}
                    </p>
                    {!searchTerm && (
                        <Link
                            href="/admin/usecases/create"
                            className="inline-flex items-center gap-2 px-4 py-2 bg-cyan text-navy rounded-lg font-semibold hover:bg-cyan-light transition-colors"
                        >
                            <Plus className="w-4 h-4" />
                            Create Use Case
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
                                        <th className="px-6 py-3 text-left">Name</th>
                                        <th className="px-6 py-3 text-left">Industry</th>
                                        <th className="px-6 py-3 text-left">Service</th>
                                        <th className="px-6 py-3 text-left">Result</th>
                                        <th className="px-6 py-3 text-left">Status</th>
                                        <th className="px-6 py-3 text-left">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-grey-100">
                                    {paginatedUseCases.map((useCase) => (
                                        <tr key={useCase._id} className="hover:bg-off-white/50 transition-colors group">
                                            <td className="px-6 py-4">
                                                <div>
                                                    <p className="text-sm font-semibold text-navy">{useCase.name}</p>
                                                    <p className="text-xs text-grey-400 line-clamp-1">{useCase.desc}</p>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-grey-600">
                                                {useCase.industry}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-grey-600">
                                                {useCase.service}
                                            </td>
                                            <td className="px-6 py-4 text-sm font-medium text-blue">
                                                {useCase.result}
                                            </td>
                                            <td className="px-6 py-4">
                                                {getStatusBadge(useCase.isActive || false)}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2">
                                                    <Link
                                                        href={`/usecases/${useCase._id}`}
                                                        target="_blank"
                                                        className="p-1.5 text-grey-400 hover:text-cyan transition-colors"
                                                        title="View"
                                                    >
                                                        <Eye className="w-4 h-4" />
                                                    </Link>
                                                    <Link
                                                        href={`/admin/usecases/${useCase._id}/edit`}
                                                        className="p-1.5 text-grey-400 hover:text-blue transition-colors"
                                                        title="Edit"
                                                    >
                                                        <Edit className="w-4 h-4" />
                                                    </Link>
                                                    <button
                                                        onClick={() => handleDelete(useCase._id!)}
                                                        className="p-1.5 text-grey-400 hover:text-red-500 transition-colors"
                                                        title="Delete"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleToggleStatus(useCase._id!, useCase.isActive || false)}
                                                        className={`text-xs font-medium px-2 py-1 rounded transition-colors ${
                                                            useCase.isActive
                                                                ? "text-red-500 hover:bg-red-50"
                                                                : "text-green-500 hover:bg-green-50"
                                                        }`}
                                                    >
                                                        {useCase.isActive ? "Deactivate" : "Activate"}
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
                                Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredUseCases.length)} of {filteredUseCases.length} use cases
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