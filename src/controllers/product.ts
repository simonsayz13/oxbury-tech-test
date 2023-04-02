import { Request, Response } from "express";
import {
  addData,
  alterData,
  deleteData,
  filterData,
  getAllData,
  getDataByID,
} from "../services/data-access";
import { FilterFields, FormValues, Product } from "../type";
import { DEFAULT_LIMIT, DEFAULT_PAGE } from "../config/constants";

const TABLE_NAME: string = "product";
const TABLE_COLUMNS: Array<string> = ["id", "type", "name"];

export const getProduct = (req: Request, res: Response): void => {
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

export const addProduct = (req: Request, res: Response): void => {
  const newProduct: Product = req.body;
  addData(newProduct, res, TABLE_NAME);
};

export const deleteProduct = (req: Request, res: Response): void => {
  const id: number = Number(req.query.id);
  deleteData(id, res, TABLE_NAME);
};

export const alterProduct = (req: Request, res: Response): void => {
  const id: number = Number(req.query.id);
  const newProductFields: FormValues = req.body;
  alterData(id, res, TABLE_NAME, newProductFields);
};

export const filterProducts = (req: Request, res: Response): void => {
  const filterFields: FilterFields = req.query as FilterFields;
  const page: number = Number(req.query.page) || DEFAULT_PAGE;
  const limit: number = Number(req.query.limit) || DEFAULT_LIMIT;
  const offset: number = (page - 1) * limit;
  filterData(res, TABLE_NAME, filterFields, TABLE_COLUMNS, page, limit, offset);
};
