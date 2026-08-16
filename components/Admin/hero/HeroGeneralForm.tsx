"use client";

import { HeroData } from "@/types/admin/hero"

interface HeroGeneralFormProps {
    data: HeroData;
    onChange: (data: HeroData) => void;
    errors: Record<string, string>;
}

export default function HeroGeneralForm({ data, onChange, errors }: HeroGeneralFormProps) {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        onChange({ ...data, [name]: value });
    };

    return (
        <div className="space-y-4">
            <div>
                <label className="block text-sm font-semibold text-grey-800 mb-1.5">
                    Badge Text
                </label>
                <input
                    type="text"
                    name="badge"
                    value={data.badge}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border ${
                        errors.badge ? "border-red-500" : "border-grey-200"
                    } focus:border-blue focus:shadow-[0_0_0_3px_rgba(30,95,212,0.1)] outline-none transition-all`}
                    placeholder="🚀 Practical AI for Business & Industry"
                />
                {errors.badge && <p className="text-red-500 text-xs mt-1">{errors.badge}</p>}
            </div>

            <div>
                <label className="block text-sm font-semibold text-grey-800 mb-1.5">
                    Main Title
                </label>
                <input
                    type="text"
                    name="title"
                    value={data.title}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border ${
                        errors.title ? "border-red-500" : "border-grey-200"
                    } focus:border-blue outline-none transition-all`}
                    placeholder="Practical AI Solutions for"
                />
                {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
            </div>

            <div>
                <label className="block text-sm font-semibold text-grey-800 mb-1.5">
                    Highlighted Text (Gradient)
                </label>
                <input
                    type="text"
                    name="highlightedText"
                    value={data.highlightedText}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border ${
                        errors.highlightedText ? "border-red-500" : "border-grey-200"
                    } focus:border-blue outline-none transition-all`}
                    placeholder="Business and Industry"
                />
                {errors.highlightedText && (
                    <p className="text-red-500 text-xs mt-1">{errors.highlightedText}</p>
                )}
            </div>

            <div>
                <label className="block text-sm font-semibold text-grey-800 mb-1.5">
                    Subtitle / Description
                </label>
                <textarea
                    name="subtitle"
                    value={data.subtitle}
                    onChange={handleChange}
                    rows={3}
                    className={`w-full px-4 py-3 rounded-lg border ${
                        errors.subtitle ? "border-red-500" : "border-grey-200"
                    } focus:border-blue outline-none transition-all resize-vertical`}
                    placeholder="We help organizations identify, develop and implement AI solutions..."
                />
                {errors.subtitle && <p className="text-red-500 text-xs mt-1">{errors.subtitle}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-semibold text-grey-800 mb-1.5">
                        Primary Button Text
                    </label>
                    <input
                        type="text"
                        name="buttonPrimary"
                        value={data.buttonPrimary}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-lg border ${
                            errors.buttonPrimary ? "border-red-500" : "border-grey-200"
                        } focus:border-blue outline-none transition-all`}
                        placeholder="Book an AI Consultation"
                    />
                    {errors.buttonPrimary && (
                        <p className="text-red-500 text-xs mt-1">{errors.buttonPrimary}</p>
                    )}
                </div>
                <div>
                    <label className="block text-sm font-semibold text-grey-800 mb-1.5">
                        Primary Button Link
                    </label>
                    <input
                        type="text"
                        name="buttonPrimaryLink"
                        value={data.buttonPrimaryLink}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-lg border ${
                            errors.buttonPrimaryLink ? "border-red-500" : "border-grey-200"
                        } focus:border-blue outline-none transition-all`}
                        placeholder="/contact"
                    />
                    {errors.buttonPrimaryLink && (
                        <p className="text-red-500 text-xs mt-1">{errors.buttonPrimaryLink}</p>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-semibold text-grey-800 mb-1.5">
                        Secondary Button Text
                    </label>
                    <input
                        type="text"
                        name="buttonSecondary"
                        value={data.buttonSecondary}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-lg border ${
                            errors.buttonSecondary ? "border-red-500" : "border-grey-200"
                        } focus:border-blue outline-none transition-all`}
                        placeholder="Explore AI Services"
                    />
                    {errors.buttonSecondary && (
                        <p className="text-red-500 text-xs mt-1">{errors.buttonSecondary}</p>
                    )}
                </div>
                <div>
                    <label className="block text-sm font-semibold text-grey-800 mb-1.5">
                        Secondary Button Link
                    </label>
                    <input
                        type="text"
                        name="buttonSecondaryLink"
                        value={data.buttonSecondaryLink}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-lg border ${
                            errors.buttonSecondaryLink ? "border-red-500" : "border-grey-200"
                        } focus:border-blue outline-none transition-all`}
                        placeholder="/services"
                    />
                    {errors.buttonSecondaryLink && (
                        <p className="text-red-500 text-xs mt-1">{errors.buttonSecondaryLink}</p>
                    )}
                </div>
            </div>
        </div>
    );
}