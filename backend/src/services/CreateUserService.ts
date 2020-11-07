/* eslint-disable camelcase */
import ICreateUserDTO from '../dtos/ICreateUserDTO';
import AppError from '../errors/AppError';

import User from '../models/User';
import IHashProvider from '../providers/HashProvider/IHashProvider';
import IUserRepository from '../repositories/interface/IUserRepository';

class CreateUserService {
  constructor(
    private userRepository: IUserRepository,
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    name,
    email,
    password,
  }: ICreateUserDTO): Promise<User> {
    const findUser = await this.userRepository.findUserByEmail(email);

    if (findUser) {
      throw new AppError('Email já existe');
    }

    const hashedPassword = await this.hashProvider.generate(password);

    const user = await this.userRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    return user;
  }
}

export default CreateUserService;
