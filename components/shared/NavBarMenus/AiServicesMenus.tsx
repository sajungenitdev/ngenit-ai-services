"use client";

import { ServiceData } from "@/types/admin/service";
import Link from "next/link";

interface ServiceDropdownProps {
    isOpen: boolean;
    services?: ServiceData[];
}

export default function AiServicesMenus({ isOpen, services = [] }: ServiceDropdownProps) {
    return (
        <div 
            className={`
                absolute top-full left-1/2 -translate-x-1/2 mt-2
                bg-white rounded-2xl shadow-2xl p-8 w-[780px] max-w-[90vw]
                border border-grey-100 z-[1000]
                transition-all duration-200 ease-in-out
                ${isOpen 
                    ? 'opacity-100 visible pointer-events-auto translate-y-0' 
                    : 'opacity-0 invisible pointer-events-none -translate-y-2'
                }
            `}
        >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="text-navy text-lg font-bold">
                        AI Services
                    </h3>
                    <p className="text-grey-400 text-sm mt-1">
                        Our complete range of AI consulting, development and implementation services
                    </p>
                </div>
                <Link
                    href="/services"
                    className="text-blue font-semibold text-sm hover:text-cyan transition-colors"
                >
                    View All →
                </Link>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-2 gap-2">
                {services.map((s) => (
                    <Link
                        href={`/service/${s._id}`}
                        key={s._id}
                        className="flex items-start gap-3 p-3.5 rounded-xl transition-all duration-200 hover:bg-off-white cursor-pointer group"
                    >
                        <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-navy-mid to-blue flex items-center justify-center shrink-0 text-white text-base">
                            {s.icon}
                        </div>
                        <div>
                            <h4 className="text-navy font-semibold text-sm mb-0.5 group-hover:text-cyan transition-colors">
                                {s.name}
                            </h4>
                            <p className="text-grey-400 text-xs leading-relaxed">
                                {s.tagline}
                            </p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}