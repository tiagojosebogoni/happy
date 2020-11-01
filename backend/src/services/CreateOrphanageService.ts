/* eslint-disable camelcase */
import ICreateOrphanageDTO from '../dtos/ICreateOrphanageDTO';
import Orphanage from '../models/Orphanage';
import IOrphanageRepository from '../repositories/interface/IOrphanageRepository';

class CreateOrphanageService {
  constructor(private orphanagesRepository: IOrphanageRepository) {}

  public async execute({
    name,
    latitude,
    longitude,
    about,
    instructions,
    opening_hours,
    open_on_weekends,
    images,
  }: ICreateOrphanageDTO): Promise<Orphanage> {
    const orphanage = await this.orphanagesRepository.create({
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends,
      images,
    });

    return orphanage;
  }
}
export default CreateOrphanageService;
