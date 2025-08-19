import { PERSONAL_INFO } from '@/utils/constants';
import { Spotlight } from '@/components/ui/Spotlight';
import { useTheme } from '@/hooks/useTheme';

interface HeroProps {
    className?: string;
}

export function Hero({ className = '' }: HeroProps) {
    const { theme } = useTheme();
    const handleScrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            const headerHeight = 80;
            const targetPosition = element.offsetTop - headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    };

    return (
        <section
            id="home"
            className={`min-h-screen relative overflow-hidden antialiased flex items-center justify-center py-20 px-4 ${className}`}
            aria-label="Hero section"
        >
            <div className="pointer-events-none absolute inset-0 select-none [background-size:40px_40px] dark:[background-image:linear-gradient(to_right,#171717_1px,transparent_1px),linear-gradient(to_bottom,#171717_1px,transparent_1px)]" />

            <Spotlight className="-top-40 left-0 md:-top-20 md:left-60" fill={theme === 'dark' ? 'white' : 'black'} />
            <div className="container mx-auto max-w-4xl text-center">
                {/* Main Content */}
                <div className="space-y-8">
                    {/* Name */}
                    <h1 className="text-5xl sm:text-6xl lg:text-7xl font-light text-text-primary tracking-tight">
                        {PERSONAL_INFO.name}
                    </h1>

                    {/* Title */}
                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-normal text-text-secondary">
                        {PERSONAL_INFO.title}
                    </h2>

                    {/* Tagline */}
                    <p className="text-lg sm:text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed">
                        {PERSONAL_INFO.tagline}
                    </p>

                    {/* Contact Info */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-sm text-text-secondary">
                        <span>{PERSONAL_INFO.location}</span>
                        <span className="hidden sm:block">•</span>
                        <a
                            href={`mailto:${PERSONAL_INFO.email}`}
                            className="hover:text-accent transition-colors duration-200"
                        >
                            {PERSONAL_INFO.email}
                        </a>
                    </div>

                    {/* Simple CTA */}
                    <div className="pt-8">
                        <button
                            onClick={() => handleScrollToSection('portfolio')}
                            className="text-accent hover:text-accent-hover transition-colors duration-200 text-lg font-medium border-b border-accent/30 hover:border-accent pb-1 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background-primary"
                            aria-label="View my portfolio projects"
                        >
                            View My Work
                        </button>
                    </div>
                </div>

                {/* Minimal scroll indicator */}
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
                    <button
                        onClick={() => handleScrollToSection('about')}
                        className="text-text-secondary hover:text-accent transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background-primary rounded p-2"
                        aria-label="Scroll down to about section"
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M19 14l-7 7m0 0l-7-7m7 7V3"
                            />
                        </svg>
                    </button>
                </div>
            </div>
        </section>
    );
}