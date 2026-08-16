import { ContactPageData } from "@/types/admin/contactPage";

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// ============================================================
// Submit Contact Form (Public)
// ============================================================
export interface ContactFormData {
    name: string;
    company: string;
    email: string;
    phone: string;
    country: string;
    service: string;
    message: string;
    consent: boolean;
}

export const submitContactForm = async (formData: ContactFormData): Promise<{ success: boolean; message: string }> => {
    try {
        const response = await fetch(`${API_URL}/contact-page/submit`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        const result = await response.json();
        
        if (!response.ok) {
            throw new Error(result.error || 'Failed to submit form');
        }

        return result;
    } catch (error) {
        console.error('Submit Contact Form Error:', error);
        throw error;
    }
};

// Helper to get auth token
const getAuthToken = (): string => {
    const token = localStorage.getItem('admin_token');
    if (token) return token;
    
    const cookies = document.cookie.split('; ');
    const tokenCookie = cookies.find(row => row.startsWith('admin_token='));
    if (tokenCookie) {
        return tokenCookie.split('=')[1];
    }
    
    return '';
};

const getHeaders = (): HeadersInit => {
    const token = getAuthToken();
    return {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
    };
};

// Get Contact Page (public)
export const getContactPage = async (): Promise<ContactPageData> => {
    try {
        const response = await fetch(`${API_URL}/contact-page`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });

        const result = await response.json();
        
        if (!response.ok) {
            throw new Error(result.error || 'Failed to fetch contact page');
        }

        return result.data;
    } catch (error) {
        console.error('Get Contact Page Error:', error);
        throw error;
    }
};

// Update Contact Page (admin)
export const updateContactPage = async (data: ContactPageData): Promise<ContactPageData> => {
    try {
        const response = await fetch(`${API_URL}/contact-page`, {
            method: 'PUT',
            headers: getHeaders(),
            body: JSON.stringify(data),
        });

        const result = await response.json();
        
        if (!response.ok) {
            throw new Error(result.error || 'Failed to update contact page');
        }

        return result.data;
    } catch (error) {
        console.error('Update Contact Page Error:', error);
        throw error;
    }
};

// Toggle Contact Page status (admin)
export const toggleContactPageStatus = async (isActive: boolean): Promise<ContactPageData> => {
    try {
        const response = await fetch(`${API_URL}/contact-page/toggle-status`, {
            method: 'PUT',
            headers: getHeaders(),
            body: JSON.stringify({ isActive }),
        });

        const result = await response.json();
        
        if (!response.ok) {
            throw new Error(result.error || 'Failed to toggle contact page status');
        }

        return result.data;
    } catch (error) {
        console.error('Toggle Contact Page Status Error:', error);
        throw error;
    }
};

// Reset Contact Page (admin)
export const resetContactPage = async (): Promise<ContactPageData> => {
    try {
        const response = await fetch(`${API_URL}/contact-page/reset`, {
            method: 'POST',
            headers: getHeaders(),
        });

        const result = await response.json();
        
        if (!response.ok) {
            throw new Error(result.error || 'Failed to reset contact page');
        }

        return result.data;
    } catch (error) {
        console.error('Reset Contact Page Error:', error);
        throw error;
    }
};