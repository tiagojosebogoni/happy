/* eslint-disable camelcase */
import { Request, Response } from 'express';
import * as Yup from 'yup';

import CreateOrphanageService from '../services/CreateOrphanageService';
import OrphanageRepository from '../repositories/OrphanageRepository';
import orphanagesView from '../views/orphanages_view';

export default class OrphanagesController {
  public async create(request: Request, response: Response): Promise<Response> {
    const requestImages = request.files as Express.Multer.File[];

    const {
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends,
    } = request.body;

    const images = requestImages.map(image => {
      return { path: image.filename };
    });

    const data = {
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends: open_on_weekends.toLowerCase() === 'true',
      images,
    };

    const schema = Yup.object().shape({
      name: Yup.string().required('Nome é obrigatório'),
      latitude: Yup.number().required('Latitude é obrigatório'),
      longitude: Yup.number().required('Longitude é obrigatório'),
      about: Yup.string().required('Sobre é obrigatório').max(300),
      instructions: Yup.string().required('Instruções é obrigatório'),
      opening_hours: Yup.string().required('Horas aberto é obrigatório'),
      open_on_weekends: Yup.boolean().required(
        'Abre final de semana é obrigatório',
      ),
      images: Yup.array(
        Yup.object().shape({
          path: Yup.string().required(),
        }),
      ),
    });

    await schema.validate(data, {
      abortEarly: false,
    });

    const orphanageRepository = new OrphanageRepository();

    const createOrphanageService = new CreateOrphanageService(
      orphanageRepository,
    );

    const orphanage = await createOrphanageService.execute({
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends,
      images,
    });

    return response.status(201).json(orphanagesView.render(orphanage));
  }

  public async list(request: Request, response: Response): Promise<Response> {
    const orphanageRepository = new OrphanageRepository();

    const orphanages = await orphanageRepository.list({ id: undefined });

    return response.status(201).json(orphanagesView.renderMany(orphanages));
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const orphanageRepository = new OrphanageRepository();

    const orphanages = await orphanageRepository.list({ id });

    return response.status(201).json(orphanagesView.renderMany(orphanages));
  }
}
