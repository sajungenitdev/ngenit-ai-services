import { MethodologyStep } from "@/types/admin/methodology";

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

// Get all methodology steps (public)
export const getMethodology = async (): Promise<MethodologyStep[]> => {
    try {
        const response = await fetch(`${API_URL}/methodology`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });

        const result = await response.json();
        
        if (!response.ok) {
            throw new Error(result.error || 'Failed to fetch methodology');
        }

        return result.data;
    } catch (error) {
        console.error('Get Methodology Error:', error);
        throw error;
    }
};

// Get single methodology step (public)
export const getMethodologyById = async (id: string): Promise<MethodologyStep> => {
    try {
        const response = await fetch(`${API_URL}/methodology/${id}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });

        const result = await response.json();
        
        if (!response.ok) {
            throw new Error(result.error || 'Failed to fetch methodology step');
        }

        return result.data;
    } catch (error) {
        console.error('Get Methodology By ID Error:', error);
        throw error;
    }
};

// Create methodology step (admin)
export const createMethodologyStep = async (data: MethodologyStep): Promise<MethodologyStep> => {
    try {
        const response = await fetch(`${API_URL}/methodology`, {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify(data),
        });

        const result = await response.json();
        
        if (!response.ok) {
            throw new Error(result.error || 'Failed to create methodology step');
        }

        return result.data;
    } catch (error) {
        console.error('Create Methodology Step Error:', error);
        throw error;
    }
};

// Update methodology step (admin)
export const updateMethodologyStep = async (id: string, data: MethodologyStep): Promise<MethodologyStep> => {
    try {
        const response = await fetch(`${API_URL}/methodology/${id}`, {
            method: 'PUT',
            headers: getHeaders(),
            body: JSON.stringify(data),
        });

        const result = await response.json();
        
        if (!response.ok) {
            throw new Error(result.error || 'Failed to update methodology step');
        }

        return result.data;
    } catch (error) {
        console.error('Update Methodology Step Error:', error);
        throw error;
    }
};

// Toggle methodology step status (admin)
export const toggleMethodologyStatus = async (id: string, isActive: boolean): Promise<MethodologyStep> => {
    try {
        const response = await fetch(`${API_URL}/methodology/${id}/toggle-status`, {
            method: 'PUT',
            headers: getHeaders(),
            body: JSON.stringify({ isActive }),
        });

        const result = await response.json();
        
        if (!response.ok) {
            throw new Error(result.error || 'Failed to toggle methodology status');
        }

        return result.data;
    } catch (error) {
        console.error('Toggle Methodology Status Error:', error);
        throw error;
    }
};

// Delete methodology step (admin)
export const deleteMethodologyStep = async (id: string): Promise<void> => {
    try {
        const response = await fetch(`${API_URL}/methodology/${id}`, {
            method: 'DELETE',
            headers: getHeaders(),
        });

        const result = await response.json();
        
        if (!response.ok) {
            throw new Error(result.error || 'Failed to delete methodology step');
        }
    } catch (error) {
        console.error('Delete Methodology Step Error:', error);
        throw error;
    }
};