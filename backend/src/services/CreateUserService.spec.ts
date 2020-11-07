import CreateUserService from './CreateUserService';
import FakeUserRepository from '../repositories/fakes/FakeUserRepository';
import AppError from '../errors/AppError';
import BCryptHashProvider from '../providers/implementatios/BCryptHashProvider';

let createUserService: CreateUserService;
let fakeUserRepository: FakeUserRepository;
let bcryptHashProvider: BCryptHashProvider;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    bcryptHashProvider = new BCryptHashProvider();
    createUserService = new CreateUserService(
      fakeUserRepository,
      bcryptHashProvider,
    );
  });

  it('should be able to create a new user', async () => {
    const user = await createUserService.execute({
      name: 'tiago',
      email: 'tiagojosebogoni@gmail.com',
      password: '123123',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create a new user with same email from another', async () => {
    await createUserService.execute({
      name: 'Tiago',
      email: 'tiagojosebogoni@gmail.com',
      password: '123123',
    });

    await expect(
      createUserService.execute({
        name: 'Tiago Bogoni',
        email: 'tiagojosebogoni@gmail.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
