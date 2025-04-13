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
import dedent from 'dedent';
import { generateText } from 'ai';
import { openai } from '@ai-sdk/openai';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '~/components/ui/accordion';
import { useLoaderData } from 'react-router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card';

const TrendEnum = z.enum(['up', 'down', 'neutral']);

const keyMetricsSchema = z.object({
  totalTweets: z.object({
    value: z.number(),
    percentChange: z.number(),
    trend: TrendEnum,
    startDate: z.coerce.date(),
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

const generateSummary = (text: string) =>
  generateText({
    model: openai('gpt-4o'),
    system: dedent`
      Analyze the provided data and generate a clear and concise summary.

      # Steps
      1. **Examine Data**: Thoroughly review the provided data to understand its structure, variables, and any patterns or trends.
      2. **Extract Key Insights**: Identify the most significant or noteworthy information, including trends, correlations, anomalies, or any notable figures.
      3. **Summarize**: Craft a concise summary that effectively communicates the key insights and overall findings from the data analysis.

      # Output Format
      - The summary should be presented in a short paragraph format, highlighting the major insights from the data.
    `,
    prompt: text,
  }).then((res) => res.text);

export async function loader(_args: LoaderFunctionArgs) {
  const prefixUrl = process.env.INTERNAL_API;
  const api = ky.create({ prefixUrl });

  const getKeyMetrics = () =>
    prefixUrl
      ? api.get('sentiment-reports/binance/key-metrics').json().then(keyMetricsSchema.parseAsync)
      : import('~/mocks/synthetic_key_metrics.json').then((mod) => mod.default);

  const getTopics = () =>
    prefixUrl
      ? api.get('sentiment-reports/binance/topics').json().then(topicsSchema.parseAsync)
      : import('~/mocks/synthetic_topics.json').then((mod) => mod.default);

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

  return (
    pProps({
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
      sentiment_by_topics: getTopics()
        // workaround
        .then((data) =>
          data
            .sort((a, b) => b.total - a.total)
            .slice(0, 10)
            .map((item) => ({
              ...item,
              positive_keywords: item.positive_keywords.slice(0, 5),
              negative_keywords: item.negative_keywords.slice(0, 5),
            }))
        ),

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
      sentiment_by_influencer: getInfluencer().then((data) =>
        data.sort((a, b) => b.influence - a.influence).slice(0, 10)
      ),
    })
      //
      .then(async (results) => {
        const summaries = await pProps({
          sentiment_by_key_metries: generateSummary(dedent`
            ## Key Metrics
            Displays essential statistics such as sentiment score averages, total tweet volume, and engagement levels.
            These figures offer a quick snapshot of performance and public reaction.

            ## Data Input
            '''
            ${JSON.stringify(results.sentiment_by_key_metries)}
            '''
          `),
          sentiment_by_sources: generateSummary(dedent`
            ## Sentiment by Sources
            Analyzes sentiment distribution across different data sources and platforms.
            Provides insights into how sentiment varies by platform and source type.

            ## Data Input
            '''
            ${JSON.stringify(results.sentiment_by_sources)}
            '''
          `),
          sentiment_by_trends: generateSummary(dedent`
            ## Sentiment Trends
            Tracks sentiment changes over time, identifying patterns and significant shifts.
            Helps understand the temporal evolution of public sentiment.

            ## Data Input
            '''
            ${JSON.stringify(results.sentiment_by_trends)}
            '''
          `),
          sentiment_by_topics: generateSummary(dedent`
            ## Topics Analysis
            Identifies key discussion topics and their associated sentiment patterns.
            Highlights what subjects are driving public conversation and emotional responses.

            ## Data Input
            '''
            ${JSON.stringify(results.sentiment_by_topics)}
            '''
          `),
          sentiment_by_influencer: generateSummary(dedent`
            ## Influencer Impact
            Evaluates the influence and sentiment impact of key individuals or accounts.
            Identifies who is shaping the conversation and their overall sentiment contribution.

            ## Data Input
            '''
            ${JSON.stringify(results.sentiment_by_influencer)}
            '''
          `),
        });

        // Generate comprehensive summary
        const comprehensiveSummary = await generateText({
          model: openai('gpt-4o'),
          system: dedent`
              Provide a high-level overview that synthesizes insights from all sections of the report.
              Focus on the most significant findings and their implications.

              # Output Format
              - The summary should be presented in a short paragraph format, highlighting the major insights from the data.
          `,
          prompt: dedent`
              ## Key Metrics Summary
              '''
              ${summaries.sentiment_by_key_metries}
              '''

              ## Sentiment Distribution Summary
              '''
              ${summaries.sentiment_by_sources}
              '''

              ## Trend Analysis Summary
              '''
              ${summaries.sentiment_by_trends}
              '''

              ## Topics Analysis Summary
              '''
              ${summaries.sentiment_by_topics}
              '''

              ## Influencer Impact Summary
              '''
              ${summaries.sentiment_by_influencer}
              '''
          `,
        }).then((res) => res.text);

        return {
          ...results,
          summaries: {
            ...summaries,
            comprehensive: comprehensiveSummary,
          },
        };
      })
  );
}

export default function SentimentReport() {
  const { summaries } = useLoaderData<typeof loader>();

  return (
    <div
      className={cn(
        '@container/main flex flex-col gap-20 py-4 md:py-6 md:pb-32',
        '**:data-section:mx-auto **:data-section:w-full **:data-section:max-w-5xl **:data-section:px-4',
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
        <blockquote className="mt-4">
          <strong>AI Summary</strong>
          <p>{summaries.comprehensive}</p>
        </blockquote>
      </section>

      {/* key metrics */}
      <section data-section>
        <h2>Key Metrics</h2>
        <p data-desc>
          Displays essential statistics such as sentiment score averages, total tweet volume, and
          engagement levels. These figures offer a quick snapshot of performance and public
          reaction.
        </p>
        <div className="mt-4">
          <Accordion type="single" collapsible>
            <AccordionItem value="key-metrics-summary">
              <AccordionTrigger className="w-fit">AI Insights</AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground text-sm">
                  {summaries.sentiment_by_key_metries}
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

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
          <Card className="relative">
            <CardHeader>
              <CardTitle>Sentiment By Sources</CardTitle>
              <CardDescription data-desc className="mt-2">
                Compares sentiment trends across different social media platforms, such as Twitter,
                Reddit, or Facebook. Reveals how sentiment varies depending on the data source.
              </CardDescription>

              <Accordion type="single" collapsible>
                <AccordionItem value="sources-summary">
                  <AccordionTrigger className="w-fit">AI Insights</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground text-sm">
                      {summaries.sentiment_by_sources}
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardHeader>

            <CardContent>
              <SentimentBySources />
            </CardContent>
          </Card>
        </div>

        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Sentiment Trends Across Platforms</CardTitle>
              <CardDescription data-desc className="mt-2">
                Tracks how sentiment changes over time across X.com, Reddit, and TikTok to identify
                patterns, spikes, or shifts in public opinion. Useful for comparing reactions to
                specific events or campaigns across different social media platforms.
              </CardDescription>

              <Accordion type="single" collapsible>
                <AccordionItem value="trends-summary">
                  <AccordionTrigger className="w-fit">AI Insights</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground text-sm">{summaries.sentiment_by_trends}</p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardHeader>
            <CardContent>
              <SentimentTrends />
            </CardContent>
          </Card>
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
          <Card>
            <CardHeader>
              <CardTitle>Sentiment by Topics</CardTitle>
              <CardDescription data-desc className="mt-2">
                Analyzes sentiment distribution across different topics or themes mentioned in
                social media conversations. This helps identify which topics generate positive,
                negative, or neutral reactions.
              </CardDescription>

              <Accordion type="single" collapsible>
                <AccordionItem value="topics-summary">
                  <AccordionTrigger className="w-fit">AI Insights</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground text-sm">{summaries.sentiment_by_topics}</p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardHeader>
            <CardContent>
              <Topics />
            </CardContent>
          </Card>
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
          <Card>
            <CardHeader>
              <CardTitle>Top Influencers by Mentions</CardTitle>
              <CardDescription data-desc className="mt-2">
                Shows the most mentioned influencers across social media platforms, with bars
                colored by sentiment. Green indicates positive sentiment, blue indicates neutral,
                and red indicates negative sentiment.
              </CardDescription>

              <Accordion type="single" collapsible>
                <AccordionItem value="influencer-summary">
                  <AccordionTrigger className="w-fit">AI Insights</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground text-sm">
                      {summaries.sentiment_by_influencer}
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardHeader>
            <CardContent>
              <Influencer />
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
