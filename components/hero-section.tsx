"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, TrendingUp, Shield, Zap } from "lucide-react"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="relative py-20 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-blue-500/5 to-purple-500/5" />
      <div className="container relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold tracking-tight">
                Reach Your{" "}
                <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                  Investment
                </span>{" "}
                Zenith
              </h1>
              <p className="text-xl text-muted-foreground max-w-lg">
                Advanced portfolio management, real-time market insights, and AI-powered investment strategies to
                maximize your returns.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="text-lg px-8" asChild>
                <Link href="/signup">
                  Start Investing
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-8 pt-8">
              <div className="text-center">
                <div className="text-2xl font-bold">$1M+</div>
                <div className="text-sm text-muted-foreground">Assets Managed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">150K+</div>
                <div className="text-sm text-muted-foreground">Active Users</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">12.8%</div>
                <div className="text-sm text-muted-foreground">Avg. Returns</div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <Card className="p-6 bg-gradient-to-br from-primary/10 to-blue-500/10 border-primary/20">
              <CardContent className="p-0">
                <div className="flex items-center space-x-4 mb-4">
                  <TrendingUp className="h-8 w-8 text-primary" />
                  <div>
                    <h3 className="font-semibold">Smart Analytics</h3>
                    <p className="text-sm text-muted-foreground">AI-powered insights</p>
                  </div>
                </div>
                <div className="h-32 bg-gradient-to-r from-primary/20 to-blue-500/20 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">+24.5%</div>
                    <div className="text-sm">Portfolio Growth</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-2 gap-4">
              <Card className="p-4">
                <CardContent className="p-0 flex items-center space-x-3">
                  <Shield className="h-6 w-6 text-green-500" />
                  <div>
                    <div className="font-medium">Secure</div>
                    <div className="text-xs text-muted-foreground">Bank-level security</div>
                  </div>
                </CardContent>
              </Card>
              <Card className="p-4">
                <CardContent className="p-0 flex items-center space-x-3">
                  <Zap className="h-6 w-6 text-yellow-500" />
                  <div>
                    <div className="font-medium">Fast</div>
                    <div className="text-xs text-muted-foreground">Real-time trading</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
