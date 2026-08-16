"use client";

import { TrustBarData } from "@/types/admin/trustBar";

interface TrustBarPreviewProps {
    data: TrustBarData;
}

export default function TrustBarPreview({ data }: TrustBarPreviewProps) {
    if (!data.isEnabled) {
        return (
            <div className="bg-white rounded-xl shadow-sm border border-grey-100 p-6">
                <p className="text-center text-grey-400">Trust bar is currently disabled</p>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-xl shadow-sm border border-grey-100 p-6">
            <h3 className="text-lg font-bold text-navy font-plus-jakarta mb-4">
                Live Preview
            </h3>
            <div className="bg-navy-mid rounded-xl p-5 border border-white/5">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <span className="text-white/50 text-xs uppercase tracking-wider font-semibold">
                        {data.leftText}
                    </span>
                    <div className="flex flex-wrap items-center justify-center gap-4">
                        {data.partners.map((partner) => (
                            <span
                                key={partner.id}
                                className="text-white/35 text-sm font-bold px-3 py-1.5 border border-white/10 rounded-md hover:text-white/70 hover:border-white/25 transition-all"
                            >
                                {partner.name}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
            <p className="text-xs text-grey-400 text-center mt-3">
                This is how your trust bar will look on the homepage
            </p>
        </div>
    );
}