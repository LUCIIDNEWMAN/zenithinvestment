import { Header } from "@/components/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Brain, BarChart3, Shield, Target, Users, TrendingUp, RefreshCw } from "lucide-react"

export default function HowWeWorkPage() {
  const process = [
    {
      step: 1,
      title: "Risk Assessment",
      description:
        "We start by understanding your financial goals, risk tolerance, and investment timeline through our comprehensive questionnaire.",
      icon: Target,
      details: [
        "Personal financial assessment",
        "Risk tolerance evaluation",
        "Goal setting and timeline",
        "Investment preferences",
      ],
    },
    {
      step: 2,
      title: "AI Portfolio Construction",
      description:
        "Our advanced algorithms analyze thousands of assets and market conditions to build your optimal portfolio.",
      icon: Brain,
      details: [
        "Asset selection and weighting",
        "Risk-return optimization",
        "Correlation analysis",
        "Market condition assessment",
      ],
    },
    {
      step: 3,
      title: "Continuous Monitoring",
      description:
        "We monitor your portfolio 24/7, tracking performance and market changes to ensure optimal positioning.",
      icon: BarChart3,
      details: [
        "Real-time performance tracking",
        "Market condition monitoring",
        "Risk metric analysis",
        "Opportunity identification",
      ],
    },
    {
      step: 4,
      title: "Automatic Rebalancing",
      description:
        "When your portfolio drifts from target allocation, we automatically rebalance to maintain optimal risk-return profile.",
      icon: RefreshCw,
      details: ["Drift detection", "Tax-efficient rebalancing", "Cost optimization", "Performance enhancement"],
    },
  ]

  const methodology = [
    {
      title: "Modern Portfolio Theory",
      description:
        "We use Nobel Prize-winning portfolio optimization techniques to maximize returns for a given level of risk.",
      icon: TrendingUp,
    },
    {
      title: "Factor Investing",
      description:
        "Our strategies target specific risk factors that have historically provided excess returns over time.",
      icon: BarChart3,
    },
    {
      title: "Machine Learning",
      description: "Advanced AI algorithms continuously learn from market data to improve investment decisions.",
      icon: Brain,
    },
    {
      title: "Risk Management",
      description:
        "Sophisticated risk controls and diversification strategies protect your portfolio from major losses.",
      icon: Shield,
    },
  ]

  const features = [
    {
      title: "Tax Optimization",
      description: "Automatic tax-loss harvesting and tax-efficient fund placement to maximize after-tax returns.",
      benefit: "Save up to 1.5% annually in taxes",
    },
    {
      title: "Low-Cost ETFs",
      description: "We primarily use low-cost index funds and ETFs to minimize fees and maximize your returns.",
      benefit: "Average expense ratio of 0.08%",
    },
    {
      title: "Fractional Shares",
      description:
        "Invest any amount with fractional shares, ensuring optimal diversification regardless of account size.",
      benefit: "No minimum investment barriers",
    },
    {
      title: "Automatic Deposits",
      description: "Set up recurring investments to dollar-cost average into the market over time.",
      benefit: "Reduce timing risk and build wealth consistently",
    },
  ]

  const security = [
    {
      title: "Bank-Level Security",
      description: "256-bit SSL encryption and multi-factor authentication protect your account and data.",
      icon: Shield,
    },
    {
      title: "SIPC Protection",
      description: "Your investments are protected up to $500,000 by the Securities Investor Protection Corporation.",
      icon: Users,
    },
    {
      title: "Regulatory Compliance",
      description: "We're registered with the SEC and comply with all applicable financial regulations.",
      icon: Badge,
    },
    {
      title: "Segregated Assets",
      description: "Your investments are held separately from company assets at our custodian partner.",
      icon: Shield,
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative py-16 lg:py-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-blue-500/5 to-purple-500/5" />
          <div className="container relative">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-4xl lg:text-5xl font-bold tracking-tight mb-6">
                How{" "}
                <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">ZENITH</span>{" "}
                Works
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Discover our systematic approach to investment management, combining cutting-edge technology with
                time-tested investment principles to help you achieve your financial goals.
              </p>
            </div>
          </div>
        </section>

        {/* Investment Process */}
        <section className="py-16">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Our Investment Process</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                A systematic, four-step approach that combines human expertise with artificial intelligence to optimize
                your investment outcomes.
              </p>
            </div>
            <div className="space-y-12">
              {process.map((step, index) => {
                const Icon = step.icon
                return (
                  <div
                    key={step.step}
                    className={`flex items-center gap-12 ${index % 2 === 1 ? "flex-row-reverse" : ""}`}
                  >
                    <div className="flex-1">
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                          <span className="font-bold text-primary">{step.step}</span>
                        </div>
                        <h3 className="text-2xl font-bold">{step.title}</h3>
                      </div>
                      <p className="text-muted-foreground mb-6">{step.description}</p>
                      <div className="grid grid-cols-2 gap-2">
                        {step.details.map((detail) => (
                          <div key={detail} className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-primary rounded-full" />
                            <span className="text-sm">{detail}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="flex-1">
                      <Card className="p-8 bg-gradient-to-br from-primary/5 to-blue-500/5">
                        <CardContent className="p-0 text-center">
                          <Icon className="h-24 w-24 text-primary mx-auto mb-4" />
                          <div className="text-lg font-semibold">Step {step.step}</div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Investment Methodology */}
        <section className="py-16 bg-muted/30">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Investment Methodology</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Our investment approach is built on proven academic research and enhanced with modern technology.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {methodology.map((method) => {
                const Icon = method.icon
                return (
                  <Card key={method.title} className="p-6">
                    <CardContent className="p-0 text-center">
                      <Icon className="h-12 w-12 text-primary mx-auto mb-4" />
                      <h3 className="font-semibold mb-2">{method.title}</h3>
                      <p className="text-sm text-muted-foreground">{method.description}</p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        {/* Key Features */}
        <section className="py-16">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Platform Features</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Advanced features designed to optimize your investment experience and maximize returns.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              {features.map((feature) => (
                <Card key={feature.title}>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      {feature.title}
                      <Badge variant="secondary">{feature.benefit}</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Security & Trust */}
        <section className="py-16 bg-muted/30">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Security & Trust</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Your security and trust are our top priorities. We employ industry-leading security measures to protect
                your investments and personal information.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {security.map((item) => {
                const Icon = item.icon
                return (
                  <Card key={item.title} className="p-6 text-center">
                    <CardContent className="p-0">
                      <Icon className="h-12 w-12 text-primary mx-auto mb-4" />
                      <h3 className="font-semibold mb-2">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        {/* Performance Transparency */}
        <section className="py-16">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Performance Transparency</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                We believe in complete transparency. Track your portfolio performance in real-time and understand
                exactly how your investments are performing.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="p-6 text-center">
                <CardContent className="p-0">
                  <div className="text-3xl font-bold text-green-600 mb-2">15.2%</div>
                  <div className="text-sm font-medium mb-1">Average Annual Return</div>
                  <div className="text-xs text-muted-foreground">Net of fees, since inception</div>
                </CardContent>
              </Card>
              <Card className="p-6 text-center">
                <CardContent className="p-0">
                  <div className="text-3xl font-bold text-blue-600 mb-2">1.42</div>
                  <div className="text-sm font-medium mb-1">Sharpe Ratio</div>
                  <div className="text-xs text-muted-foreground">Risk-adjusted performance measure</div>
                </CardContent>
              </Card>
              <Card className="p-6 text-center">
                <CardContent className="p-0">
                  <div className="text-3xl font-bold text-purple-600 mb-2">0.25%</div>
                  <div className="text-sm font-medium mb-1">Annual Management Fee</div>
                  <div className="text-xs text-muted-foreground">No hidden fees or commissions</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
