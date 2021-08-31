import { Router } from '/deps/oak.ts';
import bags from '/src/controllers/bags.ts';

const router = new Router();

router
  .get('/', bags.list)
  .get('/:id', bags.get)
  .post('/', bags.create);

export default router;
