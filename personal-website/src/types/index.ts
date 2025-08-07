export interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  status: 'Active' | 'Planning' | 'Completed' | 'On Hold';
  image: string;
  priority: number;
  content?: string;
  createdAt: string;
  updatedAt: string;
  tags?: string[];
  links?: {
    github?: string;
    demo?: string;
    documentation?: string;
  };
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  publishedAt: string;
  updatedAt: string;
  featuredImage?: string;
  videoUrl?: string;
  author: string;
  status: 'draft' | 'published' | 'scheduled';
}

export interface AdminUser {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'editor';
}

export interface ContentStats {
  totalProjects: number;
  activeProjects: number;
  totalBlogPosts: number;
  publishedPosts: number;
  categories: string[];
}