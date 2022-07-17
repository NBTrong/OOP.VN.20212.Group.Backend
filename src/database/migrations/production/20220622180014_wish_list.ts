import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('wish_list', table => {
    table.increments('id').primary();
    table.string('name');
    table.double('amount');
    table.string('user_key').notNullable();
    table.timestamp('time').nullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  })
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('wish_list');
}

