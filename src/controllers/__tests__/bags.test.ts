import { superdeno } from '/deps/superdeno.ts';
import { Status } from '/deps/oak.ts';
import { Rhum } from '/deps/rhum.ts';
import factories from '/src/factories/index.ts';
import app from '/src/app.ts';
import Bag from '/src/models/bag.ts';
import { urlJoin } from '/src/utils.ts';

Rhum.testPlan('bags.test.ts', () => {
  Rhum.testSuite('bag list', () => {
    Rhum.testCase('should get all bags', async () => {
      const sampleSize = 3;
      const bags = factories.bag.buildList(sampleSize);
  
      const ids: number[] = [];
      for (const b of bags) {
        const bag = new Bag();
        Object.assign(bag, b);
        await bag.save();
        ids.push(bag.id);
      }
  
      const request = superdeno(app.handle.bind(app));
      const response = await request.get('/bags').query({
        ids,
      });
  
      Rhum.asserts.assertEquals(response.status, Status.OK);
      Rhum.asserts.assertEquals(response.body.length, ids.length);
      response.body.forEach((bag: Bag) => {
        Rhum.asserts.assertExists(bag.volume);
        Rhum.asserts.assertExists(bag.title);
      });
    });
  });

  Rhum.testSuite('bag get', () => {
    Rhum.testCase('should get by id', async () => {
      const bag = new Bag();
      Object.assign(bag, factories.bag.build());
      await bag.save();

      const request = superdeno(app.handle.bind(app));
      const response = await request.get(urlJoin('/bags', bag.id.toString()));

      Rhum.asserts.assertEquals(response.status, Status.OK);
      Rhum.asserts.assertEquals(typeof response.body.id, 'number');
      Rhum.asserts.assertEquals(response.body.id, bag.id);
    });

    Rhum.testCase('should return not-found if not found', async () => {
      const request = superdeno(app.handle.bind(app));
      const response = await request.get(urlJoin('/bags', '0'));
      Rhum.asserts.assertEquals(response.status, Status.NotFound);
    });
  });

  Rhum.testSuite('bag create', () => {
    Rhum.testCase('should create', async () => {
      const bag = factories.bag.build({ volume: 111, title: 'A bag' });
  
      const request = superdeno(app.handle.bind(app));
      const response = await request.post('/bags').send(bag);
  
      Rhum.asserts.assertEquals(response.status, Status.Created);
  
      const fetchedBag = await Bag.query().where('id', response.body.id).first();
  
      if (!fetchedBag) {
        throw new Error('Bag not found');
      }
  
      const { volume, title } = fetchedBag;
  
      Rhum.asserts.assertEquals(volume, bag.volume);
      Rhum.asserts.assertEquals(title, bag.title);
    });
  });
});

Rhum.run();
