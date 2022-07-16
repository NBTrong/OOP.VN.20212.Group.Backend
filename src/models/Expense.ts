import { ExtendedModel } from "./ExtendedModel"; 
import { db } from "@n-configs/database";
import Category from "./Category";

class Expense extends ExtendedModel {
  id!: number;
  amount?: number;
  note?: string;
  time?: Date | string | null;
  category_id: number;
  user_key: string;
  created_at?: Date | string | null;
  updated_at?: Date | string | null;

  static tableName = "expenses";

  static jsonSchema = {
    type: "object",

    properties: {
      id: { type: "integer" },
      amount: { type: ["number", "null"] },
      note: { type: ["string", "null"], maxLength: 255 },
      category_id: { type: "integer" },
      time: { type: ["string", "null"], format: "date-time" },
      user_key: { type: "string", maxLength: 255 },
      created_at: { type: ["string", "null"], format: "date-time" },
      updated_at: { type: ["string", "null"], format: "date-time" },
    },
  };
}

const ExpenseModel = Expense.bindKnex(db);

export default ExpenseModel;

ExpenseModel.relationMappings = {
  categories: {
    relation: ExtendedModel.BelongsToOneRelation,
    modelClass: () => Category,
    join: {
      from: "expenses.category_id",
      to: "categories.id",
    },
  }
}
