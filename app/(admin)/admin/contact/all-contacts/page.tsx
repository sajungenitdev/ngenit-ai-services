"use client";

import { useState, useEffect } from "react";
import {
    Search,
    Eye,
    Trash2,
    Mail,
    Phone,
    Calendar,
    CheckCircle,
    Clock,
    XCircle,
    Loader2,
    RefreshCw,
    Download,
} from "lucide-react";
import toast from 'react-hot-toast';

interface ContactSubmission {
    _id: string;
    name: string;
    company: string;
    email: string;
    phone: string;
    country: string;
    service: string;
    message: string;
    consent: boolean;
    status: "pending" | "contacted" | "completed";
    notes?: string;
    contactedAt?: string;
    completedAt?: string;
    createdAt: string;
    updatedAt: string;
}

interface Stats {
    total: number;
    pending: number;
    contacted: number;
    completed: number;
}

export default function ContactsPage() {
    const [loading, setLoading] = useState(true);
    const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
    const [stats, setStats] = useState<Stats>({ total: 0, pending: 0, contacted: 0, completed: 0 });
    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatus, setFilterStatus] = useState("all");
    const [selectedSubmission, setSelectedSubmission] = useState<ContactSubmission | null>(null);
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [selectedIds, setSelectedIds] = useState<string[]>([]);

    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

    // ============================================================
    // FETCH SUBMISSIONS
    // ============================================================
    const fetchSubmissions = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('admin_token');

            const params = new URLSearchParams();
            if (filterStatus !== 'all') params.append('status', filterStatus);
            if (searchTerm) params.append('search', searchTerm);

            const response = await fetch(`${API_URL}/contact-submissions?${params}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch submissions');
            }

            const result = await response.json();

            if (result.success) {
                setSubmissions(result.data);
                if (result.stats) {
                    setStats(result.stats);
                }
            }
        } catch (error: any) {
            console.error('Error fetching submissions:', error);
            toast.error(error.message || 'Failed to load submissions');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSubmissions();
    }, [filterStatus, searchTerm]);

    // ============================================================
    // UPDATE STATUS
    // ============================================================
    const updateStatus = async (id: string, status: "pending" | "contacted" | "completed") => {
        try {
            const token = localStorage.getItem('admin_token');

            const response = await fetch(`${API_URL}/contact-submissions/${id}/status`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ status }),
            });

            if (!response.ok) {
                throw new Error('Failed to update status');
            }

            const result = await response.json();

            if (result.success) {
                toast.success(`Status updated to ${status}`);
                fetchSubmissions();

                // Update selected submission if open
                if (selectedSubmission?._id === id) {
                    setSelectedSubmission(result.data);
                }
            }
        } catch (error: any) {
            console.error('Error updating status:', error);
            toast.error(error.message || 'Failed to update status');
        }
    };

    // ============================================================
    // DELETE SUBMISSION
    // ============================================================
    const deleteSubmission = async (id: string) => {
        if (!confirm('Are you sure you want to delete this message?')) return;

        try {
            const token = localStorage.getItem('admin_token');

            const response = await fetch(`${API_URL}/contact-submissions/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Failed to delete submission');
            }

            const result = await response.json();

            if (result.success) {
                toast.success('Submission deleted successfully');
                fetchSubmissions();
                if (selectedSubmission?._id === id) {
                    setShowDetailModal(false);
                    setSelectedSubmission(null);
                }
            }
        } catch (error: any) {
            console.error('Error deleting submission:', error);
            toast.error(error.message || 'Failed to delete submission');
        }
    };

    // ============================================================
    // DELETE MULTIPLE SUBMISSIONS
    // ============================================================
    const deleteMultiple = async () => {
        if (selectedIds.length === 0) return;
        if (!confirm(`Delete ${selectedIds.length} selected messages?`)) return;

        try {
            const token = localStorage.getItem('admin_token');

            const response = await fetch(`${API_URL}/contact-submissions/delete-multiple`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ ids: selectedIds }),
            });

            if (!response.ok) {
                throw new Error('Failed to delete submissions');
            }

            const result = await response.json();

            if (result.success) {
                toast.success(result.message);
                setSelectedIds([]);
                fetchSubmissions();
            }
        } catch (error: any) {
            console.error('Error deleting submissions:', error);
            toast.error(error.message || 'Failed to delete submissions');
        }
    };

    // ============================================================
    // TOGGLE SELECT ALL
    // ============================================================
    const toggleSelectAll = () => {
        if (selectedIds.length === submissions.length) {
            setSelectedIds([]);
        } else {
            setSelectedIds(submissions.map(s => s._id));
        }
    };

    // ============================================================
    // TOGGLE SELECT ONE
    // ============================================================
    const toggleSelectOne = (id: string) => {
        if (selectedIds.includes(id)) {
            setSelectedIds(selectedIds.filter(sid => sid !== id));
        } else {
            setSelectedIds([...selectedIds, id]);
        }
    };

    // ============================================================
    // EXPORT TO CSV
    // ============================================================
    const exportToCSV = () => {
        const data = submissions.map(s => ({
            Name: s.name,
            Company: s.company,
            Email: s.email,
            Phone: s.phone,
            Country: s.country,
            Service: s.service,
            Status: s.status,
            'Submitted At': new Date(s.createdAt).toLocaleString(),
        }));

        const headers = Object.keys(data[0]);
        const csv = [
            headers.join(','),
            ...data.map(row => headers.map(h => `"${row[h as keyof typeof row]}"`).join(','))
        ].join('\n');

        const blob = new Blob([csv], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `contact-submissions-${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
        URL.revokeObjectURL(url);
        toast.success('Exported successfully!');
    };

    // ============================================================
    // GET STATUS STYLES
    // ============================================================
    const getStatusColor = (status: string) => {
        switch (status) {
            case "pending":
                return "bg-yellow-100 text-yellow-700";
            case "contacted":
                return "bg-cyan/10 text-cyan";
            case "completed":
                return "bg-green-100 text-green-700";
            default:
                return "bg-grey-100 text-grey-600";
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case "pending":
                return <Clock className="w-3 h-3" />;
            case "contacted":
                return <Mail className="w-3 h-3" />;
            case "completed":
                return <CheckCircle className="w-3 h-3" />;
            default:
                return null;
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
                    <p className="text-grey-400 mt-4">Loading messages...</p>
                </div>
            </div>
        );
    }

    // ============================================================
    // RENDER
    // ============================================================
    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-navy font-plus-jakarta">
                        Contact Messages
                    </h2>
                    <p className="text-grey-400 text-sm">
                        Manage all inquiries from the contact form
                    </p>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                    {selectedIds.length > 0 && (
                        <button
                            onClick={deleteMultiple}
                            className="px-4 py-2 text-sm font-medium text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-colors flex items-center gap-2"
                        >
                            <Trash2 className="w-4 h-4" />
                            Delete Selected ({selectedIds.length})
                        </button>
                    )}
                    <button
                        onClick={exportToCSV}
                        className="px-4 py-2 text-sm font-medium text-grey-600 border border-grey-200 rounded-lg hover:bg-off-white transition-colors flex items-center gap-2"
                    >
                        <Download className="w-4 h-4" />
                        Export CSV
                    </button>
                    <button
                        onClick={fetchSubmissions}
                        className="px-4 py-2 text-sm font-medium text-grey-600 border border-grey-200 rounded-lg hover:bg-off-white transition-colors flex items-center gap-2"
                    >
                        <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                        Refresh
                    </button>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white rounded-xl p-4 shadow-sm border border-grey-100">
                    <p className="text-grey-400 text-xs uppercase tracking-wide font-semibold">
                        Total Messages
                    </p>
                    <p className="text-2xl font-extrabold text-navy mt-1">{stats.total}</p>
                    <div className="w-full h-1 rounded-full bg-blue-500 mt-3"></div>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-sm border border-grey-100">
                    <p className="text-grey-400 text-xs uppercase tracking-wide font-semibold">
                        Pending
                    </p>
                    <p className="text-2xl font-extrabold text-navy mt-1">{stats.pending}</p>
                    <div className="w-full h-1 rounded-full bg-yellow-500 mt-3"></div>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-sm border border-grey-100">
                    <p className="text-grey-400 text-xs uppercase tracking-wide font-semibold">
                        Contacted
                    </p>
                    <p className="text-2xl font-extrabold text-navy mt-1">{stats.contacted}</p>
                    <div className="w-full h-1 rounded-full bg-cyan mt-3"></div>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-sm border border-grey-100">
                    <p className="text-grey-400 text-xs uppercase tracking-wide font-semibold">
                        Completed
                    </p>
                    <p className="text-2xl font-extrabold text-navy mt-1">{stats.completed}</p>
                    <div className="w-full h-1 rounded-full bg-green-500 mt-3"></div>
                </div>
            </div>

            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-grey-400" />
                    <input
                        type="text"
                        placeholder="Search by name, company, email..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-grey-200 focus:border-blue outline-none transition-all"
                    />
                </div>
                <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="px-4 py-2.5 rounded-lg border border-grey-200 focus:border-blue outline-none transition-all"
                >
                    <option value="all">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="contacted">Contacted</option>
                    <option value="completed">Completed</option>
                </select>
            </div>

            {/* Submissions Table */}
            {submissions.length === 0 ? (
                <div className="bg-white rounded-xl shadow-sm border border-grey-100 p-12 text-center">
                    <Mail className="w-16 h-16 text-grey-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-navy mb-2">
                        No messages found
                    </h3>
                    <p className="text-grey-400">
                        {searchTerm || filterStatus !== 'all'
                            ? "Try adjusting your search or filter"
                            : "When someone submits the contact form, messages will appear here"}
                    </p>
                </div>
            ) : (
                <div className="bg-white rounded-xl shadow-sm border border-grey-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-off-white text-xs uppercase text-grey-400 font-semibold">
                                <tr>
                                    <th className="px-6 py-3 text-left">
                                        <input
                                            type="checkbox"
                                            checked={selectedIds.length === submissions.length && submissions.length > 0}
                                            onChange={toggleSelectAll}
                                            className="rounded border-grey-300"
                                        />
                                    </th>
                                    <th className="px-6 py-3 text-left">Name / Company</th>
                                    <th className="px-6 py-3 text-left">Contact</th>
                                    <th className="px-6 py-3 text-left">Service</th>
                                    <th className="px-6 py-3 text-left">Status</th>
                                    <th className="px-6 py-3 text-left">Date</th>
                                    <th className="px-6 py-3 text-left">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-grey-100">
                                {submissions.map((submission) => (
                                    <tr key={submission._id} className="hover:bg-off-white/50 transition-colors group">
                                        <td className="px-6 py-3">
                                            <input
                                                type="checkbox"
                                                checked={selectedIds.includes(submission._id)}
                                                onChange={() => toggleSelectOne(submission._id)}
                                                className="rounded border-grey-300"
                                            />
                                        </td>
                                        <td className="px-6 py-3">
                                            <div>
                                                <p className="text-sm font-medium text-navy">{submission.name}</p>
                                                <p className="text-xs text-grey-400">{submission.company}</p>
                                            </div>
                                        </td>
                                        <td className="px-6 py-3">
                                            <div>
                                                <p className="text-sm text-grey-600">{submission.email}</p>
                                                <p className="text-xs text-grey-400">{submission.phone}</p>
                                            </div>
                                        </td>
                                        <td className="px-6 py-3 text-sm text-grey-600">
                                            {submission.service}
                                        </td>
                                        <td className="px-6 py-3">
                                            <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${getStatusColor(submission.status)}`}>
                                                {getStatusIcon(submission.status)}
                                                {submission.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-3 text-sm text-grey-400">
                                            {new Date(submission.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-3">
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() => {
                                                        setSelectedSubmission(submission);
                                                        setShowDetailModal(true);
                                                    }}
                                                    className="p-1.5 text-grey-400 hover:text-cyan transition-colors"
                                                >
                                                    <Eye className="w-4 h-4" />
                                                </button>
                                                <select
                                                    value={submission.status}
                                                    onChange={(e) => updateStatus(submission._id, e.target.value as any)}
                                                    className="text-xs border border-grey-200 rounded-lg px-2 py-1 outline-none focus:border-blue"
                                                >
                                                    <option value="pending">Pending</option>
                                                    <option value="contacted">Contacted</option>
                                                    <option value="completed">Completed</option>
                                                </select>
                                                <button
                                                    onClick={() => deleteSubmission(submission._id)}
                                                    className="p-1.5 text-grey-400 hover:text-red-500 transition-colors"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="px-6 py-3 border-t border-grey-100 text-xs text-grey-400 flex justify-between items-center">
                        <span>{submissions.length} submissions</span>
                        <span>Last updated: {new Date().toLocaleString()}</span>
                    </div>
                </div>
            )}

            {/* Detail Modal */}
            {showDetailModal && selectedSubmission && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="sticky top-0 bg-white border-b border-grey-100 px-6 py-4 flex justify-between items-center">
                            <h3 className="text-lg font-bold text-navy font-plus-jakarta">
                                Message Details
                            </h3>
                            <button
                                onClick={() => {
                                    setShowDetailModal(false);
                                    setSelectedSubmission(null);
                                }}
                                className="p-1.5 hover:bg-off-white rounded-lg transition-colors"
                            >
                                <XCircle className="w-5 h-5 text-grey-400" />
                            </button>
                        </div>
                        <div className="p-6 space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <p className="text-xs text-grey-400 font-semibold uppercase">Full Name</p>
                                    <p className="text-sm font-medium text-navy">{selectedSubmission.name}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-grey-400 font-semibold uppercase">Company</p>
                                    <p className="text-sm font-medium text-navy">{selectedSubmission.company}</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <p className="text-xs text-grey-400 font-semibold uppercase">Email</p>
                                    <a href={`mailto:${selectedSubmission.email}`} className="text-sm text-cyan hover:underline">
                                        {selectedSubmission.email}
                                    </a>
                                </div>
                                <div>
                                    <p className="text-xs text-grey-400 font-semibold uppercase">Phone</p>
                                    <a href={`tel:${selectedSubmission.phone}`} className="text-sm text-cyan hover:underline">
                                        {selectedSubmission.phone}
                                    </a>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <p className="text-xs text-grey-400 font-semibold uppercase">Country</p>
                                    <p className="text-sm text-grey-600">{selectedSubmission.country}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-grey-400 font-semibold uppercase">Service</p>
                                    <p className="text-sm text-grey-600">{selectedSubmission.service}</p>
                                </div>
                            </div>
                            <div>
                                <p className="text-xs text-grey-400 font-semibold uppercase">Message</p>
                                <p className="text-sm text-grey-600 bg-off-white p-4 rounded-lg mt-1 whitespace-pre-wrap">
                                    {selectedSubmission.message}
                                </p>
                            </div>
                            <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-grey-100">
                                <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${getStatusColor(selectedSubmission.status)}`}>
                                    {getStatusIcon(selectedSubmission.status)}
                                    Status: {selectedSubmission.status}
                                </span>
                                <span className="text-xs text-grey-400 flex items-center gap-1">
                                    <Calendar className="w-3 h-3" />
                                    Received: {new Date(selectedSubmission.createdAt).toLocaleString()}
                                </span>
                                {selectedSubmission.contactedAt && (
                                    <span className="text-xs text-grey-400 flex items-center gap-1">
                                        <Phone className="w-3 h-3" />
                                        Contacted: {new Date(selectedSubmission.contactedAt).toLocaleString()}
                                    </span>
                                )}
                            </div>
                            <div className="pt-4 border-t border-grey-100 flex gap-2">
                                <button
                                    onClick={() => updateStatus(selectedSubmission._id, 'pending')}
                                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${selectedSubmission.status === 'pending'
                                            ? 'bg-yellow-100 text-yellow-700'
                                            : 'bg-off-white text-grey-600 hover:bg-yellow-50'
                                        }`}
                                >
                                    Pending
                                </button>
                                <button
                                    onClick={() => updateStatus(selectedSubmission._id, 'contacted')}
                                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${selectedSubmission.status === 'contacted'
                                            ? 'bg-cyan/10 text-cyan'
                                            : 'bg-off-white text-grey-600 hover:bg-cyan/5'
                                        }`}
                                >
                                    Contacted
                                </button>
                                <button
                                    onClick={() => updateStatus(selectedSubmission._id, 'completed')}
                                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${selectedSubmission.status === 'completed'
                                            ? 'bg-green-100 text-green-700'
                                            : 'bg-off-white text-grey-600 hover:bg-green-50'
                                        }`}
                                >
                                    Completed
                                </button>
                                <button
                                    onClick={() => deleteSubmission(selectedSubmission._id)}
                                    className="ml-auto px-3 py-1.5 rounded-lg text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 transition-colors"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}