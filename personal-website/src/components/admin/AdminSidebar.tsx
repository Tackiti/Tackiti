import React from 'react';
import { motion } from 'framer-motion';
import { ContentStats } from '../../types';

interface AdminSidebarProps {
  currentView: 'overview' | 'projects' | 'blog';
  onViewChange: (view: 'overview' | 'projects' | 'blog') => void;
  stats: ContentStats | null;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ currentView, onViewChange, stats }) => {
  const menuItems = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'projects', label: 'Projects', icon: '🚀' },
    { id: 'blog', label: 'Blog', icon: '✍️' },
  ];

  return (
    <motion.div 
      className="w-64 bg-gray-800 min-h-screen p-6"
      initial={{ x: -100 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-display font-bold text-accent-yellow mb-2">
          Admin Panel
        </h1>
        <p className="text-gray-400 text-sm">
          Manage your content
        </p>
      </div>

      {/* Navigation */}
      <nav className="mb-8">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.id}>
              <motion.button
                className={`w-full text-left px-4 py-3 rounded-lg flex items-center space-x-3 transition-colors ${
                  currentView === item.id
                    ? 'bg-accent-yellow text-primary-black'
                    : 'text-gray-300 hover:text-accent-yellow hover:bg-gray-700'
                }`}
                onClick={() => onViewChange(item.id as 'overview' | 'projects' | 'blog')}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="text-lg">{item.icon}</span>
                <span className="font-medium">{item.label}</span>
              </motion.button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Quick Stats */}
      {stats && (
        <div className="bg-gray-700 rounded-lg p-4">
          <h3 className="text-sm font-medium text-gray-300 mb-3">Quick Stats</h3>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Projects</span>
              <span className="text-accent-yellow font-medium">{stats.totalProjects}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Active</span>
              <span className="text-green-400 font-medium">{stats.activeProjects}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Blog Posts</span>
              <span className="text-accent-yellow font-medium">{stats.totalBlogPosts}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Published</span>
              <span className="text-green-400 font-medium">{stats.publishedPosts}</span>
            </div>
          </div>
        </div>
      )}

      {/* Back to Site */}
      <div className="mt-8">
        <motion.a
          href="/"
          className="block w-full text-center px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition-colors"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          ← Back to Site
        </motion.a>
      </div>
    </motion.div>
  );
};

export default AdminSidebar;