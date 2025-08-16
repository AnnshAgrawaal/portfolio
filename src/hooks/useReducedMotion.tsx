import { useEffect, useState } from 'react';

export function useReducedMotion(): boolean {
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        setPrefersReducedMotion(mediaQuery.matches);

        const handleChange = (event: MediaQueryListEvent) => {
            setPrefersReducedMotion(event.matches);
        };

        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, []);

    return prefersReducedMotion;
}

// Animation variants that respect reduced motion preferences
export const createMotionVariants = (prefersReducedMotion: boolean) => ({
    hover: prefersReducedMotion ? {} : { scale: 1.05, y: -2 },
    tap: prefersReducedMotion ? {} : { scale: 0.95 },
    transition: prefersReducedMotion ? { duration: 0 } : { duration: 0.2 },
});