import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card";
import { cn } from "../../utils/cn";
export function StatsCard({
  title,
  value,
  description,
  icon: Icon,
  className,
}) {
  return (
    <Card className={cn("stats-card", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        {Icon && <Icon className="h-4 w-4 text-muted-foreground" />}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {description && (
          <p className="text-xs text-muted-foreground mt-1">{description}</p>
        )}
       
      </CardContent>
    </Card>
  );
}
