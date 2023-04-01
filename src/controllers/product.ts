import { Request, Response } from "express";
import {
  addData,
  deleteData,
  getAllData,
  getDataByID,
} from "../services/data-access";
import { Product } from "../type";

const TABLE_NAME: string = "product";

export const getAllProducts = (req: Request, res: Response): void => {
  const page: number = Number(req.query.page) || 1;
  const limit: number = Number(req.query.limit) || 30;
  const offset: number = (page - 1) * limit;
  getAllData(TABLE_NAME, res, page, limit, offset);
};

export const getSelectedProduct = (req: Request, res: Response): void => {
  const id: number = Number(req.query.id);
  getDataByID(id, TABLE_NAME, res);
};

export const addProduct = (req: Request, res: Response): void => {
  const newProduct: Product = req.body;
  addData(newProduct, res, TABLE_NAME);
};

export const deleteProduct = (req: Request, res: Response): void => {
  const id: number = Number(req.query.id);
  deleteData(id, res, TABLE_NAME);
};
