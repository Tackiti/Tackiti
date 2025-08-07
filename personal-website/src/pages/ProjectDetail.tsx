import React from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';

const ProjectDetail: React.FC = () => {
  const { id } = useParams();

  return (
    <div className="pt-16 min-h-screen bg-primary-black">
      <div className="max-w-4xl mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-6xl font-display font-bold mb-8">
            <span className="text-primary-white">Project </span>
            <span className="text-accent-yellow">Details</span>
          </h1>
          
          <div className="bg-gray-800 rounded-lg p-8">
            <h2 className="text-2xl font-display font-semibold mb-4 text-white">
              Project #{id}
            </h2>
            <p className="text-gray-300 text-lg">
              This project detail page is currently being developed. Soon you'll be able to 
              see detailed information about each project, including progress updates, 
              media content, and in-depth descriptions.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProjectDetail;