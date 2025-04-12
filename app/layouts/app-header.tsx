import { Outlet } from 'react-router';
import { SidebarInset } from '~/components/ui/sidebar';
import AppHeader from '~/components/app-header';
import { ThemeToggle } from '~/root';
import type { Route } from './+types/app-header';

export { loader } from '~/layouts/loader';

export default function Layout(props: Route.ComponentProps) {
  return (
    <SidebarInset>
      <AppHeader>
        <h1 className="text-base font-medium">{props.loaderData.title}</h1>

        <ThemeToggle className="ms-auto" />
      </AppHeader>

      <Outlet />
    </SidebarInset>
  );
}
