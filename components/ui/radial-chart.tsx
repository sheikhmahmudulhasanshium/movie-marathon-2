"use client"

import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ChartConfig, ChartContainer } from "@/components/ui/chart"

interface RadialChartProps {
  voteAverage: number;
}

const createChartData = (value: number) => [
  { name: "Rating", value:(100) , fill: "white" }, // Green for the rating portion
  { name: "Rest", value:value, fill: "green" } // White for the remaining portion
]

const chartConfig: ChartConfig = {
  visitors: {
    label: "Rating",
  },
  safari: {
    label: "Current Vote",
    color: "green",
  },
}

export function RadialChart({ voteAverage }: RadialChartProps) {
  const value = Math.round(voteAverage * 10)
  const chartData = createChartData(value)

  const startAngle = 90
  const endAngle = 360+90 // Calculate endAngle based on voteAverage

  return (
    <Card className="flex flex-col my-6">
      <CardHeader className="items-center pb-0">
        <CardTitle><p className="text-base text-center">Audience Vote (Average)</p></CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig || {}} // Ensure config is not undefined
          className="mx-auto aspect-square max-h-[250px]"
        >
          <RadialBarChart
            width={150}
            height={150}
            cx="50%"
            cy="50%"
            innerRadius={35}
            outerRadius={60}
            barSize={20}
            data={chartData}
            startAngle={startAngle}
            endAngle={endAngle}
          >
            <PolarGrid radialLines={false} />
            <RadialBar
              background
              dataKey="value"
            />
            <PolarRadiusAxis
              angle={90}
              domain={[0, 100]}
              tick={false}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-lg font-bold m-2"
                        >
                          {`${value}%`}
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </PolarRadiusAxis>
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
      
    </Card>
  )
}
