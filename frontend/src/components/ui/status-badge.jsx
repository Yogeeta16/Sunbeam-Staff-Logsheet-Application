import React from "react";
import { cn } from "../../lib/utils";

const statusConfig = {
  pending: {
    label: "Pending",
    className: "bg-warning-light text-warning border-warning/20",
  },
  approved: {
    label: "Approved",
    className: "bg-success-light text-success border-success/20",
  },
  rejected: {
    label: "Rejected",
    className: "bg-destructive-light text-destructive border-destructive/20",
  },
  active: {
    label: "Active",
    className: "bg-success-light text-success border-success/20",
  },
  inactive: {
    label: "Inactive",
    className: "bg-muted text-muted-foreground border-border",
  },
};

const StatusBadge = ({ status, className }) => {
  // Normalize status to lowercase
  const key = status?.toLowerCase();
  const config =
    statusConfig[key] || {
      label: status || "Unknown",
      className: "bg-muted text-muted-foreground border-border",
    };

  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border",
        config.className,
        className
      )}
    >
      {config.label}
    </span>
  );
};

export { StatusBadge };
