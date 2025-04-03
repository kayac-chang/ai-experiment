import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card';
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '~/components/ui/chart';
import { Percent } from 'lucide-react';
import { Toggle } from '~/components/ui/toggle';
import { useState } from 'react';
import { percentFormatter, compactFormatter } from '~/lib/formatters';

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

const rawData = [
  {
    source: 'x.com',
    positive: 1000,
    negative: 5000,
    neutral: 700,
  },
  {
    source: 'threads',
    positive: 2500,
    negative: 1200,
    neutral: 800,
  },
  {
    source: 'reddit',
    positive: 1800,
    negative: 3200,
    neutral: 1500,
  },
  {
    source: 'tiktok',
    positive: 3500,
    negative: 900,
    neutral: 1200,
  },
];

const percentData = rawData.map((item) => {
  const total = item.positive + item.negative + item.neutral;
  return {
    source: item.source,
    positive: item.positive / total,
    negative: item.negative / total,
    neutral: item.neutral / total,
  };
});

const formatNumber =
  (format: 'percent' | 'number' = 'number') =>
  (value: number) => {
    if (format === 'percent') {
      return percentFormatter.format(value);
    }
    return compactFormatter.format(value);
  };

function SentimentBySources() {
  const [showPercentage, setShowPercentage] = useState(false);

  return (
    <Card className="relative flex-row">
      <div className="flex-1">
        <CardHeader>
          <div className="flex justify-between">
            <div>
              <CardTitle>Sentiment By Sources</CardTitle>
              <CardDescription className="mt-2 max-w-xl leading-6">
                Compares sentiment trends across different social media platforms, such as Twitter,
                Reddit, or Facebook. Reveals how sentiment varies depending on the data source.
              </CardDescription>
            </div>

            <Toggle
              className="absolute top-0 right-0 sm:static"
              variant="outline"
              aria-label="Toggle Percentage"
              pressed={showPercentage}
              onPressedChange={setShowPercentage}
            >
              <Percent />
            </Toggle>
          </div>
        </CardHeader>

        <CardContent className="mt-4">
          <ChartContainer config={chartConfig} className="max-h-[40vh] w-full">
            <BarChart
              data={showPercentage ? percentData : rawData}
              accessibilityLayer
              layout="vertical"
              barSize={20}
            >
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    valueFormatter={formatNumber(showPercentage ? 'percent' : 'number')}
                  />
                }
              />
              <ChartLegend content={<ChartLegendContent />} />
              <CartesianGrid horizontal={false} />
              <YAxis dataKey="source" type="category" tickMargin={10} />
              <XAxis
                type="number"
                domain={showPercentage ? [0, 1] : undefined}
                tickFormatter={formatNumber(showPercentage ? 'percent' : 'number')}
              />
              <Bar dataKey="positive" stackId="sentiment" fill="var(--color-positive)" />
              <Bar dataKey="negative" stackId="sentiment" fill="var(--color-negative)" />
              <Bar dataKey="neutral" stackId="sentiment" fill="var(--color-neutral)" />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </div>
    </Card>
  );
}
export default SentimentBySources;
