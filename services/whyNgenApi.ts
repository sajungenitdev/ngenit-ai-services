import { WhyNgenData } from "@/types/admin/whyNgen";

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

// Get Why NGEN (public)
export const getWhyNgen = async (): Promise<WhyNgenData> => {
    try {
        const response = await fetch(`${API_URL}/why-ngen`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });

        const result = await response.json();
        
        if (!response.ok) {
            throw new Error(result.error || 'Failed to fetch why ngen');
        }

        return result.data;
    } catch (error) {
        console.error('Get Why Ngen Error:', error);
        throw error;
    }
};

// Update Why NGEN (admin)
export const updateWhyNgen = async (data: WhyNgenData): Promise<WhyNgenData> => {
    try {
        const response = await fetch(`${API_URL}/why-ngen`, {
            method: 'PUT',
            headers: getHeaders(),
            body: JSON.stringify(data),
        });

        const result = await response.json();
        
        if (!response.ok) {
            throw new Error(result.error || 'Failed to update why ngen');
        }

        return result.data;
    } catch (error) {
        console.error('Update Why Ngen Error:', error);
        throw error;
    }
};

// Toggle Why NGEN status (admin)
export const toggleWhyNgenStatus = async (isActive: boolean): Promise<WhyNgenData> => {
    try {
        const response = await fetch(`${API_URL}/why-ngen/toggle-status`, {
            method: 'PUT',
            headers: getHeaders(),
            body: JSON.stringify({ isActive }),
        });

        const result = await response.json();
        
        if (!response.ok) {
            throw new Error(result.error || 'Failed to toggle why ngen status');
        }

        return result.data;
    } catch (error) {
        console.error('Toggle Why Ngen Status Error:', error);
        throw error;
    }
};

// Reset Why NGEN (admin)
export const resetWhyNgen = async (): Promise<WhyNgenData> => {
    try {
        const response = await fetch(`${API_URL}/why-ngen/reset`, {
            method: 'POST',
            headers: getHeaders(),
        });

        const result = await response.json();
        
        if (!response.ok) {
            throw new Error(result.error || 'Failed to reset why ngen');
        }

        return result.data;
    } catch (error) {
        console.error('Reset Why Ngen Error:', error);
        throw error;
    }
};