import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import ProjectCard from '../components/ProjectCard';

// Mock data for demonstration
const featuredProjects = [
  {
    id: 1,
    title: "AI Research Project",
    description: "Exploring machine learning algorithms for pattern recognition",
    category: "Technology & AI",
    status: "Active",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop",
    priority: 1
  },
  {
    id: 2,
    title: "Classical Music Composition",
    description: "Creating original pieces inspired by Baroque and Classical periods",
    category: "Creative Arts",
    status: "Active",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop",
    priority: 2
  },
  {
    id: 3,
    title: "Organic Computing Research",
    description: "Investigating biological computing systems and neural networks",
    category: "Science & Research",
    status: "Planning",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
    priority: 3
  },
  {
    id: 4,
    title: "Traditional Art Collection",
    description: "Oil paintings exploring themes of nature and human emotion",
    category: "Creative Arts",
    status: "Active",
    image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=300&fit=crop",
    priority: 4
  }
];

const Home: React.FC = () => {
  return (
    <div className="pt-16">
      {/* Hero Section */}
      <motion.section 
        className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-black via-gray-900 to-primary-black"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="text-center max-w-4xl mx-auto px-4">
          <motion.h1 
            className="text-5xl md:text-7xl font-display font-bold mb-6"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="text-primary-white">Exploring the </span>
            <span className="text-accent-yellow">Boundaries</span>
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            A 17-year-old's journey through art, science, technology, and innovation. 
            Discovering connections across diverse fields and pushing creative boundaries.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Link to="/about" className="btn-primary">
              Learn More About Me
            </Link>
            <Link to="/blog" className="btn-secondary">
              Read My Blog
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* Featured Projects Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
              <span className="text-primary-white">Featured </span>
              <span className="text-accent-yellow">Projects</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              A glimpse into my current work and ongoing explorations across various disciplines.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {featuredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </div>

          <motion.div 
            className="text-center mt-12"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Link to="/blog" className="btn-primary">
              View All Projects
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Quick Stats Section */}
      <section className="py-20 bg-primary-black">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div>
              <div className="text-3xl md:text-4xl font-display font-bold text-accent-yellow mb-2">12+</div>
              <div className="text-gray-400">Active Projects</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-display font-bold text-accent-yellow mb-2">8</div>
              <div className="text-gray-400">Categories</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-display font-bold text-accent-yellow mb-2">24</div>
              <div className="text-gray-400">Blog Posts</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-display font-bold text-accent-yellow mb-2">∞</div>
              <div className="text-gray-400">Possibilities</div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;