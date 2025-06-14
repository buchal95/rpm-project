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
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-800">{user.name}</h2>
        <div className="text-right">
          <div className="text-sm text-gray-600">Série</div>
          <div className="flex items-center gap-1">
            <span className="text-2xl font-bold text-rpm-accent">{user.streak}</span>
            <span className="text-lg">🔥</span>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <div>
            <span className="text-lg font-semibold" style={{ color: currentLevel.color }}>
              Level {currentLevel.level}: {currentLevel.title}
            </span>
          </div>
          <div className="text-sm text-gray-600">
            {user.totalXP} XP
          </div>
        </div>

        <div className="relative h-6 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="absolute h-full bg-gradient-to-r from-rpm-primary to-rpm-secondary transition-all duration-500 ease-out"
            style={{ width: `${progressPercentage}%` }}
          />
          <div className="absolute inset-0 flex items-center justify-center text-sm font-medium text-white mix-blend-difference">
            {xpForNextLevel > 0 ? `${xpForNextLevel} XP do další úrovně` : 'Max úroveň!'}
          </div>
        </div>
      </div>

      {nextLevel && (
        <div className="text-center text-sm text-gray-600">
          Další úroveň: <span className="font-semibold" style={{ color: nextLevel.color }}>
            {nextLevel.title}
          </span>
        </div>
      )}
    </div>
  );
}