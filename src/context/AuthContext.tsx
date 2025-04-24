import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'HR Manager' | 'Recruiter' | 'Admin';
  company: string;
  avatar?: string;
  permissions: string[];
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  error: string | null;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    const token = localStorage.getItem('auth_token');
    return !!token;
  });
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('auth_token', 'mock_token'); // In a real app, this would be a JWT token
    } else {
      localStorage.removeItem('user');
      localStorage.removeItem('auth_token');
    }
  }, [user]);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Accept any non-empty email and password
      if (!email || !password) {
        throw new Error('Email and password are required');
      }
      
      // Create a mock user with the provided email
      const mockUser = {
        id: '1',
        email: email,
        name: email.split('@')[0],
        role: 'Admin' as const,
        company: 'ProMatch',
        permissions: ['manage_users', 'manage_jobs', 'manage_candidates', 'view_analytics'],
        avatar: email.substring(0, 2).toUpperCase()
      };
      
      setUser(mockUser);
      setIsAuthenticated(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during login');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('auth_token');
  };

  const clearError = () => {
    setError(null);
  };

  return (
    <AuthContext.Provider 
      value={{ 
        isAuthenticated, 
        user, 
        login, 
        logout,
        isLoading,
        error,
        clearError
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// Custom hook for checking permissions
export function usePermission(permission: string) {
  const { user } = useAuth();
  return user?.permissions.includes(permission) ?? false;
} 