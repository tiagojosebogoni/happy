import { getRepository, Repository } from 'typeorm';

import ICreateOrphanageDTO from '../dtos/ICreateOrphanageDTO';
import IListOrphanageDTO from '../dtos/IListOrphanageDTO';

import Orphanage from '../models/Orphanage';
import IOrphanageRepository from './interface/IOrphanageRepository';

export default class OrphanageRepository implements IOrphanageRepository {
  private ormRepository: Repository<Orphanage>;

  constructor() {
    this.ormRepository = getRepository(Orphanage);
  }

  public async create(orphanageData: ICreateOrphanageDTO): Promise<Orphanage> {
    const orphanage = this.ormRepository.create(orphanageData);

    await this.ormRepository.save(orphanage);

    return orphanage;
  }

  public async list({ id }: IListOrphanageDTO): Promise<Orphanage[]> {
    let orphanages;

    if (id) {
      orphanages = this.ormRepository.find({
        where: { id },
        relations: ['images'],
      });
    } else {
      orphanages = this.ormRepository.find({
        where: { pending: true },
        relations: ['images'],
      });
    }

    return orphanages;
  }

  public async listPending(pending = false): Promise<Orphanage[]> {
    const orphanages = this.ormRepository.find({
      where: { pending },
      relations: ['images'],
    });

    return orphanages;
  }
}
