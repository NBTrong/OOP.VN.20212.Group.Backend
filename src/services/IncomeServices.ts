import { inject, injectable } from "inversify";
import { REPOSITORIES } from "@n-types/injections/repositories";
import { IIncomeRepository } from "@n-repositories/interfaces/v1";
import { IncomeFilter } from "@n-types/filters";
import { IIncomeServices } from "@n-services/interface";

@injectable()
export class IncomeServices implements IIncomeServices {
  @inject(REPOSITORIES.IncomeRepository)
  private IncomeRepository: IIncomeRepository;

  async list (filter: IncomeFilter): Promise<any> {
    return await this.IncomeRepository.list(filter);
  }
}