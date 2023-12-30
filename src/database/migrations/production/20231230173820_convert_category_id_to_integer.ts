import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable('plans', table => {
    table.integer('category_id').alter();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable('plans', table => {
    table.string('category_id').alter();
  });
}
