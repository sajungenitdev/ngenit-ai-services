export interface ServiceData {
    _id?: string;
    icon: string;
    name: string;
    tagline: string;
    summary: string;
    description: string;
    capabilities: string[];
    benefits: { label: string; description: string }[];
    useCases: string[];
    ctaButtons: {
        primary: { label: string; link: string };
        secondary: { label: string; link: string };
    };
    isActive?: boolean;
    createdAt?: string;
    updatedAt?: string;
}