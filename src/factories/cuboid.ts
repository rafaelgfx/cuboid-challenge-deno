import { Factory } from '/deps/rosie.ts';
import faker from '/deps/faker.ts'; 

export default Factory.define('cuboid').attrs({
  width: () => faker.datatype.number(10),
  height: () => faker.datatype.number(10),
  depth: () => faker.datatype.number(10),
});
