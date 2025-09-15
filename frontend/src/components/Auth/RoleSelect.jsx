import React from "react";
import { Label } from "../ui/label";

const RoleSelect = ({ value, onChange, disabled }) => (
  <div className="space-y-2">
    <Label htmlFor="role">Role</Label>
    <select
      id="role"
      name="role"
      value={value}
      onChange={onChange}
      disabled={disabled}
      className="w-full border rounded-md p-2"
    >
      <option value="Coordinator">Coordinator</option>
      <option value="Staff">Staff</option>
    </select>
  </div>
);

export default RoleSelect;
