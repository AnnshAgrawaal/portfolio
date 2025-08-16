// Core data interfaces for the portfolio website

export interface Project {
    id: string;
    title: string;
    description: string;
    technologies: string[];
    category: string;
    image: string;
    githubUrl: string;
    liveUrl?: string;
    featured: boolean;
}

export interface Skill {
    name: string;
    category: 'Frontend' | 'Backend' | 'Tools' | 'Design';
    proficiency: number; // 1-5 scale
    icon?: string;
}

export interface ContactForm {
    name: string;
    email: string;
    subject: string;
    message: string;
}

export interface ThemeContextType {
    theme: 'light' | 'dark';
    toggleTheme: () => void;
}

// Navigation and UI types
export interface NavItem {
    id: string;
    label: string;
    href: string;
}

export interface SocialLink {
    id: string;
    name: string;
    url: string;
    icon: string;
}

// Animation and interaction types
export interface AnimationVariants {
    hidden: {
        opacity: number;
        y?: number;
        x?: number;
        scale?: number;
    };
    visible: {
        opacity: number;
        y?: number;
        x?: number;
        scale?: number;
        transition?: {
            duration?: number;
            delay?: number;
            ease?: string;
        };
    };
}

// Form validation types
export interface FormErrors {
    name?: string;
    email?: string;
    subject?: string;
    message?: string;
}

export interface FormState {
    isSubmitting: boolean;
    isSubmitted: boolean;
    errors: FormErrors;
}