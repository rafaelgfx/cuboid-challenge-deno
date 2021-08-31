import { superdeno } from '/deps/superdeno.ts';
import { Rhum } from'/deps/rhum.ts';
import app from '/src/app.ts';

Rhum.testPlan('index.test.ts', () => {
  Rhum.testSuite('get index', () => {
    Rhum.testCase('should GET the index endpoint', async () => {
      const request = await superdeno(app.handle.bind(app));
      const response = await request.get('/');
      Rhum.asserts.assertEquals(response.text, 'Cuboids');
    });
  });
});

Rhum.run();
