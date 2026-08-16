import { OutcomeData } from "@/types/admin/outcome";

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

// Get all outcomes (public)
export const getOutcomes = async (): Promise<OutcomeData[]> => {
    try {
        const response = await fetch(`${API_URL}/outcomes`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });

        const result = await response.json();
        
        if (!response.ok) {
            throw new Error(result.error || 'Failed to fetch outcomes');
        }

        return result.data;
    } catch (error) {
        console.error('Get Outcomes Error:', error);
        throw error;
    }
};

// Get single outcome (public)
export const getOutcomeById = async (id: string): Promise<OutcomeData> => {
    try {
        const response = await fetch(`${API_URL}/outcomes/${id}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });

        const result = await response.json();
        
        if (!response.ok) {
            throw new Error(result.error || 'Failed to fetch outcome');
        }

        return result.data;
    } catch (error) {
        console.error('Get Outcome By ID Error:', error);
        throw error;
    }
};

// Create outcome (admin)
export const createOutcome = async (data: OutcomeData): Promise<OutcomeData> => {
    try {
        const response = await fetch(`${API_URL}/outcomes`, {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify(data),
        });

        const result = await response.json();
        
        if (!response.ok) {
            throw new Error(result.error || 'Failed to create outcome');
        }

        return result.data;
    } catch (error) {
        console.error('Create Outcome Error:', error);
        throw error;
    }
};

// Update outcome (admin)
export const updateOutcome = async (id: string, data: OutcomeData): Promise<OutcomeData> => {
    try {
        const response = await fetch(`${API_URL}/outcomes/${id}`, {
            method: 'PUT',
            headers: getHeaders(),
            body: JSON.stringify(data),
        });

        const result = await response.json();
        
        if (!response.ok) {
            throw new Error(result.error || 'Failed to update outcome');
        }

        return result.data;
    } catch (error) {
        console.error('Update Outcome Error:', error);
        throw error;
    }
};

// Toggle outcome status (admin)
export const toggleOutcomeStatus = async (id: string, isActive: boolean): Promise<OutcomeData> => {
    try {
        const response = await fetch(`${API_URL}/outcomes/${id}/toggle-status`, {
            method: 'PUT',
            headers: getHeaders(),
            body: JSON.stringify({ isActive }),
        });

        const result = await response.json();
        
        if (!response.ok) {
            throw new Error(result.error || 'Failed to toggle outcome status');
        }

        return result.data;
    } catch (error) {
        console.error('Toggle Outcome Status Error:', error);
        throw error;
    }
};

// Delete outcome (admin)
export const deleteOutcome = async (id: string): Promise<void> => {
    try {
        const response = await fetch(`${API_URL}/outcomes/${id}`, {
            method: 'DELETE',
            headers: getHeaders(),
        });

        const result = await response.json();
        
        if (!response.ok) {
            throw new Error(result.error || 'Failed to delete outcome');
        }
    } catch (error) {
        console.error('Delete Outcome Error:', error);
        throw error;
    }
};