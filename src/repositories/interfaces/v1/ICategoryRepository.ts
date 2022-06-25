import IRepository from "../IRepository";
import Category from "../../../models/Category";

export interface ICategoryRepository extends IRepository<typeof Category> {
  findById(id: string | number): Promise<typeof Category["prototype"]>;
  create(data: any): Promise<typeof Category["prototype"]>;
  update(id: string | number, data: any): Promise<typeof Category["prototype"]>;
}
