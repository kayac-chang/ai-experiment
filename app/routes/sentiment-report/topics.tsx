import { useState } from 'react';
import { match, P } from 'ts-pattern';
import { BarChart3Icon, PieChartIcon } from 'lucide-react';
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
import { percentFormatter } from '~/lib/formatters';
import { useSentimentTopicsData } from './hooks';

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
      <div className="bg-[var(--chart-5)]" style={{ width: `${positive * 100}%` }} />
      <div className="bg-[var(--chart-2)]" style={{ width: `${negative * 100}%` }} />
      <div className="bg-[var(--chart-3)]" style={{ width: `${neutral * 100}%` }} />
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

  const data = useSentimentTopicsData();

  const sortedData = [...data['percent']].sort((a, b) =>
    match({ sortBy, sortDirection })
      .with({ sortBy: 'topic', sortDirection: 'asc' }, () => a.topic.localeCompare(b.topic))
      .with({ sortBy: 'topic', sortDirection: 'desc' }, () => b.topic.localeCompare(a.topic))
      .with(
        { sortBy: P.union('total', 'negative', 'positive', 'neutral'), sortDirection: 'asc' },
        ({ sortBy }) => a[sortBy] - b[sortBy]
      )
      .with(
        {
          sortBy: P.union('total', 'negative', 'positive', 'neutral'),
          sortDirection: 'desc',
        },
        ({ sortBy }) => b[sortBy] - a[sortBy]
      )
      .otherwise(() => 0)
  );

  const direction = sortDirection === 'asc' ? '↑' : '↓';

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sentiment by Topics</CardTitle>
        <CardDescription data-desc className="mt-2">
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
            onValueChange={(value) =>
              match(value)
                .with('percentage', 'bar', setViewType)
                .otherwise(() => {})
            }
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
                Topic {sortBy === 'topic' && direction}
              </TableHead>
              <TableHead
                className="cursor-pointer text-right"
                onClick={() => handleSort('positive')}
              >
                Positive {sortBy === 'positive' && direction}
              </TableHead>
              <TableHead
                className="cursor-pointer text-right"
                onClick={() => handleSort('negative')}
              >
                Negative {sortBy === 'negative' && direction}
              </TableHead>
              <TableHead
                className="cursor-pointer text-right"
                onClick={() => handleSort('neutral')}
              >
                Neutral {sortBy === 'neutral' && direction}
              </TableHead>
              <TableHead className="cursor-pointer text-right" onClick={() => handleSort('total')}>
                Total {sortBy === 'total' && direction}
              </TableHead>
              <TableHead>Keywords</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedData.map((row) => (
              <TableRow key={row.topic}>
                <TableCell className="font-medium">{row.topic}</TableCell>
                <TableCell className="text-right">
                  {viewType === 'percentage' ? (
                    <span className="text-[var(--chart-5)]">
                      {percentFormatter.format(row.positive)}
                    </span>
                  ) : (
                    <div className="bg-muted h-2.5 w-full rounded-full">
                      <div
                        className="h-2.5 rounded-full bg-[var(--chart-5)]"
                        style={{ width: `${row.positive * 100}%` }}
                      ></div>
                    </div>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  {viewType === 'percentage' ? (
                    <span className="text-[var(--chart-2)]">
                      {percentFormatter.format(row.negative)}
                    </span>
                  ) : (
                    <div className="bg-muted h-2.5 w-full rounded-full">
                      <div
                        className="h-2.5 rounded-full bg-[var(--chart-2)]"
                        style={{ width: `${row.negative * 100}%` }}
                      ></div>
                    </div>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  {viewType === 'percentage' ? (
                    <span className="text-[var(--chart-3)]">
                      {percentFormatter.format(row.neutral)}
                    </span>
                  ) : (
                    <div className="bg-muted h-2.5 w-full rounded-full">
                      <div
                        className="h-2.5 rounded-full bg-[var(--chart-3)]"
                        style={{ width: `${row.neutral * 100}%` }}
                      ></div>
                    </div>
                  )}
                </TableCell>
                <TableCell className="text-right">{row.total}</TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {row.positive_keywords.map((keyword) => (
                      <Badge key={keyword} variant="outline" className="text-xs">
                        {keyword}
                      </Badge>
                    ))}

                    {row.negative_keywords.map((keyword) => (
                      <Badge key={keyword} variant="outline" className="text-xs">
                        {keyword}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="mt-8">
          <CardTitle>Sentiment Distribution</CardTitle>

          <div className="mt-4 space-y-3">
            {sortedData.map((row) => (
              <div key={row.topic} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>{row.topic}</span>
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
