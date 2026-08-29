/**
 * ConsultLive — Discovery Screen Data
 *
 * All structured data for the Discovery screen.
 * Components render this data — no hardcoded JSX repetition.
 * Replace with API responses in future without UI rewrites.
 *
 * Icon family: Ionicons throughout — consistent stroke weight and style.
 */

import { Colors } from '@/theme';

// ── Guidance Categories ───────────────────────────────────────────────────────

export type GuidanceCategory = {
  id: string;
  title: string;
  description: string;
  /** Ionicons icon name — outline variant */
  iconName: string;
  backgroundColor: string;
  iconColor: string;
};

export const GUIDANCE_CATEGORIES: GuidanceCategory[] = [
  {
    id: 'relationships',
    title: 'Relationships',
    description: 'Love & compatibility',
    iconName: 'heart-outline',
    backgroundColor: Colors.peach,
    iconColor: Colors.accentCoral,
  },
  {
    id: 'career',
    title: 'Career & Work',
    description: 'Success & growth',
    iconName: 'briefcase-outline',
    backgroundColor: Colors.tealSoft,
    iconColor: Colors.teal,
  },
  {
    id: 'home-family',
    title: 'Home & Family',
    description: 'Stability & harmony',
    iconName: 'home-outline',
    backgroundColor: Colors.sage,
    iconColor: Colors.accentForest,
  },
  {
    id: 'personal-growth',
    title: 'Personal Growth',
    description: 'Clarity & purpose',
    iconName: 'trending-up-outline',
    backgroundColor: Colors.lavender,
    iconColor: Colors.accentViolet,
  },
  {
    id: 'money',
    title: 'Money & Finance',
    description: 'Financial guidance',
    iconName: 'wallet-outline',
    backgroundColor: Colors.goldSoft,
    iconColor: Colors.accentAmber,
  },
  {
    id: 'life-decisions',
    title: 'Life Decisions',
    description: 'Find your direction',
    iconName: 'compass-outline',
    backgroundColor: Colors.sky,
    iconColor: Colors.accentOcean,
  },
];

// ── Practices ─────────────────────────────────────────────────────────────────

export type Practice = {
  id: string;
  title: string;
  /** Ionicons icon name — outline variant */
  iconName: string;
  backgroundColor: string;
  iconColor: string;
  /** Which SVG geometry pattern to show behind the icon */
  pattern: 'orbital' | 'stacked' | 'curves' | 'directional' | 'dotgrid' | 'radial';
};

export const PRACTICES: Practice[] = [
  {
    id: 'astrology',
    title: 'Astrology',
    iconName: 'telescope-outline',
    backgroundColor: Colors.lavender,
    iconColor: Colors.accentViolet,
    pattern: 'orbital',
  },
  {
    id: 'tarot',
    title: 'Tarot',
    iconName: 'layers-outline',
    backgroundColor: Colors.peach,
    iconColor: Colors.accentCoral,
    pattern: 'stacked',
  },
  {
    id: 'palmistry',
    title: 'Palmistry',
    iconName: 'hand-left-outline',
    backgroundColor: Colors.goldSoft,
    iconColor: Colors.accentAmber,
    pattern: 'curves',
  },
  {
    id: 'vastu',
    title: 'Vastu',
    iconName: 'grid-outline',
    backgroundColor: Colors.sage,
    iconColor: Colors.accentForest,
    pattern: 'directional',
  },
  {
    id: 'numerology',
    title: 'Numerology',
    iconName: 'calculator-outline',
    backgroundColor: Colors.tealSoft,
    iconColor: Colors.teal,
    pattern: 'dotgrid',
  },
  {
    id: 'healing',
    title: 'Healing',
    iconName: 'leaf-outline',
    backgroundColor: Colors.sky,
    iconColor: Colors.accentOcean,
    pattern: 'radial',
  },
];

// ── Experts ───────────────────────────────────────────────────────────────────

export type Expert = {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  totalConsultations: number;
  experienceYears: number;
  pricePerMin: number;
  isOnline: boolean;
  isVerified: boolean;
  imageUri: string;
};

export const EXPERTS: Expert[] = [
  {
    id: 'expert-1',
    name: 'Dr. Aman Singh',
    specialty: 'Vedic Astrology',
    rating: 4.9,
    totalConsultations: 1241,
    experienceYears: 15,
    pricePerMin: 45,
    isOnline: true,
    isVerified: true,
    imageUri: 'https://randomuser.me/api/portraits/men/32.jpg',
  },
  {
    id: 'expert-2',
    name: 'Priya Sharma',
    specialty: 'Tarot Reading',
    rating: 4.8,
    totalConsultations: 553,
    experienceYears: 8,
    pricePerMin: 40,
    isOnline: true,
    isVerified: true,
    imageUri: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
  {
    id: 'expert-3',
    name: 'Rajan Mehta',
    specialty: 'Numerology',
    rating: 4.7,
    totalConsultations: 312,
    experienceYears: 10,
    pricePerMin: 35,
    isOnline: false,
    isVerified: true,
    imageUri: 'https://randomuser.me/api/portraits/men/68.jpg',
  },
  {
    id: 'expert-4',
    name: 'Kavya Nair',
    specialty: 'Palmistry',
    rating: 4.9,
    totalConsultations: 889,
    experienceYears: 12,
    pricePerMin: 50,
    isOnline: true,
    isVerified: true,
    imageUri: 'https://randomuser.me/api/portraits/women/17.jpg',
  },
];

// ── Bottom Navigation ─────────────────────────────────────────────────────────

export type NavItem = {
  id: string;
  label: string;
  /** Ionicons icon name — active (filled) and inactive (outline) */
  iconActive: string;
  iconInactive: string;
  route: string;
};

export const NAV_ITEMS: NavItem[] = [
  {
    id: 'discover',
    label: 'Discover',
    iconActive: 'compass',
    iconInactive: 'compass-outline',
    route: '/',
  },
  {
    id: 'sessions',
    label: 'Sessions',
    iconActive: 'videocam',
    iconInactive: 'videocam-outline',
    route: '/sessions',
  },
  {
    id: 'wallet',
    label: 'Wallet',
    iconActive: 'wallet',
    iconInactive: 'wallet-outline',
    route: '/wallet',
  },
  {
    id: 'profile',
    label: 'Profile',
    iconActive: 'person',
    iconInactive: 'person-outline',
    route: '/profile',
  },
];

// ── Cosmic Insight ────────────────────────────────────────────────────────────

export const COSMIC_INSIGHT = {
  label: 'CELESTIAL GUIDANCE',
  sign: 'Moon in Taurus',
  date: 'Oct 24, 2025',
  title: 'The Moon enters Taurus today',
  description:
    'A great time for grounded decisions around money, stability and long-term plans.',
  cta: 'View celestial reading',
};

// ── Getting Started Steps ─────────────────────────────────────────────────────

export type GettingStartedStep = {
  id: string;
  number: string;
  title: string;
  description: string;
};

export const GETTING_STARTED_STEPS: GettingStartedStep[] = [
  {
    id: 'step-1',
    number: '01',
    title: 'Find your guidance',
    description: 'Choose the area that speaks to you',
  },
  {
    id: 'step-2',
    number: '02',
    title: 'Choose an expert',
    description: 'Browse profiles, read reviews',
  },
  {
    id: 'step-3',
    number: '03',
    title: 'Talk when ready',
    description: 'Start a call, video or chat session',
  },
];
