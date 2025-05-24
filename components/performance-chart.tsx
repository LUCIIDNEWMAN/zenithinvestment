"use client"

import { Line, LineChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import type { PerformanceData } from "@/lib/analytics-data"

interface PerformanceChartProps {
  data: PerformanceData[]
}

export function PerformanceChart({ data }: PerformanceChartProps) {
  return (
    <ChartContainer
      config={{
        portfolio: {
          label: "Your Portfolio",
          color: "hsl(var(--chart-1))",
        },
        benchmark: {
          label: "S&P 500",
          color: "hsl(var(--chart-2))",
        },
        market: {
          label: "Market Average",
          color: "hsl(var(--chart-3))",
        },
      }}
      className="h-[400px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Legend />
          <Line
            type="monotone"
            dataKey="portfolio"
            stroke="var(--color-portfolio)"
            strokeWidth={3}
            name="Your Portfolio"
          />
          <Line type="monotone" dataKey="benchmark" stroke="var(--color-benchmark)" strokeWidth={2} name="S&P 500" />
          <Line
            type="monotone"
            dataKey="market"
            stroke="var(--color-market)"
            strokeWidth={2}
            strokeDasharray="5 5"
            name="Market Average"
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
