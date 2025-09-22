import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, Wallet, Bell, Menu } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCoinsData } from '../hooks/useCoinsData';
import { CoinTable } from '../components/CoinTable';
import { NavigationCard } from '../components/NavigationCard';

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

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
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top_left,_#071421,_#02060a)] text-white antialiased">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        <header className="flex items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <button
              aria-label="Toggle sidebar"
              onClick={() => setSidebarOpen((s) => !s)}
              className="p-2 rounded-lg backdrop-blur-sm bg-white/4 ring-1 ring-white/6 hover:scale-105 transition-transform"
            >
              <Menu className="w-5 h-5 text-white/90" />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#6EE7F9]/20 to-[#C084FC]/18 flex items-center justify-center ring-1 ring-white/6 overflow-hidden">
                <img
                  src="https://res.cloudinary.com/dlyctssmy/image/upload/v1758550805/crypto-portfolio-management-vector-58200597_dfropf.avif"
                  alt="Crypto Dashboard Logo"
                  className="w-8 h-8 object-contain"
                />
              </div>
              <div>
                <h1 className="text-2xl font-semibold tracking-tight">Crypto Dashboard</h1>
                <p className="text-sm text-white/60">Real-time cryptocurrency market data & analytics</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <input
                id="dashboard-search-header"
                type="text"
                placeholder="Search BTC, ETH..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-56 px-3 py-2 rounded-lg bg-white/4 placeholder-white/60 outline-none focus:ring-2 focus:ring-[#6EE7F9]/40"
                aria-label="Search cryptocurrencies"
              />
            </div>

            <button
              className="p-2 rounded-lg backdrop-blur-sm bg-white/4 hover:bg-white/6 transition relative"
              aria-label="Notifications"
              onClick={() => setShowNotifications((s) => !s)}
            >
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#7AF27A] shadow-[0_0_10px_rgba(122,242,122,0.45)]" />
            </button>

            <button className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gradient-to-r from-white/6 to-white/4 backdrop-blur-sm hover:scale-105 transition">
              <Wallet className="w-4 h-4" />
              <span className="text-sm font-medium">Connect Wallet</span>
            </button>
          </div>
        </header>

        {/* Top nav card */}
        <div className="mb-6">
          <NavigationCard
            title="Market Highlights"
            description="View top gainers, losers, trending coins and performance metrics"
            icon={<Star className="w-6 h-6 text-[#8B5CF6]" />}
            onClick={handleHighlightsClick}
            className="mb-6 bg-white/4 backdrop-blur-md border border-white/10 rounded-2xl"
          />
        </div>

        <main className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Sidebar (mobile collapsible) */}
          <AnimatePresence>
            {sidebarOpen && (
              <motion.aside
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ type: 'spring', stiffness: 300, damping: 28 }}
                className="lg:col-span-3 bg-white/4 rounded-2xl p-4 backdrop-blur border border-white/6"
              >
                <nav className="flex flex-col gap-2">
                  {['Overview', 'Markets', 'Portfolio', 'Transactions', 'Watchlist', 'Settings'].map((label) => (
                    <a
                      key={label}
                      className="block px-3 py-2 rounded-xl hover:bg-white/6 transition text-sm"
                      href="#"
                    >
                      {label}
                    </a>
                  ))}
                </nav>
              </motion.aside>
            )}
          </AnimatePresence>

          {/* Main content */}
          <section className="lg:col-span-9 space-y-6">
            {/* Stats row */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <motion.div whileHover={{ scale: 1.02 }} className="p-4 rounded-2xl bg-gradient-to-b from-white/4 to-white/6 border border-white/6 backdrop-blur-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-white/70">Market Cap</p>
                    <p className="mt-1 font-semibold text-lg">$2.1T</p>
                  </div>
                  <div className="text-sm text-white/60">📈</div>
                </div>
              </motion.div>

              <motion.div whileHover={{ scale: 1.02 }} className="p-4 rounded-2xl bg-gradient-to-b from-white/4 to-white/6 border border-white/6 backdrop-blur-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-white/70">24h Volume</p>
                    <p className="mt-1 font-semibold text-lg">$95.2B</p>
                  </div>
                  <div className="text-sm text-white/60">💰</div>
                </div>
              </motion.div>

              <motion.div whileHover={{ scale: 1.02 }} className="p-4 rounded-2xl bg-gradient-to-b from-white/4 to-white/6 border border-white/6 backdrop-blur-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-white/70">BTC Dominance</p>
                    <p className="mt-1 font-semibold text-lg text-[#7AF27A]">54.3%</p>
                  </div>
                  <div className="text-sm text-white/60">₿</div>
                </div>
              </motion.div>

              <motion.div whileHover={{ scale: 1.02 }} className="p-4 rounded-2xl bg-gradient-to-b from-white/4 to-white/6 border border-white/6 backdrop-blur-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-white/70">Active Coins</p>
                    <p className="mt-1 font-semibold text-lg">14,892</p>
                  </div>
                  <div className="text-sm text-white/60">🪙</div>
                </div>
              </motion.div>
            </div>

            {/* Control + Table Card */}
            <div className="rounded-2xl overflow-hidden bg-white/3 border border-white/6 backdrop-blur-sm shadow-sm">
              <div className="p-4 border-b border-white/6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h2 className="text-lg font-semibold tracking-tight">All Cryptocurrencies</h2>
                  <p className="text-sm text-white/60 mt-1">Complete market data with real-time prices</p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="relative">
                    <label htmlFor="dashboard-search" className="sr-only">Search cryptocurrencies</label>
                    <input
                      id="dashboard-search"
                      type="text"
                      placeholder="Search coins..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full sm:w-64 px-3 py-2 rounded-lg bg-white/5 placeholder-white/60 outline-none focus:ring-2 focus:ring-[#6EE7F9]/30"
                      aria-label="Search cryptocurrencies"
                    />
                  </div>

                  <label htmlFor="dashboard-sort" className="sr-only">Sort cryptocurrencies by</label>
                  <select
                    id="dashboard-sort"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                    className="px-3 py-2 rounded-lg bg-white/5 outline-none focus:ring-2 focus:ring-[#B388FF]/30 text-white"
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

              {/* error / table area */}
              {coinsError ? (
                <div className="p-6 text-center">
                  <div className="text-rose-400 mb-4">{coinsError}</div>
                  <button
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
            </div>

            {/* Bottom row: watchlist + transactions */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <motion.div className="lg:col-span-1 rounded-2xl p-4 bg-white/3 border border-white/6 backdrop-blur-sm">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold">Watchlist</h3>
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

              <motion.div className="lg:col-span-2 rounded-2xl p-4 bg-white/3 border border-white/6 backdrop-blur-sm">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold">Recent Activity</h3>
                  <div className="flex items-center gap-2">
                    <button className="text-xs px-2 py-1 rounded-md bg-white/5">Filter</button>
                    <button className="text-xs px-2 py-1 rounded-md bg-white/5">Export</button>
                  </div>
                </div>

                <div className="text-sm text-white/60">Track your portfolio performance and transaction history here.</div>
              </motion.div>
            </div>
          </section>
        </main>

        {/* Notifications panel */}
        <AnimatePresence>
          {showNotifications && (
            <motion.aside
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              transition={{ type: 'spring', stiffness: 300, damping: 28 }}
              className="fixed right-6 bottom-6 w-96 rounded-2xl p-4 bg-white/4 border border-white/6 backdrop-blur-sm shadow-lg"
            >
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold">Notifications</h4>
                <button onClick={() => setShowNotifications(false)} className="text-sm text-white/60">Close</button>
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
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};