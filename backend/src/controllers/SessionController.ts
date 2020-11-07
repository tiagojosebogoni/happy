/* eslint-disable camelcase */
import { Request, Response } from 'express';
import AuthenticateUserService from '../services/AuthenticateUserService';
import UserRepository from '../repositories/UserRepository';
import session_views from '../views/session_views';
import BCryptHashProvider from '../providers/implementatios/BCryptHashProvider';

class SessionController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const userRepository = new UserRepository();
    const hashProvider = new BCryptHashProvider();
    const authenticateUserService = new AuthenticateUserService(
      userRepository,
      hashProvider,
    );

    const { user, token } = await authenticateUserService.execute({
      email,
      password,
    });

    return response.json(session_views.render(user, token));
  }
}

export default SessionController;
