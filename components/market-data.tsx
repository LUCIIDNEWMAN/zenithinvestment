"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown } from "lucide-react"

const marketData = [
  { symbol: "S&P 500", value: 4185.47, change: 0.8, volume: "3.2B" },
  { symbol: "NASDAQ", value: 12845.78, change: -0.3, volume: "2.1B" },
  { symbol: "DOW", value: 33875.4, change: 1.2, volume: "1.8B" },
  { symbol: "RUSSELL", value: 1987.34, change: 0.5, volume: "890M" },
]

const topStocks = [
  { symbol: "AAPL", price: 175.43, change: 2.1, marketCap: "2.8T" },
  { symbol: "MSFT", price: 338.5, change: 1.5, marketCap: "2.5T" },
  { symbol: "GOOGL", price: 125.3, change: -0.8, marketCap: "1.6T" },
  { symbol: "AMZN", price: 127.74, change: 3.2, marketCap: "1.3T" },
  { symbol: "TSLA", price: 248.5, change: -1.4, marketCap: "789B" },
  { symbol: "META", price: 298.75, change: 2.8, marketCap: "756B" },
]

export function MarketData() {
  return (
    <section className="py-12 sm:py-16 bg-muted/30 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/5 to-transparent pointer-events-none" />

      <div className="container relative px-4 sm:px-6">
        <div className="text-center mb-8 sm:mb-12 animate-fade-in-down">
          <h2 className="text-2xl sm:text-3xl font-bold mb-2 sm:mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Live Market Data
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto px-4">
            Stay updated with real-time market movements and trending stocks.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {marketData.map((index, idx) => (
            <Card
              key={index.symbol}
              className="transition-smooth hover-lift hover-glow cursor-pointer animate-fade-in-up group"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <CardHeader className="pb-2">
                <CardTitle className="text-xs sm:text-sm font-medium">{index.symbol}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xl sm:text-2xl font-bold group-hover:text-accent transition-smooth">
                  {index.value.toLocaleString()}
                </div>
                <div className="flex items-center justify-between mt-2 gap-2 flex-wrap">
                  <Badge
                    variant={index.change >= 0 ? "default" : "destructive"}
                    className="text-xs transition-smooth hover:scale-105"
                  >
                    {index.change >= 0 ? (
                      <TrendingUp className="h-3 w-3 mr-1" />
                    ) : (
                      <TrendingDown className="h-3 w-3 mr-1" />
                    )}
                    {index.change >= 0 ? "+" : ""}
                    {index.change}%
                  </Badge>
                  <span className="text-xs text-muted-foreground">Vol: {index.volume}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="transition-smooth hover-lift hover-glow animate-fade-in-up group">
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl">Top Performers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {topStocks.map((stock, idx) => (
                <div
                  key={stock.symbol}
                  className="flex items-center justify-between p-3 sm:p-4 border rounded-lg transition-smooth hover-lift hover-scale cursor-pointer animate-fade-in-up group gap-2"
                  style={{ animationDelay: `${idx * 0.05}s` }}
                >
                  <div className="min-w-0">
                    <div className="font-semibold text-sm sm:text-base truncate">{stock.symbol}</div>
                    <div className="text-xs text-muted-foreground truncate">Cap: {stock.marketCap}</div>
                  </div>
                  <div className="text-right whitespace-nowrap">
                    <div className="font-medium text-sm sm:text-base group-hover:text-accent transition-smooth">
                      ${stock.price}
                    </div>
                    <Badge variant={stock.change >= 0 ? "default" : "destructive"} className="text-xs mt-1">
                      {stock.change >= 0 ? "+" : ""}
                      {stock.change}%
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
