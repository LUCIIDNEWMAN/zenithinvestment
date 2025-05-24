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
    <section className="py-16 bg-muted/30">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Live Market Data</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Stay updated with real-time market movements and trending stocks.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {marketData.map((index) => (
            <Card key={index.symbol}>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">{index.symbol}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{index.value.toLocaleString()}</div>
                <div className="flex items-center justify-between mt-2">
                  <Badge variant={index.change >= 0 ? "default" : "destructive"} className="text-xs">
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

        <Card>
          <CardHeader>
            <CardTitle>Top Performers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {topStocks.map((stock) => (
                <div key={stock.symbol} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <div className="font-semibold">{stock.symbol}</div>
                    <div className="text-sm text-muted-foreground">Cap: {stock.marketCap}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">${stock.price}</div>
                    <Badge variant={stock.change >= 0 ? "default" : "destructive"} className="text-xs">
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
