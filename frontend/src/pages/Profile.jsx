import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/button';
import ProfileModal from '../components/modals/ProfileModal';
import { getStaffById } from '../api/staff';
import { ProfileHeader } from '../components/profile/ProfileHeader';
import { ProfileDetailsCard } from '../components/profile/ProfileDetailsCard';

const Profile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user?.id) return;
      try {
        const data = await getStaffById(user.id);
        setProfile(data);
      } catch (err) {
        console.error('Failed to fetch profile:', err);
      }
    };
    fetchProfile();
  }, [user]);

  if (!profile) return <p>Loading...</p>;

  return (
    <div className="space-y-6">
      {/* Header Buttons */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Profile</h1>
          <p className="text-muted-foreground">
            Your personal information & account settings
          </p>
        </div>
        <div className="space-x-2">
          <Button
            onClick={() => { setModalMode('editProfile'); setModalOpen(true); }}
            className="bg-gradient-primary hover:opacity-90"
          >
            Edit Profile
          </Button>
          <Button
            onClick={() => { setModalMode('changePassword'); setModalOpen(true); }}
            variant="outline"
          >
            Change Password
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <ProfileHeader profile={profile} />
        <ProfileDetailsCard profile={profile} />
      </div>

      <ProfileModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        mode={modalMode}
        user={profile}
        onSave={(updatedProfile) => setProfile(prev => ({ ...prev, ...updatedProfile }))}
      />

    </div>
  );
};

export default Profile;
