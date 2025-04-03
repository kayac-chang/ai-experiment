import { CartesianGrid, Line, LineChart, Area, AreaChart, XAxis, YAxis } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card';
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '~/components/ui/chart';
import { ToggleGroup, ToggleGroupItem } from '~/components/ui/toggle-group';
import { Tooltip, TooltipContent, TooltipTrigger } from '~/components/ui/tooltip';
import mockdata from '~/mocks/synthetic_sentiment_xcom_april_2025.json' with { type: 'json' };
import { format } from 'date-fns/format';
import { useState } from 'react';
import { ChartArea, ChartLine } from 'lucide-react';

const chartConfig = {
  positive: {
    label: 'Positive',
    color: 'var(--chart-5)',
  },
  negative: {
    label: 'Negative',
    color: 'var(--chart-2)',
  },
  neutral: {
    label: 'Neutral',
    color: 'var(--chart-3)',
  },
} satisfies ChartConfig;

const sentimentTrendsData = mockdata;

function SentimentTrendsLine() {
  return (
    <ChartContainer config={chartConfig} className="mt-4 h-[50vh] w-full">
      <LineChart accessibilityLayer data={sentimentTrendsData}>
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" tickFormatter={(epoch) => format(epoch, 'MMM/dd')} interval={6} />
        <YAxis />
        <Line type="monotone" dataKey="positive" stroke="var(--color-positive)" strokeWidth={2} />
        <Line type="monotone" dataKey="negative" stroke="var(--color-negative)" strokeWidth={2} />
        <Line type="monotone" dataKey="neutral" stroke="var(--color-neutral)" strokeWidth={2} />
      </LineChart>
    </ChartContainer>
  );
}

function SentimentTrendsArea() {
  return (
    <ChartContainer config={chartConfig} className="mt-4 h-[50vh] w-full">
      <AreaChart accessibilityLayer data={sentimentTrendsData}>
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" tickFormatter={(epoch) => format(epoch, 'MMM/dd')} interval={6} />
        <YAxis />
        <Area
          type="monotone"
          dataKey="positive"
          stroke="var(--color-positive)"
          fill="var(--color-positive)"
          fillOpacity={0.6}
          stackId="sentiment"
        />
        <Area
          type="monotone"
          dataKey="negative"
          stroke="var(--color-negative)"
          fill="var(--color-negative)"
          fillOpacity={0.6}
          stackId="sentiment"
        />
        <Area
          type="monotone"
          dataKey="neutral"
          stroke="var(--color-neutral)"
          fill="var(--color-neutral)"
          fillOpacity={0.6}
          stackId="sentiment"
        />
      </AreaChart>
    </ChartContainer>
  );
}

function SentimentTrends() {
  const [chartType, setChartType] = useState<'line' | 'area'>('line');

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sentiment Trends Across Platforms</CardTitle>
        <CardDescription className="mt-2 max-w-xl leading-6">
          Tracks how sentiment changes over time across X.com, Reddit, and TikTok to identify
          patterns, spikes, or shifts in public opinion. Useful for comparing reactions to specific
          events or campaigns across different social media platforms.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-end">
          <ToggleGroup
            type="single"
            value={chartType}
            onValueChange={(value) => value && setChartType(value as 'line' | 'area')}
            variant="outline"
          >
            <Tooltip>
              <ToggleGroupItem value="line" asChild>
                <TooltipTrigger>
                  <ChartLine />
                </TooltipTrigger>
              </ToggleGroupItem>
              <TooltipContent>Line Chart</TooltipContent>
            </Tooltip>
            <Tooltip>
              <ToggleGroupItem value="area" asChild>
                <TooltipTrigger>
                  <ChartArea />
                </TooltipTrigger>
              </ToggleGroupItem>
              <TooltipContent>Area Chart</TooltipContent>
            </Tooltip>
          </ToggleGroup>
        </div>

        {chartType === 'line' ? <SentimentTrendsLine /> : <SentimentTrendsArea />}
      </CardContent>
    </Card>
  );
}
export default SentimentTrends;
