import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star } from 'lucide-react';
import { useCoinsData } from '../hooks/useCoinsData';
import { CoinTable } from '../components/CoinTable';
import { NavigationCard } from '../components/NavigationCard';

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const {
    coins,
    loading: coinsLoading,
    error: coinsError,
    hasMore,
    searchTerm,
    sortBy,
    setSearchTerm,
    setSortBy,
    loadMore,
    retry: retryCoins,
  } = useCoinsData();

  const handleHighlightsClick = () => {
    navigate('/highlights');
  };

  const handleCoinClick = useCallback(() => {}, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Crypto Dashboard</h1>
          <p className="text-gray-600">Real-time cryptocurrency market data and analytics</p>
        </div>

        <div className="mb-8">
          <NavigationCard
            title="Market Highlights"
            description="View top gainers, losers, trending coins and performance metrics"
            icon={<Star className="w-6 h-6 text-blue-600" />}
            onClick={handleHighlightsClick}
            className="mb-6"
          />
        </div>


        <div className="bg-white rounded-lg shadow-sm border border-gray-100 mb-8">
          <div className="p-6 border-b border-gray-100">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">All Cryptocurrencies</h2>
                <p className="text-sm text-gray-600 mt-1">
                  Complete market data with real-time prices
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative">
                  <label htmlFor="dashboard-search" className="sr-only">
                    Search cryptocurrencies
                  </label>
                  <input
                    id="dashboard-search"
                    type="text"
                    placeholder="Search coins..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full sm:w-64 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    aria-label="Search cryptocurrencies"
                  />
                </div>

                <label htmlFor="dashboard-sort" className="sr-only">
                  Sort cryptocurrencies by
                </label>
                <select
                  id="dashboard-sort"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white"
                  aria-label="Sort cryptocurrencies by"
                >
                  <option value="market_cap_desc">Market Cap ↓</option>
                  <option value="market_cap_asc">Market Cap ↑</option>
                  <option value="price_desc">Price ↓</option>
                  <option value="price_asc">Price ↑</option>
                  <option value="percent_change_desc">24h Change ↓</option>
                  <option value="percent_change_asc">24h Change ↑</option>
                  <option value="volume_desc">Volume ↓</option>
                  <option value="volume_asc">Volume ↑</option>
                </select>
              </div>
            </div>
          </div>

          {coinsError ? (
            <div className="p-6 text-center">
              <div className="text-red-600 mb-4">{coinsError}</div>
              <button
                onClick={retryCoins}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Retry
              </button>
            </div>
          ) : (
            <div className="overflow-hidden">
              <CoinTable
                coins={coins}
                loading={coinsLoading}
                onCoinClick={handleCoinClick}
                onLoadMore={loadMore}
                hasMore={hasMore}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};