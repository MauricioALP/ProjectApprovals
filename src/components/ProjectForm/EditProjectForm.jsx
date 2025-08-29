import React, { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useStore } from '../../store';
import FeatureSelection from './FeatureSelection';
import DevelopmentTypeSelection from './DevelopmentTypeSelection';
import FeatureForms from './FeatureForms';

const EditProjectForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { projects, updateProject, currentUser, addNotification } = useStore();

  const project = useMemo(() => projects.find(p => p.id === id), [projects, id]);

  const [formData, setFormData] = useState(() => ({
    name: project?.name || '',
    scope: project?.scope || '',
    objective: project?.objective || '',
    features: project?.features || [],
    developmentType: project?.developmentType || '',
    aiResources: project?.aiResources || {},
    dataAccess: project?.dataAccess || {},
    analyticsResources: project?.analyticsResources || {},
    powerPlatformResources: project?.powerPlatformResources || {},
    infrastructureAccess: project?.infrastructureAccess || {}
  }));

  const [errors, setErrors] = useState({});

  if (!project) {
    return (
      <div className="card p-8">
        <h2 className="text-lg font-semibold text-gray-900">Project not found</h2>
        <button onClick={() => navigate('/')} className="btn-primary mt-4">Go to Dashboard</button>
      </div>
    );
  }

  const isOwner = project.owner === currentUser.name;

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Project name is required';
    if (!formData.scope.trim()) newErrors.scope = 'Project scope is required';
    if (!formData.objective.trim()) newErrors.objective = 'Project objective is required';
    if (formData.features.length === 0) newErrors.features = 'Please select at least one feature';
    if (!formData.developmentType) newErrors.developmentType = 'Please select a development type';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const updateFormData = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (!isOwner) return;
    if (!validate()) return;
    updateProject(project.id, {
      ...project,
      ...formData
    });
    addNotification({
      title: 'Project Updated',
      message: `Project "${formData.name}" has been updated successfully.`,
      type: 'success',
      timestamp: Date.now()
    });
    navigate(`/projects/${project.id}`);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Edit Project</h1>
        <p className="text-gray-600">Update the fields below. Only the owner can edit.</p>
      </div>

      <div className="card p-8 space-y-8">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Project Name *</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => updateFormData('name', e.target.value)}
              className={`input-field ${errors.name ? 'border-red-500' : ''}`}
              placeholder="Enter project name"
              disabled={!isOwner}
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Project Scope *</label>
            <textarea
              value={formData.scope}
              onChange={(e) => updateFormData('scope', e.target.value)}
              className={`input-field ${errors.scope ? 'border-red-500' : ''}`}
              rows="3"
              disabled={!isOwner}
            />
            {errors.scope && <p className="text-red-500 text-sm mt-1">{errors.scope}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Project Objective *</label>
            <textarea
              value={formData.objective}
              onChange={(e) => updateFormData('objective', e.target.value)}
              className={`input-field ${errors.objective ? 'border-red-500' : ''}`}
              rows="3"
              disabled={!isOwner}
            />
            {errors.objective && <p className="text-red-500 text-sm mt-1">{errors.objective}</p>}
          </div>
        </div>

        <FeatureSelection
          selectedFeatures={formData.features}
          onFeatureChange={(features) => updateFormData('features', features)}
        />

        <DevelopmentTypeSelection
          developmentType={formData.developmentType}
          onDevelopmentTypeChange={(type) => updateFormData('developmentType', type)}
        />

        <FeatureForms
          selectedFeatures={formData.features}
          formData={formData}
          onFormDataChange={updateFormData}
          disabled={!isOwner}
        />

        <div className="flex justify-end pt-6 border-t border-gray-200">
          <button onClick={() => navigate(-1)} className="btn-outline mr-3">Cancel</button>
          <button onClick={handleSubmit} className="btn-primary" disabled={!isOwner}>
            {isOwner ? 'Save Changes' : 'Owner only'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProjectForm;


