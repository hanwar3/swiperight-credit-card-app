import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import backend from '~backend/client';
import type { User } from '~backend/auth/register';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, firstName?: string, lastName?: string) => Promise<void>;
  loginWithOAuth: (provider: 'google' | 'apple', data: any) => Promise<void>;
  logout: () => void;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (token: string, newPassword: string) => Promise<void>;
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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing token on app load
    const token = localStorage.getItem('auth_token');
    if (token) {
      verifyToken(token);
    } else {
      setIsLoading(false);
    }
  }, []);

  const verifyToken = async (token: string) => {
    try {
      const response = await backend.auth.verifyToken({ token });
      setUser(response.user);
      localStorage.setItem('auth_token', token);
    } catch (error) {
      localStorage.removeItem('auth_token');
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await backend.auth.login({ email, password });
      setUser(response.user);
      localStorage.setItem('auth_token', response.token);
    } catch (error: any) {
      throw new Error(error.message || 'Login failed');
    }
  };

  const register = async (email: string, password: string, firstName?: string, lastName?: string) => {
    try {
      const response = await backend.auth.register({ email, password, firstName, lastName });
      setUser(response.user);
      localStorage.setItem('auth_token', response.token);
    } catch (error: any) {
      throw new Error(error.message || 'Registration failed');
    }
  };

  const loginWithOAuth = async (provider: 'google' | 'apple', data: any) => {
    try {
      const response = await backend.auth.oauth({
        provider,
        accessToken: data.accessToken,
        email: data.email,
        providerId: data.id,
        firstName: data.firstName,
        lastName: data.lastName,
        profilePictureUrl: data.profilePictureUrl,
      });
      setUser(response.user);
      localStorage.setItem('auth_token', response.token);
    } catch (error: any) {
      throw new Error(error.message || 'OAuth login failed');
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('auth_token');
  };

  const forgotPassword = async (email: string) => {
    try {
      await backend.auth.forgotPassword({ email });
    } catch (error: any) {
      throw new Error(error.message || 'Failed to send reset email');
    }
  };

  const resetPassword = async (token: string, newPassword: string) => {
    try {
      await backend.auth.resetPassword({ token, newPassword });
    } catch (error: any) {
      throw new Error(error.message || 'Failed to reset password');
    }
  };

  const value = {
    user,
    isLoading,
    login,
    register,
    loginWithOAuth,
    logout,
    forgotPassword,
    resetPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
