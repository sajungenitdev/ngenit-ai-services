import { IndustryData } from "@/types/admin/industry";

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

// Get all industries (public)
export const getIndustries = async (): Promise<IndustryData[]> => {
    try {
        const response = await fetch(`${API_URL}/industries`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });

        const result = await response.json();
        
        if (!response.ok) {
            throw new Error(result.error || 'Failed to fetch industries');
        }

        return result.data;
    } catch (error) {
        console.error('Get Industries Error:', error);
        throw error;
    }
};

// Get single industry by ID or slug (public)
export const getIndustryById = async (id: string): Promise<IndustryData> => {
    try {
        const response = await fetch(`${API_URL}/industries/${id}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });

        const result = await response.json();
        
        if (!response.ok) {
            throw new Error(result.error || 'Failed to fetch industry');
        }

        return result.data;
    } catch (error) {
        console.error('Get Industry By ID Error:', error);
        throw error;
    }
};

// Create industry (admin)
export const createIndustry = async (data: IndustryData): Promise<IndustryData> => {
    try {
        const response = await fetch(`${API_URL}/industries`, {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify(data),
        });

        const result = await response.json();
        
        if (!response.ok) {
            throw new Error(result.error || 'Failed to create industry');
        }

        return result.data;
    } catch (error) {
        console.error('Create Industry Error:', error);
        throw error;
    }
};

// Update industry (admin)
export const updateIndustry = async (id: string, data: IndustryData): Promise<IndustryData> => {
    try {
        const response = await fetch(`${API_URL}/industries/${id}`, {
            method: 'PUT',
            headers: getHeaders(),
            body: JSON.stringify(data),
        });

        const result = await response.json();
        
        if (!response.ok) {
            throw new Error(result.error || 'Failed to update industry');
        }

        return result.data;
    } catch (error) {
        console.error('Update Industry Error:', error);
        throw error;
    }
};

// Toggle industry status (admin)
export const toggleIndustryStatus = async (id: string, isActive: boolean): Promise<IndustryData> => {
    try {
        const response = await fetch(`${API_URL}/industries/${id}/toggle-status`, {
            method: 'PUT',
            headers: getHeaders(),
            body: JSON.stringify({ isActive }),
        });

        const result = await response.json();
        
        if (!response.ok) {
            throw new Error(result.error || 'Failed to toggle industry status');
        }

        return result.data;
    } catch (error) {
        console.error('Toggle Industry Status Error:', error);
        throw error;
    }
};

// Delete industry (admin)
export const deleteIndustry = async (id: string): Promise<void> => {
    try {
        const response = await fetch(`${API_URL}/industries/${id}`, {
            method: 'DELETE',
            headers: getHeaders(),
        });

        const result = await response.json();
        
        if (!response.ok) {
            throw new Error(result.error || 'Failed to delete industry');
        }
    } catch (error) {
        console.error('Delete Industry Error:', error);
        throw error;
    }
};