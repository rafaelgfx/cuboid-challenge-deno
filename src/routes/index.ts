import { Router } from '/deps/oak.ts';
import bags from '/src/routes/bags.ts';
import cuboids from '/src/routes/cuboids.ts';

const router = new Router();

router.get('/', ctx => ctx.response.body = 'Cuboids');
router.use(bags.prefix('/bags').routes());
router.use(cuboids.prefix('/cuboids').routes());

export default router;
