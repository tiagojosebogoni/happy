import User from '../../models/User';
import ICreateUserDTO from '../../dtos/ICreateUserDTO';

export default interface IUserRepository {
  create(data: ICreateUserDTO): Promise<User>;
  findUserByEmail(email: string): Promise<User | undefined>;
}
