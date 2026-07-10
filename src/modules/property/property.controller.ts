import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { propertyService } from "./property.service";

const createProperty = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body;

    // from auth middleware 
    const landlordId = req.user!.id as string;

    const property = await propertyService.createPropertyIntoDB(
      landlordId,
      payload
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "Property created successfully",
      data: { property },
    });
  }
);

const getAllProperties = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await propertyService.getAllPropertiesFromDB(req.query);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Properties fetched successfully",
      data: result,
    });
  }
);

const getSingleProperty = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const property = await propertyService.getSinglePropertyFromDB(id as string);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Property fetched successfully",
      data: { property },
    });
  }
);

const updateProperty = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const landlordId = req.user!.id;

    const property = await propertyService.updatePropertyIntoDB(
      id as string,
      landlordId,
      req.body
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Property updated successfully",
      data: { property },
    });
  }
);

const deleteProperty = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const landlordId = req.user!.id;

    await propertyService.deletePropertyFromDB(id as string, landlordId);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Property deleted successfully",
      data: null,
    });
  }
);

export const propertyController = {
  createProperty,
  getAllProperties,
  getSingleProperty,
  updateProperty,
  deleteProperty,
};