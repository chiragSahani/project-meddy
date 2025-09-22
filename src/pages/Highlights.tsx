import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, TrendingUp, TrendingDown, BarChart3, Star } from 'lucide-react';
import { useHighlights } from '../hooks/useHighlights';
import { useCoinDetail } from '../hooks/useCoinDetail';
import { HighlightCard } from '../components/HighlightCard';
import { CoinDetailModal } from '../components/CoinDetailModal';
import { ErrorMessage } from '../components/ErrorMessage';

export const Highlights: React.FC = () => {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);

  const {
    topGainers,
    topLosers,
    highestVolume,
    trendingCoins,
    top7dPerformers,
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

  const handleCoinClick = useCallback(async (coinId: string) => {
    setModalOpen(true);
    await fetchCoinDetail(coinId);
  }, [fetchCoinDetail]);

  const handleModalClose = useCallback(() => {
    setModalOpen(false);
    clearCoinDetail();
  }, [clearCoinDetail]);

  if (highlightsError) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <button
              onClick={handleBackToDashboard}
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-4"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </button>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Market Highlights</h1>
          </div>
          <ErrorMessage message={highlightsError} onRetry={retryHighlights} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <button
            onClick={handleBackToDashboard}
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </button>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Market Highlights</h1>
          <p className="text-gray-600">
            Discover top performing cryptocurrencies and market trends
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2 2xl:grid-cols-3 gap-6">
          <HighlightCard
            title="Top Gainers (24h)"
            icon={<TrendingUp className="w-4 h-4 text-blue-600" />}
            coins={topGainers}
            loading={highlightsLoading}
            onCoinClick={handleCoinClick}
            showPercentage={true}
          />

          <HighlightCard
            title="Top Losers (24h)"
            icon={<TrendingDown className="w-4 h-4 text-blue-600" />}
            coins={topLosers}
            loading={highlightsLoading}
            onCoinClick={handleCoinClick}
            showPercentage={true}
          />

          <HighlightCard
            title="Highest Volume"
            icon={<BarChart3 className="w-4 h-4 text-blue-600" />}
            coins={highestVolume}
            loading={highlightsLoading}
            onCoinClick={handleCoinClick}
            showVolume={true}
          />

          <HighlightCard
            title="Trending Coins"
            icon={<Star className="w-4 h-4 text-blue-600" />}
            coins={trendingCoins}
            loading={highlightsLoading}
            onCoinClick={handleCoinClick}
          />

          <HighlightCard
            title="7d Top Performers"
            icon={<TrendingUp className="w-4 h-4 text-blue-600" />}
            coins={top7dPerformers}
            loading={highlightsLoading}
            onCoinClick={handleCoinClick}
            show7dPercentage={true}
          />
        </div>
      </div>

      <CoinDetailModal
        isOpen={modalOpen}
        onClose={handleModalClose}
        coinDetail={coinDetail}
        loading={coinDetailLoading}
        error={coinDetailError}
        onRetry={retryCoinDetail}
      />
    </div>
  );
};