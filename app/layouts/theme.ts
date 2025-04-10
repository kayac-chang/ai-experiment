import { match } from 'ts-pattern';
import userPrefsCookie from '~/user-prefs.server';
import type { Route } from './+types/theme';

export async function action(args: Route.ActionArgs) {
  const userPref = await userPrefsCookie.parse(args.request.headers.get('Cookie'));

  return new Response(null, {
    status: 200,
    headers: {
      'Set-Cookie': await userPrefsCookie.serialize({
        ...userPref,
        theme: match(userPref?.theme ?? 'light')
          .with('light', () => 'dark' as const)
          .with('dark', () => 'light' as const)
          .exhaustive(),
      }),
    },
  });
}
