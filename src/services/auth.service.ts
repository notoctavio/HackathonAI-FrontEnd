import axios from 'axios';

const API_URL = 'http://localhost:8080/api/auth/';

export interface SignupRequest {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    company: string;
    phoneNumber: string;
    confirmPassword: string;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface AuthResponse {
    token: string;
    type: string;
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
    company: string;
    phoneNumber: string;
}

// Clear any invalid auth data on startup
localStorage.removeItem('user');

class AuthService {
    async signup(data: SignupRequest) {
        try {
            console.log('Sending signup request');
            const response = await axios.post(API_URL + 'signup', data);
            return response.data;
        } catch (error: any) {
            if (error.response && error.response.data && error.response.data.message) {
                throw new Error(error.response.data.message);
            }
            throw new Error('Registration failed');
        }
    }

    async login(data: LoginRequest) {
        try {
            console.log('Sending login request');
            const response = await axios.post(API_URL + 'login', data);
            
            if (!response.data || !response.data.token) {
                throw new Error('Invalid response from server');
            }
            
            // Store the user data exactly as received from backend
            localStorage.setItem('user', JSON.stringify(response.data));
            
            return response.data;
        } catch (error: any) {
            console.error('Login error:', error);
            if (error.response && error.response.data && error.response.data.message) {
                throw new Error(error.response.data.message);
            }
            throw new Error('Login failed');
        }
    }

    logout() {
        localStorage.removeItem('user');
        window.location.href = '/login';
    }

    getCurrentUser(): AuthResponse | null {
        try {
            const userStr = localStorage.getItem('user');
            if (!userStr) return null;
            
            return JSON.parse(userStr);
        } catch (e) {
            localStorage.removeItem('user');
            return null;
        }
    }
}

export default new AuthService(); 