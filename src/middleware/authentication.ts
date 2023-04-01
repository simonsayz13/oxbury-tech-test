import { Request, Response, NextFunction } from "express";

const apiKeyAuth = (req: Request, res: Response, next: NextFunction) => {
  const apiKey: string | undefined = req.get("X-API-Key");

  if (!apiKey || apiKey !== process.env.API_Key) {
    return res.status(401).json({ message: "Unauthorised: Invalid API key" });
  }

  next();
};

export { apiKeyAuth };
