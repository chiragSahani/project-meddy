import React from 'react';
import type { HighlightCoin } from '../types';
import { formatCurrency, formatNumber, formatPercentage } from '../utils/formatters';
import { TechnicalLoader } from './LoadingSkeleton';

interface HighlightCardProps {
  title: string;
  icon: React.ReactNode;
  coins: HighlightCoin[];
  loading: boolean;
  onCoinClick: (coinId: string) => void;
  showPercentage?: boolean;
  showVolume?: boolean;
  show7dPercentage?: boolean;
  className?: string;
}

export const HighlightCard: React.FC<HighlightCardProps> = ({
  title,
  icon,
  coins,
  loading,
  onCoinClick,
  showPercentage = false,
  showVolume = false,
  show7dPercentage = false,
  className = '',
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

  if (loading) {
    return (
      <div className={`bg-white/4 backdrop-blur-md border border-white/10 rounded-2xl ${className}`}>
        <div className="p-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
              {icon}
            </div>
            <h3 className="text-lg font-semibold text-white/60">{title}</h3>
          </div>
        </div>
        <div className="p-8 flex items-center justify-center">
          <TechnicalLoader
            variant="bars"
            size="md"
            text="Loading data..."
          />
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white/4 backdrop-blur-md border border-white/10 rounded-2xl h-full flex flex-col ${className}`}>
      <div className="p-4 border-b border-white/10 flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
            {icon}
          </div>
          <h3 className="text-lg font-semibold text-white truncate">{title}</h3>
        </div>
      </div>

      <div className="p-4 flex-1 overflow-y-auto">
        <div className="space-y-3">
          {coins.slice(0, 5).map((coin, index) => (
            <div
              key={coin.id}
              onClick={() => handleCoinClick(coin.id)}
              onKeyPress={(e) => handleKeyPress(e, coin.id)}
              tabIndex={0}
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/10 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:ring-inset transition-colors group"
              role="button"
              aria-label={`View details for ${coin.name}`}
            >
              <span className="text-sm font-medium text-white/60 w-4 flex-shrink-0">
                {index + 1}
              </span>

              <img
                src={coin.image}
                alt={`${coin.name} logo`}
                className="w-6 h-6 rounded-full flex-shrink-0"
                loading="lazy"
              />

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-white truncate">
                    {coin.name}
                  </p>
                  <span className="text-xs text-white/60 uppercase flex-shrink-0">
                    {coin.symbol}
                  </span>
                </div>
                {coin.marketCapRank && (
                  <p className="text-xs text-white/50">
                    Rank #{coin.marketCapRank}
                  </p>
                )}
              </div>

              <div className="text-right flex-shrink-0">
                {coin.currentPrice > 0 && (
                  <p className="text-sm font-medium text-white">
                    {formatCurrency(coin.currentPrice)}
                  </p>
                )}

                {show7dPercentage && coin.priceChangePercentage7d !== undefined && (
                  <div className="text-right">
                    <p
                      className={`text-xs font-medium ${
                        coin.priceChangePercentage7d >= 0 ? 'text-[#7AF27A]' : 'text-red-400'
                      }`}
                    >
                      {formatPercentage(coin.priceChangePercentage7d)}
                    </p>
                    <p className="text-xs text-white/50">7d change</p>
                  </div>
                )}

                {showPercentage && !show7dPercentage && (
                  <p
                    className={`text-xs font-medium ${
                      coin.priceChangePercentage24h >= 0 ? 'text-[#7AF27A]' : 'text-red-400'
                    }`}
                  >
                    {formatPercentage(coin.priceChangePercentage24h)}
                  </p>
                )}

                {showVolume && coin.volume24h && (
                  <p className="text-xs text-white/60">
                    {formatNumber(coin.volume24h)}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};