import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Plus, 
  Search, 
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  DollarSign,
  Eye,
  Edit,
  Star
} from "lucide-react";

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  registrationDate: string;
  totalBookings: number;
  totalSpent: number;
  status: "active" | "inactive" | "vip";
  rating: number;
  lastBooking?: string;
}

export default function Customers() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  
  const customers: Customer[] = [
    {
      id: "CUST-001",
      name: "Rajesh Kumar",
      email: "rajesh.kumar@email.com",
      phone: "+91 98765 43210",
      address: "123 MG Road",
      city: "Bangalore",
      state: "Karnataka",
      pincode: "560001",
      registrationDate: "2025-01-15",
      totalBookings: 12,
      totalSpent: 85000,
      status: "vip",
      rating: 4.8,
      lastBooking: "2025-08-10"
    },
    {
      id: "CUST-002",
      name: "Priya Sharma",
      email: "priya.sharma@email.com", 
      phone: "+91 98765 43211",
      address: "456 Brigade Road",
      city: "Bangalore",
      state: "Karnataka", 
      pincode: "560025",
      registrationDate: "2025-02-20",
      totalBookings: 8,
      totalSpent: 62000,
      status: "active",
      rating: 4.5,
      lastBooking: "2025-08-09"
    },
    {
      id: "CUST-003",
      name: "Arjun Singh",
      email: "arjun.singh@email.com",
      phone: "+91 98765 43212", 
      address: "789 Commercial Street",
      city: "Bangalore",
      state: "Karnataka",
      pincode: "560001",
      registrationDate: "2025-03-10",
      totalBookings: 5,
      totalSpent: 35000,
      status: "active",
      rating: 4.2,
      lastBooking: "2025-08-08"
    },
    {
      id: "CUST-004",
      name: "Meera Gupta",
      email: "meera.gupta@email.com",
      phone: "+91 98765 43213",
      address: "321 Indiranagar",
      city: "Bangalore", 
      state: "Karnataka",
      pincode: "560038",
      registrationDate: "2025-04-05",
      totalBookings: 3,
      totalSpent: 22000,
      status: "active",
      rating: 4.0,
      lastBooking: "2025-08-05"
    },
    {
      id: "CUST-005",
      name: "Vikram Patel",
      email: "vikram.patel@email.com",
      phone: "+91 98765 43214",
      address: "654 Koramangala",
      city: "Bangalore",
      state: "Karnataka", 
      pincode: "560034",
      registrationDate: "2025-05-12",
      totalBookings: 1,
      totalSpent: 6000,
      status: "active",
      rating: 4.0,
      lastBooking: "2025-08-01"
    },
    {
      id: "CUST-006",
      name: "Anita Reddy",
      email: "anita.reddy@email.com",
      phone: "+91 98765 43215",
      address: "987 HSR Layout",
      city: "Bangalore",
      state: "Karnataka",
      pincode: "560102", 
      registrationDate: "2024-12-20",
      totalBookings: 0,
      totalSpent: 0,
      status: "inactive",
      rating: 0
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "inactive":
        return "bg-gray-100 text-gray-800";
      case "vip":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = 
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.includes(searchTerm) ||
      customer.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || customer.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star 
        key={i}
        className={`w-4 h-4 ${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <Layout>
      <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Customers</h1>
          <p className="text-muted-foreground">Manage your customer database</p>
        </div>
        <Button className="bg-gradient-primary hover:bg-primary-hover">
          <Plus className="w-4 h-4 mr-2" />
          Add Customer
        </Button>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search customers..."
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
              <option value="all">All Customers</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="vip">VIP</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Customer Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <User className="w-8 h-8 text-primary" />
              <div>
                <p className="text-2xl font-bold">{customers.length}</p>
                <p className="text-sm text-muted-foreground">Total Customers</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <User className="w-8 h-8 text-green-600" />
              <div>
                <p className="text-2xl font-bold text-green-600">
                  {customers.filter(c => c.status === "active").length}
                </p>
                <p className="text-sm text-muted-foreground">Active</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Star className="w-8 h-8 text-purple-600" />
              <div>
                <p className="text-2xl font-bold text-purple-600">
                  {customers.filter(c => c.status === "vip").length}
                </p>
                <p className="text-sm text-muted-foreground">VIP</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <DollarSign className="w-8 h-8 text-yellow-600" />
              <div>
                <p className="text-2xl font-bold text-yellow-600">
                  ₹{customers.reduce((sum, c) => sum + c.totalSpent, 0).toLocaleString()}
                </p>
                <p className="text-sm text-muted-foreground">Total Revenue</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Customers Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredCustomers.map((customer) => (
          <Card key={customer.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{customer.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{customer.id}</p>
                  </div>
                </div>
                <Badge className={getStatusColor(customer.status)}>
                  {customer.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Contact Info */}
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-sm">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <span>{customer.email}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  <span>{customer.phone}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <span>{customer.city}, {customer.state}</span>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 pt-2 border-t border-border">
                <div>
                  <p className="text-sm text-muted-foreground">Total Bookings</p>
                  <p className="font-semibold">{customer.totalBookings}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Spent</p>
                  <p className="font-semibold">₹{customer.totalSpent.toLocaleString()}</p>
                </div>
              </div>

              {/* Rating */}
              {customer.rating > 0 && (
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Rating</p>
                  <div className="flex items-center space-x-1">
                    {renderStars(customer.rating)}
                    <span className="text-sm text-muted-foreground ml-2">
                      {customer.rating.toFixed(1)}
                    </span>
                  </div>
                </div>
              )}

              {/* Last Booking */}
              {customer.lastBooking && (
                <div>
                  <p className="text-sm text-muted-foreground">Last Booking</p>
                  <div className="flex items-center space-x-1 text-sm">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span>{customer.lastBooking}</span>
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex space-x-2 pt-2">
                <Button size="sm" variant="outline" className="flex-1">
                  <Eye className="w-4 h-4 mr-1" />
                  View
                </Button>
                <Button size="sm" variant="outline" className="flex-1">
                  <Edit className="w-4 h-4 mr-1" />
                  Edit
                </Button>
                <Button size="sm" className="bg-green-600 hover:bg-green-700">
                  <Plus className="w-4 h-4 mr-1" />
                  Book
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      </div>
    </Layout>
  );
}
