import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { statsService } from '../utils/dataService';
import { ContentStats } from '../types';
import AdminSidebar from '../components/admin/AdminSidebar';
import AdminOverview from '../components/admin/AdminOverview';
import ProjectManager from '../components/admin/ProjectManager';
import BlogManager from '../components/admin/BlogManager';

type AdminView = 'overview' | 'projects' | 'blog';

const Admin: React.FC = () => {
  const [currentView, setCurrentView] = useState<AdminView>('overview');
  const [stats, setStats] = useState<ContentStats | null>(null);

  useEffect(() => {
    setStats(statsService.getStats());
  }, []);

  const handleViewChange = (view: AdminView) => {
    setCurrentView(view);
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'overview':
        return <AdminOverview stats={stats} />;
      case 'projects':
        return <ProjectManager onUpdate={() => setStats(statsService.getStats())} />;
      case 'blog':
        return <BlogManager onUpdate={() => setStats(statsService.getStats())} />;
      default:
        return <AdminOverview stats={stats} />;
    }
  };

  return (
    <div className="pt-16 min-h-screen bg-gray-900">
      <div className="flex">
        {/* Sidebar */}
        <AdminSidebar 
          currentView={currentView} 
          onViewChange={handleViewChange}
          stats={stats}
        />
        
        {/* Main Content */}
        <div className="flex-1 p-8">
          <motion.div
            key={currentView}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            {renderCurrentView()}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Admin;