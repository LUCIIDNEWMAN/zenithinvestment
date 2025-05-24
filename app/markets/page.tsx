"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Header } from "@/components/header"
import { Search, TrendingUp, TrendingDown, RefreshCw } from "lucide-react"
import {
  initialStocks,
  initialCryptos,
  marketIndices,
  updateMarketData,
  type Stock,
  type Crypto,
} from "@/lib/market-data"

export default function MarketsPage() {
  const [stocks, setStocks] = useState<Stock[]>(initialStocks)
  const [cryptos, setCryptos] = useState<Crypto[]>(initialCryptos)
  const [searchTerm, setSearchTerm] = useState("")
  const [isUpdating, setIsUpdating] = useState(false)
  const [lastUpdate, setLastUpdate] = useState(new Date())

  // Simulate real-time updates every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIsUpdating(true)
      const { stocks: updatedStocks, cryptos: updatedCryptos } = updateMarketData(stocks, cryptos)
      setStocks(updatedStocks)
      setCryptos(updatedCryptos)
      setLastUpdate(new Date())
      setTimeout(() => setIsUpdating(false), 500)
    }, 3000)

    return () => clearInterval(interval)
  }, [stocks, cryptos])

  const filteredStocks = stocks.filter(
    (stock) =>
      stock.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
      stock.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const filteredCryptos = cryptos.filter(
    (crypto) =>
      crypto.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
      crypto.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const formatPrice = (price: number, symbol: string) => {
    if (symbol === "BTC" || symbol === "ETH" || price > 100) {
      return `$${price.toLocaleString()}`
    }
    return `$${price.toFixed(4)}`
  }

  const formatChange = (change: number, changePercent: number) => {
    const isPositive = change >= 0
    return (
      <div className={`flex items-center space-x-1 ${isPositive ? "text-green-600" : "text-red-600"}`}>
        {isPositive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
        <span className="text-sm font-medium">
          {isPositive ? "+" : ""}
          {change.toFixed(2)} ({isPositive ? "+" : ""}
          {changePercent.toFixed(2)}%)
        </span>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Live Markets</h1>
            <p className="text-muted-foreground">Real-time market data and trading opportunities</p>
          </div>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <RefreshCw className={`h-4 w-4 ${isUpdating ? "animate-spin" : ""}`} />
            <span>Last updated: {lastUpdate.toLocaleTimeString()}</span>
          </div>
        </div>

        {/* Market Indices */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          {marketIndices.map((index) => (
            <Card key={index.name}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{index.name}</p>
                    <p className="text-2xl font-bold">{index.value.toLocaleString()}</p>
                  </div>
                  <Badge variant={index.change >= 0 ? "default" : "destructive"}>
                    {index.change >= 0 ? "+" : ""}
                    {index.changePercent.toFixed(2)}%
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search stocks or cryptocurrencies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Markets Tabs */}
        <Tabs defaultValue="stocks" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="stocks">Stocks</TabsTrigger>
            <TabsTrigger value="crypto">Cryptocurrency</TabsTrigger>
          </TabsList>

          <TabsContent value="stocks" className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Top Stocks</h2>
              <p className="text-sm text-muted-foreground">{filteredStocks.length} stocks</p>
            </div>

            <div className="space-y-2">
              {filteredStocks.map((stock) => (
                <Card key={stock.symbol} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                          <span className="font-bold text-primary">{stock.symbol.slice(0, 2)}</span>
                        </div>
                        <div>
                          <h3 className="font-semibold">{stock.symbol}</h3>
                          <p className="text-sm text-muted-foreground">{stock.name}</p>
                          <Badge variant="outline" className="text-xs mt-1">
                            {stock.sector}
                          </Badge>
                        </div>
                      </div>

                      <div className="text-right">
                        <p className="text-xl font-bold">{formatPrice(stock.price, stock.symbol)}</p>
                        {formatChange(stock.change, stock.changePercent)}
                        <div className="text-xs text-muted-foreground mt-1">
                          Vol: {stock.volume} | Cap: {stock.marketCap}
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">24h High: </span>
                        <span className="font-medium">${stock.high24h.toFixed(2)}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">24h Low: </span>
                        <span className="font-medium">${stock.low24h.toFixed(2)}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="crypto" className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Top Cryptocurrencies</h2>
              <p className="text-sm text-muted-foreground">{filteredCryptos.length} cryptocurrencies</p>
            </div>

            <div className="space-y-2">
              {filteredCryptos.map((crypto) => (
                <Card key={crypto.symbol} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                          <span className="font-bold text-orange-600">{crypto.symbol.slice(0, 2)}</span>
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <h3 className="font-semibold">{crypto.symbol}</h3>
                            <Badge variant="secondary" className="text-xs">
                              #{crypto.rank}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{crypto.name}</p>
                        </div>
                      </div>

                      <div className="text-right">
                        <p className="text-xl font-bold">{formatPrice(crypto.price, crypto.symbol)}</p>
                        {formatChange(crypto.change, crypto.changePercent)}
                        <div className="text-xs text-muted-foreground mt-1">
                          Vol: {crypto.volume} | Cap: {crypto.marketCap}
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">24h High: </span>
                        <span className="font-medium">{formatPrice(crypto.high24h, crypto.symbol)}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">24h Low: </span>
                        <span className="font-medium">{formatPrice(crypto.low24h, crypto.symbol)}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Disclaimer */}
        <Card className="mt-8 bg-yellow-50 border-yellow-200">
          <CardContent className="p-4">
            <p className="text-sm text-yellow-800">
              <strong>Disclaimer:</strong> This is simulated market data for demonstration purposes only. Do not use
              this information for actual trading or investment decisions. Always consult with qualified financial
              advisors and use real market data from licensed providers.
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
