import { Q } from '/deps/cotton.ts';
import { RouterContext, Status } from '/deps/oak.ts';
import Bag from '/src/models/bag.ts';
import Cuboid from '/src/models/cuboid.ts';

export const list = async (context: RouterContext) => {
  const ids = context.request.url.searchParams.getAll('ids');
  const cuboids = await Cuboid.query().include('bag').where('id', Q.in(ids)).all();

  context.response.body = cuboids;
};

export const get = (context: RouterContext) => {
  context.response.body = {};
};

export const create = async (context: RouterContext) => {
  const { width, height, depth, bagId } = await context.request.body().value;

  const bag = await Bag.query().include('cuboids').where('id', bagId).first();

  if (!bag) {
    context.response.status = Status.NotFound;
    return;
  }

  const cuboid = new Cuboid();
  cuboid.width = width;
  cuboid.height = height;
  cuboid.depth = depth;
  cuboid.bag = bag;
  await cuboid.save();

  context.response.status = Status.Created;
  context.response.body = cuboid;
};

export default {
  list,
  get,
  create
};
