import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NAVIGATION_ITEMS } from '@/utils/constants';
import { ThemeToggle, CVButton } from '@/components/ui';
import type { NavItem } from '@/types';

interface HeaderProps {
    className?: string;
}

export function Header({ className = '' }: HeaderProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    // Handle scroll effect for header background
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu when clicking outside or on escape
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setIsMenuOpen(false);
            }
        };

        const handleClickOutside = (e: MouseEvent) => {
            const target = e.target as Element;
            if (isMenuOpen && !target.closest('[data-mobile-menu]')) {
                setIsMenuOpen(false);
            }
        };

        if (isMenuOpen) {
            document.addEventListener('keydown', handleEscape);
            document.addEventListener('click', handleClickOutside);
            document.body.style.overflow = 'hidden'; // Prevent background scroll
        } else {
            document.body.style.overflow = '';
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.removeEventListener('click', handleClickOutside);
            document.body.style.overflow = '';
        };
    }, [isMenuOpen]);

    const handleNavClick = (href: string) => {
        setIsMenuOpen(false);

        // Smooth scroll to section
        const targetId = href.replace('#', '');
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            const headerHeight = 80; // Account for fixed header
            const targetPosition = targetElement.offsetTop - headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <motion.header
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                ? 'bg-background-primary/95 backdrop-blur-md border-b border-text-secondary/10 shadow-lg'
                : 'bg-transparent'
                } ${className}`}
        >
            <nav className="container mx-auto px-4 sm:px-6 lg:px-8" role="navigation" aria-label="Main navigation">
                <div className="flex items-center justify-between h-16 lg:h-20">
                    {/* Logo/Brand */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                        className="flex-shrink-0"
                    >
                        <a
                            href="#home"
                            onClick={(e) => {
                                e.preventDefault();
                                handleNavClick('#home');
                            }}
                            className="text-xl lg:text-2xl font-bold text-text-primary hover:text-accent transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background-primary rounded-md px-2 py-1"
                            aria-label="Go to home section"
                        >
                            Portfolio
                        </a>
                    </motion.div>

                    {/* Desktop Navigation */}
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.2 }}
                        className="hidden md:block"
                    >
                        <div className="ml-10 flex items-baseline space-x-8">
                            {NAVIGATION_ITEMS.map((item: NavItem, index) => (
                                <motion.a
                                    key={item.id}
                                    href={item.href}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleNavClick(item.href);
                                    }}
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                                    className="text-text-secondary hover:text-text-primary transition-colors duration-200 font-medium relative group focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background-primary rounded-md px-3 py-2"
                                    aria-label={`Navigate to ${item.label} section`}
                                >
                                    {item.label}
                                    <span className="absolute inset-x-3 bottom-0 h-0.5 bg-accent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left" />
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right side buttons container */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.4 }}
                        className="hidden md:flex items-center space-x-3"
                    >
                        <CVButton variant="outline" size="sm" />
                        <ThemeToggle size="md" />
                    </motion.div>

                    {/* Mobile menu button */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                        className="md:hidden"
                    >
                        <button
                            onClick={toggleMenu}
                            className="inline-flex items-center justify-center p-2 rounded-md text-text-secondary hover:text-text-primary hover:bg-background-secondary focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background-primary transition-colors duration-200"
                            aria-expanded={isMenuOpen}
                            aria-controls="mobile-menu"
                            aria-label={isMenuOpen ? 'Close main menu' : 'Open main menu'}
                            data-mobile-menu
                        >
                            <span className="sr-only">
                                {isMenuOpen ? 'Close main menu' : 'Open main menu'}
                            </span>
                            {/* Hamburger icon with animation */}
                            <div className="w-6 h-6 relative">
                                <span
                                    className={`absolute block h-0.5 w-6 bg-current transform transition-all duration-300 ${isMenuOpen ? 'rotate-45 top-3' : 'top-1'
                                        }`}
                                />
                                <span
                                    className={`absolute block h-0.5 w-6 bg-current transform transition-all duration-300 top-3 ${isMenuOpen ? 'opacity-0' : 'opacity-100'
                                        }`}
                                />
                                <span
                                    className={`absolute block h-0.5 w-6 bg-current transform transition-all duration-300 ${isMenuOpen ? '-rotate-45 top-3' : 'top-5'
                                        }`}
                                />
                            </div>
                        </button>
                    </motion.div>
                </div>

                {/* Mobile Navigation Menu */}
                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.div
                            id="mobile-menu"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                            className="md:hidden bg-background-primary/95 backdrop-blur-md border-t border-text-secondary/10"
                            data-mobile-menu
                        >
                            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                                {NAVIGATION_ITEMS.map((item: NavItem, index) => (
                                    <motion.a
                                        key={item.id}
                                        href={item.href}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handleNavClick(item.href);
                                        }}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.3, delay: index * 0.1 }}
                                        className="text-text-secondary hover:text-text-primary hover:bg-background-secondary block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background-primary"
                                        aria-label={`Navigate to ${item.label} section`}
                                    >
                                        {item.label}
                                    </motion.a>
                                ))}
                            </div>

                            {/* Mobile buttons container */}
                            <div className="px-2 pb-3 space-y-3 border-t border-text-secondary/10 pt-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium text-text-secondary">Theme</span>
                                    <ThemeToggle size="sm" />
                                </div>
                                <CVButton variant="outline" size="md" className="w-full justify-center" />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>
        </motion.header>
    );
}