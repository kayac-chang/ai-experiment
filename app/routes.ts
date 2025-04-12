import { type RouteConfig, route, layout } from '@react-router/dev/routes';

export default [
  layout('layouts/app-header.tsx', [
    route('/', 'routes/sentiment-report/index.tsx'),
    //
  ]),
] satisfies RouteConfig;
