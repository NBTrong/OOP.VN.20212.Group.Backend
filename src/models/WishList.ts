import { ExtendedModel } from "./ExtendedModel"; 
import { db } from "@n-configs/database";
import Category from "./Category";

class WishList extends ExtendedModel {
  id!: number;
  note?: string;
  amount?: number;
  list_index?: number;
  category_id: number;
  user_key: string;
  created_at?: Date | string | null;
  updated_at?: Date | string | null;

  static tableName = "wish_list";

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

const WishListModel = WishList.bindKnex(db);

export default WishListModel;

WishListModel.relationMappings = {
  categories: {
    relation: ExtendedModel.BelongsToOneRelation,
    modelClass: () => Category,
    join: {
      from: "wish_list.category_id",
      to: "categories.id",
    },
  }
}
