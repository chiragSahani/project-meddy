import { useState, useEffect, useCallback } from 'react';
import { coinGeckoApi } from '../services/coinGeckoApi';
import { CoinAdapter } from '../adapters/coinAdapter';
import type { HighlightCoin, ApiError } from '../types';

interface UseHighlightsReturn {
  topGainers: HighlightCoin[];
  topLosers: HighlightCoin[];
  highestVolume: HighlightCoin[];
  trendingCoins: HighlightCoin[];
  top7dPerformers: HighlightCoin[];
  loading: boolean;
  error: string | null;
  retry: () => void;
}

export const useHighlights = (): UseHighlightsReturn => {
  const [topGainers, setTopGainers] = useState<HighlightCoin[]>([]);
  const [topLosers, setTopLosers] = useState<HighlightCoin[]>([]);
  const [highestVolume, setHighestVolume] = useState<HighlightCoin[]>([]);
  const [trendingCoins, setTrendingCoins] = useState<HighlightCoin[]>([]);
  const [top7dPerformers, setTop7dPerformers] = useState<HighlightCoin[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchHighlights = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const [gainersData, losersData, volumeData, trendingData, performance7dData] = await Promise.all([
        coinGeckoApi.getCoinsMarket('usd', 'percent_change_desc', 10, 1, false, '24h'),
        coinGeckoApi.getCoinsMarket('usd', 'percent_change_asc', 10, 1, false, '24h'),
        coinGeckoApi.getCoinsMarket('usd', 'volume_desc', 10, 1, false, '24h'),
        coinGeckoApi.getTrending(),
        coinGeckoApi.getCoinsMarket('usd', 'market_cap_desc', 100, 1, false, '7d'),
      ]);

      setTopGainers(gainersData.map(CoinAdapter.adaptMarketDataToHighlight));
      setTopLosers(losersData.map(CoinAdapter.adaptMarketDataToHighlight));
      setHighestVolume(volumeData.map(CoinAdapter.adaptMarketDataToHighlight));
      setTrendingCoins(
        trendingData.coins.slice(0, 10).map(item =>
          CoinAdapter.adaptTrendingCoinToHighlight(item.item)
        )
      );

      const sorted7dData = performance7dData
        .filter(coin => {
          const has7dData = coin.price_change_percentage_7d !== null &&
                           coin.price_change_percentage_7d !== undefined &&
                           !isNaN(coin.price_change_percentage_7d);
          return has7dData;
        })
        .sort((a, b) => (b.price_change_percentage_7d || 0) - (a.price_change_percentage_7d || 0))
        .slice(0, 10);

      setTop7dPerformers(sorted7dData.map(CoinAdapter.adaptMarketDataToHighlight7d));
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError.message || 'Failed to fetch highlights data');
      console.error('Error fetching highlights:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const retry = useCallback(() => {
    fetchHighlights();
  }, []);

  useEffect(() => {
    fetchHighlights();
  }, []);

  return {
    topGainers,
    topLosers,
    highestVolume,
    trendingCoins,
    top7dPerformers,
    loading,
    error,
    retry,
  };
};