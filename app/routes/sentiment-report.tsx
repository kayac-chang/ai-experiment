import { cn } from '~/lib/utils';
import SentimentTrends from './sentiment-trends';
import SentimentBySources from './sentiment-by-sources';
import KeyMetrics from './key-metrics';
import Topics from './topics';

export default function SentimentReport() {
  return (
    <div
      className={cn(
        '@container/main flex flex-col gap-20 py-4 md:py-6 md:pb-32',
        '*:mx-auto *:w-full *:max-w-5xl',
        '**:data-desc:text-muted-foreground **:data-desc:mt-2 **:data-desc:max-w-2xl **:data-desc:text-sm/6'
        //
      )}
    >
      <h1>Sentiment Analysis Report</h1>

      {/* overview */}
      <section>
        <h2>Overview</h2>
        <p data-desc>
          Provides a high-level summary of the sentiment data collected from the sources.
        </p>
      </section>

      {/* key metrics */}
      <section>
        <h2>Key Metrics</h2>
        <p data-desc>
          Displays essential statistics such as sentiment score averages, total tweet volume, and
          engagement levels. These figures offer a quick snapshot of performance and public
          reaction.
        </p>

        <div className="mt-8">
          <KeyMetrics />
        </div>
      </section>

      {/* sentiment breakdown */}
      <section>
        <h2>Sentiment Breakdown</h2>
        <p data-desc>
          Visualizes how sentiments are distributed across categories like positive, negative, and
          neutral. Helps stakeholders understand the emotional response of the audience in more
          detail.
        </p>

        <div className="mt-8">
          <SentimentBySources />
        </div>

        <div className="mt-8">
          <SentimentTrends />
        </div>
      </section>

      {/* topics */}
      <section>
        <h2>Topics</h2>
        <p data-desc>
          Highlights the most discussed themes and keywords within the sentiment data. Helps uncover
          what specific subjects are driving public conversation and emotional responses.
        </p>

        <div className="mt-8">
          <Topics />
        </div>
      </section>

      {/* influencer */}
      <section>
        <h2>Influencer</h2>
        <p data-desc>
          Identifies key accounts or figures who have a significant impact on sentiment and
          engagement. Useful for understanding whose voices are shaping the conversation.
        </p>
      </section>
    </div>
  );
}
