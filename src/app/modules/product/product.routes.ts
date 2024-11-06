import express from 'express';
import { getNewArrivalsController, ProductController } from './product.controller';

export const productRouter = express.Router();
//* For get all products
productRouter.route('/products').get(ProductController.getProductController);
//* get single product
productRouter
  .route('/products/:productId')
  .get(ProductController.getSingleProductController);

//* for create new products
productRouter.route('/products').post(ProductController.createProductController);

//* update single product
productRouter
  .route('/products/:productId')
  .patch(ProductController.updateSingleProductController);

//* delete single product
productRouter
  .route('/products/:productId')
  .delete(ProductController.singleProductController);

//* get new arival product 
productRouter.get("/latest", getNewArrivalsController);