import React from 'react';
import { motion } from 'framer-motion';

const About: React.FC = () => {
  return (
    <div className="pt-16 min-h-screen bg-primary-black">
      <div className="max-w-4xl mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-6xl font-display font-bold mb-8">
            <span className="text-primary-white">About </span>
            <span className="text-accent-yellow">Me</span>
          </h1>
          
          <div className="prose prose-invert max-w-none">
            <p className="text-xl text-gray-300 leading-relaxed mb-6">
              I'm a 17-year-old with an insatiable curiosity for the world around me. 
              My interests span across traditional art, classical music, AI research, 
              physics, biology, politics, and emerging technologies.
            </p>
            
            <p className="text-xl text-gray-300 leading-relaxed mb-6">
              I believe in the power of interdisciplinary thinking and the connections 
              between seemingly unrelated fields. Each project I work on teaches me 
              something new that I can apply to other areas of my life and work.
            </p>
            
            <p className="text-xl text-gray-300 leading-relaxed">
              This website serves as a living portfolio of my explorations, experiments, 
              and ongoing projects. I update it frequently as I learn, create, and grow.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;