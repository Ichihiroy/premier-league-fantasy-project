import { type RouteConfig, index, route, layout } from '@react-router/dev/routes';

export default [
  // Home page
  index('routes/_index.tsx'),

  // Players routes with layout
  layout('routes/players/_players.tsx', [
    index('routes/players/_index.tsx'), // Players list page
    route(':playerId', 'routes/players/$playerId.tsx'), // Player detail page
    route('new', 'routes/players/new.tsx'), // Create new player
  ]),

  // Collection routes
  route('collection', 'routes/collection/_collection.tsx'),

  // Authentication routes
  route('auth/login', 'routes/auth/login.tsx'),
  route('auth/register', 'routes/auth/register.tsx'),

  // 404 catch-all route
  route('*', 'routes/_404.tsx'),
] satisfies RouteConfig;
