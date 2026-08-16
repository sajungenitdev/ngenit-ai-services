export interface WhyFeature {
    icon: string;
    title: string;
    description: string;
}

export interface WhyNgenData {
    _id?: string;
    tag: string;
    title: string;
    description: string;
    button: {
        label: string;
        link: string;
    };
    features: WhyFeature[];
    isActive?: boolean;
    createdAt?: string;
    updatedAt?: string;
}