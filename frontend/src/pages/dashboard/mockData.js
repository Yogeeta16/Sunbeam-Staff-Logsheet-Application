import { Users, BookOpen, Clock, CheckCircle, AlertCircle, TrendingUp } from "lucide-react";

export const mockData = {
  coordinator: {
    stats: [
      { title: "Total Staff", value: 24, icon: Users, trend: { value: 8, label: "from last month", type: "positive" } },
      { title: "Active Courses", value: 12, icon: BookOpen, trend: { value: 2, label: "new this semester", type: "positive" } },
      { title: "Pending Logs", value: 8, icon: AlertCircle, trend: { value: -15, label: "from yesterday", type: "positive" } },
      { title: "Total Hours", value: 1248, icon: Clock, trend: { value: 12, label: "this month", type: "positive" } },
    ],
    pendingLogs: [
      { id: 1, staff: "Dr. Sarah Wilson", course: "CS101", date: "2024-01-15", type: "Lecture", status: "pending" },
      { id: 2, staff: "Prof. Mike Johnson", course: "CS201", date: "2024-01-15", type: "Lab", status: "pending" },
      { id: 3, staff: "Dr. Lisa Chen", course: "CS301", date: "2024-01-14", type: "Lecture", status: "pending" },
    ]
  },
  staff: {
    stats: [
      { title: "Assigned Schedules", value: 18, icon: BookOpen, trend: { value: 3, label: "this week", type: "positive" } },
      { title: "Logs Submitted", value: 45, icon: CheckCircle, trend: { value: 5, label: "this month", type: "positive" } },
      { title: "Pending Approval", value: 3, icon: AlertCircle, trend: { value: -2, label: "from yesterday", type: "positive" } },
      { title: "Approved Hours", value: 156, icon: TrendingUp, trend: { value: 12, label: "this month", type: "positive" } },
    ],
    recentLogs: [
      { id: 1, course: "CS101", date: "2024-01-15", status: "approved" },
      { id: 2, course: "CS201", date: "2024-01-14", status: "pending" },
      { id: 3, course: "CS101", date: "2024-01-13", status: "approved" },
    ]
  }
};
