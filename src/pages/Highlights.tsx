import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, TrendingUp, TrendingDown, BarChart3, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { useHighlights } from '../hooks/useHighlights';
import { useCoinDetail } from '../hooks/useCoinDetail';
import { HighlightCard } from '../components/HighlightCard';
import { CoinDetailModal } from '../components/CoinDetailModal';
import { ErrorMessage } from '../components/ErrorMessage';
import { FullPageLoader } from '../components/LoadingSkeleton';

export const Highlights: React.FC = () => {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);

  const {
    topGainers,
    topLosers,
    highestVolume,
    trendingCoins,
    loading: highlightsLoading,
    error: highlightsError,
    retry: retryHighlights,
  } = useHighlights();

  const {
    coinDetail,
    loading: coinDetailLoading,
    error: coinDetailError,
    fetchCoinDetail,
    clearCoinDetail,
    retry: retryCoinDetail,
  } = useCoinDetail();

  const handleBackToDashboard = () => {
    navigate('/');
  };

  const handleCoinClick = useCallback(
    async (coinId: string) => {
      setModalOpen(true);
      await fetchCoinDetail(coinId);
    },
    [fetchCoinDetail]
  );

  const handleModalClose = useCallback(() => {
    setModalOpen(false);
    clearCoinDetail();
  }, [clearCoinDetail]);

  // Show full page loader on initial load
  if (highlightsLoading && topGainers.length === 0 && topLosers.length === 0 && highestVolume.length === 0 && trendingCoins.length === 0) {
    return <FullPageLoader message="Loading market highlights..." variant="blockchain" />;
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top_left,_#071421,_#02060a)] text-white font-inter">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-8">
          <button
            onClick={handleBackToDashboard}
            className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </button>

          <h1 className="text-3xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-300 via-purple-300 to-green-300">
            Market Highlights
          </h1>
          <p className="text-white/60 mt-2">Discover top performing cryptocurrencies and market trends</p>
        </div>

        {highlightsError ? (
          <div className="mb-6">
            <ErrorMessage message={highlightsError} onRetry={retryHighlights} />
          </div>
        ) : (
          <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2 2xl:grid-cols-3 gap-6">
            <HighlightCard
              title="Top Gainers (24h)"
              icon={<TrendingUp className="w-4 h-4 text-[#6EE7F9]" />}
              coins={topGainers}
              loading={highlightsLoading}
              onCoinClick={handleCoinClick}
              showPercentage
              className="bg-white/4 backdrop-blur-md border border-white/10 rounded-2xl p-4"
            />

            <HighlightCard
              title="Top Losers (24h)"
              icon={<TrendingDown className="w-4 h-4 text-[#B388FF]" />}
              coins={topLosers}
              loading={highlightsLoading}
              onCoinClick={handleCoinClick}
              showPercentage
              className="bg-white/4 backdrop-blur-md border border-white/10 rounded-2xl p-4"
            />

            <HighlightCard
              title="Highest Volume"
              icon={<BarChart3 className="w-4 h-4 text-[#7AF27A]" />}
              coins={highestVolume}
              loading={highlightsLoading}
              onCoinClick={handleCoinClick}
              showVolume
              className="bg-white/4 backdrop-blur-md border border-white/10 rounded-2xl p-4"
            />

            <HighlightCard
              title="Trending Coins"
              icon={<Star className="w-4 h-4 text-[#C084FC]" />}
              coins={trendingCoins}
              loading={highlightsLoading}
              onCoinClick={handleCoinClick}
              className="bg-white/4 backdrop-blur-md border border-white/10 rounded-2xl p-4"
            />

         
          </motion.div>
        )}

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
