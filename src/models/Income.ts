import { ExtendedModel } from "./ExtendedModel"; 
import { db } from "@n-configs/database";
import Category from "./Category";

class Income extends ExtendedModel {
  id!: number;
  amount?: number;
  note?: string;
  user_key: string;
  category_id: number;
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
      user_key: { type: "string", maxLength: 255 },
      created_at: { type: ["string", "null"], format: "date-time" },
      updated_at: { type: ["string", "null"], format: "date-time" },
    },
  };
}

const IncomeModel = Income.bindKnex(db);

export default IncomeModel;

IncomeModel.relationMappings = {
  categories: {
    relation: ExtendedModel.BelongsToOneRelation,
    modelClass: () => Category,
    join: {
      from: "incomes.category_id",
      to: "categories.id",
    },
  }
}
