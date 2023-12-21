import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.raw('ALTER TABLE categories ALTER COLUMN amount TYPE double precision');
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.raw('ALTER TABLE categories ALTER COLUMN amount TYPE numeric');
}
