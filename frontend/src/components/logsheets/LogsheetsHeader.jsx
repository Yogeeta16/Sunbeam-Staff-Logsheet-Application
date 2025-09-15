import React from 'react';
import { Button } from '../ui/button';
import { Plus } from 'lucide-react';

export const LogsheetsHeader = ({ isCoordinator, onAdd }) => {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h1 className="text-3xl font-bold">{isCoordinator ? 'All Logsheets' : 'My Logsheets'}</h1>
        <p className="text-muted-foreground">
          {isCoordinator
            ? 'Review staff logsheet submissions'
            : 'Submit and track your logsheet entries'}
        </p>
      </div>

      {!isCoordinator && (
        <Button onClick={onAdd} className="bg-gradient-primary hover:opacity-90">
          <Plus className="w-4 h-4 mr-2" /> Submit Logsheet
        </Button>
      )}
    </div>
  );
};
