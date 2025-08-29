import React, { useState, useMemo } from 'react';
import { useStore } from '../../store';
import { Link } from 'react-router-dom';
import { 
  MagnifyingGlassIcon, 
  FunnelIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon
} from '@heroicons/react/24/outline';
import { format } from 'date-fns';

const ProjectsList = () => {
  const { projects, currentUser, deleteProject, addNotification } = useStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [featureFilter, setFeatureFilter] = useState([]);
  const featureOptions = ['Artificial Intelligence', 'Data', 'Analytics', 'Power Platform'];

  // Filter projects for current user
  const userProjects = useMemo(() => {
    return projects.filter(project => project.owner === currentUser.name);
  }, [projects, currentUser.name]);

  // Filter and search projects
  const filteredProjects = useMemo(() => {
    return userProjects.filter(project => {
      const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           project.scope.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || project.state === statusFilter;
      const matchesFeature = featureFilter.length === 0 || featureFilter.some(f => project.features.includes(f));
      
      return matchesSearch && matchesStatus && matchesFeature;
    });
  }, [userProjects, searchTerm, statusFilter, featureFilter]);

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

  const handleDeleteProject = (projectId, projectName) => {
    if (window.confirm(`Are you sure you want to delete "${projectName}"?`)) {
      deleteProject(projectId);
      addNotification({
        title: 'Project Deleted',
        message: `Project "${projectName}" has been deleted successfully.`,
        type: 'success',
        timestamp: Date.now()
      });
    }
  };

  const getProjectStats = () => {
    const stats = {
      total: userProjects.length,
      draft: userProjects.filter(p => p.state === 'Draft').length,
      created: userProjects.filter(p => p.state === 'Created').length,
      approved: userProjects.filter(p => p.state === 'Approved').length,
      inProgress: userProjects.filter(p => p.state === 'In Progress').length,
      completed: userProjects.filter(p => p.state === 'Completed').length
    };
    return stats;
  };

  const stats = getProjectStats();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Projects</h1>
        <p className="text-gray-600">Manage and track your project requests</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="card p-4 text-center">
          <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
          <div className="text-sm text-gray-600">Total</div>
        </div>
        <div className="card p-4 text-center">
          <div className="text-2xl font-bold text-gray-500">{stats.draft}</div>
          <div className="text-sm text-gray-600">Draft</div>
        </div>
        <div className="card p-4 text-center">
          <div className="text-2xl font-bold text-blue-600">{stats.created}</div>
          <div className="text-sm text-gray-600">Created</div>
        </div>
        <div className="card p-4 text-center">
          <div className="text-2xl font-bold text-green-600">{stats.approved}</div>
          <div className="text-sm text-gray-600">Approved</div>
        </div>
        <div className="card p-4 text-center">
          <div className="text-2xl font-bold text-yellow-600">{stats.inProgress}</div>
          <div className="text-sm text-gray-600">In Progress</div>
        </div>
        <div className="card p-4 text-center">
          <div className="text-2xl font-bold text-primary-600">{stats.completed}</div>
          <div className="text-sm text-gray-600">Completed</div>
        </div>
      </div>

      {/* Filters */}
      <div className="card p-6">
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
            {filteredProjects.length} of {userProjects.length} projects
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      {filteredProjects.length === 0 ? (
        <div className="card p-12 text-center">
          <div className="text-gray-400 mb-4">
            <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No projects found</h3>
          <p className="text-gray-500 mb-6">
            {searchTerm || statusFilter !== 'all' || featureFilter !== 'all'
              ? 'Try adjusting your search criteria.'
              : 'Get started by creating your first project.'}
          </p>
          {!searchTerm && statusFilter === 'all' && featureFilter === 'all' && (
            <Link to="/create-project" className="btn-primary">
              Create Project
            </Link>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div key={project.id} className="card p-6 hover:shadow-lg transition-shadow duration-200">
              {/* Project Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                    {project.name}
                  </h3>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(project.state)}`}>
                    {project.state}
                  </span>
                </div>
              </div>

              {/* Project Description */}
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                {project.scope}
              </p>

              {/* Features */}
              <div className="flex flex-wrap gap-1 mb-4">
                {project.features.slice(0, 3).map((feature) => (
                  <span
                    key={feature}
                    className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                  >
                    {getFeatureIcon(feature)} {feature}
                  </span>
                ))}
                {project.features.length > 3 && (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                    +{project.features.length - 3} more
                  </span>
                )}
              </div>

              {/* Project Meta */}
              <div className="text-xs text-gray-500 mb-4">
                <div>Created: {format(new Date(project.createdAt), 'MMM dd, yyyy')}</div>
                <div>Type: {project.developmentType}</div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex space-x-2">
                  <Link
                    to={`/projects/${project.id}`}
                    className="p-2 text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors duration-200"
                    title="View Details"
                  >
                    <EyeIcon className="w-4 h-4" />
                  </Link>
                  {project.owner === currentUser.name ? (
                    <Link
                      to={`/projects/${project.id}/edit`}
                      className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                      title="Edit Project"
                    >
                      <PencilIcon className="w-4 h-4" />
                    </Link>
                  ) : (
                    <button
                      className="p-2 text-gray-300 rounded-lg cursor-not-allowed"
                      title="Only the owner can edit this project"
                      disabled
                    >
                      <PencilIcon className="w-4 h-4" />
                    </button>
                  )}
                </div>
                
                <button
                  onClick={() => handleDeleteProject(project.id, project.name)}
                  className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                  title="Delete Project"
                >
                  <TrashIcon className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectsList;
