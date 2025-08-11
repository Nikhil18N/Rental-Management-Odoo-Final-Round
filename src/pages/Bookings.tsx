import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Plus, 
  Search, 
  Calendar,
  User,
  Package,
  DollarSign,
  Eye,
  Edit,
  Truck,
  Clock,
  CheckCircle,
  AlertTriangle
} from "lucide-react";

interface Booking {
  id: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  productId: string;
  productName: string;
  startDate: string;
  endDate: string;
  duration: string;
  totalAmount: number;
  status: "pending" | "confirmed" | "active" | "completed" | "cancelled" | "overdue";
  paymentStatus: "pending" | "partial" | "paid" | "refunded";
  createdAt: string;
  pickupScheduled?: string;
  returnScheduled?: string;
}

export default function Bookings() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  
  const bookings: Booking[] = [
    {
      id: "BKG-001",
      customerId: "CUST-001",
      customerName: "Rajesh Kumar",
      customerEmail: "rajesh@email.com",
      productId: "PRD-001",
      productName: "Professional Camera Kit",
      startDate: "2025-08-15",
      endDate: "2025-08-17",
      duration: "3 days",
      totalAmount: 6000,
      status: "confirmed",
      paymentStatus: "paid",
      createdAt: "2025-08-10",
      pickupScheduled: "2025-08-15 09:00",
      returnScheduled: "2025-08-17 18:00"
    },
    {
      id: "BKG-002",
      customerId: "CUST-002", 
      customerName: "Priya Sharma",
      customerEmail: "priya@email.com",
      productId: "PRD-002",
      productName: "Wedding Decoration Set",
      startDate: "2025-08-20",
      endDate: "2025-08-22",
      duration: "3 days",
      totalAmount: 45000,
      status: "pending",
      paymentStatus: "partial",
      createdAt: "2025-08-09",
    },
    {
      id: "BKG-003",
      customerId: "CUST-003",
      customerName: "Arjun Singh", 
      customerEmail: "arjun@email.com",
      productId: "PRD-003",
      productName: "Sound System Pro",
      startDate: "2025-08-12",
      endDate: "2025-08-14",
      duration: "3 days",
      totalAmount: 9000,
      status: "active",
      paymentStatus: "paid",
      createdAt: "2025-08-08",
      pickupScheduled: "2025-08-12 10:00",
      returnScheduled: "2025-08-14 16:00"
    },
    {
      id: "BKG-004",
      customerId: "CUST-004",
      customerName: "Meera Gupta",
      customerEmail: "meera@email.com", 
      productId: "PRD-004",
      productName: "Party Furniture Set",
      startDate: "2025-08-08",
      endDate: "2025-08-10",
      duration: "3 days",
      totalAmount: 15000,
      status: "overdue",
      paymentStatus: "paid",
      createdAt: "2025-08-05",
      pickupScheduled: "2025-08-08 08:00",
      returnScheduled: "2025-08-10 20:00"
    },
    {
      id: "BKG-005",
      customerId: "CUST-005",
      customerName: "Vikram Patel",
      customerEmail: "vikram@email.com",
      productId: "PRD-001",
      productName: "Professional Camera Kit", 
      startDate: "2025-08-05",
      endDate: "2025-08-07",
      duration: "3 days",
      totalAmount: 6000,
      status: "completed",
      paymentStatus: "paid",
      createdAt: "2025-08-01",
      pickupScheduled: "2025-08-05 09:00",
      returnScheduled: "2025-08-07 17:00"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "confirmed":
        return "bg-blue-100 text-blue-800";
      case "active":
        return "bg-green-100 text-green-800";
      case "completed":
        return "bg-gray-100 text-gray-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      case "overdue":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-red-100 text-red-800";
      case "partial":
        return "bg-yellow-100 text-yellow-800";
      case "paid":
        return "bg-green-100 text-green-800";
      case "refunded":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="w-4 h-4" />;
      case "confirmed":
        return <CheckCircle className="w-4 h-4" />;
      case "active":
        return <Package className="w-4 h-4" />;
      case "completed":
        return <CheckCircle className="w-4 h-4" />;
      case "overdue":
        return <AlertTriangle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = 
      booking.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || booking.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <Layout>
      <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Bookings</h1>
          <p className="text-muted-foreground">Manage rental bookings and orders</p>
        </div>
        <Button className="bg-gradient-primary hover:bg-primary-hover">
          <Plus className="w-4 h-4 mr-2" />
          New Booking
        </Button>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search bookings..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-border rounded-md bg-background"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
              <option value="overdue">Overdue</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Booking Stats */}
      <div className="grid gap-4 md:grid-cols-5">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="w-8 h-8 text-yellow-600" />
              <div>
                <p className="text-2xl font-bold text-yellow-600">
                  {bookings.filter(b => b.status === "pending").length}
                </p>
                <p className="text-sm text-muted-foreground">Pending</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-8 h-8 text-blue-600" />
              <div>
                <p className="text-2xl font-bold text-blue-600">
                  {bookings.filter(b => b.status === "confirmed").length}
                </p>
                <p className="text-sm text-muted-foreground">Confirmed</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Package className="w-8 h-8 text-green-600" />
              <div>
                <p className="text-2xl font-bold text-green-600">
                  {bookings.filter(b => b.status === "active").length}
                </p>
                <p className="text-sm text-muted-foreground">Active</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="w-8 h-8 text-red-600" />
              <div>
                <p className="text-2xl font-bold text-red-600">
                  {bookings.filter(b => b.status === "overdue").length}
                </p>
                <p className="text-sm text-muted-foreground">Overdue</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-8 h-8 text-gray-600" />
              <div>
                <p className="text-2xl font-bold text-gray-600">
                  {bookings.filter(b => b.status === "completed").length}
                </p>
                <p className="text-sm text-muted-foreground">Completed</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bookings List */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Bookings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredBookings.map((booking) => (
              <div key={booking.id} className="border border-border rounded-lg p-4 hover:bg-secondary/50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(booking.status)}
                      <div>
                        <h3 className="font-semibold">{booking.id}</h3>
                        <p className="text-sm text-muted-foreground">{booking.customerName}</p>
                      </div>
                    </div>
                    
                    <div className="hidden md:block">
                      <p className="font-medium">{booking.productName}</p>
                      <p className="text-sm text-muted-foreground">
                        {booking.startDate} to {booking.endDate} ({booking.duration})
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="font-semibold">₹{booking.totalAmount.toLocaleString()}</p>
                      <div className="flex space-x-2">
                        <Badge className={getStatusColor(booking.status)}>
                          {booking.status}
                        </Badge>
                        <Badge className={getPaymentStatusColor(booking.paymentStatus)}>
                          {booking.paymentStatus}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        <Eye className="w-4 h-4 mr-1" />
                        View
                      </Button>
                      <Button size="sm" variant="outline">
                        <Edit className="w-4 h-4 mr-1" />
                        Edit
                      </Button>
                      {booking.status === "confirmed" && (
                        <Button size="sm" className="bg-green-600 hover:bg-green-700">
                          <Truck className="w-4 h-4 mr-1" />
                          Schedule Pickup
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Mobile view additional info */}
                <div className="md:hidden mt-3 pt-3 border-t border-border">
                  <p className="font-medium">{booking.productName}</p>
                  <p className="text-sm text-muted-foreground">
                    {booking.startDate} to {booking.endDate} ({booking.duration})
                  </p>
                  {booking.pickupScheduled && (
                    <p className="text-sm text-muted-foreground">
                      Pickup: {booking.pickupScheduled}
                    </p>
                  )}
                  {booking.returnScheduled && (
                    <p className="text-sm text-muted-foreground">
                      Return: {booking.returnScheduled}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      </div>
    </Layout>
  );
}
