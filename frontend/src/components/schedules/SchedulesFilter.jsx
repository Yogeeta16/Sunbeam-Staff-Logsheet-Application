import React from 'react';
import { Input } from '../ui/input';
import { Search } from 'lucide-react';

export const SchedulesFilter = ({ searchTerm, setSearchTerm }) => (
  <div className="flex items-center space-x-2 mb-4">
    <div className="relative flex-1 max-w-sm">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4"/>
      <Input
        placeholder="Search schedules..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="pl-10"
      />
    </div>
  </div>
);
