import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useStore } from './store';
import Sidebar from './components/Layout/Sidebar';
import Header from './components/Layout/Header';
import Dashboard from './components/Dashboard/Dashboard';
import ProjectsList from './components/Projects/ProjectsList';
import CreateProjectForm from './components/ProjectForm/CreateProjectForm';
import ProjectDetail from './components/ProjectDetail/ProjectDetail';
import ApprovalsList from './components/Approvals/ApprovalsList';
import Settings from './components/Settings/Settings';

function App() {
  const { darkMode } = useStore();

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      <Router>
        <div className="flex h-screen bg-background">
          {/* Sidebar */}
          <div className="w-64 flex-shrink-0">
            <Sidebar />
          </div>

          {/* Main Content */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Header */}
            <Header />

            {/* Page Content */}
            <main className="flex-1 overflow-y-auto p-6">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/projects" element={<ProjectsList />} />
                <Route path="/create-project" element={<CreateProjectForm />} />
                <Route path="/projects/:id" element={<ProjectDetail />} />
                <Route path="/approvals" element={<ApprovalsList />} />
                <Route path="/settings" element={<Settings />} />
              </Routes>
            </main>
          </div>
        </div>
      </Router>
    </div>
  );
}

export default App;
