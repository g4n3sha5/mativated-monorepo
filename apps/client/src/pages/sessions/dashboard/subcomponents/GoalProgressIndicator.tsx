import { TrendingUp } from 'lucide-react';
import { Label, PolarGrid, PolarRadiusAxis, RadialBar, RadialBarChart } from 'recharts';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/Card';
import { ChartConfig, ChartContainer } from '@/components/ui/Chart';

interface Props {}

const chartData = [{ progress: '60%', fill: '#545454' }];

const chartConfig = {
  progress: {
    label: 'Progress',
  },
} satisfies ChartConfig;

export const GoalProgressIndicator = ({}: Props) => {
  return (
    <div className="w-64 h-64">
      <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[250px]">
        <RadialBarChart data={chartData} endAngle={100} innerRadius={80} outerRadius={140}>
          <PolarGrid
            gridType="circle"
            radialLines={false}
            className="first:fill-white last:fill-white"
            polarRadius={[89, 74]}
          />
          <RadialBar dataKey="visitors" background />
          <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
            <Label
              content={({ viewBox }) => {
                if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                  return (
                    <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                      <tspan x={viewBox.cx} y={viewBox.cy} className="fill-foreground text-4xl font-bold">
                        {chartData[0].progress.toLocaleString()}
                      </tspan>
                      <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 24} className="fill-black">
                        Goal Progress
                      </tspan>
                    </text>
                  );
                }
              }}
            />
          </PolarRadiusAxis>
        </RadialBarChart>
      </ChartContainer>
    </div>
  );
};
