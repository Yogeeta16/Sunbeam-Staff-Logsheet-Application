import React from 'react';
import { Table, TableHeader, TableRow, TableHead, TableCell, TableBody } from '../ui/table';
import { Button } from '../ui/button';
import { Edit, Eye, Trash2 } from 'lucide-react';
export const SchedulesTable = ({ schedules, isCoordinator, onEdit, onView, onDelete }) => {
  const formatDate = (date) => date ? new Date(date).toLocaleDateString("en-GB") : "-";

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Course</TableHead>
            <TableHead>Module</TableHead>
            <TableHead>Faculty</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Time</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Venue</TableHead>
            {isCoordinator && <TableHead className="text-right">Actions</TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {schedules.length > 0 ? (
            schedules.map((s) => (
              <TableRow key={s.schedule_id}>
                <TableCell>{s.schedule_id}</TableCell>
                <TableCell>{s.course_name}</TableCell>
                <TableCell>{s.module_name}</TableCell>
                <TableCell>{s.faculty_name}</TableCell>
                <TableCell>{formatDate(s.date)}</TableCell>
                <TableCell>{s.start_time} - {s.end_time}</TableCell>
                <TableCell>{s.type}</TableCell>
                <TableCell>{s.venue || "-"}</TableCell>
                {isCoordinator && (
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button variant="ghost" size="sm" onClick={() => onEdit(s)}><Edit className="w-4 h-4" /></Button>
                      <Button variant="ghost" size="sm" onClick={() => onView(s)}><Eye className="w-4 h-4" /></Button>
                      <Button variant="ghost" size="sm" onClick={() => onDelete(s.schedule_id)}><Trash2 className="w-4 h-4" /></Button>
                    </div>
                  </TableCell>
                )}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={isCoordinator ? 9 : 8} className="text-center text-muted-foreground py-6">
                No schedules found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
