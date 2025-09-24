import React from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

export const StaffForm = ({ formData, setFormData, loading, onSubmit, isEdit }) => {
  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {/* Name */}
      <div className="space-y-2">
        <Label>Name</Label>
        <Input
          value={formData.name}
          onChange={e => handleChange('name', e.target.value)}
          placeholder="Enter full name"
          required
        />
      </div>

      {/* Email */}
      <div className="space-y-2">
        <Label>Email</Label>
        <Input
          type="email"
          value={formData.email}
          onChange={e => handleChange('email', e.target.value)}
          placeholder="Enter email"
          required
        />
      </div>

      {/* Username */}
      <div className="space-y-2">
        <Label>Username</Label>
        <Input
          value={formData.username}
          onChange={e => handleChange('username', e.target.value)}
          placeholder="Enter username"
          required
          disabled={isEdit} // block editing in edit mode
        />
      </div>

      {/* Role */}
      <div className="space-y-2">
        <Label>Role</Label>
        <Select value={formData.role} onValueChange={val => handleChange('role', val)} disabled={isEdit}>
          <SelectTrigger>
            <SelectValue placeholder="Select role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Coordinator">Coordinator</SelectItem>
            <SelectItem value="Staff">Staff</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Phone */}
      <div className="space-y-2">
        <Label>Phone Number</Label>
        <Input
          value={formData.phone_number}
          onChange={e => handleChange('phone_number', e.target.value)}
          placeholder="Enter phone number"
        />
      </div>

      {/* Department */}
      <div className="space-y-2">
        <Label>Department</Label>
        <Input
          value={formData.department}
          onChange={e => handleChange('department', e.target.value)}
          placeholder="Enter department"
        />
      </div>

      {/* Office Location */}
      <div className="space-y-2">
        <Label>Office Location</Label>
        <Input
          value={formData.office_location}
          onChange={e => handleChange('office_location', e.target.value)}
          placeholder="Enter office location"
        />
      </div>

      {/* Joined Date */}
      <div className="space-y-2">
        <Label>Joined Date</Label>
        <Input
          type="date"
          value={formData.joined_date}
          onChange={e => handleChange('joined_date', e.target.value)}
        />
      </div>

      <div className="flex justify-end space-x-2 pt-4">
        <Button type="submit" className="bg-gradient-primary hover:opacity-90" disabled={loading}>
          {isEdit ? 'Update Staff' : 'Add Staff'}
        </Button>
      </div>
    </form>
  );
};
