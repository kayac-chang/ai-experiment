import { match } from 'ts-pattern';
import { Bar, BarChart, CartesianGrid, Cell, XAxis, YAxis } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '~/components/ui/chart';
import { compactFormatter, percentFormatter } from '~/lib/formatters';
import { useSentimentInfluencerData } from './loader';

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
  const data = useSentimentInfluencerData();
  const displayData = [...data].sort((a, b) => b.mentions - a.mentions);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Influencers by Mentions</CardTitle>
        <CardDescription data-desc className="mt-2">
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
                            <strong
                              style={{
                                color: getSentimentColor(item.sentiment),
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
                            </strong>{' '}
                            ({percentFormatter.format(item.sentiment)})
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
