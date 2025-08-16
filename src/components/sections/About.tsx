import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { SkillBadge } from '@/components/ui';
import { getSkillsByCategory } from '@/data/skills';
import type { Skill } from '@/types';

interface AboutProps {
    className?: string;
}

export function About({ className = '' }: AboutProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.1,
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

    const skillCategoryVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: "easeOut" as const,
                staggerChildren: 0.1,
            },
        },
    };

    const skillItemVariants = {
        hidden: { opacity: 0, scale: 0.8, y: 20 },
        visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: {
                duration: 0.4,
                ease: "easeOut" as const,
            },
        },
    };

    // Professional bio content
    const bioContent = {
        introduction: "I'm a passionate Full Stack Developer with a love for creating beautiful, functional, and user-centered digital experiences.",
        experience: "With several years of experience in web development, I specialize in modern JavaScript frameworks, responsive design, and building scalable applications that solve real-world problems.",
        approach: "I believe in writing clean, maintainable code and staying up-to-date with the latest technologies and best practices. My goal is to bridge the gap between design and functionality, creating seamless user experiences.",
        passion: "When I'm not coding, you can find me exploring new technologies, contributing to open-source projects, or sharing knowledge with the developer community."
    };

    const experienceHighlights = [
        {
            icon: "🚀",
            title: "Modern Development",
            description: "Expertise in React, TypeScript, and modern web technologies"
        },
        {
            icon: "🎨",
            title: "UI/UX Focus",
            description: "Strong eye for design and user experience principles"
        },
        {
            icon: "⚡",
            title: "Performance Optimization",
            description: "Building fast, efficient, and scalable applications"
        },
        {
            icon: "🔧",
            title: "Full Stack Skills",
            description: "End-to-end development from frontend to backend"
        }
    ];

    const skillCategories = ['Frontend', 'Backend', 'Tools', 'Design'] as const;

    return (
        <section
            id="about"
            ref={ref}
            className={`py-20 lg:py-32 px-4 bg-background-secondary/30 ${className}`}
            aria-label="About section"
        >
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="container mx-auto max-w-6xl"
            >
                {/* Section Header */}
                <motion.div variants={itemVariants} className="text-center mb-16 lg:mb-20">
                    <motion.h2
                        className="heading-1 mb-6"
                        variants={itemVariants}
                    >
                        About Me
                    </motion.h2>
                    <motion.p
                        className="body-large text-text-secondary max-w-3xl mx-auto"
                        variants={itemVariants}
                    >
                        Get to know more about my background, skills, and what drives my passion for development
                    </motion.p>
                </motion.div>

                {/* Bio Section */}
                <motion.div
                    variants={itemVariants}
                    className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mb-20"
                >
                    {/* Professional Bio */}
                    <div className="space-y-6">
                        <motion.h3
                            variants={itemVariants}
                            className="heading-2 mb-6 text-accent"
                        >
                            My Story
                        </motion.h3>

                        <motion.div variants={itemVariants} className="space-y-4">
                            <p className="body-medium text-text-secondary leading-relaxed">
                                {bioContent.introduction}
                            </p>
                            <p className="body-medium text-text-secondary leading-relaxed">
                                {bioContent.experience}
                            </p>
                            <p className="body-medium text-text-secondary leading-relaxed">
                                {bioContent.approach}
                            </p>
                            <p className="body-medium text-text-secondary leading-relaxed">
                                {bioContent.passion}
                            </p>
                        </motion.div>
                    </div>

                    {/* Experience Highlights */}
                    <div className="space-y-6">
                        <motion.h3
                            variants={itemVariants}
                            className="heading-2 mb-6 text-accent"
                        >
                            What I Bring
                        </motion.h3>

                        <motion.div
                            variants={itemVariants}
                            className="space-y-4"
                        >
                            {experienceHighlights.map((highlight, index) => (
                                <motion.div
                                    key={highlight.title}
                                    variants={itemVariants}
                                    className="flex items-start space-x-4 p-4 rounded-lg bg-background-primary/50 border border-text-secondary/10 hover:border-accent/20 transition-colors duration-200"
                                    whileHover={{ scale: 1.02, y: -2 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <span className="text-2xl flex-shrink-0 mt-1">
                                        {highlight.icon}
                                    </span>
                                    <div>
                                        <h4 className="font-semibold text-text-primary mb-1">
                                            {highlight.title}
                                        </h4>
                                        <p className="text-sm text-text-secondary">
                                            {highlight.description}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </motion.div>

                {/* Skills Section */}
                <motion.div variants={itemVariants}>
                    <motion.div variants={itemVariants} className="text-center mb-12">
                        <h3 className="heading-2 mb-4 text-accent">Technical Skills</h3>
                        <p className="body-medium text-text-secondary max-w-2xl mx-auto">
                            Here are the technologies and tools I work with to bring ideas to life
                        </p>
                    </motion.div>

                    <motion.div
                        variants={containerVariants}
                        className="grid grid-cols-1 md:grid-cols-2 gap-8"
                    >
                        {skillCategories.map((category, categoryIndex) => {
                            const categorySkills = getSkillsByCategory(category);

                            if (categorySkills.length === 0) return null;

                            return (
                                <motion.div
                                    key={category}
                                    variants={skillCategoryVariants}
                                    className="bg-background-primary/50 p-6 lg:p-8 rounded-xl border border-text-secondary/10 hover:border-accent/20 transition-all duration-300 hover:shadow-lg"
                                    whileHover={{ y: -4 }}
                                >
                                    <motion.h4
                                        variants={itemVariants}
                                        className="text-xl font-semibold text-text-primary mb-6 flex items-center"
                                    >
                                        <span className="w-2 h-2 bg-accent rounded-full mr-3"></span>
                                        {category}
                                        <span className="ml-auto text-sm text-text-secondary font-normal">
                                            {categorySkills.length} skills
                                        </span>
                                    </motion.h4>

                                    <motion.div
                                        variants={containerVariants}
                                        className="flex flex-wrap gap-3"
                                    >
                                        {categorySkills.map((skill: Skill, skillIndex) => (
                                            <motion.div
                                                key={skill.name}
                                                variants={skillItemVariants}
                                                custom={skillIndex}
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                            >
                                                <SkillBadge skill={skill} />
                                            </motion.div>
                                        ))}
                                    </motion.div>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </motion.div>


            </motion.div>
        </section>
    );
}