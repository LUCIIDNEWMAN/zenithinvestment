"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Header } from "@/components/header"
import { TrendingUp, Target, Shield, AlertTriangle, CheckCircle, BarChart3, PieChart, Activity } from "lucide-react"
import {
  performanceData,
  sectorAllocations,
  riskMetrics,
  assetAllocations,
  topPerformers,
  insights,
} from "@/lib/analytics-data"
import { PerformanceChart } from "@/components/performance-chart"
import { SectorChart } from "@/components/sector-chart"
import { AssetAllocationChart } from "@/components/asset-allocation-chart"

export default function AnalyticsPage() {
  const totalValue = 150000
  const totalReturn = 32.1
  const monthlyReturn = 2.8

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Portfolio Analytics</h1>
            <p className="text-muted-foreground">Comprehensive insights into your investment performance</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">${totalValue.toLocaleString()}</div>
            <div className="text-sm text-muted-foreground">Total Portfolio Value</div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Return</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">+{totalReturn}%</div>
              <p className="text-xs text-muted-foreground">Since inception</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Monthly Return</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">+{monthlyReturn}%</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Risk Score</CardTitle>
              <Shield className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">7.2/10</div>
              <p className="text-xs text-muted-foreground">Moderate risk</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Benchmark</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">+14.9%</div>
              <p className="text-xs text-muted-foreground">Outperforming S&P 500</p>
            </CardContent>
          </Card>
        </div>

        {/* Analytics Tabs */}
        <Tabs defaultValue="performance" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="allocation">Allocation</TabsTrigger>
            <TabsTrigger value="risk">Risk Analysis</TabsTrigger>
            <TabsTrigger value="insights">Insights</TabsTrigger>
          </TabsList>

          <TabsContent value="performance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Portfolio Performance</CardTitle>
                <CardDescription>Compare your portfolio performance against benchmarks over time</CardDescription>
              </CardHeader>
              <CardContent>
                <PerformanceChart data={performanceData} />
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Top Performers</CardTitle>
                  <CardDescription>Stocks contributing most to portfolio returns</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {topPerformers.map((stock) => (
                    <div key={stock.symbol} className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">{stock.symbol}</div>
                        <div className="text-sm text-muted-foreground">{stock.name}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium text-green-600">+{stock.return}%</div>
                        <div className="text-sm text-muted-foreground">+{stock.contribution}% contribution</div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Sector Performance</CardTitle>
                  <CardDescription>Performance breakdown by sector allocation</CardDescription>
                </CardHeader>
                <CardContent>
                  <SectorChart data={sectorAllocations} />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="allocation" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Asset Allocation</CardTitle>
                  <CardDescription>Current distribution of your investments</CardDescription>
                </CardHeader>
                <CardContent>
                  <AssetAllocationChart data={assetAllocations} />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Sector Breakdown</CardTitle>
                  <CardDescription>Investment distribution across sectors</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {sectorAllocations.map((sector) => (
                    <div key={sector.sector} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{sector.sector}</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm">{sector.percentage}%</span>
                          <Badge variant={sector.change >= 0 ? "default" : "destructive"} className="text-xs">
                            {sector.change >= 0 ? "+" : ""}
                            {sector.change}%
                          </Badge>
                        </div>
                      </div>
                      <Progress value={sector.percentage} className="h-2" />
                      <div className="text-xs text-muted-foreground">${sector.value.toLocaleString()}</div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Allocation Summary</CardTitle>
                <CardDescription>Overview of your investment distribution</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-4 gap-4">
                  {assetAllocations.map((allocation) => (
                    <div key={allocation.type} className="text-center p-4 border rounded-lg">
                      <div className="text-2xl font-bold mb-2">{allocation.percentage}%</div>
                      <div className="text-sm font-medium mb-1">{allocation.type}</div>
                      <div className="text-xs text-muted-foreground">${allocation.value.toLocaleString()}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="risk" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Risk Metrics</CardTitle>
                <CardDescription>Key risk indicators compared to market benchmarks</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {riskMetrics.map((metric) => (
                  <div key={metric.name} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">{metric.name}</span>
                        {metric.status === "good" && <CheckCircle className="h-4 w-4 text-green-500" />}
                        {metric.status === "warning" && <AlertTriangle className="h-4 w-4 text-yellow-500" />}
                        {metric.status === "danger" && <AlertTriangle className="h-4 w-4 text-red-500" />}
                      </div>
                      <div className="text-right">
                        <div className="font-medium">{metric.value}</div>
                        <div className="text-xs text-muted-foreground">Benchmark: {metric.benchmark}</div>
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {metric.name === "Portfolio Beta" && "Measures portfolio sensitivity to market movements"}
                      {metric.name === "Sharpe Ratio" && "Risk-adjusted return measure"}
                      {metric.name === "Max Drawdown" && "Largest peak-to-trough decline"}
                      {metric.name === "Volatility" && "Standard deviation of returns"}
                      {metric.name === "Value at Risk (95%)" && "Potential loss in worst 5% of scenarios"}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Risk Score Breakdown</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Market Risk</span>
                      <span className="text-sm font-medium">6.8/10</span>
                    </div>
                    <Progress value={68} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Credit Risk</span>
                      <span className="text-sm font-medium">3.2/10</span>
                    </div>
                    <Progress value={32} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Liquidity Risk</span>
                      <span className="text-sm font-medium">2.1/10</span>
                    </div>
                    <Progress value={21} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Concentration Risk</span>
                      <span className="text-sm font-medium">7.5/10</span>
                    </div>
                    <Progress value={75} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Risk vs Return</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center space-y-4">
                    <div className="text-4xl font-bold text-green-600">A-</div>
                    <div className="text-sm text-muted-foreground">Risk-Adjusted Rating</div>
                    <div className="text-sm">
                      Your portfolio delivers strong returns while maintaining moderate risk levels.
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="insights" className="space-y-6">
            <div className="grid gap-6">
              {insights.map((insight, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-center space-x-2">
                      {insight.impact === "positive" && <CheckCircle className="h-5 w-5 text-green-500" />}
                      {insight.impact === "warning" && <AlertTriangle className="h-5 w-5 text-yellow-500" />}
                      {insight.impact === "negative" && <AlertTriangle className="h-5 w-5 text-red-500" />}
                      <CardTitle className="text-lg">{insight.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{insight.description}</p>
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <div className="text-sm font-medium mb-1">Recommendation:</div>
                      <div className="text-sm">{insight.recommendation}</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card>
              <CardHeader>
                <CardTitle>AI-Powered Insights</CardTitle>
                <CardDescription>Advanced analytics and recommendations based on market trends</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <BarChart3 className="h-4 w-4 text-blue-500" />
                    <span className="font-medium">Market Outlook</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Current market conditions favor growth stocks. Consider increasing allocation to technology and
                    healthcare sectors.
                  </p>
                </div>
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <PieChart className="h-4 w-4 text-green-500" />
                    <span className="font-medium">Rebalancing Opportunity</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Your portfolio has drifted from target allocation. Consider rebalancing to maintain optimal
                    risk-return profile.
                  </p>
                </div>
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <TrendingUp className="h-4 w-4 text-purple-500" />
                    <span className="font-medium">Tax Optimization</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Consider tax-loss harvesting opportunities in your technology holdings to optimize after-tax
                    returns.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
