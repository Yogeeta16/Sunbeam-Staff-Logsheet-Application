import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Plus, Upload, Download } from 'lucide-react';
import { uploadSchedules } from '../../api/schedules';
import { toast } from '../ui/use-toast';

export const ScheduleHeader = ({ isCoordinator, onAdd, onExport, onSampleDownload, fetchSchedules }) => {
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    try {
      const res = await uploadSchedules(file);
      toast({ title: "Success", description: `${res.totalInserted} schedules added.` });
      fetchSchedules();
    } catch (err) {
      console.error(err);
      toast({ title: "Error", description: "Failed to upload schedules" });
    } finally {
      setUploading(false);
      e.target.value = null;
    }
  };

  return (
    <div className="flex space-x-2">
      {isCoordinator && (
        <>
          <Button onClick={onAdd} className="bg-gradient-primary hover:opacity-90 flex items-center">
            <Plus className="w-4 h-4 mr-2" /> Add Schedule
          </Button>

          <label className="bg-gradient-primary hover:opacity-90 text-white flex items-center px-3 py-2 rounded cursor-pointer relative overflow-hidden">
            <Upload className="w-4 h-4 mr-2" />
            <span>{uploading ? "Uploading..." : "Upload"}</span>
            <input type="file" accept=".xlsx,.xls" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" onChange={handleUpload} disabled={uploading} />
          </label>

          <Button onClick={onSampleDownload} className="bg-gradient-primary hover:opacity-90 flex items-center">
            <Download className="w-4 h-4 mr-2" /> Sample File
          </Button>
        </>
      )}

      <Button onClick={onExport} className="bg-green-500 hover:bg-green-600 flex items-center">
        <Download className="w-4 h-4 mr-2" /> Export
      </Button>
      
    </div>
  );
};
