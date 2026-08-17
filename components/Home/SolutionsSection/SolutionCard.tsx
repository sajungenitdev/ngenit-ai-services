"use client";

import Link from "next/link";

interface SolutionCardProps {
    tag: string;
    name: string;
    desc: string;
    tags: string[];
    footer: string;
}

export default function SolutionCard({ tag, name, desc, tags, footer }: SolutionCardProps) {
    return (
        <div className="group bg-white rounded-xl p-8 border border-grey-100 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg flex flex-col h-full">
            {/* Tag */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue/10 text-blue text-[0.75rem] font-semibold mb-4 self-start">
                {tag}
            </div>

            {/* Title */}
            <h3 className="text-[1.1rem] font-semibold text-navy mb-3 font-plus-jakarta">
                {name}
            </h3>

            {/* Description */}
            <p className="text-[0.875rem] text-grey-400 leading-relaxed flex-1" dangerouslySetInnerHTML={{ __html: desc } }/>
           
            {/* Industry Tags */}
            <div className="flex flex-wrap gap-1.5 mt-5">
                {tags.map((tag, index) => (
                    <span
                        key={index}
                        className="px-2.5 py-1 rounded-md bg-off-white text-grey-600 text-[0.72rem] font-medium"
                    >
                        {tag}
                    </span>
                ))}
            </div>

            {/* Footer with CTA */}
            <div className="flex items-center justify-between pt-5 mt-5 border-t border-grey-100">
                <span className="text-[0.8rem] text-grey-400">
                    {footer}
                </span>
                <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[8px] font-semibold text-[0.875rem] border-2 border-transparent transition-all duration-200 whitespace-nowrap bg-navy-mid text-white hover:bg-navy-light hover:-translate-y-0.5"
                >
                    Discuss →
                </Link>
            </div>
        </div>
    );
}