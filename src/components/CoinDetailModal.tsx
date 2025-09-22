import React from 'react';
import { X, TrendingUp, TrendingDown, BarChart3, DollarSign } from 'lucide-react';
import type { CoinDetailData } from '../types';
import { formatCurrency, formatNumber, formatPercentage } from '../utils/formatters';
import { LoadingSkeleton } from './LoadingSkeleton';
import { ErrorMessage } from './ErrorMessage';

interface CoinDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  coinDetail: CoinDetailData | null;
  loading: boolean;
  error: string | null;
  onRetry: () => void;
}

export const CoinDetailModal: React.FC<CoinDetailModalProps> = ({
  isOpen,
  onClose,
  coinDetail,
  loading,
  error,
  onRetry,
}) => {
  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50"
      onClick={handleBackdropClick}
      onKeyDown={handleKeyDown}
      tabIndex={-1}
    >
      <div className="bg-[#071421]/95 backdrop-blur-md border border-white/10 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-[#071421]/95 backdrop-blur-md border-b border-white/10 p-6 flex items-center justify-between">
          {loading ? (
            <div className="flex items-center gap-3">
              <LoadingSkeleton className="w-10 h-10 rounded-full" />
              <div className="space-y-1">
                <LoadingSkeleton className="w-32 h-6" />
                <LoadingSkeleton className="w-16 h-4" />
              </div>
            </div>
          ) : coinDetail ? (
            <div className="flex items-center gap-3">
              <img
                src={coinDetail.image}
                alt={`${coinDetail.name} logo`}
                className="w-10 h-10 rounded-full"
              />
              <div>
                <h2 className="text-xl font-bold text-white">{coinDetail.name}</h2>
                <p className="text-sm text-white/60 uppercase">{coinDetail.symbol}</p>
              </div>
            </div>
          ) : (
            <h2 className="text-xl font-bold text-white">Coin Details</h2>
          )}
          
          <button
            onClick={onClose}
            className="p-2 text-white/60 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {error && (
            <ErrorMessage message={error} onRetry={onRetry} className="mb-6" />
          )}

          {loading ? (
            <div className="space-y-6">
              {/* Price Section Skeleton */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white/5 p-4 rounded-lg">
                  <LoadingSkeleton className="w-16 h-4 mb-2" />
                  <LoadingSkeleton className="w-24 h-8" />
                </div>
                <div className="bg-white/5 p-4 rounded-lg">
                  <LoadingSkeleton className="w-20 h-4 mb-2" />
                  <LoadingSkeleton className="w-16 h-6" />
                </div>
              </div>
              
              {/* Stats Skeleton */}
              <div className="grid grid-cols-2 gap-4">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="border border-white/10 p-4 rounded-lg bg-white/5">
                    <LoadingSkeleton className="w-16 h-4 mb-2" />
                    <LoadingSkeleton className="w-20 h-6" />
                  </div>
                ))}
              </div>
            </div>
          ) : coinDetail ? (
            <div className="space-y-6">
              {/* Current Price & 24h Change */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/20">
                  <div className="flex items-center gap-2 mb-2">
                    <DollarSign className="w-4 h-4 text-blue-400" />
                    <span className="text-sm font-medium text-blue-300">Current Price</span>
                  </div>
                  <p className="text-2xl font-bold text-white">
                    {formatCurrency(coinDetail.currentPrice)}
                  </p>
                </div>
                
                <div
                  className={`p-4 rounded-lg border ${
                    coinDetail.priceChangePercentage24h >= 0
                      ? 'bg-green-500/10 border-green-500/20'
                      : 'bg-red-500/10 border-red-500/20'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    {coinDetail.priceChangePercentage24h >= 0 ? (
                      <TrendingUp className="w-4 h-4 text-green-400" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-red-400" />
                    )}
                    <span
                      className={`text-sm font-medium ${
                        coinDetail.priceChangePercentage24h >= 0
                          ? 'text-green-300'
                          : 'text-red-300'
                      }`}
                    >
                      24h Change
                    </span>
                  </div>
                  <p
                    className={`text-2xl font-bold ${
                      coinDetail.priceChangePercentage24h >= 0
                        ? 'text-green-400'
                        : 'text-red-400'
                    }`}
                  >
                    {formatPercentage(coinDetail.priceChangePercentage24h)}
                  </p>
                  <p
                    className={`text-sm ${
                      coinDetail.priceChangePercentage24h >= 0
                        ? 'text-green-400'
                        : 'text-red-400'
                    }`}
                  >
                    {formatCurrency(coinDetail.priceChange24h, true)}
                  </p>
                </div>
              </div>

              {/* Market Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div className="border border-white/10 p-4 rounded-lg bg-white/5">
                  <div className="flex items-center gap-2 mb-2">
                    <BarChart3 className="w-4 h-4 text-white/60" />
                    <span className="text-sm font-medium text-white/60">Market Rank</span>
                  </div>
                  <p className="text-lg font-semibold text-white">
                    #{coinDetail.marketCapRank}
                  </p>
                </div>

                <div className="border border-white/10 p-4 rounded-lg bg-white/5">
                  <div className="flex items-center gap-2 mb-2">
                    <DollarSign className="w-4 h-4 text-white/60" />
                    <span className="text-sm font-medium text-white/60">Market Cap</span>
                  </div>
                  <p className="text-lg font-semibold text-white">
                    {formatNumber(coinDetail.marketCap)}
                  </p>
                </div>

                <div className="border border-white/10 p-4 rounded-lg bg-white/5 col-span-2 sm:col-span-1">
                  <div className="flex items-center gap-2 mb-2">
                    <BarChart3 className="w-4 h-4 text-white/60" />
                    <span className="text-sm font-medium text-white/60">24h Volume</span>
                  </div>
                  <p className="text-lg font-semibold text-white">
                    {formatNumber(coinDetail.volume24h)}
                  </p>
                </div>

                <div className="border border-white/10 p-4 rounded-lg bg-white/5">
                  <span className="text-sm font-medium text-white/60 block mb-2">24h High</span>
                  <p className="text-lg font-semibold text-white">
                    {formatCurrency(coinDetail.high24h)}
                  </p>
                </div>

                <div className="border border-white/10 p-4 rounded-lg bg-white/5">
                  <span className="text-sm font-medium text-white/60 block mb-2">24h Low</span>
                  <p className="text-lg font-semibold text-white">
                    {formatCurrency(coinDetail.low24h)}
                  </p>
                </div>

                <div className="border border-white/10 p-4 rounded-lg bg-white/5">
                  <span className="text-sm font-medium text-white/60 block mb-2">7d Change</span>
                  <p
                    className={`text-lg font-semibold ${
                      coinDetail.priceChangePercentage7d >= 0
                        ? 'text-green-400'
                        : 'text-red-400'
                    }`}
                  >
                    {formatPercentage(coinDetail.priceChangePercentage7d)}
                  </p>
                </div>

                <div className="border border-white/10 p-4 rounded-lg bg-white/5 col-span-2 sm:col-span-1">
                  <span className="text-sm font-medium text-white/60 block mb-2">30d Change</span>
                  <p
                    className={`text-lg font-semibold ${
                      coinDetail.priceChangePercentage30d >= 0
                        ? 'text-green-400'
                        : 'text-red-400'
                    }`}
                  >
                    {formatPercentage(coinDetail.priceChangePercentage30d)}
                  </p>
                </div>
              </div>

              {/* Description */}
              {coinDetail.description && (
                <div className="border border-white/10 p-4 rounded-lg bg-white/5">
                  <h3 className="text-lg font-semibold text-white mb-3">About {coinDetail.name}</h3>
                  <div
                    className="text-sm text-white/80 leading-relaxed"
                    dangerouslySetInnerHTML={{
                      __html: coinDetail.description.slice(0, 500) + (coinDetail.description.length > 500 ? '...' : '')
                    }}
                  />
                </div>
              )}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};