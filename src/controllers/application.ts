import { Request, Response } from "express";
import {
  addData,
  alterData,
  deleteData,
  getAllData,
  getDataByID,
} from "../services/data-access";
import { Application, FormValues } from "../type";

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

export const deleteApplication = (req: Request, res: Response): void => {
  const id: number = Number(req.query.id);
  deleteData(id, res, TABLE_NAME);
};

export const alterApplication = (req: Request, res: Response): void => {
  const id: number = Number(req.query.id);
  const newApplicationFields: FormValues = req.body;
  alterData(id, res, TABLE_NAME, newApplicationFields);
};
