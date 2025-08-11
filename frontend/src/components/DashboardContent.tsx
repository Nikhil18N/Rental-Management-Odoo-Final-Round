import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  DollarSign, 
  Package, 
  Users, 
  Calendar,
  ArrowRight,
  Clock,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  TrendingDown,
  Plus,
  MoreHorizontal
} from "lucide-react";

export function DashboardContent() {
  const stats = [
    {
      title: "Total Revenue",
      value: "₹2,45,890",
      change: "+12.5%",
      changeText: "from last month",
      changeType: "positive" as const,
      icon: DollarSign,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Active Rentals",
      value: "347",
      change: "+23",
      changeText: "from yesterday",
      changeType: "positive" as const,
      icon: Package,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Total Customers",
      value: "1,249",
      change: "+18.2%",
      changeText: "from last month",
      changeType: "positive" as const,
      icon: Users,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      title: "Pending Returns",
      value: "12",
      change: "3 overdue",
      changeText: "requires attention",
      changeType: "negative" as const,
      icon: Clock,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
  ];

  const recentOrders = [
    { 
      id: "RNT-001", 
      customer: "Rajesh Kumar", 
      product: "Professional Camera Kit",
      amount: "₹15,000",
      status: "active",
      date: "2025-08-10"
    },
    { 
      id: "RNT-002", 
      customer: "Priya Sharma", 
      product: "Wedding Decoration Set",
      amount: "₹12,500",
      status: "pending",
      date: "2025-08-11"
    },
    { 
      id: "RNT-003", 
      customer: "Arjun Singh", 
      product: "Sound System Pro",
      amount: "₹8,000",
      status: "overdue",
      date: "2025-08-09"
    },
    { 
      id: "RNT-004", 
      customer: "Meera Gupta", 
      product: "Furniture Set Deluxe",
      amount: "₹22,000",
      status: "completed",
      date: "2025-08-08"
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800";
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "overdue": return "bg-red-100 text-red-800";
      case "completed": return "bg-blue-100 text-blue-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active": return CheckCircle;
      case "pending": return Clock;
      case "overdue": return AlertTriangle;
      case "completed": return CheckCircle;
      default: return Clock;
    }
  };

  return (
    <div className="flex-1 space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here's what's happening with your rental business.</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Quick Action
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
                    <div className="flex items-center mt-2">
                      {stat.changeType === "positive" ? (
                        <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
                      ) : (
                        <TrendingDown className="w-4 h-4 text-red-600 mr-1" />
                      )}
                      <span className={`text-sm font-medium ${
                        stat.changeType === "positive" ? "text-green-600" : "text-red-600"
                      }`}>
                        {stat.change}
                      </span>
                      <span className="text-sm text-gray-500 ml-1">{stat.changeText}</span>
                    </div>
                  </div>
                  <div className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center`}>
                    <Icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recent Orders */}
        <Card className="lg:col-span-2 border border-gray-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between border-b border-gray-200">
            <CardTitle className="text-lg font-semibold text-gray-900">Recent Rentals</CardTitle>
            <Button variant="ghost" size="sm">
              View all
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-0">
              {recentOrders.map((order, index) => {
                const StatusIcon = getStatusIcon(order.status);
                return (
                  <div key={order.id} className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                        <Package className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{order.id}</p>
                        <p className="text-sm text-gray-600">{order.customer}</p>
                        <p className="text-sm text-gray-500">{order.product}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">{order.amount}</p>
                      <Badge className={getStatusColor(order.status)}>
                        <StatusIcon className="w-3 h-3 mr-1" />
                        {order.status}
                      </Badge>
                      <p className="text-xs text-gray-500 mt-1">{order.date}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="border border-gray-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button className="w-full justify-start bg-blue-600 hover:bg-blue-700 text-white">
              <Plus className="w-4 h-4 mr-3" />
              New Rental
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Users className="w-4 h-4 mr-3" />
              Add Customer
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Package className="w-4 h-4 mr-3" />
              Add Product
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Calendar className="w-4 h-4 mr-3" />
              View Calendar
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="border border-gray-200 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
              <div>
                <p className="text-sm font-medium text-gray-900">Payment received from Rajesh Kumar</p>
                <p className="text-xs text-gray-500">₹15,000 for Camera Kit rental - 2 minutes ago</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              <div>
                <p className="text-sm font-medium text-gray-900">New booking created</p>
                <p className="text-xs text-gray-500">Wedding Decoration Set for Priya Sharma - 5 minutes ago</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
              <div>
                <p className="text-sm font-medium text-gray-900">Return overdue</p>
                <p className="text-xs text-gray-500">Sound System Pro from Arjun Singh - 1 hour ago</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
