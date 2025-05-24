import { Header } from "@/components/header"
import { InvestmentOptions } from "@/components/investment-options"
import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, Shield, BarChart3 } from "lucide-react"

export default function InvestPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative py-16 lg:py-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-blue-500/5 to-purple-500/5" />
          <div className="container relative">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl lg:text-5xl font-bold tracking-tight mb-6">
                Smart Investment{" "}
                <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                  Strategies
                </span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Choose from our expertly crafted investment portfolios designed to maximize returns while managing risk
                according to your financial goals.
              </p>
              <div className="grid md:grid-cols-3 gap-6 mt-12">
                <Card className="p-6">
                  <CardContent className="p-0 text-center">
                    <TrendingUp className="h-12 w-12 text-primary mx-auto mb-4" />
                    <h3 className="font-semibold mb-2">AI-Powered</h3>
                    <p className="text-sm text-muted-foreground">
                      Advanced algorithms optimize your portfolio in real-time
                    </p>
                  </CardContent>
                </Card>
                <Card className="p-6">
                  <CardContent className="p-0 text-center">
                    <Shield className="h-12 w-12 text-green-500 mx-auto mb-4" />
                    <h3 className="font-semibold mb-2">Risk Management</h3>
                    <p className="text-sm text-muted-foreground">
                      Sophisticated risk controls protect your investments
                    </p>
                  </CardContent>
                </Card>
                <Card className="p-6">
                  <CardContent className="p-0 text-center">
                    <BarChart3 className="h-12 w-12 text-blue-500 mx-auto mb-4" />
                    <h3 className="font-semibold mb-2">Performance</h3>
                    <p className="text-sm text-muted-foreground">Track record of consistent outperformance</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Investment Options */}
        <InvestmentOptions />

        {/* Why Choose Our Strategies */}
        <section className="py-16 bg-muted/30">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Why Choose ZENITH Strategies?</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Our investment strategies are built on decades of market research and powered by cutting-edge
                technology.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="p-6">
                <CardContent className="p-0">
                  <div className="text-2xl font-bold text-primary mb-2">15.2%</div>
                  <div className="text-sm font-medium mb-1">Average Annual Return</div>
                  <div className="text-xs text-muted-foreground">Across all portfolios since inception</div>
                </CardContent>
              </Card>

              <Card className="p-6">
                <CardContent className="p-0">
                  <div className="text-2xl font-bold text-primary mb-2">$1M+</div>
                  <div className="text-sm font-medium mb-1">Assets Under Management</div>
                  <div className="text-xs text-muted-foreground">Trusted by thousands of investors</div>
                </CardContent>
              </Card>

              <Card className="p-6">
                <CardContent className="p-0">
                  <div className="text-2xl font-bold text-primary mb-2">0.25%</div>
                  <div className="text-sm font-medium mb-1">Management Fee</div>
                  <div className="text-xs text-muted-foreground">Low-cost investing for better returns</div>
                </CardContent>
              </Card>

              <Card className="p-6">
                <CardContent className="p-0">
                  <div className="text-2xl font-bold text-primary mb-2">24/7</div>
                  <div className="text-sm font-medium mb-1">Portfolio Monitoring</div>
                  <div className="text-xs text-muted-foreground">Continuous optimization and rebalancing</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Getting Started */}
        <section className="py-16">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">How It Works</h2>
                <p className="text-muted-foreground">
                  Get started with professional investment management in just a few simple steps.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-primary">1</span>
                  </div>
                  <h3 className="font-semibold mb-2">Choose Your Strategy</h3>
                  <p className="text-sm text-muted-foreground">
                    Select an investment portfolio that matches your risk tolerance and financial goals.
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-primary">2</span>
                  </div>
                  <h3 className="font-semibold mb-2">Fund Your Account</h3>
                  <p className="text-sm text-muted-foreground">
                    Make your initial investment with our secure and easy funding options.
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-primary">3</span>
                  </div>
                  <h3 className="font-semibold mb-2">Watch It Grow</h3>
                  <p className="text-sm text-muted-foreground">
                    Monitor your portfolio performance and watch your investments grow over time.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
