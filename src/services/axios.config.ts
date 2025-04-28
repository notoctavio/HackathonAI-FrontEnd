import axios from 'axios';
import authService from './auth.service';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosInstance.interceptors.request.use(
    (config) => {
        const user = authService.getCurrentUser();
        if (user && user.token) {
            config.headers = config.headers || {};
            config.headers.Authorization = `Bearer ${user.token}`;
        }
        return config;
    },
    (error) => {
        console.error('Request error:', error);
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            const { status } = error.response;
            
            // Handle authentication errors
            if (status === 401 || status === 403) {
                console.warn('Authentication error:', error.response.data);
                authService.logout();
                
                // Don't redirect if already on login page to avoid redirect loops
                if (!window.location.href.includes('/login')) {
                    window.location.href = '/login';
                }
            }
            
            // Log server errors
            if (status >= 500) {
                console.error('Server error:', error.response.data);
            }
        } else if (error.request) {
            // The request was made but no response was received
            console.error('Network error - no response received:', error.request);
        } else {
            // Something happened in setting up the request
            console.error('Request setup error:', error.message);
        }
        
        return Promise.reject(error);
    }
);

export default axiosInstance; 