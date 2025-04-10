import { cn } from '~/lib/utils';
import SentimentTrends from './sentiment-trends';
import SentimentBySources from './sentiment-by-sources';
import KeyMetrics from './key-metrics';
import Topics from './topics';
import Influencer from './influencer';

import { type LoaderFunctionArgs } from 'react-router';
import pProps from 'p-props';
import ky from 'ky';
import { z } from 'zod';

const TrendEnum = z.enum(['up', 'down', 'neutral']);

const keyMetricsSchema = z.object({
  totalTweets: z.object({
    value: z.number(),
    percentChange: z.number(),
    trend: TrendEnum,
  }),
  averageRetweets: z.object({
    value: z.number(),
    percentChange: z.number(),
    trend: TrendEnum,
  }),
  averageLikes: z.object({
    value: z.number(),
    percentChange: z.number(),
    trend: TrendEnum,
  }),
  averageReplies: z.object({
    value: z.number(),
    percentChange: z.number(),
    trend: TrendEnum,
  }),
});

/**
 * Schema for accumulated sentiment data by source
 * Each entry contains sentiment counts (positive, negative, neutral) for a specific source
 */
const accumulateSchema = z.array(
  z.object({
    source: z.string(),
    positive: z.number(),
    negative: z.number(),
    neutral: z.number(),
  })
);

const recordsSchema = z.array(
  z.object({
    date: z.string(),
    positive: z.number(),
    negative: z.number(),
    neutral: z.number(),
  })
);

const topicsSchema = z.array(
  z.object({
    topic: z.string(),
    positive: z.number(),
    negative: z.number(),
    neutral: z.number(),
    total: z.number(),
    positive_keywords: z.array(z.string()),
    negative_keywords: z.array(z.string()),
  })
);

const influencerSchema = z.array(
  z.object({
    name: z.string(),
    influence: z.number(),
    sentiment: z.number(),
    source: z.string(),
  })
);

export async function loader(_args: LoaderFunctionArgs) {
  const prefixUrl = process.env.INTERNAL_API;
  const api = ky.create({ prefixUrl });

  const getKeyMetrics = () =>
    prefixUrl
      ? api.get('sentiment-reports/binance/key-metrics').json().then(keyMetricsSchema.parseAsync)
      : import('~/mocks/synthetic_key_metrics.json').then((mod) => mod.default);

  const getTopics = () =>
    // prefixUrl ?
    // api.get('sentiment-reports/binance/topics').json().then(topicsSchema.parseAsync) :
    import('~/mocks/synthetic_topics.json').then((mod) => mod.default);

  const getAccumulate = () =>
    prefixUrl
      ? api.get('sentiment-reports/binance/accumulate').json().then(accumulateSchema.parseAsync)
      : import('~/mocks/synthetic_sources.json').then((mod) => mod.default);

  const getInfluencer = () =>
    prefixUrl
      ? api.get('sentiment-reports/binance/influencer').json().then(influencerSchema.parseAsync)
      : import('~/mocks/synthetic_influencer.json').then((mod) => mod.default);

  const getRecords = () =>
    prefixUrl
      ? api.get('sentiment-reports/binance/records').json().then(recordsSchema.parseAsync)
      : import('~/mocks/synthetic_sentiment_xcom_april_2025.json').then((mod) => mod.default);

  return pProps({
    /**
     * Key performance metrics related to sentiment analysis
     * Includes metrics like total engagement, average sentiment scores, and trend indicators
     * Each metric contains current value, percent change, and trend direction
     */
    sentiment_by_key_metries: getKeyMetrics(),

    /**
     * Sentiment data organized by topics
     * Each topic includes positive, negative, neutral sentiment counts, total count,
     * and a list of related keywords that define the topic
     */
    sentiment_by_topics: getTopics(),

    /**
     * Sentiment data organized by trends over time
     * The data includes temporal patterns and trend information for sentiment analysis
     */
    sentiment_by_trends: getRecords(),

    /**
     * Sample data representing sentiment counts across different social media platforms
     * Each object contains the source name and counts for positive, negative, and neutral sentiments
     */
    sentiment_by_sources: getAccumulate(),

    /**
     * Sentiment data organized by key influencers
     * Each influencer entry includes their name, reach metrics, and sentiment impact scores
     * Used to identify individuals with significant influence on overall sentiment
     */
    sentiment_by_influencer: getInfluencer(),
  });
}

export default function SentimentReport() {
  return (
    <div
      className={cn(
        '@container/main flex flex-col gap-20 py-4 md:py-6 md:pb-32',
        '**:data-section:mx-auto **:data-section:w-full **:data-section:max-w-5xl',
        '**:data-desc:text-muted-foreground **:data-desc:mt-2 **:data-desc:max-w-2xl **:data-desc:text-sm/6'
        //
      )}
    >
      <section data-section>
        <h1>Sentiment Analysis Report</h1>
      </section>

      {/* overview */}
      <section data-section>
        <h2>Overview</h2>
        <p data-desc>
          Provides a high-level summary of the sentiment data collected from the sources.
        </p>
      </section>

      {/* key metrics */}
      <section data-section>
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
      <section data-section>
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
      <section data-section>
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
      <section data-section>
        <h2>Influencer</h2>
        <p data-desc>
          Identifies key accounts or figures who have a significant impact on sentiment and
          engagement. Useful for understanding whose voices are shaping the conversation.
        </p>

        <div className="mt-8">
          <Influencer />
        </div>
      </section>
    </div>
  );
}
