import { superdeno } from '/deps/superdeno.ts';
import { Status } from '/deps/oak.ts';
import { Rhum } from'/deps/rhum.ts';
import factories from '/src/factories/index.ts';
import app from '/src/app.ts';
import Bag from '/src/models/bag.ts';
import Cuboid from '/src/models/cuboid.ts';
import { urlJoin } from '/src/utils.ts';

Rhum.testPlan('cuboids.test.ts', () => {
  Rhum.testSuite('cuboid get', () => {
    let bag: Bag;
  
    Rhum.beforeEach(async () => {
      bag = new Bag();
      bag.volume = 10000;
      bag.title = 'A bag';
      await bag.save();
    });
  
    Rhum.testCase('should get all cuboids', async () => {
      const sampleSize = 3;
      const cuboids = factories.cuboid.buildList(sampleSize, { bag });
  
      const ids: number[] = [];
      for (const c of cuboids) {
        const cuboid = new Cuboid();
        Object.assign(cuboid, c);
        await cuboid.save();
        ids.push(cuboid.id);
      }
  
      const request = superdeno(app.handle.bind(app));
      const response = await request.get('/cuboids').query({
        ids,
      });
  
      Rhum.asserts.assertEquals(response.status, Status.OK);
      Rhum.asserts.assertEquals(response.body.length, ids.length);
  
      response.body.forEach((cuboid: Cuboid) => {
        Rhum.asserts.assertExists(cuboid.width);
        Rhum.asserts.assertExists(cuboid.height);
        Rhum.asserts.assertExists(cuboid.depth);
        Rhum.asserts.assertEquals(cuboid.bag.id, bag.id);
      });
    });
  
    Rhum.testCase('should get by id', async () => {
      const cuboid = new Cuboid();
      Object.assign(cuboid, factories.cuboid.build({ bag }));
      await cuboid.save();
  
      const request = superdeno(app.handle.bind(app));
      const response = await request.get(urlJoin('/cuboids', cuboid.id.toString()));
  
      Rhum.asserts.assertEquals(response.status, Status.OK);
      Rhum.asserts.assertEquals(typeof response.body.id, 'number');
      Rhum.asserts.assertEquals(response.body.id, cuboid.id);
    });
      
    Rhum.testCase('should return not-found if not found', async () => {
      const request = superdeno(app.handle.bind(app));
      const response = await request.get(urlJoin('/cuboids', '0'));
      Rhum.asserts.assertEquals(response.status, Status.NotFound);
    });
  });
  
  Rhum.testSuite('cuboid create', () => {
    let bag: Bag;
  
    Rhum.beforeEach(async () => {
      bag = new Bag();
      bag.volume = 2000;
      bag.title = 'A bag';
      await bag.save();
  
      const cuboids = factories.cuboid.buildList(3, {
        width: 10,
        height: 10,
        depth: 5,
        bag,
      });
  
      for (const c of cuboids) {
        const cuboid = new Cuboid();
        Object.assign(cuboid, c);
        await cuboid.save();
      }
    });
  
    Rhum.testCase('should succeed', async () => {
      const cuboid = new Cuboid();
      cuboid.width = 6;
      cuboid.height = 7;
      cuboid.depth = 8;
  
      const request = superdeno(app.handle.bind(app));
      const response = await request.post('/cuboids').send({
        ...cuboid,
        bagId: bag.id,
      });
  
      Rhum.asserts.assertEquals(response.status, Status.Created);
  
      const fetchedCuboid = await Cuboid.query().include('bag').where('id', response.body.id).first();
  
      if (!fetchedCuboid) {
        throw new Error('Cuboid not found');
      }
  
      Rhum.asserts.assertEquals(fetchedCuboid.width, cuboid.width);
      Rhum.asserts.assertEquals(fetchedCuboid.height, cuboid.height);
      Rhum.asserts.assertEquals(fetchedCuboid.depth, cuboid.depth);
      Rhum.asserts.assertEquals(fetchedCuboid.bag.id, bag.id);
    });
  
    Rhum.testCase('should fail if insufficient capacity', async () => {
      const cuboid = new Cuboid();
      cuboid.width = 7;
      cuboid.height = 8;
      cuboid.depth = 9;
  
      const request = superdeno(app.handle.bind(app));
      const response = await request.post('/cuboids').send({
        ...cuboid,
        bagId: bag.id,
      });
  
      Rhum.asserts.assertEquals(response.status, Status.UnprocessableEntity);
      Rhum.asserts.assertEquals(response.body.message, 'Insufficient capacity in bag');
    });
      
    Rhum.testCase('should return not-found because bag does not exists', async () => {
      const cuboid = new Cuboid();
      cuboid.width = 6;
      cuboid.height = 7;
      cuboid.depth = 8;
      
      const request = superdeno(app.handle.bind(app));
      const response = await request.post('/cuboids').send({
        ...cuboid,
        bagId: 99999,
      });
  
      Rhum.asserts.assertEquals(response.status, Status.NotFound);
    });
  });
  
  /**
   * DO NOT modify the tests ABOVE
   * IMPLEMENT the tests BELOW
   */
  
   Rhum.testSuite('cuboid update', () => {
    let bag: Bag;
    let cuboid: Cuboid;
  
    Rhum.beforeEach(async () => {
      bag = new Bag();
      bag.volume = 250;
      bag.title = 'A bag';
      await bag.save();
  
      const someCuboid = new Cuboid();
      someCuboid.width = 5;
      someCuboid.height = 5;
      someCuboid.depth = 5;
      someCuboid.bag = bag;
      await someCuboid.save();
  
      cuboid = new Cuboid();
      cuboid.width = 4;
      cuboid.height = 4;
      cuboid.depth = 4;
      cuboid.bag = bag;
      await cuboid.save();
    });
  
    Rhum.testCase('should succeed to update the cuboid', () => {
      const [newWidth, newHeight, newDepth] = [5, 5, 5];
      const response = { body: {} as Cuboid, status: Status.OK };
  
      Rhum.asserts.assertEquals(response.status, Status.OK);
      Rhum.asserts.assertEquals(response.body.width, newWidth);
      Rhum.asserts.assertEquals(response.body.height, newHeight);
      Rhum.asserts.assertEquals(response.body.depth, newDepth);
      Rhum.asserts.assertEquals(response.body.bag.id, bag.id);
    });
  
    Rhum.testCase('should fail to update if insufficient capacity and return 422 status code', () => {
      const [newWidth, newHeight, newDepth] = [6, 6, 6];
      const response = {
        body: {} as Cuboid,
        status: Status.UnprocessableEntity,
      };
  
      Rhum.asserts.assertEquals(response.status, Status.UnprocessableEntity);
      Rhum.asserts.assertNotEquals(response.body.width, newWidth);
      Rhum.asserts.assertNotEquals(response.body.height, newHeight);
      Rhum.asserts.assertNotEquals(response.body.depth, newDepth);
    });
  });
  
  Rhum.testSuite('cuboid delete', () => {
    Rhum.testCase('should delete the cuboid', () => {
      const response = { status: Status.OK };
      Rhum.asserts.assertEquals(response.status, Status.OK);
    });
  
    Rhum.testCase('should not delete and return 404 status code when cuboids doesnt exists', () => {
      const response = { status: Status.NotFound };
      Rhum.asserts.assertEquals(response.status, Status.NotFound);
    });
  });  
});

Rhum.run();
