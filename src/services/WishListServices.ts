import { inject, injectable } from "inversify";
import { REPOSITORIES } from "@n-types/injections/repositories";
import { ICategoryRepository, IWishListRepository } from "@n-repositories/interfaces/v1";
import { WishListFilter } from "@n-types/filters";
import { IWishListServices } from "@n-services/interface";

@injectable()
export class WishListServices implements IWishListServices {
  @inject(REPOSITORIES.WishListRepository)
  private WishListRepository: IWishListRepository;

  @inject(REPOSITORIES.CategoryRepository)
  private CategoryRepository: ICategoryRepository;

  async list (filter: WishListFilter): Promise<any> {
    const wishLists =  await this.WishListRepository.list(filter);
    let wishListsWithCategory = [];
    for (let wishList of wishLists) {
      const category = await this.CategoryRepository.findById(wishList.category_id);
      wishListsWithCategory.push({
        ...wishLists,
        category: {
          id: category.id,
          name: category.name,
          color: category.color,
        }
      });
    }
    return wishListsWithCategory;
  }

  async create (data: any): Promise<any> {
    const category = await this.CategoryRepository.create({
      name: data?.name,
      color: data?.color,
    });
    const wishList = await this.WishListRepository.create({
      amount: data.amount,
      note: data.note,
      user_key: data.userKey,
      category_id: category.id,
      list_index: data.listIndex,
    });
    return {
      ...wishList,
      category,
    }
  }

  async update (id: number, data: any): Promise<any> {
    let wishList = await this.WishListRepository.findById(id);
    if (wishList.user_key !== data.userKey) {
      return {
        status: 500,
        message: "user key not match",
      }
    }
    if (wishList.category_id !== data?.category?.id) {
      return {
        status: 500,
        message: "category id not match",
      }
    }
    const category = await this.CategoryRepository.update(data?.category?.id, {
      name: data?.category?.name,
      color: data?.category?.color,
    });
    wishList = await this.WishListRepository.updateById(id, {
      amount: data.amount,
      note: data.note,
      user_key: data.userKey,
      category_id: category.id,
      list_index: data.listIndex,
    });
    return {
      ...wishList,
      category,
    }
  }

  async delete (id: number): Promise<boolean> {
    return await this.WishListRepository.deleteById(id);
  }  
}
