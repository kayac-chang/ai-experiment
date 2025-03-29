import { CollectionSchema } from '~/schemas/collection';
import pb from './pocketbase';

import { InfoSchema } from '~/schemas/info';

type Args = {
  page?: number;
  perPage?: number;
};

export async function getInfos(args?: Args) {
  const page = args?.page ?? 1;
  const perPage = args?.perPage ?? 50;
  return pb()
    .then((pb) =>
      pb.collection('infos').getList(page, perPage, {
        sort: '-created',
      })
    )
    .then(CollectionSchema(InfoSchema.passthrough()).parseAsync);
}
