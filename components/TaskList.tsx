'use client';

import { useState } from 'react';
import { RPMPlan, MassiveAction } from '@/types/rpm';

interface TaskListProps {
  plans: RPMPlan[];
  onCompleteAction: (planId: string, actionId: string) => void;
}

export default function TaskList({ plans, onCompleteAction }: TaskListProps) {
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
      <div className="bg-white rounded-lg shadow-lg p-6 text-center">
        <p className="text-gray-600">Zatím nemáte žádné aktivní plány.</p>
        <p className="text-sm text-gray-500 mt-2">Vytvořte svůj první RPM plán a začněte sbírat XP!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-800">Aktivní plány</h2>
      
      {activePlans.map(plan => {
        const isExpanded = expandedPlans.has(plan.id);
        const completedActions = plan.massiveActionPlan.filter(a => a.completed).length;
        const totalActions = plan.massiveActionPlan.length;
        const progress = totalActions > 0 ? (completedActions / totalActions) * 100 : 0;

        return (
          <div key={plan.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div 
              className="p-6 cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={() => togglePlan(plan.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-800">{plan.result}</h3>
                  <p className="text-gray-600 mt-1">{plan.purpose}</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="text-sm text-gray-600">Postup</div>
                    <div className="text-lg font-semibold">{completedActions}/{totalActions}</div>
                  </div>
                  <div className={`transform transition-transform ${isExpanded ? 'rotate-180' : ''}`}>
                    ▼
                  </div>
                </div>
              </div>
              
              <div className="mt-4 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-rpm-primary to-rpm-accent transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {isExpanded && (
              <div className="border-t border-gray-200 p-6 pt-0">
                <div className="space-y-2 mt-4">
                  {plan.massiveActionPlan.map(action => (
                    <div 
                      key={action.id} 
                      className={`flex items-center gap-3 p-3 rounded-lg ${
                        action.completed ? 'bg-gray-50 opacity-75' : 'hover:bg-gray-50'
                      }`}
                    >
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (!action.completed) {
                            onCompleteAction(plan.id, action.id);
                          }
                        }}
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                          action.completed 
                            ? 'bg-rpm-accent border-rpm-accent' 
                            : 'border-gray-300 hover:border-rpm-accent'
                        }`}
                        disabled={action.completed}
                      >
                        {action.completed && (
                          <span className="text-white text-sm">✓</span>
                        )}
                      </button>
                      
                      <div className="flex-1">
                        <span className={action.completed ? 'line-through text-gray-500' : ''}>
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