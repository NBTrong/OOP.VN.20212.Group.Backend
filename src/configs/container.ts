import { IncomeServices } from './../services/IncomeServices';
import { IIncomeServices } from './../services/interface/IIncomeServices';
import { IncomeRepository } from './../repositories/v1/IncomeRepository';
import { IIncomeRepository } from '@n-repositories/interfaces/v1';
import { Container } from "inversify";
import getDecorators from "inversify-inject-decorators";

import { SERVICES } from "@n-types/injections/services";
import { REPOSITORIES } from "@n-types/injections/repositories";

const container = new Container({ defaultScope: "Singleton" });
    container
    .bind<IIncomeRepository>(REPOSITORIES.IncomeRepository)
    .to(IncomeRepository);

    container
    .bind<IIncomeServices>(SERVICES.IncomeServices)
    .to(IncomeServices);
let { lazyInject } = getDecorators(container);

export { lazyInject };

export default container;