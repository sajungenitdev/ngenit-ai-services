"use client";

import { HeroData } @/types/admin/hero

interface HeroStatsFormProps {
    data: HeroData;
    onChange: (data: HeroData) => void;
}

export default function HeroStatsForm({ data, onChange }: HeroStatsFormProps) {
    const handleStatChange = (key: string, field: string, value: string) => {
        onChange({
            ...data,
            stats: {
                ...data.stats,
                [key]: {
                    ...(data.stats[key as keyof typeof data.stats] as {
                        value: string;
                        label: string;
                    }),
                    [field]: value,
                },
            },
        });
    };

    return (
        <div className="space-y-4">
            <p className="text-sm text-grey-400 mb-4">
                Configure the trust metrics displayed below the hero buttons
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(data.stats).map(([key, stat]) => (
                    <div key={key} className="border border-grey-100 rounded-lg p-4">
                        <label className="block text-sm font-semibold text-grey-800 mb-1.5 capitalize">
                            {key}
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                            <input
                                type="text"
                                value={stat.value}
                                onChange={(e) => handleStatChange(key, "value", e.target.value)}
                                className="px-4 py-2.5 rounded-lg border border-grey-200 focus:border-blue outline-none transition-all"
                                placeholder="16+"
                            />
                            <input
                                type="text"
                                value={stat.label}
                                onChange={(e) => handleStatChange(key, "label", e.target.value)}
                                className="px-4 py-2.5 rounded-lg border border-grey-200 focus:border-blue outline-none transition-all"
                                placeholder="Years of Experience"
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}