import IRepository from "./interfaces/IRepository";
import { injectable } from "inversify";
import { Model } from "objection";

@injectable()
export default abstract class Repository<T extends typeof Model>
  implements IRepository<T>
{
  private _model: T;

  constructor() {
    this.makeModel();
  }

  get model(): T {
    return this._model;
  }

  abstract initializeModel(): T;

  static queryFilter(query: any, filter: any, table?: string): any {
    return query;
  }

  public makeModel() {
    this._model = this.initializeModel();
    if (!this._model) {
      throw new Error("Not found model. Please set model by setModel method");
    }
  }

  async create(data: any): Promise<T["prototype"]> {
    return await this.model.query().insert(data);
  }

  async deleteById(id: number | string): Promise<boolean> {
    const number = await this.model.query().deleteById(id);
    return number > 0;
  }

  async findById(id: number | string): Promise<T["prototype"]> {
    return await this.model.query().findById(id);
  }

  async updateById(id: number | string, data: any): Promise<T["prototype"]> {
    return await this.model.query().updateAndFetchById(id, data);
  }

  async findOne(data: any): Promise<T["prototype"]> {
    return await this.model.query().findOne(data);
  }

  async deleteByIds(ids: number[] | string[]): Promise<boolean> {
    const number = await this.model.query().delete().whereIn(`id`, ids);
    return number > 0;
  }
}
