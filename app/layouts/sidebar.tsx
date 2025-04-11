import {
  matchPath,
  Outlet,
  useFetcher,
  useLoaderData,
  type LoaderFunctionArgs,
} from 'react-router';
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
import type { Route } from './+types/sidebar';
import { Switch } from '~/components/ui/switch';
import { MoonIcon, SunIcon } from 'lucide-react';
import userPrefsCookie from '~/user-prefs.server';
import { match } from 'ts-pattern';

export async function loader(args: LoaderFunctionArgs) {
  const navs = [
    {
      title: 'Home',
      url: '/',
    },
  ];

  const url = new URL(args.request.url);
  const title = navs.find((nav) => matchPath(nav.url, url.pathname))?.title ?? '--';

  const userPref = await userPrefsCookie.parse(args.request.headers.get('Cookie'));

  return { title, navs, userPref };
}

export default function SidebarLayout({ loaderData }: Route.ComponentProps) {
  const data = useLoaderData<typeof loader>();
  const fetcher = useFetcher();

  const checked = match(data.userPref?.theme ?? 'light')
    .with('light', () => false)
    .with('dark', () => false)
    .exhaustive();
  const onCheckedChange = () => fetcher.submit(null, { action: '/theme', method: 'post' });

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
            <h1 className="text-base font-medium">{loaderData.title}</h1>

            <Switch className="ms-auto" defaultChecked={checked} onCheckedChange={onCheckedChange}>
              <SunIcon className="group-data-[state=checked]:hidden" />
              <MoonIcon className="group-data-[state=unchecked]:hidden" />
            </Switch>
          </div>
        </header>

        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  );
}
