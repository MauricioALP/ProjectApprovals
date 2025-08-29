import React from 'react';

const DevelopmentTypeSelection = ({ developmentType, onDevelopmentTypeChange }) => {
  const options = [
    {
      id: 'Self-development',
      name: 'Self-development',
      description: 'Your team will develop the project internally',
      icon: '👥',
      details: [
        'Full control over development process',
        'May request infrastructure access',
        'Responsible for all development phases',
        'Requires internal technical expertise'
      ],
      color: 'border-primary-200 bg-primary-50 hover:bg-primary-100',
      selectedColor: 'border-primary-500 bg-primary-100'
    },
    {
      id: 'Third-party development',
      name: 'Third-party development',
      description: 'External team will develop the project',
      icon: '🤝',
      details: [
        'External development team',
        'No infrastructure access requests needed',
        'Managed development process',
        'Requires vendor management'
      ],
      color: 'border-secondary-200 bg-secondary-50 hover:bg-secondary-100',
      selectedColor: 'border-secondary-500 bg-secondary-100'
    }
  ];

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Development Type</h3>
        <p className="text-sm text-gray-600">
          Choose how your project will be developed. This affects the approval workflow and resource requests.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {options.map((option) => {
          const isSelected = developmentType === option.id;
          return (
            <div
              key={option.id}
              onClick={() => onDevelopmentTypeChange(option.id)}
              className={`p-6 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                isSelected ? option.selectedColor : option.color
              }`}
            >
              <div className="flex items-start space-x-4">
                <span className="text-3xl">{option.icon}</span>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 mb-2">{option.name}</h4>
                  <p className="text-sm text-gray-600 mb-3">{option.description}</p>
                  
                  <ul className="space-y-1">
                    {option.details.map((detail, index) => (
                      <li key={index} className="text-xs text-gray-600 flex items-start">
                        <span className="text-primary-500 mr-2">•</span>
                        {detail}
                      </li>
                    ))}
                  </ul>
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

      {developmentType && (
        <div className="mt-4 p-3 bg-gray-50 border border-gray-200 rounded-lg">
          <p className="text-sm text-gray-700">
            <strong>Selected:</strong> {developmentType}
          </p>
        </div>
      )}
    </div>
  );
};

export default DevelopmentTypeSelection;
