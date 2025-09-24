import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "../ui/dialog";
import { Button } from "../ui/button";
import { updateStaff, updatePassword } from "../../api/staff";
import { ProfileForm } from "../forms/ProfileForm";

const ProfileModal = ({ isOpen, onClose, mode, user }) => {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (mode === "editProfile" && user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        username: user.username || "",
        role: user.role || "Staff",
        phone: user.phone_number || "",
        department: user.department || "",
        location: user.office_location || "",
        joined_date: user.joined_date ? user.joined_date.split("T")[0] : "",
      });
    } else if (mode === "changePassword") {
      setFormData({ currentPassword: "", newPassword: "", confirmPassword: "" });
    }
  }, [mode, user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (mode === "editProfile") {
        await updateStaff(user.staff_id, {
          name: formData.name,
          email: formData.email,
          username: formData.username,
          role: formData.role,
          phone_number: formData.phone,
          department: formData.department,
          office_location: formData.location,
          joined_date: formData.joined_date,
        });
        alert("Profile updated successfully!");
      } else if (mode === "changePassword") {
        if (formData.newPassword !== formData.confirmPassword) {
          alert("New password and confirm password do not match");
          return;
        }
        await updatePassword(user.staff_id, formData.currentPassword, formData.newPassword);
        alert("Password updated successfully!");
      }
      onClose();
    } catch (error) {
      alert("Error: " + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{mode === "editProfile" ? "Edit Profile" : "Change Password"}</DialogTitle>
        </DialogHeader>

        <ProfileForm
          formData={formData}
          setFormData={setFormData}
          mode={mode}
          loading={loading}
          onSubmit={handleSubmit}
        />

        <DialogFooter className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileModal;
