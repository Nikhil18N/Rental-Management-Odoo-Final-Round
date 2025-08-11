import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { 
  Package, 
  Calendar, 
  Users, 
  CreditCard, 
  TruckIcon as Truck,
  BarChart3,
  Settings,
  Home,
  FileText,
  Bell
} from "lucide-react";

interface SidebarProps {
  className?: string;
}

const navigation = [
  { name: "Dashboard", icon: Home, current: true },
  { name: "Products", icon: Package, current: false },
  { name: "Bookings", icon: Calendar, current: false },
  { name: "Customers", icon: Users, current: false },
  { name: "Orders", icon: FileText, current: false },
  { name: "Deliveries", icon: Truck, current: false },
  { name: "Payments", icon: CreditCard, current: false },
  { name: "Reports", icon: BarChart3, current: false },
  { name: "Notifications", icon: Bell, current: false },
  { name: "Settings", icon: Settings, current: false },
];

export function Sidebar({ className }: SidebarProps) {
  return (
    <div className={cn("flex h-full w-64 flex-col bg-card border-r border-border", className)}>
      {/* Logo */}
      <div className="flex h-16 items-center px-6 border-b border-border">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
            <Package className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold text-foreground">RentVista</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3 py-4">
        {navigation.map((item) => {
          const Icon = item.icon;
          return (
            <Button
              key={item.name}
              variant={item.current ? "default" : "ghost"}
              className={cn(
                "w-full justify-start h-10 px-3",
                item.current 
                  ? "bg-gradient-primary text-primary-foreground shadow-soft" 
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              )}
            >
              <Icon className="w-4 h-4 mr-3" />
              {item.name}
            </Button>
          );
        })}
      </nav>

      {/* User Profile */}
      <div className="border-t border-border p-4">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-accent rounded-full flex items-center justify-center">
            <span className="text-sm font-medium text-accent-foreground">AD</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground truncate">Admin User</p>
            <p className="text-xs text-muted-foreground truncate">admin@rentvista.com</p>
          </div>
        </div>
      </div>
    </div>
  );
}