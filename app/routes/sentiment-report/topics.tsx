import { useState } from 'react';
import { match, P } from 'ts-pattern';
import { BarChart3Icon, PieChartIcon } from 'lucide-react';
import { CardTitle } from '~/components/ui/card';
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
  const [viewType, setViewType] = useState<'scalar' | 'percentage'>('scalar');
  const [sortBy, setSortBy] = useState<'topic' | 'positive' | 'negative' | 'neutral' | 'total'>(
    'topic'
  );
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const handleSort = (column: 'topic' | 'positive' | 'negative' | 'neutral' | 'total') => {
    if (sortBy === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortDirection('desc');
    }
  };

  const data = useSentimentTopicsData();

  const sortedScalarData = data['raw'].sort((a, b) =>
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

  const sortedPercentageData = data['percent'].sort((a, b) =>
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

  const sortedData = match(viewType)
    .with('scalar', () => sortedScalarData)
    .with('percentage', () => sortedPercentageData)
    .exhaustive();

  const direction = sortDirection === 'asc' ? '↑' : '↓';

  return (
    <>
      <div className="mb-4 flex justify-end">
        <ToggleGroup
          type="single"
          value={viewType}
          onValueChange={(value) =>
            match(value)
              .with('percentage', 'scalar', setViewType)
              .otherwise(() => {})
          }
          variant="outline"
        >
          <Tooltip>
            <ToggleGroupItem value="scalar" asChild>
              <TooltipTrigger>
                <BarChart3Icon />
              </TooltipTrigger>
            </ToggleGroupItem>
            <TooltipContent>Scalar</TooltipContent>
          </Tooltip>
          <Tooltip>
            <ToggleGroupItem value="percentage" asChild>
              <TooltipTrigger>
                <PieChartIcon />
              </TooltipTrigger>
            </ToggleGroupItem>
            <TooltipContent>Percentage</TooltipContent>
          </Tooltip>
        </ToggleGroup>
      </div>

      <Table className="table-auto">
        <TableHeader>
          <TableRow>
            <TableHead className="cursor-pointer" onClick={() => handleSort('topic')}>
              Topic {sortBy === 'topic' && direction}
            </TableHead>
            <TableHead className="cursor-pointer text-right" onClick={() => handleSort('positive')}>
              Positive {sortBy === 'positive' && direction}
            </TableHead>
            <TableHead className="cursor-pointer text-right" onClick={() => handleSort('negative')}>
              Negative {sortBy === 'negative' && direction}
            </TableHead>
            <TableHead className="cursor-pointer text-right" onClick={() => handleSort('neutral')}>
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
                <span className="text-[var(--chart-5)]">
                  {match(viewType)
                    .with('scalar', () => row.positive)
                    .with('percentage', () => percentFormatter.format(row.positive))
                    .exhaustive()}
                </span>
              </TableCell>
              <TableCell className="text-right">
                <span className="text-[var(--chart-2)]">
                  {match(viewType)
                    .with('scalar', () => row.negative)
                    .with('percentage', () => percentFormatter.format(row.negative))
                    .exhaustive()}
                </span>
              </TableCell>
              <TableCell className="text-right">
                <span className="text-[var(--chart-3)]">
                  {match(viewType)
                    .with('scalar', () => row.neutral)
                    .with('percentage', () => percentFormatter.format(row.neutral))
                    .exhaustive()}
                </span>
              </TableCell>
              <TableCell className="text-right">{row.total}</TableCell>
              <TableCell className="">
                <div className="flex flex-wrap gap-1">
                  {row.positive_keywords.map((keyword) => (
                    <Badge
                      key={keyword}
                      className="dark:text-primary bg-[var(--chart-5)]/90 text-xs"
                    >
                      {keyword}
                    </Badge>
                  ))}

                  {row.negative_keywords.map((keyword) => (
                    <Badge
                      key={keyword}
                      className="dark:text-primary bg-[var(--chart-2)]/90 text-xs"
                    >
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
          {sortedPercentageData.map((row) => (
            <div key={row.topic} className="space-y-1">
              <div className="flex justify-between text-sm">
                <span>{row.topic}</span>
              </div>
              <SentimentBar positive={row.positive} negative={row.negative} neutral={row.neutral} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Topics;
