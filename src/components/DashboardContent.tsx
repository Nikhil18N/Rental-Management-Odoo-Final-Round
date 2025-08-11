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
      change: "3 overdue",
      changeType: "negative" as const,
      icon: Calendar,
    },
  ];

  const recentOrders = [
    { id: "RNT-001", customer: "Rajesh Kumar", product: "Camera Equipment Set", status: "active", amount: "₹15,000" },
    { id: "RNT-002", customer: "Priya Sharma", product: "Wedding Decoration", status: "pending", amount: "₹25,000" },
    { id: "RNT-003", customer: "Arjun Singh", product: "Sound System", status: "returned", amount: "₹8,500" },
    { id: "RNT-004", customer: "Meera Gupta", product: "Furniture Set", status: "active", amount: "₹12,000" },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle className="w-4 h-4 text-success" />;
      case "pending":
        return <Clock className="w-4 h-4 text-warning" />;
      case "returned":
        return <CheckCircle className="w-4 h-4 text-muted-foreground" />;
      default:
        return <AlertTriangle className="w-4 h-4 text-destructive" />;
    }
  };

  return (
    <div className="flex-1 space-y-6 p-6">
      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      {/* Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recent Orders */}
        <Card className="lg:col-span-2 shadow-card">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-semibold">Recent Orders</CardTitle>
            <Button variant="outline" size="sm">
              View All
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-foreground">{order.id}</span>
                      {getStatusIcon(order.status)}
                    </div>
                    <p className="text-sm text-muted-foreground">{order.customer}</p>
                    <p className="text-sm text-foreground">{order.product}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-foreground">{order.amount}</p>
                    <p className="text-sm text-muted-foreground capitalize">{order.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full justify-start bg-gradient-primary hover:bg-primary-hover text-primary-foreground">
              <Package className="w-4 h-4 mr-2" />
              Add New Product
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Users className="w-4 h-4 mr-2" />
              Register Customer
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Calendar className="w-4 h-4 mr-2" />
              Schedule Pickup
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <DollarSign className="w-4 h-4 mr-2" />
              Process Payment
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Additional Insights */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Popular Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Wedding Decoration Sets", rentals: 45, revenue: "₹67,500" },
                { name: "Camera Equipment", rentals: 32, revenue: "₹48,000" },
                { name: "Sound Systems", rentals: 28, revenue: "₹35,600" },
                { name: "Furniture Sets", rentals: 19, revenue: "₹28,500" },
              ].map((product, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">{product.name}</p>
                    <p className="text-sm text-muted-foreground">{product.rentals} rentals</p>
                  </div>
                  <p className="font-semibold text-foreground">{product.revenue}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">System Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start space-x-3 p-3 bg-warning/10 rounded-lg border border-warning/20">
                <AlertTriangle className="w-5 h-5 text-warning mt-0.5" />
                <div>
                  <p className="font-medium text-foreground">3 Overdue Returns</p>
                  <p className="text-sm text-muted-foreground">Items not returned on scheduled date</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-3 bg-success/10 rounded-lg border border-success/20">
                <CheckCircle className="w-5 h-5 text-success mt-0.5" />
                <div>
                  <p className="font-medium text-foreground">Payment Received</p>
                  <p className="text-sm text-muted-foreground">₹25,000 payment processed successfully</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-3 bg-primary/10 rounded-lg border border-primary/20">
                <Clock className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <p className="font-medium text-foreground">5 Pending Approvals</p>
                  <p className="text-sm text-muted-foreground">New rental requests awaiting approval</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}