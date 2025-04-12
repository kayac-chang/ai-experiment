import { matchPath, Outlet, type LoaderFunctionArgs } from 'react-router';
import { useHydrated } from 'remix-utils/use-hydrated';
import { MoonIcon, SunIcon } from 'lucide-react';
import { match } from 'ts-pattern';
import { Separator } from '~/components/ui/separator';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '~/components/ui/sidebar';
import { Switch } from '~/components/ui/switch';
import type { Route } from './+types/sidebar';
import { useThemeContext } from '~/root';

export async function loader(args: LoaderFunctionArgs) {
  const navs = [
    {
      title: 'Home',
      url: '/',
    },
  ];

  const url = new URL(args.request.url);
  const title = navs.find((nav) => matchPath(nav.url, url.pathname))?.title ?? '--';
  return { title, navs };
}

function ThemeToggle() {
  const isHydrated = useHydrated();
  const { theme, toggleTheme } = useThemeContext();

  if (!isHydrated && !theme) {
    return null;
  }

  return (
    <Switch
      className="ms-auto"
      checked={match(theme)
        .with('light', () => false)
        .with('dark', () => true)
        .otherwise(() => globalThis.matchMedia('(prefers-color-scheme: dark)').matches)}
      onCheckedChange={toggleTheme}
    >
      <SunIcon className="group-data-[state=checked]:hidden" />
      <MoonIcon className="group-data-[state=unchecked]:hidden" />
    </Switch>
  );
}

export default function SidebarLayout(props: Route.ComponentProps) {
  return (
    <SidebarProvider defaultOpen={false}>
      {/* AppSidebar */}
      <Sidebar variant="inset">
        <SidebarHeader />
        <SidebarContent>
          <SidebarGroup />
          <SidebarGroup />
        </SidebarContent>
        <SidebarFooter />
      </Sidebar>

      {/* content */}
      <SidebarInset>
        <header className="bg-background/60 sticky top-0 z-10 flex h-12 shrink-0 items-center gap-2 border-b backdrop-blur transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mx-2 data-[orientation=vertical]:h-4" />
            <h1 className="text-base font-medium">{props.loaderData.title}</h1>

            <ThemeToggle />
          </div>
        </header>

        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  );
}
