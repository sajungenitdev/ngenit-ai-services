export interface Milestone {
    year: string;
    title: string;
    description: string;
}

export interface Value {
    icon: string;
    title: string;
    description: string;
}

export interface Office {
    flag: string;
    city: string;
    country: string;
    description: string;
}

export interface AboutPageData {
    _id?: string;
    heroTitle: string;
    heroDescription: string;
    storyTitle: string;
    storyDescription: string;
    milestones: Milestone[];
    values: Value[];
    offices: Office[];
    ctaTitle: string;
    ctaDescription: string;
    ctaButton: string;
    ctaLink: string;
    isActive?: boolean;
    createdAt?: string;
    updatedAt?: string;
}