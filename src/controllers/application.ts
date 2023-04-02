import { Request, Response } from "express";
import {
  addData,
  alterData,
  deleteData,
  filterData,
  getAllData,
  getDataByID,
} from "../services/data-access";
import { Application, FilterFields, FormValues } from "../type";
import {
  getApplicationFarmer,
  getApplicationProduct,
} from "../services/application-details";

const TABLE_NAME: string = "application";
const TABLE_COLUMNS: Array<string> = [
  "id",
  "type",
  "amount_requested",
  "status",
  "product_id",
  "farmer_id",
];

export const getApplication = (req: Request, res: Response): void => {
  if (typeof req.query.id !== "undefined") {
    const id: number = Number(req.query.id);
    getDataByID(id, TABLE_NAME, res, TABLE_COLUMNS);
  } else {
    const page: number = Number(req.query.page) || 1;
    const limit: number = Number(req.query.limit) || 30;
    const offset: number = (page - 1) * limit;
    getAllData(TABLE_NAME, res, page, limit, offset, TABLE_COLUMNS);
  }
};

export const addApplication = (req: Request, res: Response): void => {
  const newApplication: Application = req.body;
  addData(newApplication, res, TABLE_NAME);
};

export const deleteApplication = (req: Request, res: Response): void => {
  const id: number = Number(req.query.id);
  deleteData(id, res, TABLE_NAME);
};

export const alterApplication = (req: Request, res: Response): void => {
  const id: number = Number(req.query.id);
  const newApplicationFields: FormValues = req.body;
  alterData(id, res, TABLE_NAME, newApplicationFields);
};

export const getApplicationProductDetails = (
  req: Request,
  res: Response
): void => {
  const id: number = Number(req.query.id);
  getApplicationProduct(id, res);
};

export const getApplicationFarmerDetails = (
  req: Request,
  res: Response
): void => {
  const id: number = Number(req.query.id);
  getApplicationFarmer(id, res);
};

export const filterApplications = (req: Request, res: Response): void => {
  const filterFields: FilterFields = req.query as FilterFields;
  const page: number = Number(req.query.page) || 1;
  const limit: number = Number(req.query.limit) || 30;
  const offset: number = (page - 1) * limit;
  filterData(res, TABLE_NAME, filterFields, TABLE_COLUMNS, page, limit, offset);
};
