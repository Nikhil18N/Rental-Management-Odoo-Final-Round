import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatsCard } from "./StatsCard";
import { 
  DollarSign, 
  Package, 
  Users, 
  Calendar,
  ArrowRight,
  Clock,
  AlertTriangle,
  CheckCircle
} from "lucide-react";

export function DashboardContent() {
  const stats = [
    {
      title: "Total Revenue",
      value: "₹2,45,890",
      change: "+12.5% from last month",
      changeType: "positive" as const,
      icon: DollarSign,
    },
    {
      title: "Active Rentals",
      value: "347",
      change: "+23 from yesterday",
      changeType: "positive" as const,
      icon: Package,
    },
    {
      title: "Total Customers",
      value: "1,249",
      change: "+18.2% from last month",
      changeType: "positive" as const,
      icon: Users,
    },
    {
      title: "Pending Returns",
      value: "12",
      change: "3 overdue (Late fees applicable)",
      changeType: "negative" as const,
      icon: Calendar,
    },
  ];

  const recentOrders = [
    { 
      id: "RNT-001", 
      customer: "Rajesh Kumar", 
      product: "Camera Equipment Set", 
      status: "pickup_scheduled", 
      amount: "₹15,000",
      duration: "3 days",
      pickupDate: "2025-08-12"
    },
    { 
      id: "RNT-002", 
      customer: "Priya Sharma", 
      product: "Wedding Decoration", 
      status: "quotation", 
      amount: "₹25,000",
      duration: "1 week",
      pickupDate: "2025-08-15"
    },
    { 
      id: "RNT-003", 
      customer: "Arjun Singh", 
      product: "Sound System", 
      status: "returned", 
      amount: "₹8,500",
      duration: "2 days",
      pickupDate: "2025-08-08"
    },
    { 
      id: "RNT-004", 
      customer: "Meera Gupta", 
      product: "Furniture Set", 
      status: "overdue", 
      amount: "₹12,000",
      duration: "5 days",
      pickupDate: "2025-08-05"
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pickup_scheduled":
        return <Calendar className="w-4 h-4 text-primary" />;
      case "quotation":
        return <Clock className="w-4 h-4 text-warning" />;
      case "returned":
        return <CheckCircle className="w-4 h-4 text-success" />;
      case "overdue":
        return <AlertTriangle className="w-4 h-4 text-destructive" />;
      case "active":
        return <Package className="w-4 h-4 text-primary" />;
      default:
        return <AlertTriangle className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pickup_scheduled":
        return "Pickup Scheduled";
      case "quotation":
        return "Quotation";
      case "returned":
        return "Returned";
      case "overdue":
        return "Overdue";
      case "active":
        return "Active Rental";
      default:
        return status;
    }
  };

  return (
    <div className="flex-1 space-y-8 p-6 bg-gradient-to-br from-background via-muted/20 to-background">
      {/* Welcome Header */}
      <div className="animate-fade-in">
        <h1 className="text-3xl font-black text-foreground mb-2 tracking-tight">Welcome back, Admin</h1>
        <p className="text-muted-foreground font-medium">Here's what's happening with your rental business today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <StatsCard 
            key={index} 
            {...stat} 
            className="animate-fade-in"
            style={{ animationDelay: `${index * 0.1}s` } as React.CSSProperties}
          />
        ))}
      </div>

      {/* Content Grid */}
      <div className="grid gap-8 lg:grid-cols-3">
        {/* Recent Orders */}
        <Card className="lg:col-span-2 shadow-elegant hover:shadow-floating transition-elegant animate-slide-up">
          <CardHeader className="flex flex-row items-center justify-between border-b border-border/60">
            <CardTitle className="text-xl font-bold text-foreground">Recent Orders</CardTitle>
            <Button variant="outline" size="sm" className="hover-lift transition-elegant">
              View All
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              {recentOrders.map((order, index) => (
                <div 
                  key={order.id} 
                  className="flex items-center justify-between p-5 bg-secondary/30 backdrop-blur-sm rounded-xl border border-border/40 hover:bg-secondary/50 hover:border-border/60 transition-elegant hover-lift animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center space-x-3">
                      <span className="font-bold text-foreground">{order.id}</span>
                      {getStatusIcon(order.status)}
                      <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full font-medium">
                        {getStatusBadge(order.status)}
                      </span>
                    </div>
                    <p className="text-sm font-medium text-muted-foreground">{order.customer}</p>
                    <p className="text-sm font-semibold text-foreground">{order.product}</p>
                    <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                      <span>Duration: {order.duration}</span>
                      <span>•</span>
                      <span>Pickup: {order.pickupDate}</span>
                    </div>
                  </div>
                  <div className="text-right space-y-1">
                    <p className="font-black text-lg text-foreground">{order.amount}</p>
                    <Button variant="outline" size="sm" className="text-xs">
                      View Details
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="shadow-elegant hover:shadow-floating transition-elegant animate-slide-up">
          <CardHeader className="border-b border-border/60">
            <CardTitle className="text-xl font-bold text-foreground">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <Button className="w-full justify-start h-12 bg-gradient-primary hover:shadow-elegant transition-elegant hover-lift font-semibold">
              <Package className="w-5 h-5 mr-3" />
              Create Rental Quotation
            </Button>
            <Button variant="outline" className="w-full justify-start h-12 hover-lift transition-elegant font-semibold border-border/60">
              <Calendar className="w-5 h-5 mr-3" />
              Schedule Pickup/Return
            </Button>
            <Button variant="outline" className="w-full justify-start h-12 hover-lift transition-elegant font-semibold border-border/60">
              <Users className="w-5 h-5 mr-3" />
              Register Customer
            </Button>
            <Button variant="outline" className="w-full justify-start h-12 hover-lift transition-elegant font-semibold border-border/60">
              <DollarSign className="w-5 h-5 mr-3" />
              Process Payment
            </Button>
            <Button variant="outline" className="w-full justify-start h-12 hover-lift transition-elegant font-semibold border-border/60">
              <AlertTriangle className="w-5 h-5 mr-3" />
              Handle Overdue Returns
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Additional Insights */}
      <div className="grid gap-8 md:grid-cols-2">
        <Card className="shadow-elegant hover:shadow-floating transition-elegant animate-slide-up">
          <CardHeader className="border-b border-border/60">
            <CardTitle className="text-xl font-bold text-foreground">Popular Products</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-5">
              {[
                { name: "Wedding Decoration Sets", rentals: 45, revenue: "₹67,500", trend: "+15%" },
                { name: "Camera Equipment", rentals: 32, revenue: "₹48,000", trend: "+8%" },
                { name: "Sound Systems", rentals: 28, revenue: "₹35,600", trend: "+12%" },
                { name: "Furniture Sets", rentals: 19, revenue: "₹28,500", trend: "+5%" },
              ].map((product, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-secondary/30 rounded-xl hover:bg-secondary/50 transition-elegant hover-lift animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="space-y-1">
                    <p className="font-bold text-foreground">{product.name}</p>
                    <p className="text-sm text-muted-foreground font-medium">{product.rentals} rentals</p>
                  </div>
                  <div className="text-right">
                    <p className="font-black text-foreground">{product.revenue}</p>
                    <p className="text-sm text-success font-semibold">{product.trend}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-elegant hover:shadow-floating transition-elegant animate-slide-up">
          <CardHeader className="border-b border-border/60">
            <CardTitle className="text-xl font-bold text-foreground">System Alerts</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-5">
              <div className="flex items-start space-x-4 p-4 bg-warning/10 rounded-xl border border-warning/30 hover:bg-warning/20 transition-elegant hover-lift animate-fade-in">
                <div className="w-10 h-10 bg-warning/20 rounded-xl flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-warning" />
                </div>
                <div className="flex-1">
                  <p className="font-bold text-foreground">3 Overdue Returns</p>
                  <p className="text-sm text-muted-foreground font-medium">Items not returned on scheduled date</p>
                </div>
              </div>
              <div className="flex items-start space-x-4 p-4 bg-success/10 rounded-xl border border-success/30 hover:bg-success/20 transition-elegant hover-lift animate-fade-in" style={{ animationDelay: '0.1s' }}>
                <div className="w-10 h-10 bg-success/20 rounded-xl flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-success" />
                </div>
                <div className="flex-1">
                  <p className="font-bold text-foreground">Payment Received</p>
                  <p className="text-sm text-muted-foreground font-medium">₹25,000 payment processed successfully</p>
                </div>
              </div>
              <div className="flex items-start space-x-4 p-4 bg-primary/10 rounded-xl border border-primary/30 hover:bg-primary/20 transition-elegant hover-lift animate-fade-in" style={{ animationDelay: '0.2s' }}>
                <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="font-bold text-foreground">5 Pending Approvals</p>
                  <p className="text-sm text-muted-foreground font-medium">New rental requests awaiting approval</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}