import { Router } from 'express';

import ForgotPasswordController from '../controllers/ForgotPasswordController';

const forgotPasswordController = new ForgotPasswordController();

const routes = Router();

routes.post('/forgot', forgotPasswordController.create);

export default routes;
