import { Request, Response } from "express";
import { getAllData } from "../services/data-access";

export const getAllProducts = (req: Request, res: Response): void => {
  const page: number = Number(req.query.page) || 1;
  const limit: number = Number(req.query.limit) || 30;
  const offset: number = (page - 1) * limit;
  getAllData("product", res, page, limit, offset);
};
