import type { CoinMarketData, TrendingResponse, CoinDetail } from '../types';

// Mock cryptocurrency data for testing when API is not available
const mockCoinsData: CoinMarketData[] = [
  {
    id: 'bitcoin',
    symbol: 'btc',
    name: 'Bitcoin',
    image: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png',
    current_price: 67234.56,
    market_cap: 1329456789012,
    market_cap_rank: 1,
    total_volume: 28456789012,
    high_24h: 68123.45,
    low_24h: 66789.12,
    price_change_24h: 1245.67,
    price_change_percentage_24h: 1.89,
    price_change_percentage_7d: 5.23,
    market_cap_change_24h: 23456789,
    market_cap_change_percentage_24h: 1.79,
    circulating_supply: 19789456.78,
    total_supply: 21000000,
    max_supply: 21000000,
    ath: 73738.0,
    ath_change_percentage: -8.82,
    ath_date: '2021-11-10T14:24:11.849Z',
    atl: 67.81,
    atl_change_percentage: 99089.84,
    atl_date: '2013-07-06T00:00:00.000Z',
    last_updated: '2024-01-15T10:30:00.000Z'
  },
  {
    id: 'ethereum',
    symbol: 'eth',
    name: 'Ethereum',
    image: 'https://assets.coingecko.com/coins/images/279/large/ethereum.png',
    current_price: 3456.78,
    market_cap: 415678901234,
    market_cap_rank: 2,
    total_volume: 15678901234,
    high_24h: 3567.89,
    low_24h: 3398.45,
    price_change_24h: 89.12,
    price_change_percentage_24h: 2.64,
    price_change_percentage_7d: 8.45,
    market_cap_change_24h: 10789456,
    market_cap_change_percentage_24h: 2.66,
    circulating_supply: 120345678.91,
    total_supply: 120345678.91,
    ath: 4878.26,
    ath_change_percentage: -29.13,
    ath_date: '2021-11-10T14:24:19.604Z',
    atl: 0.432979,
    atl_change_percentage: 797576.5,
    atl_date: '2015-10-20T00:00:00.000Z',
    last_updated: '2024-01-15T10:30:00.000Z'
  },
  {
    id: 'tether',
    symbol: 'usdt',
    name: 'Tether',
    image: 'https://assets.coingecko.com/coins/images/325/large/Tether.png',
    current_price: 1.0002,
    market_cap: 91234567890,
    market_cap_rank: 3,
    total_volume: 45678901234,
    high_24h: 1.0012,
    low_24h: 0.9995,
    price_change_24h: 0.0002,
    price_change_percentage_24h: 0.02,
    price_change_percentage_7d: 0.01,
    market_cap_change_24h: 18234567,
    market_cap_change_percentage_24h: 0.02,
    circulating_supply: 91200000000,
    total_supply: 91200000000,
    ath: 1.32,
    ath_change_percentage: -24.24,
    ath_date: '2018-07-24T00:00:00.000Z',
    atl: 0.572521,
    atl_change_percentage: 74.68,
    atl_date: '2015-03-02T00:00:00.000Z',
    last_updated: '2024-01-15T10:30:00.000Z'
  },
  {
    id: 'binancecoin',
    symbol: 'bnb',
    name: 'BNB',
    image: 'https://assets.coingecko.com/coins/images/825/large/bnb-icon2_2x.png',
    current_price: 412.56,
    market_cap: 61789012345,
    market_cap_rank: 4,
    total_volume: 1234567890,
    high_24h: 418.23,
    low_24h: 408.91,
    price_change_24h: 7.89,
    price_change_percentage_24h: 1.95,
    price_change_percentage_7d: 4.23,
    market_cap_change_24h: 1234567,
    market_cap_change_percentage_24h: 2.04,
    circulating_supply: 149789456.12,
    total_supply: 149789456.12,
    max_supply: 200000000,
    ath: 686.31,
    ath_change_percentage: -39.89,
    ath_date: '2021-05-10T07:24:17.097Z',
    atl: 0.0398177,
    atl_change_percentage: 1034567.8,
    atl_date: '2017-10-19T00:00:00.000Z',
    last_updated: '2024-01-15T10:30:00.000Z'
  },
  {
    id: 'solana',
    symbol: 'sol',
    name: 'Solana',
    image: 'https://assets.coingecko.com/coins/images/4128/large/solana.png',
    current_price: 178.45,
    market_cap: 79456789012,
    market_cap_rank: 5,
    total_volume: 3456789012,
    high_24h: 182.34,
    low_24h: 175.67,
    price_change_24h: 4.23,
    price_change_percentage_24h: 2.43,
    price_change_percentage_7d: 12.34,
    market_cap_change_24h: 1890123,
    market_cap_change_percentage_24h: 2.44,
    circulating_supply: 445123456.78,
    total_supply: 571234567.89,
    ath: 259.96,
    ath_change_percentage: -31.36,
    ath_date: '2021-11-06T21:54:35.825Z',
    atl: 0.500801,
    atl_change_percentage: 35537.2,
    atl_date: '2020-05-11T19:35:23.449Z',
    last_updated: '2024-01-15T10:30:00.000Z'
  }
];

// Generate more mock data to simulate pagination
const generateMoreMockCoins = (startRank: number, count: number): CoinMarketData[] => {
  const coinNames = [
    'Cardano', 'Dogecoin', 'TRON', 'Avalanche', 'Chainlink', 'Polygon', 'Litecoin', 'Polkadot',
    'Internet Computer', 'Uniswap', 'Bitcoin Cash', 'Stellar', 'Ethereum Classic', 'Monero',
    'Cosmos', 'VeChain', 'Algorand', 'Filecoin', 'NEAR Protocol', 'Aptos', 'Hedera', 'Cronos',
    'Lido DAO', 'Quant', 'Arbitrum', 'Kaspa', 'Maker', 'Optimism', 'Stacks', 'Immutable'
  ];

  const symbols = [
    'ADA', 'DOGE', 'TRX', 'AVAX', 'LINK', 'MATIC', 'LTC', 'DOT', 'ICP', 'UNI', 'BCH', 'XLM',
    'ETC', 'XMR', 'ATOM', 'VET', 'ALGO', 'FIL', 'NEAR', 'APT', 'HBAR', 'CRO', 'LDO', 'QNT',
    'ARB', 'KAS', 'MKR', 'OP', 'STX', 'IMX'
  ];

  return Array.from({ length: count }, (_, i) => {
    const rank = startRank + i;
    const index = i % coinNames.length;
    const basePrice = Math.random() * 100 + 0.1;
    const change24h = (Math.random() - 0.5) * 10;

    return {
      id: coinNames[index].toLowerCase().replace(/\s+/g, '-'),
      symbol: symbols[index].toLowerCase(),
      name: coinNames[index],
      image: `https://assets.coingecko.com/coins/images/${100 + rank}/large/${symbols[index].toLowerCase()}.png`,
      current_price: Number(basePrice.toFixed(8)),
      market_cap: Math.floor(Math.random() * 50000000000 + 1000000000),
      market_cap_rank: rank,
      total_volume: Math.floor(Math.random() * 5000000000 + 100000000),
      high_24h: basePrice * (1 + Math.random() * 0.1),
      low_24h: basePrice * (1 - Math.random() * 0.1),
      price_change_24h: change24h,
      price_change_percentage_24h: (change24h / basePrice) * 100,
      price_change_percentage_7d: (Math.random() - 0.5) * 20,
      market_cap_change_24h: Math.floor(Math.random() * 1000000000),
      market_cap_change_percentage_24h: (Math.random() - 0.5) * 5,
      circulating_supply: Math.floor(Math.random() * 1000000000 + 1000000),
      total_supply: Math.floor(Math.random() * 1000000000 + 1000000),
      max_supply: Math.random() > 0.5 ? Math.floor(Math.random() * 1000000000 + 1000000) : undefined,
      ath: basePrice * (1 + Math.random() * 2),
      ath_change_percentage: -Math.random() * 50,
      ath_date: '2021-11-10T14:24:11.849Z',
      atl: basePrice * Math.random() * 0.1,
      atl_change_percentage: Math.random() * 10000,
      atl_date: '2020-03-13T02:18:07.527Z',
      last_updated: '2024-01-15T10:30:00.000Z'
    };
  });
};

class MockDataService {
  private allCoins: CoinMarketData[];

  constructor() {
    this.allCoins = [...mockCoinsData, ...generateMoreMockCoins(6, 95)];
  }

  async getCoinsMarket(
    vsCurrency = 'usd',
    order = 'market_cap_desc',
    perPage = 50,
    page = 1,
    sparkline = false,
    priceChangePercentage = '24h,7d'
  ): Promise<CoinMarketData[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    let sortedCoins = [...this.allCoins];

    // Apply sorting
    switch (order) {
      case 'market_cap_desc':
        sortedCoins.sort((a, b) => b.market_cap - a.market_cap);
        break;
      case 'market_cap_asc':
        sortedCoins.sort((a, b) => a.market_cap - b.market_cap);
        break;
      case 'price_desc':
        sortedCoins.sort((a, b) => b.current_price - a.current_price);
        break;
      case 'price_asc':
        sortedCoins.sort((a, b) => a.current_price - b.current_price);
        break;
      case 'percent_change_desc':
        sortedCoins.sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h);
        break;
      case 'percent_change_asc':
        sortedCoins.sort((a, b) => a.price_change_percentage_24h - b.price_change_percentage_24h);
        break;
      case 'volume_desc':
        sortedCoins.sort((a, b) => b.total_volume - a.total_volume);
        break;
      case 'volume_asc':
        sortedCoins.sort((a, b) => a.total_volume - b.total_volume);
        break;
      default:
        sortedCoins.sort((a, b) => a.market_cap_rank - b.market_cap_rank);
    }

    // Apply pagination
    const startIndex = (page - 1) * perPage;
    const endIndex = startIndex + perPage;

    return sortedCoins.slice(startIndex, endIndex);
  }

  async getTrending(): Promise<TrendingResponse> {
    await new Promise(resolve => setTimeout(resolve, 300));

    return {
      coins: mockCoinsData.slice(0, 7).map(coin => ({
        item: {
          id: coin.id,
          coin_id: Math.floor(Math.random() * 10000),
          name: coin.name,
          symbol: coin.symbol,
          market_cap_rank: coin.market_cap_rank,
          thumb: coin.image,
          small: coin.image,
          large: coin.image,
          slug: coin.id,
          price_btc: coin.current_price / 67234.56,
          score: Math.floor(Math.random() * 100)
        }
      })),
      nfts: [],
      categories: []
    };
  }

  async getCoinDetail(id: string): Promise<CoinDetail> {
    await new Promise(resolve => setTimeout(resolve, 300));

    const coin = this.allCoins.find(c => c.id === id);
    if (!coin) {
      throw new Error(`Coin with id ${id} not found`);
    }

    return {
      id: coin.id,
      symbol: coin.symbol,
      name: coin.name,
      description: {
        en: `${coin.name} is a decentralized digital cryptocurrency that enables peer-to-peer transactions. It was created to provide a secure, fast, and efficient way to transfer value across the internet without the need for traditional financial intermediaries.`
      },
      image: {
        thumb: coin.image,
        small: coin.image,
        large: coin.image
      },
      market_cap_rank: coin.market_cap_rank,
      market_data: {
        current_price: { usd: coin.current_price },
        market_cap: { usd: coin.market_cap },
        total_volume: { usd: coin.total_volume },
        high_24h: { usd: coin.high_24h },
        low_24h: { usd: coin.low_24h },
        price_change_24h: coin.price_change_24h,
        price_change_percentage_24h: coin.price_change_percentage_24h,
        price_change_percentage_7d: coin.price_change_percentage_7d || 0,
        price_change_percentage_30d: (Math.random() - 0.5) * 30
      }
    };
  }

  clearCache(): void {
    // Mock implementation - no cache to clear
  }
}

export const mockDataService = new MockDataService();