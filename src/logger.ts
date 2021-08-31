import { Context } from '/deps/oak.ts';

export default async (ctx: Context, next: () => Promise<unknown>) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  console.log(`\n${ctx.request.method} ${ctx.request.url} - ${ms}ms`);
};