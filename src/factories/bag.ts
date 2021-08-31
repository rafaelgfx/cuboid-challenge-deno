import { Factory } from '/deps/rosie.ts';
import faker from '/deps/faker.ts'; 

export default Factory.define('bag').attrs({
  volume: () => faker.datatype.number(100),
  title: () => `A ${faker.commerce.productAdjective().toLowerCase()} bag`,
});
