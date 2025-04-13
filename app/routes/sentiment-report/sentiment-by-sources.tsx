import { useState } from 'react';
import { PieChart } from 'lucide-react';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '~/components/ui/chart';
import { Toggle } from '~/components/ui/toggle';
import { percentFormatter, compactFormatter } from '~/lib/formatters';
import { Tooltip, TooltipContent, TooltipTrigger } from '~/components/ui/tooltip';
import { useSentimentBySourceData } from './hooks';
import { match } from 'ts-pattern';

// Configuration for chart colors and labels
// Defines the visual representation of each sentiment category
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

type ChartVariant = 'percent' | 'number';

// Higher-order function that returns a formatter based on the chart variant
// Used to format values differently depending on whether we're showing percentages or raw numbers
const formatNumber =
  (format: ChartVariant = 'number') =>
  (value: number) => {
    if (format === 'percent') {
      return percentFormatter.format(value); // Format as percentage (e.g., 75%)
    }
    return compactFormatter.format(value); // Format as compact number (e.g., 1.5K)
  };

function SentimentBySources() {
  // State to toggle between percentage and raw number display modes
  const [variant, setVariant] = useState<ChartVariant>('number');
  const data = useSentimentBySourceData();

  return (
    <>
      <div className="flex justify-end">
        {/* Toggle button to switch between percentage and raw number views */}
        <Tooltip>
          <Toggle
            variant="outline"
            pressed={variant === 'percent'}
            onPressedChange={(pressed) => setVariant(pressed ? 'percent' : 'number')}
            asChild
          >
            <TooltipTrigger>
              <PieChart />
            </TooltipTrigger>
          </Toggle>

          <TooltipContent>
            {variant === 'percent' ? 'Number View' : 'Percentage View'}
          </TooltipContent>
        </Tooltip>
      </div>

      {/* Main chart container with responsive height */}
      <ChartContainer config={chartConfig} className="mt-4 max-h-[40vh] w-full">
        {/* Stacked bar chart that dynamically uses either percentage or raw data based on selected variant */}
        <BarChart
          data={match(variant)
            .with('number', () => data.raw)
            .with('percent', () => data.percent)
            .exhaustive()}
          accessibilityLayer
          layout="vertical"
          barSize={20}
        >
          <ChartTooltip content={<ChartTooltipContent valueFormatter={formatNumber(variant)} />} />
          <ChartLegend content={<ChartLegendContent />} />
          <CartesianGrid horizontal={false} />
          <YAxis dataKey="source" type="category" tickMargin={10} />
          <XAxis
            type="number"
            domain={variant === 'percent' ? [0, 1] : undefined}
            tickFormatter={formatNumber(variant)}
          />
          {/* Stacked bars for each sentiment type - all sharing the same stackId to create a stacked effect */}
          <Bar dataKey="positive" stackId="sentiment" fill="var(--color-positive)" />
          <Bar dataKey="negative" stackId="sentiment" fill="var(--color-negative)" />
          <Bar
            dataKey="neutral"
            stackId="sentiment"
            fill="var(--color-neutral)"
            /* Rounded corners on the right side of the last bar in stack */
            radius={[0, 4, 4, 0]}
          />
        </BarChart>
      </ChartContainer>
    </>
  );
}
export default SentimentBySources;
