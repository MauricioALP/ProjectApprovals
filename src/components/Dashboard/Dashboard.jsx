import React from 'react';
import ProjectStats from './ProjectStats';
import ProjectsTable from './ProjectsTable';

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">Overview of all projects and their current status</p>
      </div>

      <ProjectStats />
      <ProjectsTable />
    </div>
  );
};

export default Dashboard;
