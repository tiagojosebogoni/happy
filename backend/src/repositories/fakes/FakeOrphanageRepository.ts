import { uuid } from 'uuidv4';
import ICreateOrphanageDTO from '../../dtos/ICreateOrphanageDTO';
import IListOrphanageDTO from '../../dtos/IListOrphanageDTO';

import Orphanage from '../../models/Orphanage';
import IOrphanageRepository from '../interface/IOrphanageRepository';

export default class FakeOrphanageRepository implements IOrphanageRepository {
  private orphanages: Orphanage[] = [];

  public async create(orphanageData: ICreateOrphanageDTO): Promise<Orphanage> {
    const orphanage = new Orphanage();

    Object.assign(orphanage, { id: uuid() }, orphanageData);
    this.orphanages.push(orphanage);

    return orphanage;
  }

  public async list({ id }: IListOrphanageDTO): Promise<Orphanage[]> {
    if (id) {
      const findOrphanages = this.orphanages.filter(
        orphanage => orphanage.id === id,
      );

      return findOrphanages;
    }

    return this.orphanages;
  }
}
