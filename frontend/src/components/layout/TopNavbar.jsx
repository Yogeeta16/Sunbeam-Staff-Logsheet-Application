import React from 'react';
import { Bell, Search } from 'lucide-react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';

export const TopNavbar = () => {
  return (
    <header className="h-16 bg-card border-b border-border flex items-center justify-between px-6">
      {/* Search */}
      <div className="flex-1 max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search..."
            className="pl-10"
          />
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center space-x-4">
        {/* Notifications */}
        <div className="relative">
          <Button variant="ghost" size="sm" className="relative">
            <Bell className="w-4 h-4" />
            <Badge className="absolute -top-1 -right-1 w-5 h-5 text-xs flex items-center justify-center p-0 bg-destructive">
              3
            </Badge>
          </Button>
        </div>

        {/* Quick stats */}
        <div className="hidden md:flex items-center space-x-4 text-sm">
          <div className="text-center">
            <p className="font-medium">12</p>
            <p className="text-muted-foreground text-xs">Pending</p>
          </div>
          <div className="text-center">
            <p className="font-medium">47</p>
            <p className="text-muted-foreground text-xs">Approved</p>
          </div>
        </div>
      </div>
    </header>
  );
};
