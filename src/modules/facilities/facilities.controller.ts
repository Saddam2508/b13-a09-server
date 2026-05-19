import type { Request, Response } from "express";
import sendResponse from "../../utility/sendResponse";
import { facilitiesService } from "./facilities.service";

const createFacilities = async (req: Request, res: Response) => {
  
  try {
    const result = await facilitiesService.createFacilitiesIntoDB (req.body);
    console.log(result);

    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "facility Created successfully!",
      data: result
    });
  } catch (error: any) {
    sendResponse(res, {
      statusCode: 500,
      success: false,
      message: error.message,
      error: error,
    });
  }
};

const getAllFacilities = async (req: Request, res: Response) => {

  try {
    const result = await facilitiesService.getAllFacilitiesFromDB();
    res.status(200).json({
      success: true,
      message: "Users retrived successfully!",
      data: result
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
};




export const facilitiesController = {
  createFacilities,
  getAllFacilities
};
