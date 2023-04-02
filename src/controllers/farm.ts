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

const TABLE_NAME: string = "farm";
const TABLE_COLUMNS: Array<string> = [
  "id",
  "name",
  "num_cows",
  "num_chickens",
  "num_pigs",
  "acres_farmed",
];

export const getAllFarms = (req: Request, res: Response): void => {
  const page: number = Number(req.query.page) || 1;
  const limit: number = Number(req.query.limit) || 30;
  const offset: number = (page - 1) * limit;
  getAllData(TABLE_NAME, res, page, limit, offset);
};

export const getSelectedFarm = (req: Request, res: Response): void => {
  const id: number = Number(req.query.id);
  getDataByID(id, TABLE_NAME, res);
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
  filterData(res, TABLE_NAME, filterFields, TABLE_COLUMNS);
};
