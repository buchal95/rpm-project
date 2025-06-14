'use client';

import { useState } from 'react';
import { RPMPlan, MassiveAction } from '@/types/rpm';

interface TaskListProps {
  plans: RPMPlan[];
  onCompleteAction: (planId: string, actionId: string) => void;
  onDeletePlan: (planId: string) => void;
}

export default function TaskList({ plans, onCompleteAction, onDeletePlan }: TaskListProps) {
  const [expandedPlans, setExpandedPlans] = useState<Set<string>>(new Set());

  const togglePlan = (planId: string) => {
    const newExpanded = new Set(expandedPlans);
    if (newExpanded.has(planId)) {
      newExpanded.delete(planId);
    } else {
      newExpanded.add(planId);
    }
    setExpandedPlans(newExpanded);
  };

  const getPriorityColor = (priority: MassiveAction['priority']) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'low': return 'text-green-600 bg-green-50';
    }
  };

  const activePlans = plans.filter(plan => plan.status === 'active');

  if (activePlans.length === 0) {
    return (
      <div className="glass rounded-2xl shadow-xl p-8 text-center">
        <p className="text-lg text-rpm-gray-600">Zatím nemáte žádné aktivní plány.</p>
        <p className="text-rpm-gray-500 mt-2">Vytvořte svůj první RPM plán a začněte sbírat XP!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-3xl font-bold mb-6">Aktivní plány</h2>
      
      {activePlans.map(plan => {
        const isExpanded = expandedPlans.has(plan.id);
        const completedActions = plan.massiveActionPlan.filter(a => a.completed).length;
        const totalActions = plan.massiveActionPlan.length;
        const progress = totalActions > 0 ? (completedActions / totalActions) * 100 : 0;

        return (
          <div key={plan.id} className="glass rounded-2xl shadow-xl overflow-hidden glass-hover">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div 
                  className="flex-1 cursor-pointer"
                  onClick={() => togglePlan(plan.id)}
                >
                  <h3 className="text-xl font-semibold">{plan.result}</h3>
                  <p className="text-rpm-gray-600 mt-1">{plan.purpose}</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="text-sm text-rpm-gray-600">Postup</div>
                    <div className="text-lg font-semibold">{completedActions}/{totalActions}</div>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (confirm('Opravdu chcete smazat tento plán?')) {
                        onDeletePlan(plan.id);
                      }
                    }}
                    className="p-2 text-rpm-danger hover:bg-rpm-danger/10 rounded-xl transition-all duration-200"
                    title="Smazat plán"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                  <button
                    onClick={() => togglePlan(plan.id)}
                    className={`p-2 transform transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </div>
              </div>
              
              <div className="mt-4 h-3 bg-rpm-gray-200/50 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-rpm-primary to-rpm-accent transition-all duration-500 rounded-full shimmer"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {isExpanded && (
              <div className="border-t border-rpm-gray-200/30 p-6 pt-0">
                <div className="space-y-3 mt-6">
                  {plan.massiveActionPlan.map(action => (
                    <div 
                      key={action.id} 
                      className={`flex items-center gap-3 p-4 rounded-xl transition-all duration-200 ${
                        action.completed ? 'bg-rpm-gray-100/50 opacity-75' : 'hover:bg-white/50'
                      }`}
                    >
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (!action.completed) {
                            onCompleteAction(plan.id, action.id);
                          }
                        }}
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                          action.completed 
                            ? 'bg-rpm-accent border-rpm-accent' 
                            : 'border-rpm-gray-300 hover:border-rpm-accent hover:scale-110'
                        }`}
                        disabled={action.completed}
                      >
                        {action.completed && (
                          <span className="text-white text-sm">✓</span>
                        )}
                      </button>
                      
                      <div className="flex-1">
                        <span className={`transition-all duration-200 ${action.completed ? 'line-through text-rpm-gray-500' : ''}`}>
                          {action.action}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getPriorityColor(action.priority)}`}>
                          {action.priority === 'high' ? 'Vysoká' : action.priority === 'medium' ? 'Střední' : 'Nízká'}
                        </span>
                        <span className="text-sm font-semibold text-rpm-primary">
                          +{action.xpReward} XP
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}