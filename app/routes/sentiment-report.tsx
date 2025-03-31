import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '~/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

// Types for our sentiment data
type SentimentSource = {
  platform: string;
  positive: number;
  negative: number;
  neutral: number;
};

type SentimentData = {
  sources: SentimentSource[];
  topPositive: {
    platform: string;
    count: number;
  };
  topNegative: {
    platform: string;
    count: number;
  };
};

// Mock data for demonstration
const mockSentimentData: SentimentData = {
  sources: [
    { platform: 'x.com', positive: 500, negative: 2000, neutral: 1000 },
    { platform: 'threads', positive: 400, negative: 800, neutral: 800 },
    { platform: 'reddit', positive: 1000, negative: 2000, neutral: 1000 },
    { platform: 'tiktok', positive: 300, negative: 2000, neutral: 1000 },
    { platform: '小红书', positive: 400, negative: 2000, neutral: 1000 },
  ],
  topPositive: {
    platform: 'reddit',
    count: 1000,
  },
  topNegative: {
    platform: 'x.com',
    count: 2000,
  },
};

const chartConfig = {
  positive: {
    label: 'Positive',
    color: 'hsl(var(--chart-1))',
  },
  negative: {
    label: 'Negative',
    color: 'hsl(var(--chart-2))',
  },
  neutral: {
    label: 'Neutral',
    color: 'var(--secondary-foreground)',
  },
} satisfies ChartConfig;

export default function SentimentReport() {
  return (
    <div className="container mx-auto space-y-20 p-8">
      <h1>Sentiment analysis report for Binance</h1>

      {/* Insight Section */}
      <section>
        <h2>Insight</h2>

        <p className="mt-8">
          Analysis shows varied sentiment across platforms with notable trends in community
          engagement and market perception.
        </p>
      </section>

      {/* Sentiment by Source Section */}
      <section>
        <h2>Sentiment By Source</h2>

        {/* @TODO: Top Sources Cards */}

        {/* Sentiment Distribution Chart */}
        <ChartContainer config={chartConfig} className="mt-8 h-[30vh] w-full">
          <BarChart
            accessibilityLayer
            data={mockSentimentData.sources}
            layout="vertical"
            barSize={24}
          >
            <CartesianGrid horizontal={false} />
            <XAxis type="number" />
            <YAxis
              type="category"
              dataKey="platform"
              // axisLine={false}
              // tickLine={false}
            />
            <Bar dataKey="positive" fill={chartConfig.positive.color} stackId="sentiment" />
            <Bar dataKey="negative" fill={chartConfig.negative.color} stackId="sentiment" />
            <Bar dataKey="neutral" fill={chartConfig.neutral.color} stackId="sentiment" />
          </BarChart>
        </ChartContainer>
      </section>
    </div>
  );
}
