import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import Layout from './components/Layout';
import Home from './pages/Home';
import Cards from './pages/Cards';
import Recommendations from './pages/Recommendations';
import AIChat from './pages/AIChat';
import Auth from './pages/Auth';
import Profile from './pages/Profile';
import { AuthProvider, useAuth } from './contexts/AuthContext';

const queryClient = new QueryClient();

function AppRoutes() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 to-green-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500"></div>
      </div>
    );
  }

  if (!user) {
    return <Auth />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-green-50">
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cards" element={<Cards />} />
          <Route path="/recommendations" element={<Recommendations />} />
          <Route path="/ai-chat" element={<AIChat />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
      <Toaster />
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <AppRoutes />
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
}
