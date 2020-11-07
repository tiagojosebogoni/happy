import IHashProvider from '../providers/HashProvider/IHashProvider';
import BCryptHashProvider from '../providers/implementatios/BCryptHashProvider';
import FakeUserRepository from '../repositories/fakes/FakeUserRepository';
import AuthenticateUserService from './AuthenticateUserService';

let fakeUserRepository: FakeUserRepository;
let authenticateUserService: AuthenticateUserService;
let hashProvider: IHashProvider;

describe('AuthenticateUser', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    hashProvider = new BCryptHashProvider();
    authenticateUserService = new AuthenticateUserService(
      fakeUserRepository,
      hashProvider,
    );
  });

  it('should be able autenticate', async () => {
    const user = await fakeUserRepository.create({
      name: 'Name test',
      email: 'test@email.com',
      password: '123123',
    });

    const response = await authenticateUserService.execute({
      email: user.email,
      password: user.password,
    });

    expect(response).toHaveProperty('token');
    expect(response).toHaveProperty('user');
  });
});
