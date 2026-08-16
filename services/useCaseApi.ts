import { UseCaseData } from "@/types/admin/useCase";

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

// Get all use cases (public)
export const getUseCases = async (): Promise<UseCaseData[]> => {
    try {
        const response = await fetch(`${API_URL}/usecases`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });

        const result = await response.json();
        
        if (!response.ok) {
            throw new Error(result.error || 'Failed to fetch use cases');
        }

        return result.data;
    } catch (error) {
        console.error('Get Use Cases Error:', error);
        throw error;
    }
};

// Get single use case (public)
export const getUseCaseById = async (id: string): Promise<UseCaseData> => {
    try {
        const response = await fetch(`${API_URL}/usecases/${id}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });

        const result = await response.json();
        
        if (!response.ok) {
            throw new Error(result.error || 'Failed to fetch use case');
        }

        return result.data;
    } catch (error) {
        console.error('Get Use Case By ID Error:', error);
        throw error;
    }
};

// Create use case (admin)
export const createUseCase = async (data: UseCaseData): Promise<UseCaseData> => {
    try {
        const response = await fetch(`${API_URL}/usecases`, {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify(data),
        });

        const result = await response.json();
        
        if (!response.ok) {
            throw new Error(result.error || 'Failed to create use case');
        }

        return result.data;
    } catch (error) {
        console.error('Create Use Case Error:', error);
        throw error;
    }
};

// Update use case (admin)
export const updateUseCase = async (id: string, data: UseCaseData): Promise<UseCaseData> => {
    try {
        const response = await fetch(`${API_URL}/usecases/${id}`, {
            method: 'PUT',
            headers: getHeaders(),
            body: JSON.stringify(data),
        });

        const result = await response.json();
        
        if (!response.ok) {
            throw new Error(result.error || 'Failed to update use case');
        }

        return result.data;
    } catch (error) {
        console.error('Update Use Case Error:', error);
        throw error;
    }
};

// Toggle use case status (admin)
export const toggleUseCaseStatus = async (id: string, isActive: boolean): Promise<UseCaseData> => {
    try {
        const response = await fetch(`${API_URL}/usecases/${id}/toggle-status`, {
            method: 'PUT',
            headers: getHeaders(),
            body: JSON.stringify({ isActive }),
        });

        const result = await response.json();
        
        if (!response.ok) {
            throw new Error(result.error || 'Failed to toggle use case status');
        }

        return result.data;
    } catch (error) {
        console.error('Toggle Use Case Status Error:', error);
        throw error;
    }
};

// Delete use case (admin)
export const deleteUseCase = async (id: string): Promise<void> => {
    try {
        const response = await fetch(`${API_URL}/usecases/${id}`, {
            method: 'DELETE',
            headers: getHeaders(),
        });

        const result = await response.json();
        
        if (!response.ok) {
            throw new Error(result.error || 'Failed to delete use case');
        }
    } catch (error) {
        console.error('Delete Use Case Error:', error);
        throw error;
    }
};