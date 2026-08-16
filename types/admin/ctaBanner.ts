export interface CtaBannerData {
    _id?: string;
    tag: string;
    title: string;
    description: string;
    button: {
        label: string;
        link: string;
    };
    phone: {
        number: string;
        label: string;
    };
    email: {
        address: string;
        label: string;
    };
    isActive?: boolean;
    createdAt?: string;
    updatedAt?: string;
}