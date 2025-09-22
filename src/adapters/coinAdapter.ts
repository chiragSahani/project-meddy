import { CoinMarketData, TrendingCoin, CoinDetail } from '../types';
import type { CoinListItem, HighlightCoin, CoinDetailData } from '../types';

export class CoinAdapter {
  static adaptMarketDataToListItem(coin: CoinMarketData): CoinListItem {
    return {
      id: coin.id,
      symbol: coin.symbol.toUpperCase(),
      name: coin.name,
      image: coin.image,
      currentPrice: coin.current_price,
      marketCap: coin.market_cap,
      marketCapRank: coin.market_cap_rank,
      volume24h: coin.total_volume,
      priceChange24h: coin.price_change_24h,
      priceChangePercentage24h: coin.price_change_percentage_24h,
      lastUpdated: coin.last_updated,
    };
  }

  static adaptMarketDataToHighlight(coin: CoinMarketData): HighlightCoin {
    return {
      id: coin.id,
      symbol: coin.symbol.toUpperCase(),
      name: coin.name,
      image: coin.image,
      currentPrice: coin.current_price,
      priceChangePercentage24h: coin.price_change_percentage_24h,
      volume24h: coin.total_volume,
      marketCapRank: coin.market_cap_rank,
    };
  }

  static adaptTrendingCoinToHighlight(coin: TrendingCoin, price?: number): HighlightCoin {
    return {
      id: coin.id,
      symbol: coin.symbol.toUpperCase(),
      name: coin.name,
      image: coin.large,
      currentPrice: price || 0,
      priceChangePercentage24h: 0,
      marketCapRank: coin.market_cap_rank,
    };
  }

  static adaptMarketDataToHighlight7d(coin: CoinMarketData): HighlightCoin {
    return {
      id: coin.id,
      symbol: coin.symbol.toUpperCase(),
      name: coin.name,
      image: coin.image,
      currentPrice: coin.current_price,
      priceChangePercentage24h: coin.price_change_percentage_24h,
      priceChangePercentage7d: coin.price_change_percentage_7d || 0,
      volume24h: coin.total_volume,
      marketCapRank: coin.market_cap_rank,
    };
  }

  static adaptCoinDetailToDetailData(coin: CoinDetail): CoinDetailData {
    return {
      id: coin.id,
      symbol: coin.symbol.toUpperCase(),
      name: coin.name,
      image: coin.image.large,
      description: coin.description.en,
      marketCapRank: coin.market_cap_rank,
      currentPrice: coin.market_data.current_price.usd,
      marketCap: coin.market_data.market_cap.usd,
      volume24h: coin.market_data.total_volume.usd,
      high24h: coin.market_data.high_24h.usd,
      low24h: coin.market_data.low_24h.usd,
      priceChange24h: coin.market_data.price_change_24h,
      priceChangePercentage24h: coin.market_data.price_change_percentage_24h,
      priceChangePercentage7d: coin.market_data.price_change_percentage_7d,
      priceChangePercentage30d: coin.market_data.price_change_percentage_30d,
    };
  }
}