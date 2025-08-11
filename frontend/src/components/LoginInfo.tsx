import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { User, Mail, Lock } from 'lucide-react';

export default function LoginInfo() {
  const testUsers = [
    {
      role: 'Admin',
      email: 'admin@rentease.com',
      password: 'admin123',
      color: 'bg-red-100 text-red-800'
    },
    {
      role: 'Manager', 
      email: 'manager@rentease.com',
      password: 'manager123',
      color: 'bg-blue-100 text-blue-800'
    },
    {
      role: 'Customer',
      email: 'customer1@example.com',
      password: 'customer123', 
      color: 'bg-green-100 text-green-800'
    }
  ];

  return (
    <Card className="max-w-md mx-auto mt-4">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="w-5 h-5" />
          Test Login Credentials
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {testUsers.map((user, index) => (
          <div key={index} className="p-3 border rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <Badge className={user.color}>
                {user.role}
              </Badge>
            </div>
            <div className="space-y-1 text-sm">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-gray-500" />
                <span className="font-mono">{user.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-gray-500" />
                <span className="font-mono">{user.password}</span>
              </div>
            </div>
          </div>
        ))}
        <div className="text-xs text-gray-500 mt-4">
          Use any of these credentials to test the application. The dashboard is currently using mock data.
        </div>
      </CardContent>
    </Card>
  );
}
