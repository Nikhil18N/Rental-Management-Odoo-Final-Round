import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Eye, EyeOff, LogIn, Mail, Lock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface LoginPageProps {
  onLogin: (token: string, user: any) => void;
}

export default function LoginPage({ onLogin }: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const testUsers = [
    { role: 'Admin', email: 'admin@rentease.com', password: 'admin123', color: 'bg-red-100 text-red-800' },
    { role: 'Manager', email: 'manager@rentease.com', password: 'manager123', color: 'bg-blue-100 text-blue-800' },
    { role: 'Customer', email: 'customer1@example.com', password: 'customer123', color: 'bg-green-100 text-green-800' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // For hackathon - simulate API call
      const user = testUsers.find(u => u.email === email && u.password === password);
      
      if (user) {
        // Simulate successful login
        const mockToken = `hackathon_token_${Date.now()}`;
        localStorage.setItem('auth_token', mockToken);
        localStorage.setItem('user_data', JSON.stringify(user));
        onLogin(mockToken, user);
      } else {
        setError('Invalid credentials. Use test credentials below.');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const quickLogin = (user: any) => {
    setEmail(user.email);
    setPassword(user.password);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Main Login Card */}
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center flex items-center justify-center gap-2">
              <LogIn className="w-6 h-6" />
              RentEase Login
            </CardTitle>
            <p className="text-sm text-gray-600 text-center">
              Enter your credentials to access the dashboard
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 h-4 w-4 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff /> : <Eye />}
                  </button>
                </div>
              </div>

              {error && (
                <Alert className="border-red-200 bg-red-50">
                  <AlertDescription className="text-red-800">
                    {error}
                  </AlertDescription>
                </Alert>
              )}

              <Button 
                type="submit" 
                className="w-full" 
                disabled={loading}
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Test Credentials Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">🚀 Hackathon Test Credentials</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {testUsers.map((user, index) => (
              <div key={index} className="p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <Badge className={user.color}>
                    {user.role}
                  </Badge>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => quickLogin(user)}
                  >
                    Quick Login
                  </Button>
                </div>
                <div className="space-y-1 text-sm">
                  <div className="font-mono text-xs">{user.email}</div>
                  <div className="font-mono text-xs text-gray-500">{user.password}</div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
