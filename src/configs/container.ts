import { WishListServices } from './../services/WishListServices';
import { WishListRepository } from './../repositories/v1/WishListRepository';
import { IWishListRepository } from './../repositories/interfaces/v1/IWishListRepository';
import { ExpenseRepository } from './../repositories/v1/ExpenseRepository';
import { IExpenseRepository } from './../repositories/interfaces/v1/IExpenseRepository';
import { IncomeServices } from './../services/IncomeServices';
import { IIncomeServices } from './../services/interface/IIncomeServices';
import { IncomeRepository } from './../repositories/v1/IncomeRepository';
import { IIncomeRepository, ICategoryRepository } from '@n-repositories/interfaces/v1';
import { Container } from "inversify";
import getDecorators from "inversify-inject-decorators";

import { SERVICES } from "@n-types/injections/services";
import { REPOSITORIES } from "@n-types/injections/repositories";
import { IExpenseServices, IWishListServices } from '@n-services/interface';
import { ExpenseServices } from '@n-services/ExpenseServices';
import { CategoryRepository } from '@n-repositories/v1/CategoryRepository';

const container = new Container({ defaultScope: "Singleton" });
    container
    .bind<IIncomeRepository>(REPOSITORIES.IncomeRepository)
    .to(IncomeRepository);
    container
    .bind<IExpenseRepository>(REPOSITORIES.ExpenseRepository)
    .to(ExpenseRepository);
    container
    .bind<ICategoryRepository>(REPOSITORIES.CategoryRepository)
    .to(CategoryRepository);
    container
    .bind<IWishListRepository>(REPOSITORIES.WishListRepository)
    .to(WishListRepository)

    container
    .bind<IIncomeServices>(SERVICES.IncomeServices)
    .to(IncomeServices);
    container
    .bind<IExpenseServices>(SERVICES.ExpenseServices)
    .to(ExpenseServices);
    container
    .bind<IWishListServices>(SERVICES.WishListServices)
    .to(WishListServices)
let { lazyInject } = getDecorators(container);

export { lazyInject };

export default container;