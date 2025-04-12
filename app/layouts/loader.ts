import { matchPath, type LoaderFunctionArgs } from 'react-router';

export async function loader(args: LoaderFunctionArgs) {
  const navs = [
    {
      title: 'Sentiment Analysis Report',
      url: '/',
    },
  ];

  const url = new URL(args.request.url);
  const title = navs.find((nav) => matchPath(nav.url, url.pathname))?.title ?? '--';
  return { title, navs };
}
