import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('wish_list', table => {
    table.increments('id').primary();
    table.string('note');
    table.string('amount');
    table.integer('list_index').unsigned();
    table.string('user_key').notNullable();
    table.integer('category_id').references('id').inTable('categories');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  })
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('wish_list');
}

