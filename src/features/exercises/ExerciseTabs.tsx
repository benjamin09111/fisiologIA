import * as React from 'react';
import { Tabs, type TabItem } from '@/components/ui/Tabs';
import { Sparkles, HelpCircle, History } from 'lucide-react';

export interface ExerciseTabsProps {
  activeKey: 'quizzes' | 'bank' | 'history';
}

export function ExerciseTabs({ activeKey }: ExerciseTabsProps) {
  const tabs: TabItem[] = [
    {
      key: 'quizzes',
      label: 'Cuestionarios',
      href: '/ejercicios',
      icon: <Sparkles className="h-4 w-4" />,
    },
    {
      key: 'bank',
      label: 'Banco de preguntas',
      href: '/ejercicios/banco',
      icon: <HelpCircle className="h-4 w-4" />,
    },
    {
      key: 'history',
      label: 'Historial',
      href: '/ejercicios/historial',
      icon: <History className="h-4 w-4" />,
    },
  ];

  return (
    <div className="mb-6 flex">
      <Tabs tabs={tabs} activeKey={activeKey} />
    </div>
  );
}
