import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { downloadOption } from '../../api/utils';

export const MyUploadsTable = ({ uploads }) => (
  <div className="rounded-md border">
    
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>File</TableHead>
          <TableHead>Uploaded At</TableHead>
          <TableHead>Uploaded By</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {uploads.length > 0 ? (
          uploads.map((upload) => (
            <TableRow key={upload.upload_id}>
              <TableCell className="font-medium">{upload.upload_id}</TableCell>
              <TableCell>
                {upload.file_path ? (
                  <button
                    className="text-blue-600 hover:underline"
                    onClick={() =>
                      downloadOption(upload.file_path, 'schedules', true)
                    }
                  >
                    {upload.file_path.split('/').pop()}
                  </button>
                ) : (
                  'No file'
                )}
              </TableCell>
              <TableCell>
                {new Date(upload.uploaded_at).toLocaleDateString()}
              </TableCell>
              <TableCell>{upload.uploaded_by_name}</TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={4} className="text-center text-sm text-muted-foreground">
              No schedules uploaded.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  </div>
);
