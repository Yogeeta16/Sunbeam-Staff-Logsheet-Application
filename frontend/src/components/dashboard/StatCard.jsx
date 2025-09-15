import React from "react";
import { Users, BookOpen, ClipboardList, Clock, TrendingUp, Calendar, CheckCircle, AlertCircle } from "lucide-react";

const iconMap = { Users, BookOpen, ClipboardList, Clock, TrendingUp, Calendar, CheckCircle, AlertCircle };

export const StatCard = ({ title, value, icon }) => {
  const Icon = iconMap[icon] || Users;
  return (
    <div className="hover:shadow-md transition-shadow border rounded-lg">
      <div className="flex flex-row items-center justify-between p-3">
        <h3 className="text-sm font-medium">{title}</h3>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </div>
      <div className="p-3 text-2xl font-bold">{value}</div>
    </div>
  );
};
