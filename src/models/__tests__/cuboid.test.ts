import { Rhum } from '/deps/rhum.ts';
import Bag from '/src/models/bag.ts';
import Cuboid from '/src/models/cuboid.ts';

let bag: Bag;

Rhum.testPlan('cuboid.test.ts', () => {
  Rhum.beforeAll(() => {
    bag = new Bag();
    bag.volume = 100;
    bag.title = 'A bag';

    const cuboid = new Cuboid();
    cuboid.width = 2;
    cuboid.height = 2;
    cuboid.depth = 2;

    bag.cuboids = [cuboid];
  });

  const testCases = [
    {
      title: 'Cuboid 3 x 3 x 3',
      cuboid: {
        width: 3,
        height: 3,
        depth: 3,
        volume: 27,
      }
    },
    {
      title: 'Cuboid 4 x 4 x 4',
      cuboid: {
        width: 4,
        height: 4,
        depth: 4,
        volume: 64,
      }
    }
  ];

  testCases.forEach(testCase => {
    Rhum.testSuite(testCase.title, () => {
      let cuboid: Cuboid;

      const { width, height, depth, volume } = testCase.cuboid;

      Rhum.beforeAll(() => {
        cuboid = new Cuboid();
        cuboid.width = width;
        cuboid.height = height;
        cuboid.depth = depth;
      });

      Rhum.testCase('should have dimensions', () => {
        Rhum.asserts.assertEquals(cuboid.width, width);
        Rhum.asserts.assertEquals(cuboid.height, height);
        Rhum.asserts.assertEquals(cuboid.depth, depth);
      });
    
      Rhum.testCase('should have volume', () => {
        Rhum.asserts.assertEquals(cuboid.volume, volume);
      });
    });
  });
});

Rhum.run();
