import React from 'react';
import { TrendingUp, RefreshCw } from 'lucide-react';

interface HeaderProps {
  onRefresh: () => void;
  refreshing: boolean;
}

export const Header: React.FC<HeaderProps> = ({ onRefresh, refreshing }) => {
  return (
    <header className="bg-white/5 backdrop-blur-sm shadow-sm border-b border-white/10 mb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600/80 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">CryptoDash</h1>
              <p className="text-sm text-white/70">Real-time cryptocurrency market data</p>
            </div>
          </div>
          
          <button
            onClick={onRefresh}
            disabled={refreshing}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600/80 backdrop-blur-sm text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:ring-offset-0 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Refresh data"
          >
            <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">Refresh</span>
          </button>
        </div>
      </div>
    </header>
  );
};