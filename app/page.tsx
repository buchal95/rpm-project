'use client';

import { useState } from 'react';
import UserProfile from '@/components/UserProfile';
import RPMPlanForm from '@/components/RPMPlanForm';
import TaskList from '@/components/TaskList';
import LevelUpNotification from '@/components/LevelUpNotification';
import { useRPMGame } from '@/hooks/useRPMGame';

export default function Home() {
  const { user, plans, addPlan, completeAction, showLevelUp } = useRPMGame();
  const [showForm, setShowForm] = useState(false);

  return (
    <main className="min-h-screen bg-gradient-to-br from-rpm-light to-white p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-2">
            RPM Gamifikovaný
          </h1>
          <p className="text-lg text-gray-600">
            Transformujte svou produktivitu s metodou rychlého plánování
          </p>
        </header>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="md:col-span-1">
            <UserProfile user={user} />
          </div>
          
          <div className="md:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-800">Rychlé statistiky</h2>
                <button
                  onClick={() => setShowForm(!showForm)}
                  className="px-4 py-2 bg-rpm-primary text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {showForm ? 'Zavřít' : '+ Nový plán'}
                </button>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-3xl font-bold text-rpm-primary">{plans.length}</div>
                  <div className="text-sm text-gray-600">Celkem plánů</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-3xl font-bold text-rpm-accent">
                    {plans.filter(p => p.status === 'active').length}
                  </div>
                  <div className="text-sm text-gray-600">Aktivních plánů</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-3xl font-bold text-rpm-secondary">
                    {plans.reduce((acc, plan) => 
                      acc + plan.massiveActionPlan.filter(a => a.completed).length, 0
                    )}
                  </div>
                  <div className="text-sm text-gray-600">Splněných akcí</div>
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

        <TaskList plans={plans} onCompleteAction={completeAction} />

        <LevelUpNotification level={user.level} show={showLevelUp} />
      </div>
    </main>
  );
}