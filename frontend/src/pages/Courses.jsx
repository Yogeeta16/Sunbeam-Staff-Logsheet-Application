import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { StatusBadge } from '../components/ui/status-badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../components/ui/table';
import { Plus, Search, Edit, Trash2, Eye, Ban, BookOpen } from 'lucide-react';
import { CoursesModal } from '../components/modals/CoursesModal';
import { getCourses, createCourse, updateCourse, deleteCourse } from '../api';

const Courses = () => {
  const { user } = useAuth();
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isViewMode, setIsViewMode] = useState(false);

  // ✅ Fix: normalize role
  const isCoordinator = user?.role?.toLowerCase() === 'coordinator';

  // Fetch all courses
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCourses();
        setCourses(data);
      } catch (error) {
        console.error('Error fetching courses:', error.response?.data || error.message);
      }
    };
    fetchData();
  }, []);

  // Search filter
  const filteredCourses = courses.filter(
    (course) =>
      course.course_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.course_coordinator_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (course) => {
    setSelectedCourse(course);
    setIsViewMode(false);
    setIsModalOpen(true);
  };

  const handleView = (course) => {
    setSelectedCourse(course);
    setIsViewMode(true);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setSelectedCourse(null);
    setIsViewMode(false);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
     if (!confirm('Are you sure you want to delete this course?')) return;
    try {
      await deleteCourse(id);
      setCourses(courses.filter((c) => c.course_id !== id));
    } catch (error) {
      console.error('Error deleting course:', error.response?.data || error.message);
    }
  };

  const handleSave = async (formData) => {
    try {
      if (selectedCourse) {
        // Update existing
        await updateCourse(selectedCourse.course_id, formData);
        setCourses(
          courses.map((c) =>
            c.course_id === selectedCourse.course_id ? { ...c, ...formData } : c
          )
        );
      } else {
        // Create new
        const newCourse = await createCourse(formData);
        setCourses([...courses, { course_id: newCourse.id, ...formData }]);
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error saving course:', error.response?.data || error.message);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Courses</h1>
          <p className="text-muted-foreground">
            {isCoordinator
              ? 'Manage courses and their modules'
              : 'View available courses and modules'}
          </p>
        </div>
        {isCoordinator && (
          <Button onClick={handleAdd} className="bg-gradient-primary hover:opacity-90">
            <Plus className="w-4 h-4 mr-2" />
            Add Course
          </Button>
        )}
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{courses.length}</div>
            <p className="text-xs text-muted-foreground">
              {courses.filter((c) => c.status.toLowerCase() === 'active').length} active
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Modules</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {courses.reduce((sum, course) => sum + (course.modules_count || 0), 0)}
            </div>
            <p className="text-xs text-muted-foreground">Learning modules</p>
          </CardContent>
        </Card>
      </div>

      {/* Search + Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Courses</CardTitle>
          <CardDescription>
            {isCoordinator ? 'Manage your courses' : 'Browse available courses'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Course</TableHead>
                  <TableHead>Coordinator</TableHead>
                  <TableHead>Modules</TableHead>
                  <TableHead>Status</TableHead>
                  {isCoordinator && <TableHead className="text-right">Actions</TableHead>}
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCourses.map((course) => (
                  <TableRow key={course.course_id}>
                    <TableCell className="font-medium">{course.course_name}</TableCell>
                    <TableCell>{course.course_coordinator_name}</TableCell>
                    <TableCell>{course.modules_count}</TableCell>
                    <TableCell>
                      <StatusBadge status={course.status.toLowerCase()} />
                    </TableCell>
                    {isCoordinator && (
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <Button variant="ghost" size="sm" onClick={() => handleEdit(course)}>
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => handleView(course)}>
                            <Eye className="w-4 h-4" />
                          </Button>
                         
                          <Button variant="ghost" size="sm" onClick={() => handleDelete(course.course_id)}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Modal */}
      <CoursesModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        course={selectedCourse}
        onSave={handleSave}
        readOnly={isViewMode}
      />
    </div>
  );
};

export default Courses;
