import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable('plans', (table) => {
    table.unique(['user_key', 'category_id']);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable('plans', (table) => {
    table.dropUnique(['user_key', 'category_id']);
  });
}
