import { Button } from "@/components/ui/button";
import { Bell, Search, Plus } from "lucide-react";

export function Header() {
  return (
    <header className="h-16 border-b border-border/60 bg-gradient-to-r from-card via-card/95 to-card backdrop-blur-sm sticky top-0 z-40 shadow-soft">
      <div className="flex h-full items-center justify-between px-6">
        <div className="flex items-center space-x-4 animate-fade-in">
          <h1 className="text-2xl font-black text-foreground tracking-tight">Dashboard</h1>
          <div className="hidden lg:flex items-center text-sm text-muted-foreground font-medium">
            <span>•</span>
            <span className="ml-2">RentVista Admin Panel</span>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="relative hidden md:flex animate-fade-in">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <input
              type="text"
              placeholder="Search products, customers..."
              className="pl-11 pr-4 py-2.5 bg-secondary/50 border border-border/60 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary w-72 transition-elegant placeholder:text-muted-foreground/60"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-3">
            <Button variant="outline" size="sm" className="hover-lift transition-elegant border-border/60 font-medium">
              <Bell className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Notifications</span>
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-destructive rounded-full animate-pulse"></span>
            </Button>
            
            <Button className="bg-gradient-primary hover:shadow-elegant transition-elegant hover-lift font-semibold shadow-soft">
              <Plus className="w-4 h-4 mr-2" />
              New Rental
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}