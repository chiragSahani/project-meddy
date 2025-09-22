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
      className={`bg-white/4 backdrop-blur-md border border-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-6 cursor-pointer hover:bg-white/6 transition-all duration-200 hover:border-white/20 ${className}`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3 sm:space-x-4 min-w-0 flex-1">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
            {icon}
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="text-base sm:text-lg font-semibold text-white truncate">{title}</h3>
            <p className="text-xs sm:text-sm text-white/70 line-clamp-2">{description}</p>
          </div>
        </div>
        <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-white/60 flex-shrink-0 ml-2" />
      </div>
    </div>
  );
};