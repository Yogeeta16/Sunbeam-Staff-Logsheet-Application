import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { BookOpen } from "lucide-react";

export const CoursesStats = ({ courses }) => {
  const totalModules = courses.reduce((sum, c) => sum + (c.modules_count || 0), 0);
  const activeCourses = courses.filter((c) => c.status.toLowerCase() === "active").length;

  return (
    <div className="grid gap-4 md:grid-cols-4">
      <Card>
        <CardHeader className="flex justify-between pb-2">
          <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
          <BookOpen className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{courses.length}</div>
          <p className="text-xs text-muted-foreground">{activeCourses} active</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex justify-between pb-2">
          <CardTitle className="text-sm font-medium">Total Modules</CardTitle>
          <BookOpen className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalModules}</div>
          <p className="text-xs text-muted-foreground">Learning modules</p>
        </CardContent>
      </Card>
    </div>
  );
};
