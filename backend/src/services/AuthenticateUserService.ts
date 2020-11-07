import { sign } from 'jsonwebtoken';

import AppError from '../errors/AppError';
import User from '../models/User';
import IHashProvider from '../providers/HashProvider/IHashProvider';
import IUserRepository from '../repositories/interface/IUserRepository';
import auth from '../config/auth';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}

class AuthenticateUserService {
  constructor(
    private userRepository: IUserRepository,
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.userRepository.findUserByEmail(email);

    if (!user) {
      throw new AppError('User not exists', 401);
    }

    this.hashProvider.compareHash(password, user.password);

    const { expiresIn, secret } = auth.jwt;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    return {
      user,
      token,
    };
  }
}

export default AuthenticateUserService;
