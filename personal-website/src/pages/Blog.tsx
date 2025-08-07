import React from 'react';
import { motion } from 'framer-motion';

const Blog: React.FC = () => {
  return (
    <div className="pt-16 min-h-screen bg-primary-black">
      <div className="max-w-6xl mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-6xl font-display font-bold mb-8">
            <span className="text-primary-white">My </span>
            <span className="text-accent-yellow">Blog</span>
          </h1>
          
          <p className="text-xl text-gray-300 mb-12 max-w-3xl">
            Thoughts, updates, and insights from my various projects and explorations. 
            I share what I learn, what I'm working on, and what excites me.
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Placeholder for blog posts */}
            <motion.div 
              className="bg-gray-800 rounded-lg p-6"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <div className="text-sm text-accent-yellow mb-2">Coming Soon</div>
              <h3 className="text-xl font-display font-semibold mb-3 text-white">
                Blog System in Development
              </h3>
              <p className="text-gray-300 text-sm mb-4">
                The blog system is currently being developed. Soon you'll be able to read 
                about my projects, thoughts, and discoveries here.
              </p>
              <div className="text-xs text-gray-500">Date: TBD</div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Blog;