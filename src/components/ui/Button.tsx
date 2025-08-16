import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import type { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onDrag' | 'onDragEnd' | 'onDragStart' | 'onAnimationStart' | 'onAnimationEnd'> {
    variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
    size?: 'sm' | 'md' | 'lg';
    isLoading?: boolean;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    children: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            variant = 'primary',
            size = 'md',
            isLoading = false,
            leftIcon,
            rightIcon,
            children,
            className = '',
            disabled,
            ...props
        },
        ref
    ) => {
        const baseClasses = [
            'inline-flex items-center justify-center',
            'font-medium rounded-lg',
            'transition-all duration-200',
            'focus:outline-none focus:ring-2 focus:ring-offset-2',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            'relative overflow-hidden',
        ].join(' ');

        const variantClasses = {
            primary: [
                'bg-accent hover:bg-accent-hover',
                'text-white',
                'focus:ring-accent/50',
                'shadow-sm hover:shadow-md',
            ].join(' '),
            secondary: [
                'bg-background-secondary hover:bg-text-secondary/10',
                'text-text-primary',
                'border border-text-secondary/20 hover:border-text-secondary/30',
                'focus:ring-accent/50',
            ].join(' '),
            ghost: [
                'bg-transparent hover:bg-text-secondary/10',
                'text-text-primary hover:text-accent',
                'focus:ring-accent/50',
            ].join(' '),
            outline: [
                'bg-transparent hover:bg-accent hover:text-white',
                'text-accent',
                'border-2 border-accent',
                'focus:ring-accent/50',
            ].join(' '),
        };

        const sizeClasses = {
            sm: 'px-3 py-1.5 text-sm gap-1.5',
            md: 'px-4 py-2 text-base gap-2',
            lg: 'px-6 py-3 text-lg gap-2.5',
        };

        const combinedClasses = [
            baseClasses,
            variantClasses[variant],
            sizeClasses[size],
            className,
        ].join(' ');

        const buttonVariants = {
            initial: { scale: 1 },
            hover: { scale: 1.02 },
            tap: { scale: 0.98 },
        };

        const spinnerVariants = {
            animate: {
                rotate: 360,
                transition: {
                    duration: 1,
                    repeat: Infinity,
                    ease: 'linear' as const,
                },
            },
        };



        return (
            <motion.button
                ref={ref}
                className={combinedClasses}
                disabled={disabled || isLoading}
                variants={buttonVariants}
                initial="initial"
                whileHover="hover"
                whileTap="tap"
                {...props}
            >
                {/* Loading spinner */}
                {isLoading && (
                    <motion.div
                        className="absolute inset-0 flex items-center justify-center"
                        variants={spinnerVariants}
                        animate="animate"
                    >
                        <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                            />
                        </svg>
                    </motion.div>
                )}

                {/* Button content */}
                <span
                    className={`flex items-center gap-inherit ${isLoading ? 'opacity-0' : 'opacity-100'
                        } transition-opacity duration-200`}
                >
                    {leftIcon && <span className="flex-shrink-0">{leftIcon}</span>}
                    {children}
                    {rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
                </span>

                {/* Ripple effect */}
                <motion.span
                    className="absolute inset-0 bg-white/20 rounded-lg"
                    initial={{ scale: 0, opacity: 0 }}
                    whileTap={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.1 }}
                />
            </motion.button>
        );
    }
);

Button.displayName = 'Button';

export default Button;