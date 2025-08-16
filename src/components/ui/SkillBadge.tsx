import { motion } from 'framer-motion';
import type { Skill } from '@/types';

interface SkillBadgeProps {
    skill: Skill;
    showProficiency?: boolean;
    size?: 'sm' | 'md' | 'lg';
    variant?: 'default' | 'outlined' | 'minimal';
}

const SkillBadge = ({
    skill,
    showProficiency = true,
    size = 'md',
    variant = 'default'
}: SkillBadgeProps) => {
    const getCategoryColor = (category: Skill['category']) => {
        const colors = {
            Frontend: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
            Backend: 'bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20',
            Tools: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20',
            Design: 'bg-pink-500/10 text-pink-600 dark:text-pink-400 border-pink-500/20',
        };
        return colors[category];
    };

    const sizeClasses = {
        sm: 'px-2 py-1 text-xs',
        md: 'px-3 py-1.5 text-sm',
        lg: 'px-4 py-2 text-base',
    };

    const variantClasses = {
        default: `${getCategoryColor(skill.category)} border`,
        outlined: `bg-transparent ${getCategoryColor(skill.category)} border-2`,
        minimal: `bg-background-secondary text-text-primary border border-text-secondary/20 hover:${getCategoryColor(skill.category)}`,
    };

    const badgeVariants = {
        initial: {
            scale: 1,
            rotate: 0,
        },
        hover: {
            scale: 1.05,
            rotate: variant === 'minimal' ? 2 : 0,
            transition: {
                duration: 0.2,
                ease: 'easeOut' as const,
            },
        },
        tap: {
            scale: 0.95,
            transition: {
                duration: 0.1,
            },
        },
    };

    const proficiencyVariants = {
        initial: { width: 0 },
        animate: {
            width: `${(skill.proficiency / 5) * 100}%`,
            transition: {
                duration: 1,
                delay: 0.2,
                ease: 'easeOut' as const,
            },
        },
    };

    const getProficiencyLabel = (proficiency: number) => {
        const labels = {
            1: 'Beginner',
            2: 'Basic',
            3: 'Intermediate',
            4: 'Advanced',
            5: 'Expert',
        };
        return labels[proficiency as keyof typeof labels] || 'Unknown';
    };

    const renderIcon = () => {
        if (!skill.icon) return null;

        // Simple icon mapping - in a real app, you'd use a proper icon library
        const iconMap: Record<string, string> = {
            react: '⚛️',
            typescript: '🔷',
            javascript: '🟨',
            nextjs: '▲',
            tailwindcss: '🎨',
            css3: '🎨',
            html5: '🌐',
            framer: '🎭',
            nodejs: '🟢',
            express: '🚀',
            python: '🐍',
            postgresql: '🐘',
            mongodb: '🍃',
            firebase: '🔥',
            api: '🔌',
            git: '📝',
            docker: '🐳',
            vite: '⚡',
            webpack: '📦',
            eslint: '🔍',
            prettier: '💅',
            vscode: '💻',
            figma: '🎨',
            adobexd: '🎨',
            design: '✨',
        };

        return (
            <span className="mr-1.5" role="img" aria-label={skill.name}>
                {iconMap[skill.icon] || '🔧'}
            </span>
        );
    };

    return (
        <motion.div
            className="group relative"
            variants={badgeVariants}
            initial="initial"
            whileHover="hover"
            whileTap="tap"
        >
            <div
                className={`
          inline-flex items-center rounded-full font-medium transition-all duration-200
          ${sizeClasses[size]}
          ${variantClasses[variant]}
        `}
            >
                {renderIcon()}
                <span>{skill.name}</span>

                {showProficiency && (
                    <div className="ml-2 flex items-center gap-1">
                        {[...Array(5)].map((_, index) => (
                            <div
                                key={index}
                                className={`w-1.5 h-1.5 rounded-full transition-colors duration-200 ${index < skill.proficiency
                                    ? 'bg-current'
                                    : 'bg-current opacity-20'
                                    }`}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* Tooltip on hover */}
            <motion.div
                className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-background-primary border border-text-secondary/20 rounded-lg shadow-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10"
                initial={{ opacity: 0, y: 10 }}
                whileHover={{ opacity: 1, y: 0 }}
            >
                <div className="text-text-primary font-medium">{skill.name}</div>
                <div className="text-text-secondary text-xs">
                    {skill.category} • {getProficiencyLabel(skill.proficiency)}
                </div>

                {/* Proficiency bar */}
                {showProficiency && (
                    <div className="mt-2">
                        <div className="w-20 h-1 bg-text-secondary/20 rounded-full overflow-hidden">
                            <motion.div
                                className="h-full bg-current rounded-full"
                                variants={proficiencyVariants}
                                initial="initial"
                                animate="animate"
                            />
                        </div>
                    </div>
                )}

                {/* Tooltip arrow */}
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-background-primary" />
            </motion.div>
        </motion.div>
    );
};

export default SkillBadge;