import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { LogsheetsStats } from '../components/logsheets/LogsheetsStats';
import { LogsheetsFilters } from '../components/logsheets/LogsheetsFilters';
import { LogsheetsTable } from '../components/logsheets/LogsheetsTable';
import { LogsheetsModal } from '../components/modals/LogsheetsModal';
import { toast } from '../hooks/use-toast';
import { getLogsheets, deleteLogsheet, updateLogsheetStatus } from '../api/logsheets';
import { LogsheetsHeader } from '../components/logsheets/LogsheetsHeader';

const Logsheets = () => {
  const { user } = useAuth();
  const isCoordinator = user?.role?.toLowerCase() === 'coordinator';
  const [logsheets, setLogsheets] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLogsheet, setSelectedLogsheet] = useState(null);
  const [viewOnly, setViewOnly] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchLogsheets = async () => {
    setLoading(true);
    try {
      const data = await getLogsheets();
      setLogsheets(data);
    } catch {
      toast({ title: 'Error fetching logsheets', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchLogsheets(); }, []);

  const filteredLogsheets = logsheets.filter(log => {
    const matchesSearch =
      log.faculty_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.course_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.module_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.coordinator_name?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || log.status?.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: logsheets.length,
    pending: logsheets.filter(l => l.status === 'Pending').length,
    approved: logsheets.filter(l => l.status === 'Approved').length,
    rejected: logsheets.filter(l => l.status === 'Rejected').length,
  };

  const handleAdd = () => { setSelectedLogsheet(null); setViewOnly(false); setIsModalOpen(true); };
  const handleView = (log) => { setSelectedLogsheet(log); setViewOnly(true); setIsModalOpen(true); };
  const handleEdit = (log) => { setSelectedLogsheet(log); setViewOnly(false); setIsModalOpen(true); };
  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this logsheet?')) return;
    try {
      await deleteLogsheet(id);
      setLogsheets(prev => prev.filter(l => l.logsheet_id !== id));
      toast({ title: 'Logsheet deleted' });
    } catch {
      toast({ title: 'Delete failed', variant: 'destructive' });
    }
  };
  const handleApproveReject = async (id, status) => {
    try {
      await updateLogsheetStatus(id, status);
      toast({ title: `Logsheet ${status.toLowerCase()} successfully` });
      fetchLogsheets();
    } catch {
      toast({ title: `Failed to ${status.toLowerCase()}`, variant: 'destructive' });
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="space-y-6">
      <LogsheetsHeader isCoordinator={isCoordinator} onAdd={handleAdd} />
      <LogsheetsStats stats={stats} />
      <LogsheetsFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />
      <LogsheetsTable
        logsheets={filteredLogsheets}
        isCoordinator={isCoordinator}
        handleView={handleView}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        handleApproveReject={handleApproveReject}
      />
      <LogsheetsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        logsheet={selectedLogsheet}
        user={user}
        viewOnly={viewOnly || isCoordinator}
        onSave={fetchLogsheets}
      />
    </div>
  );
};

export default Logsheets;
