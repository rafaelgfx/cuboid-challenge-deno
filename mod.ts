import app from '/src/app.ts';

app.addEventListener('listen', ({ hostname, port }) => {
  console.log(`Listening on: ${hostname ?? "localhost"}:${port}`);
});

app.listen({ port: 8000 });
