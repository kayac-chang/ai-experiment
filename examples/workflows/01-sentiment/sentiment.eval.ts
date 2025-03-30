import { ExactMatch } from 'autoevals';
import { evalite } from 'evalite';
import { classifySentiment } from './main';
import { parseTomlTestCases } from 'examples/utils/parse-toml-testcases';

evalite('Test Sentiment', {
  data: () => parseTomlTestCases('examples/workflows/01-sentiment/sentiment.test.toml'),
  task: (input) => classifySentiment(input).then((res) => res.object),
  scorers: [ExactMatch],
});
