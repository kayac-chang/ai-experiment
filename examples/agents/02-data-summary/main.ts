import { generateText } from 'ai';
import { openai } from '@ai-sdk/openai';
import dedent from 'dedent';

const sys_prompt = dedent`
Analyze the provided data and generate a clear and concise summary.

# Steps

1. **Examine Data**: Thoroughly review the provided data to understand its structure, variables, and any patterns or trends.
2. **Extract Key Insights**: Identify the most significant or noteworthy information, including trends, correlations, anomalies, or any notable figures.
3. **Summarize**: Craft a concise summary that effectively communicates the key insights and overall findings from the data analysis.

# Output Format

- The summary should be presented in a short paragraph format, highlighting the major insights from the data.
`;

export const run = (text: string) =>
  generateText({
    model: openai('gpt-4o'),
    system: sys_prompt,
    prompt: text,
  });

const test1 = dedent`
  Retrieves key performance metrics for a specific sentiment report, including total tweets and engagement metrics with trend information.
  Used in the "Key Metrics" dashboard section.
  '''
  ${await fetch('http://172.21.161.36:9950/sentiment-reports/binance/key-metrics').then((res) => res.text())}
  '''
`;

const test2 = dedent`
  Retrieves accumulated sentiment analysis data grouped by sources.
  Used in the "Sentiment by Sources" section.
  '''
  ${await fetch('http://172.21.161.36:9950/sentiment-reports/binance/accumulate').then((res) => res.text())}
  '''
`;

const test3 = dedent`
  Retrieves daily sentiment counts for a specific report with optional filtering by source and date range.
  Used in the "Sentiment Records" section.
  '''
  ${await fetch('http://172.21.161.36:9950/sentiment-reports/binance/records').then((res) => res.text())}
  '''
`;

const test4 = dedent`
  Retrieves sentiment analysis data grouped by topics for a specific report with optional filtering by date range and sources.
  Used in the "Sentiment by Topics" section.
  '''
  ${await fetch('http://172.21.161.36:9950/sentiment-reports/binance/topics')
    .then((res) => res.json())
    .then((res) =>
      res
        .sort((a, b) => b.total - a.total)
        .slice(0, 10)
        .map((item) => ({
          topic: item.topic,
          positive: item.positive,
          negative: item.negative,
          neutral: item.neutral,
          total: item.total,
          positive_keywords: item.positive_keywords.slice(0, 5),
          negative_keywords: item.negative_keywords.slice(0, 5),
        }))
    )
    .then(JSON.stringify)}
  '''
`;

const test5 = dedent`
  Retrieves sentiment analysis data grouped by influencers for a specific report with optional filtering by date range and sources.
  Used in the "Top Influencers by Influence" section.
  '''
  ${await fetch('http://172.21.161.36:9950/sentiment-reports/binance/influencer')
    .then((res) => res.json())
    .then((res) => res.sort((a, b) => b.influence - a.influence).slice(0, 10))
    .then(JSON.stringify)}
  '''
`;

console.log(test5);
const res = await run(test5);
console.log(res.text);
