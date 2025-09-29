import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Card, CardContent } from '../components/ui/card';
import { SchedulesModal } from '../components/modals/SchedulesModal';
import { fetchSchedulesApi, exportSchedules } from '../api/schedules';
import { ScheduleHeader } from '../components/schedules/ScheduleHeader';
import { SchedulesStats } from '../components/schedules/SchedulesStats';
import { SchedulesFilter } from '../components/schedules/SchedulesFilter';
import { SchedulesTable } from '../components/schedules/SchedulesTable';

export default function SchedulesPage() {
  const { user } = useAuth();
  const isCoordinator = user?.role?.toLowerCase() === 'coordinator';

  const [schedules, setSchedules] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState(null);

  const fetchSchedules = async () => {
    try {
      const data = await fetchSchedulesApi(user, isCoordinator);
      setSchedules(data || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { fetchSchedules(); }, []);

  const filteredSchedules = schedules.filter(
    (s) =>
      s.course_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.module_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.faculty_name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAdd = () => {
    setSelectedSchedule(null);
    setIsModalOpen(true);
  };

  const handleEdit = (s) => {
    setSelectedSchedule(s);
    setIsModalOpen(true);
  };

  const handleView = (s) => {
    setSelectedSchedule(s);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    // TODO: implement delete
  };

  const handleExport = async () => {
    try {
      await exportSchedules(isCoordinator ? null : user?.id);
    } catch (err) {
      console.error("Export failed:", err);
    }
  };

  const handleSampleDownload = () => {
    const link = document.createElement('a');
    link.href = '/assets/sample_schedule.xlsx'; // public/assets
    link.setAttribute('download', 'sample_schedule.xlsx');
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Schedules</h1>
        <ScheduleHeader
          isCoordinator={isCoordinator}
          onAdd={handleAdd}
          onExport={handleExport}
          onSampleDownload={handleSampleDownload}
          fetchSchedules={fetchSchedules}
        />
      </div>

      <SchedulesStats schedules={schedules} />
      <SchedulesFilter searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <Card>
        <CardContent>
          <SchedulesTable
            schedules={filteredSchedules}
            isCoordinator={isCoordinator}
            onEdit={handleEdit}
            onView={handleView}
            onDelete={handleDelete}
          />
        </CardContent>
      </Card>

      <SchedulesModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        schedule={selectedSchedule}
        refreshSchedules={fetchSchedules}
      />
    </div>
  );
}
