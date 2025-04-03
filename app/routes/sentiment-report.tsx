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
        '*:mx-auto *:w-full *:max-w-5xl'
        //
      )}
    >
      <h1>Sentiment Analysis Report</h1>

      {/* overview */}
      <section>
        <h2>Overview</h2>
        <p className="text-muted-foreground mt-2 text-sm/6">
          Provides a high-level summary of the sentiment data collected from the sources.
        </p>
      </section>

      {/* key metrics */}
      <section>
        <h2>Key Metrics</h2>
        <p className="text-muted-foreground mt-2 text-sm/6">
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
        <p className="text-muted-foreground mt-2 text-sm/6">
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
        <p className="text-muted-foreground mt-2 text-sm/6">
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
      </section>
    </div>
  );
}
