import { Knex } from "knex";

// Define the migration to add a new column 'amount' to the 'categories' table
export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable('categories', table => {
    // Add a new column 'amount' with the data type 'decimal' (you can adjust the data type as needed)
    table.decimal('amount').nullable();
  });
}

// Define the rollback migration to drop the 'categories' table
export async function down(knex: Knex): Promise<void> {
  // The down function doesn't need modification as you are only adding a column, not dropping the table
  return knex.schema.dropTable('categories');
}
