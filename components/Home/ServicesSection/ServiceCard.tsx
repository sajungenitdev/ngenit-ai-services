"use client";

import Link from "next/link";

interface ServiceCardProps {
  id: string;
  icon: string;
  name: string;
  summary: string;
}

export default function ServiceCard({ id, icon, name, summary }: ServiceCardProps) {
  return (
    <Link
      href={`/service/${id}`}
      className="group block bg-white rounded-xl p-7 border border-grey-100 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg hover:border-grey-200 relative overflow-hidden h-full flex flex-col"
    >
      {/* Gradient Line */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-blue to-cyan scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>

      {/* Icon */}
      <div className="w-[52px] h-[52px] rounded-xl mb-5 bg-gradient-to-br from-navy-mid to-blue flex items-center justify-center text-2xl text-white flex-shrink-0">
        {icon}
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col">
        <h3 className="text-[1rem] font-semibold text-navy mb-2.5 font-plus-jakarta">
          {name}
        </h3>
        <p className="text-[0.865rem] leading-relaxed text-grey-400 flex-1">
          {summary}
        </p>
      </div>

      {/* Learn More */}
      <span className="inline-flex items-center gap-1.5 mt-[18px] text-[0.85rem] font-semibold text-blue transition-all duration-300 group-hover:gap-2.5 flex-shrink-0">
        Learn More
        <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
      </span>
    </Link>
  );
}