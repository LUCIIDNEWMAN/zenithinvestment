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
      <footer className="border-t py-12 bg-muted/30">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-semibold mb-4">ZENITH</h3>
              <p className="text-sm text-muted-foreground">Reach your investment zenith with our advanced platform.</p>
            </div>
            <div>
              <h4 className="font-medium mb-4">Platform</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div>Dashboard</div>
                <div>Portfolio</div>
                <div>Analytics</div>
                <div>Trading</div>
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-4">Resources</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div>Education</div>
                <div>Market News</div>
                <div>Research</div>
                <div>Support</div>
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-4">Company</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div>About</div>
                <div>Careers</div>
                <div>Contact</div>
                <div>Legal</div>
              </div>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            © 2024 ZENITH Investment Platform. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
