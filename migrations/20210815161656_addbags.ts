import { Schema } from "https://deno.land/x/cotton@v0.7.5/mod.ts";

export async function up(schema: Schema) {
  await schema.createTable('bags', (table) => {
    table.id();
    table.timestamps();
    table.integer('volume');
  });
}

export async function down(schema: Schema) {
  await schema.dropTable('bags');
}
