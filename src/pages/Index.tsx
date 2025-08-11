import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import { DashboardContent } from "@/components/DashboardContent";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="flex h-screen">
        {/* Sidebar */}
        <Sidebar />
        
        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />
          <main className="flex-1 overflow-y-auto">
            <DashboardContent />
          </main>
        </div>
      </div>
    </div>
  );
};

export default Index;
