import { ExtendedModel } from "./ExtendedModel";
import { db } from "@n-configs/database";
import Expense  from "./Expense";
import Income from "./Income";
import WishList from "./WishList";

class Category extends ExtendedModel {
  id!: number;
  name?: string;
  color?: string;

  static tableName = "categories";

  static jsonSchema = {
    type: "object",

    properties: {
      id: { type: "integer" },
      name: { type: ["string", "null"], maxLength: 255 },
      color: { type: ["string", "null"], maxLength: 255 },
    },
  };
}

const CategoryModel = Category.bindKnex(db);

export default CategoryModel;

CategoryModel.relationMappings = {
  expenses: {
    relation: ExtendedModel.HasManyRelation,
    modelClass: () => Expense,
    join: {
      from: "categories.id",
      to: "expenses.category_id",
    },
  },

  incomes: {
    relation: ExtendedModel.HasManyRelation,
    modelClass: () => Income,
    join: {
      from: "categories.id",
      to: "incomes.category_id",
    },
  },

  wish_list: {
    relation: ExtendedModel.HasManyRelation,
    modelClass: () => WishList,
    join: {
      from: "categories.id",
      to: "wish_list.category_id",
    },
  }
};