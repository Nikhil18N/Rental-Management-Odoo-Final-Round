import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Plus, 
  Search, 
  Truck, 
  Calendar,
  MapPin,
  User,
  Package,
  Clock,
  CheckCircle,
  AlertTriangle,
  Phone
} from "lucide-react";

interface Delivery {
  id: string;
  type: "pickup" | "return";
  bookingId: string;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  productName: string;
  scheduledDate: string;
  scheduledTime: string;
  status: "scheduled" | "in_transit" | "completed" | "failed" | "rescheduled";
  assignedDriver?: string;
  notes?: string;
  actualCompletionTime?: string;
}

const DeliveryManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");

  const deliveries: Delivery[] = [
    {
      id: "DEL-001",
      type: "pickup",
      bookingId: "BKG-001",
      customerName: "Rajesh Kumar",
      customerPhone: "+91 98765 43210",
      customerAddress: "123 MG Road, Bangalore, Karnataka 560001",
      productName: "Professional Camera Kit",
      scheduledDate: "2025-08-12",
      scheduledTime: "10:00 AM",
      status: "scheduled",
      assignedDriver: "Ravi Sharma",
      notes: "Customer prefers morning delivery"
    },
    {
      id: "DEL-002",
      type: "return",
      bookingId: "BKG-002",
      customerName: "Priya Sharma",
      customerPhone: "+91 87654 32109",
      customerAddress: "456 Brigade Road, Bangalore, Karnataka 560025",
      productName: "Wedding Decoration Set",
      scheduledDate: "2025-08-13",
      scheduledTime: "2:00 PM",
      status: "in_transit",
      assignedDriver: "Amit Singh",
      notes: "Large items - need truck"
    },
    {
      id: "DEL-003",
      type: "pickup",
      bookingId: "BKG-003",
      customerName: "Arjun Singh",
      customerPhone: "+91 76543 21098",
      customerAddress: "789 Indiranagar, Bangalore, Karnataka 560038",
      productName: "Sound System Pro",
      scheduledDate: "2025-08-11",
      scheduledTime: "4:00 PM",
      status: "completed",
      assignedDriver: "Ravi Sharma",
      actualCompletionTime: "4:15 PM"
    },
    {
      id: "DEL-004",
      type: "return",
      bookingId: "BKG-004",
      customerName: "Meera Gupta",
      customerPhone: "+91 65432 10987",
      customerAddress: "321 Koramangala, Bangalore, Karnataka 560034",
      productName: "Furniture Set Deluxe",
      scheduledDate: "2025-08-10",
      scheduledTime: "11:00 AM",
      status: "failed",
      assignedDriver: "Amit Singh",
      notes: "Customer not available - need to reschedule"
    }
  ];

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      scheduled: { label: "Scheduled", className: "bg-blue-100 text-blue-800" },
      in_transit: { label: "In Transit", className: "bg-yellow-100 text-yellow-800" },
      completed: { label: "Completed", className: "bg-green-100 text-green-800" },
      failed: { label: "Failed", className: "bg-red-100 text-red-800" },
      rescheduled: { label: "Rescheduled", className: "bg-purple-100 text-purple-800" },
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.scheduled;
    return (
      <Badge className={config.className}>
        {config.label}
      </Badge>
    );
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "scheduled":
        return <Calendar className="w-4 h-4 text-blue-500" />;
      case "in_transit":
        return <Truck className="w-4 h-4 text-yellow-500" />;
      case "completed":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "failed":
        return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case "rescheduled":
        return <Clock className="w-4 h-4 text-purple-500" />;
      default:
        return <Calendar className="w-4 h-4 text-gray-500" />;
    }
  };

  const getTypeIcon = (type: string) => {
    return type === "pickup" ? (
      <Package className="w-4 h-4 text-green-600" />
    ) : (
      <Truck className="w-4 h-4 text-blue-600" />
    );
  };

  const filteredDeliveries = deliveries.filter(delivery => {
    const matchesSearch = 
      delivery.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      delivery.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      delivery.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || delivery.status === statusFilter;
    const matchesType = typeFilter === "all" || delivery.type === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  return (
    <Layout>
      <div className="flex-1 space-y-8 p-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Delivery Management</h2>
            <p className="text-muted-foreground">
              Manage pickup and return logistics
            </p>
          </div>
          <Button className="bg-primary hover:bg-primary/90">
            <Plus className="w-4 h-4 mr-2" />
            Schedule Delivery
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Today's Deliveries</CardTitle>
              <Truck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-muted-foreground">5 pickups, 3 returns</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">In Transit</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">Currently being delivered</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed Today</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">95% success rate</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Failed/Rescheduled</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2</div>
              <p className="text-xs text-muted-foreground">Need attention</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle>Search & Filter</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search deliveries by customer, product, or ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border rounded-md"
              >
                <option value="all">All Status</option>
                <option value="scheduled">Scheduled</option>
                <option value="in_transit">In Transit</option>
                <option value="completed">Completed</option>
                <option value="failed">Failed</option>
                <option value="rescheduled">Rescheduled</option>
              </select>
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="px-3 py-2 border rounded-md"
              >
                <option value="all">All Types</option>
                <option value="pickup">Pickups</option>
                <option value="return">Returns</option>
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Deliveries List */}
        <Card>
          <CardHeader>
            <CardTitle>Scheduled Deliveries</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredDeliveries.map((delivery) => (
                <div
                  key={delivery.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center space-x-3">
                      <span className="font-semibold">{delivery.id}</span>
                      {getTypeIcon(delivery.type)}
                      <Badge variant={delivery.type === "pickup" ? "default" : "secondary"}>
                        {delivery.type.charAt(0).toUpperCase() + delivery.type.slice(1)}
                      </Badge>
                      {getStatusIcon(delivery.status)}
                      {getStatusBadge(delivery.status)}
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="flex items-center space-x-2 text-sm">
                          <User className="w-4 h-4 text-muted-foreground" />
                          <span className="font-medium">{delivery.customerName}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground mt-1">
                          <Phone className="w-4 h-4" />
                          <span>{delivery.customerPhone}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground mt-1">
                          <MapPin className="w-4 h-4" />
                          <span className="truncate">{delivery.customerAddress}</span>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex items-center space-x-2 text-sm">
                          <Package className="w-4 h-4 text-muted-foreground" />
                          <span className="font-medium">{delivery.productName}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground mt-1">
                          <Calendar className="w-4 h-4" />
                          <span>{delivery.scheduledDate} at {delivery.scheduledTime}</span>
                        </div>
                        {delivery.assignedDriver && (
                          <div className="flex items-center space-x-2 text-sm text-muted-foreground mt-1">
                            <Truck className="w-4 h-4" />
                            <span>Driver: {delivery.assignedDriver}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {delivery.notes && (
                      <p className="text-sm text-muted-foreground italic">
                        Note: {delivery.notes}
                      </p>
                    )}
                  </div>
                  
                  <div className="space-y-2 ml-4">
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                    <Button variant="outline" size="sm">
                      Update Status
                    </Button>
                    {delivery.status === "failed" && (
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                        Reschedule
                      </Button>
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
};

export default DeliveryManagement;
