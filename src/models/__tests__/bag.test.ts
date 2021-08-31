import { Rhum } from '/deps/rhum.ts';
import Bag from '/src/models/bag.ts';
import Cuboid from '/src/models/cuboid.ts';

const testCases = [
  {
    title: 'no cuboids',
    bag: {
      volume: 10,
      title: 'A bag with no cuboids',
      payloadVolume: 0,
      availableVolume: 10,
      cuboids: [],
    },
  },
  {
    title: 'one cuboid',
    bag: {
      volume: 20,
      title: 'A bag with one cuboid',
      payloadVolume: 18,
      availableVolume: 2,
      cuboids: [{ width: 3, height: 2, depth: 3 }],
    },
  },
  {
    title: 'two cuboids',
    bag: {
      volume: 10,
      title: 'A bag with two cuboids',
      payloadVolume: 8,
      availableVolume: 2,
      cuboids: [
        { width: 1, height: 2, depth: 3 },
        { width: 1, height: 2, depth: 1 },
      ],
    },
  },
  {
    title: 'three cuboids',
    bag: {
      volume: 100,
      title: 'A bag with three cuboids',
      payloadVolume: 99,
      availableVolume: 1,
      cuboids: [
        { width: 2, height: 2, depth: 2 },
        { width: 3, height: 3, depth: 3 },
        { width: 4, height: 4, depth: 4 },
      ],
    },
  }
];

Rhum.testPlan('bag.test.ts', () => {
  testCases.forEach(testCase => {
    Rhum.testSuite(`Bag with ${testCase.title}`, () => {
      let bag: Bag;
      const { volume, title, payloadVolume, availableVolume, cuboids } = testCase.bag;
    
      Rhum.beforeAll(() => {
        bag = new Bag();
        bag.volume = volume;
        bag.title = title;
        bag.cuboids = cuboids.map(c => {
          const cuboid = new Cuboid();
          cuboid.width = c.width;
          cuboid.height = c.height;
          cuboid.depth = c.depth;
          return cuboid;
        });
      });
    
      Rhum.testCase('should have volume', () => {
        Rhum.asserts.assertEquals(bag.volume, volume);
      });
    
      Rhum.testCase('should have title', () => {
        Rhum.asserts.assertEquals(bag.title, title);
      });
    
      Rhum.testCase('should have payloadVolume', () => {
        Rhum.asserts.assertEquals(bag.payloadVolume, payloadVolume);
      });
    
      Rhum.testCase('should have availableVolume', () => {
        Rhum.asserts.assertEquals(bag.availableVolume, availableVolume);
      });
    });  
  });
});

Rhum.run();
