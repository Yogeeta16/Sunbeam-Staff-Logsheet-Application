// src/components/modules/ModulesHeader.jsx
import React from "react";
import { Button } from "../ui/button";
import { Plus, Search } from "lucide-react";
import { Input } from "../ui/input";

export const ModulesHeader = ({ isCoordinator, onAdd, searchTerm, setSearchTerm }) => (
  <div className="flex justify-between items-center">
    <div>
      <h1 className="text-3xl font-bold">Modules</h1>
      <p className="text-muted-foreground">
        {isCoordinator
          ? "Manage course modules and learning units"
          : "View available modules and their content"}
      </p>
    </div>
    {isCoordinator && (
      <Button onClick={onAdd} className="bg-gradient-primary hover:opacity-90">
        <Plus className="w-4 h-4 mr-2" />
        Add Module
      </Button>
    )}
  </div>
);
