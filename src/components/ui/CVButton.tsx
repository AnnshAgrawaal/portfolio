import { useState } from 'react';
import { motion } from 'framer-motion';
import { PERSONAL_INFO } from '@/utils/constants';

interface CVButtonProps {
    className?: string;
    variant?: 'primary' | 'secondary' | 'outline';
    size?: 'sm' | 'md' | 'lg';
    showIcon?: boolean;
}

export function CVButton({
    className = '',
    variant = 'outline',
    size = 'md',
    showIcon = true
}: CVButtonProps) {
    const [downloadState, setDownloadState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    const handleDownload = async () => {
        setDownloadState('loading');

        try {
            // Create a temporary link element to trigger download
            const link = document.createElement('a');
            link.href = PERSONAL_INFO.resumeUrl;
            link.download = `${PERSONAL_INFO.name.replace(/\s+/g, '_')}_Resume_${new Date().getFullYear()}.pdf`;

            // Check if file exists by attempting to fetch it
            const response = await fetch(PERSONAL_INFO.resumeUrl, { method: 'HEAD' });

            if (!response.ok) {
                throw new Error('Resume file not found');
            }

            // Trigger download
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            setDownloadState('success');

            // Reset state after 2 seconds
            setTimeout(() => {
                setDownloadState('idle');
            }, 2000);

        } catch (error) {
            console.error('Error downloading resume:', error);
            setDownloadState('error');

            // Reset state after 3 seconds
            setTimeout(() => {
                setDownloadState('idle');
            }, 3000);
        }
    };

    const getVariantClasses = () => {
        const baseClasses = 'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background-primary disabled:opacity-50 disabled:cursor-not-allowed';

        switch (variant) {
            case 'primary':
                return `${baseClasses} bg-accent hover:bg-accent-hover text-white border border-accent hover:border-accent-hover`;
            case 'secondary':
                return `${baseClasses} bg-background-secondary hover:bg-background-secondary/80 text-text-primary border border-text-secondary/20 hover:border-text-secondary/40`;
            case 'outline':
                return `${baseClasses} bg-transparent hover:bg-accent/10 text-text-primary hover:text-accent border border-text-secondary/40 hover:border-accent`;
            default:
                return baseClasses;
        }
    };

    const getSizeClasses = () => {
        switch (size) {
            case 'sm':
                return 'px-3 py-1.5 text-sm rounded-md gap-1.5';
            case 'md':
                return 'px-4 py-2 text-sm rounded-md gap-2';
            case 'lg':
                return 'px-6 py-3 text-base rounded-lg gap-2';
            default:
                return 'px-4 py-2 text-sm rounded-md gap-2';
        }
    };

    const getButtonText = () => {
        switch (downloadState) {
            case 'loading':
                return 'Downloading...';
            case 'success':
                return 'Downloaded!';
            case 'error':
                return 'Download Failed';
            default:
                return 'Download CV';
        }
    };

    const getIcon = () => {
        const iconSize = size === 'sm' ? 'w-4 h-4' : size === 'lg' ? 'w-5 h-5' : 'w-4 h-4';

        switch (downloadState) {
            case 'loading':
                return (
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        className={iconSize}
                    >
                        <LoadingIcon className={iconSize} />
                    </motion.div>
                );
            case 'success':
                return <CheckIcon className={iconSize} />;
            case 'error':
                return <ErrorIcon className={iconSize} />;
            default:
                return <DownloadIcon className={iconSize} />;
        }
    };

    return (
        <motion.button
            onClick={handleDownload}
            disabled={downloadState === 'loading'}
            className={`${getVariantClasses()} ${getSizeClasses()} ${className}`}
            whileHover={{ scale: downloadState === 'loading' ? 1 : 1.02 }}
            whileTap={{ scale: downloadState === 'loading' ? 1 : 0.98 }}
            aria-label={`Download ${PERSONAL_INFO.name}'s resume`}
            title={`Download ${PERSONAL_INFO.name}'s resume as PDF`}
        >
            {showIcon && getIcon()}
            <span>{getButtonText()}</span>
        </motion.button>
    );
}

// Icon Components
function DownloadIcon({ className }: { className: string }) {
    return (
        <svg
            className={className}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
        >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
    );
}

function LoadingIcon({ className }: { className: string }) {
    return (
        <svg
            className={className}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
        >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
    );
}

function CheckIcon({ className }: { className: string }) {
    return (
        <motion.svg
            className={className}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
        >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </motion.svg>
    );
}

function ErrorIcon({ className }: { className: string }) {
    return (
        <motion.svg
            className={className}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
        >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </motion.svg>
    );
}