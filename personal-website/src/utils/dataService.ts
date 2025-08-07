import { Project, BlogPost, ContentStats } from '../types';

// Local storage keys
const PROJECTS_KEY = 'portfolio_projects';
const BLOG_POSTS_KEY = 'portfolio_blog_posts';

// Default data
const defaultProjects: Project[] = [
  {
    id: '1',
    title: 'AI Research Project',
    description: 'Exploring machine learning algorithms for pattern recognition',
    category: 'Technology & AI',
    status: 'Active',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop',
    priority: 1,
    content: 'Detailed content about AI research project...',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    tags: ['AI', 'Machine Learning', 'Research'],
    links: {
      github: 'https://github.com/example/ai-project',
      demo: 'https://demo.example.com'
    }
  },
  {
    id: '2',
    title: 'Classical Music Composition',
    description: 'Creating original pieces inspired by Baroque and Classical periods',
    category: 'Creative Arts',
    status: 'Active',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop',
    priority: 2,
    content: 'Detailed content about classical music composition...',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    tags: ['Music', 'Classical', 'Composition']
  },
  {
    id: '3',
    title: 'Organic Computing Research',
    description: 'Investigating biological computing systems and neural networks',
    category: 'Science & Research',
    status: 'Planning',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
    priority: 3,
    content: 'Detailed content about organic computing research...',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    tags: ['Biology', 'Computing', 'Research']
  }
];

const defaultBlogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'The Intersection of Art and Technology',
    excerpt: 'Exploring how traditional art forms can inspire modern technological innovations.',
    content: 'Full blog post content here...',
    category: 'Thoughts',
    tags: ['Art', 'Technology', 'Innovation'],
    publishedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    author: 'Portfolio Owner',
    status: 'published'
  }
];

// Helper functions
const getFromStorage = <T>(key: string, defaultValue: T): T => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch {
    return defaultValue;
  }
};

const saveToStorage = <T>(key: string, data: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
};

// Project management
export const projectService = {
  getAll: (): Project[] => {
    return getFromStorage(PROJECTS_KEY, defaultProjects);
  },

  getById: (id: string): Project | undefined => {
    const projects = projectService.getAll();
    return projects.find(p => p.id === id);
  },

  create: (project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>): Project => {
    const projects = projectService.getAll();
    const newProject: Project = {
      ...project,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    projects.push(newProject);
    saveToStorage(PROJECTS_KEY, projects);
    return newProject;
  },

  update: (id: string, updates: Partial<Project>): Project | null => {
    const projects = projectService.getAll();
    const index = projects.findIndex(p => p.id === id);
    
    if (index === -1) return null;
    
    projects[index] = {
      ...projects[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    
    saveToStorage(PROJECTS_KEY, projects);
    return projects[index];
  },

  delete: (id: string): boolean => {
    const projects = projectService.getAll();
    const filtered = projects.filter(p => p.id !== id);
    
    if (filtered.length === projects.length) return false;
    
    saveToStorage(PROJECTS_KEY, filtered);
    return true;
  },

  getByCategory: (category: string): Project[] => {
    const projects = projectService.getAll();
    return projects.filter(p => p.category === category);
  },

  getByStatus: (status: Project['status']): Project[] => {
    const projects = projectService.getAll();
    return projects.filter(p => p.status === status);
  }
};

// Blog post management
export const blogService = {
  getAll: (): BlogPost[] => {
    return getFromStorage(BLOG_POSTS_KEY, defaultBlogPosts);
  },

  getById: (id: string): BlogPost | undefined => {
    const posts = blogService.getAll();
    return posts.find(p => p.id === id);
  },

  create: (post: Omit<BlogPost, 'id' | 'publishedAt' | 'updatedAt'>): BlogPost => {
    const posts = blogService.getAll();
    const newPost: BlogPost = {
      ...post,
      id: Date.now().toString(),
      publishedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    posts.push(newPost);
    saveToStorage(BLOG_POSTS_KEY, posts);
    return newPost;
  },

  update: (id: string, updates: Partial<BlogPost>): BlogPost | null => {
    const posts = blogService.getAll();
    const index = posts.findIndex(p => p.id === id);
    
    if (index === -1) return null;
    
    posts[index] = {
      ...posts[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    
    saveToStorage(BLOG_POSTS_KEY, posts);
    return posts[index];
  },

  delete: (id: string): boolean => {
    const posts = blogService.getAll();
    const filtered = posts.filter(p => p.id !== id);
    
    if (filtered.length === posts.length) return false;
    
    saveToStorage(BLOG_POSTS_KEY, filtered);
    return true;
  },

  getPublished: (): BlogPost[] => {
    const posts = blogService.getAll();
    return posts.filter(p => p.status === 'published');
  }
};

// Stats service
export const statsService = {
  getStats: (): ContentStats => {
    const projects = projectService.getAll();
    const posts = blogService.getAll();
    
    const categories = Array.from(new Set(projects.map(p => p.category)));
    
    return {
      totalProjects: projects.length,
      activeProjects: projects.filter(p => p.status === 'Active').length,
      totalBlogPosts: posts.length,
      publishedPosts: posts.filter(p => p.status === 'published').length,
      categories
    };
  }
};