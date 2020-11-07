import { uuid } from 'uuidv4';

import ICreateUserDTO from '../../dtos/ICreateUserDTO';
import User from '../../models/User';
import IUserRepository from '../interface/IUserRepository';

class FakeUserRepository implements IUserRepository {
  private users: User[] = [];

  public async create({
    name,
    email,
    password,
  }: ICreateUserDTO): Promise<User> {
    const user = new User();

    user.id = uuid();
    user.name = name;
    user.email = email;
    user.password = password;

    this.users.push(user);

    return user;
  }

  public async findUserByEmail(email: string): Promise<User | undefined> {
    const findUser = this.users.find(user => user.email === email);

    return findUser;
  }
}

export default FakeUserRepository;
