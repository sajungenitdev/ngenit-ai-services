"use client";

import { Plus, Trash2, GripVertical } from "lucide-react";
import { HeroData } from "@/types/hero";

interface HeroDashboardFormProps {
    data: HeroData;
    onChange: (data: HeroData) => void;
}

export default function HeroDashboardForm({ data, onChange }: HeroDashboardFormProps) {
    const handleServiceChange = (index: number, field: string, value: string) => {
        const newServices = data.dashboard.services.map((s, i) =>
            i === index ? { ...s, [field]: value } : s
        );
        onChange({
            ...data,
            dashboard: { ...data.dashboard, services: newServices },
        });
    };

    const addService = () => {
        onChange({
            ...data,
            dashboard: {
                ...data.dashboard,
                services: [
                    ...data.dashboard.services,
                    { icon: "🤖", name: "New Service", tag: "New →" },
                ],
            },
        });
    };

    const removeService = (index: number) => {
        if (data.dashboard.services.length <= 1) return;
        onChange({
            ...data,
            dashboard: {
                ...data.dashboard,
                services: data.dashboard.services.filter((_, i) => i !== index),
            },
        });
    };

    const handleMetricChange = (index: number, field: string, value: string) => {
        const newMetrics = data.dashboard.metrics.map((m, i) =>
            i === index ? { ...m, [field]: value } : m
        );
        onChange({
            ...data,
            dashboard: { ...data.dashboard, metrics: newMetrics },
        });
    };

    return (
        <div className="space-y-6">
            <div>
                <label className="block text-sm font-semibold text-grey-800 mb-1.5">
                    Dashboard Title
                </label>
                <input
                    type="text"
                    value={data.dashboard.title}
                    onChange={(e) =>
                        onChange({
                            ...data,
                            dashboard: { ...data.dashboard, title: e.target.value },
                        })
                    }
                    className="w-full px-4 py-3 rounded-lg border border-grey-200 focus:border-blue outline-none transition-all"
                    placeholder="NGEN IT AI Platform"
                />
            </div>

            {/* Services Repeater */}
            <div>
                <div className="flex items-center justify-between mb-3">
                    <label className="block text-sm font-semibold text-grey-800">
                        Dashboard Services
                    </label>
                    <button
                        onClick={addService}
                        className="text-sm text-cyan hover:text-cyan-light font-medium flex items-center gap-1"
                    >
                        <Plus className="w-4 h-4" />
                        Add Service
                    </button>
                </div>
                <div className="space-y-3">
                    {data.dashboard.services.map((service, index) => (
                        <div
                            key={index}
                            className="flex items-center gap-3 border border-grey-100 rounded-lg p-3 hover:border-grey-200 transition-colors"
                        >
                            <GripVertical className="w-5 h-5 text-grey-300 cursor-move" />
                            <input
                                type="text"
                                value={service.icon}
                                onChange={(e) => handleServiceChange(index, "icon", e.target.value)}
                                className="w-12 px-2 py-2 rounded-lg border border-grey-200 focus:border-blue outline-none transition-all text-center"
                                placeholder="🧠"
                            />
                            <input
                                type="text"
                                value={service.name}
                                onChange={(e) => handleServiceChange(index, "name", e.target.value)}
                                className="flex-1 px-4 py-2 rounded-lg border border-grey-200 focus:border-blue outline-none transition-all"
                                placeholder="Service Name"
                            />
                            <input
                                type="text"
                                value={service.tag}
                                onChange={(e) => handleServiceChange(index, "tag", e.target.value)}
                                className="w-32 px-4 py-2 rounded-lg border border-grey-200 focus:border-blue outline-none transition-all"
                                placeholder="Strategy →"
                            />
                            <button
                                onClick={() => removeService(index)}
                                className="text-red-400 hover:text-red-600 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                                disabled={data.dashboard.services.length <= 1}
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                    ))}
                </div>
                {data.dashboard.services.length <= 1 && (
                    <p className="text-xs text-grey-400 mt-2">At least one service is required</p>
                )}
            </div>

            {/* Metrics */}
            <div>
                <label className="block text-sm font-semibold text-grey-800 mb-3">
                    Dashboard Metrics
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {data.dashboard.metrics.map((metric, index) => (
                        <div key={index} className="border border-grey-100 rounded-lg p-4">
                            <input
                                type="text"
                                value={metric.value}
                                onChange={(e) => handleMetricChange(index, "value", e.target.value)}
                                className="w-full px-3 py-2 mb-2 rounded-lg border border-grey-200 focus:border-blue outline-none transition-all"
                                placeholder="40%"
                            />
                            <input
                                type="text"
                                value={metric.label}
                                onChange={(e) => handleMetricChange(index, "label", e.target.value)}
                                className="w-full px-3 py-2 mb-2 rounded-lg border border-grey-200 focus:border-blue outline-none transition-all"
                                placeholder="Cost Reduction"
                            />
                            <input
                                type="text"
                                value={metric.trend}
                                onChange={(e) => handleMetricChange(index, "trend", e.target.value)}
                                className="w-full px-3 py-2 rounded-lg border border-grey-200 focus:border-blue outline-none transition-all"
                                placeholder="↑ Avg. Result"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}