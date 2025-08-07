import React from 'react';
import { motion } from 'framer-motion';

const Contact: React.FC = () => {
  return (
    <div className="pt-16 min-h-screen bg-primary-black">
      <div className="max-w-4xl mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-6xl font-display font-bold mb-8">
            <span className="text-primary-white">Get in </span>
            <span className="text-accent-yellow">Touch</span>
          </h1>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-display font-semibold mb-6 text-accent-yellow">
                Let's Connect
              </h2>
              <p className="text-gray-300 text-lg mb-8">
                I'm always interested in new collaborations, discussions, and opportunities 
                to learn from others. Whether you want to discuss a project, share ideas, 
                or just say hello, I'd love to hear from you.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-accent-yellow rounded-full flex items-center justify-center">
                    <span className="text-primary-black font-bold">E</span>
                  </div>
                  <span className="text-gray-300">email@example.com</span>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-accent-red rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">T</span>
                  </div>
                  <span className="text-gray-300">@yourusername</span>
                </div>
              </div>
            </div>
            
            <div>
              <h2 className="text-2xl font-display font-semibold mb-6 text-accent-yellow">
                Send a Message
              </h2>
              <form className="space-y-6">
                <div>
                  <label className="block text-gray-300 mb-2">Name</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-accent-yellow focus:outline-none transition-colors"
                    placeholder="Your name"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-300 mb-2">Email</label>
                  <input 
                    type="email" 
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-accent-yellow focus:outline-none transition-colors"
                    placeholder="your@email.com"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-300 mb-2">Message</label>
                  <textarea 
                    rows={4}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-accent-yellow focus:outline-none transition-colors resize-none"
                    placeholder="Your message..."
                  ></textarea>
                </div>
                
                <motion.button
                  type="submit"
                  className="btn-primary w-full"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Send Message
                </motion.button>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;