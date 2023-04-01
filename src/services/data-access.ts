import { Response } from "express";
import { db } from "../config/database";

export const getAllData = (table: string, res: Response): void => {
  const selectSql: string = `SELECT * FROM ${table} `;
  db.all(selectSql, (err: Error, rows: [any]) => {
    if (err) {
      res.status(500).send({ message: err.message });
      return;
    }
    res.status(200).send(rows);
  });
};
