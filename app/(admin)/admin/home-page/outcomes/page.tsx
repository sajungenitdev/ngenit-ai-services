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
    Loader2,
    CheckCircle,
    AlertCircle,
    ChevronLeft,
    ChevronRight,
    TrendingUp,
} from "lucide-react";
import { getOutcomes, deleteOutcome, toggleOutcomeStatus } from "@/services/outcomeApi";
import { OutcomeData } from "@/types/admin/outcome";

export default function OutcomesPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [outcomes, setOutcomes] = useState<OutcomeData[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        fetchOutcomes();
    }, []);

    const fetchOutcomes = async () => {
        try {
            setLoading(true);
            const data = await getOutcomes();
            setOutcomes(data);
        } catch (error) {
            console.error("Error fetching outcomes:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this outcome?")) return;

        try {
            await deleteOutcome(id);
            await fetchOutcomes();
        } catch (error) {
            console.error("Error deleting outcome:", error);
            alert("Failed to delete outcome");
        }
    };

    const handleToggleStatus = async (id: string, currentStatus: boolean) => {
        try {
            await toggleOutcomeStatus(id, !currentStatus);
            await fetchOutcomes();
        } catch (error) {
            console.error("Error toggling status:", error);
            alert("Failed to update status");
        }
    };

    const filteredOutcomes = outcomes.filter(
        (outcome) =>
            outcome.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            outcome.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            outcome.stat.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalPages = Math.ceil(filteredOutcomes.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedOutcomes = filteredOutcomes.slice(startIndex, startIndex + itemsPerPage);

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
                    <p className="text-grey-400 mt-4">Loading outcomes...</p>
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
                        Business Outcomes
                    </h2>
                    <p className="text-grey-400 text-sm">
                        Manage all business outcomes ({outcomes.length} total)
                    </p>
                </div>
                <Link
                    href="/admin/home-page/outcomes/create"
                    className="px-4 py-2 bg-cyan text-navy rounded-lg font-semibold hover:bg-cyan-light transition-all duration-200 flex items-center gap-2"
                >
                    <Plus className="w-4 h-4" />
                    Create Outcome
                </Link>
            </div>

            {/* Search and Stats */}
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-grey-400" />
                    <input
                        type="text"
                        placeholder="Search outcomes by title, description, or stat..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-grey-200 focus:border-blue outline-none transition-all"
                    />
                </div>
                <div className="flex gap-2 flex-wrap">
                    <div className="px-4 py-2.5 bg-white rounded-lg border border-grey-100 text-sm text-grey-600">
                        Total: <span className="font-semibold text-navy">{outcomes.length}</span>
                    </div>
                    <div className="px-4 py-2.5 bg-white rounded-lg border border-grey-100 text-sm text-grey-600">
                        Active: <span className="font-semibold text-green-600">{outcomes.filter(o => o.isActive).length}</span>
                    </div>
                    <div className="px-4 py-2.5 bg-white rounded-lg border border-grey-100 text-sm text-grey-600">
                        Inactive: <span className="font-semibold text-red-600">{outcomes.filter(o => !o.isActive).length}</span>
                    </div>
                </div>
            </div>

            {/* Table */}
            {filteredOutcomes.length === 0 ? (
                <div className="bg-white rounded-xl shadow-sm border border-grey-100 p-12 text-center">
                    <TrendingUp className="w-16 h-16 text-grey-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-navy mb-2">
                        {searchTerm ? "No outcomes found" : "No outcomes yet"}
                    </h3>
                    <p className="text-grey-400 mb-4">
                        {searchTerm
                            ? "Try adjusting your search terms"
                            : "Get started by creating your first business outcome"}
                    </p>
                    {!searchTerm && (
                        <Link
                            href="/admin/home-page/outcomes/create"
                            className="inline-flex items-center gap-2 px-4 py-2 bg-cyan text-navy rounded-lg font-semibold hover:bg-cyan-light transition-colors"
                        >
                            <Plus className="w-4 h-4" />
                            Create Outcome
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
                                        <th className="px-6 py-3 text-left">#</th>
                                        <th className="px-6 py-3 text-left">Icon</th>
                                        <th className="px-6 py-3 text-left">Title</th>
                                        <th className="px-6 py-3 text-left">Description</th>
                                        <th className="px-6 py-3 text-left">Stat</th>
                                        <th className="px-6 py-3 text-left">Status</th>
                                        <th className="px-6 py-3 text-left">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-grey-100">
                                    {paginatedOutcomes.map((outcome, index) => (
                                        <tr key={outcome._id} className="hover:bg-off-white/50 transition-colors group">
                                            <td className="px-6 py-4 text-sm text-grey-400">
                                                {startIndex + index + 1}
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="text-2xl">{outcome.icon}</span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <p className="text-sm font-semibold text-navy">{outcome.title}</p>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-grey-400 max-w-[250px] truncate">
                                                {outcome.description}
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="text-sm font-bold text-cyan">
                                                    {outcome.stat}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                {getStatusBadge(outcome.isActive || false)}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2">
                                                    <Link
                                                        href={`/outcomes/${outcome._id}`}
                                                        target="_blank"
                                                        className="p-1.5 text-grey-400 hover:text-cyan transition-colors"
                                                        title="View"
                                                    >
                                                        <Eye className="w-4 h-4" />
                                                    </Link>
                                                    <Link
                                                        href={`/admin/outcomes/${outcome._id}/edit`}
                                                        className="p-1.5 text-grey-400 hover:text-blue transition-colors"
                                                        title="Edit"
                                                    >
                                                        <Edit className="w-4 h-4" />
                                                    </Link>
                                                    <button
                                                        onClick={() => handleDelete(outcome._id!)}
                                                        className="p-1.5 text-grey-400 hover:text-red-500 transition-colors"
                                                        title="Delete"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleToggleStatus(outcome._id!, outcome.isActive || false)}
                                                        className={`text-xs font-medium px-2 py-1 rounded transition-colors ${outcome.isActive
                                                                ? "text-red-500 hover:bg-red-50"
                                                                : "text-green-500 hover:bg-green-50"
                                                            }`}
                                                    >
                                                        {outcome.isActive ? "Deactivate" : "Activate"}
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
                                Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredOutcomes.length)} of {filteredOutcomes.length} outcomes
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