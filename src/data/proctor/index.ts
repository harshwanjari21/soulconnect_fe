/**
 * ConsultLive — Proctor (Astrologer) Data & Mock Store
 */

import {
  AstrologerReview,
  CompletedSession,
  ConsultationRequest,
  DailyMetrics,
  ProctorProfile,
  ScheduledAppointment,
} from './types';

export * from './types';

export const MOCK_PROCTOR_PROFILE: ProctorProfile = {
  id: 'astrologer-dr-amara',
  name: 'Dr. Amara Singh',
  title: 'Vedic Astrology',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
  isVerified: true,
  rating: 4.9,
  totalReviewsCount: '2.4K',
  totalConsultations: 1241,
  totalSessions: 850,
  responseRatePercent: 98,
  experienceYears: 15,
  location: 'New Delhi',
  languages: ['English', 'Hindi'],
  specialties: ['Vedic Astrology', 'Career Guidance', 'Relationship Guidance', 'Kundli Matching'],
  ratePerMinVideo: 25,
  ratePerMinAudio: 20,
  ratePerMinChat: 15,
  videoEnabled: true,
  audioEnabled: true,
  chatEnabled: true,
  bio: 'Dr. Amara Singh is a world-renowned Vedic Astrologer with over 15 years of experience in natal chart analysis, career guidance, and relationship matching. She specializes in helping individuals find clarity in relationships and personal growth.',
  bankAccountLinked: true,
  walletBalance: 14850,
  pendingWithdrawal: 4500,
};

export const MOCK_REVIEWS: AstrologerReview[] = [
  {
    id: 'rev-1',
    clientName: 'Priya K.',
    clientAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    rating: 5,
    date: '12 Oct 2023',
    consultationType: 'video',
    comment:
      'The consultation was incredibly insightful. Dr. Singh has a way of explaining complex astrological transits in a way that is easy to understand. Highly recommend!',
  },
  {
    id: 'rev-2',
    clientName: 'Rahul M.',
    clientAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    rating: 5,
    date: '10 Oct 2023',
    consultationType: 'audio',
    comment:
      'Very accurate readings about my career change. Thank you for the guidance.',
    astrologerReply: {
      text: 'Thank you Rahul! Wishing you immense success and planetary harmony in your new endeavor.',
      repliedAt: '10 Oct 2023',
    },
  },
  {
    id: 'rev-3',
    clientName: 'Ananya S.',
    clientAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    rating: 5,
    date: '08 Oct 2023',
    consultationType: 'chat',
    comment:
      'Amazing experience. Very patient and detailed with all my questions.',
  },
  {
    id: 'rev-4',
    clientName: 'Vikram P.',
    clientAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    rating: 4,
    date: '02 Oct 2023',
    consultationType: 'video',
    comment:
      'Very detailed Kundli analysis. The gemstone recommendations were very well researched.',
  },
];

export const MOCK_DAILY_METRICS: DailyMetrics = {
  todayEarnings: 3820,
  todayMinutes: 85,
  completedSessions: 4,
  rating: 4.95,
  totalReviews: 832,
  queueCount: 2,
};

export const MOCK_ACTIVE_QUEUE: ConsultationRequest[] = [
  {
    id: 'req-001',
    clientName: 'Aarav Singhania',
    clientAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    consultationType: 'audio',
    topic: 'Career Transition & Shani Sade Sati',
    ratePerMin: 20,
    requestedAt: 'Just now',
    waitingDurationSec: 42,
    clientBirthDetails: {
      dob: '24 Oct 1993',
      tob: '07:15 AM',
      pob: 'Mumbai, India',
      gender: 'Male',
      sunSign: 'Scorpio',
      moonSign: 'Aquarius',
      lagna: 'Libra',
      nakshatra: 'Dhanishta',
    },
    notes: 'Feeling stuck in current IT role. Looking for auspicious timing for job change.',
  },
  {
    id: 'req-002',
    clientName: 'Meera Kapoor',
    clientAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    consultationType: 'video',
    topic: 'Kundli Milan / Matchmaking',
    ratePerMin: 25,
    requestedAt: '3m ago',
    waitingDurationSec: 180,
    clientBirthDetails: {
      dob: '12 Feb 1996',
      tob: '11:30 PM',
      pob: 'Jaipur, India',
      gender: 'Female',
      sunSign: 'Aquarius',
      moonSign: 'Gemini',
      lagna: 'Scorpio',
      nakshatra: 'Ardra',
    },
    notes: 'Guna Milan evaluation and Mangal dosha query.',
  },
];

export const MOCK_COMPLETED_SESSIONS: CompletedSession[] = [
  {
    id: 'sess-101',
    clientName: 'Rohan Verma',
    clientAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    consultationType: 'audio',
    durationMinutes: 28,
    earnedAmount: 560,
    date: 'Today',
    time: '11:30 AM',
    ratingGiven: 5,
    topic: 'Business Expansion Guidance',
  },
  {
    id: 'sess-102',
    clientName: 'Ananya Roy',
    clientAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    consultationType: 'video',
    durationMinutes: 22,
    earnedAmount: 550,
    date: 'Today',
    time: '10:15 AM',
    ratingGiven: 5,
    topic: 'Health & Gemstone Recommendation',
  },
  {
    id: 'sess-103',
    clientName: 'Vikram Joshi',
    clientAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    consultationType: 'chat',
    durationMinutes: 35,
    earnedAmount: 525,
    date: 'Yesterday',
    time: '04:45 PM',
    ratingGiven: 4,
    topic: 'Relationship Compatibility',
  },
];

export const MOCK_SCHEDULED_APPOINTMENTS: ScheduledAppointment[] = [
  {
    id: 'app-201',
    clientName: 'Pooja Bhatt',
    clientAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    serviceType: 'Vedic Kundli Full Reading',
    date: 'Today',
    time: '04:00 PM',
    durationMinutes: 45,
    status: 'CONFIRMED',
    notes: 'Birth chart already prepared.',
  },
  {
    id: 'app-202',
    clientName: 'Devendra Sen',
    clientAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    serviceType: 'Vastu Floorplan Review',
    date: 'Tomorrow',
    time: '11:00 AM',
    durationMinutes: 60,
    status: 'CONFIRMED',
    notes: 'Floor plan sent via WhatsApp / attachment.',
  },
];

export type ProctorNavItem = {
  id: string;
  label: string;
  iconActive: string;
  iconInactive: string;
  route: string;
};

export const PROCTOR_NAV_ITEMS: ProctorNavItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    iconActive: 'speedometer',
    iconInactive: 'speedometer-outline',
    route: '/proctor',
  },
  {
    id: 'schedule',
    label: 'Schedule',
    iconActive: 'calendar',
    iconInactive: 'calendar-outline',
    route: '/proctor/schedule',
  },
  {
    id: 'earnings',
    label: 'Earnings',
    iconActive: 'wallet',
    iconInactive: 'wallet-outline',
    route: '/proctor/earnings',
  },
  {
    id: 'profile',
    label: 'Profile',
    iconActive: 'person',
    iconInactive: 'person-outline',
    route: '/proctor/profile',
  },
];
