import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import Layout from './components/Layout';
import Home from './pages/Home';
import Cards from './pages/Cards';
import Recommendations from './pages/Recommendations';
import AIChat from './pages/AIChat';

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-teal-50 to-green-50">
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/cards" element={<Cards />} />
              <Route path="/recommendations" element={<Recommendations />} />
              <Route path="/ai-chat" element={<AIChat />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Layout>
          <Toaster />
        </div>
      </Router>
    </QueryClientProvider>
  );
}
