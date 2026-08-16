export interface IndustryData {
    _id?: string;
    icon: string;
    name: string;
    slug: string;
    short: string;
    long: string;
    challenges: string[];
    solutions: {
        title: string;
        description: string;
    }[];
    focusAreas: string[];
    ctaText: string;
    ctaButtons: {
        primary: { label: string; link: string };
        secondary: { label: string; link: string };
    };
    metaTitle?: string;
    metaDescription?: string;
    featuredImage?: string;
    isActive?: boolean;
    createdAt?: string;
    updatedAt?: string;
}