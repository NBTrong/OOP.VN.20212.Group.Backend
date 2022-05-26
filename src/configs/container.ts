import { Container } from "inversify";
import getDecorators from "inversify-inject-decorators";

import { SERVICES } from "@n-types/injections/services";
import { REPOSITORIES } from "@n-types/injections/repositories";

const container = new Container({ defaultScope: "Singleton" });
    // container
    // .bind<INekoRepository>(REPOSITORIES.NekoRepository)
    // .to(NekoRepository);

let { lazyInject } = getDecorators(container);

export { lazyInject };

export default container;