import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { useToast } from '../../hooks/use-toast';

export const ModulesModal = ({ isOpen, onClose, module, onSave, courses }) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    module_name: '',
    course_id: '',
  });
  const [file, setFile] = useState(null);
  const [existingFilePath, setExistingFilePath] = useState(null); // track existing file

  useEffect(() => {
    if (module) {
      setFormData({
        module_name: module.module_name || '',
        course_id: module.course_id?.toString() || '',
      });
      setFile(null);
      setExistingFilePath(module.curriculum_file_path || null); // store existing file
    } else {
      setFormData({ module_name: '', course_id: '' });
      setFile(null);
      setExistingFilePath(null);
    }
  }, [module, isOpen]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.module_name || !formData.course_id) {
      toast({ title: 'Error', description: 'Module name and course are required.' });
      return;
    }

    // Use selected file if present, else use existing file path
    const fileToSend = file || existingFilePath;

    onSave({ ...formData, course_id: formData.course_id.toString() }, fileToSend);

    toast({
      title: module ? 'Module Updated' : 'Module Added',
      description: module
        ? 'Module has been successfully updated.'
        : 'New module has been successfully added.',
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{module ? 'Edit Module' : 'Add New Module'}</DialogTitle>
          <DialogDescription>
            {module
              ? 'Update the module information below.'
              : 'Fill in the details to add a new module.'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="module_name">Module Name</Label>
            <Input
              id="module_name"
              value={formData.module_name}
              onChange={(e) => handleInputChange('module_name', e.target.value)}
              placeholder="Enter module name"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="course_id">Course</Label>
            <Select
              value={formData.course_id || ''}
              onValueChange={(value) => handleInputChange('course_id', value)}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Select course" />
              </SelectTrigger>
              <SelectContent>
                {courses.map((c) => (
                  <SelectItem key={c.course_id} value={c.course_id.toString()}>
                    {c.course_name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="curriculum_file">Curriculum PDF</Label>
            <Input id="curriculum_file" type="file" accept="application/pdf" onChange={handleFileChange} />
            {existingFilePath && !file && (
              <a
                href={existingFilePath}
                target="_blank"
                rel="noreferrer"
                className="text-blue-500 underline text-sm"
              >
                View Current PDF
              </a>
            )}
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-gradient-primary hover:opacity-90">
              {module ? 'Update Module' : 'Add Module'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
