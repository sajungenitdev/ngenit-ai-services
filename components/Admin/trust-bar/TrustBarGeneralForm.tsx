"use client";

import { TrustBarData } from "@/types/admin/trustBar";

interface TrustBarGeneralFormProps {
    data: TrustBarData;
    onChange: (data: TrustBarData) => void;
}

export default function TrustBarGeneralForm({ data, onChange }: TrustBarGeneralFormProps) {
    return (
        <div className="space-y-4">
            {/* Enable/Disable Toggle */}
            <div className="flex items-center justify-between p-4 bg-off-white rounded-lg">
                <div>
                    <h3 className="text-sm font-semibold text-navy">Enable Trust Bar</h3>
                    <p className="text-xs text-grey-400">Show trust bar on the homepage</p>
                </div>
                <button
                    onClick={() => onChange({ ...data, isEnabled: !data.isEnabled })}
                    className={`relative w-12 h-6 rounded-full transition-colors ${
                        data.isEnabled ? "bg-cyan" : "bg-grey-300"
                    }`}
                >
                    <span
                        className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                            data.isEnabled ? "translate-x-6" : ""
                        }`}
                    />
                </button>
            </div>

            {/* Left Text */}
            <div>
                <label className="block text-sm font-semibold text-grey-800 mb-1.5">
                    Left Side Text
                </label>
                <input
                    type="text"
                    value={data.leftText}
                    onChange={(e) => onChange({ ...data, leftText: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-grey-200 focus:border-blue focus:shadow-[0_0_0_3px_rgba(30,95,212,0.1)] outline-none transition-all"
                    placeholder="Technology Ecosystem"
                />
                <p className="text-xs text-grey-400 mt-1">
                    Displayed on the left side of the trust bar
                </p>
            </div>
        </div>
    );
}