import { matchPath, Outlet, type LoaderFunctionArgs } from 'react-router';
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

export function loader(args: LoaderFunctionArgs) {
  // Add more navigation items here as needed
  // Each nav item should have a title and URL
  // Example:
  // {
  //   title: 'Projects',
  //   url: '/projects',
  // },
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

export default function SidebarLayout({ loaderData }: Route.ComponentProps) {
  return (
    <SidebarProvider open={false}>
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
        <header className="flex h-12 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mx-2 data-[orientation=vertical]:h-4" />
            <h1 className="text-base font-medium">{loaderData.title}</h1>
          </div>
        </header>

        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  );
}
