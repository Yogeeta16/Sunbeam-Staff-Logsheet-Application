// src/components/Button.jsx
import React from "react";
import { cn } from "../../utils/cn";

const Button = React.forwardRef(
  ({ variant = "default", size = "default", className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn("btn", `btn-${variant}`, `btn-${size}`, className)}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button };
