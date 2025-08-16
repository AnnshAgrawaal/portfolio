import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ProjectCard } from '@/components/ui';
import { projects, getProjectCategories, getProjectsByCategory, getFeaturedProjects } from '@/data/projects';
import type { Project } from '@/types';

interface PortfolioProps {
    className?: string;
}

export function Portfolio({ className = '' }: PortfolioProps) {
    const [activeFilter, setActiveFilter] = useState<string>('All');
    const [filteredProjects, setFilteredProjects] = useState<Project[]>(projects);

    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    const categories = ['All', 'Featured', ...getProjectCategories()];

    const handleFilterChange = (category: string) => {
        setActiveFilter(category);

        let filtered: Project[];
        switch (category) {
            case 'All':
                filtered = projects;
                break;
            case 'Featured':
                filtered = getFeaturedProjects();
                break;
            default:
                filtered = getProjectsByCategory(category);
                break;
        }

        setFilteredProjects(filtered);
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: {
            opacity: 0,
            y: 50,
            scale: 0.95
        },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: 0.6,
                ease: "easeOut" as const,
            },
        },
    };

    const filterVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.4,
                ease: "easeOut" as const,
            },
        },
    };

    const gridVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.1,
            },
        },
    };

    const projectVariants = {
        hidden: {
            opacity: 0,
            scale: 0.8,
            y: 30
        },
        visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: "easeOut" as const,
            },
        },
        exit: {
            opacity: 0,
            scale: 0.8,
            y: -30,
            transition: {
                duration: 0.3,
                ease: "easeOut" as const,
            },
        },
    };

    return (
        <section
            id="portfolio"
            ref={ref}
            className={`py-20 lg:py-32 px-4 ${className}`}
            aria-label="Portfolio section"
        >
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="container mx-auto max-w-7xl"
            >
                {/* Section Header */}
                <motion.div variants={itemVariants} className="text-center mb-16 lg:mb-20">
                    <motion.h2
                        className="heading-1 mb-6"
                        variants={itemVariants}
                    >
                        My Portfolio
                    </motion.h2>
                    <motion.p
                        className="body-large text-text-secondary max-w-3xl mx-auto mb-8"
                        variants={itemVariants}
                    >
                        Explore my recent projects and see how I bring ideas to life through code.
                        Each project represents a unique challenge and learning experience.
                    </motion.p>

                    {/* Project Stats */}
                    <motion.div
                        variants={itemVariants}
                        className="flex flex-wrap justify-center gap-8 text-center"
                    >
                        <div className="flex flex-col">
                            <span className="text-2xl lg:text-3xl font-bold text-accent">
                                {projects.length}
                            </span>
                            <span className="text-sm text-text-secondary">Total Projects</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-2xl lg:text-3xl font-bold text-accent">
                                {getFeaturedProjects().length}
                            </span>
                            <span className="text-sm text-text-secondary">Featured</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-2xl lg:text-3xl font-bold text-accent">
                                {getProjectCategories().length}
                            </span>
                            <span className="text-sm text-text-secondary">Categories</span>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Filter Buttons */}
                <motion.div
                    variants={filterVariants}
                    className="flex flex-wrap justify-center gap-3 mb-12 lg:mb-16"
                >
                    {categories.map((category, index) => (
                        <motion.button
                            key={category}
                            onClick={() => handleFilterChange(category)}
                            className={`px-4 py-2 lg:px-6 lg:py-3 rounded-full font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background-primary ${activeFilter === category
                                ? 'bg-accent text-white shadow-lg scale-105'
                                : 'bg-background-secondary text-text-secondary hover:text-text-primary hover:bg-background-secondary/80 border border-text-secondary/20 hover:border-text-secondary/40'
                                }`}
                            whileHover={{ scale: activeFilter === category ? 1.05 : 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            aria-label={`Filter projects by ${category}`}
                        >
                            {category}
                            {category === 'Featured' && (
                                <span className="ml-2 text-xs">⭐</span>
                            )}
                            {category !== 'All' && category !== 'Featured' && (
                                <span className="ml-2 text-xs bg-accent/20 px-2 py-0.5 rounded-full">
                                    {category === 'Featured' ? getFeaturedProjects().length : getProjectsByCategory(category).length}
                                </span>
                            )}
                        </motion.button>
                    ))}
                </motion.div>

                {/* Projects Grid */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeFilter}
                        variants={gridVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
                    >
                        {filteredProjects.map((project, index) => (
                            <motion.div
                                key={project.id}
                                variants={projectVariants}
                                layout
                                className="h-full"
                                custom={index}
                            >
                                <ProjectCard project={project} />
                            </motion.div>
                        ))}
                    </motion.div>
                </AnimatePresence>

                {/* Empty State */}
                {filteredProjects.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center py-16"
                    >
                        <div className="text-6xl mb-4">🔍</div>
                        <h3 className="heading-3 mb-2 text-text-primary">No Projects Found</h3>
                        <p className="body-medium text-text-secondary mb-6">
                            No projects match the selected filter. Try selecting a different category.
                        </p>
                        <motion.button
                            onClick={() => handleFilterChange('All')}
                            className="px-6 py-3 bg-accent hover:bg-accent-hover text-white font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background-primary"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Show All Projects
                        </motion.button>
                    </motion.div>
                )}


            </motion.div>
        </section>
    );
}