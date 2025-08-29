import React, { useState, useMemo } from 'react';
import { useStore } from '../../store';
import { Link } from 'react-router-dom';
import { 
  MagnifyingGlassIcon, 
  FunnelIcon,
  EyeIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon
} from '@heroicons/react/24/outline';
import { format } from 'date-fns';

const ApprovalsList = () => {
  const { projects, currentUser, updateProjectState, addNotification } = useStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [featureFilter, setFeatureFilter] = useState('all');

  // Get projects that need approval (excluding user's own projects)
  const approvalProjects = useMemo(() => {
    return projects.filter(project => 
      project.owner !== currentUser.name && 
      ['Created', 'Approved'].includes(project.state)
    );
  }, [projects, currentUser.name]);

  // Filter projects
  const filteredProjects = useMemo(() => {
    return approvalProjects.filter(project => {
      const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           project.owner.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || project.state === statusFilter;
      const matchesFeature = featureFilter === 'all' || project.features.includes(featureFilter);
      
      return matchesSearch && matchesStatus && matchesFeature;
    });
  }, [approvalProjects, searchTerm, statusFilter, featureFilter]);

  const getStatusColor = (status) => {
    const colors = {
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

  const handleApprove = (projectId, projectName) => {
    updateProjectState(projectId, 'Approved');
    addNotification({
      title: 'Project Approved',
      message: `Project "${projectName}" has been approved.`,
      type: 'success',
      timestamp: Date.now()
    });
  };

  const handleReject = (projectId, projectName) => {
    if (window.confirm(`Are you sure you want to reject "${projectName}"?`)) {
      updateProjectState(projectId, 'Draft');
      addNotification({
        title: 'Project Rejected',
        message: `Project "${projectName}" has been rejected and returned to Draft status.`,
        type: 'warning',
        timestamp: Date.now()
      });
    }
  };

  const getApprovalStats = () => {
    const stats = {
      total: approvalProjects.length,
      pending: approvalProjects.filter(p => p.state === 'Created').length,
      approved: approvalProjects.filter(p => p.state === 'Approved').length,
      inProgress: approvalProjects.filter(p => p.state === 'In Progress').length,
      completed: approvalProjects.filter(p => p.state === 'Completed').length
    };
    return stats;
  };

  const stats = getApprovalStats();

  const getApprovalRole = (project) => {
    // Simulate different approval roles based on project features
    if (project.features.includes('Artificial Intelligence')) {
      return 'AI Ethics Officer';
    } else if (project.features.includes('Data')) {
      return 'Data Protection Officer';
    } else if (project.features.includes('Analytics')) {
      return 'Business Intelligence Manager';
    } else if (project.features.includes('Power Platform')) {
      return 'Platform Administrator';
    }
    return 'Project Manager';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Project Approvals</h1>
        <p className="text-gray-600">Review and approve pending project requests</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <div className="card p-4 text-center">
          <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
          <div className="text-sm text-gray-600">Total</div>
        </div>
        <div className="card p-4 text-center">
          <div className="text-2xl font-bold text-blue-600">{stats.pending}</div>
          <div className="text-sm text-gray-600">Pending</div>
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
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field pl-10"
            />
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="input-field"
          >
            <option value="all">All Statuses</option>
            <option value="Created">Pending Approval</option>
            <option value="Approved">Approved</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>

          {/* Feature Filter */}
          <select
            value={featureFilter}
            onChange={(e) => setFeatureFilter(e.target.value)}
            className="input-field"
          >
            <option value="all">All Features</option>
            <option value="Artificial Intelligence">AI</option>
            <option value="Data">Data</option>
            <option value="Analytics">Analytics</option>
            <option value="Power Platform">Power Platform</option>
          </select>

          {/* Results Count */}
          <div className="flex items-center text-sm text-gray-600">
            <FunnelIcon className="w-4 h-4 mr-2" />
            {filteredProjects.length} of {approvalProjects.length} projects
          </div>
        </div>
      </div>

      {/* Projects List */}
      {filteredProjects.length === 0 ? (
        <div className="card p-12 text-center">
          <div className="text-gray-400 mb-4">
            <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No projects to approve</h3>
          <p className="text-gray-500">
            {searchTerm || statusFilter !== 'all' || featureFilter !== 'all'
              ? 'Try adjusting your search criteria.'
              : 'All projects have been reviewed.'}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredProjects.map((project) => (
            <div key={project.id} className="card p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  {/* Project Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {project.name}
                      </h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span>Owner: {project.owner}</span>
                        <span>Created: {format(new Date(project.createdAt), 'MMM dd, yyyy')}</span>
                        <span>Type: {project.developmentType}</span>
                      </div>
                    </div>
                    <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${getStatusColor(project.state)}`}>
                      {project.state}
                    </span>
                  </div>

                  {/* Project Description */}
                  <p className="text-gray-600 mb-4">{project.scope}</p>

                  {/* Features */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.features.map((feature) => (
                      <span
                        key={feature}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800"
                      >
                        {getFeatureIcon(feature)} {feature}
                      </span>
                    ))}
                  </div>

                  {/* Approval Role */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
                    <p className="text-sm text-blue-800">
                      <strong>Your Role:</strong> {getApprovalRole(project)}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="ml-6 flex flex-col space-y-2">
                  <Link
                    to={`/projects/${project.id}`}
                    className="btn-outline flex items-center justify-center space-x-2 w-full"
                  >
                    <EyeIcon className="w-4 h-4" />
                    <span>Review</span>
                  </Link>

                  {project.state === 'Created' && (
                    <>
                      <button
                        onClick={() => handleApprove(project.id, project.name)}
                        className="btn-primary flex items-center justify-center space-x-2 w-full"
                      >
                        <CheckCircleIcon className="w-4 h-4" />
                        <span>Approve</span>
                      </button>
                      <button
                        onClick={() => handleReject(project.id, project.name)}
                        className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2 w-full"
                      >
                        <XCircleIcon className="w-4 h-4" />
                        <span>Reject</span>
                      </button>
                    </>
                  )}

                  {project.state === 'Approved' && (
                    <button
                      onClick={() => updateProjectState(project.id, 'In Progress')}
                      className="btn-secondary flex items-center justify-center space-x-2 w-full"
                    >
                      <ClockIcon className="w-4 h-4" />
                      <span>Start Progress</span>
                    </button>
                  )}

                  {project.state === 'In Progress' && (
                    <button
                      onClick={() => updateProjectState(project.id, 'Completed')}
                      className="btn-primary flex items-center justify-center space-x-2 w-full"
                    >
                      <CheckCircleIcon className="w-4 h-4" />
                      <span>Mark Complete</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ApprovalsList;
