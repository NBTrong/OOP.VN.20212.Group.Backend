import Repository from "../Repository";
import { injectable } from "inversify";
import { AnyQueryBuilder } from "objection";
import WishList from "../../models/WishList";
import { IWishListRepository } from '@n-repositories/interfaces/v1';
import { WishListFilter } from "@n-types/filters";

@injectable()
export class WishListRepository
  extends Repository<typeof WishList>
  implements IWishListRepository
{
  initializeModel(): typeof WishList {
    return WishList;
  }

  static queryFilter(
    query: AnyQueryBuilder,
    filter: WishListFilter,
  ): AnyQueryBuilder {
    return query.where("user_key", filter.userKey);
  }

  async list(filter: WishListFilter): Promise<typeof WishList["prototype"][]> {
    return await WishListRepository.queryFilter(this.model.query(), filter)
  }

  async create(data: typeof WishList["prototype"]): Promise<typeof WishList["prototype"]> {
    return await this.model.query().insert(data);
  }

  async updateById(id: number, data: any): Promise<typeof WishList["prototype"]> {
    return await this.model.query().updateAndFetchById(id, data);
  }

  async deleteById(id: string | number): Promise<boolean> {
    const result = await this.model.query().deleteById(id);
    return result === 1 ? true : false;
  }
}
