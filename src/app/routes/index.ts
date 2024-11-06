import { Router } from 'express';
import { productRouter } from '../modules/product/product.routes';
import { plantsCareRouter } from '../modules/product/plantsCare/plantsCare.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/',
    route: productRouter
  },
  {
    path: '/',
    route: plantsCareRouter
  }
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
