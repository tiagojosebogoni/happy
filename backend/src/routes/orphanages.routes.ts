import { Router } from 'express';
import multer from 'multer';

import multerConfig from '../config/upload';
import OrphanagesController from '../controllers/OrphanagesController';

const orphanagesController = new OrphanagesController();

const orphanagesRouter = Router();
const upload = multer(multerConfig.multer);

orphanagesRouter.post('/', upload.array('images'), orphanagesController.create);
orphanagesRouter.get('/', orphanagesController.list);
orphanagesRouter.get('/:id', orphanagesController.show);
orphanagesRouter.get('/pending/:pending', orphanagesController.listPending);

export default orphanagesRouter;
