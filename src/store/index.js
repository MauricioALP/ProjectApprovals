import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Mock data for initial state
const mockProjects = [
  {
    id: '1',
    name: 'AI-Powered Data Analytics Platform',
    scope: 'Develop an intelligent analytics platform for operational data',
    objective: 'Improve decision-making through AI-driven insights',
    owner: 'Juan Carlos Pérez',
    createdAt: '2024-01-15',
    features: ['Artificial Intelligence', 'Data', 'Analytics'],
    developmentType: 'Self-development',
    state: 'Approved',
    aiResources: ['Azure AI Foundry', 'OpenAI'],
    dataAccess: ['Production Database', 'Historical Records'],
    analyticsResources: ['Databricks', 'Power BI Premium'],
    infrastructureAccess: ['Azure Subscription', 'Database Access'],
    approvals: [
      { role: 'IT Manager', status: 'Approved', date: '2024-01-20' },
      { role: 'Data Officer', status: 'Approved', date: '2024-01-22' }
    ]
  },
  {
    id: '2',
    name: 'Power Platform Automation Suite',
    scope: 'Automate business processes using Power Platform',
    objective: 'Reduce manual work and improve efficiency',
    owner: 'María González',
    createdAt: '2024-01-10',
    features: ['Power Platform'],
    developmentType: 'Third-party development',
    state: 'In Progress',
    powerPlatformResources: ['Power Automate', 'Power Apps', 'Power BI'],
    approvals: [
      { role: 'Business Manager', status: 'Approved', date: '2024-01-15' },
      { role: 'IT Manager', status: 'Approved', date: '2024-01-18' }
    ]
  },
  {
    id: '3',
    name: 'Data Warehouse Modernization',
    scope: 'Upgrade existing data warehouse infrastructure',
    objective: 'Improve data processing performance and scalability',
    owner: 'Carlos Rodríguez',
    createdAt: '2024-01-05',
    features: ['Data', 'Analytics'],
    developmentType: 'Self-development',
    state: 'Draft',
    dataAccess: ['Legacy Systems', 'External APIs'],
    analyticsResources: ['Azure Synapse', 'Power BI'],
    infrastructureAccess: ['Azure Resources', 'Database Admin Access'],
    approvals: []
  }
];

const mockUsers = [
  { id: '1', name: 'Juan Carlos Pérez', role: 'Data Scientist', email: 'juan.perez@ecopetrol.com' },
  { id: '2', name: 'María González', role: 'Business Analyst', email: 'maria.gonzalez@ecopetrol.com' },
  { id: '3', name: 'Carlos Rodríguez', role: 'Data Engineer', email: 'carlos.rodriguez@ecopetrol.com' },
  { id: '4', name: 'Ana Martínez', role: 'IT Manager', email: 'ana.martinez@ecopetrol.com' },
  { id: '5', name: 'Luis Fernández', role: 'Data Officer', email: 'luis.fernandez@ecopetrol.com' }
];

export const useStore = create(
  persist(
    (set, get) => ({
      // State
      projects: mockProjects,
      users: mockUsers,
      currentUser: mockUsers[0], // Simulate logged-in user
      darkMode: false,
      notifications: [],
      
      // Actions
      addProject: (project) => set((state) => ({
        projects: [...state.projects, { ...project, id: Date.now().toString() }]
      })),
      
      updateProject: (id, updates) => set((state) => ({
        projects: state.projects.map(project => 
          project.id === id ? { ...project, ...updates } : project
        )
      })),
      
      deleteProject: (id) => set((state) => ({
        projects: state.projects.filter(project => project.id !== id)
      })),
      
      updateProjectState: (id, newState) => set((state) => ({
        projects: state.projects.map(project => 
          project.id === id ? { ...project, state: newState } : project
        )
      })),
      
      addNotification: (notification) => set((state) => ({
        notifications: [...state.notifications, { ...notification, id: Date.now().toString() }]
      })),
      
      removeNotification: (id) => set((state) => ({
        notifications: state.notifications.filter(n => n.id !== id)
      })),
      
      toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
      
      // Computed values
      getProjectsByState: (state) => get().projects.filter(p => p.state === state),
      
      getProjectCounts: () => {
        const projects = get().projects;
        return {
          Draft: projects.filter(p => p.state === 'Draft').length,
          Created: projects.filter(p => p.state === 'Created').length,
          Approved: projects.filter(p => p.state === 'Approved').length,
          'In Progress': projects.filter(p => p.state === 'In Progress').length,
          Completed: projects.filter(p => p.state === 'Completed').length,
        };
      },
      
      getProjectsByUser: (userId) => get().projects.filter(p => p.owner === userId),
      
      getProjectsByFeature: (feature) => get().projects.filter(p => p.features.includes(feature)),
    }),
    {
      name: 'project-approvals-storage',
      partialize: (state) => ({ 
        projects: state.projects, 
        users: state.users, 
        darkMode: state.darkMode 
      }),
    }
  )
);
