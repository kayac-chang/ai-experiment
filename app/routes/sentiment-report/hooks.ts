import { useLoaderData } from 'react-router';
import type { loader } from './index';

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

  // workaround
  const sentiment_by_topics = data.sentiment_by_topics
    .sort((a, b) => b.total - a.total)
    .slice(0, 10)
    .map((item) => ({
      ...item,
      positive_keywords: item.positive_keywords.slice(0, 5),
      negative_keywords: item.negative_keywords.slice(0, 5),
    }));

  return {
    // Raw topic data with counts
    raw: sentiment_by_topics,

    // Transform raw count data into percentage data
    // Useful for visualization components that work with percentages
    percent: sentiment_by_topics.map((item) => ({
      topic: item.topic,
      positive: item.positive / item.total,
      negative: item.negative / item.total,
      neutral: item.neutral / item.total,
      total: item.total,
      positive_keywords: item.positive_keywords,
      negative_keywords: item.negative_keywords,
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
