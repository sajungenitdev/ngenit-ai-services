"use client";

import { IndustryData } from "@/types/admin/industry";
import Link from "next/link";

interface IndustrialMenusProps {
    isOpen: boolean;
    industries?: IndustryData[];
}

export default function IndustrialMenus({ isOpen, industries = [] }: IndustrialMenusProps) {
    return (
        <div
            className={`
                absolute top-full left-0 mt-2
                bg-white rounded-2xl shadow-2xl p-6 w-[300px]
                border border-grey-100 z-[1000]
                transition-all duration-200 ease-in-out
                ${isOpen
                    ? 'opacity-100 visible pointer-events-auto translate-y-0'
                    : 'opacity-0 invisible pointer-events-none -translate-y-2'
                }
            `}
        >
            <div className="flex flex-col">
                {industries.map((industry) => (
                    <Link
                        href={`/industries/${industry.slug || industry._id}`}
                        key={industry._id}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 hover:bg-off-white group"
                    >
                        <span className="text-xl">{industry.icon}</span>
                        <div>
                            <h4 className="text-navy font-medium text-sm group-hover:text-cyan transition-colors">
                                {industry.name}
                            </h4>
                            <p className="text-grey-400 text-xs leading-relaxed line-clamp-1">
                                {industry.short}
                            </p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}