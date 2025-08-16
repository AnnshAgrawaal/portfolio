import type { Project } from '@/types';

export const projects: Project[] = [
    {
        id: 'project-1',
        title: 'E-Commerce Platform',
        description: 'A full-stack e-commerce platform built with React, Node.js, and PostgreSQL. Features include user authentication, product catalog, shopping cart, and payment integration.',
        technologies: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Stripe', 'Tailwind CSS'],
        category: 'Full Stack',
        image: '/images/projects/ecommerce-platform.jpg',
        githubUrl: 'https://github.com/yourusername/ecommerce-platform',
        liveUrl: 'https://ecommerce-demo.netlify.app',
        featured: true,
    },
    {
        id: 'project-2',
        title: 'Task Management App',
        description: 'A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.',
        technologies: ['React', 'TypeScript', 'Firebase', 'Material-UI', 'Socket.io'],
        category: 'Frontend',
        image: '/images/projects/task-management.jpg',
        githubUrl: 'https://github.com/yourusername/task-management-app',
        liveUrl: 'https://taskmanager-demo.netlify.app',
        featured: true,
    },
    {
        id: 'project-3',
        title: 'Weather Dashboard',
        description: 'A responsive weather dashboard that displays current weather conditions, forecasts, and interactive maps using multiple weather APIs.',
        technologies: ['React', 'JavaScript', 'OpenWeather API', 'Chart.js', 'CSS3'],
        category: 'Frontend',
        image: '/images/projects/weather-dashboard.jpg',
        githubUrl: 'https://github.com/yourusername/weather-dashboard',
        liveUrl: 'https://weather-dashboard-demo.netlify.app',
        featured: false,
    },
    {
        id: 'project-4',
        title: 'REST API Server',
        description: 'A robust REST API server built with Express.js and MongoDB, featuring authentication, rate limiting, and comprehensive documentation.',
        technologies: ['Node.js', 'Express.js', 'MongoDB', 'JWT', 'Swagger', 'Docker'],
        category: 'Backend',
        image: '/images/projects/rest-api.jpg',
        githubUrl: 'https://github.com/yourusername/rest-api-server',
        featured: false,
    },
    {
        id: 'project-5',
        title: 'Portfolio Website',
        description: 'A modern, responsive portfolio website built with React, TypeScript, and Framer Motion. Features dark/light mode and smooth animations.',
        technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Vite'],
        category: 'Frontend',
        image: '/images/projects/portfolio-website.jpg',
        githubUrl: 'https://github.com/yourusername/portfolio-website',
        liveUrl: 'https://yourportfolio.netlify.app',
        featured: true,
    },
    {
        id: 'project-6',
        title: 'Chat Application',
        description: 'Real-time chat application with multiple rooms, file sharing, and emoji support. Built with Socket.io and React.',
        technologies: ['React', 'Socket.io', 'Node.js', 'Express.js', 'MongoDB'],
        category: 'Full Stack',
        image: '/images/projects/chat-application.jpg',
        githubUrl: 'https://github.com/yourusername/chat-application',
        featured: false,
    },
];

// Helper functions for filtering projects
export const getFeaturedProjects = (): Project[] => {
    return projects.filter(project => project.featured);
};

export const getProjectsByCategory = (category: string): Project[] => {
    return projects.filter(project => project.category === category);
};

export const getProjectCategories = (): string[] => {
    const categories = projects.map(project => project.category);
    return [...new Set(categories)];
};