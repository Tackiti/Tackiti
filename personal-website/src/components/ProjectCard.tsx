import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

import { Project } from '../types';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-500';
      case 'Planning':
        return 'bg-accent-yellow';
      case 'Completed':
        return 'bg-blue-500';
      case 'On Hold':
        return 'bg-accent-red';
      default:
        return 'bg-gray-500';
    }
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      'Creative Arts': 'text-purple-400',
      'Technology & AI': 'text-blue-400',
      'Science & Research': 'text-green-400',
      'Social Impact': 'text-accent-red',
      'Emerging Fields': 'text-accent-yellow',
    };
    return colors[category as keyof typeof colors] || 'text-gray-400';
  };

  return (
    <motion.div
      className="project-card overflow-hidden"
      whileHover={{ 
        scale: 1.02,
        transition: { duration: 0.2 }
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Link to={`/project/${project.id}`}>
        <div className="relative">
          {/* Project Image */}
          <div className="aspect-video overflow-hidden">
            <motion.img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {/* Status Badge */}
          <div className="absolute top-4 right-4">
            <span className={`px-3 py-1 rounded-full text-xs font-medium text-white ${getStatusColor(project.status)}`}>
              {project.status}
            </span>
          </div>

          {/* Category Badge */}
          <div className="absolute top-4 left-4">
            <span className={`px-3 py-1 rounded-full text-xs font-medium bg-gray-800/80 backdrop-blur-sm ${getCategoryColor(project.category)}`}>
              {project.category}
            </span>
          </div>
        </div>

        {/* Project Info */}
        <div className="p-6">
          <motion.h3 
            className="text-xl font-display font-semibold mb-2 text-primary-white"
            whileHover={{ color: '#FFD700' }}
            transition={{ duration: 0.2 }}
          >
            {project.title}
          </motion.h3>
          
          <p className="text-gray-300 text-sm leading-relaxed mb-4">
            {project.description}
          </p>

          {/* Action Button */}
          <motion.div
            className="flex items-center justify-between"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            <span className="text-accent-yellow text-sm font-medium">
              Learn More →
            </span>
          </motion.div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProjectCard;