import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../store';
import FeatureSelection from './FeatureSelection';
import DevelopmentTypeSelection from './DevelopmentTypeSelection';
import FeatureForms from './FeatureForms';

const CreateProjectForm = () => {
  const navigate = useNavigate();
  const { addProject, currentUser, addNotification } = useStore();
  
  const [formData, setFormData] = useState({
    name: '',
    scope: '',
    objective: '',
    features: [],
    developmentType: '',
    aiResources: {},
    dataAccess: {},
    analyticsResources: {},
    powerPlatformResources: {},
    infrastructureAccess: {}
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState({});

  const totalSteps = 4;

  const validateStep = (step) => {
    const newErrors = {};

    if (step === 1) {
      if (!formData.name.trim()) newErrors.name = 'Project name is required';
      if (!formData.scope.trim()) newErrors.scope = 'Project scope is required';
      if (!formData.objective.trim()) newErrors.objective = 'Project objective is required';
    }

    if (step === 2) {
      if (formData.features.length === 0) {
        newErrors.features = 'Please select at least one feature';
      }
    }

    if (step === 3) {
      if (!formData.developmentType) {
        newErrors.developmentType = 'Please select a development type';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(Math.min(currentStep + 1, totalSteps));
    }
  };

  const handlePrevious = () => {
    setCurrentStep(Math.max(currentStep - 1, 1));
  };

  const handleSubmit = () => {
    if (validateStep(currentStep)) {
      const newProject = {
        ...formData,
        owner: currentUser.name,
        createdAt: new Date().toISOString().split('T')[0],
        state: 'Draft',
        approvals: []
      };

      addProject(newProject);
      
      addNotification({
        title: 'Project Created Successfully',
        message: `Project "${formData.name}" has been created and is now in Draft status.`,
        type: 'success',
        timestamp: Date.now()
      });

      navigate('/projects');
    }
  };

  const updateFormData = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Basic Project Information</h3>
              <p className="text-sm text-gray-600">Provide the essential details about your project.</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Project Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => updateFormData('name', e.target.value)}
                  className={`input-field ${errors.name ? 'border-red-500' : ''}`}
                  placeholder="Enter project name"
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Project Scope *
                </label>
                <textarea
                  value={formData.scope}
                  onChange={(e) => updateFormData('scope', e.target.value)}
                  className={`input-field ${errors.scope ? 'border-red-500' : ''}`}
                  placeholder="Describe what the project will accomplish"
                  rows="3"
                />
                {errors.scope && <p className="text-red-500 text-sm mt-1">{errors.scope}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Project Objective *
                </label>
                <textarea
                  value={formData.objective}
                  onChange={(e) => updateFormData('objective', e.target.value)}
                  className={`input-field ${errors.objective ? 'border-red-500' : ''}`}
                  placeholder="What is the main goal of this project?"
                  rows="3"
                />
                {errors.objective && <p className="text-red-500 text-sm mt-1">{errors.objective}</p>}
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <FeatureSelection
            selectedFeatures={formData.features}
            onFeatureChange={(features) => updateFormData('features', features)}
          />
        );

      case 3:
        return (
          <DevelopmentTypeSelection
            developmentType={formData.developmentType}
            onDevelopmentTypeChange={(type) => updateFormData('developmentType', type)}
          />
        );

      case 4:
        return (
          <FeatureForms
            selectedFeatures={formData.features}
            formData={formData}
            onFormDataChange={updateFormData}
          />
        );

      default:
        return null;
    }
  };

  const renderStepIndicator = () => {
    return (
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {Array.from({ length: totalSteps }, (_, index) => (
            <div key={index} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                index + 1 < currentStep
                  ? 'bg-primary-500 text-white'
                  : index + 1 === currentStep
                  ? 'bg-primary-100 text-primary-600 border-2 border-primary-500'
                  : 'bg-gray-200 text-gray-500'
              }`}>
                {index + 1 < currentStep ? '✓' : index + 1}
              </div>
              {index < totalSteps - 1 && (
                <div className={`w-16 h-1 mx-2 ${
                  index + 1 < currentStep ? 'bg-primary-500' : 'bg-gray-200'
                }`} />
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-2 text-xs text-gray-500">
          <span>Basic Info</span>
          <span>Features</span>
          <span>Development</span>
          <span>Resources</span>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Create New Project</h1>
        <p className="text-gray-600">Fill out the form below to create your project request</p>
      </div>

      {renderStepIndicator()}

      <div className="card p-8">
        {renderStepContent()}

        <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 1}
            className="btn-outline disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>

          <div className="flex space-x-3">
            {currentStep < totalSteps ? (
              <button onClick={handleNext} className="btn-primary">
                Next
              </button>
            ) : (
              <button onClick={handleSubmit} className="btn-primary">
                Create Project
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateProjectForm;
