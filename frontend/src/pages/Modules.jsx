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
import { Badge } from '../components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../components/ui/table';
import { Plus, Search, Edit, Trash2 } from 'lucide-react';
import { ModulesModal } from '../components/modals/ModulesModal';
import { getModules, createModule, updateModule, deleteModule, getCourses } from '../api';

const Modules = () => {
  const { user } = useAuth();
  const [modules, setModules] = useState([]);
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedModule, setSelectedModule] = useState(null);

  const isCoordinator = user?.role.toLowerCase() === 'coordinator';

  const fetchModules = async () => {
    try {
      const data = await getModules();
      setModules(data);
    } catch (err) {
      console.error('Error fetching modules:', err);
    }
  };

  const fetchCourses = async () => {
    try {
      const data = await getCourses();
      setCourses(data);
    } catch (err) {
      console.error('Error fetching courses:', err);
    }
  };

  useEffect(() => {
    fetchModules();
    fetchCourses();
  }, []);

  const filteredModules = modules.filter(
    (m) =>
      m.module_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.course_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAdd = () => {
    setSelectedModule(null);
    setIsModalOpen(true);
  };

  const handleEdit = (module) => {
    setSelectedModule(module);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this module?')) return;
    try {
      await deleteModule(id);
      setModules((prev) => prev.filter((m) => m.module_id !== id));
    } catch (err) {
      console.error('Error deleting module:', err);
    }
  };

  const handleSave = async (moduleData, uploadedFile) => {
    try {
      if (selectedModule) {
        await updateModule(selectedModule.module_id, moduleData, uploadedFile);
      } else {
        await createModule(moduleData, uploadedFile);
      }
      await fetchModules();
      setIsModalOpen(false);
    } catch (err) {
      console.error('Error saving module:', err);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Modules</h1>
          <p className="text-muted-foreground">
            {isCoordinator
              ? 'Manage course modules and learning units'
              : 'View available modules and their content'}
          </p>
        </div>
        {isCoordinator && (
          <Button onClick={handleAdd} className="bg-gradient-primary hover:opacity-90">
            <Plus className="w-4 h-4 mr-2" />
            Add Module
          </Button>
        )}
      </div>

      {/* Modules Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Modules</CardTitle>
          <CardDescription>
            {isCoordinator ? 'Manage course modules' : 'Browse available modules'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search modules..."
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
                  <TableHead>Module</TableHead>
                  <TableHead>Course</TableHead>
                  <TableHead>Curriculum</TableHead>
                  {isCoordinator && <TableHead className="text-right">Actions</TableHead>}
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredModules.map((module) => (
                  <TableRow key={module.module_id}>
                    <TableCell>{module.module_name}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{module.course_name}</Badge>
                    </TableCell>
                    <TableCell>
                      {module.curriculum_file_path ? (
                        <a
                          href={module.curriculum_file_path}
                          target="_blank"
                          rel="noreferrer"
                          className="text-blue-500 underline"
                        >
                          View PDF
                        </a>
                      ) : (
                        'No file'
                      )}
                    </TableCell>
                    {isCoordinator && (
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <Button variant="ghost" size="sm" onClick={() => handleEdit(module)}>
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(module.module_id)}
                          >
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

      <ModulesModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        module={selectedModule}
        onSave={handleSave}
        courses={courses}
      />
    </div>
  );
};

export default Modules;
