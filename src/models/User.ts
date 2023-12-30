import { ExtendedModel } from "./ExtendedModel";
import { db } from "@n-configs/database";

class User extends ExtendedModel {
  id!: number;
  email!: string;
  password!: string;
  user_key!: string;
  created_at?: Date | string | null;
  updated_at?: Date | string | null;

  static tableName = "users";

  static jsonSchema = {
    type: "object",

    properties: {
      id: { type: "integer" },
      email: { type: "string", maxLength: 255 },
      password: { type: "string", maxLength: 255 },
      user_key: { type: "string", maxLength: 255 },
      created_at: { type: ["string", "null"], format: "date-time" },
      updated_at: { type: ["string", "null"], format: "date-time" },
    },
  };
}

const UserModel = User.bindKnex(db);

export default UserModel;

UserModel.relationMappings = {
}
