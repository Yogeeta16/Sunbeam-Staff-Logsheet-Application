import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  LayoutDashboard,
  Users,
  BookOpen,
  Layers,
  ClipboardList,
  Calendar,
  User,
  GraduationCap,
  LogOut,
} from 'lucide-react';
import { Button } from '../ui/button';
import { cn } from '../../lib/utils';

const coordinatorNavItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
  { icon: Users, label: 'Staff Management', path: '/staff' },
  { icon: BookOpen, label: 'Courses', path: '/courses' },
  { icon: Layers, label: 'Modules', path: '/modules' },
  { icon: ClipboardList, label: 'Logsheets', path: '/logsheets' },
  { icon: Calendar, label: 'Schedules', path: '/schedules' },
  { icon: Calendar, label: 'My Uploads', path: '/myuploads' },
  { icon: User, label: 'Profile', path: '/profile' },
];

const staffNavItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
  { icon: Calendar, label: 'My Schedules', path: '/schedules' },
  { icon: ClipboardList, label: 'My Logsheets', path: '/logsheets' },
  { icon: BookOpen, label: 'Courses', path: '/courses' },
  { icon: Layers, label: 'Modules', path: '/modules' },
  { icon: User, label: 'Profile', path: '/profile' },
];

export const Sidebar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

const navItems = user?.role?.toLowerCase() === 'coordinator' ? coordinatorNavItems : staffNavItems;

  return (
    <div className="w-64 bg-card border-r border-border flex flex-col h-full">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
            <GraduationCap className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="font-bold text-lg">Staff Logsheet</h1>
            <p className="text-xs text-muted-foreground">Management System</p>
          </div>
        </div>
      </div>

      {/* User Info */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
            <span className="text-primary-foreground font-medium">
              {user?.name?.charAt(0)}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-medium text-sm truncate">{user?.name}</p>
            <p className="text-xs text-muted-foreground capitalize">{user?.role}</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={cn(
                'flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              )}
            >
              <Icon className="w-4 h-4" />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-border">
        <Button
          variant="ghost"
          size="sm"
          onClick={logout}
          className="w-full justify-start"
        >
          <LogOut className="w-4 h-4 mr-3" />
          Logout
        </Button>
      </div>
    </div>
  );
};
