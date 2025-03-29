import { getInfos } from '~/services/info';
import type { Route } from './+types/project.id';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '~/components/ui/table';
import { format } from 'date-fns';

export async function loader() {
  return getInfos({ page: 1, perPage: 50 });
}

export default function Project({ loaderData }: Route.ComponentProps) {
  return (
    <div className="container mx-auto py-10">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>URL</TableHead>
            <TableHead>Content</TableHead>
            <TableHead>Created</TableHead>
            <TableHead>Updated</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loaderData.items.map((info) => (
            <TableRow key={info.id}>
              <TableCell className="font-medium">{info.url_title}</TableCell>
              <TableCell>
                <a
                  href={info.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {info.url}
                </a>
              </TableCell>
              <TableCell className="max-w-md truncate">{info.content}</TableCell>
              <TableCell>{format(info.created, 'PPp')}</TableCell>
              <TableCell>{format(info.updated, 'PPp')}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
