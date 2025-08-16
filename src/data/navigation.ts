import type { NavItem, SocialLink } from '@/types';
import { NAVIGATION_ITEMS, SOCIAL_LINKS } from '@/utils/constants';

export const navigationItems: NavItem[] = NAVIGATION_ITEMS.map(item => ({
    id: item.id,
    label: item.label,
    href: item.href,
}));

export const socialLinks: SocialLink[] = SOCIAL_LINKS.map(link => ({
    id: link.id,
    name: link.name,
    url: link.url,
    icon: link.icon,
}));