import { Outlet } from 'react-router';
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
import AppHeader from '~/components/app-header';
import { ThemeToggle } from '~/root';
import type { Route } from './+types/sidebar';

export { loader } from '~/layouts/loader';

export default function Layout(props: Route.ComponentProps) {
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
        <AppHeader>
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mx-2 data-[orientation=vertical]:h-4" />
          <h1 className="text-base font-medium">{props.loaderData.title}</h1>

          <ThemeToggle className="ms-auto" />
        </AppHeader>

        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  );
}
