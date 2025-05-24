"use client"

import { useState, useEffect } from "react"
import { TrendingUp, TrendingDown } from "lucide-react"

interface TickerItem {
  symbol: string
  price: number
  change: number
  changePercent: number
}

const tickerData: TickerItem[] = [
  { symbol: "BTC", price: 43250.67, change: 1245.32, changePercent: 2.97 },
  { symbol: "ETH", price: 2567.89, change: -45.67, changePercent: -1.75 },
  { symbol: "AAPL", price: 175.43, change: 3.67, changePercent: 2.14 },
  { symbol: "GOOGL", price: 125.3, change: -1.05, changePercent: -0.83 },
  { symbol: "TSLA", price: 248.5, change: -3.45, changePercent: -1.37 },
]

export function MarketTicker() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % tickerData.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const current = tickerData[currentIndex]
  const isPositive = current.change >= 0

  return (
    <div className="bg-muted/30 border-y px-4 py-2 overflow-hidden">
      <div className="flex items-center justify-center space-x-4 text-sm">
        <div className="flex items-center space-x-2">
          <span className="font-medium">{current.symbol}</span>
          <span>${current.price.toLocaleString()}</span>
          <div className={`flex items-center space-x-1 ${isPositive ? "text-green-600" : "text-red-600"}`}>
            {isPositive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
            <span>
              {isPositive ? "+" : ""}
              {current.changePercent.toFixed(2)}%
            </span>
          </div>
        </div>
        <div className="text-muted-foreground">•</div>
        <div className="text-muted-foreground">Live Market Data</div>
      </div>
    </div>
  )
}
