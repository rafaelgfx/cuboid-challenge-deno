import { connect } from '/deps/cotton.ts';
import Bag from '/src/models/bag.ts';
import Cuboid from '/src/models/cuboid.ts';

const db = () => connect({
  type: 'sqlite',
  database: 'database.sqlite',
  models: [
    Bag,
    Cuboid
  ],
});

export default db;
