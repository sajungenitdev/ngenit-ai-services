export interface Service {
    id: string;
    icon: string;
    name: string;
    tagline: string;
    summary: string;
    description: string;
    capabilities: string[];
    benefits: string[][];
    useCases: string[];
}

export interface Industry {
    id: string;
    icon: string;
    name: string;
    short: string;
    long: string;
}

export interface Solution {
    tag: string;
    name: string;
    desc: string;
    tags: string[];
    footer: string;
}

export interface UseCase {
    name: string;
    industry: string;
    service: string;
    desc: string;
    result: string;
}

export interface Insight {
    icon: string;
    cat: string;
    date: string;
    read: string;
    title: string;
    excerpt: string;
}

export interface Milestone {
    year: string;
    title: string;
    desc: string;
}