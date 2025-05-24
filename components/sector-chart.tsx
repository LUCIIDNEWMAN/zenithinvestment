"use client"

import { Bar, BarChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import type { SectorAllocation } from "@/lib/analytics-data"

interface SectorChartProps {
  data: SectorAllocation[]
}

export function SectorChart({ data }: SectorChartProps) {
  return (
    <ChartContainer
      config={{
        percentage: {
          label: "Allocation %",
          color: "hsl(var(--chart-1))",
        },
      }}
      className="h-[300px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="sector" angle={-45} textAnchor="end" height={80} fontSize={12} />
          <YAxis />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar dataKey="percentage" fill="var(--color-percentage)" />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
