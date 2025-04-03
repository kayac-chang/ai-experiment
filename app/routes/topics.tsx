import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '~/components/ui/table';
import { Badge } from '~/components/ui/badge';
import { Tooltip, TooltipContent, TooltipTrigger } from '~/components/ui/tooltip';
import { ToggleGroup, ToggleGroupItem } from '~/components/ui/toggle-group';
import {
  ArrowDownIcon,
  ArrowUpIcon,
  ArrowRightIcon,
  BarChart3Icon,
  PieChartIcon,
} from 'lucide-react';

// Mock data for sentiment by topic
const topicSentimentData = [
  {
    id: 1,
    topic: 'Product Launch',
    positive: 65,
    negative: 15,
    neutral: 20,
    total: 100,
    trend: 'up',
    keywords: ['innovation', 'features', 'pricing', 'availability'],
  },
  {
    id: 2,
    topic: 'Customer Service',
    positive: 45,
    negative: 35,
    neutral: 20,
    total: 100,
    trend: 'down',
    keywords: ['response time', 'resolution', 'support', 'helpdesk'],
  },
  {
    id: 3,
    topic: 'Brand Reputation',
    positive: 70,
    negative: 10,
    neutral: 20,
    total: 100,
    trend: 'up',
    keywords: ['trust', 'quality', 'reliability', 'values'],
  },
  {
    id: 4,
    topic: 'Pricing Strategy',
    positive: 30,
    negative: 50,
    neutral: 20,
    total: 100,
    trend: 'down',
    keywords: ['expensive', 'value', 'subscription', 'discount'],
  },
  {
    id: 5,
    topic: 'User Experience',
    positive: 55,
    negative: 25,
    neutral: 20,
    total: 100,
    trend: 'neutral',
    keywords: ['usability', 'interface', 'design', 'accessibility'],
  },
  {
    id: 6,
    topic: 'Competitor Comparison',
    positive: 40,
    negative: 30,
    neutral: 30,
    total: 100,
    trend: 'neutral',
    keywords: ['features', 'price', 'quality', 'alternatives'],
  },
  {
    id: 7,
    topic: 'Marketing Campaign',
    positive: 60,
    negative: 20,
    neutral: 20,
    total: 100,
    trend: 'up',
    keywords: ['creative', 'messaging', 'reach', 'engagement'],
  },
  {
    id: 8,
    topic: 'Social Responsibility',
    positive: 75,
    negative: 5,
    neutral: 20,
    total: 100,
    trend: 'up',
    keywords: ['sustainability', 'ethics', 'community', 'environment'],
  },
];

function SentimentTrendIcon({ trend }: { trend: string }) {
  switch (trend) {
    case 'up':
      return <ArrowUpIcon className="h-4 w-4 text-green-500" />;
    case 'down':
      return <ArrowDownIcon className="h-4 w-4 text-red-500" />;
    default:
      return <ArrowRightIcon className="h-4 w-4 text-yellow-500" />;
  }
}

function SentimentBar({
  positive,
  negative,
  neutral,
}: {
  positive: number;
  negative: number;
  neutral: number;
}) {
  return (
    <div className="flex h-2 w-full overflow-hidden rounded-full">
      <div className="bg-[var(--chart-5)]" style={{ width: `${positive}%` }} />
      <div className="bg-[var(--chart-2)]" style={{ width: `${negative}%` }} />
      <div className="bg-[var(--chart-3)]" style={{ width: `${neutral}%` }} />
    </div>
  );
}

function Topics() {
  const [viewType, setViewType] = useState<'percentage' | 'bar'>('percentage');
  const [sortBy, setSortBy] = useState<'topic' | 'positive' | 'negative' | 'neutral' | 'total'>(
    'topic'
  );
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const handleSort = (column: 'topic' | 'positive' | 'negative' | 'neutral' | 'total') => {
    if (sortBy === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortDirection('asc');
    }
  };

  const sortedData = [...topicSentimentData].sort((a, b) => {
    if (sortBy === 'topic') {
      return sortDirection === 'asc'
        ? a.topic.localeCompare(b.topic)
        : b.topic.localeCompare(a.topic);
    } else {
      return sortDirection === 'asc' ? a[sortBy] - b[sortBy] : b[sortBy] - a[sortBy];
    }
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sentiment by Topic</CardTitle>
        <CardDescription className="mt-2 max-w-xl leading-6">
          Analyzes sentiment distribution across different topics or themes mentioned in social
          media conversations. This helps identify which topics generate positive, negative, or
          neutral reactions.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex justify-end">
          <ToggleGroup
            type="single"
            value={viewType}
            onValueChange={(value) => value && setViewType(value as 'percentage' | 'bar')}
            variant="outline"
          >
            <Tooltip>
              <ToggleGroupItem value="percentage" asChild>
                <TooltipTrigger>
                  <PieChartIcon />
                </TooltipTrigger>
              </ToggleGroupItem>
              <TooltipContent>Percentage View</TooltipContent>
            </Tooltip>
            <Tooltip>
              <ToggleGroupItem value="bar" asChild>
                <TooltipTrigger>
                  <BarChart3Icon />
                </TooltipTrigger>
              </ToggleGroupItem>
              <TooltipContent>Bar View</TooltipContent>
            </Tooltip>
          </ToggleGroup>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="cursor-pointer" onClick={() => handleSort('topic')}>
                Topic {sortBy === 'topic' && (sortDirection === 'asc' ? '↑' : '↓')}
              </TableHead>
              <TableHead
                className="cursor-pointer text-right"
                onClick={() => handleSort('positive')}
              >
                Positive {sortBy === 'positive' && (sortDirection === 'asc' ? '↑' : '↓')}
              </TableHead>
              <TableHead
                className="cursor-pointer text-right"
                onClick={() => handleSort('negative')}
              >
                Negative {sortBy === 'negative' && (sortDirection === 'asc' ? '↑' : '↓')}
              </TableHead>
              <TableHead
                className="cursor-pointer text-right"
                onClick={() => handleSort('neutral')}
              >
                Neutral {sortBy === 'neutral' && (sortDirection === 'asc' ? '↑' : '↓')}
              </TableHead>
              <TableHead className="cursor-pointer text-right" onClick={() => handleSort('total')}>
                Total {sortBy === 'total' && (sortDirection === 'asc' ? '↑' : '↓')}
              </TableHead>
              <TableHead className="text-center">Trend</TableHead>
              <TableHead>Keywords</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedData.map((row) => (
              <TableRow key={row.id}>
                <TableCell className="font-medium">{row.topic}</TableCell>
                <TableCell className="text-right">
                  {viewType === 'percentage' ? (
                    <span className="text-[var(--chart-5)]">{row.positive}%</span>
                  ) : (
                    <div className="bg-muted h-2.5 w-full rounded-full">
                      <div
                        className="h-2.5 rounded-full bg-[var(--chart-5)]"
                        style={{ width: `${row.positive}%` }}
                      ></div>
                    </div>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  {viewType === 'percentage' ? (
                    <span className="text-[var(--chart-2)]">{row.negative}%</span>
                  ) : (
                    <div className="bg-muted h-2.5 w-full rounded-full">
                      <div
                        className="h-2.5 rounded-full bg-[var(--chart-2)]"
                        style={{ width: `${row.negative}%` }}
                      ></div>
                    </div>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  {viewType === 'percentage' ? (
                    <span className="text-[var(--chart-3)]">{row.neutral}%</span>
                  ) : (
                    <div className="bg-muted h-2.5 w-full rounded-full">
                      <div
                        className="h-2.5 rounded-full bg-[var(--chart-3)]"
                        style={{ width: `${row.neutral}%` }}
                      ></div>
                    </div>
                  )}
                </TableCell>
                <TableCell className="text-right">{row.total}</TableCell>
                <TableCell className="text-center">
                  <SentimentTrendIcon trend={row.trend} />
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {row.keywords.map((keyword, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {keyword}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="mt-6">
          <h4 className="mb-2">Sentiment Distribution</h4>
          <div className="space-y-3">
            {sortedData.map((row) => (
              <div key={row.id} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>{row.topic}</span>
                  <span className="flex items-center gap-1">
                    <SentimentTrendIcon trend={row.trend} />
                    <span>{row.positive}% positive</span>
                  </span>
                </div>
                <SentimentBar
                  positive={row.positive}
                  negative={row.negative}
                  neutral={row.neutral}
                />
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default Topics;
