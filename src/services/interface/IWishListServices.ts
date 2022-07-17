import { WishListFilter } from "@n-types/filters";
import WishList from "../../models/WishList";

export interface IWishListServices {
  list: (filter: WishListFilter) => Promise<typeof WishList["prototype"]>;
  create: (data: any) => Promise<typeof WishList["prototype"]>;
  update: (id: number, data: any) => Promise<typeof WishList["prototype"]>;
  delete: (id: number, userKey: string) => Promise<boolean>;
}
