import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { PERSONAL_INFO, SOCIAL_LINKS } from '@/utils/constants';
import { SocialIcon } from '@/components/ui';

interface ContactProps {
    className?: string;
}

export function Contact({ className = '' }: ContactProps) {
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

    const socialVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.4,
                ease: "easeOut" as const,
            },
        },
    };

    const contactMethods = [
        {
            icon: '📧',
            title: 'Email',
            value: PERSONAL_INFO.email,
            href: `mailto:${PERSONAL_INFO.email}`,
            description: 'Send me an email'
        },
        {
            icon: '📍',
            title: 'Location',
            value: PERSONAL_INFO.location,
            href: '#',
            description: 'Based in'
        },
        {
            icon: '💼',
            title: 'Status',
            value: 'Available for work',
            href: '#',
            description: 'Currently'
        }
    ];

    return (
        <section
            id="contact"
            ref={ref}
            className={`py-20 lg:py-32 px-4 bg-background-secondary/30 ${className}`}
            aria-label="Contact section"
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
                        Get In Touch
                    </motion.h2>
                    <motion.p
                        className="body-large text-text-secondary max-w-3xl mx-auto"
                        variants={itemVariants}
                    >
                        I'm always interested in new opportunities, collaborations, and interesting projects.
                        Let's connect and discuss how we can work together.
                    </motion.p>
                </motion.div>

                {/* Fun Hobbies Section */}
                <motion.div
                    variants={itemVariants}
                    className="text-center mb-16 lg:mb-20"
                >
                    <motion.div
                        variants={itemVariants}
                        className="bg-gradient-to-r from-accent/10 to-accent/5 p-8 lg:p-12 rounded-2xl border border-accent/20"
                    >
                        <h3 className="heading-3 mb-4 text-text-primary">
                            When I'm Not Coding... 🎮
                        </h3>
                        <p className="body-medium text-text-secondary mb-8 max-w-2xl mx-auto">
                            Life's too short to just write code! Here's what keeps me energized and creative outside of development.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

                            <motion.div
                                className="bg-background-primary/50 p-6 rounded-xl border border-text-secondary/10"
                                whileHover={{ scale: 1.05, y: -5 }}
                                transition={{ duration: 0.2 }}
                            >
                                <div className="text-4xl mb-3">🕹️</div>
                                <h4 className="font-semibold text-text-primary mb-2">Competitive Gamer</h4>
                                <p className="text-sm text-text-secondary">
                                    I am super competitive and love to play FPS games like Valorant, CSGO, etc.
                                </p>
                            </motion.div>

                            <motion.div
                                className="bg-background-primary/50 p-6 rounded-xl border border-text-secondary/10"
                                whileHover={{ scale: 1.05, y: -5 }}
                                transition={{ duration: 0.2 }}
                            >
                                <div className="text-4xl mb-3">🎵</div>
                                <h4 className="font-semibold text-text-primary mb-2">Music Lover</h4>
                                <p className="text-sm text-text-secondary">
                                    From rap to electronic, music fuels my creativity and keeps me hyped up.
                                </p>
                            </motion.div>

                            <motion.div
                                className="bg-background-primary/50 p-6 rounded-xl border border-text-secondary/10"
                                whileHover={{ scale: 1.05, y: -5 }}
                                transition={{ duration: 0.2 }}
                            >
                                <div className="text-4xl mb-3">🏃‍♂️</div>
                                <h4 className="font-semibold text-text-primary mb-2">Fitness Enthusiast</h4>
                                <p className="text-sm text-text-secondary">
                                    Running, hiking, and gym sessions keep my mind sharp and my energy levels high.
                                </p>
                            </motion.div>

                        </div>

                        <p className="text-sm text-text-secondary italic">
                            "The best ideas often come when you're not actively looking for them!" 💡
                        </p>
                    </motion.div>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
                    {/* Contact Information */}
                    <motion.div variants={itemVariants} className="space-y-8">
                        <div>
                            <h3 className="heading-2 mb-2 text-accent">Let's Connect</h3>
                            <p className="body-medium text-text-secondary mb-4 leading-relaxed">
                                Whether you have a project in mind, want to collaborate, or just want to say hello,
                                I'd love to hear from you. I typically respond within 24 hours.
                            </p>
                        </div>

                        {/* Contact Methods */}
                        <div className="space-y-4">
                            {contactMethods.map((method) => (
                                <motion.div
                                    key={method.title}
                                    variants={itemVariants}
                                    className="flex items-center space-x-4 p-4 rounded-lg bg-background-primary/50 border border-text-secondary/10 hover:border-accent/20 transition-colors duration-200"
                                    whileHover={{ scale: 1.02, y: -2 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <span className="text-2xl flex-shrink-0">
                                        {method.icon}
                                    </span>
                                    <div className="flex-1">
                                        <h4 className="font-semibold text-text-primary mb-1">
                                            {method.title}
                                        </h4>
                                        <p className="text-sm text-text-secondary mb-1">
                                            {method.description}
                                        </p>
                                        {method.href.startsWith('mailto:') ? (
                                            <a
                                                href={method.href}
                                                className="text-accent hover:text-accent-hover transition-colors duration-200 font-medium"
                                                aria-label={`Send email to ${method.value}`}
                                            >
                                                {method.value}
                                            </a>
                                        ) : (
                                            <span className="text-text-primary font-medium">
                                                {method.value}
                                            </span>
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Follow Me Section */}
                    <motion.div variants={itemVariants} className="space-y-8">
                        <div>
                            <h3 className="heading-2 mb-6 text-accent">Follow Me</h3>
                            <p className="body-medium text-text-secondary mb-8 leading-relaxed">
                                Stay connected and follow my journey! Check out my latest projects, thoughts, and updates across these platforms.
                            </p>
                        </div>

                        {/* Social Media Links */}
                        <div className="space-y-4">
                            {SOCIAL_LINKS.map((social, index) => (
                                <motion.a
                                    key={social.id}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    variants={socialVariants}
                                    className="flex items-center space-x-4 p-4 rounded-lg bg-background-primary/50 hover:bg-accent/10 border border-text-secondary/20 hover:border-accent/40 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background-primary group"
                                    whileHover={{ scale: 1.02, y: -2 }}
                                    whileTap={{ scale: 0.98 }}
                                    aria-label={`Visit my ${social.name} profile`}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 + index * 0.1 }}
                                >
                                    <div className="flex-shrink-0">
                                        <SocialIcon icon={social.icon} className="w-6 h-6 text-accent group-hover:scale-110 transition-transform duration-200" />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-semibold text-text-primary mb-1 group-hover:text-accent transition-colors duration-200">
                                            {social.name}
                                        </h4>
                                        <p className="text-sm text-text-secondary">
                                            {social.name === 'GitHub' && 'Check out my code and open source contributions'}
                                            {social.name === 'LinkedIn' && 'Connect with me professionally'}
                                            {social.name === 'Twitter' && 'Follow my thoughts and tech updates'}
                                            {social.name === 'Email' && 'Send me a direct message'}
                                        </p>
                                    </div>
                                    <motion.div
                                        className="text-accent opacity-0 group-hover:opacity-100 transition-opacity duration-200"
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
                                                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                            />
                                        </svg>
                                    </motion.div>
                                </motion.a>
                            ))}
                        </div>


                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
}