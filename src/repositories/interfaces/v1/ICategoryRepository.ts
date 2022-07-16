import IRepository from "../IRepository";
import Category from "../../../models/Category";
import { CategoryFilter, ReportFilter } from "@n-types/filters/";
export interface ICategoryRepository extends IRepository<typeof Category> {
  findById(id: string | number): Promise<typeof Category["prototype"]>;
  create(data: any): Promise<typeof Category["prototype"]>;
  update(id: string | number, data: any): Promise<typeof Category["prototype"]>;
  list(filter: CategoryFilter): Promise<typeof Category["prototype"][]>;
  report(filter: ReportFilter): Promise<typeof Category["prototype"][]>;
}
