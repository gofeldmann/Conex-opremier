import React from 'react';
import { MessageSquare, Award } from 'lucide-react';

export type TabType = 'chat' | 'quiz' | 'admin';

interface NavigationProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ activeTab, onTabChange }) => {
  const navItems: { id: TabType; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'chat', label: 'Conversar', icon: MessageSquare },
    { id: 'quiz', label: 'Quiz', icon: Award },
  ];

  return (
    <nav className="w-full max-w-3xl mx-auto px-4 my-3">
      {/* Pill Container */}
      <div className="bg-[#eef2f9] p-1.5 rounded-full flex items-center justify-center gap-2 shadow-2xs border border-slate-200/60">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-full text-xs sm:text-sm font-extrabold transition ${
                isActive
                  ? 'bg-[#2532f5] text-white shadow-md'
                  : 'bg-white/80 text-slate-600 hover:text-slate-900 hover:bg-white border border-slate-200/50'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-500'}`} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

