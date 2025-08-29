import React, { useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useStore } from '../../store';
import { 
  ArrowLeftIcon, 
  PencilIcon,
  DocumentArrowDownIcon,
  CheckCircleIcon,
  ClockIcon,
  XCircleIcon
} from '@heroicons/react/24/outline';
import { format } from 'date-fns';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { projects, updateProjectState, addNotification } = useStore();
  const reportRef = useRef(null);
  
  const project = projects.find(p => p.id === id);

  if (!project) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Project Not Found</h2>
        <p className="text-gray-600 mb-6">The project you're looking for doesn't exist.</p>
        <button
          onClick={() => navigate('/projects')}
          className="btn-primary"
        >
          Back to Projects
        </button>
      </div>
    );
  }

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

  const handleStateChange = (newState) => {
    updateProjectState(id, newState);
    addNotification({
      title: 'Project Status Updated',
      message: `Project "${project.name}" status changed to ${newState}`,
      type: 'info',
      timestamp: Date.now()
    });
  };

  const exportToPDF = async () => {
    try {
      addNotification({
        title: 'Export Started',
        message: 'Generating project PDF report…',
        type: 'info',
        timestamp: Date.now()
      });

      if (!reportRef.current) {
        throw new Error('Nothing to export');
      }

      const canvas = await html2canvas(reportRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff',
        logging: false
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      const imgWidth = pageWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight, undefined, 'FAST');
      heightLeft -= pageHeight;
      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight, undefined, 'FAST');
        heightLeft -= pageHeight;
      }

      const fileName = `${project.name.replace(/\s+/g, '_')}_Report.pdf`;
      pdf.save(fileName);

      addNotification({
        title: 'Export Complete',
        message: `Saved ${fileName}`,
        type: 'success',
        timestamp: Date.now()
      });
    } catch (error) {
      addNotification({
        title: 'Export Failed',
        message: error?.message || 'Could not generate PDF report',
        type: 'error',
        timestamp: Date.now()
      });
    }
  };

  const renderApprovalStatus = () => {
    if (project.approvals.length === 0) {
      return (
        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-yellow-800">No approvals yet. Project is in {project.state} status.</p>
        </div>
      );
    }

    return (
      <div className="space-y-3">
        {project.approvals.map((approval, index) => (
          <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              {approval.status === 'Approved' ? (
                <CheckCircleIcon className="w-5 h-5 text-green-500" />
              ) : approval.status === 'Pending' ? (
                <ClockIcon className="w-5 h-5 text-yellow-500" />
              ) : (
                <XCircleIcon className="w-5 h-5 text-red-500" />
              )}
              <div>
                <p className="font-medium text-gray-900">{approval.role}</p>
                <p className="text-sm text-gray-500">{approval.status}</p>
              </div>
            </div>
            {approval.date && (
              <span className="text-sm text-gray-500">
                {format(new Date(approval.date), 'MMM dd, yyyy')}
              </span>
            )}
          </div>
        ))}
      </div>
    );
  };

  const renderFeatureDetails = () => {
    const details = [];

    if (project.features.includes('Artificial Intelligence') && project.aiResources) {
      details.push(
        <div key="ai" className="p-4 border border-blue-200 rounded-lg bg-blue-50">
          <h4 className="font-medium text-blue-900 mb-3">🤖 AI Resources</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            {Object.entries(project.aiResources).map(([key, value]) => (
              <div key={key}>
                <span className="font-medium text-blue-800">{key}:</span> {value}
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (project.features.includes('Data') && project.dataAccess) {
      details.push(
        <div key="data" className="p-4 border border-green-200 rounded-lg bg-green-50">
          <h4 className="font-medium text-green-900 mb-3">📊 Data Access</h4>
          <div className="space-y-2 text-sm">
            {project.dataAccess.datasets && (
              <div>
                <span className="font-medium text-green-800">Datasets:</span>
                <div className="mt-1 space-y-1">
                  {project.dataAccess.datasets.map((dataset, index) => (
                    <div key={index} className="ml-4">• {dataset}</div>
                  ))}
                </div>
              </div>
            )}
            {project.dataAccess.accessLevel && (
              <div>
                <span className="font-medium text-green-800">Access Level:</span> {project.dataAccess.accessLevel}
              </div>
            )}
          </div>
        </div>
      );
    }

    if (project.features.includes('Analytics') && project.analyticsResources) {
      details.push(
        <div key="analytics" className="p-4 border border-purple-200 rounded-lg bg-purple-50">
          <h4 className="font-medium text-purple-900 mb-3">📈 Analytics Resources</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            {Object.entries(project.analyticsResources).map(([key, value]) => (
              <div key={key}>
                <span className="font-medium text-purple-800">{key}:</span> {value}
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (project.features.includes('Power Platform') && project.powerPlatformResources) {
      details.push(
        <div key="power" className="p-4 border border-yellow-200 rounded-lg bg-yellow-50">
          <h4 className="font-medium text-yellow-900 mb-3">⚡ Power Platform Resources</h4>
          <div className="space-y-2 text-sm">
            {project.powerPlatformResources.environments && (
              <div>
                <span className="font-medium text-yellow-800">Environments:</span>
                <div className="mt-1 space-y-1">
                  {project.powerPlatformResources.environments.map((env, index) => (
                    <div key={index} className="ml-4">• {env}</div>
                  ))}
                </div>
              </div>
            )}
            {Object.entries(project.powerPlatformResources).map(([key, value]) => {
              if (key !== 'environments') {
                return (
                  <div key={key}>
                    <span className="font-medium text-yellow-800">{key}:</span> {value}
                  </div>
                );
              }
              return null;
            })}
          </div>
        </div>
      );
    }

    if (project.developmentType === 'Self-development' && project.infrastructureAccess) {
      details.push(
        <div key="infra" className="p-4 border border-gray-200 rounded-lg bg-gray-50">
          <h4 className="font-medium text-gray-900 mb-3">🏗️ Infrastructure Access</h4>
          <div className="space-y-2 text-sm">
            {project.infrastructureAccess.azureResources && (
              <div>
                <span className="font-medium text-gray-800">Azure Resources:</span>
                <div className="mt-1 space-y-1">
                  {project.infrastructureAccess.azureResources.map((resource, index) => (
                    <div key={index} className="ml-4">• {resource}</div>
                  ))}
                </div>
              </div>
            )}
            {project.infrastructureAccess.databaseAccess && (
              <div>
                <span className="font-medium text-gray-800">Database Access:</span> {project.infrastructureAccess.databaseAccess}
              </div>
            )}
          </div>
        </div>
      );
    }

    return details;
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/projects')}
            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          >
            <ArrowLeftIcon className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{project.name}</h1>
            <p className="text-gray-600">Project Details</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <button
            onClick={exportToPDF}
            className="btn-outline flex items-center space-x-2"
          >
            <DocumentArrowDownIcon className="w-4 h-4" />
            <span>Export PDF</span>
          </button>
          <button
            onClick={() => navigate(`/projects/${id}/edit`)}
            className="btn-primary flex items-center space-x-2"
          >
            <PencilIcon className="w-4 h-4" />
            <span>Edit Project</span>
          </button>
        </div>
      </div>

      <div ref={reportRef} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information */}
          <div className="card p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Basic Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Project Name</label>
                <p className="text-gray-900">{project.name}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Owner</label>
                <p className="text-gray-900">{project.owner}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Created Date</label>
                <p className="text-gray-900">{format(new Date(project.createdAt), 'MMMM dd, yyyy')}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Development Type</label>
                <p className="text-gray-900">{project.developmentType}</p>
              </div>
            </div>
            
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-500 mb-2">Scope</label>
              <p className="text-gray-900">{project.scope}</p>
            </div>
            
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-500 mb-2">Objective</label>
              <p className="text-gray-900">{project.objective}</p>
            </div>
          </div>

          {/* Features */}
          <div className="card p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Project Features</h2>
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
            
            {renderFeatureDetails()}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Status */}
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Project Status</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-500">Current Status</span>
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(project.state)}`}>
                  {project.state}
                </span>
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Change Status</label>
                <select
                  value={project.state}
                  onChange={(e) => handleStateChange(e.target.value)}
                  className="input-field"
                >
                  <option value="Draft">Draft</option>
                  <option value="Created">Created</option>
                  <option value="Approved">Approved</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
            </div>
          </div>

          {/* Approvals */}
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Approval Status</h3>
            {renderApprovalStatus()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
