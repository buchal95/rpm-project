'use client';

import { useState } from 'react';
import UserProfile from '@/components/UserProfile';
import RPMPlanForm from '@/components/RPMPlanForm';
import TaskList from '@/components/TaskList';
import LevelUpNotification from '@/components/LevelUpNotification';
import { useRPMGame } from '@/hooks/useRPMGame';

export default function Home() {
  const { user, plans, addPlan, deletePlan, completeAction, showLevelUp } = useRPMGame();
  const [showForm, setShowForm] = useState(false);

  return (
    <main className="min-h-screen p-4 md:p-8 animate-in">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-5xl md:text-7xl font-black gradient-text mb-4">
            RPM Gamifikovaný
          </h1>
          <p className="text-xl text-rpm-gray-600 max-w-2xl mx-auto">
            Transformujte svou produktivitu s metodou rychlého plánování Tony Robbinse
          </p>
        </header>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="md:col-span-1">
            <UserProfile user={user} />
          </div>
          
          <div className="md:col-span-2">
            <div className="glass rounded-2xl shadow-xl p-6 glass-hover">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Rychlé statistiky</h2>
                <button
                  onClick={() => setShowForm(!showForm)}
                  className="px-6 py-3 bg-gradient-to-r from-rpm-primary to-rpm-secondary text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105"
                >
                  {showForm ? 'Zavřít' : '+ Nový plán'}
                </button>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-6 bg-gradient-to-br from-rpm-primary/10 to-rpm-primary/5 rounded-xl border border-rpm-primary/20">
                  <div className="text-4xl font-black text-rpm-primary mb-1">{plans.length}</div>
                  <div className="text-sm font-medium text-rpm-gray-600">Celkem plánů</div>
                </div>
                <div className="text-center p-6 bg-gradient-to-br from-rpm-accent/10 to-rpm-accent/5 rounded-xl border border-rpm-accent/20">
                  <div className="text-4xl font-black text-rpm-accent mb-1">
                    {plans.filter(p => p.status === 'active').length}
                  </div>
                  <div className="text-sm font-medium text-rpm-gray-600">Aktivních plánů</div>
                </div>
                <div className="text-center p-6 bg-gradient-to-br from-rpm-secondary/10 to-rpm-secondary/5 rounded-xl border border-rpm-secondary/20">
                  <div className="text-4xl font-black text-rpm-secondary mb-1">
                    {plans.reduce((acc, plan) => 
                      acc + plan.massiveActionPlan.filter(a => a.completed).length, 0
                    )}
                  </div>
                  <div className="text-sm font-medium text-rpm-gray-600">Splněných akcí</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {showForm && (
          <div className="mb-8">
            <RPMPlanForm onSubmit={(plan) => {
              addPlan(plan);
              setShowForm(false);
            }} />
          </div>
        )}

        <TaskList plans={plans} onCompleteAction={completeAction} onDeletePlan={deletePlan} />

        <LevelUpNotification level={user.level} show={showLevelUp} />
      </div>
    </main>
  );
}