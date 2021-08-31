import { Q } from '/deps/cotton.ts';
import { RouterContext, Status } from '/deps/oak.ts';
import Bag from '/src/models/bag.ts';

export const list = async (context: RouterContext) => {
  const ids = context.request.url.searchParams.getAll('ids');
  const bags = await Bag.query().where('id', Q.in(ids)).all();

  context.response.body = bags;
};

export const get = async (context: RouterContext) => {
  const id = context.params.id as string;
  const bag = await Bag.query().where('id', id).first();

  if (!bag) {
    context.response.status = Status.NotFound;
    return;
  }

  context.response.body = bag;
};

export const create = async (context: RouterContext) => {
  const { volume, title } = await context.request.body().value;
  const bag = new Bag();
  bag.volume = volume;
  bag.title = title;
  await bag.save();

  context.response.status = Status.Created;
  context.response.body = bag;
};

export default {
  list,
  get,
  create,
};
