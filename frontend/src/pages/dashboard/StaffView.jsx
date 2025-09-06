import { Button } from "../.././components/ui/Button";
import { Badge } from "../.././components/ui/Badge";
import { Card, CardHeader, CardTitle, CardContent ,CardDescription} from "../.././components/ui/Card";
import { Table, TableHeader, TableRow, TableHead, TableCell,TableBody } from "../.././components/ui/Table";
import "../.././components/styles/components.css";
import { StatusBadge } from "./StatusBadge";

function StaffView({ data }) {
  console.log (data + 'staff');
    
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Recent Logs */}
      <Card>
        <CardHeader className="flex flex-row justify-between items-center">
          <div>
            <CardTitle>Recent Logsheets</CardTitle>
            <CardDescription>Your latest submitted logsheets</CardDescription>
          </div>
          <Button variant="outline" size="sm">View All</Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Course</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.recentLogs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell>{log.course}</TableCell>
                  <TableCell>{log.date}</TableCell>
                  <TableCell><StatusBadge status={log.status} /></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Upcoming Schedule */}
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Schedule</CardTitle>
          <CardDescription>Your next teaching sessions</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center p-3 border rounded-lg">
            <div>
              <p className="font-medium">CS101 - Intro to Programming</p>
              <p className="text-sm text-muted-foreground">Today, 2:00 PM - 4:00 PM</p>
            </div>
            <Badge variant="outline">Lecture</Badge>
          </div>
          <div className="flex justify-between items-center p-3 border rounded-lg">
            <div>
              <p className="font-medium">CS201 - Data Structures Lab</p>
              <p className="text-sm text-muted-foreground">Tomorrow, 10:00 AM - 12:00 PM</p>
            </div>
            <Badge variant="outline">Lab</Badge>
          </div>
          <Button className="w-full" variant="outline">View Full Schedule</Button>
        </CardContent>
      </Card>
    </div>
  );
}
export default StaffView; 