import { match } from 'ts-pattern';
import { Bar, BarChart, CartesianGrid, Cell, XAxis, YAxis } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '~/components/ui/chart';
import { compactFormatter } from '~/lib/formatters';

// Mock data for top influencers with mentions and sentiment
const influencerData = [
  {
    name: '@techguru',
    mentions: 1250,
    sentiment: 0.78, // Positive sentiment (0 to 1 scale)
  },
  {
    name: '@marketwatch',
    mentions: 980,
    sentiment: 0.65,
  },
  {
    name: '@newsbreaker',
    mentions: 850,
    sentiment: 0.42, // Neutral sentiment
  },
  {
    name: '@criticreview',
    mentions: 720,
    sentiment: 0.15, // Negative sentiment
  },
  {
    name: '@industryinsider',
    mentions: 680,
    sentiment: 0.55,
  },
  {
    name: '@trendspotter',
    mentions: 590,
    sentiment: 0.82,
  },
  {
    name: '@analyticspro',
    mentions: 520,
    sentiment: 0.35,
  },
  {
    name: '@techcritic',
    mentions: 480,
    sentiment: 0.25,
  },
  {
    name: '@productreview',
    mentions: 420,
    sentiment: 0.68,
  },
  {
    name: '@marketanalyst',
    mentions: 380,
    sentiment: 0.48,
  },
];

// Sort data by mentions in descending order
const sortedData = [...influencerData].sort((a, b) => b.mentions - a.mentions);

// Function to determine bar color based on sentiment
const getSentimentColor = (sentiment: number) => {
  if (sentiment >= 0.6) return 'var(--chart-5)'; // Positive - green
  if (sentiment >= 0.4) return 'var(--chart-3)'; // Neutral - blue
  return 'var(--chart-2)'; // Negative - red
};

// Chart configuration
const chartConfig = {
  mentions: {
    label: 'Mentions',
    color: 'var(--chart-4)',
  },
  positive: {
    label: 'Positive',
    color: 'var(--chart-5)',
  },
  neutral: {
    label: 'Neutral',
    color: 'var(--chart-3)',
  },
  negative: {
    label: 'Negative',
    color: 'var(--chart-2)',
  },
} satisfies ChartConfig;

function Influencer() {
  const displayData = sortedData;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Influencers by Mentions</CardTitle>
        <CardDescription className="mt-2 max-w-xl leading-6">
          Shows the most mentioned influencers across social media platforms, with bars colored by
          sentiment. Green indicates positive sentiment, blue indicates neutral, and red indicates
          negative sentiment.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="mt-4 h-[60vh] w-full">
          <BarChart data={displayData} accessibilityLayer layout="vertical" barSize={20}>
            <ChartTooltip
              content={
                <ChartTooltipContent
                  valueFormatter={(value) => compactFormatter.format(value)}
                  formatter={(_value, _name, entry) => {
                    const item = entry.payload;
                    return (
                      <div className="grid gap-2">
                        <div className="flex items-center justify-between gap-2">
                          <span>Mentions:</span>
                          <span className="font-mono font-medium">
                            {compactFormatter.format(item.mentions)}
                          </span>
                        </div>
                        <div className="flex items-center justify-between gap-2">
                          <span>Sentiment:</span>
                          <span className="font-mono font-medium">
                            <span
                              style={{
                                color: getSentimentColor(item.sentiment),
                                fontWeight: 'bold',
                              }}
                            >
                              {match(item.sentiment)
                                .when(
                                  (s) => s >= 0.6,
                                  () => 'positive'
                                )
                                .when(
                                  (s) => s >= 0.4,
                                  () => 'neutral'
                                )
                                .otherwise(() => 'negative')}
                            </span>{' '}
                            ({(item.sentiment * 100).toFixed(0)}%)
                          </span>
                        </div>
                      </div>
                    );
                  }}
                />
              }
            />
            <CartesianGrid strokeDasharray="3 3" horizontal={false} />
            <YAxis dataKey="name" type="category" width={110} tickMargin={10} />
            <XAxis type="number" tickFormatter={(value) => compactFormatter.format(value)} />
            <Bar dataKey="mentions" fillOpacity={0.9} strokeWidth={1} radius={[0, 4, 4, 0]}>
              {
                // Apply different colors based on sentiment
                displayData.map((entry) => (
                  <Cell key={`cell-${entry.name}`} fill={getSentimentColor(entry.sentiment)} />
                ))
              }
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

export default Influencer;
