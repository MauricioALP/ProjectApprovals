import React from 'react';

const FeatureForms = ({ selectedFeatures, formData, onFormDataChange }) => {
  // AI Resources Form
  const AIForm = () => (
    <div className="space-y-4 p-4 border border-blue-200 rounded-lg bg-blue-50">
      <h4 className="font-medium text-blue-900">🤖 AI Resources Request</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-blue-800 mb-2">
            Azure AI Foundry
          </label>
          <select
            value={formData.aiResources?.azureAIFoundry || ''}
            onChange={(e) => onFormDataChange('aiResources', { ...formData.aiResources, azureAIFoundry: e.target.value })}
            className="input-field"
          >
            <option value="">Select option</option>
            <option value="Basic">Basic Tier</option>
            <option value="Standard">Standard Tier</option>
            <option value="Premium">Premium Tier</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-blue-800 mb-2">
            OpenAI Access
          </label>
          <select
            value={formData.aiResources?.openAI || ''}
            onChange={(e) => onFormDataChange('aiResources', { ...formData.aiResources, openAI: e.target.value })}
            className="input-field"
          >
            <option value="">Select option</option>
            <option value="GPT-4">GPT-4 Access</option>
            <option value="GPT-3.5">GPT-3.5 Access</option>
            <option value="DALL-E">DALL-E Access</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-blue-800 mb-2">
            Microsoft Copilot
          </label>
          <select
            value={formData.aiResources?.copilot || ''}
            onChange={(e) => onFormDataChange('aiResources', { ...formData.aiResources, copilot: e.target.value })}
            className="input-field"
          >
            <option value="">Select option</option>
            <option value="Copilot for Microsoft 365">Copilot for Microsoft 365</option>
            <option value="GitHub Copilot">GitHub Copilot</option>
            <option value="Power Platform Copilot">Power Platform Copilot</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-blue-800 mb-2">
            Custom AI Models
          </label>
          <input
            type="text"
            placeholder="Specify custom models needed"
            value={formData.aiResources?.customModels || ''}
            onChange={(e) => onFormDataChange('aiResources', { ...formData.aiResources, customModels: e.target.value })}
            className="input-field"
          />
        </div>
      </div>
    </div>
  );

  // Data Access Form
  const DataForm = () => (
    <div className="space-y-4 p-4 border border-green-200 rounded-lg bg-green-50">
      <h4 className="font-medium text-green-900">📊 Data Access Request</h4>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-green-800 mb-2">
            Dataset Types
          </label>
          <div className="space-y-2">
            {['Production Database', 'Historical Records', 'External APIs', 'Legacy Systems', 'Real-time Feeds'].map((dataset) => (
              <label key={dataset} className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.dataAccess?.datasets?.includes(dataset) || false}
                  onChange={(e) => {
                    const currentDatasets = formData.dataAccess?.datasets || [];
                    if (e.target.checked) {
                      onFormDataChange('dataAccess', { 
                        ...formData.dataAccess, 
                        datasets: [...currentDatasets, dataset] 
                      });
                    } else {
                      onFormDataChange('dataAccess', { 
                        ...formData.dataAccess, 
                        datasets: currentDatasets.filter(d => d !== dataset) 
                      });
                    }
                  }}
                  className="mr-2"
                />
                {dataset}
              </label>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-green-800 mb-2">
            Access Level
          </label>
          <select
            value={formData.dataAccess?.accessLevel || ''}
            onChange={(e) => onFormDataChange('dataAccess', { ...formData.dataAccess, accessLevel: e.target.value })}
            className="input-field"
          >
            <option value="">Select access level</option>
            <option value="Read Only">Read Only</option>
            <option value="Read/Write">Read/Write</option>
            <option value="Admin">Admin</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-green-800 mb-2">
            Additional Requirements
          </label>
          <textarea
            placeholder="Describe any specific data requirements..."
            value={formData.dataAccess?.requirements || ''}
            onChange={(e) => onFormDataChange('dataAccess', { ...formData.dataAccess, requirements: e.target.value })}
            className="input-field"
            rows="3"
          />
        </div>
      </div>
    </div>
  );

  // Analytics Resources Form
  const AnalyticsForm = () => (
    <div className="space-y-4 p-4 border border-purple-200 rounded-lg bg-purple-50">
      <h4 className="font-medium text-purple-900">📈 Analytics Resources Request</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-purple-800 mb-2">
            Databricks
          </label>
          <select
            value={formData.analyticsResources?.databricks || ''}
            onChange={(e) => onFormDataChange('analyticsResources', { ...formData.analyticsResources, databricks: e.target.value })}
            className="input-field"
          >
            <option value="">Select option</option>
            <option value="Standard">Standard Workspace</option>
            <option value="Premium">Premium Workspace</option>
            <option value="Enterprise">Enterprise Workspace</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-purple-800 mb-2">
            Power BI
          </label>
          <select
            value={formData.analyticsResources?.powerBI || ''}
            onChange={(e) => onFormDataChange('analyticsResources', { ...formData.analyticsResources, powerBI: e.target.value })}
            className="input-field"
          >
            <option value="">Select option</option>
            <option value="Pro">Pro License</option>
            <option value="Premium Per User">Premium Per User</option>
            <option value="Premium Per Capacity">Premium Per Capacity</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-purple-800 mb-2">
            Azure Synapse
          </label>
          <select
            value={formData.analyticsResources?.synapse || ''}
            onChange={(e) => onFormDataChange('analyticsResources', { ...formData.analyticsResources, synapse: e.target.value })}
            className="input-field"
          >
            <option value="">Select option</option>
            <option value="Serverless">Serverless</option>
            <option value="Dedicated">Dedicated</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-purple-800 mb-2">
            Additional Tools
          </label>
          <input
            type="text"
            placeholder="Other analytics tools needed"
            value={formData.analyticsResources?.additionalTools || ''}
            onChange={(e) => onFormDataChange('analyticsResources', { ...formData.analyticsResources, additionalTools: e.target.value })}
            className="input-field"
          />
        </div>
      </div>
    </div>
  );

  // Power Platform Form
  const PowerPlatformForm = () => (
    <div className="space-y-4 p-4 border border-yellow-200 rounded-lg bg-yellow-50">
      <h4 className="font-medium text-yellow-900">⚡ Power Platform Resources Request</h4>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-yellow-800 mb-2">
            Environments
          </label>
          <div className="space-y-2">
            {['Development', 'Test', 'Production'].map((env) => (
              <label key={env} className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.powerPlatformResources?.environments?.includes(env) || false}
                  onChange={(e) => {
                    const currentEnvs = formData.powerPlatformResources?.environments || [];
                    if (e.target.checked) {
                      onFormDataChange('powerPlatformResources', { 
                        ...formData.powerPlatformResources, 
                        environments: [...currentEnvs, env] 
                      });
                    } else {
                      onFormDataChange('powerPlatformResources', { 
                        ...formData.powerPlatformResources, 
                        environments: currentEnvs.filter(e => e !== env) 
                      });
                    }
                  }}
                  className="mr-2"
                />
                {env}
              </label>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-yellow-800 mb-2">
              Power Apps
            </label>
            <select
              value={formData.powerPlatformResources?.powerApps || ''}
              onChange={(e) => onFormDataChange('powerPlatformResources', { ...formData.powerPlatformResources, powerApps: e.target.value })}
              className="input-field"
            >
              <option value="">Select option</option>
              <option value="Per User">Per User License</option>
              <option value="Per App">Per App License</option>
              <option value="Per Flow">Per Flow License</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-yellow-800 mb-2">
              Power Automate
            </label>
            <select
              value={formData.powerPlatformResources?.powerAutomate || ''}
              onChange={(e) => onFormDataChange('powerPlatformResources', { ...formData.powerPlatformResources, powerAutomate: e.target.value })}
              className="input-field"
            >
              <option value="">Select option</option>
              <option value="Standard">Standard</option>
              <option value="Premium">Premium</option>
            </select>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-yellow-800 mb-2">
            Connectors Needed
          </label>
          <input
            type="text"
            placeholder="List required connectors (e.g., SharePoint, SQL, REST API)"
            value={formData.powerPlatformResources?.connectors || ''}
            onChange={(e) => onFormDataChange('powerPlatformResources', { ...formData.powerPlatformResources, connectors: e.target.value })}
            className="input-field"
          />
        </div>
      </div>
    </div>
  );

  // Infrastructure Access Form (only for self-development)
  const InfrastructureForm = () => (
    <div className="space-y-4 p-4 border border-gray-200 rounded-lg bg-gray-50">
      <h4 className="font-medium text-gray-900">🏗️ Infrastructure Access Request</h4>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-800 mb-2">
            Azure Resources
          </label>
          <div className="space-y-2">
            {['Virtual Machines', 'App Services', 'Storage Accounts', 'Key Vault', 'Network Security Groups'].map((resource) => (
              <label key={resource} className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.infrastructureAccess?.azureResources?.includes(resource) || false}
                  onChange={(e) => {
                    const currentResources = formData.infrastructureAccess?.azureResources || [];
                    if (e.target.checked) {
                      onFormDataChange('infrastructureAccess', { 
                        ...formData.infrastructureAccess, 
                        azureResources: [...currentResources, resource] 
                      });
                    } else {
                      onFormDataChange('infrastructureAccess', { 
                        ...formData.infrastructureAccess, 
                        azureResources: currentResources.filter(r => r !== resource) 
                      });
                    }
                  }}
                  className="mr-2"
                />
                {resource}
              </label>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-800 mb-2">
            Database Access
          </label>
          <select
            value={formData.infrastructureAccess?.databaseAccess || ''}
            onChange={(e) => onFormDataChange('infrastructureAccess', { ...formData.infrastructureAccess, databaseAccess: e.target.value })}
            className="input-field"
          >
            <option value="">Select access level</option>
            <option value="Read Only">Read Only</option>
            <option value="Read/Write">Read/Write</option>
            <option value="Admin">Admin</option>
          </select>
        </div>
      </div>
    </div>
  );

  if (selectedFeatures.length === 0) {
    return null;
  }

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-gray-900">Feature-Specific Requirements</h3>
      
      {selectedFeatures.includes('Artificial Intelligence') && <AIForm />}
      {selectedFeatures.includes('Data') && <DataForm />}
      {selectedFeatures.includes('Analytics') && <AnalyticsForm />}
      {selectedFeatures.includes('Power Platform') && <PowerPlatformForm />}
      
      {/* Show infrastructure form only for self-development projects */}
      {formData.developmentType === 'Self-development' && (
        <InfrastructureForm />
      )}
    </div>
  );
};

export default FeatureForms;
