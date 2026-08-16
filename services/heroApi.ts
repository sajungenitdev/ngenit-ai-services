import { HeroData } from "@/types/admin/hero";

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// Helper to get auth token
const getAuthToken = (): string => {
    // Check localStorage first
    const token = localStorage.getItem('admin_token');
    if (token) return token;

    // Check cookies as fallback
    const cookies = document.cookie.split('; ');
    const tokenCookie = cookies.find(row => row.startsWith('admin_token='));
    if (tokenCookie) {
        return tokenCookie.split('=')[1];
    }

    return '';
};

// Helper to get headers with auth
const getHeaders = (): HeadersInit => {
    const token = getAuthToken();
    console.log('🔑 Auth Token:', token ? '✅ Present' : '❌ Missing');
    return {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
    };
};

// Get Hero Banner (Public - no auth needed)
export const getHeroBanner = async (): Promise<HeroData> => {
    try {
        const response = await fetch(`${API_URL}/hero`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.error || 'Failed to fetch hero banner');
        }

        return result.data;
    } catch (error) {
        console.error('Get Hero Banner Error:', error);
        throw error;
    }
};

// Create Hero Banner (Admin only)
export const createHeroBanner = async (data: HeroData): Promise<HeroData> => {
    try {
        console.log('📤 Creating hero banner...');
        const response = await fetch(`${API_URL}/hero`, {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify(data),
        });

        const result = await response.json();

        if (!response.ok) {
            console.error('❌ Create failed:', result);
            throw new Error(result.error || 'Failed to create hero banner');
        }

        console.log('✅ Hero banner created successfully');
        return result.data;
    } catch (error) {
        console.error('Create Hero Banner Error:', error);
        throw error;
    }
};

// Update Hero Banner (Admin only)
export const updateHeroBanner = async (data: HeroData): Promise<HeroData> => {
    try {
        console.log('📤 Updating hero banner...');
        const response = await fetch(`${API_URL}/hero`, {
            method: 'PUT',
            headers: getHeaders(),
            body: JSON.stringify(data),
        });

        const result = await response.json();

        if (!response.ok) {
            console.error('❌ Update failed:', result);
            throw new Error(result.error || 'Failed to update hero banner');
        }

        console.log('✅ Hero banner updated successfully');
        return result.data;
    } catch (error) {
        console.error('Update Hero Banner Error:', error);
        throw error;
    }
};

// Toggle Hero Banner Status
export const toggleHeroStatus = async (isActive: boolean): Promise<HeroData> => {
    try {
        const response = await fetch(`${API_URL}/hero/toggle-status`, {
            method: 'PUT',
            headers: getHeaders(),
            body: JSON.stringify({ isActive }),
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.error || 'Failed to toggle hero status');
        }

        return result.data;
    } catch (error) {
        console.error('Toggle Hero Status Error:', error);
        throw error;
    }
};

// Reset Hero Banner
export const resetHeroBanner = async (): Promise<HeroData> => {
    try {
        const response = await fetch(`${API_URL}/hero/reset`, {
            method: 'POST',
            headers: getHeaders(),
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.error || 'Failed to reset hero banner');
        }

        return result.data;
    } catch (error) {
        console.error('Reset Hero Banner Error:', error);
        throw error;
    }
};

// Delete Hero Banner
export const deleteHeroBanner = async (): Promise<void> => {
    try {
        const response = await fetch(`${API_URL}/hero`, {
            method: 'DELETE',
            headers: getHeaders(),
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.error || 'Failed to delete hero banner');
        }
    } catch (error) {
        console.error('Delete Hero Banner Error:', error);
        throw error;
    }
};