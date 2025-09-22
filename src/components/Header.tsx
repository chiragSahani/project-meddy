import React from 'react';
import { TrendingUp, RefreshCw } from 'lucide-react';

interface HeaderProps {
  onRefresh: () => void;
  refreshing: boolean;
}

export const Header: React.FC<HeaderProps> = ({ onRefresh, refreshing }) => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-100 mb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">CryptoDash</h1>
              <p className="text-sm text-gray-600">Real-time cryptocurrency market data</p>
            </div>
          </div>
          
          <button
            onClick={onRefresh}
            disabled={refreshing}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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