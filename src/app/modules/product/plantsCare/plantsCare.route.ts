import express from 'express';
import { PlantsCareController } from './plantsCare.controller';

export const plantsCareRouter = express.Router();
//* For get all products
plantsCareRouter.route('/plants-care').get(PlantsCareController.getNewArrivalsController);