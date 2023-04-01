import { Request, Response } from "express";

export const routeController = (req: Request, res: Response): void => {
  res.status(200).send({ message: "OK" });
};
