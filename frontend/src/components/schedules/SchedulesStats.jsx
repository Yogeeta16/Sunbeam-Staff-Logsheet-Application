import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { CalendarDays, Clock, FileText } from "lucide-react";

export const SchedulesStats = ({ schedules }) => {
  const stats = {
    total: schedules.length,
    byType: schedules.reduce((acc, s) => {
      acc[s.type] = (acc[s.type] || 0) + 1;
      return acc;
    }, {}),
  };

  const typeIcons = {
    Exam: <FileText className="h-4 w-4 text-muted-foreground" />,
    Lecture: <CalendarDays className="h-4 w-4 text-muted-foreground" />,
    Meeting: <Clock className="h-4 w-4 text-muted-foreground" />,
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Total schedules */}
      <Card>
        <CardHeader className="flex justify-between pb-2">
          <CardTitle className="text-sm font-medium">Total Schedules</CardTitle>
          <CalendarDays className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.total}</div>
          <p className="text-xs text-muted-foreground">
            {Object.keys(stats.byType).length} types
          </p>
        </CardContent>
      </Card>

      {/* By type */}
      {Object.keys(stats.byType).map((type) => (
        <Card key={type}>
          <CardHeader className="flex justify-between pb-2">
            <CardTitle className="text-sm font-medium">{type}</CardTitle>
            {typeIcons[type] || (
              <Clock className="h-4 w-4 text-muted-foreground" />
            )}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.byType[type]}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
