'use client';

import { useEffect, useState } from 'react';
import { LEVELS } from '@/types/rpm';

interface LevelUpNotificationProps {
  level: number;
  show: boolean;
}

export default function LevelUpNotification({ level, show }: LevelUpNotificationProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (show) {
      setIsVisible(true);
      const timer = setTimeout(() => setIsVisible(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [show]);

  if (!isVisible) return null;

  const currentLevel = LEVELS.find(l => l.level === level) || LEVELS[0];

  return (
    <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 animate-level-up">
      <div className="bg-white rounded-lg shadow-2xl p-8 text-center max-w-md">
        <div className="text-6xl mb-4">🎉</div>
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Nová úroveň!</h2>
        <p className="text-xl mb-4">
          Dosáhli jste úrovně <span className="font-bold" style={{ color: currentLevel.color }}>
            {currentLevel.level}: {currentLevel.title}
          </span>
        </p>
        <p className="text-gray-600">Pokračujte v plnění úkolů a odemkněte další úrovně!</p>
      </div>
    </div>
  );
}