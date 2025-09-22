import type { CoinMarketData, TrendingResponse, CoinDetail, ApiError } from '../types';
import { mockDataService } from './mockDataService';

class CoinGeckoApiService {
  private baseUrl: string;
  private apiKey?: string;
  private cache = new Map<string, { data: unknown; timestamp: number }>();
  private cacheTimeout = 30000;
  private useMockData = false;

  constructor() {
    this.baseUrl = import.meta.env.VITE_COINGECKO_API_URL || 'https://api.coingecko.com/api/v3';
    this.apiKey = import.meta.env.VITE_COINGECKO_API_KEY;
  }

  private getHeaders(): HeadersInit {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };
    
    if (this.apiKey) {
      headers['X-CG-Demo-API-Key'] = this.apiKey;
    }
    
    return headers;
  }

  private getCacheKey(url: string, params: Record<string, unknown> = {}): string {
    const stringParams = Object.fromEntries(
      Object.entries(params).map(([key, value]) => [key, String(value)])
    );
    const searchParams = new URLSearchParams(stringParams).toString();
    return `${url}${searchParams ? '?' + searchParams : ''}`;
  }

  private getFromCache<T>(cacheKey: string): T | null {
    const cached = this.cache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < this.cacheTimeout) {
      return cached.data as T;
    }
    return null;
  }

  private setCache(cacheKey: string, data: unknown): void {
    this.cache.set(cacheKey, { data, timestamp: Date.now() });
  }

  private async makeRequest<T>(endpoint: string, params: Record<string, unknown> = {}): Promise<T> {
    const cacheKey = this.getCacheKey(endpoint, params);
    const cached = this.getFromCache<T>(cacheKey);

    if (cached) {
      return cached;
    }

    const url = new URL(`${this.baseUrl}${endpoint}`);
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.append(key, value.toString());
      }
    });

    try {
      const response = await fetch(url.toString(), {
        headers: this.getHeaders(),
      });

      if (!response.ok) {
        const error: ApiError = {
          message: `HTTP error! status: ${response.status}`,
          status: response.status,
        };
        throw error;
      }

      const data = await response.json();
      this.setCache(cacheKey, data);
      return data;
    } catch (error) {
      if (error instanceof Error) {
        const apiError: ApiError = {
          message: error.message,
        };
        throw apiError;
      }
      throw error;
    }
  }

  async getCoinsMarket(
    vsCurrency = 'usd',
    order = 'market_cap_desc',
    perPage = 50,
    page = 1,
    sparkline = false,
    priceChangePercentage = '24h,7d'
  ): Promise<CoinMarketData[]> {
    if (this.useMockData) {
      return mockDataService.getCoinsMarket(vsCurrency, order, perPage, page, sparkline, priceChangePercentage);
    }

    try {
      return await this.makeRequest('/coins/markets', {
        vs_currency: vsCurrency,
        order,
        per_page: perPage,
        page,
        sparkline,
        price_change_percentage: priceChangePercentage,
      });
    } catch (error) {
      console.warn('API request failed, falling back to mock data:', error);
      this.useMockData = true;
      return mockDataService.getCoinsMarket(vsCurrency, order, perPage, page, sparkline, priceChangePercentage);
    }
  }

  async getTrending(): Promise<TrendingResponse> {
    if (this.useMockData) {
      return mockDataService.getTrending();
    }

    try {
      return await this.makeRequest('/search/trending');
    } catch (error) {
      console.warn('API request failed, falling back to mock data:', error);
      this.useMockData = true;
      return mockDataService.getTrending();
    }
  }

  async getCoinDetail(id: string): Promise<CoinDetail> {
    if (this.useMockData) {
      return mockDataService.getCoinDetail(id);
    }

    try {
      return await this.makeRequest(`/coins/${id}`, {
        localization: false,
        tickers: false,
        market_data: true,
        community_data: false,
        developer_data: false,
        sparkline: false,
      });
    } catch (error) {
      console.warn('API request failed, falling back to mock data:', error);
      this.useMockData = true;
      return mockDataService.getCoinDetail(id);
    }
  }

  clearCache(): void {
    this.cache.clear();
  }
}

export const coinGeckoApi = new CoinGeckoApiService();