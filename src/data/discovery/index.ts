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
  /** Gradient color pair for aura effect overlay */
  gradientColors: readonly [string, string];
  /** Local required image asset */
  image: any;
  iconColor: string;
  /** Subtle background geometry pattern */
  pattern: 'orbital' | 'stacked' | 'curves' | 'directional' | 'dotgrid' | 'radial';
};

export const GUIDANCE_CATEGORIES: GuidanceCategory[] = [
  {
    id: 'relationships',
    title: 'Relationships',
    description: 'Love & compatibility',
    iconName: 'heart-outline',
    gradientColors: ['rgba(255,255,255,0.7)', 'rgba(248,221,210,0.8)'], // fading to peach
    image: require('../../assets/images/tiles/bg_guidance_relationships_v2.jpg'),
    iconColor: Colors.accentCoral,
    pattern: 'curves',
  },
  {
    id: 'career',
    title: 'Career & Work',
    description: 'Success & growth',
    iconName: 'briefcase-outline',
    gradientColors: ['rgba(255,255,255,0.7)', 'rgba(220,239,234,0.8)'], // fading to tealSoft
    image: require('../../assets/images/tiles/bg_guidance_career.jpg'),
    iconColor: Colors.teal,
    pattern: 'directional',
  },
  {
    id: 'home-family',
    title: 'Home & Family',
    description: 'Stability & harmony',
    iconName: 'home-outline',
    gradientColors: ['rgba(255,255,255,0.7)', 'rgba(228,239,232,0.8)'], // fading to sage
    image: require('../../assets/images/tiles/bg_guidance_home.jpg'),
    iconColor: Colors.accentForest,
    pattern: 'stacked',
  },
  {
    id: 'personal-growth',
    title: 'Personal Growth',
    description: 'Clarity & purpose',
    iconName: 'trending-up-outline',
    gradientColors: ['rgba(255,255,255,0.7)', 'rgba(238,231,245,0.8)'], // fading to lavender
    image: require('../../assets/images/tiles/bg_guidance_growth.jpg'),
    iconColor: Colors.accentViolet,
    pattern: 'orbital',
  },
  {
    id: 'money',
    title: 'Money & Finance',
    description: 'Financial guidance',
    iconName: 'wallet-outline',
    gradientColors: ['rgba(255,255,255,0.7)', 'rgba(248,235,207,0.8)'], // fading to goldSoft
    image: require('../../assets/images/tiles/bg_guidance_money.jpg'),
    iconColor: Colors.accentAmber,
    pattern: 'dotgrid',
  },
  {
    id: 'life-decisions',
    title: 'Life Decisions',
    description: 'Find your direction',
    iconName: 'compass-outline',
    gradientColors: ['rgba(255,255,255,0.7)', 'rgba(223,240,250,0.8)'], // fading to sky
    image: require('../../assets/images/tiles/bg_guidance_decisions.jpg'),
    iconColor: Colors.accentOcean,
    pattern: 'directional',
  },
];

// ── Practices ─────────────────────────────────────────────────────────────────

export type Practice = {
  id: string;
  title: string;
  /** Ionicons icon name — outline variant */
  iconName: string;
  backgroundColor: string;
  /** Local required image asset */
  image: any;
  iconColor: string;
  /** Which SVG geometry pattern to show behind the icon */
  pattern: 'orbital' | 'stacked' | 'curves' | 'directional' | 'dotgrid' | 'radial';
};

export const PRACTICES: Practice[] = [
  {
    id: 'astrology',
    title: 'Astrology',
    iconName: 'telescope-outline',
    backgroundColor: Colors.cosmosPlum,
    image: require('../../assets/images/tiles/astro-bg.png'),
    iconColor: Colors.gold,
    pattern: 'orbital',
  },
  {
    id: 'tarot',
    title: 'Tarot',
    iconName: 'layers-outline',
    backgroundColor: Colors.cosmosCrimson,
    image: require('../../assets/images/tiles/tarot-bg.png'),
    iconColor: Colors.gold,
    pattern: 'stacked',
  },
  {
    id: 'palmistry',
    title: 'Palmistry',
    iconName: 'hand-left-outline',
    backgroundColor: Colors.cosmosAmber,
    image: require('../../assets/images/tiles/palm-bg.png'),
    iconColor: Colors.gold,
    pattern: 'curves',
  },
  {
    id: 'vastu',
    title: 'Vastu',
    iconName: 'grid-outline',
    backgroundColor: Colors.cosmosForest,
    image: require('../../assets/images/tiles/vastu-bg.png'),
    iconColor: Colors.gold,
    pattern: 'directional',
  },
  {
    id: 'numerology',
    title: 'Numerology',
    iconName: 'calculator-outline',
    backgroundColor: Colors.cosmosNavy,
    image: require('../../assets/images/tiles/numerology-bg.png'),
    iconColor: Colors.gold,
    pattern: 'dotgrid',
  },
  {
    id: 'healing',
    title: 'Healing',
    iconName: 'leaf-outline',
    backgroundColor: Colors.cosmosOcean,
    image: require('../../assets/images/tiles/healing-bg.png'),
    iconColor: Colors.gold,
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
