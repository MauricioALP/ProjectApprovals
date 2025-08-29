import React, { useState } from 'react';
import { BellIcon, PlusIcon } from '@heroicons/react/24/outline';
import { useStore } from '../../store';
import { Link } from 'react-router-dom';

const Header = () => {
  const { notifications, removeNotification } = useStore();
  const [showNotifications, setShowNotifications] = useState(false);

  const pendingNotifications = notifications.filter(n => n.type === 'pending');

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4 dark:bg-gray-800 dark:border-gray-700">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Project Management</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Manage and track your projects</p>
        </div>

        <div className="flex items-center space-x-4">
          {/* Create Project Button */}
          <Link
            to="/create-project"
            className="btn-primary flex items-center space-x-2"
          >
            <PlusIcon className="w-5 h-5" />
            <span>Create Project</span>
          </Link>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors duration-200 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-700"
            >
              <BellIcon className="w-6 h-6" />
              {pendingNotifications.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {pendingNotifications.length}
                </span>
              )}
            </button>

            {/* Notifications Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50 dark:bg-gray-800 dark:border-gray-700">
                <div className="p-4 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Notifications</h3>
                </div>
                <div className="max-h-64 overflow-y-auto">
                  {notifications.length === 0 ? (
                    <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                      No notifications
                    </div>
                  ) : (
                    notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className="p-4 border-b border-gray-100 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-700"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                              {notification.title}
                            </p>
                            <p className="text-sm text-gray-500 mt-1 dark:text-gray-300">
                              {notification.message}
                            </p>
                            <p className="text-xs text-gray-400 mt-2 dark:text-gray-400">
                              {new Date(notification.timestamp).toLocaleString()}
                            </p>
                          </div>
                          <button
                            onClick={() => removeNotification(notification.id)}
                            className="ml-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                          >
                            ×
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
