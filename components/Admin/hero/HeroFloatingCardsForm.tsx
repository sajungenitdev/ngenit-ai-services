"use client";

import { HeroData } from "@/types/admin/hero"

interface HeroFloatingCardsFormProps {
    data: HeroData;
    onChange: (data: HeroData) => void;
}

export default function HeroFloatingCardsForm({ data, onChange }: HeroFloatingCardsFormProps) {
    const handleChange = (position: "left" | "right", value: string) => {
        onChange({
            ...data,
            floatingCards: {
                ...data.floatingCards,
                [position]: value,
            },
        });
    };

    return (
        <div className="space-y-4">
            <p className="text-sm text-grey-400">
                Configure the floating cards that appear on the hero section
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-semibold text-grey-800 mb-1.5">
                        Left Floating Card
                    </label>
                    <input
                        type="text"
                        value={data.floatingCards.left}
                        onChange={(e) => handleChange("left", e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border border-grey-200 focus:border-blue outline-none transition-all"
                        placeholder="AI Automation Active"
                    />
                    <p className="text-xs text-grey-400 mt-1">
                        Displayed on the top-left of the hero section
                    </p>
                </div>
                <div>
                    <label className="block text-sm font-semibold text-grey-800 mb-1.5">
                        Right Floating Card
                    </label>
                    <input
                        type="text"
                        value={data.floatingCards.right}
                        onChange={(e) => handleChange("right", e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border border-grey-200 focus:border-blue outline-none transition-all"
                        placeholder="New Enquiry Received"
                    />
                    <p className="text-xs text-grey-400 mt-1">
                        Displayed on the bottom-right of the hero section
                    </p>
                </div>
            </div>
        </div>
    );
}