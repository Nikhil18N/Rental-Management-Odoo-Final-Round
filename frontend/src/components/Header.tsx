import { Button } from "@/components/ui/button";
import { Bell, Search, Plus, User, Settings, LogOut } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function Header() {
  return (
    <header className="h-16 border-b bg-white/95 backdrop-blur-md sticky top-0 z-50 shadow-sm">
      <div className="flex h-full items-center justify-between px-6">
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">RE</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">RentEase</h1>
              <p className="text-xs text-gray-500 -mt-1">Rental Management</p>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="relative hidden md:flex">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search anything..."
              className="pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 w-80 transition-all placeholder:text-gray-400"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="w-5 h-5" />
              <Badge className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center p-0 bg-red-500 hover:bg-red-500 text-xs">
                3
              </Badge>
            </Button>
            
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white shadow-sm">
              <Plus className="w-4 h-4 mr-2" />
              New Booking
            </Button>

            {/* User Menu */}
            <div className="flex items-center space-x-3 pl-3 border-l border-gray-200">
              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-gray-600" />
              </div>
              <div className="hidden lg:block">
                <p className="text-sm font-medium text-gray-900">Admin User</p>
                <p className="text-xs text-gray-500">admin@rentease.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}