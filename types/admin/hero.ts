export interface HeroData {
    badge: string;
    title: string;
    highlightedText: string;
    subtitle: string;
    buttonPrimary: string;
    buttonPrimaryLink: string;
    buttonSecondary: string;
    buttonSecondaryLink: string;
    stats: {
        years: { value: string; label: string };
        markets: { value: string; label: string };
        partners: { value: string; label: string };
        clients: { value: string; label: string };
    };
    dashboard: {
        title: string;
        services: {
            icon: string;
            name: string;
            tag: string;
        }[];
        metrics: {
            value: string;
            label: string;
            trend: string;
        }[];
    };
    floatingCards: {
        left: string;
        right: string;
    };
    isActive?: boolean;
    _id?: string;
    createdAt?: string;
    updatedAt?: string;
}