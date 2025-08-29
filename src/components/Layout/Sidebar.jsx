import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  HomeIcon, 
  FolderIcon, 
  ClipboardDocumentCheckIcon, 
  Cog6ToothIcon,
  SunIcon,
  MoonIcon
} from '@heroicons/react/24/outline';
import { useStore } from '../../store';

const Sidebar = () => {
  const location = useLocation();
  const { darkMode, toggleDarkMode } = useStore();

  const navigation = [
    { name: 'Dashboard', href: '/', icon: HomeIcon },
    { name: 'My Projects', href: '/projects', icon: FolderIcon },
    { name: 'Approvals', href: '/approvals', icon: ClipboardDocumentCheckIcon },
    { name: 'Settings', href: '/settings', icon: Cog6ToothIcon },
  ];

  return (
    <div className="flex flex-col h-full bg-white border-r border-gray-200 dark:bg-gray-900 dark:border-gray-800">
      {/* Logo and Brand */}
      <div className="flex items-center justify-center h-16 px-4 border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">E</span>
          </div>
          <span className="text-lg font-semibold text-primary-600 dark:text-primary-300">Project Approvals</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.name}
              to={item.href}
              className={`sidebar-item ${isActive ? 'active' : ''}`}
            >
              <item.icon className="w-5 h-5 mr-3" />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Section */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-800">
        {/* Dark Mode Toggle */}
        <button
          onClick={toggleDarkMode}
          className="flex items-center w-full px-3 py-2 text-gray-700 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors duration-200 dark:text-gray-200 dark:hover:bg-gray-700"
        >
          {darkMode ? (
            <>
              <SunIcon className="w-5 h-5 mr-3" />
              Light Mode
            </>
          ) : (
            <>
              <MoonIcon className="w-5 h-5 mr-3" />
              Dark Mode
            </>
          )}
        </button>

        {/* User Info */}
        <div className="mt-4 p-3 bg-gray-50 rounded-lg dark:bg-gray-800">
          <div className="text-sm font-medium text-gray-900 dark:text-gray-100">Juan Carlos Pérez</div>
          <div className="text-xs text-gray-500 dark:text-gray-400">Data Scientist</div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
