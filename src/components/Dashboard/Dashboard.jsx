import React from 'react';
import ProjectStats from './ProjectStats';
import ProjectsTable from './ProjectsTable';
import { useStore } from '../../store';

const Dashboard = () => {
  const { dashboardStatusFilter, setDashboardStatusFilter } = useStore();
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <div className="flex items-center justify-between">
          <p className="text-gray-600">Overview of all projects and their current status</p>
          {dashboardStatusFilter !== 'all' && (
            <button onClick={() => setDashboardStatusFilter('all')} className="btn-outline">Clear filter: {dashboardStatusFilter}</button>
          )}
        </div>
      </div>

      <ProjectStats />
      <ProjectsTable />
    </div>
  );
};

export default Dashboard;
