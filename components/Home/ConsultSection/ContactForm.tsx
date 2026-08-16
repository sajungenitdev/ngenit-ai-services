"use client";

import { useState } from "react";
import { submitContactForm, ContactFormData } from "@/services/contactPageApi";
import { Loader2 } from "lucide-react";
import toast from 'react-hot-toast';

interface ContactFormProps {
    formData: {
        title: string;
        description: string;
        submitButton: string;
        successMessage: string;
        consentText: string;
        privacyPolicyLink: string;
        footerNote: string;
    };
    formFields: {
        name: {
            label: string;
            placeholder: string;
            required: boolean;
        };
        company: {
            label: string;
            placeholder: string;
            required: boolean;
        };
        email: {
            label: string;
            placeholder: string;
            required: boolean;
        };
        phone: {
            label: string;
            placeholder: string;
            required: boolean;
        };
        country: {
            label: string;
            placeholder: string;
            required: boolean;
            options: string[];
        };
        service: {
            label: string;
            placeholder: string;
            required: boolean;
        };
        message: {
            label: string;
            placeholder: string;
            required: boolean;
        };
    };
    serviceOptions?: { id: string; name: string; displayName: string }[];
    className?: string;
    onSuccess?: () => void;
    onError?: (error: string) => void;
}

export default function ContactForm({ 
    formData, 
    formFields, 
    serviceOptions = [],
    className = "",
    onSuccess,
    onError 
}: ContactFormProps) {
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formError, setFormError] = useState<string | null>(null);
    const [formState, setFormState] = useState<ContactFormData>({
        name: '',
        company: '',
        email: '',
        phone: '',
        country: '',
        service: '',
        message: '',
        consent: false,
    });

    // ============================================================
    // FORM HANDLERS
    // ============================================================
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;

        if (type === 'checkbox') {
            const checked = (e.target as HTMLInputElement).checked;
            setFormState((prev) => ({ ...prev, [name]: checked }));
        } else {
            setFormState((prev) => ({ ...prev, [name]: value }));
        }

        // Clear error when user types
        if (formError) setFormError(null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validate consent
        if (!formState.consent) {
            const errorMsg = 'Please agree to the Privacy Policy to continue.';
            setFormError(errorMsg);
            toast.error(errorMsg);
            if (onError) onError(errorMsg);
            return;
        }

        setIsSubmitting(true);
        setFormError(null);

        // Show loading toast
        const loadingToastId = toast.loading('Submitting your requirement...');

        try {
            const result = await submitContactForm(formState);

            if (result.success) {
                // Dismiss loading toast
                toast.dismiss(loadingToastId);
                
                // Show success toast
                toast.success(result.message || formData.successMessage, {
                    icon: '✅',
                    duration: 5000,
                });

                setFormSubmitted(true);
                // Reset form
                setFormState({
                    name: '',
                    company: '',
                    email: '',
                    phone: '',
                    country: '',
                    service: '',
                    message: '',
                    consent: false,
                });

                if (onSuccess) onSuccess();

                // Auto-hide success message after 5 seconds
                setTimeout(() => {
                    setFormSubmitted(false);
                }, 5000);
            }
        } catch (error: any) {
            // Dismiss loading toast
            toast.dismiss(loadingToastId);
            
            const errorMessage = error.message || 'Failed to submit form. Please try again.';
            setFormError(errorMessage);
            
            // Show error toast
            toast.error(errorMessage, {
                icon: '❌',
                duration: 6000,
            });
            
            if (onError) onError(errorMessage);
        } finally {
            setIsSubmitting(false);
        }
    };

    // ============================================================
    // RENDER
    // ============================================================
    return (
        <div className={className}>
            <h3 className="text-[1.1rem] font-semibold text-navy mb-1.5 font-plus-jakarta">
                {formData.title}
            </h3>
            <p className="text-[0.85rem] text-grey-400 mb-6">
                {formData.description}
            </p>

            {/* Success Message (inline fallback) */}
            {formSubmitted && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700">
                    {formData.successMessage}
                </div>
            )}

            {/* Error Message (inline fallback) */}
            {formError && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                    {formError}
                </div>
            )}

            <form onSubmit={handleSubmit} noValidate>
                {/* Row 1: Name & Company */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div>
                        <label className="block text-[0.82rem] font-semibold text-grey-800 mb-1.5">
                            {formFields.name.label} {formFields.name.required && '*'}
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={formState.name}
                            onChange={handleInputChange}
                            placeholder={formFields.name.placeholder}
                            className="w-full px-4 py-3 rounded-[8px] border border-grey-200 font-inter text-[0.9rem] text-grey-800 bg-white transition-all duration-200 outline-none focus:border-blue focus:shadow-[0_0_0_3px_rgba(30,95,212,0.1)]"
                            required={formFields.name.required}
                            disabled={isSubmitting}
                        />
                    </div>
                    <div>
                        <label className="block text-[0.82rem] font-semibold text-grey-800 mb-1.5">
                            {formFields.company.label} {formFields.company.required && '*'}
                        </label>
                        <input
                            type="text"
                            name="company"
                            value={formState.company}
                            onChange={handleInputChange}
                            placeholder={formFields.company.placeholder}
                            className="w-full px-4 py-3 rounded-[8px] border border-grey-200 font-inter text-[0.9rem] text-grey-800 bg-white transition-all duration-200 outline-none focus:border-blue focus:shadow-[0_0_0_3px_rgba(30,95,212,0.1)]"
                            required={formFields.company.required}
                            disabled={isSubmitting}
                        />
                    </div>
                </div>

                {/* Row 2: Email & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div>
                        <label className="block text-[0.82rem] font-semibold text-grey-800 mb-1.5">
                            {formFields.email.label} {formFields.email.required && '*'}
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formState.email}
                            onChange={handleInputChange}
                            placeholder={formFields.email.placeholder}
                            className="w-full px-4 py-3 rounded-[8px] border border-grey-200 font-inter text-[0.9rem] text-grey-800 bg-white transition-all duration-200 outline-none focus:border-blue focus:shadow-[0_0_0_3px_rgba(30,95,212,0.1)]"
                            required={formFields.email.required}
                            disabled={isSubmitting}
                        />
                    </div>
                    <div>
                        <label className="block text-[0.82rem] font-semibold text-grey-800 mb-1.5">
                            {formFields.phone.label} {formFields.phone.required && '*'}
                        </label>
                        <input
                            type="tel"
                            name="phone"
                            value={formState.phone}
                            onChange={handleInputChange}
                            placeholder={formFields.phone.placeholder}
                            className="w-full px-4 py-3 rounded-[8px] border border-grey-200 font-inter text-[0.9rem] text-grey-800 bg-white transition-all duration-200 outline-none focus:border-blue focus:shadow-[0_0_0_3px_rgba(30,95,212,0.1)]"
                            required={formFields.phone.required}
                            disabled={isSubmitting}
                        />
                    </div>
                </div>

                {/* Row 3: Country & Service */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div>
                        <label className="block text-[0.82rem] font-semibold text-grey-800 mb-1.5">
                            {formFields.country.label} {formFields.country.required && '*'}
                        </label>
                        <select
                            name="country"
                            value={formState.country}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 rounded-[8px] border border-grey-200 font-inter text-[0.9rem] text-grey-800 bg-white transition-all duration-200 outline-none focus:border-blue focus:shadow-[0_0_0_3px_rgba(30,95,212,0.1)] appearance-none cursor-pointer"
                            required={formFields.country.required}
                            disabled={isSubmitting}
                        >
                            <option value="">{formFields.country.placeholder}</option>
                            {formFields.country.options.map((option) => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-[0.82rem] font-semibold text-grey-800 mb-1.5">
                            {formFields.service.label} {formFields.service.required && '*'}
                        </label>
                        <select
                            name="service"
                            value={formState.service}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 rounded-[8px] border border-grey-200 font-inter text-[0.9rem] text-grey-800 bg-white transition-all duration-200 outline-none focus:border-blue focus:shadow-[0_0_0_3px_rgba(30,95,212,0.1)] appearance-none cursor-pointer"
                            required={formFields.service.required}
                            disabled={isSubmitting}
                        >
                            <option value="">{formFields.service.placeholder}</option>
                            {serviceOptions.map((option) => (
                                <option key={option.id} value={option.id}>
                                    {option.displayName || option.name}
                                </option>
                            ))}
                            <option value="not-sure">Not sure — need advice</option>
                        </select>
                        <p className="text-xs text-grey-400 mt-1">
                            Service options are loaded from the database
                        </p>
                    </div>
                </div>

                {/* Message */}
                <div className="mb-4">
                    <label className="block text-[0.82rem] font-semibold text-grey-800 mb-1.5">
                        {formFields.message.label} {formFields.message.required && '*'}
                    </label>
                    <textarea
                        name="message"
                        value={formState.message}
                        onChange={handleInputChange}
                        placeholder={formFields.message.placeholder}
                        className="w-full px-4 py-3 rounded-[8px] border border-grey-200 font-inter text-[0.9rem] text-grey-800 bg-white transition-all duration-200 outline-none focus:border-blue focus:shadow-[0_0_0_3px_rgba(30,95,212,0.1)] resize-vertical min-h-[110px]"
                        required={formFields.message.required}
                        disabled={isSubmitting}
                    />
                </div>

                {/* Consent */}
                <div className="flex gap-2.5 items-start mb-6">
                    <input
                        type="checkbox"
                        name="consent"
                        checked={formState.consent}
                        onChange={handleInputChange}
                        className="mt-1.5 shrink-0"
                        required
                        disabled={isSubmitting}
                    />
                    <p className="text-[0.8rem] text-grey-400">
                        {formData.consentText}
                        {' '}
                        <a href={formData.privacyPolicyLink} className="text-blue hover:underline">
                            Privacy Policy
                        </a>
                        .
                    </p>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={isSubmitting || formSubmitted}
                    className={`w-full py-4 rounded-[8px] font-semibold text-[1.05rem] border-2 border-transparent transition-all duration-200 cursor-pointer ${
                        formSubmitted
                            ? 'bg-[#28CA41] text-white'
                            : isSubmitting
                            ? 'bg-grey-300 text-grey-600 cursor-not-allowed'
                            : 'bg-cyan text-navy shadow-[0_4px_20px_rgba(0,194,203,0.3)] hover:bg-cyan-light hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(0,194,203,0.4)]'
                    }`}
                >
                    {isSubmitting ? (
                        <>
                            <Loader2 className="w-5 h-5 animate-spin inline mr-2" />
                            Submitting...
                        </>
                    ) : formSubmitted ? (
                        '✓ ' + formData.successMessage
                    ) : (
                        formData.submitButton
                    )}
                </button>

                <p className="text-center mt-3 text-[0.78rem] text-grey-400">
                    {formData.footerNote || '🔒 Your information is secure and will only be shared with the NGEN IT AI Solutions team.'}
                </p>
            </form>
        </div>
    );
}