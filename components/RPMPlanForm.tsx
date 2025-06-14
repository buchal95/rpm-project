'use client';

import { useState } from 'react';
import { RPMPlan, MassiveAction } from '@/types/rpm';

interface RPMPlanFormProps {
  onSubmit: (plan: Omit<RPMPlan, 'id' | 'userId' | 'createdAt'>) => void;
}

export default function RPMPlanForm({ onSubmit }: RPMPlanFormProps) {
  const [result, setResult] = useState('');
  const [purpose, setPurpose] = useState('');
  const [actions, setActions] = useState<string[]>(['']);

  const handleAddAction = () => {
    setActions([...actions, '']);
  };

  const handleActionChange = (index: number, value: string) => {
    const newActions = [...actions];
    newActions[index] = value;
    setActions(newActions);
  };

  const handleRemoveAction = (index: number) => {
    setActions(actions.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const massiveActionPlan: MassiveAction[] = actions
      .filter(action => action.trim())
      .map((action, index) => ({
        id: `action-${Date.now()}-${index}`,
        planId: '',
        action: action.trim(),
        priority: index === 0 ? 'high' : index < 3 ? 'medium' : 'low',
        completed: false,
        xpReward: index === 0 ? 50 : index < 3 ? 30 : 20,
      } as MassiveAction));

    onSubmit({
      result,
      purpose,
      status: 'active',
      massiveActionPlan,
    });

    // Reset form
    setResult('');
    setPurpose('');
    setActions(['']);
  };

  return (
    <form onSubmit={handleSubmit} className="glass rounded-2xl shadow-xl p-8 max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold mb-8">Vytvořit nový RPM plán</h2>
      
      <div className="mb-6">
        <label className="block text-lg font-semibold mb-3">
          Výsledek (Co chcete?)
        </label>
        <input
          type="text"
          value={result}
          onChange={(e) => setResult(e.target.value)}
          className="w-full px-4 py-3 bg-white dark:bg-rpm-gray-800 text-rpm-gray-900 dark:text-white border border-rpm-gray-300 dark:border-rpm-gray-600 rounded-xl focus:ring-2 focus:ring-rpm-primary focus:border-transparent transition-all duration-200"
          placeholder="např. Zvýšit svou produktivitu o 50%"
          required
        />
      </div>

      <div className="mb-6">
        <label className="block text-lg font-semibold mb-3">
          Účel (Proč to chcete?)
        </label>
        <textarea
          value={purpose}
          onChange={(e) => setPurpose(e.target.value)}
          className="w-full px-4 py-3 bg-white dark:bg-rpm-gray-800 text-rpm-gray-900 dark:text-white border border-rpm-gray-300 dark:border-rpm-gray-600 rounded-xl focus:ring-2 focus:ring-rpm-primary focus:border-transparent transition-all duration-200"
          rows={3}
          placeholder="např. Abych měl více času na rodinu a koníčky"
          required
        />
      </div>

      <div className="mb-6">
        <label className="block text-lg font-semibold mb-3">
          Masivní akční plán (MAP)
        </label>
        <div className="space-y-2">
          {actions.map((action, index) => (
            <div key={index} className="flex gap-2">
              <input
                type="text"
                value={action}
                onChange={(e) => handleActionChange(index, e.target.value)}
                className="flex-1 px-4 py-3 bg-white dark:bg-rpm-gray-800 text-rpm-gray-900 dark:text-white border border-rpm-gray-300 dark:border-rpm-gray-600 rounded-xl focus:ring-2 focus:ring-rpm-primary focus:border-transparent transition-all duration-200"
                placeholder={`Akce ${index + 1}`}
                required={index === 0}
              />
              {actions.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleRemoveAction(index)}
                  className="px-3 py-3 text-rpm-danger hover:bg-rpm-danger/10 rounded-xl transition-all duration-200 font-semibold"
                >
                  ✕
                </button>
              )}
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={handleAddAction}
          className="mt-3 px-6 py-3 text-rpm-primary border-2 border-rpm-primary rounded-xl hover:bg-rpm-primary hover:text-white transition-all duration-200 font-semibold"
        >
          + Přidat akci
        </button>
      </div>

      <div className="flex gap-4">
        <button
          type="submit"
          className="flex-1 px-8 py-4 bg-gradient-to-r from-rpm-primary to-rpm-secondary text-white font-bold rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105"
        >
          Vytvořit plán
        </button>
      </div>
    </form>
  );
}