import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/card';
import { SchedulesModal } from '../components/modals/SchedulesModal';
import { fetchSchedulesApi } from '../api/schedules';
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
    s => s.course_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
         s.module_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
         s.faculty_name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAdd = () => { setSelectedSchedule(null); setIsModalOpen(true); };
  const handleEdit = (s) => { setSelectedSchedule(s); setIsModalOpen(true); };
  const handleView = (s) => { setSelectedSchedule(s); setIsModalOpen(true); };
  const handleDelete = async (id) => { /* implement delete */ };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Schedules</h1>
        <ScheduleHeader 
          isCoordinator={isCoordinator} 
          onAdd={handleAdd} 
          onExport={() => {}} 
          onSampleDownload={() => {}} 
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
