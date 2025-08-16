import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface LazyImageProps {
    src: string;
    alt: string;
    className?: string;
    placeholder?: string;
    fallback?: string;
    aspectRatio?: 'square' | 'video' | 'portrait' | 'landscape';
    loading?: 'lazy' | 'eager';
    onLoad?: () => void;
    onError?: () => void;
}

export function LazyImage({
    src,
    alt,
    className = '',
    placeholder,
    fallback = '/images/placeholder.jpg',
    aspectRatio = 'landscape',
    loading = 'lazy',
    onLoad,
    onError,
}: LazyImageProps) {
    const [imageState, setImageState] = useState<'loading' | 'loaded' | 'error'>('loading');
    const [imageSrc, setImageSrc] = useState<string>(placeholder || '');

    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '100px' });
    const prefersReducedMotion = useReducedMotion();

    const aspectRatioClasses = {
        square: 'aspect-square',
        video: 'aspect-video',
        portrait: 'aspect-[3/4]',
        landscape: 'aspect-[4/3]',
    };

    const handleImageLoad = () => {
        setImageState('loaded');
        onLoad?.();
    };

    const handleImageError = () => {
        setImageState('error');
        setImageSrc(fallback);
        onError?.();
    };

    // Load image when in view
    if (isInView && loading === 'lazy' && !imageSrc && imageState === 'loading') {
        setImageSrc(src);
    }

    // Load image immediately if eager loading
    if (loading === 'eager' && !imageSrc && imageState === 'loading') {
        setImageSrc(src);
    }

    const imageVariants = {
        loading: {
            opacity: 0,
            scale: prefersReducedMotion ? 1 : 1.1,
        },
        loaded: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: prefersReducedMotion ? 0 : 0.5,
                ease: "easeOut" as const,
            },
        },
    };

    const placeholderVariants = {
        loading: {
            opacity: 1,
        },
        loaded: {
            opacity: 0,
            transition: {
                duration: prefersReducedMotion ? 0 : 0.3,
            },
        },
    };

    return (
        <div
            ref={ref}
            className={`relative overflow-hidden bg-background-secondary ${aspectRatioClasses[aspectRatio]} ${className}`}
        >
            {/* Placeholder/Loading State */}
            <motion.div
                variants={placeholderVariants}
                initial="loading"
                animate={imageState === 'loaded' ? 'loaded' : 'loading'}
                className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-background-secondary to-background-secondary/50"
            >
                {imageState === 'loading' && (
                    <div className="flex flex-col items-center space-y-2">
                        <motion.div
                            animate={prefersReducedMotion ? {} : { rotate: 360 }}
                            transition={prefersReducedMotion ? {} : {
                                duration: 2,
                                repeat: Infinity,
                                ease: 'linear',
                            }}
                            className="w-8 h-8 border-2 border-accent/30 border-t-accent rounded-full"
                        />
                        <span className="text-xs text-text-secondary">Loading...</span>
                    </div>
                )}

                {imageState === 'error' && (
                    <div className="flex flex-col items-center space-y-2 text-text-secondary">
                        <div className="text-2xl">🖼️</div>
                        <span className="text-xs">Image unavailable</span>
                    </div>
                )}
            </motion.div>

            {/* Actual Image */}
            {imageSrc && (
                <motion.img
                    src={imageSrc}
                    alt={alt}
                    variants={imageVariants}
                    initial="loading"
                    animate={imageState === 'loaded' ? 'loaded' : 'loading'}
                    onLoad={handleImageLoad}
                    onError={handleImageError}
                    className="absolute inset-0 w-full h-full object-cover"
                    loading={loading}
                />
            )}

            {/* Overlay for better text readability if needed */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
    );
}