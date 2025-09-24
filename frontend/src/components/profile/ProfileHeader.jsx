import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { Badge } from '../ui/badge';
import { Calendar } from 'lucide-react';

export const ProfileHeader = ({ profile }) => {
  const joinedDate = profile.joined_date
    ? profile.joined_date.split('T')[0]
    : 'N/A';

  return (
    <Card className="text-center">
      <CardHeader>
        <div className="w-24 h-24 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-primary-foreground text-2xl font-bold">
            {profile.name?.charAt(0) || 'U'}
          </span>
        </div>
        <CardTitle>{profile.name || 'Unnamed User'}</CardTitle>
        <CardDescription className="space-y-2">
          <Badge variant="outline" className="capitalize">
            {profile.role || 'N/A'}
          </Badge>
          <div className="flex items-center justify-center text-sm text-muted-foreground">
            <Calendar className="w-3 h-3 mr-1" />
            Joined {joinedDate}
          </div>
        </CardDescription>
      </CardHeader>
    </Card>
  );
};
