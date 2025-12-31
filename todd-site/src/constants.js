import { faCalendarAlt, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';

export const NAV_ITEMS = [
    { id: 'about', label: 'About' },
    { id: 'articles', label: 'Articles' },
    { id: 'achievements', label: 'Achievements' }
];

export const SOCIAL_LINKS = [
    { href: 'https://www.linkedin.com/in/todd-bernson/', icon: faLinkedin, label: 'LinkedIn' },
    { href: 'mailto:todd@bernsonfamily.com', icon: faEnvelope, label: 'Email' },
    { href: 'https://calendly.com/todd-bernson', icon: faCalendarAlt, label: 'Schedule a meeting' }
];