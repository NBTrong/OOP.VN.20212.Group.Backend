import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('expenses', table => {
    table.increments('id').primary();
    table.double('amount').nullable();
    table.string('note').nullable();
    table.string('user_key').notNullable();
    table.integer('category_id').references('id').inTable('categories').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  })
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('expenses');
}

