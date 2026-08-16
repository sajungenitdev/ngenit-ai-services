import { AboutPageData } from "@/types/admin/aboutPage";

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// Helper to get auth token
const getAuthToken = (): string => {
    if (typeof window !== 'undefined') {
        const token = localStorage.getItem('admin_token');
        if (token) return token;
        
        const cookies = document.cookie.split('; ');
        const tokenCookie = cookies.find(row => row.startsWith('admin_token='));
        if (tokenCookie) {
            return tokenCookie.split('=')[1];
        }
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

// Get About Page (public)
export const getAboutPage = async (): Promise<AboutPageData> => {
    try {
        const response = await fetch(`${API_URL}/about-page`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            cache: 'no-store',
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        
        if (!result.success) {
            throw new Error(result.error || 'Failed to fetch about page');
        }

        return result.data;
    } catch (error) {
        console.error('Get About Page Error:', error);
        throw error;
    }
};

// Update About Page (admin)
export const updateAboutPage = async (data: AboutPageData): Promise<AboutPageData> => {
    try {
        const response = await fetch(`${API_URL}/about-page`, {
            method: 'PUT',
            headers: getHeaders(),
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        
        if (!result.success) {
            throw new Error(result.error || 'Failed to update about page');
        }

        return result.data;
    } catch (error) {
        console.error('Update About Page Error:', error);
        throw error;
    }
};

// Toggle About Page status (admin)
export const toggleAboutPageStatus = async (isActive: boolean): Promise<AboutPageData> => {
    try {
        const response = await fetch(`${API_URL}/about-page/toggle-status`, {
            method: 'PUT',
            headers: getHeaders(),
            body: JSON.stringify({ isActive }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        
        if (!result.success) {
            throw new Error(result.error || 'Failed to toggle about page status');
        }

        return result.data;
    } catch (error) {
        console.error('Toggle About Page Status Error:', error);
        throw error;
    }
};

// Reset About Page (admin)
export const resetAboutPage = async (): Promise<AboutPageData> => {
    try {
        const response = await fetch(`${API_URL}/about-page/reset`, {
            method: 'POST',
            headers: getHeaders(),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        
        if (!result.success) {
            throw new Error(result.error || 'Failed to reset about page');
        }

        return result.data;
    } catch (error) {
        console.error('Reset About Page Error:', error);
        throw error;
    }
};