"use client";

import { Plus, Trash2, GripVertical } from "lucide-react";
import { TrustBarData } from "@/types/admin/trustBar";

interface TrustBarPartnersFormProps {
    data: TrustBarData;
    onChange: (data: TrustBarData) => void;
}

export default function TrustBarPartnersForm({ data, onChange }: TrustBarPartnersFormProps) {
    const handlePartnerChange = (index: number, value: string) => {
        const newPartners = data.partners.map((p, i) =>
            i === index ? { ...p, name: value } : p
        );
        onChange({ ...data, partners: newPartners });
    };

    const addPartner = () => {
        const newId = (data.partners.length + 1).toString();
        onChange({
            ...data,
            partners: [
                ...data.partners,
                { id: newId, name: "New Partner" },
            ],
        });
    };

    const removePartner = (index: number) => {
        if (data.partners.length <= 1) return;
        onChange({
            ...data,
            partners: data.partners.filter((_, i) => i !== index),
        });
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-3">
                <label className="block text-sm font-semibold text-grey-800">
                    Partner Logos / Names
                </label>
                <button
                    onClick={addPartner}
                    className="text-sm text-cyan hover:text-cyan-light font-medium flex items-center gap-1"
                >
                    <Plus className="w-4 h-4" />
                    Add Partner
                </button>
            </div>
            <div className="space-y-3">
                {data.partners.map((partner, index) => (
                    <div
                        key={partner.id}
                        className="flex items-center gap-3 border border-grey-100 rounded-lg p-3 hover:border-grey-200 transition-colors"
                    >
                        <GripVertical className="w-5 h-5 text-grey-300 cursor-move" />
                        <input
                            type="text"
                            value={partner.name}
                            onChange={(e) => handlePartnerChange(index, e.target.value)}
                            className="flex-1 px-4 py-2 rounded-lg border border-grey-200 focus:border-blue outline-none transition-all"
                            placeholder="Partner Name"
                        />
                        <button
                            onClick={() => removePartner(index)}
                            className="text-red-400 hover:text-red-600 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                            disabled={data.partners.length <= 1}
                        >
                            <Trash2 className="w-4 h-4" />
                        </button>
                    </div>
                ))}
            </div>
            {data.partners.length <= 1 && (
                <p className="text-xs text-grey-400 mt-2">
                    At least one partner is required
                </p>
            )}
        </div>
    );
}