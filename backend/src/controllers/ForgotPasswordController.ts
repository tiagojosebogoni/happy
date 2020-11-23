import { Request, Response } from 'express';

import SendForgotPasswordEmailService from '../services/SendForgotPasswordEmailService';
import UserRepository from '../repositories/UserRepository';
import EtherealMailProvider from '../providers/MailProvider/implementations/EtherealMailProvider';
import UserTokenRepository from '../repositories/UserTokenRepository';
import HandlebarsMailTemplateProvider from '../providers/MailTemplateProvider/implementations/HandlebarsMailTemplateProvider';

export default class ForgotPasswordController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email } = request.body;

    const userRepository = new UserRepository();
    const userTokenRepository = new UserTokenRepository();

    const handlebarsMailTemplateProvider = new HandlebarsMailTemplateProvider();
    const etherealMailProvider = new EtherealMailProvider(
      handlebarsMailTemplateProvider,
    );

    const sendForgotPasswordEmailService = new SendForgotPasswordEmailService(
      userRepository,
      etherealMailProvider,
      userTokenRepository,
    );

    await sendForgotPasswordEmailService.execute({ email });

    return response.json();
  }
}
