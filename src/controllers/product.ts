import { Request, Response } from "express";
import { getAllData } from "../services/data-access";

export const getAllProducts = (req: Request, res: Response): void => {
  getAllData("product", res);
};
