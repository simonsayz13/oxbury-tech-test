import { Request, Response } from "express";
import {
  addData,
  alterData,
  deleteData,
  filterData,
  getAllData,
  getDataByID,
} from "../services/data-access";
import { Farm, FilterFields, FormValues } from "../type";
import { DEFAULT_PAGE, DEFAULT_LIMIT } from "../config/constants";

const TABLE_NAME: string = "farm";
const TABLE_COLUMNS: Array<string> = [
  "id",
  "name",
  "num_cows",
  "num_chickens",
  "num_pigs",
  "acres_farmed",
];

export const getFarm = (req: Request, res: Response): void => {
  if (typeof req.query.id !== "undefined") {
    const id: number = Number(req.query.id);
    getDataByID(id, TABLE_NAME, res, TABLE_COLUMNS);
  } else {
    const page: number = Number(req.query.page) || DEFAULT_PAGE;
    const limit: number = Number(req.query.limit) || DEFAULT_LIMIT;
    const offset: number = (page - 1) * limit;
    getAllData(TABLE_NAME, res, page, limit, offset, TABLE_COLUMNS);
  }
};

export const addFarm = (req: Request, res: Response): void => {
  const newFarm: Farm = req.body;
  addData(newFarm, res, TABLE_NAME);
};

export const deleteFarm = (req: Request, res: Response): void => {
  const id: number = Number(req.query.id);
  deleteData(id, res, TABLE_NAME);
};

export const alterFarm = (req: Request, res: Response): void => {
  const id: number = Number(req.query.id);
  const newFarmFields: FormValues = req.body;
  alterData(id, res, TABLE_NAME, newFarmFields);
};

export const filterFarms = (req: Request, res: Response): void => {
  const filterFields: FilterFields = req.query as FilterFields;
  const page: number = Number(req.query.page) || DEFAULT_PAGE;
  const limit: number = Number(req.query.limit) || DEFAULT_LIMIT;
  const offset: number = (page - 1) * limit;
  filterData(res, TABLE_NAME, filterFields, TABLE_COLUMNS, page, limit, offset);
};
