import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { blogService } from '../../utils/dataService';
import { BlogPost } from '../../types';

interface BlogManagerProps {
  onUpdate: () => void;
}

const BlogManager: React.FC<BlogManagerProps> = ({ onUpdate }) => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [filter, setFilter] = useState<'all' | 'published' | 'draft' | 'scheduled'>('all');

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = () => {
    const allPosts = blogService.getAll();
    setPosts(allPosts);
  };

  const handleAddPost = () => {
    setIsAdding(true);
    setEditingPost(null);
  };

  const handleEditPost = (post: BlogPost) => {
    setEditingPost(post);
    setIsAdding(false);
  };

  const handleDeletePost = (id: string) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      blogService.delete(id);
      loadPosts();
      onUpdate();
    }
  };

  const filteredPosts = posts.filter(post => 
    filter === 'all' ? true : post.status === filter
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
            Blog Manager
          </h1>
          <motion.button
            onClick={handleAddPost}
            className="px-6 py-3 bg-accent-red text-white rounded-lg font-medium hover:bg-red-500 transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            + Write Post
          </motion.button>
        </div>

        {/* Filter */}
        <div className="mb-6">
          <div className="flex space-x-2">
            {(['all', 'published', 'draft', 'scheduled'] as const).map((status) => (
              <motion.button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filter === status
                    ? 'bg-accent-red text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {status === 'all' ? 'All' : status.charAt(0).toUpperCase() + status.slice(1)}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Posts List */}
        <div className="grid gap-6">
          {filteredPosts.map((post, index) => (
            <motion.div
              key={post.id}
              className="bg-gray-800 rounded-lg p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-xl font-display font-semibold text-white">
                      {post.title}
                    </h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      post.status === 'published' ? 'bg-green-500 text-white' :
                      post.status === 'draft' ? 'bg-gray-500 text-white' :
                      'bg-accent-yellow text-primary-black'
                    }`}>
                      {post.status}
                    </span>
                  </div>
                  <p className="text-gray-300 mb-2">{post.excerpt}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-400">
                    <span>Category: {post.category}</span>
                    <span>Author: {post.author}</span>
                    <span>Published: {new Date(post.publishedAt).toLocaleDateString()}</span>
                  </div>
                  {post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {post.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="px-2 py-1 bg-gray-700 text-gray-300 rounded text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                
                <div className="flex space-x-2 ml-4">
                  <motion.button
                    onClick={() => handleEditPost(post)}
                    className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Edit
                  </motion.button>
                  <motion.button
                    onClick={() => handleDeletePost(post.id)}
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

        {filteredPosts.length === 0 && (
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p className="text-gray-400">No blog posts found.</p>
          </motion.div>
        )}
      </motion.div>

      {/* Add/Edit Modal would go here */}
      {(isAdding || editingPost) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            className="bg-gray-800 rounded-lg p-6 w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-2xl font-display font-bold text-white mb-6">
              {isAdding ? 'Write New Post' : 'Edit Post'}
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-gray-300 mb-2">Title</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-accent-red focus:outline-none"
                  placeholder="Post title"
                  defaultValue={editingPost?.title}
                />
              </div>
              
              <div>
                <label className="block text-gray-300 mb-2">Excerpt</label>
                <textarea
                  rows={2}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-accent-red focus:outline-none resize-none"
                  placeholder="Brief description of the post"
                  defaultValue={editingPost?.excerpt}
                />
              </div>
              
              <div>
                <label className="block text-gray-300 mb-2">Content</label>
                <textarea
                  rows={10}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-accent-red focus:outline-none resize-none"
                  placeholder="Write your post content here..."
                  defaultValue={editingPost?.content}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-300 mb-2">Category</label>
                  <select className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-accent-red focus:outline-none">
                    <option value="Thoughts">Thoughts</option>
                    <option value="Projects">Projects</option>
                    <option value="Updates">Updates</option>
                    <option value="Tutorials">Tutorials</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-gray-300 mb-2">Status</label>
                  <select className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-accent-red focus:outline-none">
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                    <option value="scheduled">Scheduled</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-gray-300 mb-2">Tags (comma-separated)</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-accent-red focus:outline-none"
                  placeholder="tag1, tag2, tag3"
                  defaultValue={editingPost?.tags.join(', ')}
                />
              </div>
              
              <div className="flex justify-end space-x-4 mt-6">
                <motion.button
                  onClick={() => {
                    setIsAdding(false);
                    setEditingPost(null);
                  }}
                  className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Cancel
                </motion.button>
                <motion.button
                  className="px-6 py-3 bg-accent-red text-white rounded-lg font-medium hover:bg-red-500 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isAdding ? 'Publish Post' : 'Save Changes'}
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default BlogManager;