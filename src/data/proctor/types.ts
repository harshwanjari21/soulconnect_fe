/**
 * Proctor / Astrologer Domain Types
 */

export type ProctorStatus = 'AVAILABLE' | 'IN_SESSION' | 'BREAK' | 'OFFLINE';

export type ConsultationType = 'audio' | 'video' | 'chat';

export type ClientBirthDetails = {
  dob: string;          // e.g. '15 Aug 1994'
  tob: string;          // e.g. '06:45 AM'
  pob: string;          // e.g. 'New Delhi, India'
  gender: 'Male' | 'Female' | 'Other';
  sunSign: string;      // e.g. 'Leo'
  moonSign: string;     // e.g. 'Scorpio'
  lagna: string;        // e.g. 'Virgo' (Ascendant)
  nakshatra: string;    // e.g. 'Anuradha'
};

export type ConsultationRequest = {
  id: string;
  clientName: string;
  clientAvatar: string;
  consultationType: ConsultationType;
  topic: string;                  // e.g. 'Career Transition & Kundli Matching'
  ratePerMin: number;
  clientBirthDetails: ClientBirthDetails;
  notes?: string;
  requestedAt: string;
  waitingDurationSec: number;
};

export type DailyMetrics = {
  todayEarnings: number;
  todayMinutes: number;
  completedSessions: number;
  rating: number;
  totalReviews: number;
  queueCount: number;
};

export type CompletedSession = {
  id: string;
  clientName: string;
  clientAvatar: string;
  consultationType: ConsultationType;
  durationMinutes: number;
  earnedAmount: number;
  date: string;
  time: string;
  ratingGiven?: number;
  topic: string;
};

export type ScheduledAppointment = {
  id: string;
  clientName: string;
  clientAvatar: string;
  serviceType: string;
  date: string;
  time: string;
  durationMinutes: number;
  status: 'CONFIRMED' | 'PENDING' | 'COMPLETED' | 'CANCELLED';
  notes?: string;
};

export type AstrologerReview = {
  id: string;
  clientName: string;
  clientAvatar: string;
  rating: number;
  date: string;
  consultationType: ConsultationType;
  comment: string;
  astrologerReply?: {
    text: string;
    repliedAt: string;
  };
};

export type ProctorProfile = {
  id: string;
  name: string;
  title: string;
  avatarUrl: string;
  isVerified: boolean;
  rating: number;
  totalReviewsCount: string;    // e.g. '2.4K'
  totalConsultations: number;
  totalSessions: number;        // e.g. 850
  responseRatePercent: number;  // e.g. 98
  experienceYears: number;
  location: string;
  languages: string[];
  specialties: string[];
  ratePerMinAudio: number;
  ratePerMinVideo: number;
  ratePerMinChat: number;
  videoEnabled: boolean;
  audioEnabled: boolean;
  chatEnabled: boolean;
  bio: string;
  bankAccountLinked: boolean;
  walletBalance: number;
  pendingWithdrawal: number;
};
