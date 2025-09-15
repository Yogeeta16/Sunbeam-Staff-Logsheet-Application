// src/components/courses/CoursesHeader.jsx
import React from "react";
import { Button } from "../ui/button";
import { Plus, Search } from "lucide-react";
import { Input } from "../ui/input";

export const CoursesHeader = ({ isCoordinator, onAdd, searchTerm, setSearchTerm }) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-2 md:space-y-0">
      <div>
        <h1 className="text-3xl font-bold">Courses</h1>
        <p className="text-muted-foreground">
          {isCoordinator ? "Manage courses and their modules" : "View available courses"}
        </p>
      </div>

      <div className="flex items-center space-x-2 w-full md:w-auto">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search courses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        {isCoordinator && (
          <Button onClick={onAdd} className="bg-gradient-primary hover:opacity-90">
            <Plus className="w-4 h-4 mr-2" />
            Add Course
          </Button>
        )}
      </div>
    </div>
  );
};
