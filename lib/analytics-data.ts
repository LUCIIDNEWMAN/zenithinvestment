export interface PerformanceData {
  date: string
  portfolio: number
  benchmark: number
  market: number
}

export interface SectorAllocation {
  sector: string
  percentage: number
  value: number
  change: number
}

export interface RiskMetric {
  name: string
  value: number
  benchmark: number
  status: "good" | "warning" | "danger"
}

export interface AssetAllocation {
  type: string
  percentage: number
  value: number
  color: string
}

export const performanceData: PerformanceData[] = [
  { date: "Jan", portfolio: 100, benchmark: 100, market: 100 },
  { date: "Feb", portfolio: 102.5, benchmark: 101.2, market: 100.8 },
  { date: "Mar", portfolio: 105.8, benchmark: 103.1, market: 102.3 },
  { date: "Apr", portfolio: 108.2, benchmark: 104.5, market: 103.7 },
  { date: "May", portfolio: 112.4, benchmark: 106.8, market: 105.2 },
  { date: "Jun", portfolio: 115.7, benchmark: 108.3, market: 106.9 },
  { date: "Jul", portfolio: 118.9, benchmark: 110.1, market: 108.4 },
  { date: "Aug", portfolio: 122.3, benchmark: 111.7, market: 109.8 },
  { date: "Sep", portfolio: 119.8, benchmark: 109.9, market: 107.6 },
  { date: "Oct", portfolio: 125.6, benchmark: 113.4, market: 111.2 },
  { date: "Nov", portfolio: 128.9, benchmark: 115.8, market: 113.5 },
  { date: "Dec", portfolio: 132.1, benchmark: 117.2, market: 114.8 },
]

export const sectorAllocations: SectorAllocation[] = [
  { sector: "Technology", percentage: 35.2, value: 52800, change: 2.4 },
  { sector: "Healthcare", percentage: 18.7, value: 28050, change: 1.8 },
  { sector: "Financial Services", percentage: 15.3, value: 22950, change: -0.5 },
  { sector: "Consumer Discretionary", percentage: 12.8, value: 19200, change: 3.1 },
  { sector: "Energy", percentage: 8.4, value: 12600, change: -1.2 },
  { sector: "Industrials", percentage: 6.2, value: 9300, change: 0.8 },
  { sector: "Materials", percentage: 3.4, value: 5100, change: 1.5 },
]

export const riskMetrics: RiskMetric[] = [
  { name: "Portfolio Beta", value: 0.85, benchmark: 1.0, status: "good" },
  { name: "Sharpe Ratio", value: 1.42, benchmark: 1.1, status: "good" },
  { name: "Max Drawdown", value: -8.2, benchmark: -12.5, status: "good" },
  { name: "Volatility", value: 14.8, benchmark: 18.2, status: "good" },
  { name: "Value at Risk (95%)", value: -2.1, benchmark: -2.8, status: "warning" },
]

export const assetAllocations: AssetAllocation[] = [
  { type: "Stocks", percentage: 65, value: 97500, color: "hsl(var(--chart-1))" },
  { type: "Bonds", percentage: 20, value: 30000, color: "hsl(var(--chart-2))" },
  { type: "ETFs", percentage: 10, value: 15000, color: "hsl(var(--chart-3))" },
  { type: "Cash", percentage: 5, value: 7500, color: "hsl(var(--chart-4))" },
]

export const topPerformers = [
  { symbol: "NVDA", name: "NVIDIA Corp", return: 28.4, contribution: 4.2 },
  { symbol: "AAPL", name: "Apple Inc", return: 15.7, contribution: 3.8 },
  { symbol: "MSFT", name: "Microsoft Corp", return: 22.1, contribution: 3.5 },
  { symbol: "GOOGL", name: "Alphabet Inc", return: 18.9, contribution: 2.9 },
  { symbol: "AMZN", name: "Amazon.com", return: 31.2, contribution: 2.7 },
]

export const insights = [
  {
    title: "Strong Technology Exposure",
    description: "Your 35% allocation to technology has driven significant outperformance this year.",
    impact: "positive",
    recommendation: "Consider taking some profits and rebalancing to maintain target allocation.",
  },
  {
    title: "Low Volatility Profile",
    description: "Portfolio volatility of 14.8% is well below market average, indicating good risk management.",
    impact: "positive",
    recommendation: "Current risk level aligns well with your investment objectives.",
  },
  {
    title: "Sector Concentration Risk",
    description: "Technology allocation exceeds recommended maximum of 30% for balanced portfolios.",
    impact: "warning",
    recommendation: "Consider diversifying into defensive sectors like utilities or consumer staples.",
  },
  {
    title: "Strong Risk-Adjusted Returns",
    description: "Sharpe ratio of 1.42 indicates excellent risk-adjusted performance.",
    impact: "positive",
    recommendation: "Continue current strategy while monitoring for changing market conditions.",
  },
]
