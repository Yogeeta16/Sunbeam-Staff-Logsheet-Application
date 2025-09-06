import { Badge } from "../.././components/ui/Badge";
import "../../components/styles/components.css";

export function StatusBadge({ status }) {
  const variants = {
    approved: "bg-green-100 text-green-700 border-green-200",
    pending: "bg-yellow-100 text-yellow-700 border-yellow-200",
    rejected: "bg-red-100 text-red-700 border-red-200",
  };

  return (
    <Badge 
      variant="secondary" 
      className={variants[status] || "bg-gray-100 text-gray-700 border-gray-200"}
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  );
}
