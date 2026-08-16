"use client";

import { useState, useEffect } from "react";
import {
    Users,
    Clock,
    CheckCircle,
    XCircle,
    TrendingUp,
    Calendar,
    Mail,
    Phone,
    MapPin
} from "lucide-react";
import StatsCard from "@/components/Admin/StatsCard";

interface Stats {
    total: number;
    pending: number;
    contacted: number;
    completed: number;
    recent: number;
}

interface Contact {
    _id: string;
    fullName: string;
    companyName: string;
    email: string;
    phone: string;
    country: string;
    service: string;
    message: string;
    status: string;
    createdAt: string;
}

export default function DashboardPage() {
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState<Stats | null>(null);
    const [recentContacts, setRecentContacts] = useState<Contact[]>([]);
    const [selectedStatus, setSelectedStatus] = useState<string>("all");

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            const response = await fetch("/api/admin/stats");
            const data = await response.json();
            if (data.success) {
                setStats(data.data.stats);
                setRecentContacts(data.data.recentContacts);
            }
        } catch (error) {
            console.error("Error fetching stats:", error);
        } finally {
            setLoading(false);
        }
    };

    const updateContactStatus = async (id: string, status: string) => {
        try {
            const response = await fetch(`/api/contact/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status }),
            });

            if (response.ok) {
                fetchStats();
            }
        } catch (error) {
            console.error("Error updating contact:", error);
        }
    };

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

    const filteredContacts = selectedStatus === "all"
        ? recentContacts
        : recentContacts.filter(c => c.status === selectedStatus);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-center">
                    <div className="w-12 h-12 border-4 border-cyan border-t-transparent rounded-full animate-spin mx-auto"></div>
                    <p className="text-grey-400 mt-4">Loading dashboard...</p>
                </div>
            </div>
        );
    }

    const statCards = [
        {
            label: "Total Submissions",
            value: stats?.total || 0,
            color: "bg-blue-500",
            icon: Users,
            subtitle: "All time"
        },
        {
            label: "Pending",
            value: stats?.pending || 0,
            color: "bg-yellow-500",
            icon: Clock,
            subtitle: "Need attention"
        },
        {
            label: "Contacted",
            value: stats?.contacted || 0,
            color: "bg-cyan-500",
            icon: Mail,
            subtitle: "In progress"
        },
        {
            label: "Completed",
            value: stats?.completed || 0,
            color: "bg-green-500",
            icon: CheckCircle,
            subtitle: "Resolved"
        },
        {
            label: "Last 7 Days",
            value: stats?.recent || 0,
            color: "bg-purple-500",
            icon: TrendingUp,
            subtitle: "New inquiries"
        },
    ];

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div>
                <h2 className="text-2xl font-bold text-navy font-plus-jakarta">Dashboard</h2>
                <p className="text-grey-400 text-sm">Overview of all inquiries and system status</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {statCards.map((stat, index) => (
                    <StatsCard
                        key={index}
                        label={stat.label}
                        value={stat.value}
                        color={stat.color}
                        icon={stat.icon}
                        subtitle={stat.subtitle}
                    />
                ))}
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Recent Inquiries Table */}
                <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-grey-100 overflow-hidden">
                    <div className="px-6 py-4 border-b border-grey-100 flex items-center justify-between flex-wrap gap-2">
                        <h2 className="text-lg font-bold text-navy font-plus-jakarta">
                            Recent Inquiries
                        </h2>
                        <div className="flex items-center gap-2">
                            <select
                                value={selectedStatus}
                                onChange={(e) => setSelectedStatus(e.target.value)}
                                className="text-xs border border-grey-200 rounded-lg px-3 py-1.5 outline-none focus:border-blue"
                            >
                                <option value="all">All Status</option>
                                <option value="pending">Pending</option>
                                <option value="contacted">Contacted</option>
                                <option value="completed">Completed</option>
                            </select>
                            <span className="text-xs text-grey-400">
                                {filteredContacts.length} contacts
                            </span>
                        </div>
                    </div>

                    {filteredContacts.length === 0 ? (
                        <div className="text-center py-12">
                            <div className="text-4xl mb-3">📭</div>
                            <p className="text-grey-400">No contacts yet.</p>
                            <p className="text-xs text-grey-300 mt-1">New inquiries will appear here</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-off-white text-xs uppercase text-grey-400 font-semibold">
                                    <tr>
                                        <th className="px-6 py-3 text-left">Name</th>
                                        <th className="px-6 py-3 text-left">Email</th>
                                        <th className="px-6 py-3 text-left">Service</th>
                                        <th className="px-6 py-3 text-left">Status</th>
                                        <th className="px-6 py-3 text-left">Date</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-grey-100">
                                    {filteredContacts.map((contact) => (
                                        <tr key={contact._id} className="hover:bg-off-white/50 transition-colors group">
                                            <td className="px-6 py-3">
                                                <div>
                                                    <p className="text-sm font-medium text-navy">{contact.fullName}</p>
                                                    <p className="text-xs text-grey-400">{contact.companyName}</p>
                                                </div>
                                            </td>
                                            <td className="px-6 py-3 text-sm text-grey-600">
                                                <a href={`mailto:${contact.email}`} className="hover:text-cyan transition-colors">
                                                    {contact.email}
                                                </a>
                                            </td>
                                            <td className="px-6 py-3 text-sm text-grey-600">
                                                {contact.service}
                                            </td>
                                            <td className="px-6 py-3">
                                                <div className="flex items-center gap-1.5">
                                                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${getStatusColor(contact.status)}`}>
                                                        {getStatusIcon(contact.status)}
                                                        {contact.status}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-3 text-sm text-grey-400">
                                                {new Date(contact.createdAt).toLocaleDateString()}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

                {/* Quick Stats Sidebar */}
                <div className="lg:col-span-1 space-y-4">
                    {/* Status Distribution */}
                    <div className="bg-white rounded-xl shadow-sm border border-grey-100 p-6">
                        <h3 className="text-sm font-semibold text-navy mb-4 font-plus-jakarta">
                            Status Distribution
                        </h3>
                        <div className="space-y-3">
                            <div>
                                <div className="flex justify-between text-sm mb-1">
                                    <span className="text-grey-600">Pending</span>
                                    <span className="font-medium text-navy">{stats?.pending || 0}</span>
                                </div>
                                <div className="w-full h-2 bg-grey-100 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-yellow-500 rounded-full transition-all duration-500"
                                        style={{ width: `${stats?.total ? ((stats.pending / stats.total) * 100) : 0}%` }}
                                    />
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between text-sm mb-1">
                                    <span className="text-grey-600">Contacted</span>
                                    <span className="font-medium text-navy">{stats?.contacted || 0}</span>
                                </div>
                                <div className="w-full h-2 bg-grey-100 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-cyan-500 rounded-full transition-all duration-500"
                                        style={{ width: `${stats?.total ? ((stats.contacted / stats.total) * 100) : 0}%` }}
                                    />
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between text-sm mb-1">
                                    <span className="text-grey-600">Completed</span>
                                    <span className="font-medium text-navy">{stats?.completed || 0}</span>
                                </div>
                                <div className="w-full h-2 bg-grey-100 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-green-500 rounded-full transition-all duration-500"
                                        style={{ width: `${stats?.total ? ((stats.completed / stats.total) * 100) : 0}%` }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl p-6 text-white">
                        <h3 className="text-sm font-semibold font-plus-jakarta mb-2">
                            Quick Actions
                        </h3>
                        <p className="text-white/70 text-xs mb-4">
                            Manage your content and settings
                        </p>
                        <div className="space-y-2">
                            <a
                                href="/admin/contacts"
                                className="flex items-center gap-2 w-full px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm transition-colors"
                            >
                                <Users className="w-4 h-4" />
                                View All Contacts
                            </a>
                            <a
                                href="/admin/services/create"
                                className="flex items-center gap-2 w-full px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm transition-colors"
                            >
                                <Mail className="w-4 h-4" />
                                Create New Service
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}