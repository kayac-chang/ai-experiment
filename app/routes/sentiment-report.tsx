import { TrendingUpIcon, RepeatIcon, HeartIcon, MessageCircleIcon } from 'lucide-react';
import KPICard from '~/components/kpi-card';
import SentimentTrends from './sentiment-trends';
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

        <div className="mt-4">
          <SentimentTrends />
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
