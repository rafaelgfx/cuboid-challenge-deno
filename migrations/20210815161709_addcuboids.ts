import { Schema } from "https://deno.land/x/cotton@v0.7.5/mod.ts";

export async function up(schema: Schema) {
  await schema.createTable('cuboids', (table) => {
    table.id();
    table.timestamps();
    table.integer('width');
    table.integer('height');
    table.integer('depth');
    table.foreignId('bag_id', 'bags');
  });
}

export async function down(schema: Schema) {
  await schema.dropTable('cuboids');
}
