import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Plus,
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  Trash2,
  FileText,
  Mail,
  Printer,
  Clock,
  DollarSign,
  User,
  Calendar,
  CheckCircle,
  AlertCircle
} from "lucide-react";

const Invoicing = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Sample invoices data
  const invoices = [
    {
      id: "INV-2025-001",
      bookingId: "B-2025-089",
      customer: "Rajesh Kumar",
      amount: 15000,
      tax: 2700,
      total: 17700,
      status: "paid",
      issueDate: "2025-08-10",
      dueDate: "2025-08-15",
      paymentDate: "2025-08-12",
      items: [
        { name: "Professional Camera Kit", quantity: 1, rate: 5000, days: 3, amount: 15000 }
      ]
    },
    {
      id: "INV-2025-002",
      bookingId: "B-2025-090",
      customer: "Priya Sharma",
      amount: 8000,
      tax: 1440,
      total: 9440,
      status: "overdue",
      issueDate: "2025-08-05",
      dueDate: "2025-08-10",
      paymentDate: null,
      items: [
        { name: "Wedding Decoration Set", quantity: 1, rate: 4000, days: 2, amount: 8000 }
      ]
    },
    {
      id: "INV-2025-003",
      bookingId: "B-2025-091",
      customer: "Arjun Singh",
      amount: 12000,
      tax: 2160,
      total: 14160,
      status: "pending",
      issueDate: "2025-08-12",
      dueDate: "2025-08-17",
      paymentDate: null,
      items: [
        { name: "Sound System Pro", quantity: 1, rate: 6000, days: 2, amount: 12000 }
      ]
    },
    {
      id: "INV-2025-004",
      bookingId: "B-2025-092",
      customer: "Meera Gupta",
      amount: 18000,
      tax: 3240,
      total: 21240,
      status: "draft",
      issueDate: "2025-08-13",
      dueDate: "2025-08-18",
      paymentDate: null,
      items: [
        { name: "Furniture Set Deluxe", quantity: 1, rate: 9000, days: 2, amount: 18000 }
      ]
    },
    {
      id: "INV-2025-005",
      bookingId: "B-2025-093",
      customer: "Vikram Patel",
      amount: 10000,
      tax: 1800,
      total: 11800,
      status: "sent",
      issueDate: "2025-08-11",
      dueDate: "2025-08-16",
      paymentDate: null,
      items: [
        { name: "Lighting Equipment", quantity: 1, rate: 5000, days: 2, amount: 10000 }
      ]
    }
  ];

  const filteredInvoices = invoices.filter(invoice => {
    const matchesSearch = invoice.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         invoice.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         invoice.bookingId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || invoice.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid": return "bg-green-100 text-green-800";
      case "overdue": return "bg-red-100 text-red-800";
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "sent": return "bg-blue-100 text-blue-800";
      case "draft": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "paid": return CheckCircle;
      case "overdue": return AlertCircle;
      case "pending": return Clock;
      case "sent": return Mail;
      case "draft": return FileText;
      default: return FileText;
    }
  };

  const totalStats = {
    totalInvoices: invoices.length,
    totalAmount: invoices.reduce((sum, inv) => sum + inv.total, 0),
    paidAmount: invoices.filter(inv => inv.status === "paid").reduce((sum, inv) => sum + inv.total, 0),
    overdueAmount: invoices.filter(inv => inv.status === "overdue").reduce((sum, inv) => sum + inv.total, 0),
    pendingAmount: invoices.filter(inv => inv.status === "pending" || inv.status === "sent").reduce((sum, inv) => sum + inv.total, 0)
  };

  const createInvoice = () => {
    console.log("Creating new invoice");
  };

  const viewInvoice = (invoiceId: string) => {
    console.log("Viewing invoice:", invoiceId);
  };

  const editInvoice = (invoiceId: string) => {
    console.log("Editing invoice:", invoiceId);
  };

  const sendInvoice = (invoiceId: string) => {
    console.log("Sending invoice:", invoiceId);
  };

  const printInvoice = (invoiceId: string) => {
    console.log("Printing invoice:", invoiceId);
  };

  const downloadInvoice = (invoiceId: string) => {
    console.log("Downloading invoice:", invoiceId);
  };

  return (
    <Layout>
      <div className="flex-1 space-y-8 p-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Invoicing</h2>
            <p className="text-muted-foreground">
              Manage invoices and billing
            </p>
          </div>
          <Button onClick={createInvoice} className="bg-primary hover:bg-primary/90">
            <Plus className="w-4 h-4 mr-2" />
            Create Invoice
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Invoices</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalStats.totalInvoices}</div>
              <p className="text-xs text-muted-foreground">
                ₹{totalStats.totalAmount.toLocaleString()} total value
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Paid Amount</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                ₹{totalStats.paidAmount.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">
                {Math.round((totalStats.paidAmount / totalStats.totalAmount) * 100)}% of total
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Amount</CardTitle>
              <Clock className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">
                ₹{totalStats.pendingAmount.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">Awaiting payment</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Overdue Amount</CardTitle>
              <AlertCircle className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">
                ₹{totalStats.overdueAmount.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">Past due date</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between space-x-4">
              <div className="flex items-center space-x-4 flex-1">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search invoices..."
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
                  <option value="draft">Draft</option>
                  <option value="sent">Sent</option>
                  <option value="pending">Pending</option>
                  <option value="paid">Paid</option>
                  <option value="overdue">Overdue</option>
                </select>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline">
                  <Filter className="w-4 h-4 mr-2" />
                  Filters
                </Button>
                <Button variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Invoices Table */}
        <Card>
          <CardHeader>
            <CardTitle>Invoice List</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredInvoices.map((invoice) => {
                const StatusIcon = getStatusIcon(invoice.status);
                return (
                  <div
                    key={invoice.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center space-x-4 flex-1">
                      <div className="flex flex-col space-y-1">
                        <div className="flex items-center space-x-2">
                          <span className="font-bold text-lg">{invoice.id}</span>
                          <Badge className={getStatusColor(invoice.status)}>
                            <StatusIcon className="w-3 h-3 mr-1" />
                            {invoice.status}
                          </Badge>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <span className="flex items-center">
                            <User className="w-3 h-3 mr-1" />
                            {invoice.customer}
                          </span>
                          <span className="flex items-center">
                            <FileText className="w-3 h-3 mr-1" />
                            {invoice.bookingId}
                          </span>
                          <span className="flex items-center">
                            <Calendar className="w-3 h-3 mr-1" />
                            Due: {invoice.dueDate}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <div className="text-lg font-bold">₹{invoice.total.toLocaleString()}</div>
                        <div className="text-sm text-muted-foreground">
                          Base: ₹{invoice.amount.toLocaleString()} + Tax: ₹{invoice.tax.toLocaleString()}
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => viewInvoice(invoice.id)}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => editInvoice(invoice.id)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => printInvoice(invoice.id)}
                        >
                          <Printer className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => downloadInvoice(invoice.id)}
                        >
                          <Download className="w-4 h-4" />
                        </Button>
                        {invoice.status === "draft" && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => sendInvoice(invoice.id)}
                          >
                            <Mail className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Invoicing;
