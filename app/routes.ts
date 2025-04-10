import { type RouteConfig, route, layout } from '@react-router/dev/routes';

export default [
  layout('layouts/sidebar.tsx', [
    route('/', 'routes/sentiment-report/index.tsx'),
    //
  ]),

  route('/theme', 'layouts/theme.ts'),
] satisfies RouteConfig;
