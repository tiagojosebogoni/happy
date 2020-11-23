import ResetPasswordService from './ResetPasswordService';
import FakeUserRepository from '../repositories/fakes/FakeUserRepository';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository';
import BCryptHashProvider from '../providers/implementatios/BCryptHashProvider';
import AppError from '../errors/AppError';

let fakeUserRepository: FakeUserRepository;
let fakeUserTokensRepository: FakeUserTokensRepository;
let resetPasswordService: ResetPasswordService;
let hashProvider: BCryptHashProvider;

describe('SendForgotPasswordEmailService', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeUserTokensRepository = new FakeUserTokensRepository();
    hashProvider = new BCryptHashProvider();

    resetPasswordService = new ResetPasswordService(
      fakeUserRepository,
      fakeUserTokensRepository,
      hashProvider,
    );
  });

  it('should be able to reset the password', async () => {
    const user = await fakeUserRepository.create({
      name: 'Joe Doe',
      email: 'email@example.com',
      password: '123456',
    });

    const { token } = await fakeUserTokensRepository.generate(user.id);

    await resetPasswordService.execute({ token, password: '123123' });

    const updatedUser = await fakeUserRepository.findUserById(user.id);
    if (!updatedUser) {
      return;
    }

    const checkPassword = await hashProvider.compareHash(
      '123123',
      updatedUser.password,
    );

    expect(checkPassword).toBe(true);
  });

  it('not should be able to reset the password with invalid token', async () => {
    const user = await fakeUserRepository.create({
      name: 'Joe Doe',
      email: 'email@example.com',
      password: '123456',
    });

    await fakeUserTokensRepository.generate(user.id);

    await expect(
      resetPasswordService.execute({
        token: 'invalid Token',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
