import React from 'react';

const FeatureSelection = ({ selectedFeatures, onFeatureChange }) => {
  const features = [
    {
      id: 'Artificial Intelligence',
      name: 'Artificial Intelligence',
      description: 'AI and machine learning capabilities',
      icon: '🤖',
      color: 'border-blue-200 bg-blue-50 hover:bg-blue-100',
      selectedColor: 'border-blue-500 bg-blue-100'
    },
    {
      id: 'Data',
      name: 'Data',
      description: 'Data access and management',
      icon: '📊',
      color: 'border-green-200 bg-green-50 hover:bg-green-100',
      selectedColor: 'border-green-500 bg-green-100'
    },
    {
      id: 'Analytics',
      name: 'Analytics',
      description: 'Business intelligence and reporting',
      icon: '📈',
      color: 'border-purple-200 bg-purple-50 hover:bg-purple-100',
      selectedColor: 'border-purple-500 bg-purple-100'
    },
    {
      id: 'Power Platform',
      name: 'Power Platform',
      description: 'Low-code development platform',
      icon: '⚡',
      color: 'border-yellow-200 bg-yellow-50 hover:bg-yellow-100',
      selectedColor: 'border-yellow-500 bg-yellow-100'
    }
  ];

  const handleFeatureToggle = (featureId) => {
    if (selectedFeatures.includes(featureId)) {
      onFeatureChange(selectedFeatures.filter(id => id !== featureId));
    } else {
      onFeatureChange([...selectedFeatures, featureId]);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Select Project Features</h3>
        <p className="text-sm text-gray-600">
          Choose the features your project will include. Each feature will trigger specific approval workflows.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {features.map((feature) => {
          const isSelected = selectedFeatures.includes(feature.id);
          return (
            <div
              key={feature.id}
              onClick={() => handleFeatureToggle(feature.id)}
              className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                isSelected ? feature.selectedColor : feature.color
              }`}
            >
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{feature.icon}</span>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{feature.name}</h4>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </div>
                <div className={`w-5 h-5 rounded-full border-2 ${
                  isSelected 
                    ? 'bg-primary-500 border-primary-500' 
                    : 'border-gray-300'
                }`}>
                  {isSelected && (
                    <svg className="w-full h-full text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {selectedFeatures.length > 0 && (
        <div className="mt-4 p-3 bg-primary-50 border border-primary-200 rounded-lg">
          <p className="text-sm text-primary-800">
            <strong>Selected features:</strong> {selectedFeatures.join(', ')}
          </p>
        </div>
      )}
    </div>
  );
};

export default FeatureSelection;
