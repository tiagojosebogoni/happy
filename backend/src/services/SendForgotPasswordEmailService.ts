import path from 'path';

import AppError from '../errors/AppError';
import IMailProvider from '../providers/MailProvider/models/IMailProvider';
import IUserRepository from '../repositories/interface/IUserRepository';
import IUserTokenRepository from '../repositories/interface/IUserTokenRepository';

interface IRequest {
  email: string;
}

class SendForgotPasswordEmailService {
  constructor(
    private userRepository: IUserRepository,
    private mailProvider: IMailProvider,
    private userTokensRepository: IUserTokenRepository,
  ) {}

  public async execute({ email }: IRequest): Promise<void> {
    const user = await this.userRepository.findUserByEmail(email);

    if (!user) {
      throw new AppError('Usuário não encontrado.');
    }

    const { token } = await this.userTokensRepository.generate(user.id);

    const forgotPasswordTemplate = path.resolve(
      __dirname,
      '..',
      'views',
      'forgot_password.hbs',
    );

    await this.mailProvider.sendMail({
      to: {
        name: user.name,
        email: user.email,
      },
      subject: '[Happy] Equipe Happy',
      templateData: {
        file: forgotPasswordTemplate,
        variables: {
          name: user.name,
          link: `http://localhost:3000/reset_password?token=${token}`,
        },
      },
    });
  }
}

export default SendForgotPasswordEmailService;
