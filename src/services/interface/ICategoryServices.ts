import { CategoryFilter, ReportFilter, UpdateCategoryFilter } from "@n-types/filters";
import Category from "../../models/Category";

export interface ICategoryServices {
  list: (filter: CategoryFilter) => Promise<typeof Category["prototype"]>;
  update: (filter: UpdateCategoryFilter) => Promise<typeof Category["prototype"]>;
  report: (filter: ReportFilter) => Promise<typeof Category["prototype"]>
}
