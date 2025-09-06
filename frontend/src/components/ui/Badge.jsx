// src/components/Badge.jsx
import React from "react";
import { cn } from "../../utils/cn";

function Badge({ variant = "default", className, ...props }) {
  return (
    <div
      className={cn("badge", `badge-${variant}`, className)}
      {...props}
    />
  );
}

export { Badge };
