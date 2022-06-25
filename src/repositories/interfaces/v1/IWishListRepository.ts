import IRepository from "../IRepository";
import WishList from "../../../models/WishList";
import { WishListFilter } from "@n-types/filters";

export interface IWishListRepository extends IRepository<typeof WishList> {
  list: (filter: WishListFilter) => Promise<typeof WishList["prototype"][]>;
}
