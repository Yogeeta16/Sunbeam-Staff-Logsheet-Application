import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '../ui/dialog';
import { Button } from '../ui/button';
import { ModuleForm } from '../forms/ModuleForm';

export const ModulesModal = ({ isOpen, onClose, module, onSave, courses }) => {
  const [formData, setFormData] = useState({ module_name: '', course_id: '', curriculum_file_path: '' });

  useEffect(() => {
    if (module) {
      setFormData({
        module_name: module.module_name || '',
        course_id: module.course_id?.toString() || '',
        curriculum_file_path: module.curriculum_file_path || null,
      });
    } else {
      setFormData({ module_name: '', course_id: '', curriculum_file_path: '' });
    }
  }, [module, isOpen]);

  const handleSubmit = (data, file) => {
    onSave(data, file);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{module ? 'Edit Module' : 'Add New Module'}</DialogTitle>
          <DialogDescription>
            {module ? 'Update the module information below.' : 'Fill in the details to add a new module.'}
          </DialogDescription>
        </DialogHeader>

        <ModuleForm
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleSubmit}
          courses={courses}
        />

        <DialogFooter>
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
