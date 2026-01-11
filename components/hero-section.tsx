"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, TrendingUp, Shield, Zap } from "lucide-react"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="relative py-12 sm:py-20 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/5 to-primary/5 opacity-60" />
      <div className="absolute top-0 right-1/4 w-48 sm:w-96 h-48 sm:h-96 bg-accent/20 rounded-full blur-3xl animate-pulse-subtle" />
      <div
        className="absolute bottom-0 left-1/4 w-48 sm:w-96 h-48 sm:h-96 bg-primary/20 rounded-full blur-3xl animate-pulse-subtle"
        style={{ animationDelay: "1s" }}
      />

      <div className="container relative px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
          <div className="space-y-6 sm:space-y-8 animate-fade-in-left">
            <div className="space-y-3 sm:space-y-4">
              <div className="inline-block px-3 sm:px-4 py-2 bg-accent/10 rounded-full border border-accent/30 animate-fade-in-down">
                <span className="text-xs sm:text-sm font-medium text-accent">Institutional Grade Platform</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold tracking-tight transition-smooth">
                Reach Your{" "}
                <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-pulse-subtle">
                  Investment
                </span>{" "}
                Zenith
              </h1>
              <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-lg transition-smooth hover:text-foreground">
                Professional wealth management platform offering superior returns through expert portfolio optimization.
              </p>
            </div>

            <div
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 animate-fade-in-up"
              style={{ animationDelay: "0.2s" }}
            >
              <Button
                size="lg"
                className="text-base sm:text-lg px-6 sm:px-8 transition-smooth hover-lift hover-glow group"
                asChild
              >
                <Link href="/signup">
                  Start Investing
                  <ArrowRight className="ml-2 h-5 w-5 transition-smooth group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-base sm:text-lg px-6 sm:px-8 transition-smooth hover-lift bg-transparent"
                asChild
              >
                <Link href="/how-we-work">Learn More</Link>
              </Button>
            </div>

            <div
              className="grid grid-cols-3 gap-4 sm:gap-8 pt-6 sm:pt-8 animate-fade-in-up"
              style={{ animationDelay: "0.4s" }}
            >
              {[
                { value: "$1M+", label: "Assets Managed" },
                { value: "150K+", label: "Active Users" },
                { value: "12.8%", label: "Avg. Returns" },
              ].map((stat, idx) => (
                <div key={idx} className="text-center group hover:scale-105 transition-smooth">
                  <div className="text-xl sm:text-2xl font-bold group-hover:text-accent transition-smooth">
                    {stat.value}
                  </div>
                  <div className="text-xs sm:text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4 sm:space-y-6 animate-fade-in-right">
            <Card className="p-4 sm:p-6 bg-gradient-to-br from-primary/10 to-accent/10 border-primary/30 transition-smooth hover-lift hover-glow group">
              <CardContent className="p-0">
                <div className="flex items-center space-x-3 sm:space-x-4 mb-4">
                  <div className="p-2 sm:p-3 bg-accent/20 rounded-lg group-hover:bg-accent/30 transition-smooth">
                    <TrendingUp className="h-6 sm:h-8 w-6 sm:w-8 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm sm:text-base group-hover:text-accent transition-smooth">
                      Smart Analytics
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground">AI-powered insights</p>
                  </div>
                </div>
                <div className="h-24 sm:h-32 bg-gradient-to-r from-primary/20 to-accent/20 rounded-lg flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer" />
                  <div className="text-center relative z-10">
                    <div className="text-xl sm:text-2xl font-bold text-accent">+24.5%</div>
                    <div className="text-xs sm:text-sm">Portfolio Growth</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {[
                { icon: Shield, label: "Secure", desc: "Bank-level security", color: "green" },
                { icon: Zap, label: "Fast", desc: "Real-time trading", color: "yellow" },
              ].map((feature, idx) => (
                <Card key={idx} className="p-3 sm:p-4 transition-smooth hover-lift hover-glow cursor-pointer group">
                  <CardContent className="p-0 flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-3">
                    <div
                      className={`p-2 rounded-lg ${
                        feature.color === "green" ? "bg-green-500/20" : "bg-yellow-500/20"
                      } group-hover:scale-110 transition-smooth`}
                    >
                      <feature.icon
                        className={`h-5 sm:h-6 w-5 sm:w-6 ${feature.color === "green" ? "text-green-500" : "text-yellow-500"}`}
                      />
                    </div>
                    <div className="text-center sm:text-left">
                      <div className="font-medium text-sm sm:text-base group-hover:text-accent transition-smooth">
                        {feature.label}
                      </div>
                      <div className="text-xs text-muted-foreground">{feature.desc}</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
