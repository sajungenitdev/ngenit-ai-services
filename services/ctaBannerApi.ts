import { CtaBannerData } from "@/types/admin/ctaBanner";

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

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

// Get CTA Banner (public)
export const getCtaBanner = async (): Promise<CtaBannerData> => {
    try {
        const response = await fetch(`${API_URL}/cta-banner`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });

        const result = await response.json();
        
        if (!response.ok) {
            throw new Error(result.error || 'Failed to fetch CTA banner');
        }

        return result.data;
    } catch (error) {
        console.error('Get CTA Banner Error:', error);
        throw error;
    }
};

// Update CTA Banner (admin)
export const updateCtaBanner = async (data: CtaBannerData): Promise<CtaBannerData> => {
    try {
        const response = await fetch(`${API_URL}/cta-banner`, {
            method: 'PUT',
            headers: getHeaders(),
            body: JSON.stringify(data),
        });

        const result = await response.json();
        
        if (!response.ok) {
            throw new Error(result.error || 'Failed to update CTA banner');
        }

        return result.data;
    } catch (error) {
        console.error('Update CTA Banner Error:', error);
        throw error;
    }
};

// Toggle CTA Banner status (admin)
export const toggleCtaBannerStatus = async (isActive: boolean): Promise<CtaBannerData> => {
    try {
        const response = await fetch(`${API_URL}/cta-banner/toggle-status`, {
            method: 'PUT',
            headers: getHeaders(),
            body: JSON.stringify({ isActive }),
        });

        const result = await response.json();
        
        if (!response.ok) {
            throw new Error(result.error || 'Failed to toggle CTA banner status');
        }

        return result.data;
    } catch (error) {
        console.error('Toggle CTA Banner Status Error:', error);
        throw error;
    }
};

// Reset CTA Banner (admin)
export const resetCtaBanner = async (): Promise<CtaBannerData> => {
    try {
        const response = await fetch(`${API_URL}/cta-banner/reset`, {
            method: 'POST',
            headers: getHeaders(),
        });

        const result = await response.json();
        
        if (!response.ok) {
            throw new Error(result.error || 'Failed to reset CTA banner');
        }

        return result.data;
    } catch (error) {
        console.error('Reset CTA Banner Error:', error);
        throw error;
    }
};