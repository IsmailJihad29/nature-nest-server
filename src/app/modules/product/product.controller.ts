/* eslint-disable @typescript-eslint/no-unused-vars */
import { RequestHandler } from 'express';
import catchAsync from '../../utils/catchAsync';
import { ProductServices } from './product.service';
import { ProductZodSchema } from './product.validate';
import { TProductModel } from './product.model';

//* For get all products

const getProductController: RequestHandler = catchAsync(async (req, res, next) => {
  try {
    const searchQuery = req.query.search as string;
    const category = req.query.category as string;
    const sortOrder = req.query.sortOrder as string;
    const priceRange = req.query.priceRange as string; // e.g., "0-1000"
    
    // Pass the filters to the service layer
    const result = await ProductServices.getFilteredProducts({
      searchQuery,
      category,
      sortOrder,
      priceRange,
    });

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Filtered products retrieved successfully',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong!',
      error: err,
    });
  }
});



//* for get single product detail
const getSingleProductController: RequestHandler = catchAsync(async (req, res, next) => {
  try {
    const { productId } = req.params;
    const result = await ProductServices.getSingleProductFromDb(productId);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.status(201).json({
      success: 'true',
      statusCode: 200,
      message: `Product received successfully is ${result?.title}`,
      data: result
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Something Went Wrong!!',
      date: err
    });
  }
});

//* for create new products
const createProductController: RequestHandler = catchAsync(async (req, res, next) => {
  const { title, price, category, quantity, description, rating, image } = req.body;
  const productData = { title, price, category, quantity, description, rating, image };
  try {
    const isValidData = await ProductZodSchema.parseAsync(productData);
    const existingProduct = await TProductModel.findOne({ title: productData.title });

    if (existingProduct) {
      return res.status(400).json({
        message:
          'A product with this title already exists. Please choose a different title.'
      });
    }

    const result = await ProductServices.createProductIntoDb(isValidData);
    res.status(201).json({
      success: 'true',
      statusCode: 200,
      message: 'Product Created successfully',
      data: result
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Something Went Wrong!!',
      date: err
    });
  }
});

//* update single product detail
const updateSingleProductController: RequestHandler = catchAsync(
  async (req, res, next) => {
    try {
      const { productId } = req.params;

      const validatedData = ProductZodSchema.parse(req.body);

      const updatedProduct = await ProductServices.updateProductInDb(
        productId,
        validatedData
      );

      // const result = await ProductServices.getSingleProductFromDb(productId);

      if (!updatedProduct) {
        return res.status(404).json({
          success: false,
          message: 'Product not found'
        });
      }

      res.status(201).json({
        success: 'true',
        statusCode: 200,
        message: `Product Updated successfully is ${updatedProduct?.title}`,
        data: updatedProduct
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: 'Something Went Wrong!!',
        date: err
      });
    }
  }
);

//* delete single product detail
const singleProductController: RequestHandler = catchAsync(async (req, res, next) => {
  try {
    const { productId } = req.params;

    const result = await ProductServices.deleteProductInDb(productId);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.status(201).json({
      success: 'true',
      statusCode: 200,
      message: `Product Deleted successfully is ${result?.title}`,
      data: result
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Something Went Wrong!!',
      date: err
    });
  }
});

export const ProductController = {
  getProductController,
  getSingleProductController,
  createProductController,
  updateSingleProductController,
  singleProductController
};
