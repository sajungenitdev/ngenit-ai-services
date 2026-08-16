import { TrustBarData } from "@/types/admin/trustBar";

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

// Get Trust Bar
export const getTrustBar = async (): Promise<TrustBarData> => {
    try {
        const response = await fetch(`${API_URL}/trust-bar`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });

        const result = await response.json();
        
        if (!response.ok) {
            throw new Error(result.error || 'Failed to fetch trust bar');
        }

        return result.data;
    } catch (error) {
        console.error('Get Trust Bar Error:', error);
        throw error;
    }
};

// Create Trust Bar
export const createTrustBar = async (data: TrustBarData): Promise<TrustBarData> => {
    try {
        const response = await fetch(`${API_URL}/trust-bar`, {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify(data),
        });

        const result = await response.json();
        
        if (!response.ok) {
            throw new Error(result.error || 'Failed to create trust bar');
        }

        return result.data;
    } catch (error) {
        console.error('Create Trust Bar Error:', error);
        throw error;
    }
};

// Same getAuthToken and getHeaders functions as above
// Then use getHeaders() in all admin calls

export const updateTrustBar = async (data: TrustBarData): Promise<TrustBarData> => {
    try {
        const response = await fetch(`${API_URL}/trust-bar`, {
            method: 'PUT',
            headers: getHeaders(),
            body: JSON.stringify(data),
        });

        const result = await response.json();
        
        if (!response.ok) {
            throw new Error(result.error || 'Failed to update trust bar');
        }

        return result.data;
    } catch (error) {
        console.error('Update Trust Bar Error:', error);
        throw error;
    }
};

// Toggle Trust Bar Status
export const toggleTrustBarStatus = async (isEnabled: boolean): Promise<TrustBarData> => {
    try {
        const response = await fetch(`${API_URL}/trust-bar/toggle-status`, {
            method: 'PUT',
            headers: getHeaders(),
            body: JSON.stringify({ isEnabled }),
        });

        const result = await response.json();
        
        if (!response.ok) {
            throw new Error(result.error || 'Failed to toggle trust bar status');
        }

        return result.data;
    } catch (error) {
        console.error('Toggle Trust Bar Status Error:', error);
        throw error;
    }
};

// Reset Trust Bar
export const resetTrustBar = async (): Promise<TrustBarData> => {
    try {
        const response = await fetch(`${API_URL}/trust-bar/reset`, {
            method: 'POST',
            headers: getHeaders(),
        });

        const result = await response.json();
        
        if (!response.ok) {
            throw new Error(result.error || 'Failed to reset trust bar');
        }

        return result.data;
    } catch (error) {
        console.error('Reset Trust Bar Error:', error);
        throw error;
    }
};

// Delete Trust Bar
export const deleteTrustBar = async (): Promise<void> => {
    try {
        const response = await fetch(`${API_URL}/trust-bar`, {
            method: 'DELETE',
            headers: getHeaders(),
        });

        const result = await response.json();
        
        if (!response.ok) {
            throw new Error(result.error || 'Failed to delete trust bar');
        }
    } catch (error) {
        console.error('Delete Trust Bar Error:', error);
        throw error;
    }
};