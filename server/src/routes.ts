import express from 'express';
import { celebrate, Joi } from 'celebrate';

import multer from 'multer';
import multerConfig from './config/multer';

import PointsController from './controllers/PointsController';
import ItemsController from './controllers/ItemsController';

//desacoplando as rotas
const routes = express.Router();
const upload = multer(multerConfig);

const pointsController = new PointsController();
const itemsController = new ItemsController();

routes.get('/items', itemsController.index);


routes.get('/points', pointsController.index);
routes.get('/points/:id', pointsController.show);

routes.post(
    '/points', 
    upload.single('image'),
    celebrate({
        body: Joi.object().keys({
            name: Joi.string().required(),
            email: Joi.string().required().email(),
            whatsapp: Joi.number().required(),
            latitude: Joi.number().required(),
            longitude: Joi.number().required(),
            city: Joi.string().required(),
            uf: Joi.number().required().max(2),
            items: Joi.string().required(),
        })
    }), 
    pointsController.create
);

export default routes;

/*
{
    abortEarly: false // valida todos os campos e informa todos, não somente o primeiro
}
*/

//metódos
//index - listagem
//show - exibir um único registro
//create - criação - (store)
//update - atualização
//delete - exclusão - (destroy)

