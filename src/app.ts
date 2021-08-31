import { Application } from '/deps/oak.ts';
import db from '/src/config/db.ts';
import logger from '/src/logger.ts';
import router from '/src/routes/index.ts';

await db();

const app = new Application();

app.use(logger);
app.use(router.routes());

app.addEventListener('error', (event) => {
  console.log('Error', event.error);
});

export default app;
