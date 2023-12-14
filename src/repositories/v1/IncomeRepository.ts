import Repository from "../Repository";
import { injectable } from "inversify";
import { AnyQueryBuilder } from "objection";
import Income from "../../models/Income";
import { IIncomeRepository } from '@n-repositories/interfaces/v1';
import { IncomeFilter } from "@n-types/filters";

@injectable()
export class IncomeRepository
  extends Repository<typeof Income>
  implements IIncomeRepository {
  initializeModel(): typeof Income {
    return Income;
  }

  static queryFilter(
    query: AnyQueryBuilder,
    filter: IncomeFilter,
  ): AnyQueryBuilder {
    if (filter?.time) {
      query.whereRaw(`EXTRACT(MONTH FROM time) = ${new Date(filter.time).getMonth() + 1}`).whereRaw(`EXTRACT(YEAR FROM time) = ${new Date(filter.time).getFullYear()}`);
    }
    return query.where("user_key", filter.userKey).orderBy('time', 'desc');
  }

  async list(filter: IncomeFilter): Promise<typeof Income["prototype"][]> {
    return await IncomeRepository.queryFilter(this.model.query(), filter)
  }

  async create(data: typeof Income["prototype"]): Promise<typeof Income["prototype"]> {
    return await this.model.query().insert(data);
  }

  async updateById(id: number, data: any): Promise<typeof Income["prototype"]> {
    return await this.model.query().updateAndFetchById(id, data);
  }

  async delete(id: string | number, userKey: string): Promise<boolean> {
    const result = await this.model.query().deleteById(id).where("user_key", userKey);
    return result === 1 ? true : false;
  }
}
