import React from 'react';
import { useStore } from '../../store';
import { 
  DocumentIcon, 
  CheckCircleIcon, 
  ClockIcon, 
  PlayIcon, 
  CheckBadgeIcon 
} from '@heroicons/react/24/outline';

const ProjectStats = () => {
  const { getProjectCounts, setDashboardStatusFilter } = useStore();
  const counts = getProjectCounts();

  const stats = [
    {
      name: 'Draft',
      count: counts.Draft,
      icon: DocumentIcon,
      color: 'bg-gray-500',
      textColor: 'text-gray-600'
    },
    {
      name: 'Created',
      count: counts.Created,
      icon: DocumentIcon,
      color: 'bg-blue-500',
      textColor: 'text-blue-600'
    },
    {
      name: 'Approved',
      count: counts.Approved,
      icon: CheckCircleIcon,
      color: 'bg-green-500',
      textColor: 'text-green-600'
    },
    {
      name: 'In Progress',
      count: counts['In Progress'],
      icon: PlayIcon,
      color: 'bg-yellow-500',
      textColor: 'text-yellow-600'
    },
    {
      name: 'Completed',
      count: counts.Completed,
      icon: CheckBadgeIcon,
      color: 'bg-primary-500',
      textColor: 'text-primary-600'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
      {stats.map((stat) => (
        <button key={stat.name} onClick={() => setDashboardStatusFilter(stat.name)} className="card p-6 text-left">
          <div className="flex items-center">
            <div className={`p-3 rounded-lg ${stat.color} bg-opacity-10 dark:bg-opacity-20`}>
              <stat.icon className={`w-6 h-6 ${stat.textColor} dark:text-${stat.textColor?.split('text-')[1] || 'gray-300'}`} />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-300">{stat.name}</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{stat.count}</p>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
};

export default ProjectStats;
