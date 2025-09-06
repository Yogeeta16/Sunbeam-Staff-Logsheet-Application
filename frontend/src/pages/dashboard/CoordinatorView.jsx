import { Users, BookOpen, Clock } from "lucide-react";
import { Button } from "../.././components/ui/Button";
import { Card, CardHeader, CardDescription,CardTitle, CardContent } from "../.././components/ui/Card";
import { Table, TableHeader,TableBody, TableRow, TableHead, TableCell } from "../.././components/ui/Table";
import { StatsCard } from "../.././components/ui/StatsCard";
import "../.././components/styles/components.css";

function CoordinatorView({ data }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
       <div className="dashboard-grid">
        {data.stats.map((stat, index) => (
          <StatsCard
            key={index}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
         
          />
        ))}
      </div>
      {/* Pending Logsheets */}
      <Card>
        <CardHeader className="flex flex-row justify-between items-center">
          <div>
            <CardTitle>Pending Logsheets</CardTitle>
            <CardDescription>Logsheets awaiting your approval</CardDescription>
          </div>
          <Button variant="outline" size="sm">View All</Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Staff</TableHead>
                <TableHead>Course</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.pendingLogs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell>{log.staff}</TableCell>
                  <TableCell>{log.course}</TableCell>
                  <TableCell>{log.date}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">Approve</Button>
                      <Button size="sm" variant="outline">Reject</Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common tasks and shortcuts</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button className="w-full justify-start" variant="outline">
            <Users className="mr-2 h-4 w-4" /> Add New Staff
          </Button>
          <Button className=" justify-start" variant="outline">
            <BookOpen className="mr-2 h-4 w-4" /> Create New Course
          </Button>
          <Button className="w-full justify-start" variant="outline">
            <Clock className="mr-2 h-4 w-4" /> Schedule Bulk Upload
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
export default CoordinatorView; 