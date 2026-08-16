export interface TrustBarData {
    isEnabled: boolean;
    leftText: string;
    partners: {
        id: string;
        name: string;
        logo?: string;
    }[];
    _id?: string;
    createdAt?: string;
    updatedAt?: string;
}