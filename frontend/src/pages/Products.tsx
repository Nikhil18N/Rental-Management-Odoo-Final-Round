import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Plus, 
  Search, 
  Package, 
  Calendar,
  DollarSign,
  Edit,
  Trash2,
  Eye
} from "lucide-react";

interface Product {
  id: string;
  name: string;
  category: string;
  pricePerHour: number;
  pricePerDay: number;
  pricePerWeek: number;
  availability: "available" | "rented" | "maintenance";
  totalUnits: number;
  availableUnits: number;
  description: string;
  image?: string;
}

export default function Products() {
  const [searchTerm, setSearchTerm] = useState("");
  
  const products: Product[] = [
    {
      id: "PRD-001",
      name: "Professional Camera Kit",
      category: "Photography",
      pricePerHour: 500,
      pricePerDay: 2000,
      pricePerWeek: 12000,
      availability: "available",
      totalUnits: 5,
      availableUnits: 3,
      description: "Complete professional photography setup with DSLR, lenses, and accessories"
    },
    {
      id: "PRD-002", 
      name: "Wedding Decoration Set",
      category: "Events",
      pricePerHour: 0,
      pricePerDay: 15000,
      pricePerWeek: 90000,
      availability: "available",
      totalUnits: 3,
      availableUnits: 2,
      description: "Complete wedding decoration package including flowers, lights, and setup"
    },
    {
      id: "PRD-003",
      name: "Sound System Pro",
      category: "Audio",
      pricePerHour: 800,
      pricePerDay: 3000,
      pricePerWeek: 18000,
      availability: "rented",
      totalUnits: 4,
      availableUnits: 1,
      description: "Professional grade sound system with speakers, microphones, and mixing console"
    },
    {
      id: "PRD-004",
      name: "Party Furniture Set",
      category: "Furniture",
      pricePerHour: 0,
      pricePerDay: 5000,
      pricePerWeek: 25000,
      availability: "available",
      totalUnits: 10,
      availableUnits: 8,
      description: "Tables, chairs, and lounge furniture for events and parties"
    }
  ];

  const getAvailabilityColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-green-100 text-green-800";
      case "rented":
        return "bg-yellow-100 text-yellow-800";
      case "maintenance":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout>
      <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Products</h1>
          <p className="text-muted-foreground">Manage your rental inventory</p>
        </div>
        <Button className="bg-gradient-primary hover:bg-primary-hover">
          <Plus className="w-4 h-4 mr-2" />
          Add Product
        </Button>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">
              Filter by Category
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Product Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Package className="w-8 h-8 text-primary" />
              <div>
                <p className="text-2xl font-bold">{products.length}</p>
                <p className="text-sm text-muted-foreground">Total Products</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Calendar className="w-8 h-8 text-green-600" />
              <div>
                <p className="text-2xl font-bold text-green-600">
                  {products.filter(p => p.availability === "available").length}
                </p>
                <p className="text-sm text-muted-foreground">Available</p>
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
                  {products.filter(p => p.availability === "rented").length}
                </p>
                <p className="text-sm text-muted-foreground">On Rent</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Package className="w-8 h-8 text-red-600" />
              <div>
                <p className="text-2xl font-bold text-red-600">
                  {products.filter(p => p.availability === "maintenance").length}
                </p>
                <p className="text-sm text-muted-foreground">Maintenance</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Products Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredProducts.map((product) => (
          <Card key={product.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{product.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{product.category}</p>
                </div>
                <Badge className={getAvailabilityColor(product.availability)}>
                  {product.availability}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">{product.description}</p>
              
              {/* Pricing */}
              <div className="space-y-2">
                <h4 className="font-medium">Pricing:</h4>
                <div className="text-sm space-y-1">
                  {product.pricePerHour > 0 && (
                    <p>₹{product.pricePerHour}/hour</p>
                  )}
                  <p>₹{product.pricePerDay}/day</p>
                  <p>₹{product.pricePerWeek}/week</p>
                </div>
              </div>
              
              {/* Availability */}
              <div>
                <h4 className="font-medium mb-1">Availability:</h4>
                <p className="text-sm text-muted-foreground">
                  {product.availableUnits} of {product.totalUnits} units available
                </p>
              </div>

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
                <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                  <Trash2 className="w-4 h-4" />
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
