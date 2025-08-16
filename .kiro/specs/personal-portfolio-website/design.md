# Design Document

## Overview

The personal portfolio website will be built as a modern, single-page application (SPA) using React with TypeScript for type safety and maintainability. The design emphasizes clean aesthetics, smooth animations, and excellent user experience across all devices. The site will feature a dark theme with accent colors, following current design trends while maintaining professional appeal.

## Architecture

### Technology Stack
- **Frontend Framework:** React 18 with TypeScript
- **Styling:** Tailwind CSS for utility-first styling with custom components
- **Animation:** Framer Motion for smooth, performant animations
- **Build Tool:** Vite for fast development and optimized builds
- **Deployment:** Netlify for seamless deployment and hosting
- **Form Handling:** Netlify Forms for contact form submission

### Project Structure
```
src/
├── components/
│   ├── ui/           # Reusable UI components
│   ├── sections/     # Page sections (Hero, About, Portfolio, Contact)
│   └── layout/       # Layout components (Header, Footer)
├── hooks/            # Custom React hooks
├── utils/            # Utility functions
├── types/            # TypeScript type definitions
├── data/             # Static data (projects, skills, etc.)
├── assets/           # Images, icons, and other static assets
└── styles/           # Global styles and Tailwind config
```

## Components and Interfaces

### Core Components

#### 1. Layout Components
- **Header/Navigation:** Sticky navigation with smooth scroll to sections, theme toggle, and CV download button
- **Footer:** Simple footer with social links and copyright
- **ScrollProgress:** Visual indicator of scroll progress
- **ThemeToggle:** Light/dark mode switcher in header top right
- **CVButton:** Resume download button in header

#### 2. Section Components
- **Hero:** Main landing section with animated introduction
- **About:** Personal information, skills, and experience
- **Portfolio:** Project showcase with filtering and direct GitHub links
- **Contact:** Contact form and social media links

#### 3. UI Components
- **Button:** Reusable button component with variants
- **Card:** Project cards with hover effects and click-to-GitHub functionality
- **SkillBadge:** Individual skill display with proficiency
- **ContactForm:** Form with validation and submission handling

### Data Interfaces

```typescript
interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  category: string;
  image: string;
  githubUrl: string;
  liveUrl?: string;
  featured: boolean;
}

interface Skill {
  name: string;
  category: 'Frontend' | 'Backend' | 'Tools' | 'Design';
  proficiency: number; // 1-5 scale
  icon?: string;
}

interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}
```

## Design System

### Color Palette

#### Dark Theme (Default)
- **Primary:** Dark background (#0a0a0a)
- **Secondary:** Lighter dark (#1a1a1a)
- **Accent:** Bright blue (#3b82f6)
- **Text Primary:** White (#ffffff)
- **Text Secondary:** Light gray (#a1a1aa)
- **Success:** Green (#10b981)
- **Warning:** Orange (#f59e0b)

#### Light Theme
- **Primary:** Light background (#ffffff)
- **Secondary:** Light gray (#f8fafc)
- **Accent:** Bright blue (#3b82f6)
- **Text Primary:** Dark gray (#1f2937)
- **Text Secondary:** Medium gray (#6b7280)
- **Success:** Green (#10b981)
- **Warning:** Orange (#f59e0b)

### Typography
- **Headings:** Inter font family, bold weights
- **Body:** Inter font family, regular and medium weights
- **Code:** JetBrains Mono for technical content

### Spacing and Layout
- **Container:** Max width 1200px with responsive padding
- **Grid:** CSS Grid and Flexbox for layouts
- **Breakpoints:** Mobile-first responsive design (sm: 640px, md: 768px, lg: 1024px, xl: 1280px)
- **Mobile Navigation:** Hamburger menu for mobile devices
- **Responsive Typography:** Fluid typography scaling across devices
- **Touch Targets:** Minimum 44px touch targets for mobile accessibility

## Animation Strategy

### Page Load Animations
- **Hero Section:** Staggered fade-in for name, title, and description
- **Navigation:** Slide down animation on page load
- **Sections:** Fade-in animations triggered by scroll intersection

### Interaction Animations
- **Hover Effects:** Scale and glow effects on interactive elements
- **Button States:** Smooth transitions for hover, focus, and active states
- **Project Cards:** Lift effect on hover with image zoom and subtle glow
- **Link Transitions:** Smooth external link transitions with visual feedback
- **Theme Toggle:** Smooth transition between light and dark modes with icon animation
- **CV Download:** Button press animation with download confirmation

### Scroll Animations
- **Parallax Effects:** Subtle parallax on hero background
- **Reveal Animations:** Elements animate in as they enter viewport
- **Progress Indicator:** Animated scroll progress bar

## Error Handling

### Form Validation
- **Client-side Validation:** Real-time validation with error messages
- **Email Validation:** Regex pattern matching for email format
- **Required Fields:** Clear indication of required form fields
- **Submission States:** Loading, success, and error states

### Image Loading
- **Lazy Loading:** Intersection Observer for performance
- **Fallback Images:** Default placeholders for failed image loads
- **Progressive Loading:** Blur-to-sharp loading effect

### Network Errors
- **Graceful Degradation:** Site functions without JavaScript
- **Offline Support:** Basic service worker for caching
- **Error Boundaries:** React error boundaries for component failures

## Performance Optimization

### Code Splitting
- **Route-based Splitting:** Lazy load sections if needed
- **Component Splitting:** Dynamic imports for heavy components
- **Bundle Analysis:** Regular bundle size monitoring

### Asset Optimization
- **Image Optimization:** WebP format with fallbacks
- **Icon Strategy:** SVG icons with sprite sheets
- **Font Loading:** Preload critical fonts with font-display: swap
- **Resume Storage:** PDF resume stored in public assets folder
- **Responsive Images:** Multiple image sizes for different screen densities

### Caching Strategy
- **Static Assets:** Long-term caching with versioning
- **Service Worker:** Cache-first strategy for static resources
- **CDN:** Leverage Netlify's global CDN

## Testing Strategy

### Unit Testing
- **Component Testing:** React Testing Library for component behavior
- **Utility Testing:** Jest for utility function testing
- **Hook Testing:** Custom hook testing with React Hooks Testing Library

### Integration Testing
- **Form Submission:** End-to-end form testing
- **Navigation:** Smooth scroll and section navigation testing
- **Responsive Design:** Cross-device layout testing

### Performance Testing
- **Lighthouse Audits:** Regular performance, accessibility, and SEO audits
- **Core Web Vitals:** Monitor LCP, FID, and CLS metrics
- **Load Testing:** Test with slow network conditions

## Accessibility

### WCAG Compliance
- **Keyboard Navigation:** Full keyboard accessibility
- **Screen Reader Support:** Proper ARIA labels and semantic HTML
- **Color Contrast:** Minimum 4.5:1 contrast ratio
- **Focus Management:** Visible focus indicators

### Motion Accessibility
- **Reduced Motion:** Respect prefers-reduced-motion setting
- **Animation Controls:** Option to disable animations
- **Vestibular Safety:** Avoid excessive motion and parallax

## SEO Strategy

### Meta Tags
- **Open Graph:** Social media sharing optimization
- **Twitter Cards:** Enhanced Twitter sharing
- **Structured Data:** JSON-LD for rich snippets

### Content Optimization
- **Semantic HTML:** Proper heading hierarchy and landmarks
- **Alt Text:** Descriptive alt text for all images
- **Page Titles:** Unique, descriptive page titles

### Technical SEO
- **Sitemap:** XML sitemap generation
- **Robots.txt:** Proper crawling instructions
- **Page Speed:** Optimized loading performance
##
 Theme Management

### Theme Implementation
- **Context Provider:** React Context for global theme state management
- **Local Storage:** Persist user theme preference across sessions
- **System Preference:** Detect and respect user's system theme preference
- **CSS Variables:** Dynamic theme switching using CSS custom properties

### Theme Toggle Component
- **Icon Animation:** Smooth transition between sun and moon icons
- **Accessibility:** Proper ARIA labels and keyboard navigation
- **Visual Feedback:** Clear indication of current theme state

## Resume Download Feature

### CV Button Implementation
- **File Handling:** Direct download of PDF file from public assets
- **Button States:** Loading, success, and error states for download
- **Analytics:** Track download events for portfolio metrics
- **File Naming:** Dynamic filename with current date for user convenience

### File Management
- **Asset Location:** Resume stored in `/public/assets/resume.pdf`
- **Version Control:** Easy update process for resume versions
- **Fallback Handling:** Graceful error handling if file is unavailable