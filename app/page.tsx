import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { MarketData } from "@/components/market-data"
import { InvestmentOptions } from "@/components/investment-options"
import { MarketTicker } from "@/components/market-ticker"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <MarketTicker />
      <main>
        <HeroSection />
        <MarketData />
        <InvestmentOptions />
      </main>
      <footer className="border-t py-8 bg-muted/30">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0">
              <h3 className="font-semibold text-lg">ZENITH</h3>
              <p className="text-sm text-muted-foreground">Reach your investment zenith</p>
            </div>
            <div className="text-center text-sm text-muted-foreground">
              © 2024 ZENITH Investment Platform. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
