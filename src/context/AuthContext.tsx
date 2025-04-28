import React, { createContext, useContext, useState, useEffect } from 'react';
import authService, { AuthResponse } from '../services/auth.service';

interface AuthContextType {
    currentUser: AuthResponse | null;
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<void>;
    signup: (firstName: string, lastName: string, email: string, password: string, company: string, phoneNumber: string, confirmPassword: string) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [currentUser, setCurrentUser] = useState<AuthResponse | null>(null);

    useEffect(() => {
        const user = authService.getCurrentUser();
        if (user) {
            setCurrentUser(user);
        }
    }, []);

    const login = async (email: string, password: string) => {
        try {
            console.log('AuthContext: Attempting to login with email:', email);
            const response = await authService.login({ email, password });
            console.log('AuthContext: Login successful:', response);
            setCurrentUser(response);
        } catch (error) {
            console.error('AuthContext: Login error:', error);
            throw error;
        }
    };

    const signup = async (firstName: string, lastName: string, email: string, password: string, company: string, phoneNumber: string, confirmPassword: string) => {
        try {
            console.log('AuthContext: Attempting to signup with email:', email);
            await authService.signup({ firstName, lastName, email, password, company, phoneNumber, confirmPassword });
            console.log('AuthContext: Signup successful');
        } catch (error) {
            console.error('AuthContext: Signup error:', error);
            throw error;
        }
    };

    const logout = () => {
        authService.logout();
        setCurrentUser(null);
    };

    const value = {
        currentUser,
        isAuthenticated: !!currentUser,
        login,
        signup,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}; 