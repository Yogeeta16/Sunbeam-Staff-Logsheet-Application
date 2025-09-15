import React from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Loader2 } from "lucide-react";
import RoleSelect from "./RoleSelect";

const SignupForm = ({ formData, handleChange, handleSubmit, isLoading }) => {
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {["name", "email", "username", "password"].map((field) => (
        <div key={field} className="space-y-2">
          <Label htmlFor={field}>{field.charAt(0).toUpperCase() + field.slice(1)}</Label>
          <Input
            id={field}
            name={field}
            type={field === "password" ? "password" : "text"}
            placeholder={`Enter your ${field}`}
            value={formData[field]}
            onChange={handleChange}
            required
            disabled={isLoading}
          />
        </div>
      ))}

      <RoleSelect value={formData.role} onChange={handleChange} disabled={isLoading} />

      <Button
        type="submit"
        className="w-full bg-gradient-primary hover:opacity-90"
        disabled={isLoading}
      >
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Sign Up
      </Button>
    </form>
  );
};

export default SignupForm;
