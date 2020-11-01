import IOrphanageRepository from '../repositories/interface/IOrphanageRepository';

import Orphanage from '../models/Orphanage';
import IListOrphanageDTO from '../dtos/IListOrphanageDTO';

class ListOrphanageService {
  constructor(private orphanagesRepository: IOrphanageRepository) {}

  public async execute(id: IListOrphanageDTO): Promise<Orphanage[]> {
    const orphanages = await this.orphanagesRepository.list(id);

    return orphanages;
  }
}
export default ListOrphanageService;
