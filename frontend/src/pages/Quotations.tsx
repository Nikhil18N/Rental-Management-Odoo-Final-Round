import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Plus, 
  Search, 
  ClipboardList, 
  Calendar,
  DollarSign,
  Edit,
  Trash2,
  Eye,
  CheckCircle,
  Clock,
  Send
} from "lucide-react";

const Quotations = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const quotations = [
    {
      id: "QUO-001",
      customer: "Rajesh Kumar",
      product: "Camera Equipment Set",
      amount: "₹15,000",
      duration: "3 days",
      status: "draft",
      validUntil: "2025-08-20",
      createdDate: "2025-08-10"
    },
    {
      id: "QUO-002", 
      customer: "Priya Sharma",
      product: "Wedding Decoration Package",
      amount: "₹25,000",
      duration: "1 week",
      status: "sent",
      validUntil: "2025-08-25",
      createdDate: "2025-08-09"
    },
    {
      id: "QUO-003",
      customer: "Arjun Singh", 
      product: "Sound System Pro",
      amount: "₹8,500",
      duration: "2 days",
      status: "confirmed",
      validUntil: "2025-08-18",
      createdDate: "2025-08-08"
    },
    {
      id: "QUO-004",
      customer: "Meera Gupta",
      product: "Furniture Set Deluxe",
      amount: "₹12,000", 
      duration: "5 days",
      status: "expired",
      validUntil: "2025-08-12",
      createdDate: "2025-08-05"
    },
  ];

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      draft: { label: "Draft", className: "bg-gray-100 text-gray-800" },
      sent: { label: "Sent", className: "bg-blue-100 text-blue-800" },
      confirmed: { label: "Confirmed", className: "bg-green-100 text-green-800" },
      expired: { label: "Expired", className: "bg-red-100 text-red-800" },
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.draft;
    return (
      <Badge className={config.className}>
        {config.label}
      </Badge>
    );
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "draft":
        return <Edit className="w-4 h-4 text-gray-500" />;
      case "sent":
        return <Send className="w-4 h-4 text-blue-500" />;
      case "confirmed":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "expired":
        return <Clock className="w-4 h-4 text-red-500" />;
      default:
        return <ClipboardList className="w-4 h-4 text-gray-500" />;
    }
  };

  const filteredQuotations = quotations.filter(quotation =>
    quotation.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    quotation.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
    quotation.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout>
      <div className="flex-1 space-y-8 p-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Rental Quotations</h2>
            <p className="text-muted-foreground">
              Manage and track all rental quotations
            </p>
          </div>
          <Button className="bg-primary hover:bg-primary/90">
            <Plus className="w-4 h-4 mr-2" />
            Create Quotation
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Quotations</CardTitle>
              <ClipboardList className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">124</div>
              <p className="text-xs text-muted-foreground">+12% from last month</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Confirmed</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">89</div>
              <p className="text-xs text-muted-foreground">71.8% conversion rate</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending</CardTitle>
              <Send className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">23</div>
              <p className="text-xs text-muted-foreground">Awaiting customer response</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Value</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹3.2L</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card>
          <CardHeader>
            <CardTitle>Search & Filter</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search quotations by customer, product, or ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="outline">Filter</Button>
            </div>
          </CardContent>
        </Card>

        {/* Quotations List */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Quotations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredQuotations.map((quotation) => (
                <div
                  key={quotation.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center space-x-3">
                      <span className="font-semibold">{quotation.id}</span>
                      {getStatusIcon(quotation.status)}
                      {getStatusBadge(quotation.status)}
                    </div>
                    <p className="text-sm font-medium">{quotation.customer}</p>
                    <p className="text-sm text-muted-foreground">{quotation.product}</p>
                    <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                      <span>Duration: {quotation.duration}</span>
                      <span>•</span>
                      <span>Valid until: {quotation.validUntil}</span>
                      <span>•</span>
                      <span>Created: {quotation.createdDate}</span>
                    </div>
                  </div>
                  
                  <div className="text-right space-y-2">
                    <p className="text-lg font-bold">{quotation.amount}</p>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-1" />
                        View
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4 mr-1" />
                        Edit
                      </Button>
                      {quotation.status === "confirmed" && (
                        <Button size="sm" className="bg-green-600 hover:bg-green-700">
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Convert to Order
                        </Button>
                      )}
                    </div>
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

export default Quotations;
