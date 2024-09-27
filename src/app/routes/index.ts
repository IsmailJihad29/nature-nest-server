import { Router } from 'express';
import { productRouter } from '../modules/product/product.routes';

const router = Router();

const moduleRoutes = [
  {
    path: '/',
    route: productRouter
  }
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
