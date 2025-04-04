import { useLoaderData, type LoaderFunctionArgs } from 'react-router';
import pProps from 'p-props';

export function loader(_args: LoaderFunctionArgs) {
  return pProps({
    /**
     * Key performance metrics related to sentiment analysis
     * Includes metrics like total engagement, average sentiment scores, and trend indicators
     * Each metric contains current value, percent change, and trend direction
     */
    sentiment_by_key_metries: import('~/mocks/synthetic_key_metrics.json').then(
      (mod) => mod.default
    ),

    /**
     * Sentiment data organized by topics
     * Each topic includes positive, negative, neutral sentiment counts, total count,
     * and a list of related keywords that define the topic
     */
    sentiment_by_topics: import('~/mocks/synthetic_topics.json').then((mod) => mod.default),

    /**
     * Sentiment data organized by trends over time
     * The data includes temporal patterns and trend information for sentiment analysis
     */
    sentiment_by_trends: import('~/mocks/synthetic_sentiment_xcom_april_2025.json').then(
      (mod) => mod.default
    ),

    /**
     * Sample data representing sentiment counts across different social media platforms
     * Each object contains the source name and counts for positive, negative, and neutral sentiments
     */
    sentiment_by_sources: import('~/mocks/synthetic_sources.json').then((mod) => mod.default),

    /**
     * Sentiment data organized by key influencers
     * Each influencer entry includes their name, reach metrics, and sentiment impact scores
     * Used to identify individuals with significant influence on overall sentiment
     */
    sentiment_by_influencer: import('~/mocks/synthetic_influencer.json').then((mod) => mod.default),
  });
}

export function useSentimentBySourceData() {
  const data = useLoaderData<typeof loader>();

  return {
    raw: data.sentiment_by_sources,

    /**
     * Transform raw count data into percentage data.
     * Calculates the proportion of each sentiment type relative to the total for each source.
     */
    percent: data.sentiment_by_sources.map((item) => {
      const total = item.positive + item.negative + item.neutral;
      return {
        source: item.source,
        positive: item.positive / total,
        negative: item.negative / total,
        neutral: item.neutral / total,
      };
    }),
  };
}

/**
 * Hook to access sentiment trends data from the loader
 * Provides temporal patterns and trend information for sentiment analysis
 */
export function useSentimentTrendsData() {
  const data = useLoaderData<typeof loader>();

  return data.sentiment_by_trends;
}

/**
 * Hook to access sentiment topics data from the loader
 * Provides sentiment analysis broken down by different topics
 * Each topic includes positive, negative, neutral counts, total, and related keywords
 */
export function useSentimentTopicsData() {
  const data = useLoaderData<typeof loader>();

  return {
    // Raw topic data with counts
    raw: data.sentiment_by_topics,

    // Transform raw count data into percentage data
    // Useful for visualization components that work with percentages
    percent: data.sentiment_by_topics.map((item) => ({
      topic: item.topic,
      positive: item.positive / item.total,
      negative: item.negative / item.total,
      neutral: item.neutral / item.total,
      total: 100,
      keywords: item.keywords,
    })),
  };
}

/**
 * Hook to access sentiment influencer data from the loader
 * Provides data about key influencers and their sentiment impact
 * Each influencer includes name, number of mentions, and sentiment score
 */
export function useSentimentInfluencerData() {
  const data = useLoaderData<typeof loader>();

  return data.sentiment_by_influencer;
}

/**
 * Hook to access sentiment by key metrics data from the loader
 * Provides key performance indicators and their trend information
 * Each metric includes current value, percent change, and trend direction
 */
export function useSentimentKeyMetricsData() {
  const data = useLoaderData<typeof loader>();

  return data.sentiment_by_key_metries;
}
