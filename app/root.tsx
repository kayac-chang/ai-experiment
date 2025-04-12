import './styles/app.css';

import { match } from 'ts-pattern';
import { useCallback, useEffect, useState, type ComponentProps } from 'react';
import {
  isRouteErrorResponse,
  Outlet,
  useOutletContext,
  createCookie,
  Links,
  Meta,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from 'react-router';
import { createTypedCookie } from 'remix-utils/typed-cookie';
import { useHydrated } from 'remix-utils/use-hydrated';
import { z } from 'zod';

import type { Route } from './+types/root';
import { cn } from '~/lib/utils';
import { Switch } from '~/components/ui/switch';
import { MoonIcon, SunIcon } from 'lucide-react';

export const links: Route.LinksFunction = () => [
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  {
    rel: 'preconnect',
    href: 'https://fonts.gstatic.com',
    crossOrigin: 'anonymous',
  },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap',
  },
];

const cookie = createCookie('theme', {
  path: '/',
  sameSite: 'lax',
  secure: true,
});

const schema = z.enum(['light', 'dark']).nullish();
const themeCookie = createTypedCookie({ cookie, schema });

type ToggleContext = {
  theme: 'light' | 'dark' | null | undefined;
  toggleTheme: () => void;
};

export function useThemeContext() {
  return useOutletContext<ToggleContext>();
}

export async function loader(args: Route.LoaderArgs) {
  return themeCookie.parse(args.request.headers.get('Cookie'));
}

export function ThemeToggle(props: ComponentProps<typeof Switch>) {
  const isHydrated = useHydrated();
  const { theme, toggleTheme } = useThemeContext();

  if (!isHydrated && !theme) {
    return null;
  }

  return (
    <Switch
      checked={match(theme)
        .with('light', () => false)
        .with('dark', () => true)
        .otherwise(() => globalThis.matchMedia('(prefers-color-scheme: dark)').matches)}
      onCheckedChange={toggleTheme}
      {...props}
    >
      <SunIcon className="group-data-[state=checked]:hidden" />
      <MoonIcon className="group-data-[state=unchecked]:hidden" />
    </Switch>
  );
}

export default function App() {
  const data = useLoaderData<typeof loader>();
  const [theme, setTheme] = useState(data);
  const toggleTheme = useCallback(() => {
    setTheme((theme) =>
      match(theme)
        .with('dark', () => 'light' as const)
        .with('light', () => 'dark' as const)
        .otherwise(() => {
          return globalThis.matchMedia('(prefers-color-scheme: dark)').matches ? 'light' : 'dark';
        })
    );
  }, []);

  useEffect(() => {
    if (theme) {
      themeCookie.serialize(theme).then((cookie) => (document.cookie = cookie));
      return;
    }
    if (globalThis.matchMedia('(prefers-color-scheme: dark)').matches) {
      themeCookie.serialize('dark').then((cookie) => (document.cookie = cookie));
      return;
    } else {
      themeCookie.serialize('light').then((cookie) => (document.cookie = cookie));
      return;
    }
  }, [theme]);

  return (
    <html lang="en" className={cn(theme)}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet context={{ theme, toggleTheme }} />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = 'Oops!';
  let details = 'An unexpected error occurred.';
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? '404' : 'Error';
    details =
      error.status === 404 ? 'The requested page could not be found.' : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="container mx-auto p-4 pt-16">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full overflow-x-auto p-4">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
