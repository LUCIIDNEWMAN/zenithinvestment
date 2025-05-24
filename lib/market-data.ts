export interface Stock {
  symbol: string
  name: string
  price: number
  change: number
  changePercent: number
  volume: string
  marketCap: string
  high24h: number
  low24h: number
  sector: string
}

export interface Crypto {
  symbol: string
  name: string
  price: number
  change: number
  changePercent: number
  volume: string
  marketCap: string
  high24h: number
  low24h: number
  rank: number
}

export interface MarketIndex {
  name: string
  value: number
  change: number
  changePercent: number
}

// Simulated stock data
export const initialStocks: Stock[] = [
  {
    symbol: "AAPL",
    name: "Apple Inc.",
    price: 175.43,
    change: 3.67,
    changePercent: 2.14,
    volume: "52.3M",
    marketCap: "2.8T",
    high24h: 177.12,
    low24h: 171.85,
    sector: "Technology",
  },
  {
    symbol: "GOOGL",
    name: "Alphabet Inc.",
    price: 125.3,
    change: -1.05,
    changePercent: -0.83,
    volume: "28.7M",
    marketCap: "1.6T",
    high24h: 127.45,
    low24h: 124.12,
    sector: "Technology",
  },
  {
    symbol: "MSFT",
    name: "Microsoft Corporation",
    price: 338.5,
    change: 5.12,
    changePercent: 1.54,
    volume: "31.2M",
    marketCap: "2.5T",
    high24h: 341.23,
    low24h: 335.67,
    sector: "Technology",
  },
  {
    symbol: "TSLA",
    name: "Tesla, Inc.",
    price: 248.5,
    change: -3.45,
    changePercent: -1.37,
    volume: "89.4M",
    marketCap: "789B",
    high24h: 253.21,
    low24h: 246.78,
    sector: "Automotive",
  },
  {
    symbol: "AMZN",
    name: "Amazon.com Inc.",
    price: 127.74,
    change: 4.12,
    changePercent: 3.34,
    volume: "45.6M",
    marketCap: "1.3T",
    high24h: 129.45,
    low24h: 125.23,
    sector: "Consumer Discretionary",
  },
  {
    symbol: "META",
    name: "Meta Platforms Inc.",
    price: 298.75,
    change: 8.23,
    changePercent: 2.83,
    volume: "19.8M",
    marketCap: "756B",
    high24h: 301.12,
    low24h: 292.45,
    sector: "Technology",
  },
  {
    symbol: "NVDA",
    name: "NVIDIA Corporation",
    price: 875.28,
    change: 15.67,
    changePercent: 1.82,
    volume: "42.1M",
    marketCap: "2.2T",
    high24h: 882.45,
    low24h: 865.12,
    sector: "Technology",
  },
  {
    symbol: "JPM",
    name: "JPMorgan Chase & Co.",
    price: 145.67,
    change: -0.89,
    changePercent: -0.61,
    volume: "12.3M",
    marketCap: "428B",
    high24h: 147.23,
    low24h: 144.56,
    sector: "Financial Services",
  },
]

// Simulated cryptocurrency data
export const initialCryptos: Crypto[] = [
  {
    symbol: "BTC",
    name: "Bitcoin",
    price: 43250.67,
    change: 1245.32,
    changePercent: 2.97,
    volume: "28.4B",
    marketCap: "847B",
    high24h: 44123.45,
    low24h: 41987.23,
    rank: 1,
  },
  {
    symbol: "ETH",
    name: "Ethereum",
    price: 2567.89,
    change: -45.67,
    changePercent: -1.75,
    volume: "15.2B",
    marketCap: "308B",
    high24h: 2634.56,
    low24h: 2523.12,
    rank: 2,
  },
  {
    symbol: "BNB",
    name: "BNB",
    price: 312.45,
    change: 8.23,
    changePercent: 2.71,
    volume: "1.8B",
    marketCap: "48B",
    high24h: 318.67,
    low24h: 306.78,
    rank: 3,
  },
  {
    symbol: "XRP",
    name: "XRP",
    price: 0.6234,
    change: 0.0156,
    changePercent: 2.56,
    volume: "2.1B",
    marketCap: "33B",
    high24h: 0.6387,
    low24h: 0.6089,
    rank: 4,
  },
  {
    symbol: "ADA",
    name: "Cardano",
    price: 0.4567,
    change: -0.0123,
    changePercent: -2.62,
    volume: "456M",
    marketCap: "16B",
    high24h: 0.4723,
    low24h: 0.4456,
    rank: 5,
  },
  {
    symbol: "DOGE",
    name: "Dogecoin",
    price: 0.0823,
    change: 0.0034,
    changePercent: 4.31,
    volume: "789M",
    marketCap: "12B",
    high24h: 0.0856,
    low24h: 0.0798,
    rank: 6,
  },
  {
    symbol: "SOL",
    name: "Solana",
    price: 98.45,
    change: 3.67,
    changePercent: 3.87,
    volume: "2.3B",
    marketCap: "42B",
    high24h: 101.23,
    low24h: 95.67,
    rank: 7,
  },
  {
    symbol: "MATIC",
    name: "Polygon",
    price: 0.8934,
    change: -0.0234,
    changePercent: -2.55,
    volume: "567M",
    marketCap: "8.3B",
    high24h: 0.9234,
    low24h: 0.8756,
    rank: 8,
  },
]

export const marketIndices: MarketIndex[] = [
  {
    name: "S&P 500",
    value: 4185.47,
    change: 33.45,
    changePercent: 0.81,
  },
  {
    name: "NASDAQ",
    value: 12845.78,
    change: -38.67,
    changePercent: -0.3,
  },
  {
    name: "DOW",
    value: 33875.4,
    change: 405.23,
    changePercent: 1.21,
  },
  {
    name: "RUSSELL 2000",
    value: 1987.34,
    change: 9.87,
    changePercent: 0.5,
  },
]

// Simulate real-time price updates
export function updateMarketData(stocks: Stock[], cryptos: Crypto[]): { stocks: Stock[]; cryptos: Crypto[] } {
  const updatedStocks = stocks.map((stock) => {
    const volatility = 0.002 // 0.2% max change per update
    const randomChange = (Math.random() - 0.5) * 2 * volatility
    const newPrice = stock.price * (1 + randomChange)
    const priceChange = newPrice - stock.price
    const percentChange = (priceChange / stock.price) * 100

    return {
      ...stock,
      price: Number(newPrice.toFixed(2)),
      change: Number((stock.change + priceChange).toFixed(2)),
      changePercent: Number((((stock.change + priceChange) / (stock.price - stock.change)) * 100).toFixed(2)),
    }
  })

  const updatedCryptos = cryptos.map((crypto) => {
    const volatility = 0.005 // 0.5% max change per update (higher volatility for crypto)
    const randomChange = (Math.random() - 0.5) * 2 * volatility
    const newPrice = crypto.price * (1 + randomChange)
    const priceChange = newPrice - crypto.price
    const percentChange = (priceChange / crypto.price) * 100

    return {
      ...crypto,
      price: Number(newPrice.toFixed(crypto.price < 1 ? 4 : 2)),
      change: Number((crypto.change + priceChange).toFixed(crypto.price < 1 ? 4 : 2)),
      changePercent: Number((((crypto.change + priceChange) / (crypto.price - crypto.change)) * 100).toFixed(2)),
    }
  })

  return { stocks: updatedStocks, cryptos: updatedCryptos }
}
