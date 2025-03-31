import { type RouteConfig, index, route, layout } from '@react-router/dev/routes';

export default [
  // index('routes/home.tsx'),
  route(
    // 'sentiment-reports/binance',
    '/',
    'routes/sentiment-report.tsx'
  ),
  //
] satisfies RouteConfig;
