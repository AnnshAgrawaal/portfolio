// Theme and configuration constants

export const THEME_COLORS = {
    light: {
        primary: '#ffffff',
        secondary: '#f8fafc',
        accent: '#3b82f6',
        accentHover: '#2563eb',
        textPrimary: '#1f2937',
        textSecondary: '#6b7280',
        success: '#10b981',
        warning: '#f59e0b',
    },
    dark: {
        primary: '#0a0a0a',
        secondary: '#1a1a1a',
        accent: '#3b82f6',
        accentHover: '#2563eb',
        textPrimary: '#ffffff',
        textSecondary: '#a1a1aa',
        success: '#10b981',
        warning: '#f59e0b',
    },
} as const;

export const BREAKPOINTS = {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    '2xl': 1536,
} as const;

export const ANIMATION_DURATION = {
    fast: 0.2,
    normal: 0.3,
    slow: 0.5,
} as const;

export const NAVIGATION_ITEMS = [
    { id: 'home', label: 'Home', href: '#home' },
    { id: 'about', label: 'About', href: '#about' },
    { id: 'portfolio', label: 'Portfolio', href: '#portfolio' },
    { id: 'contact', label: 'Contact', href: '#contact' },
] as const;

export const SOCIAL_LINKS = [
    {
        id: 'github',
        name: 'GitHub',
        url: 'https://github.com/yourusername',
        icon: 'github',
    },
    {
        id: 'linkedin',
        name: 'LinkedIn',
        url: 'https://linkedin.com/in/yourusername',
        icon: 'linkedin',
    },
    {
        id: 'twitter',
        name: 'Twitter',
        url: 'https://twitter.com/yourusername',
        icon: 'twitter',
    },
    {
        id: 'email',
        name: 'Email',
        url: 'mailto:your.email@example.com',
        icon: 'mail',
    },
] as const;

export const PERSONAL_INFO = {
    name: 'Annsh Agrawaal',
    title: 'Security Enginner and Developer',
    tagline: 'Breaking and Building modern web applications with passion and precision',
    email: 'your.email@example.com',
    location: 'Pune, India',
    resumeUrl: '/assets/resume.pdf',
} as const;

export const FORM_VALIDATION = {
    name: {
        required: 'Name is required',
        minLength: 4,
        maxLength: 25,
    },
    email: {
        required: 'Email is required',
        pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        invalid: 'Please enter a valid email address',
    },
    subject: {
        required: 'Subject is required',
        minLength: 5,
        maxLength: 100,
    },
    message: {
        required: 'Message is required',
        minLength: 10,
        maxLength: 1000,
    },
} as const;

export const SEO_CONFIG = {
    title: 'Annsh Agrawaal Portfolio',
    description: 'Full Stack Developer specializing in React, TypeScript, and Node.js. View my projects and get in touch for collaboration opportunities.',
    keywords: 'full stack developer, react developer, typescript, node.js, web development, portfolio',
    author: 'Annsh Agrawaal',
    siteUrl: 'https://yourportfolio.com',
    image: '/images/og-image.jpg',
} as const;