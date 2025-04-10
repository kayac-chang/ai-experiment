import { TrendingUpIcon } from 'lucide-react';
import KPICard from '~/components/kpi-card';
import { useSentimentKeyMetricsData } from './hooks';

function KeyMetrics() {
  const data = useSentimentKeyMetricsData();
  return (
    <div className="grid grid-cols-1 gap-4 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      {/* Total Number Of Tweets */}
      <KPICard.Root>
        {/* card header */}
        <KPICard.Header>
          <KPICard.Description>Total Tweets</KPICard.Description>
          <KPICard.Title>{data.totalTweets.value.toLocaleString()}</KPICard.Title>

          <KPICard.Badge>
            <TrendingUpIcon className="size-3" />+{data.totalTweets.percentChange}%
          </KPICard.Badge>
        </KPICard.Header>

        {/* card footer */}
        <KPICard.Footer>
          <div className="line-clamp-1 flex gap-2 font-medium">
            {data.totalTweets.trend === 'up'
              ? 'Trending up this month'
              : 'Trending down this month'}
            <TrendingUpIcon className="size-4" />
          </div>
          <div className="text-muted-foreground">From {data.totalTweets.startDate}</div>
        </KPICard.Footer>
      </KPICard.Root>

      {/* Average Retweets */}
      <KPICard.Root>
        {/* card header */}
        <KPICard.Header>
          <KPICard.Description>Average Retweets</KPICard.Description>
          <KPICard.Title>{data.averageRetweets.value}</KPICard.Title>

          <KPICard.Badge>
            <TrendingUpIcon className="size-3" />+{data.averageRetweets.percentChange}%
          </KPICard.Badge>
        </KPICard.Header>

        {/* card footer */}
        <KPICard.Footer>
          <div className="line-clamp-1 flex gap-2 font-medium">
            {data.averageRetweets.trend === 'up'
              ? 'Trending up this month'
              : 'Trending down this month'}
            <TrendingUpIcon className="size-4" />
          </div>
          <div className="text-muted-foreground">Based on last {data.totalTweets.value} tweets</div>
        </KPICard.Footer>
      </KPICard.Root>

      {/* Average Likes */}
      <KPICard.Root>
        {/* card header */}
        <KPICard.Header>
          <KPICard.Description>Average Likes</KPICard.Description>
          <KPICard.Title>{data.averageLikes.value}</KPICard.Title>

          <KPICard.Badge>
            <TrendingUpIcon className="size-3" />+{data.averageLikes.percentChange}%
          </KPICard.Badge>
        </KPICard.Header>

        {/* card footer */}
        <KPICard.Footer>
          <div className="line-clamp-1 flex gap-2 font-medium">
            {data.averageLikes.trend === 'up'
              ? 'Trending up this month'
              : 'Trending down this month'}
            <TrendingUpIcon className="size-4" />
          </div>
          <div className="text-muted-foreground">Based on last {data.totalTweets.value} tweets</div>
        </KPICard.Footer>
      </KPICard.Root>

      {/* Average Replies */}
      <KPICard.Root>
        {/* card header */}
        <KPICard.Header>
          <KPICard.Description>Average Replies</KPICard.Description>
          <KPICard.Title>{data.averageReplies.value}</KPICard.Title>

          <KPICard.Badge>
            <TrendingUpIcon className="size-3" />+{data.averageReplies.percentChange}%
          </KPICard.Badge>
        </KPICard.Header>

        {/* card footer */}
        <KPICard.Footer>
          <div className="line-clamp-1 flex gap-2 font-medium">
            {data.averageReplies.trend === 'up'
              ? 'Trending up this month'
              : 'Trending down this month'}
            <TrendingUpIcon className="size-4" />
          </div>
          <div className="text-muted-foreground">Based on last {data.totalTweets.value} tweets</div>
        </KPICard.Footer>
      </KPICard.Root>
    </div>
  );
}
export default KeyMetrics;
