import React from 'react';
import { Sidebar } from './Sidebar';
import { TopNavbar } from './TopNavbar';

export const Layout = ({ children }) => {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopNavbar />
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
         {/* <footer className="h-16 bg-card border-t border-border flex items-center justify-center px-6">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Staff Logsheet App. All rights reserved.
        </p>
      </footer> */}
      </div>
    </div>
  );
};
