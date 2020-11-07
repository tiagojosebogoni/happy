import { Request, Response } from 'express';

import CreateUserService from '../services/CreateUserService';
import BCryptHashProvider from '../providers/implementatios/BCryptHashProvider';
import UserRepository from '../repositories/UserRepository';

import userView from '../views/user_views';

class UserController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const userRepository = new UserRepository();
    const bcryptHashProvider = new BCryptHashProvider();
    const createUserService = new CreateUserService(
      userRepository,
      bcryptHashProvider,
    );

    const user = await createUserService.execute({ name, email, password });

    return response.json(userView.render(user));
  }
}

export default UserController;
