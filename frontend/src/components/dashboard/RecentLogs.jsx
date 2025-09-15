import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../ui/card";
import { Button } from "../ui/button";
import { ClipboardList, CheckCircle, AlertCircle } from "lucide-react";
import { StatusBadge } from "../ui/status-badge";

export const RecentLogs = ({ logs, isCoordinator }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <ClipboardList className="w-5 h-5 mr-2" />
          {isCoordinator ? "Recent Logsheets" : "My Recent Logs"}
        </CardTitle>
        <CardDescription>
          {isCoordinator
            ? "Latest submissions requiring attention"
            : "Your recent logsheet submissions"}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {logs.length > 0 ? (
          logs.map((log) => (
            <div key={log.id} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex-1">
                {isCoordinator && <p className="font-medium text-sm">{log.staffName}</p>}
                <p className="text-sm text-muted-foreground">{log.course}</p>
                <p className="text-xs text-muted-foreground">
                  {new Date(log.date).toLocaleDateString()} • {log.hours ? `${log.hours} hrs` : log.type || ""}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <StatusBadge status={log.status?.toLowerCase()} />
                {isCoordinator && log.status?.toLowerCase() === "pending" && (
                  <div className="flex space-x-1">
                    <Button size="sm" variant="outline" className="h-8 px-2">
                      <CheckCircle className="w-3 h-3" />
                    </Button>
                    <Button size="sm" variant="outline" className="h-8 px-2">
                      <AlertCircle className="w-3 h-3" />
                    </Button>
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="text-sm text-muted-foreground">No logs available</p>
        )}
      </CardContent>
    </Card>
  );
};
