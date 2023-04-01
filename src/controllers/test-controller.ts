import { Request, Response } from "express";
import { db } from "../config/database";

export const routeController = (req: Request, res: Response): void => {
  db.all(`SELECT * FROM farmer;`, (err: Error, rows: any) => {
    res.status(200).send(rows);
  });
};
