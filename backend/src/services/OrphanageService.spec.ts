import CreateOrphanageService from './CreateOrphanageService';
import ListOrphanageService from './ListOrphanageService';
import FakeOrphanageRepository from '../repositories/fakes/FakeOrphanageRepository';

let fakeOrphanageRepository: FakeOrphanageRepository;
let createOrphanageService: CreateOrphanageService;
let listOrphanageService: ListOrphanageService;

describe('Orphanage', () => {
  beforeEach(() => {
    fakeOrphanageRepository = new FakeOrphanageRepository();
    createOrphanageService = new CreateOrphanageService(
      fakeOrphanageRepository,
    );
    listOrphanageService = new ListOrphanageService(fakeOrphanageRepository);
  });

  it('should be able to create a new orphanage', async () => {
    const orphanage = await createOrphanageService.execute({
      name: 'Lar das crianças',
      latitude: -26.998183,
      longitude: -48.6516966,
      about: 'muito conhecido',
      instructions: 'aberto todo dia ',
      opening_hours: '7 as 18h',
      open_on_weekends: true,
    });

    expect(orphanage).toHaveProperty('id');
  });

  it('shoud be able list all orphanages', async () => {
    createOrphanageService.execute({
      name: 'Lar das crianças',
      latitude: -26.998183,
      longitude: -48.6516966,
      about: 'muito conhecido',
      instructions: 'aberto todo dia ',
      opening_hours: '7 as 18h',
      open_on_weekends: true,
    });
    createOrphanageService.execute({
      name: 'Lar das crianças',
      latitude: -26.998183,
      longitude: -48.6516966,
      about: 'muito conhecido',
      instructions: 'aberto todo dia ',
      opening_hours: '7 as 18h',
      open_on_weekends: true,
    });

    const id = '';
    const orphanages = await listOrphanageService.execute({ id });

    expect(orphanages.length).toBe(2);
  });

  it('shoud be able list one orphanages', async () => {
    createOrphanageService.execute({
      name: 'Lar das crianças',
      latitude: -26.998183,
      longitude: -48.6516966,
      about: 'muito conhecido',
      instructions: 'aberto todo dia ',
      opening_hours: '7 as 18h',
      open_on_weekends: true,
    });

    const orphanage = await createOrphanageService.execute({
      name: 'Lar das crianças2',
      latitude: -26.998183,
      longitude: -48.6516966,
      about: 'muito conhecido2',
      instructions: 'aberto todo dia2',
      opening_hours: '7 as 18h',
      open_on_weekends: true,
    });

    const orphanages = await listOrphanageService.execute({ id: orphanage.id });

    expect(orphanage.id).toBe(orphanages[0].id);
  });
});
