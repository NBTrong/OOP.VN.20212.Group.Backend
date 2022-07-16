import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  // return knex.schema.createTable('categories', table => {
  //   table.increments('id').primary();
  //   table.string('name').nullable();
  //   table.string('color').nullable();
  //   table.string('icon').nullable();
  //   table.string('status').nullable();
  //   table.timestamp('created_at').defaultTo(knex.fn.now());
  //   table.timestamp('updated_at').defaultTo(knex.fn.now());
  // })
}


export async function down(knex: Knex): Promise<void> {
  // return knex.schema.dropTable('categories');
}

