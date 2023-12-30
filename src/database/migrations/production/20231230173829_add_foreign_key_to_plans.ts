import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.table('plans', table => {
    table.foreign('category_id').references('id').inTable('categories').onDelete('CASCADE').onUpdate('CASCADE');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.table('plans', table => {
    table.dropForeign(['category_id']);
  });
}
