import { createCookie } from 'react-router';
import { createTypedCookie } from 'remix-utils/typed-cookie';
import { z } from 'zod';

const cookie = createCookie('user-prefs', {
  path: '/',
  sameSite: 'lax',
  secure: true,
});

const schema = z
  .object({
    theme: z.enum(['light', 'dark']),
  })
  .nullish();

export default createTypedCookie({ cookie, schema });
