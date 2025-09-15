import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';

export const ProfileDetailsCard = ({ profile }) => {
  const joinedDate = profile.joined_date
    ? profile.joined_date.split('T')[0]
    : 'N/A';

  return (
    <Card>
      <CardHeader>
        <CardTitle>Personal Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 text-sm">
        <p><strong>Username:</strong> {profile.username || 'N/A'}</p>
        <p><strong>Email:</strong> {profile.email || 'N/A'}</p>
        <p><strong>Phone:</strong> {profile.phone_number || 'Not Provided'}</p>
        <p><strong>Department:</strong> {profile.department || 'Not Provided'}</p>
        <p><strong>Office Location:</strong> {profile.office_location || 'Not Provided'}</p>
        <p><strong>Joined Date:</strong> {joinedDate}</p>
      </CardContent>
    </Card>
  );
};
