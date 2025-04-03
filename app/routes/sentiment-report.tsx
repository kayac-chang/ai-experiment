import { TrendingUpIcon, RepeatIcon, HeartIcon, MessageCircleIcon } from 'lucide-react';
import KPICard from '~/components/kpi-card';
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '~/components/ui/chart';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Label,
  Line,
  LineChart,
  Pie,
  PieChart,
  XAxis,
  YAxis,
} from 'recharts';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '~/components/ui/table';
import SentimentBySources from './sentiment-by-sources';

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

export default function SentimentReport() {
  return (
    <div className="@container/main flex flex-col gap-20 py-4 md:py-6 md:pb-32">
      <h1 className="container mx-auto">Sentiment Analysis Report</h1>

      {/* overview */}
      <section className="container mx-auto">
        <h2>Overview</h2>
        <p className="mt-2">
          Provides a high-level summary of the sentiment data collected from the sources.
        </p>
      </section>

      {/* key metrics */}
      <section className="container mx-auto">
        <h2>Key Metrics</h2>

        <div className="mt-4 grid grid-cols-1 gap-4 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
          {/* Total Number Of Tweets */}
          <KPICard.Root>
            {/* card header */}
            <KPICard.Header>
              <KPICard.Description>Total Number Of Tweets</KPICard.Description>
              <KPICard.Title>1,250</KPICard.Title>

              <KPICard.Badge>
                <TrendingUpIcon className="size-3" />
                +12.5%
              </KPICard.Badge>
            </KPICard.Header>

            {/* card footer */}
            <KPICard.Footer>
              <div className="line-clamp-1 flex gap-2 font-medium">
                Trending up this month <TrendingUpIcon className="size-4" />
              </div>
              <div className="text-muted-foreground">Tweets over the last 6 months</div>
            </KPICard.Footer>
          </KPICard.Root>

          {/* Average Retweets */}
          <KPICard.Root>
            {/* card header */}
            <KPICard.Header>
              <KPICard.Description>Average Retweets</KPICard.Description>
              <KPICard.Title>45</KPICard.Title>

              <KPICard.Badge>
                <TrendingUpIcon className="size-3" />
                +8.2%
              </KPICard.Badge>
            </KPICard.Header>

            {/* card footer */}
            <KPICard.Footer>
              <div className="line-clamp-1 flex gap-2 font-medium">
                <RepeatIcon className="size-4" /> Per tweet
              </div>
              <div className="text-muted-foreground">Based on last 100 tweets</div>
            </KPICard.Footer>
          </KPICard.Root>

          {/* Average Likes */}
          <KPICard.Root>
            {/* card header */}
            <KPICard.Header>
              <KPICard.Description>Average Likes</KPICard.Description>
              <KPICard.Title>120</KPICard.Title>

              <KPICard.Badge>
                <TrendingUpIcon className="size-3" />
                +15.3%
              </KPICard.Badge>
            </KPICard.Header>

            {/* card footer */}
            <KPICard.Footer>
              <div className="line-clamp-1 flex gap-2 font-medium">
                <HeartIcon className="size-4" /> Per tweet
              </div>
              <div className="text-muted-foreground">Based on last 100 tweets</div>
            </KPICard.Footer>
          </KPICard.Root>

          {/* Average Replies */}
          <KPICard.Root>
            {/* card header */}
            <KPICard.Header>
              <KPICard.Description>Average Replies</KPICard.Description>
              <KPICard.Title>12</KPICard.Title>

              <KPICard.Badge>
                <TrendingUpIcon className="size-3" />
                +5.7%
              </KPICard.Badge>
            </KPICard.Header>

            {/* card footer */}
            <KPICard.Footer>
              <div className="line-clamp-1 flex gap-2 font-medium">
                <MessageCircleIcon className="size-4" /> Per tweet
              </div>
              <div className="text-muted-foreground">Based on last 100 tweets</div>
            </KPICard.Footer>
          </KPICard.Root>
        </div>
      </section>

      {/* sentiment breakdown */}
      <section className="container mx-auto">
        <h2>Sentiment Breakdown</h2>

        <div className="mt-4">
          <SentimentBySources />
        </div>

        <div className="mt-4 rounded-xl border p-6 py-12">
          <ChartContainer config={chartConfig} className="h-[50vh] w-full">
            <LineChart
              accessibilityLayer
              data={[
                { date: 'Apr 1', positive: 42, negative: 18, neutral: 25 },
                { date: 'Apr 3', positive: 48, negative: 22, neutral: 30 },
                { date: 'Apr 5', positive: 55, negative: 20, neutral: 28 },
                { date: 'Apr 7', positive: 60, negative: 25, neutral: 32 },
                { date: 'Apr 9', positive: 58, negative: 30, neutral: 35 },
                { date: 'Apr 11', positive: 65, negative: 28, neutral: 30 },
                { date: 'Apr 13', positive: 70, negative: 32, neutral: 38 },
                { date: 'Apr 15', positive: 75, negative: 35, neutral: 40 },
                { date: 'Apr 17', positive: 80, negative: 30, neutral: 42 },
                { date: 'Apr 19', positive: 85, negative: 28, neutral: 45 },
                { date: 'Apr 21', positive: 90, negative: 32, neutral: 48 },
                { date: 'Apr 23', positive: 95, negative: 35, neutral: 50 },
                { date: 'Apr 25', positive: 100, negative: 38, neutral: 52 },
                { date: 'Apr 27', positive: 105, negative: 40, neutral: 55 },
                { date: 'Apr 29', positive: 110, negative: 42, neutral: 58 },
              ]}
            >
              <ChartTooltip content={<ChartTooltipContent />} />
              <ChartLegend content={<ChartLegendContent />} />
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis>
                <Label
                  value="Tweet Volume"
                  angle={-90}
                  position="insideLeft"
                  style={{ textAnchor: 'middle' }}
                />
              </YAxis>
              <Line
                type="monotone"
                dataKey="positive"
                stroke={chartConfig.positive.color}
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="negative"
                stroke={chartConfig.negative.color}
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="neutral"
                stroke={chartConfig.neutral.color}
                strokeWidth={2}
              />
            </LineChart>
          </ChartContainer>
        </div>
      </section>

      {/* topics */}
      <section className="container mx-auto">
        <h2>Topics</h2>

        <div className="grid gap-8 md:grid-cols-2">
          <Table>
            <TableCaption>A list of your recent invoices.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Invoice</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Method</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">INV001</TableCell>
                <TableCell>Paid</TableCell>
                <TableCell>Credit Card</TableCell>
                <TableCell className="text-right">$250.00</TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <Table>
            <TableCaption>A list of your recent invoices.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Invoice</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Method</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">INV001</TableCell>
                <TableCell>Paid</TableCell>
                <TableCell>Credit Card</TableCell>
                <TableCell className="text-right">$250.00</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </section>

      {/* influencer */}
      <section className="container mx-auto">
        <h2>Influencer</h2>
      </section>
    </div>
  );
}
