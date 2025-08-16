import { motion } from 'framer-motion';
import { useTheme } from '@/hooks/useTheme';

interface ThemeToggleProps {
    className?: string;
    size?: 'sm' | 'md' | 'lg';
}

export function ThemeToggle({ className = '', size = 'md' }: ThemeToggleProps) {
    const { theme, toggleTheme } = useTheme();

    const sizeClasses = {
        sm: 'w-8 h-8 text-sm',
        md: 'w-10 h-10 text-base',
        lg: 'w-12 h-12 text-lg',
    };

    const iconSizes = {
        sm: 'w-4 h-4',
        md: 'w-5 h-5',
        lg: 'w-6 h-6',
    };

    return (
        <motion.button
            onClick={toggleTheme}
            className={`
        relative inline-flex items-center justify-center rounded-full
        bg-background-secondary hover:bg-background-secondary/80
        border border-text-secondary/20 hover:border-text-secondary/40
        text-text-primary hover:text-accent
        transition-all duration-200
        focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background-primary
        ${sizeClasses[size]} ${className}
      `}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
            <motion.div
                key={theme}
                initial={{ rotate: -180, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 180, opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className={`flex items-center justify-center ${iconSizes[size]}`}
            >
                {theme === 'light' ? (
                    <MoonIcon className={iconSizes[size]} />
                ) : (
                    <SunIcon className={iconSizes[size]} />
                )}
            </motion.div>

            {/* Subtle glow effect */}
            <motion.div
                className="absolute inset-0 rounded-full bg-accent/20 opacity-0"
                whileHover={{ opacity: 1, scale: 1.1 }}
                transition={{ duration: 0.2 }}
            />
        </motion.button>
    );
}

// Sun Icon Component
function SunIcon({ className }: { className: string }) {
    return (
        <motion.svg
            className={className}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
        >
            <circle cx="12" cy="12" r="5" />
            <motion.g
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.3 }}
            >
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            </motion.g>
        </motion.svg>
    );
}

// Moon Icon Component
function MoonIcon({ className }: { className: string }) {
    return (
        <motion.svg
            className={className}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            initial={{ rotate: 0 }}
            animate={{ rotate: -30 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
        >
            <motion.path
                d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
            />
        </motion.svg>
    );
}