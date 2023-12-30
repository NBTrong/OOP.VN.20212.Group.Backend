import { ExtendedModel } from "./ExtendedModel";
import { db } from "@n-configs/database";
import Category from "./Category";

class Plan extends ExtendedModel {
  id!: number;
  amount?: number;
  user_key!: string;
  category_id: number;
  created_at?: Date | string | null;
  updated_at?: Date | string | null;

  static tableName = "plans";

  static jsonSchema = {
    type: "object",

    properties: {
      id: { type: "integer" },
      amount: { type: ["number", "null"] },
      category_id: { type: "integer" },
      user_key: { type: "string", maxLength: 255 },
      created_at: { type: ["string", "null"], format: "date-time" },
      updated_at: { type: ["string", "null"], format: "date-time" },
    },
  };
}

const PlanModel = Plan.bindKnex(db);

export default PlanModel;

PlanModel.relationMappings = {
  categories: {
    relation: ExtendedModel.BelongsToOneRelation,
    modelClass: () => Category,
    join: {
      from: "plans.category_id",
      to: "categories.id",
    },
  }
}
