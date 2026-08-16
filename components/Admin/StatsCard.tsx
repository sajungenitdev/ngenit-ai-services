"use client";

import { LucideIcon } from "lucide-react";

interface StatsCardProps {
    label: string;
    value: number;
    color: string;
    icon?: LucideIcon;
    trend?: {
        value: number;
        isPositive: boolean;
    };
    subtitle?: string;
}

export default function StatsCard({ 
    label, 
    value, 
    color, 
    icon: Icon,
    trend,
    subtitle 
}: StatsCardProps) {
    return (
        <div className="bg-white rounded-xl p-5 shadow-sm border border-grey-100 hover:shadow-md transition-all duration-200 hover:-translate-y-0.5">
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-grey-400 text-xs uppercase tracking-wide font-semibold">
                        {label}
                    </p>
                    <p className="text-2xl font-extrabold text-navy mt-1">
                        {value.toLocaleString()}
                    </p>
                    {subtitle && (
                        <p className="text-xs text-grey-400 mt-1">{subtitle}</p>
                    )}
                </div>
                {Icon && (
                    <div className={`p-2 rounded-lg ${color.replace('bg-', 'bg-').replace('h-1', '')}/10`}>
                        <Icon className={`w-5 h-5 ${color.replace('bg-', 'text-').replace(' h-1', '')}`} />
                    </div>
                )}
            </div>
            <div className={`w-full h-1 rounded-full ${color} mt-3`}></div>
            {trend && (
                <div className="flex items-center gap-1 mt-2">
                    <span className={`text-xs font-semibold ${trend.isPositive ? 'text-green-500' : 'text-red-500'}`}>
                        {trend.isPositive ? '↑' : '↓'} {trend.value}%
                    </span>
                    <span className="text-xs text-grey-400">vs last month</span>
                </div>
            )}
        </div>
    );
}