import React from "react";
import { CardHeader, CardTitle, CardDescription } from "../ui/card";
import { UserPlus } from "lucide-react";

const AuthCardHeader = ({ title, description }) => (
  <CardHeader className="text-center space-y-4">
    <div className="mx-auto w-12 h-12  rounded-full flex items-center justify-center">
      <img
        src="/sunbeam.png"
        alt="Sunbeam Logo"
        className="w-15 h-15 "
      />
    </div>
    <div>
      <CardTitle className="text-2xl font-bold">{title}</CardTitle>
      <CardDescription>{description}</CardDescription>
    </div>
  </CardHeader>
);

export default AuthCardHeader;
