"use client";

import Link from "next/link";

interface IndustryCardProps {
    id: string;
    icon: string;
    name: string;
    short: string;
}

export default function IndustryCard({ id, icon, name, short }: IndustryCardProps) {
    return (
        <Link
            href={`/industries/${id}`}
            className="group block bg-white rounded-xl p-6 border border-grey-100 shadow-sm transition-all duration-300 hover:bg-navy hover:border-navy hover:-translate-y-1 hover:shadow-lg text-center h-full flex flex-col items-center"
        >
            {/* Icon - fixed size */}
            <div className="w-14 h-14 rounded-xl bg-off-white flex items-center justify-center text-2xl mx-auto mb-4 transition-all duration-300 group-hover:bg-cyan/15 flex-shrink-0">
                {icon}
            </div>

            {/* Content - grows to fill space */}
            <div className="flex-1 flex flex-col">
                <h3 className="text-[0.9rem] font-semibold text-navy mb-1.5 transition-all duration-300 group-hover:text-white font-plus-jakarta">
                    {name}
                </h3>
                <p className="text-[0.75rem] text-grey-400 transition-all duration-300 group-hover:text-white/55 flex-1">
                    {short}
                </p>
            </div>
        </Link>
    );
}