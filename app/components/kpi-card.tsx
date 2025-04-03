import type { ComponentProps } from 'react';
import { Badge as BaseBadge } from '~/components/ui/badge';
import * as Base from '~/components/ui/card';
import { cn } from '~/lib/utils';

export function Root(props: ComponentProps<typeof Base.Card>) {
  return <Base.Card {...props} className={cn('@container/card', props.className)} />;
}

export function Header(props: ComponentProps<typeof Base.CardHeader>) {
  return <Base.CardHeader {...props} className={cn('relative', props.className)} />;
}

export function Title(props: ComponentProps<typeof Base.CardTitle>) {
  return (
    <Base.CardTitle
      {...props}
      className={cn('text-2xl font-semibold tabular-nums @[250px]/card:text-3xl', props.className)}
    />
  );
}

export function Description(props: ComponentProps<typeof Base.CardDescription>) {
  return <Base.CardDescription {...props} />;
}

export function Footer(props: ComponentProps<typeof Base.CardFooter>) {
  return (
    <Base.CardFooter
      {...props}
      className={cn('flex-col items-start gap-1 text-sm', props.className)}
    />
  );
}

export function Badge(props: ComponentProps<typeof BaseBadge>) {
  return (
    <BaseBadge
      variant="outline"
      {...props}
      className={cn('absolute top-4 right-4 flex gap-1 rounded-lg text-xs', props.className)}
    />
  );
}

export default {
  Root,
  Header,
  Title,
  Description,
  Badge,
  Footer,
};
