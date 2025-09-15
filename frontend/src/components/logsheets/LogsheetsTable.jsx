import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Badge } from '../ui/badge';
import { StatusBadge } from '../ui/status-badge';
import { Button } from '../ui/button';
import { Eye, Trash2, Check, X, Pencil } from 'lucide-react';

export const LogsheetsTable = ({
  logsheets,
  isCoordinator,
  handleView,
  handleEdit,
  handleDelete,
  handleApproveReject
}) => (
  <div className="rounded-md border overflow-x-auto">
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Logsheet ID</TableHead>
          <TableHead>Schedule ID</TableHead>
          <TableHead>Faculty</TableHead>
          <TableHead>Course</TableHead>
          <TableHead>Module</TableHead>
          <TableHead>Coordinator</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Time</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {logsheets.map(log => (
          <TableRow key={log.logsheet_id}>
            <TableCell>{log.logsheet_id}</TableCell>
            <TableCell>{log.schedule_id}</TableCell>
            <TableCell>{log.faculty_name}</TableCell>
            <TableCell>{log.course_name}</TableCell>
            <TableCell>{log.module_name}</TableCell>
            <TableCell>{log.coordinator_name}</TableCell>
            <TableCell>{new Date(log.date).toLocaleDateString('en-GB')}</TableCell>
            <TableCell><Badge variant="outline">{log.start_time} - {log.end_time}</Badge></TableCell>
            <TableCell>{log.type}</TableCell>
            <TableCell><StatusBadge status={log.status} /></TableCell>
            <TableCell className="text-right flex justify-end space-x-2">
              <Button variant="ghost" size="sm" onClick={() => handleView(log)}><Eye className="w-4 h-4" /></Button>

              {!isCoordinator && log.status === 'Pending' && (
                <>
                  <Button variant="ghost" size="sm" onClick={() => handleEdit(log)}><Pencil className="w-4 h-4" /></Button>
                  <Button variant="ghost" size="sm" onClick={() => handleDelete(log.logsheet_id)}><Trash2 className="w-4 h-4" /></Button>
                </>
              )}

              {isCoordinator && log.status === 'Pending' && (
                <>
                  <Button variant="ghost" size="sm" onClick={() => handleApproveReject(log.logsheet_id, 'Approved')}><Check className="w-4 h-4" /></Button>
                  <Button variant="ghost" size="sm" onClick={() => handleApproveReject(log.logsheet_id, 'Rejected')}><X className="w-4 h-4" /></Button>
                </>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </div>
);
