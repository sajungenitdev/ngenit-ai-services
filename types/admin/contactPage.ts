// ============================================================
// CONTACT METHOD TYPE
// ============================================================
export interface ContactMethod {
    icon: string;
    label: string;
    description: string;
    link: string;
    type: 'whatsapp' | 'email' | 'phone' | 'custom';
    isActive: boolean;
    order: number;
}

// ============================================================
// FORM FIELD TYPE
// ============================================================
export interface FormField {
    label: string;
    placeholder: string;
    required: boolean;
}

export interface CountryField extends FormField {
    options: string[];
}

// ============================================================
// SERVICE OPTION TYPE
// ============================================================
export interface ServiceOption {
    id: string;
    name: string;
    displayName: string;
}

// ============================================================
// CONTACT PAGE DATA TYPE
// ============================================================
export interface ContactPageData {
    _id?: string;
    hero: {
        tag: string;
        title: string;
        description: string;
    };
    section: {
        tag: string;
        title: string;
        description: string;
    };
    contactMethods: ContactMethod[];
    form: {
        title: string;
        description: string;
        submitButton: string;
        successMessage: string;
        consentText: string;
        privacyPolicyLink: string;
        footerNote: string;
    };
    formFields: {
        name: FormField;
        company: FormField;
        email: FormField;
        phone: FormField;
        country: CountryField;
        service: FormField;
        message: FormField;
    };
    serviceOptions?: ServiceOption[];
    isActive?: boolean;
    createdAt?: string;
    updatedAt?: string;
}