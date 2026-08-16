import { SolutionData } from "@/types/admin/solution";

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

// Get all solutions (public)
export const getSolutions = async (): Promise<SolutionData[]> => {
    try {
        const response = await fetch(`${API_URL}/solutions`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });

        const result = await response.json();
        
        if (!response.ok) {
            throw new Error(result.error || 'Failed to fetch solutions');
        }

        return result.data;
    } catch (error) {
        console.error('Get Solutions Error:', error);
        throw error;
    }
};

// Get single solution (public)
export const getSolutionById = async (id: string): Promise<SolutionData> => {
    try {
        const response = await fetch(`${API_URL}/solutions/${id}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });

        const result = await response.json();
        
        if (!response.ok) {
            throw new Error(result.error || 'Failed to fetch solution');
        }

        return result.data;
    } catch (error) {
        console.error('Get Solution By ID Error:', error);
        throw error;
    }
};

// Create solution (admin)
export const createSolution = async (data: SolutionData): Promise<SolutionData> => {
    try {
        const response = await fetch(`${API_URL}/solutions`, {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify(data),
        });

        const result = await response.json();
        
        if (!response.ok) {
            throw new Error(result.error || 'Failed to create solution');
        }

        return result.data;
    } catch (error) {
        console.error('Create Solution Error:', error);
        throw error;
    }
};

// Update solution (admin)
export const updateSolution = async (id: string, data: SolutionData): Promise<SolutionData> => {
    try {
        const response = await fetch(`${API_URL}/solutions/${id}`, {
            method: 'PUT',
            headers: getHeaders(),
            body: JSON.stringify(data),
        });

        const result = await response.json();
        
        if (!response.ok) {
            throw new Error(result.error || 'Failed to update solution');
        }

        return result.data;
    } catch (error) {
        console.error('Update Solution Error:', error);
        throw error;
    }
};

// Toggle solution status (admin)
export const toggleSolutionStatus = async (id: string, isActive: boolean): Promise<SolutionData> => {
    try {
        const response = await fetch(`${API_URL}/solutions/${id}/toggle-status`, {
            method: 'PUT',
            headers: getHeaders(),
            body: JSON.stringify({ isActive }),
        });

        const result = await response.json();
        
        if (!response.ok) {
            throw new Error(result.error || 'Failed to toggle solution status');
        }

        return result.data;
    } catch (error) {
        console.error('Toggle Solution Status Error:', error);
        throw error;
    }
};

// Delete solution (admin)
export const deleteSolution = async (id: string): Promise<void> => {
    try {
        const response = await fetch(`${API_URL}/solutions/${id}`, {
            method: 'DELETE',
            headers: getHeaders(),
        });

        const result = await response.json();
        
        if (!response.ok) {
            throw new Error(result.error || 'Failed to delete solution');
        }
    } catch (error) {
        console.error('Delete Solution Error:', error);
        throw error;
    }
};