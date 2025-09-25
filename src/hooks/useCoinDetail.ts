import { useState, useCallback } from 'react';
import { coinGeckoApi } from '../services/coinGeckoApi';
import { CoinAdapter } from '../adapters/coinAdapter';
import type { CoinDetailData, ApiError } from '../types';

interface UseCoinDetailReturn {
  coinDetail: CoinDetailData | null;
  loading: boolean;
  error: string | null;
  fetchCoinDetail: (id: string) => Promise<void>;
  clearCoinDetail: () => void;
  retry: () => void;
}

export const useCoinDetail = (): UseCoinDetailReturn => {
  const [coinDetail, setCoinDetail] = useState<CoinDetailData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastFetchedId, setLastFetchedId] = useState<string>('');

  const fetchCoinDetail = useCallback(async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      setLastFetchedId(id);

     
      const startTime = Date.now();

      const data = await coinGeckoApi.getCoinDetail(id);
      const adaptedData = CoinAdapter.adaptCoinDetailToDetailData(data);

      
      const elapsed = Date.now() - startTime;
      const minLoadTime = 1000;
      if (elapsed < minLoadTime) {
        await new Promise(resolve => setTimeout(resolve, minLoadTime - elapsed));
      }

      setCoinDetail(adaptedData);
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError.message || 'Failed to fetch coin details');
      console.error('Error fetching coin detail:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const clearCoinDetail = useCallback(() => {
    setCoinDetail(null);
    setError(null);
    setLastFetchedId('');
  }, []);

  const retry = useCallback(() => {
    if (lastFetchedId) {
      fetchCoinDetail(lastFetchedId);
    }
  }, [lastFetchedId, fetchCoinDetail]);

  return {
    coinDetail,
    loading,
    error,
    fetchCoinDetail,
    clearCoinDetail,
    retry,
  };
};
