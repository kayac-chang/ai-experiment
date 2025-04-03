import { TrendingUpIcon, RepeatIcon, HeartIcon, MessageCircleIcon } from 'lucide-react';
import KPICard from '~/components/kpi-card';

function KeyMetrics() {
  return (
    <div className="grid grid-cols-1 gap-4 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
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
  );
}
export default KeyMetrics;
