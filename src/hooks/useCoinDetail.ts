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

      const data = await coinGeckoApi.getCoinDetail(id);
      const adaptedData = CoinAdapter.adaptCoinDetailToDetailData(data);
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