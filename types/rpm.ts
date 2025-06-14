export interface User {
  id: string;
  name: string;
  level: number;
  currentXP: number;
  totalXP: number;
  streak: number;
  lastActiveDate: string;
}

export interface RPMPlan {
  id: string;
  userId: string;
  result: string; // What you want
  purpose: string; // Why you want it
  createdAt: string;
  completedAt?: string;
  status: 'active' | 'completed' | 'archived';
  massiveActionPlan: MassiveAction[];
}

export interface MassiveAction {
  id: string;
  planId: string;
  action: string;
  priority: 'high' | 'medium' | 'low';
  completed: boolean;
  xpReward: number;
  completedAt?: string;
  dueDate?: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt?: string;
  requirement: {
    type: 'xp' | 'level' | 'streak' | 'tasks';
    value: number;
  };
}

export interface LevelSystem {
  level: number;
  title: string;
  xpRequired: number;
  color: string;
}

export const LEVELS: LevelSystem[] = [
  { level: 1, title: 'Začátečník', xpRequired: 0, color: '#94a3b8' },
  { level: 2, title: 'Učeň', xpRequired: 100, color: '#64748b' },
  { level: 3, title: 'Praktikant', xpRequired: 300, color: '#059669' },
  { level: 4, title: 'Plánovač', xpRequired: 600, color: '#10b981' },
  { level: 5, title: 'Stratég', xpRequired: 1000, color: '#3b82f6' },
  { level: 6, title: 'Expert', xpRequired: 1500, color: '#6366f1' },
  { level: 7, title: 'Mistr', xpRequired: 2200, color: '#8b5cf6' },
  { level: 8, title: 'Guru', xpRequired: 3000, color: '#a855f7' },
  { level: 9, title: 'Visionář', xpRequired: 4000, color: '#ec4899' },
  { level: 10, title: 'Legenda', xpRequired: 5000, color: '#f59e0b' },
];