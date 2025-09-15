import React from 'react';
import { Card, CardHeader, CardContent, CardTitle } from '../ui/card';

export const LogsheetsStats = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card>
        <CardHeader className="pb-2"><CardTitle>Total</CardTitle></CardHeader>
        <CardContent><p className="text-2xl font-bold">{stats.total}</p></CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2"><CardTitle>Pending</CardTitle></CardHeader>
        <CardContent><p className="text-2xl font-bold text-yellow-600">{stats.pending}</p></CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2"><CardTitle>Approved</CardTitle></CardHeader>
        <CardContent><p className="text-2xl font-bold text-green-600">{stats.approved}</p></CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2"><CardTitle>Rejected</CardTitle></CardHeader>
        <CardContent><p className="text-2xl font-bold text-red-600">{stats.rejected}</p></CardContent>
      </Card>
    </div>
  );
};
