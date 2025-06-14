'use client';

import { useState, useCallback, useEffect } from 'react';
import { User, RPMPlan, LEVELS } from '@/types/rpm';
import { useLocalStorage } from './useLocalStorage';

const INITIAL_USER: User = {
  id: 'user-1',
  name: 'Hráč',
  level: 1,
  currentXP: 0,
  totalXP: 0,
  streak: 0,
  lastActiveDate: new Date().toISOString().split('T')[0],
};

export function useRPMGame() {
  const [user, setUser] = useLocalStorage<User>('rpm-user', INITIAL_USER);
  const [plans, setPlans] = useLocalStorage<RPMPlan[]>('rpm-plans', []);
  const [showLevelUp, setShowLevelUp] = useState(false);

  // Check and update streak
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    const lastActive = new Date(user.lastActiveDate);
    const todayDate = new Date(today);
    const daysDiff = Math.floor((todayDate.getTime() - lastActive.getTime()) / (1000 * 60 * 60 * 24));

    if (daysDiff === 1) {
      // Continue streak
      setUser({ ...user, lastActiveDate: today });
    } else if (daysDiff > 1) {
      // Break streak
      setUser({ ...user, streak: 0, lastActiveDate: today });
    }
  }, []);

  const calculateLevel = useCallback((totalXP: number) => {
    return LEVELS.filter(level => level.xpRequired <= totalXP).length;
  }, []);

  const addPlan = useCallback((planData: Omit<RPMPlan, 'id' | 'userId' | 'createdAt'>) => {
    const newPlan: RPMPlan = {
      ...planData,
      id: `plan-${Date.now()}`,
      userId: user.id,
      createdAt: new Date().toISOString(),
    };
    
    // Set planId for all actions
    newPlan.massiveActionPlan = newPlan.massiveActionPlan.map(action => ({
      ...action,
      planId: newPlan.id,
    }));

    setPlans([...plans, newPlan]);
  }, [plans, user.id, setPlans]);

  const deletePlan = useCallback((planId: string) => {
    setPlans(plans.filter(p => p.id !== planId));
  }, [plans, setPlans]);

  const completeAction = useCallback((planId: string, actionId: string) => {
    const plan = plans.find(p => p.id === planId);
    if (!plan) return;

    const action = plan.massiveActionPlan.find(a => a.id === actionId);
    if (!action || action.completed) return;

    // Update action
    const updatedPlans = plans.map(p => {
      if (p.id === planId) {
        return {
          ...p,
          massiveActionPlan: p.massiveActionPlan.map(a => {
            if (a.id === actionId) {
              return { ...a, completed: true, completedAt: new Date().toISOString() };
            }
            return a;
          }),
        };
      }
      return p;
    });

    // Add XP to user
    const newTotalXP = user.totalXP + action.xpReward;
    const oldLevel = calculateLevel(user.totalXP);
    const newLevel = calculateLevel(newTotalXP);

    // Update streak if completing action today
    const today = new Date().toISOString().split('T')[0];
    let newStreak = user.streak;
    if (user.lastActiveDate !== today) {
      const lastActive = new Date(user.lastActiveDate);
      const todayDate = new Date(today);
      const daysDiff = Math.floor((todayDate.getTime() - lastActive.getTime()) / (1000 * 60 * 60 * 24));
      
      if (daysDiff === 1) {
        newStreak = user.streak + 1;
      } else {
        newStreak = 1;
      }
    }

    setUser({
      ...user,
      totalXP: newTotalXP,
      currentXP: newTotalXP,
      level: newLevel,
      streak: newStreak,
      lastActiveDate: today,
    });

    setPlans(updatedPlans);

    // Show level up animation
    if (newLevel > oldLevel) {
      setShowLevelUp(true);
      setTimeout(() => setShowLevelUp(false), 3000);
    }
  }, [plans, user, calculateLevel, setUser, setPlans]);

  return {
    user,
    plans,
    addPlan,
    deletePlan,
    completeAction,
    showLevelUp,
  };
}