import React from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";

export const ProfileForm = ({ formData, setFormData, mode, loading = false, onSubmit }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {mode === "editProfile" && (
        <>
          <div>
            <Label>Name</Label>
            <Input name="name" value={formData.name} onChange={handleChange} required />
          </div>
          <div>
            <Label>Email</Label>
            <Input type="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>
          <div>
            <Label>Username</Label>
            <Input name="username" value={formData.username} readOnly />
          </div>
          <div>
            <Label>Role</Label>
            <Input name="role" value={formData.role} readOnly />
          </div>
          <div>
            <Label>Phone</Label>
            <Input type="text" name="phone" value={formData.phone} onChange={handleChange} />
          </div>
          <div>
            <Label>Department</Label>
            <Input type="text" name="department" value={formData.department} onChange={handleChange} />
          </div>
          <div>
            <Label>Office Location</Label>
            <Input type="text" name="location" value={formData.location} onChange={handleChange} />
          </div>
          <div>
            <Label>Joined Date</Label>
            <Input type="date" name="joined_date" value={formData.joined_date} onChange={handleChange} required />
          </div>
        </>
      )}

      {mode === "changePassword" && (
        <>
          <div>
            <Label>Current Password</Label>
            <Input type="password" name="currentPassword" value={formData.currentPassword} onChange={handleChange} required />
          </div>
          <div>
            <Label>New Password</Label>
            <Input type="password" name="newPassword" value={formData.newPassword} onChange={handleChange} required />
          </div>
          <div>
            <Label>Confirm New Password</Label>
            <Input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
          </div>
        </>
      )}

      <div className="flex justify-end space-x-2 pt-4">
        <Button type="submit" className="bg-gradient-primary hover:opacity-90" disabled={loading}>
          {mode === "editProfile" ? "Save Changes" : "Update Password"}
        </Button>
      </div>
    </form>
  );
};
