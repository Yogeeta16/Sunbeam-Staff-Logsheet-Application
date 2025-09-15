import React from "react";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "../ui/table";
import { Input } from "../ui/input";
import { Search, Edit, Eye, Trash2 } from "lucide-react";
import { StatusBadge } from "../ui/status-badge";
import { Button } from "../ui/button";

export const CoursesTable = ({
  courses,
  searchTerm,
  setSearchTerm,
  isCoordinator,
  onEdit,
  onView,
  onDelete,
}) => {
  const filteredCourses = courses.filter(
    (c) =>
      c.course_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.coordinator_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="flex items-center space-x-2 mb-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search courses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Course</TableHead>
              <TableHead>Coordinator</TableHead>
              <TableHead>Modules</TableHead>
              <TableHead>Status</TableHead>
              {isCoordinator && <TableHead className="text-right">Actions</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCourses.map((course) => (
              <TableRow key={course.course_id}>
                <TableCell className="font-medium">{course.course_name}</TableCell>
                <TableCell>{course.coordinator_name}</TableCell>
                <TableCell>{course.modules_count}</TableCell>
                <TableCell>
                  <StatusBadge status={course.status.toLowerCase()} />
                </TableCell>
                {isCoordinator && (
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button variant="ghost" size="sm" onClick={() => onEdit(course)}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => onView(course)}>
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => onDelete(course.course_id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
