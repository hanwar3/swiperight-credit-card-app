import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '../contexts/AuthContext';
import { User, Mail, Calendar, LogOut, Shield } from 'lucide-react';

export default function Profile() {
  const { user, logout } = useAuth();

  if (!user) {
    return null;
  }

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
        <p className="text-gray-600">Manage your account settings and preferences</p>
      </div>

      {/* Profile Card */}
      <Card className="border-0 bg-gradient-to-r from-teal-50 to-green-50">
        <CardHeader className="pb-4">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gradient-to-r from-teal-500 to-green-500 rounded-full flex items-center justify-center">
              <User className="h-8 w-8 text-white" />
            </div>
            <div className="flex-1">
              <CardTitle className="text-xl text-gray-900">
                Welcome, {user.name || 'User'}!
              </CardTitle>
              <p className="text-gray-600">
                You're all set to optimize your credit card rewards
              </p>
            </div>
            <Badge 
              variant="secondary" 
              className="bg-teal-100 text-teal-700 border-teal-200"
            >
              {user.authProvider === 'email' ? 'Email Account' : 
               user.authProvider === 'google' ? 'Google Account' : 
               user.authProvider === 'apple' ? 'Apple Account' : 'Account'}
            </Badge>
          </div>
        </CardHeader>
      </Card>

      {/* Account Information */}
      <Card className="border-0 bg-white shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="h-5 w-5 text-teal-600" />
            <span>Account Information</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Mail className="h-4 w-4" />
                <span>Email Address</span>
              </div>
              <p className="font-medium text-gray-900">{user.email}</p>
            </div>
            
            {user.name && (
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <User className="h-4 w-4" />
                  <span>Full Name</span>
                </div>
                <p className="font-medium text-gray-900">{user.name}</p>
              </div>
            )}
            
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Calendar className="h-4 w-4" />
                <span>Account Type</span>
              </div>
              <p className="font-medium text-gray-900">
                {user.authProvider === 'email' ? 'Email & Password' : 
                 user.authProvider === 'google' ? 'Google OAuth' : 
                 user.authProvider === 'apple' ? 'Apple OAuth' : 'Unknown'}
              </p>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Shield className="h-4 w-4" />
                <span>User ID</span>
              </div>
              <p className="font-mono text-sm text-gray-900">{user.userId}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-0 bg-white shadow-sm">
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-teal-600">50+</div>
            <div className="text-sm text-gray-600">Credit Cards Available</div>
          </CardContent>
        </Card>
        
        <Card className="border-0 bg-white shadow-sm">
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-green-600">5%</div>
            <div className="text-sm text-gray-600">Max Cashback Rate</div>
          </CardContent>
        </Card>
        
        <Card className="border-0 bg-white shadow-sm">
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-teal-600">24/7</div>
            <div className="text-sm text-gray-600">AI Support</div>
          </CardContent>
        </Card>
      </div>

      {/* Actions */}
      <Card className="border-0 bg-white shadow-sm">
        <CardHeader>
          <CardTitle>Account Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              onClick={handleLogout}
              variant="outline"
              className="flex items-center space-x-2 border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300"
            >
              <LogOut className="h-4 w-4" />
              <span>Sign Out</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
