'use client';

import { User, LEVELS } from '@/types/rpm';

interface UserProfileProps {
  user: User;
}

export default function UserProfile({ user }: UserProfileProps) {
  const currentLevel = LEVELS.find(l => l.xpRequired <= user.totalXP && user.totalXP < (LEVELS[l.level]?.xpRequired || Infinity)) || LEVELS[0];
  const nextLevel = LEVELS[currentLevel.level];
  const xpForNextLevel = nextLevel ? nextLevel.xpRequired - user.totalXP : 0;
  const progressPercentage = nextLevel 
    ? ((user.totalXP - currentLevel.xpRequired) / (nextLevel.xpRequired - currentLevel.xpRequired)) * 100
    : 100;

  return (
    <div className="glass rounded-2xl shadow-xl p-8 max-w-md mx-auto glass-hover">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-3xl font-bold">{user.name}</h2>
        <div className="text-right">
          <div className="text-sm text-rpm-gray-600 font-medium">Série</div>
          <div className="flex items-center gap-1">
            <span className="text-3xl font-black text-rpm-accent">{user.streak}</span>
            <span className="text-2xl animate-pulse">🔥</span>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <div>
            <span className="text-xl font-bold" style={{ color: currentLevel.color }}>
              Level {currentLevel.level}: {currentLevel.title}
            </span>
          </div>
          <div className="text-lg font-semibold text-rpm-gray-700">
            {user.totalXP} XP
          </div>
        </div>

        <div className="relative h-8 bg-rpm-gray-200/50 rounded-full overflow-hidden shadow-inner">
          <div 
            className="absolute h-full bg-gradient-to-r from-rpm-primary to-rpm-secondary transition-all duration-500 ease-out rounded-full shimmer"
            style={{ width: `${progressPercentage}%` }}
          />
          <div className="absolute inset-0 flex items-center justify-center text-sm font-bold text-white drop-shadow-md">
            {xpForNextLevel > 0 ? `${xpForNextLevel} XP do další úrovně` : 'Max úroveň!'}
          </div>
        </div>
      </div>

      {nextLevel && (
        <div className="text-center text-rpm-gray-600">
          Další úroveň: <span className="font-bold text-lg" style={{ color: nextLevel.color }}>
            {nextLevel.title}
          </span>
        </div>
      )}
    </div>
  );
}