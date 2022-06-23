import Repository from "../Repository";
import { injectable } from "inversify";
import { AnyQueryBuilder } from "objection";
import Income from "../../models/Income";
import { IIncomeRepository } from '@n-repositories/interfaces/v1';
import { IncomeFilter } from "@n-types/filters";

@injectable()
export class IncomeRepository
  extends Repository<typeof Income>
  implements IIncomeRepository
{
  initializeModel(): typeof Income {
    return Income;
  }

  static queryFilter(
    query: AnyQueryBuilder,
    filter: IncomeFilter,
  ): AnyQueryBuilder {
    return query.where("user_key", filter.userKey);
  }

  async list(filter: IncomeFilter): Promise<typeof Income["prototype"]> {
    return await IncomeRepository.queryFilter(this.model.query(), filter)
  }
}