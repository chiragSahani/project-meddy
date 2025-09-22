import React, { useCallback, useMemo } from 'react';
import type { CoinListItem } from '../types';
import { formatCurrency, formatNumber, formatPercentage } from '../utils/formatters';
import { CoinRowSkeleton } from './LoadingSkeleton';

interface CoinTableProps {
  coins: CoinListItem[];
  loading: boolean;
  onCoinClick: (coin: CoinListItem) => void;
  onLoadMore: () => void;
  hasMore: boolean;
}

export const CoinTable: React.FC<CoinTableProps> = ({
  coins,
  loading,
  onCoinClick,
  onLoadMore,
  hasMore,
}) => {
  const handleRowClick = useCallback((coin: CoinListItem) => {
    onCoinClick(coin);
  }, [onCoinClick]);

  const handleKeyPress = useCallback((event: React.KeyboardEvent, coin: CoinListItem) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onCoinClick(coin);
    }
  }, [onCoinClick]);

  const skeletonRows = useMemo(() => {
    return Array.from({ length: 10 }, (_, index) => (
      <CoinRowSkeleton key={`skeleton-${index}`} />
    ));
  }, []);

  const coinRows = useMemo(() => {
    return coins.map((coin) => (
      <tr
        key={coin.id}
        onClick={() => handleRowClick(coin)}
        onKeyPress={(e) => handleKeyPress(e, coin)}
        tabIndex={0}
        className="hover:bg-white/10 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:ring-inset transition-colors"
        role="button"
        aria-label={`View details for ${coin.name}`}
      >
        <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
          #{coin.marketCapRank}
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="flex items-center gap-3">
            <img
              src={coin.image}
              alt={`${coin.name} logo`}
              className="w-8 h-8 rounded-full"
              loading="lazy"
            />
            <div>
              <div className="text-sm font-medium text-white">{coin.name}</div>
              <div className="text-sm text-white/60 uppercase">{coin.symbol}</div>
            </div>
          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-white">
          {formatCurrency(coin.currentPrice)}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
          <div className="flex flex-col items-end">
            <span
              className={`font-medium ${
                coin.priceChangePercentage24h >= 0 ? 'text-[#7AF27A]' : 'text-red-400'
              }`}
            >
              {formatPercentage(coin.priceChangePercentage24h)}
            </span>
            <span
              className={`text-xs ${
                coin.priceChange24h >= 0 ? 'text-[#7AF27A]' : 'text-red-400'
              }`}
            >
              {formatCurrency(coin.priceChange24h, true)}
            </span>
          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-white">
          {formatNumber(coin.marketCap)}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-white">
          {formatNumber(coin.volume24h)}
        </td>
      </tr>
    ));
  }, [coins, handleRowClick, handleKeyPress]);

  return (
    <div className="bg-white/3 backdrop-blur-sm rounded-lg shadow-sm border border-white/6 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-white/5">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-medium text-white/60 uppercase tracking-wider">
                Rank
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-white/60 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                24h Change
              </th>
              <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Market Cap
              </th>
              <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Volume (24h)
              </th>
            </tr>
          </thead>
          <tbody className="bg-transparent divide-y divide-white/6">
            {loading && coins.length === 0 ? skeletonRows : coinRows}
            {loading && coins.length > 0 && skeletonRows}
          </tbody>
        </table>
      </div>

      {!loading && hasMore && (
        <div className="p-4 text-center border-t border-white/6">
          <button
            onClick={onLoadMore}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:ring-offset-0 transition-colors"
          >
            Load More
          </button>
        </div>
      )}

      {!loading && !hasMore && coins.length > 0 && (
        <div className="p-4 text-center text-sm text-white/60 border-t border-white/6">
          No more coins to load
        </div>
      )}

      {!loading && coins.length === 0 && (
        <div className="p-8 text-center text-white/60">
          <p className="text-lg font-medium mb-2 text-white">No coins found</p>
          <p className="text-sm">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
};