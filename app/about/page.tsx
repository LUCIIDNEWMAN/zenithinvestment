import { Header } from "@/components/header"
import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, Users, Shield, Zap } from "lucide-react"

export default function AboutPage() {
  const values = [
    {
      icon: Shield,
      title: "Trust & Security",
      description: "Bank-level security and regulatory compliance to protect your investments and personal data.",
    },
    {
      icon: TrendingUp,
      title: "Performance Excellence",
      description: "Consistently delivering superior risk-adjusted returns through disciplined investment strategies.",
    },
    {
      icon: Users,
      title: "Client-Centric",
      description: "Every decision we make is focused on maximizing value and outcomes for our clients.",
    },
    {
      icon: Zap,
      title: "Innovation",
      description: "Leveraging cutting-edge technology and AI to provide next-generation investment solutions.",
    },
  ]

  const milestones = [
    { year: "2018", event: "ZENITH founded with $10M seed funding" },
    { year: "2019", event: "Launched first AI-powered investment strategies" },
    { year: "2020", event: "Reached $100M in assets under management" },
    { year: "2021", event: "Expanded to international markets" },
    { year: "2022", event: "Achieved $1B+ AUM milestone" },
    { year: "2023", event: "Launched retail investment platform" },
    { year: "2024", event: "Surpassed $2.4B in assets under management" },
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
                About{" "}
                <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">ZENITH</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                We're on a mission to democratize sophisticated investment strategies and help everyone reach their
                financial zenith through technology-driven portfolio management.
              </p>
              <div className="grid md:grid-cols-3 gap-8 mt-12">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">$1M+</div>
                  <div className="text-sm text-muted-foreground">Assets Under Management</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">150K+</div>
                  <div className="text-sm text-muted-foreground">Active Investors</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">6 Years</div>
                  <div className="text-sm text-muted-foreground">Track Record</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-16 bg-muted/30">
          <div className="container">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
                <p className="text-muted-foreground mb-6">
                  To make sophisticated investment strategies accessible to everyone, regardless of their wealth or
                  financial expertise. We believe that advanced portfolio management, powered by artificial intelligence
                  and decades of market research, should not be exclusive to institutional investors.
                </p>
                <p className="text-muted-foreground">
                  Through our platform, we're leveling the playing field and empowering individual investors to achieve
                  their financial goals with the same tools and strategies used by the world's largest investment firms.
                </p>
              </div>
              <div>
                <h2 className="text-3xl font-bold mb-6">Our Vision</h2>
                <p className="text-muted-foreground mb-6">
                  To become the world's most trusted and innovative investment platform, where technology meets human
                  expertise to create superior investment outcomes. We envision a future where every investor has access
                  to institutional-grade portfolio management.
                </p>
                <p className="text-muted-foreground">
                  By 2030, we aim to manage over $50 billion in assets and serve millions of investors worldwide,
                  helping them build wealth and achieve financial independence through our cutting-edge investment
                  solutions.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-16">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Our Values</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                These core principles guide everything we do and shape how we serve our clients and build our platform.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value) => {
                const Icon = value.icon
                return (
                  <Card key={value.title} className="p-6 text-center">
                    <CardContent className="p-0">
                      <Icon className="h-12 w-12 text-primary mx-auto mb-4" />
                      <h3 className="font-semibold mb-2">{value.title}</h3>
                      <p className="text-sm text-muted-foreground">{value.description}</p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        {/* Company Timeline */}
        <section className="py-16 bg-muted/30">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Our Journey</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                From a small startup to a leading investment platform, here are the key milestones in our growth.
              </p>
            </div>
            <div className="max-w-4xl mx-auto">
              <div className="space-y-6">
                {milestones.map((milestone, index) => (
                  <div key={milestone.year} className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="font-bold text-primary">{milestone.year}</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-muted-foreground">{milestone.event}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
