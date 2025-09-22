import React from 'react';
import { ChevronRight } from 'lucide-react';

interface NavigationCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick: () => void;
  className?: string;
}

export const NavigationCard: React.FC<NavigationCardProps> = ({
  title,
  description,
  icon,
  onClick,
  className = '',
}) => {
  return (
    <div
      onClick={onClick}
      className={`bg-white/4 backdrop-blur-md border border-white/10 rounded-2xl p-6 cursor-pointer hover:bg-white/6 transition-all duration-200 hover:border-white/20 ${className}`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center">
            {icon}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">{title}</h3>
            <p className="text-sm text-white/70">{description}</p>
          </div>
        </div>
        <ChevronRight className="w-5 h-5 text-white/60" />
      </div>
    </div>
  );
};