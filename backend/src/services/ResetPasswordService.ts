import { addHours, isAfter } from 'date-fns';
import AppError from '../errors/AppError';

import IUserRepository from '../repositories/interface/IUserRepository';
import IUserTokenRepository from '../repositories/interface/IUserTokenRepository';
import IHashProvider from '../providers/HashProvider/IHashProvider';

interface IRequest {
  token: string;
  password: string;
}

class ResetPasswordService {
  constructor(
    private userRepository: IUserRepository,
    private userTokensRepository: IUserTokenRepository,
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ token, password }: IRequest): Promise<void> {
    const userToken = await this.userTokensRepository.findByToken(token);

    if (!userToken) {
      throw new AppError('Token usuário não encontrado.');
    }

    const compareDate = addHours(userToken.created_at, 2);

    if (isAfter(Date.now(), compareDate)) {
      throw new AppError('Token expirado');
    }

    const user = await this.userRepository.findUserById(userToken.user_id);

    if (!user) {
      throw new AppError('Usuário não encontrado');
    }

    user.password = await this.hashProvider.generate(password);

    this.userRepository.create(user);
  }
}

export default ResetPasswordService;
