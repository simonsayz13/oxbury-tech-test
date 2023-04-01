import { Request, Response } from "express";
import { addData, getAllData, getDataByID } from "../services/data-access";
import { Application } from "../type";

const TABLE_NAME: string = "application";

export const getAllApplications = (req: Request, res: Response): void => {
  const page: number = Number(req.query.page) || 1;
  const limit: number = Number(req.query.limit) || 30;
  const offset: number = (page - 1) * limit;
  getAllData(TABLE_NAME, res, page, limit, offset);
};

export const getSelectedApplication = (req: Request, res: Response): void => {
  const id: number = Number(req.query.id);
  getDataByID(id, TABLE_NAME, res);
};

export const addApplication = (req: Request, res: Response): void => {
  const newApplication: Application = req.body;
  addData(newApplication, res, TABLE_NAME);
};
