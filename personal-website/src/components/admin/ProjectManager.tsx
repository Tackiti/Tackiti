import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { projectService } from '../../utils/dataService';
import { Project } from '../../types';

interface ProjectManagerProps {
  onUpdate: () => void;
}

const ProjectManager: React.FC<ProjectManagerProps> = ({ onUpdate }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [filter, setFilter] = useState<'all' | 'Active' | 'Planning' | 'Completed' | 'On Hold'>('all');

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = () => {
    const allProjects = projectService.getAll();
    setProjects(allProjects);
  };

  const handleAddProject = () => {
    setIsAdding(true);
    setEditingProject(null);
  };

  const handleEditProject = (project: Project) => {
    setEditingProject(project);
    setIsAdding(false);
  };

  const handleDeleteProject = (id: string) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      projectService.delete(id);
      loadProjects();
      onUpdate();
    }
  };

  const filteredProjects = projects.filter(project => 
    filter === 'all' ? true : project.status === filter
  );

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-display font-bold text-white">
            Project Manager
          </h1>
          <motion.button
            onClick={handleAddProject}
            className="px-6 py-3 bg-accent-yellow text-primary-black rounded-lg font-medium hover:bg-yellow-400 transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            + Add Project
          </motion.button>
        </div>

        {/* Filter */}
        <div className="mb-6">
          <div className="flex space-x-2">
            {(['all', 'Active', 'Planning', 'Completed', 'On Hold'] as const).map((status) => (
              <motion.button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filter === status
                    ? 'bg-accent-yellow text-primary-black'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {status === 'all' ? 'All' : status}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Projects List */}
        <div className="grid gap-6">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              className="bg-gray-800 rounded-lg p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-xl font-display font-semibold text-white">
                      {project.title}
                    </h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      project.status === 'Active' ? 'bg-green-500 text-white' :
                      project.status === 'Planning' ? 'bg-accent-yellow text-primary-black' :
                      project.status === 'Completed' ? 'bg-blue-500 text-white' :
                      'bg-accent-red text-white'
                    }`}>
                      {project.status}
                    </span>
                  </div>
                  <p className="text-gray-300 mb-2">{project.description}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-400">
                    <span>Category: {project.category}</span>
                    <span>Priority: {project.priority}</span>
                    <span>Updated: {new Date(project.updatedAt).toLocaleDateString()}</span>
                  </div>
                </div>
                
                <div className="flex space-x-2 ml-4">
                  <motion.button
                    onClick={() => handleEditProject(project)}
                    className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Edit
                  </motion.button>
                  <motion.button
                    onClick={() => handleDeleteProject(project.id)}
                    className="px-3 py-1 bg-accent-red text-white rounded text-sm hover:bg-red-600 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Delete
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p className="text-gray-400">No projects found.</p>
          </motion.div>
        )}
      </motion.div>

      {/* Add/Edit Modal would go here */}
      {(isAdding || editingProject) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            className="bg-gray-800 rounded-lg p-6 w-full max-w-2xl mx-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-2xl font-display font-bold text-white mb-6">
              {isAdding ? 'Add New Project' : 'Edit Project'}
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-gray-300 mb-2">Title</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-accent-yellow focus:outline-none"
                  placeholder="Project title"
                  defaultValue={editingProject?.title}
                />
              </div>
              
              <div>
                <label className="block text-gray-300 mb-2">Description</label>
                <textarea
                  rows={3}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-accent-yellow focus:outline-none resize-none"
                  placeholder="Project description"
                  defaultValue={editingProject?.description}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-300 mb-2">Category</label>
                  <select className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-accent-yellow focus:outline-none">
                    <option value="Creative Arts">Creative Arts</option>
                    <option value="Technology & AI">Technology & AI</option>
                    <option value="Science & Research">Science & Research</option>
                    <option value="Social Impact">Social Impact</option>
                    <option value="Emerging Fields">Emerging Fields</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-gray-300 mb-2">Status</label>
                  <select className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-accent-yellow focus:outline-none">
                    <option value="Active">Active</option>
                    <option value="Planning">Planning</option>
                    <option value="Completed">Completed</option>
                    <option value="On Hold">On Hold</option>
                  </select>
                </div>
              </div>
              
              <div className="flex justify-end space-x-4 mt-6">
                <motion.button
                  onClick={() => {
                    setIsAdding(false);
                    setEditingProject(null);
                  }}
                  className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Cancel
                </motion.button>
                <motion.button
                  className="px-6 py-3 bg-accent-yellow text-primary-black rounded-lg font-medium hover:bg-yellow-400 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isAdding ? 'Add Project' : 'Save Changes'}
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default ProjectManager;