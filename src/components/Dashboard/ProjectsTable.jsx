import React, { useState, useMemo } from 'react';
import { useStore } from '../../store';
import { 
  MagnifyingGlassIcon, 
  FunnelIcon,
  EyeIcon,
  PencilIcon
} from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

const ProjectsTable = () => {
  const { projects, dashboardStatusFilter, currentUser } = useStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [featureFilter, setFeatureFilter] = useState([]);
  const featureOptions = ['Artificial Intelligence', 'Data', 'Analytics', 'Power Platform'];
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState('desc');

  // Filter and sort projects
  const filteredProjects = useMemo(() => {
    let filtered = projects.filter(project => {
      const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           project.owner.toLowerCase().includes(searchTerm.toLowerCase());
      const effectiveStatus = dashboardStatusFilter !== 'all' ? dashboardStatusFilter : statusFilter;
      const matchesStatus = effectiveStatus === 'all' || project.state === effectiveStatus;
      const matchesFeature = featureFilter.length === 0 || featureFilter.some(f => project.features.includes(f));
      
      return matchesSearch && matchesStatus && matchesFeature;
    });

    // Sort projects
    filtered.sort((a, b) => {
      let aValue = a[sortBy];
      let bValue = b[sortBy];
      
      if (sortBy === 'createdAt') {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      }
      
      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filtered;
  }, [projects, searchTerm, statusFilter, featureFilter, sortBy, sortOrder, dashboardStatusFilter]);

  const getStatusColor = (status) => {
    const colors = {
      'Draft': 'bg-gray-100 text-gray-800',
      'Created': 'bg-blue-100 text-blue-800',
      'Approved': 'bg-green-100 text-green-800',
      'In Progress': 'bg-yellow-100 text-yellow-800',
      'Completed': 'bg-primary-100 text-primary-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getFeatureIcon = (feature) => {
    const icons = {
      'Artificial Intelligence': '🤖',
      'Data': '📊',
      'Analytics': '📈',
      'Power Platform': '⚡'
    };
    return icons[feature] || '📋';
  };

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  return (
    <div className="card">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">All Projects</h2>
      </div>

      {/* Filters */}
      <div className="p-6 border-b border-gray-200 bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
        <div className="flex flex-wrap items-center gap-4">
          {/* Search */}
          <div className="relative flex-1 min-w-[260px]">
            <MagnifyingGlassIcon className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field pl-10 h-10"
            />
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="input-field w-56 h-10"
          >
            <option value="all">All Statuses</option>
            <option value="Draft">Draft</option>
            <option value="Created">Created</option>
            <option value="Approved">Approved</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>

          {/* Features Filter (multi-select pills) */}
          <div className="flex-1 min-w-[320px] flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setFeatureFilter([])}
              className={`px-3 py-2 rounded-lg text-sm border transition-colors ${
                featureFilter.length === 0
                  ? 'bg-primary-500 text-white border-primary-500'
                  : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
              title="Show all features"
            >
              All Features
            </button>
            {featureOptions.map(opt => {
              const isActive = featureFilter.includes(opt);
              return (
                <button
                  key={opt}
                  type="button"
                  onClick={() =>
                    setFeatureFilter(prev =>
                      prev.includes(opt) ? prev.filter(f => f !== opt) : [...prev, opt]
                    )
                  }
                  className={`px-3 py-2 rounded-lg text-sm border transition-colors ${
                    isActive
                      ? 'bg-primary-100 text-primary-700 border-primary-300'
                      : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {opt === 'Artificial Intelligence' ? 'AI' : opt}
                </button>
              );
            })}
          </div>
          {/* Results Count */}
          <div className="ml-auto flex items-center text-sm text-gray-600">
            <FunnelIcon className="w-4 h-4 mr-2" />
            {filteredProjects.length} of {projects.length} projects
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                onClick={() => handleSort('name')}
              >
                Project Name
                {sortBy === 'name' && (
                  <span className="ml-1">{sortOrder === 'asc' ? '↑' : '↓'}</span>
                )}
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                onClick={() => handleSort('owner')}
              >
                Owner
                {sortBy === 'owner' && (
                  <span className="ml-1">{sortOrder === 'asc' ? '↑' : '↓'}</span>
                )}
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                onClick={() => handleSort('createdAt')}
              >
                Created
                {sortBy === 'createdAt' && (
                  <span className="ml-1">{sortOrder === 'asc' ? '↑' : '↓'}</span>
                )}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Features
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
            {filteredProjects.map((project) => (
              <tr key={project.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{project.name}</div>
                  <div className="text-sm text-gray-500">{project.scope}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {project.owner}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {format(new Date(project.createdAt), 'MMM dd, yyyy')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex flex-wrap gap-1">
                    {project.features.map((feature) => (
                      <span
                        key={feature}
                        className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                      >
                        {getFeatureIcon(feature)} {feature}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(project.state)}`}>
                    {project.state}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <Link
                      to={`/projects/${project.id}`}
                      className="text-primary-600 hover:text-primary-900"
                    >
                      <EyeIcon className="w-4 h-4" />
                    </Link>
                    {project.owner === currentUser.name ? (
                      <Link
                        to={`/projects/${project.id}/edit`}
                        className="text-gray-600 hover:text-gray-900"
                        title="Edit Project"
                      >
                        <PencilIcon className="w-4 h-4" />
                      </Link>
                    ) : (
                      <button
                        className="text-gray-300 cursor-not-allowed"
                        title="Only the owner can edit this project"
                        disabled
                      >
                        <PencilIcon className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredProjects.length === 0 && (
        <div className="p-8 text-center text-gray-500">
          No projects found matching your criteria.
        </div>
      )}
    </div>
  );
};

export default ProjectsTable;
