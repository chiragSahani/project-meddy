import React from 'react';
import { TrendingUp, TrendingDown, BarChart3, Star } from 'lucide-react';
import type { HighlightCoin } from '../types';
import { formatCurrency, formatNumber, formatPercentage } from '../utils/formatters';
import { HighlightCardSkeleton } from './LoadingSkeleton';
import { ErrorMessage } from './ErrorMessage';

interface HighlightSectionProps {
  topGainers: HighlightCoin[];
  topLosers: HighlightCoin[];
  highestVolume: HighlightCoin[];
  trendingCoins: HighlightCoin[];
  top7dPerformers: HighlightCoin[];
  loading: boolean;
  error: string | null;
  onRetry: () => void;
  onCoinClick: (coinId: string) => void;
}

interface HighlightCardProps {
  title: string;
  icon: React.ReactNode;
  coins: HighlightCoin[];
  loading: boolean;
  onCoinClick: (coinId: string) => void;
  showPercentage?: boolean;
  showVolume?: boolean;
}

const HighlightCard: React.FC<HighlightCardProps> = ({
  title,
  icon,
  coins,
  loading,
  onCoinClick,
  showPercentage = false,
  showVolume = false,
}) => {
  const handleCoinClick = (coinId: string) => {
    onCoinClick(coinId);
  };

  const handleKeyPress = (event: React.KeyboardEvent, coinId: string) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onCoinClick(coinId);
    }
  };

  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-lg shadow-sm border border-white/10 p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
          {icon}
        </div>
        <h3 className="text-lg font-semibold text-white">{title}</h3>
      </div>

      <div className="space-y-3">
        {loading ? (
          Array.from({ length: 5 }).map((_, index) => (
            <HighlightCardSkeleton key={`skeleton-${index}`} />
          ))
        ) : (
          coins.slice(0, 5).map((coin, index) => (
            <div
              key={coin.id}
              onClick={() => handleCoinClick(coin.id)}
              onKeyPress={(e) => handleKeyPress(e, coin.id)}
              tabIndex={0}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/10 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:ring-inset transition-colors"
              role="button"
              aria-label={`View details for ${coin.name}`}
            >
              <span className="text-sm font-medium text-white/60 w-4">
                {index + 1}
              </span>
              
              <img
                src={coin.image}
                alt={`${coin.name} logo`}
                className="w-6 h-6 rounded-full"
                loading="lazy"
              />
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-white truncate">
                    {coin.name}
                  </p>
                  <span className="text-xs text-white/60 uppercase">
                    {coin.symbol}
                  </span>
                </div>
                {coin.marketCapRank && (
                  <p className="text-xs text-white/60">
                    Rank #{coin.marketCapRank}
                  </p>
                )}
              </div>

              <div className="text-right">
                {coin.currentPrice > 0 && (
                  <p className="text-sm font-medium text-white">
                    {formatCurrency(coin.currentPrice)}
                  </p>
                )}
                
                {showPercentage && (
                  <p
                    className={`text-xs font-medium ${
                      (coin.priceChangePercentage7d !== undefined ? coin.priceChangePercentage7d : coin.priceChangePercentage24h) >= 0
                        ? 'text-green-400'
                        : 'text-red-400'
                    }`}
                  >
                    {formatPercentage(coin.priceChangePercentage7d !== undefined ? coin.priceChangePercentage7d : coin.priceChangePercentage24h)}
                  </p>
                )}
                
                {showVolume && coin.volume24h && (
                  <p className="text-xs text-white/60">
                    {formatNumber(coin.volume24h)}
                  </p>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export const HighlightSection: React.FC<HighlightSectionProps> = ({
  topGainers,
  topLosers,
  highestVolume,
  trendingCoins,
  top7dPerformers,
  loading,
  error,
  onRetry,
  onCoinClick,
}) => {
  if (error) {
    return (
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-6">Market Highlights</h2>
        <ErrorMessage message={error} onRetry={onRetry} />
      </div>
    );
  }

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Market Highlights</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        <HighlightCard
          title="Top Gainers"
          icon={<TrendingUp className="w-4 h-4 text-blue-400" />}
          coins={topGainers}
          loading={loading}
          onCoinClick={onCoinClick}
          showPercentage={true}
        />
        
        <HighlightCard
          title="Top Losers"
          icon={<TrendingDown className="w-4 h-4 text-blue-400" />}
          coins={topLosers}
          loading={loading}
          onCoinClick={onCoinClick}
          showPercentage={true}
        />
        
        <HighlightCard
          title="Highest Volume"
          icon={<BarChart3 className="w-4 h-4 text-blue-400" />}
          coins={highestVolume}
          loading={loading}
          onCoinClick={onCoinClick}
          showVolume={true}
        />
        
        <HighlightCard
          title="Trending"
          icon={<Star className="w-4 h-4 text-blue-400" />}
          coins={trendingCoins}
          loading={loading}
          onCoinClick={onCoinClick}
        />

        <HighlightCard
          title="7d Top Performers"
          icon={<TrendingUp className="w-4 h-4 text-blue-400" />}
          coins={top7dPerformers}
          loading={loading}
          onCoinClick={onCoinClick}
          showPercentage={true}
        />
      </div>
    </div>
  );
};