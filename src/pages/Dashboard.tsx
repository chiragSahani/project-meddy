import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, Bell } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import { useCoinsData } from '../hooks/useCoinsData';
import { useCoinDetail } from '../hooks/useCoinDetail';
import { CoinTable } from '../components/CoinTable';
import { CoinDetailModal } from '../components/CoinDetailModal';
import { NavigationCard } from '../components/NavigationCard';
import { TechnicalLoader, FullPageLoader } from '../components/LoadingSkeleton';
import type { CoinListItem } from '../types';

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

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

  const {
    coinDetail,
    loading: coinDetailLoading,
    error: coinDetailError,
    fetchCoinDetail,
    clearCoinDetail,
    retry: retryCoinDetail,
  } = useCoinDetail();

  const handleHighlightsClick = () => {
    navigate('/highlights');
  };

  const handleCoinClick = useCallback(
    async (coin: CoinListItem) => {
      setModalOpen(true);
      await fetchCoinDetail(coin.id);
    },
    [fetchCoinDetail]
  );

  const handleModalClose = useCallback(() => {
    setModalOpen(false);
    clearCoinDetail();
  }, [clearCoinDetail]);

  // Show full page loader on initial load
  if (coinsLoading && coins.length === 0) {
    return <FullPageLoader message="Loading crypto market data..." variant="crypto" />;
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top_left,_#071421,_#02060a)] text-white antialiased">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 sm:mb-8">
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#6EE7F9]/15 to-[#C084FC]/18 flex items-center justify-center ring-1 ring-white/6 overflow-hidden">
                <img
                  src="https://res.cloudinary.com/dlyctssmy/image/upload/v1758547411/increase_prghdc.png"
                  alt="Crypto Dashboard Logo"
                  className="w-7 h-7 object-contain"
                />
              </div>
              <div className="min-w-0">
                <h1 className="text-lg sm:text-xl lg:text-2xl font-semibold leading-tight truncate">
                  Crypto Dashboard
                </h1>
                <p className="text-xs sm:text-sm text-white/60 mt-0.5 hidden sm:block">
                  Real-time cryptocurrency market data &amp; analytics
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label="Notifications"
              onClick={() => setShowNotifications((s) => !s)}
              className="relative p-2 rounded-lg backdrop-blur-sm bg-white/4 hover:bg-white/6 transition"
            >
              <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#7AF27A] shadow-[0_0_8px_rgba(122,242,122,0.45)]" />
            </button>
          </div>
        </header>

        <div className="mb-4 sm:mb-6">
          <NavigationCard
            title="Market Highlights"
            description="View top gainers, losers, trending coins and performance metrics"
            icon={<Star className="w-5 h-5 text-[#8B5CF6]" />}
            onClick={handleHighlightsClick}
            className="bg-white/4 backdrop-blur-md border border-white/10 rounded-2xl p-3"
          />
        </div>

        <main className="space-y-4 sm:space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            <motion.div whileHover={{ scale: 1.02 }} className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-gradient-to-b from-white/4 to-white/6 border border-white/6 backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-white/70">Market Cap</p>
                  {coinsLoading ? (
                    <TechnicalLoader variant="dots" size="sm" className="mt-1" />
                  ) : (
                    <p className="mt-1 font-semibold text-sm sm:text-lg">$2.1T</p>
                  )}
                </div>
                <div className="text-xs sm:text-sm text-white/60" aria-hidden>📈</div>
              </div>
            </motion.div>

            <motion.div whileHover={{ scale: 1.02 }} className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-gradient-to-b from-white/4 to-white/6 border border-white/6 backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-white/70">24h Volume</p>
                  <p className="mt-1 font-semibold text-sm sm:text-lg">$95.2B</p>
                </div>
                <div className="text-xs sm:text-sm text-white/60" aria-hidden>💰</div>
              </div>
            </motion.div>

            <motion.div whileHover={{ scale: 1.02 }} className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-gradient-to-b from-white/4 to-white/6 border border-white/6 backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-white/70">BTC Dominance</p>
                  <p className="mt-1 font-semibold text-lg text-[#7AF27A]">54.3%</p>
                </div>
                <div className="text-xs sm:text-sm text-white/60" aria-hidden>₿</div>
              </div>
            </motion.div>

            <motion.div whileHover={{ scale: 1.02 }} className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-gradient-to-b from-white/4 to-white/6 border border-white/6 backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-white/70">Active Coins</p>
                  <p className="mt-1 font-semibold text-sm sm:text-lg">14,892</p>
                </div>
                <div className="text-xs sm:text-sm text-white/60" aria-hidden>🪙</div>
              </div>
            </motion.div>
          </div>

          <section className="rounded-xl sm:rounded-2xl overflow-hidden bg-white/3 border border-white/6 backdrop-blur-sm shadow-sm">
            <div className="p-3 sm:p-4 border-b border-white/6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <h2 className="text-base sm:text-lg font-semibold tracking-tight">All Cryptocurrencies</h2>
                <p className="text-xs sm:text-sm text-white/60 mt-1">Complete market data with real-time prices</p>
              </div>
              <div className="flex items-stretch sm:items-center gap-2 sm:gap-3 w-full sm:w-auto">
                <div className="flex-1 sm:flex-none">
                  <label htmlFor="dashboard-search" className="sr-only">Search cryptocurrencies</label>
                  <input
                    id="dashboard-search"
                    type="text"
                    placeholder="Search coins..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full sm:w-48 md:w-64 px-3 py-2 text-sm rounded-lg bg-white/5 placeholder-white/60 outline-none focus:ring-2 focus:ring-[#6EE7F9]/30"
                    aria-label="Search cryptocurrencies"
                  />
                </div>
                <div>
                  <label htmlFor="dashboard-sort" className="sr-only">Sort cryptocurrencies by</label>
                  <select
                    id="dashboard-sort"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                    className="w-full sm:w-auto px-3 py-2 text-sm rounded-lg bg-[#071421]/90 border border-white/20 text-white outline-none focus:ring-2 focus:ring-[#6EE7F9]/50 transition-all"
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
                <div className="text-rose-400 mb-4 font-medium">{coinsError}</div>
                <button
                  type="button"
                  onClick={retryCoins}
                  className="px-4 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition-colors"
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
          </section>

          <div className="grid grid-cols-1 gap-3 sm:gap-4">
            <motion.div className="rounded-xl sm:rounded-2xl p-3 sm:p-4 bg-white/3 border border-white/6 backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <h3 className="text-xs sm:text-sm font-semibold">Watchlist</h3>
                <span className="text-xs text-white/60">3 items</span>
              </div>
              <div className="mt-3 space-y-2">
                <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-white/4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center font-semibold text-orange-400">₿</div>
                    <div>
                      <div className="text-sm font-medium">Bitcoin</div>
                      <div className="text-xs text-white/60">BTC</div>
                    </div>
                  </div>
                  <div className="text-sm font-medium text-green-400">+2.3%</div>
                </div>
              </div>
            </motion.div>
          </div>
        </main>

        <AnimatePresence>
          {showNotifications && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.18 }}
                className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
                onClick={() => setShowNotifications(false)}
                aria-hidden
              />
              <motion.aside
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 12 }}
                transition={{ type: 'spring', stiffness: 300, damping: 28 }}
                className="fixed right-4 bottom-4 w-[calc(100vw-2rem)] max-w-sm sm:max-w-md lg:max-w-lg rounded-xl sm:rounded-2xl p-3 sm:p-4 bg-white/4 border border-white/6 backdrop-blur-sm shadow-lg z-50"
                role="dialog"
                aria-label="Notifications"
              >
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold">Notifications</h4>
                  <button
                    type="button"
                    onClick={() => setShowNotifications(false)}
                    className="text-sm text-white/60"
                  >
                    Close
                  </button>
                </div>
                <div className="space-y-2">
                  <div className="p-3 rounded-lg bg-white/3">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#7AF27A]/20 flex items-center justify-center">✓</div>
                      <div>
                        <div className="text-sm font-medium">Price Alert Triggered</div>
                        <div className="text-xs text-white/60">Bitcoin crossed $67,000</div>
                      </div>
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-white/3">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#B388FF]/20 flex items-center justify-center">📈</div>
                      <div>
                        <div className="text-sm font-medium">Market Update</div>
                        <div className="text-xs text-white/60">Crypto market up 3.2% today</div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.aside>
            </>
          )}
        </AnimatePresence>

        <CoinDetailModal
          isOpen={modalOpen}
          onClose={handleModalClose}
          coinDetail={coinDetail}
          loading={coinDetailLoading}
          error={coinDetailError}
          onRetry={retryCoinDetail}
        />
      </div>
    </div>
  );
};
