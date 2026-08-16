import { ServiceData } from "@/types/admin/service";

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

// Get all services
export const getServices = async (): Promise<ServiceData[]> => {
    try {
        const response = await fetch(`${API_URL}/services`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });

        const result = await response.json();
        
        if (!response.ok) {
            throw new Error(result.error || 'Failed to fetch services');
        }

        return result.data;
    } catch (error) {
        console.error('Get Services Error:', error);
        throw error;
    }
};

// Get single service by ID
export const getServiceById = async (id: string): Promise<ServiceData> => {
    try {
        const response = await fetch(`${API_URL}/services/${id}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });

        const result = await response.json();
        
        if (!response.ok) {
            throw new Error(result.error || 'Failed to fetch service');
        }

        return result.data;
    } catch (error) {
        console.error('Get Service By ID Error:', error);
        throw error;
    }
};

// Create service
export const createService = async (data: ServiceData): Promise<ServiceData> => {
    try {
        console.log('📤 Creating service...');
        const response = await fetch(`${API_URL}/services`, {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify(data),
        });

        const result = await response.json();
        
        if (!response.ok) {
            console.error('❌ Create failed:', result);
            throw new Error(result.error || 'Failed to create service');
        }

        console.log('✅ Service created successfully');
        return result.data;
    } catch (error) {
        console.error('Create Service Error:', error);
        throw error;
    }
};

// Update service
export const updateService = async (id: string, data: ServiceData): Promise<ServiceData> => {
    try {
        console.log('📤 Updating service...');
        const response = await fetch(`${API_URL}/services/${id}`, {
            method: 'PUT',
            headers: getHeaders(),
            body: JSON.stringify(data),
        });

        const result = await response.json();
        
        if (!response.ok) {
            console.error('❌ Update failed:', result);
            throw new Error(result.error || 'Failed to update service');
        }

        console.log('✅ Service updated successfully');
        return result.data;
    } catch (error) {
        console.error('Update Service Error:', error);
        throw error;
    }
};

// Toggle service status
export const toggleServiceStatus = async (id: string, isActive: boolean): Promise<ServiceData> => {
    try {
        const response = await fetch(`${API_URL}/services/${id}/toggle-status`, {
            method: 'PUT',
            headers: getHeaders(),
            body: JSON.stringify({ isActive }),
        });

        const result = await response.json();
        
        if (!response.ok) {
            throw new Error(result.error || 'Failed to toggle service status');
        }

        return result.data;
    } catch (error) {
        console.error('Toggle Service Status Error:', error);
        throw error;
    }
};

// Delete service
export const deleteService = async (id: string): Promise<void> => {
    try {
        const response = await fetch(`${API_URL}/services/${id}`, {
            method: 'DELETE',
            headers: getHeaders(),
        });

        const result = await response.json();
        
        if (!response.ok) {
            throw new Error(result.error || 'Failed to delete service');
        }
    } catch (error) {
        console.error('Delete Service Error:', error);
        throw error;
    }
};