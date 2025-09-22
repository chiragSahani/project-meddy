export interface CoinListItem {
  id: string;
  symbol: string;
  name: string;
  image: string;
  currentPrice: number;
  marketCap: number;
  marketCapRank: number;
  volume24h: number;
  priceChange24h: number;
  priceChangePercentage24h: number;
  lastUpdated: string;
}

export interface HighlightCoin {
  id: string;
  symbol: string;
  name: string;
  image: string;
  currentPrice: number;
  priceChangePercentage24h: number;
  priceChangePercentage7d?: number;
  volume24h?: number;
  marketCapRank?: number;
}

export interface CoinDetailData {
  id: string;
  symbol: string;
  name: string;
  image: string;
  description: string;
  marketCapRank: number;
  currentPrice: number;
  marketCap: number;
  volume24h: number;
  high24h: number;
  low24h: number;
  priceChange24h: number;
  priceChangePercentage24h: number;
  priceChangePercentage7d: number;
  priceChangePercentage30d: number;
}

export type SortBy = 'market_cap_desc' | 'market_cap_asc' | 'volume_desc' | 'volume_asc' | 'price_desc' | 'price_asc' | 'percent_change_desc' | 'percent_change_asc';

export type HighlightType = 'gainers' | 'losers' | 'volume' | 'trending' | 'performance7d';