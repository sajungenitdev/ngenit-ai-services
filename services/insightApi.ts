import { InsightData } from "@/types/admin/insight";

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

// Get all insights (public)
export const getInsights = async (params?: { category?: string; search?: string; active?: boolean }): Promise<InsightData[]> => {
    try {
        const queryParams = new URLSearchParams();
        if (params?.category && params.category !== 'all') queryParams.append('category', params.category);
        if (params?.search) queryParams.append('search', params.search);
        if (params?.active !== undefined) queryParams.append('active', String(params.active));
        
        const url = `${API_URL}/insights${queryParams.toString() ? `?${queryParams}` : ''}`;
        
        const response = await fetch(url, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            cache: 'no-store',
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        
        if (!result.success) {
            throw new Error(result.error || 'Failed to fetch insights');
        }

        return result.data;
    } catch (error) {
        console.error('Get Insights Error:', error);
        throw error;
    }
};

// Get single insight (public)
export const getInsightById = async (id: string): Promise<InsightData> => {
    try {
        const response = await fetch(`${API_URL}/insights/${id}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            cache: 'no-store',
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        
        if (!result.success) {
            throw new Error(result.error || 'Failed to fetch insight');
        }

        return result.data;
    } catch (error) {
        console.error('Get Insight By ID Error:', error);
        throw error;
    }
};

// Get categories (public)
export const getCategories = async (): Promise<string[]> => {
    try {
        const response = await fetch(`${API_URL}/insights/categories`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            cache: 'no-store',
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        
        if (!result.success) {
            throw new Error(result.error || 'Failed to fetch categories');
        }

        return result.data;
    } catch (error) {
        console.error('Get Categories Error:', error);
        throw error;
    }
};

// Create insight (admin)
export const createInsight = async (data: Partial<InsightData>): Promise<InsightData> => {
    try {
        const response = await fetch(`${API_URL}/insights`, {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        
        if (!result.success) {
            throw new Error(result.error || 'Failed to create insight');
        }

        return result.data;
    } catch (error) {
        console.error('Create Insight Error:', error);
        throw error;
    }
};

// Update insight (admin)
export const updateInsight = async (id: string, data: Partial<InsightData>): Promise<InsightData> => {
    try {
        const response = await fetch(`${API_URL}/insights/${id}`, {
            method: 'PUT',
            headers: getHeaders(),
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        
        if (!result.success) {
            throw new Error(result.error || 'Failed to update insight');
        }

        return result.data;
    } catch (error) {
        console.error('Update Insight Error:', error);
        throw error;
    }
};

// Toggle insight status (admin)
export const toggleInsightStatus = async (id: string, isActive: boolean): Promise<InsightData> => {
    try {
        const response = await fetch(`${API_URL}/insights/${id}/toggle-status`, {
            method: 'PUT',
            headers: getHeaders(),
            body: JSON.stringify({ isActive }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        
        if (!result.success) {
            throw new Error(result.error || 'Failed to toggle insight status');
        }

        return result.data;
    } catch (error) {
        console.error('Toggle Insight Status Error:', error);
        throw error;
    }
};

// Delete insight (admin)
export const deleteInsight = async (id: string): Promise<void> => {
    try {
        const response = await fetch(`${API_URL}/insights/${id}`, {
            method: 'DELETE',
            headers: getHeaders(),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        
        if (!result.success) {
            throw new Error(result.error || 'Failed to delete insight');
        }
    } catch (error) {
        console.error('Delete Insight Error:', error);
        throw error;
    }
};