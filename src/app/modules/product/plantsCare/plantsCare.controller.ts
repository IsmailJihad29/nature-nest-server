// src/controllers/plantsCare.controller.ts
import { RequestHandler,  } from 'express';
import catchAsync from '../../../utils/catchAsync';
import { PlantsCareServices } from './plantsCare.service';

export const getNewArrivalsController: RequestHandler = catchAsync(async (_req, res) => {
    try {
      const plantsCare = await PlantsCareServices.getPlantsCareFromDb();
      return res.status(200).json({
        success: true,
        data: plantsCare,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Failed to fetch new plants care",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  });


  export const PlantsCareController = {
    getNewArrivalsController,
  };

