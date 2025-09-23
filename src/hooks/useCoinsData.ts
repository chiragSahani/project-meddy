import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { coinGeckoApi } from '../services/coinGeckoApi';
import { CoinAdapter } from '../adapters/coinAdapter';
import type { CoinListItem, SortBy, ApiError } from '../types';

interface UseCoinsDataReturn {
  coins: CoinListItem[];
  loading: boolean;
  error: string | null;
  hasMore: boolean;
  searchTerm: string;
  sortBy: SortBy;
  setSearchTerm: (term: string) => void;
  setSortBy: (sort: SortBy) => void;
  loadMore: () => void;
  retry: () => void;
}

export const useCoinsData = (): UseCoinsDataReturn => {
  const [coins, setCoins] = useState<CoinListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<SortBy>('market_cap_desc');
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const initialFetchDone = useRef(false);

  const sortByRef = useRef(sortBy);
  sortByRef.current = sortBy;

  const fetchCoins = useCallback(async (pageNumber: number, reset: boolean = false) => {
    try {
      setLoading(true);
      setError(null);

      const data = await coinGeckoApi.getCoinsMarket(
        'usd',
        sortByRef.current,
        50,
        pageNumber,
        false,
        '24h,7d'
      );

      const adaptedCoins = data.map(CoinAdapter.adaptMarketDataToListItem);

      if (reset) {
        setCoins(adaptedCoins);
      } else {
        setCoins(prev => [...prev, ...adaptedCoins]);
      }

      setHasMore(adaptedCoins.length === 50);
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError.message || 'Failed to fetch coins data');
      console.error('Error fetching coins:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const loadMore = useCallback(() => {
    if (!loading && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchCoins(nextPage, false);
    }
  }, [loading, hasMore, page]);

  const retry = useCallback(() => {
    setError(null);
    setPage(1);
    fetchCoins(1, true);
  }, []);

  const filteredCoins = useMemo(() => {
    if (!searchTerm) return coins;
    const term = searchTerm.toLowerCase();
    return coins.filter(coin => (
      coin.name.toLowerCase().includes(term) ||
      coin.symbol.toLowerCase().includes(term)
    ));
  }, [coins, searchTerm]);

  const debouncedSetSearchTerm = useCallback((term: string) => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    searchTimeoutRef.current = setTimeout(() => {
      setSearchTerm(term);
    }, 150);
  }, []);

  useEffect(() => {
    setPage(1);
    fetchCoins(1, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortBy]);

  useEffect(() => {
    if (!initialFetchDone.current) {
      initialFetchDone.current = true;
      fetchCoins(1, true);
    }
  }, []);

  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, []);

  return {
    coins: filteredCoins,
    loading,
    error,
    hasMore,
    searchTerm,
    sortBy,
    setSearchTerm: debouncedSetSearchTerm,
    setSortBy,
    loadMore,
    retry,
  };
};