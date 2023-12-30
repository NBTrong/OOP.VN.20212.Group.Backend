import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.table('categories', (table) => {
    table.dropColumn('amount');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.table('categories', (table) => {
    table.double('amount').nullable().defaultTo(0);
  });
}
