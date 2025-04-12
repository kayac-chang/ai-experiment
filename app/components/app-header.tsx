import type { ReactNode } from 'react';

export function AppHeader(props: { children: ReactNode }) {
  return (
    <header className="bg-background/60 sticky top-0 z-20 flex h-12 shrink-0 items-center gap-2 border-b backdrop-blur transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">{props.children}</div>
    </header>
  );
}
export default AppHeader;
