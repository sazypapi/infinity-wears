"use client";

import { useState, useEffect } from "react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { formatCurrency } from "../../utils/format";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

type RevenueData = {
  date: string;
  revenue: number;
};

const chartConfig = {
  revenue: {
    label: "Revenue",
    color: "#000000",
  },
} satisfies ChartConfig;

function RevenueChart({ data }: { data: RevenueData[] }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640); // sm breakpoint
    handleResize(); // set initial
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="border-2 border-neutral-100 shadow-xs rounded-sm p-1 mt-5">
      <p className="text-xs text-black mb-4">Revenue over time</p>
      <ChartContainer config={chartConfig} className="h-[300px] w-full">
        <BarChart accessibilityLayer data={data} barCategoryGap="40%">
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="date"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tick={{ fontSize: 10, fill: "#000000" }}
            className="sm:inline hidden"
          />
          {!isMobile && (
            <YAxis
              tickFormatter={(value) => formatCurrency(value)}
              tick={{ fontSize: 10, fill: "#000000" }}
              tickLine={false}
              axisLine={false}
              width={80}
            />
          )}
          <ChartTooltip
            content={
              <ChartTooltipContent
                formatter={(value) => formatCurrency(Number(value))}
              />
            }
          />
          <Bar
            dataKey="revenue"
            fill="var(--color-revenue)"
            radius={4}
            maxBarSize={60}
          />
        </BarChart>
      </ChartContainer>
    </div>
  );
}

export default RevenueChart;
