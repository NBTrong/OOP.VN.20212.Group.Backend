import { ExtendedModel } from "./ExtendedModel"; 
import { db } from "@n-configs/database";

class WishList extends ExtendedModel {
  id!: number;
  name?: string;
  amount?: number;
  user_key: string;
  time?: Date | string | null;
  created_at?: Date | string | null;
  updated_at?: Date | string | null;

  static tableName = "wish_list";

  static jsonSchema = {
    type: "object",

    properties: {
      id: { type: "integer" },
      amount: { type: ["number", "null"] },
      name: { type: ["string", "null"], maxLength: 255 },
      user_key: { type: "string", maxLength: 255 },
      time: { type: ["string", "null"], format: "date-time" },
      created_at: { type: ["string", "null"], format: "date-time" },
      updated_at: { type: ["string", "null"], format: "date-time" },
    },
  };
}

const WishListModel = WishList.bindKnex(db);

export default WishListModel;

WishListModel.relationMappings = {
}
