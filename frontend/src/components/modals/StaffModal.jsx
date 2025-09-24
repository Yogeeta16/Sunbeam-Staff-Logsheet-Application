import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '../ui/dialog';
import { Button } from '../ui/button';
import { useToast } from '../../hooks/use-toast';
import { updateStaff } from '../../api/staff';
import { StaffForm } from '../forms/StaffForm';

export const StaffModal = ({ isOpen, onClose, staff, onSaved }) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    username: '',
    role: 'Staff',
    phone_number: '',
    department: '',
    office_location: '',
    joined_date: '',
  });

  useEffect(() => {
    if (staff) {
      setFormData({
        name: staff.name || '',
        email: staff.email || '',
        username: staff.username || '',
        role: staff.role || 'Staff',
        phone_number: staff.phone_number || '',
        department: staff.department || '',
        office_location: staff.office_location || '',
        joined_date: staff.joined_date ? staff.joined_date.split('T')[0] : '',
      });
    } else {
      setFormData({
        name: '',
        email: '',
        username: '',
        role: 'Staff',
        phone_number: '',
        department: '',
        office_location: '',
        joined_date: '',
      });
    }
  }, [staff, isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.username) {
      toast({ title: 'Error', description: 'Name, Email, and Username are required.' });
      return;
    }

    try {
      setLoading(true);
      await updateStaff(staff.staff_id, formData);
      toast({ title: 'Staff Updated', description: 'Staff details updated successfully.' });
      onSaved();
      onClose();
    } catch (err) {
      toast({ title: 'Error', description: err.response?.data?.message || 'Failed to update staff.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{staff ? 'Edit Staff Member' : 'Add Staff Member'}</DialogTitle>
          <DialogDescription>
            {staff ? 'Update the staff member information below.' : 'Fill in the details to add a new staff member.'}
          </DialogDescription>
        </DialogHeader>

        <StaffForm
          formData={formData}
          setFormData={setFormData}
          loading={loading}
          onSubmit={handleSubmit}
          isEdit={!!staff}
        />

        <DialogFooter>
          <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
