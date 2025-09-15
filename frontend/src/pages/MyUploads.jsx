import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { getAllSchedulesUploads } from '../api/schedules';
import { MyUploadsFilters } from '../components/myuploads/MyUploadsFilters';
import { MyUploadsTable } from '../components/myuploads/MyUploadsTable';

const MyUploads = () => {
  const { user } = useAuth();
  const [uploads, setUploads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchUploads = async () => {
      try {
        const data = await getAllSchedulesUploads();
        const myUploads = data.filter((upload) => upload.uploaded_by === user.id);
        setUploads(myUploads);
      } catch (err) {
        console.error('Error fetching uploads:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchUploads();
  }, [user]);

  const filteredUploads = uploads.filter(
    (u) =>
      u.file_path?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.uploaded_by_name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <p>Loading...</p>;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Uploaded Schedules</CardTitle>
          <CardDescription>All schedule files uploaded by you</CardDescription>
        </CardHeader>
        <CardContent>
          <MyUploadsFilters searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <MyUploadsTable uploads={filteredUploads} />
        </CardContent>
      </Card>
    </div>
  );
};

export default MyUploads;
