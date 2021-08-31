import { Router } from '/deps/oak.ts';
import cuboids from '/src/controllers/cuboids.ts';

const router = new Router();

router
  .get('/', cuboids.list)
  .get('/:id', cuboids.get)
  .post('/', cuboids.create);

export default router;
