import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import backend from '~backend/client';

interface User {
  userId: string;
  email: string;
  name?: string;
  authProvider: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name?: string) => Promise<void>;
  logout: () => void;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for stored token on app load
    const storedToken = localStorage.getItem('auth_token');
    if (storedToken) {
      verifyToken(storedToken);
    } else {
      setLoading(false);
    }
  }, []);

  const verifyToken = async (authToken: string) => {
    try {
      const response = await backend.auth.verifyToken({
        authorization: `Bearer ${authToken}`
      });
      setUser(response.user);
      setToken(authToken);
    } catch (error) {
      // Token is invalid, remove it
      localStorage.removeItem('auth_token');
      setUser(null);
      setToken(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    const response = await backend.auth.login({ email, password });
    setUser(response.user);
    setToken(response.token);
    localStorage.setItem('auth_token', response.token);
  };

  const register = async (email: string, password: string, name?: string) => {
    const response = await backend.auth.register({ email, password, name });
    setUser(response.user);
    setToken(response.token);
    localStorage.setItem('auth_token', response.token);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('auth_token');
  };

  const value = {
    user,
    token,
    loading,
    login,
    register,
    logout,
    setUser,
    setToken
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
