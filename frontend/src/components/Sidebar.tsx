import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";
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
  { name: "Dashboard", icon: Home, href: "/" },
  { name: "Products", icon: Package, href: "/products" },
  { name: "Bookings", icon: Calendar, href: "/bookings" },
  { name: "Customers", icon: Users, href: "/customers" },
  { name: "Orders", icon: FileText, href: "#" },
  { name: "Deliveries", icon: Truck, href: "#" },
  { name: "Payments", icon: CreditCard, href: "#" },
  { name: "Reports", icon: BarChart3, href: "#" },
  { name: "Notifications", icon: Bell, href: "#" },
  { name: "Settings", icon: Settings, href: "#" },
];

export function Sidebar({ className }: SidebarProps) {
  const location = useLocation();
  
  return (
    <div className={cn("flex h-full w-64 flex-col bg-gradient-sidebar border-r border-border/60 backdrop-blur-sm", className)}>
      {/* Logo */}
      <div className="flex h-16 items-center px-6 border-b border-border/60">
        <div className="flex items-center space-x-3 animate-fade-in">
          <div className="w-9 h-9 bg-gradient-primary rounded-xl flex items-center justify-center shadow-soft hover-glow transition-elegant">
            <Package className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold text-foreground tracking-tight">RentVista</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3 py-6">
        {navigation.map((item, index) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.href;
          
          return (
            <Link key={item.name} to={item.href}>
              <Button
                variant={isActive ? "default" : "ghost"}
                className={cn(
                  "w-full justify-start h-11 px-4 font-medium rounded-xl transition-elegant animate-fade-in",
                  isActive 
                    ? "bg-gradient-primary text-primary-foreground shadow-elegant hover:shadow-floating" 
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/80 hover-lift"
                )}
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <Icon className="w-4 h-4 mr-3" />
                {item.name}
              </Button>
            </Link>
          );
        })}
      </nav>

      {/* User Profile */}
      <div className="border-t border-border/60 p-4 bg-card/50 backdrop-blur-sm">
        <div className="flex items-center space-x-3 p-3 rounded-xl bg-secondary/50 hover:bg-secondary/80 transition-elegant hover-lift cursor-pointer">
          <div className="w-10 h-10 bg-gradient-accent rounded-full flex items-center justify-center shadow-soft">
            <span className="text-sm font-semibold text-accent-foreground">AD</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-foreground truncate">Admin User</p>
            <p className="text-xs text-muted-foreground truncate">admin@rentvista.com</p>
          </div>
        </div>
      </div>
    </div>
  );
}