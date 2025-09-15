import React from 'react';
import { Input } from '../ui/input';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '../ui/select';
import { Search, Filter } from 'lucide-react';

export const LogsheetsFilters = ({ searchTerm, setSearchTerm, statusFilter, setStatusFilter }) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-4">
      <div className="relative flex-1 max-w-sm">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input placeholder="Search logsheets..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-10" />
      </div>
      <Select value={statusFilter} onValueChange={setStatusFilter}>
        <SelectTrigger className="w-[180px]"><Filter className="w-4 h-4 mr-2" /><SelectValue placeholder="Filter by status" /></SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Status</SelectItem>
          <SelectItem value="Pending">Pending</SelectItem>
          <SelectItem value="Approved">Approved</SelectItem>
          <SelectItem value="Rejected">Rejected</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
