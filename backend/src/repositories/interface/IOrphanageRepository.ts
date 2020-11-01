import ICreateOrphanageDTO from '../../dtos/ICreateOrphanageDTO';
import IListOrphanageDTO from '../../dtos/IListOrphanageDTO';

import Orphanage from '../../models/Orphanage';

export default interface IOrphanageRepository {
  create(orphanageData: ICreateOrphanageDTO): Promise<Orphanage>;
  list(id: IListOrphanageDTO): Promise<Orphanage[]>;
}
