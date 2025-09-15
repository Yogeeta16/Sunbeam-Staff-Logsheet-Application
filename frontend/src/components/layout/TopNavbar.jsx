import React, { useEffect, useState } from 'react';
import { Bell, Search } from 'lucide-react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { useAuth } from '../../context/AuthContext';
import { getLogsheets } from '../../api/logsheets';

export const TopNavbar = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({ pending: 0, approved: 0 });

  useEffect(() => {
    if (!user) return; // wait for auth

    let cancelled = false;

    const fetchStats = async () => {
      try {
        let logs = await getLogsheets();

        // Normalize response shape to an array
        if (!Array.isArray(logs)) {
          logs = logs?.data ?? logs?.logs ?? [];
        }
        if (!Array.isArray(logs)) {
          console.warn('getLogsheets returned unexpected payload:', logs);
          logs = [];
        }

        // If backend returns results already filtered for the role,
        // do NOT filter further for coordinators.
        if (String(user.role || '').toLowerCase() !== 'coordinator') {
          // staff: keep only their logs
          logs = logs.filter(l => String(l.faculty_id) === String(user.id));
        } else {
          // coordinator: keep logs as returned by backend (assumed "all"),
          // if you actually want coordinators limited to those they coordinate,
          // uncomment the next line:
          // logs = logs.filter(l => String(l.course_coordinator_id) === String(user.id));
        }

        const normalize = (s) => String(s ?? '').trim().toLowerCase();
        const pendingCount = logs.filter(l => normalize(l.status) === 'pending').length;
        const approvedCount = logs.filter(l => normalize(l.status) === 'approved').length;

        if (!cancelled) setStats({ pending: pendingCount, approved: approvedCount });

        console.log('logsheet stats', { pendingCount, approvedCount, logsCount: logs.length });
      } catch (err) {
        console.error('Failed to fetch logsheet stats:', err);
      }
    };

    fetchStats();
    return () => { cancelled = true; };
  }, [user]);

  return (
    <header className="h-16 bg-card border-b border-border flex items-center justify-between px-6">
      <div className="flex-1 max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input placeholder="Search..." className="pl-10" />
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative">
          <Button variant="ghost" size="sm" className="relative">
            <Bell className="w-4 h-4" />
            {stats.pending > 0 && (
              <Badge className="absolute -top-1 -right-1 w-5 h-5 text-xs flex items-center justify-center p-0 bg-destructive">
                {stats.pending}
              </Badge>
            )}
          </Button>
        </div>

        <div className="hidden md:flex items-center space-x-4 text-sm">
          <div className="text-center">
            <p className="font-medium">{stats.pending}</p>
            <p className="text-muted-foreground text-xs">Pending</p>
          </div>
          <div className="text-center">
            <p className="font-medium">{stats.approved}</p>
            <p className="text-muted-foreground text-xs">Approved</p>
          </div>
        </div>
      </div>
    </header>
  );
};
