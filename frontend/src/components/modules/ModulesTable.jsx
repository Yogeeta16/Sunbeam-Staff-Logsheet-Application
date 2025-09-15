// src/components/modules/ModulesTable.jsx
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Edit, Trash2 } from "lucide-react";

export const ModulesTable = ({ modules, isCoordinator, onEdit, onDelete, onDownload }) => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Module</TableHead>
            <TableHead>Course</TableHead>
            <TableHead>Curriculum</TableHead>
            {isCoordinator && <TableHead className="text-right">Actions</TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {modules.map((module) => (
            <TableRow key={module.module_id}>
              <TableCell>{module.module_name}</TableCell>
              <TableCell>
                <Badge variant="outline">{module.course_name}</Badge>
              </TableCell>
              <TableCell>
                {module.curriculum_file_path ? (
                  <button
                    className="text-blue-500 underline"
                    onClick={() => onDownload(module.curriculum_file_path)}
                  >
                    View PDF
                  </button>
                ) : (
                  "No file"
                )}
              </TableCell>
              {isCoordinator && (
                <TableCell className="text-right">
                  <div className="flex justify-end space-x-2">
                    <Button variant="ghost" size="sm" onClick={() => onEdit(module)}>
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => onDelete(module.module_id)}>
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
  );
};
