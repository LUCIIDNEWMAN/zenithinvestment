"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import type { AssetAllocation } from "@/lib/analytics-data"

interface AssetAllocationChartProps {
  data: AssetAllocation[]
}

export function AssetAllocationChart({ data }: AssetAllocationChartProps) {
  return (
    <ChartContainer
      config={{
        stocks: { label: "Stocks", color: "hsl(var(--chart-1))" },
        bonds: { label: "Bonds", color: "hsl(var(--chart-2))" },
        etfs: { label: "ETFs", color: "hsl(var(--chart-3))" },
        cash: { label: "Cash", color: "hsl(var(--chart-4))" },
      }}
      className="h-[300px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ type, percentage }) => `${type}: ${percentage}%`}
            outerRadius={80}
            fill="#8884d8"
            dataKey="percentage"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <ChartTooltip content={<ChartTooltipContent />} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
