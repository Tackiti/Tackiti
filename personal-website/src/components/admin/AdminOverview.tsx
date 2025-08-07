import React from 'react';
import { motion } from 'framer-motion';
import { ContentStats } from '../../types';

interface AdminOverviewProps {
  stats: ContentStats | null;
}

const AdminOverview: React.FC<AdminOverviewProps> = ({ stats }) => {
  if (!stats) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400">Loading stats...</div>
      </div>
    );
  }

  const recentActivity = [
    { type: 'project', action: 'Updated', item: 'AI Research Project', time: '2 hours ago' },
    { type: 'blog', action: 'Published', item: 'The Intersection of Art and Technology', time: '1 day ago' },
    { type: 'project', action: 'Created', item: 'Organic Computing Research', time: '3 days ago' },
  ];

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-display font-bold text-white mb-8">
          Dashboard Overview
        </h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            className="bg-gray-800 rounded-lg p-6"
            whileHover={{ y: -5 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Projects</p>
                <p className="text-3xl font-bold text-accent-yellow">{stats.totalProjects}</p>
              </div>
              <div className="text-3xl">🚀</div>
            </div>
          </motion.div>

          <motion.div
            className="bg-gray-800 rounded-lg p-6"
            whileHover={{ y: -5 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Active Projects</p>
                <p className="text-3xl font-bold text-green-400">{stats.activeProjects}</p>
              </div>
              <div className="text-3xl">⚡</div>
            </div>
          </motion.div>

          <motion.div
            className="bg-gray-800 rounded-lg p-6"
            whileHover={{ y: -5 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Blog Posts</p>
                <p className="text-3xl font-bold text-accent-yellow">{stats.totalBlogPosts}</p>
              </div>
              <div className="text-3xl">✍️</div>
            </div>
          </motion.div>

          <motion.div
            className="bg-gray-800 rounded-lg p-6"
            whileHover={{ y: -5 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Published</p>
                <p className="text-3xl font-bold text-green-400">{stats.publishedPosts}</p>
              </div>
              <div className="text-3xl">📝</div>
            </div>
          </motion.div>
        </div>

        {/* Categories */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            className="bg-gray-800 rounded-lg p-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-xl font-display font-semibold text-white mb-4">
              Project Categories
            </h3>
            <div className="space-y-3">
              {stats.categories.map((category, index) => (
                <motion.div
                  key={category}
                  className="flex items-center justify-between p-3 bg-gray-700 rounded-lg"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                >
                  <span className="text-gray-300">{category}</span>
                  <span className="text-accent-yellow font-medium">
                    {Math.floor(Math.random() * 5) + 1} projects
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="bg-gray-800 rounded-lg p-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="text-xl font-display font-semibold text-white mb-4">
              Recent Activity
            </h3>
            <div className="space-y-3">
              {recentActivity.map((activity, index) => (
                <motion.div
                  key={index}
                  className="flex items-center space-x-3 p-3 bg-gray-700 rounded-lg"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
                >
                  <div className={`w-2 h-2 rounded-full ${
                    activity.type === 'project' ? 'bg-accent-yellow' : 'bg-accent-red'
                  }`}></div>
                  <div className="flex-1">
                    <p className="text-gray-300 text-sm">
                      <span className="text-accent-yellow">{activity.action}</span> {activity.item}
                    </p>
                    <p className="text-gray-500 text-xs">{activity.time}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <motion.div
          className="mt-8 bg-gray-800 rounded-lg p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <h3 className="text-xl font-display font-semibold text-white mb-4">
            Quick Actions
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <motion.button
              className="flex items-center justify-center space-x-2 px-4 py-3 bg-accent-yellow text-primary-black rounded-lg font-medium hover:bg-yellow-400 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>➕</span>
              <span>Add Project</span>
            </motion.button>
            
            <motion.button
              className="flex items-center justify-center space-x-2 px-4 py-3 bg-accent-red text-white rounded-lg font-medium hover:bg-red-500 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>✍️</span>
              <span>Write Post</span>
            </motion.button>
            
            <motion.button
              className="flex items-center justify-center space-x-2 px-4 py-3 bg-gray-700 text-gray-300 rounded-lg font-medium hover:bg-gray-600 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>📊</span>
              <span>View Analytics</span>
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AdminOverview;