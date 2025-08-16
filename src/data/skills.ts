import type { Skill } from '@/types';

export const skills: Skill[] = [
    // Frontend Skills
    {
        name: 'React',
        category: 'Frontend',
        proficiency: 5,
        icon: 'react',
    },
    {
        name: 'TypeScript',
        category: 'Frontend',
        proficiency: 5,
        icon: 'typescript',
    },
    {
        name: 'JavaScript',
        category: 'Frontend',
        proficiency: 5,
        icon: 'javascript',
    },
    {
        name: 'Next.js',
        category: 'Frontend',
        proficiency: 4,
        icon: 'nextjs',
    },
    {
        name: 'Tailwind CSS',
        category: 'Frontend',
        proficiency: 5,
        icon: 'tailwindcss',
    },
    {
        name: 'CSS3',
        category: 'Frontend',
        proficiency: 5,
        icon: 'css3',
    },
    {
        name: 'HTML5',
        category: 'Frontend',
        proficiency: 5,
        icon: 'html5',
    },
    {
        name: 'Framer Motion',
        category: 'Frontend',
        proficiency: 4,
        icon: 'framer',
    },

    // Backend Skills
    {
        name: 'Node.js',
        category: 'Backend',
        proficiency: 4,
        icon: 'nodejs',
    },
    {
        name: 'Express.js',
        category: 'Backend',
        proficiency: 4,
        icon: 'express',
    },
    {
        name: 'Python',
        category: 'Backend',
        proficiency: 3,
        icon: 'python',
    },
    {
        name: 'PostgreSQL',
        category: 'Backend',
        proficiency: 4,
        icon: 'postgresql',
    },
    {
        name: 'MongoDB',
        category: 'Backend',
        proficiency: 4,
        icon: 'mongodb',
    },
    {
        name: 'Firebase',
        category: 'Backend',
        proficiency: 4,
        icon: 'firebase',
    },
    {
        name: 'REST APIs',
        category: 'Backend',
        proficiency: 5,
        icon: 'api',
    },

    // Tools
    {
        name: 'Git',
        category: 'Tools',
        proficiency: 5,
        icon: 'git',
    },
    {
        name: 'Docker',
        category: 'Tools',
        proficiency: 3,
        icon: 'docker',
    },
    {
        name: 'Vite',
        category: 'Tools',
        proficiency: 4,
        icon: 'vite',
    },
    {
        name: 'Webpack',
        category: 'Tools',
        proficiency: 3,
        icon: 'webpack',
    },
    {
        name: 'ESLint',
        category: 'Tools',
        proficiency: 4,
        icon: 'eslint',
    },
    {
        name: 'Prettier',
        category: 'Tools',
        proficiency: 4,
        icon: 'prettier',
    },
    {
        name: 'VS Code',
        category: 'Tools',
        proficiency: 5,
        icon: 'vscode',
    },

    // Design
    {
        name: 'Figma',
        category: 'Design',
        proficiency: 3,
        icon: 'figma',
    },
    {
        name: 'Adobe XD',
        category: 'Design',
        proficiency: 2,
        icon: 'adobexd',
    },
    {
        name: 'UI/UX Design',
        category: 'Design',
        proficiency: 3,
        icon: 'design',
    },
];

// Helper functions for organizing skills
export const getSkillsByCategory = (category: Skill['category']): Skill[] => {
    return skills.filter(skill => skill.category === category);
};

export const getSkillCategories = (): Skill['category'][] => {
    const categories = skills.map(skill => skill.category);
    return [...new Set(categories)];
};

export const getFeaturedSkills = (): Skill[] => {
    return skills.filter(skill => skill.proficiency >= 4);
};