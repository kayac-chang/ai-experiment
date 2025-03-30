import { type RouteConfig, index, route, layout } from '@react-router/dev/routes';

export default [
  layout('layouts/sidebar.tsx', [
    index('routes/home.tsx'),
    route('project/:id', 'routes/project.id.tsx'),
    route('chat', 'routes/chat.tsx'),
  ]),
] satisfies RouteConfig;
