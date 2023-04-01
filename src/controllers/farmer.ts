import { Request, Response } from "express";
import {
  addData,
  deleteData,
  getAllData,
  getDataByID,
} from "../services/data-access";
import { Farmer } from "../type";

const TABLE_NAME: string = "farmer";

export const getAllFarmers = (req: Request, res: Response): void => {
  const page: number = Number(req.query.page) || 1;
  const limit: number = Number(req.query.limit) || 30;
  const offset: number = (page - 1) * limit;
  getAllData(TABLE_NAME, res, page, limit, offset);
};

export const getSelectedFarmer = (req: Request, res: Response): void => {
  const id: number = Number(req.query.id);
  getDataByID(id, TABLE_NAME, res);
};

export const addFarmer = (req: Request, res: Response): void => {
  const newFarmer: Farmer = req.body;
  addData(newFarmer, res, TABLE_NAME);
};

export const deleteFarmer = (req: Request, res: Response): void => {
  const id: number = Number(req.query.id);
  deleteData(id, res, TABLE_NAME);
};
