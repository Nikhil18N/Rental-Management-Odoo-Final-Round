import { Layout } from '@/components/Layout';
import { DashboardContent } from '@/components/DashboardContent';
import LoginInfo from '@/components/LoginInfo';

export default function Index() {
  // Check if user is logged in
  const token = localStorage.getItem('auth_token');
  
  if (!token) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoginInfo />
      </div>
    );
  }
  
  return (
    <Layout>
      <DashboardContent />
    </Layout>
  );
}
