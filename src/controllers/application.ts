import { Request, Response } from "express";
import { getAllData } from "../services/data-access";

export const getAllApplications = (req: Request, res: Response): void => {
  const page: number = Number(req.query.page) || 1;
  const limit: number = Number(req.query.limit) || 30;
  const offset: number = (page - 1) * limit;
  getAllData("application", res, page, limit, offset);
};
