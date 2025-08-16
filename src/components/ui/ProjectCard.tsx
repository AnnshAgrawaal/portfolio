import { motion } from 'framer-motion';
import { SocialIcon } from './SocialIcon';
import type { Project } from '@/types';

interface ProjectCardProps {
    project: Project;
    onClick?: () => void;
}

const ProjectCard = ({ project, onClick }: ProjectCardProps) => {
    const handleClick = () => {
        if (onClick) {
            onClick();
        } else {
            // Default behavior: open GitHub URL
            window.open(project.githubUrl, '_blank', 'noopener,noreferrer');
        }
    };

    const cardVariants = {
        initial: {
            scale: 1,
            y: 0,
            boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
        },
        hover: {
            scale: 1.02,
            y: -8,
            boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
            transition: {
                duration: 0.2,
                ease: 'easeOut' as const,
            },
        },
        tap: {
            scale: 0.98,
            transition: {
                duration: 0.1,
            },
        },
    };

    const imageVariants = {
        initial: { scale: 1 },
        hover: {
            scale: 1.05,
            transition: {
                duration: 0.3,
                ease: 'easeOut' as const,
            },
        },
    };

    const overlayVariants = {
        initial: { opacity: 0 },
        hover: {
            opacity: 1,
            transition: {
                duration: 0.2,
            },
        },
    };

    return (
        <motion.div
            className="bg-background-secondary rounded-xl border border-text-secondary/10 overflow-hidden cursor-pointer group h-full flex flex-col"
            variants={cardVariants}
            initial="initial"
            whileHover="hover"
            whileTap="tap"
            onClick={handleClick}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleClick();
                }
            }}
            aria-label={`View ${project.title} project on GitHub`}
        >
            {/* Project Image */}
            <div className="relative h-48 sm:h-56 overflow-hidden bg-text-secondary/5">
                <motion.img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                    variants={imageVariants}
                    onError={(e) => {
                        // Fallback for missing images
                        const target = e.target as HTMLImageElement;
                        target.src = `data:image/svg+xml;base64,${btoa(`
              <svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
                <rect width="100%" height="100%" fill="#f3f4f6"/>
                <text x="50%" y="50%" font-family="system-ui" font-size="16" fill="#6b7280" text-anchor="middle" dy=".3em">
                  ${project.title}
                </text>
              </svg>
            `)}`;
                    }}
                />

                {/* Hover Overlay */}
                <motion.div
                    className="absolute inset-0 bg-accent/20 flex items-center justify-center"
                    variants={overlayVariants}
                >
                    <div className="bg-white/90 dark:bg-background-primary/90 px-4 py-2 rounded-lg backdrop-blur-sm">
                        <span className="text-sm font-medium text-text-primary flex items-center gap-2">
                            <SocialIcon icon="github" className="w-4 h-4" />
                            View on GitHub
                        </span>
                    </div>
                </motion.div>

                {/* Featured Badge */}
                {project.featured && (
                    <div className="absolute top-3 right-3">
                        <span className="bg-accent text-white px-2 py-1 rounded-full text-xs font-medium">
                            Featured
                        </span>
                    </div>
                )}
            </div>

            {/* Project Content */}
            <div className="p-6 flex flex-col flex-1">
                <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-semibold text-text-primary group-hover:text-accent transition-colors duration-200">
                        {project.title}
                    </h3>
                    <span className="text-xs font-medium text-text-secondary bg-text-secondary/10 px-2 py-1 rounded-full">
                        {project.category}
                    </span>
                </div>

                <p className="text-text-secondary text-sm mb-4 line-clamp-3 flex-1">
                    {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-4 mt-auto">
                    {project.technologies.slice(0, 4).map((tech) => (
                        <span
                            key={tech}
                            className="text-xs font-medium text-accent bg-accent/10 px-2 py-1 rounded-md"
                        >
                            {tech}
                        </span>
                    ))}
                    {project.technologies.length > 4 && (
                        <span className="text-xs font-medium text-text-secondary">
                            +{project.technologies.length - 4} more
                        </span>
                    )}
                </div>

                {/* Links */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <span className="text-xs text-text-secondary flex items-center gap-1">
                            <SocialIcon icon="github" className="w-3 h-3" />
                            GitHub
                        </span>
                        {project.liveUrl && (
                            <span className="text-xs text-text-secondary flex items-center gap-1">
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                    />
                                </svg>
                                Live Demo
                            </span>
                        )}
                    </div>

                    <motion.div
                        className="text-accent"
                        animate={{ x: [0, 4, 0] }}
                        transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            repeatType: 'reverse',
                            ease: 'easeInOut',
                        }}
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5l7 7-7 7"
                            />
                        </svg>
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
};

export default ProjectCard;