import React, { createContext, useContext, useState, ReactNode } from 'react';

// --- Types ---
export type Transaction = {
  id: string;
  type: 'CREDIT' | 'DEBIT';
  amount: number;
  description: string;
  date: string;
};

export type Session = {
  id: string;
  expertId: string;
  expertName: string;
  expertImageUri: string;
  date: string;
  durationMinutes: number;
  cost: number;
  status: 'UPCOMING' | 'COMPLETED' | 'CANCELED';
};

type UserContextType = {
  walletBalance: number;
  addFunds: (amount: number) => void;
  deductFunds: (amount: number, reason: string) => boolean;
  transactionHistory: Transaction[];
  upcomingSessions: Session[];
  pastSessions: Session[];
  bookSession: (session: Omit<Session, 'id' | 'status'>) => boolean;
  endSession: (sessionId: string) => void;
  savedExperts: string[];
  toggleSavedExpert: (expertId: string) => void;
};

// --- Initial Mock Data ---
const MOCK_INITIAL_TRANSACTIONS: Transaction[] = [
  { id: 'tx-1', type: 'CREDIT', amount: 500, description: 'Added Funds', date: 'Today, 10:00 AM' },
  { id: 'tx-2', type: 'DEBIT', amount: 150, description: 'Consultation with Dr. Aman Singh', date: 'Yesterday, 4:30 PM' },
];

const MOCK_PAST_SESSIONS: Session[] = [
  {
    id: 'sess-1',
    expertId: 'expert-1',
    expertName: 'Dr. Aman Singh',
    expertImageUri: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200&h=200',
    date: 'Yesterday, 4:30 PM',
    durationMinutes: 10,
    cost: 150,
    status: 'COMPLETED',
  },
];

const MOCK_UPCOMING_SESSIONS: Session[] = [
  {
    id: 'sess-mock-1',
    expertId: 'expert-2',
    expertName: 'Priya Sharma',
    expertImageUri: 'https://randomuser.me/api/portraits/women/44.jpg',
    date: 'Today, 7:30 PM',
    durationMinutes: 15,
    cost: 600,
    status: 'UPCOMING',
  }
];

// --- Context ---
const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [walletBalance, setWalletBalance] = useState<number>(350);
  const [transactionHistory, setTransactionHistory] = useState<Transaction[]>(MOCK_INITIAL_TRANSACTIONS);
  const [upcomingSessions, setUpcomingSessions] = useState<Session[]>(MOCK_UPCOMING_SESSIONS);
  const [pastSessions, setPastSessions] = useState<Session[]>(MOCK_PAST_SESSIONS);
  const [savedExperts, setSavedExperts] = useState<string[]>([]);

  const addFunds = (amount: number) => {
    setWalletBalance((prev) => prev + amount);
    setTransactionHistory((prev) => [
      {
        id: `tx-${Date.now()}`,
        type: 'CREDIT',
        amount,
        description: 'Added Funds',
        date: 'Just now',
      },
      ...prev,
    ]);
  };

  const deductFunds = (amount: number, reason: string) => {
    if (walletBalance >= amount) {
      setWalletBalance((prev) => prev - amount);
      setTransactionHistory((prev) => [
        {
          id: `tx-${Date.now()}`,
          type: 'DEBIT',
          amount,
          description: reason,
          date: 'Just now',
        },
        ...prev,
      ]);
      return true;
    }
    return false;
  };

  const bookSession = (sessionData: Omit<Session, 'id' | 'status'>) => {
    if (deductFunds(sessionData.cost, `Consultation with ${sessionData.expertName}`)) {
      const newSession: Session = {
        ...sessionData,
        id: `sess-${Date.now()}`,
        status: 'UPCOMING',
      };
      setUpcomingSessions((prev) => [newSession, ...prev]);
      return true;
    }
    return false;
  };

  const endSession = (sessionId: string) => {
    setUpcomingSessions((prev) => {
      const session = prev.find((s) => s.id === sessionId);
      if (session) {
        setPastSessions((past) => [{ ...session, status: 'COMPLETED' }, ...past]);
      }
      return prev.filter((s) => s.id !== sessionId);
    });
  };

  const toggleSavedExpert = (expertId: string) => {
    setSavedExperts((prev) =>
      prev.includes(expertId) ? prev.filter((id) => id !== expertId) : [...prev, expertId]
    );
  };

  return (
    <UserContext.Provider
      value={{
        walletBalance,
        addFunds,
        deductFunds,
        transactionHistory,
        upcomingSessions,
        pastSessions,
        bookSession,
        endSession,
        savedExperts,
        toggleSavedExpert,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
