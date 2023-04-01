import { Response } from "express";
import { db } from "../config/database";

export const getAllData = (
  table: string,
  res: Response,
  page: number,
  limit: number,
  offset: number
): void => {
  const selectSql: string = `SELECT * FROM ${table} ORDER BY id LIMIT ? OFFSET ?`;
  db.all(selectSql, [limit, offset], (err: Error, rows: [any]) => {
    if (err) {
      res.status(500).send({ error: err.message });
      return;
    }
    const countSql: string = `SELECT COUNT(*) AS count FROM ${table} `;
    db.get(countSql, (err: Error, row: any) => {
      if (err) {
        res.status(500).send({ error: err.message });
        return;
      }
      const totalRecords: number = row.count;
      const totalPages: number = Math.ceil(totalRecords / limit);
      res.status(200).send({
        data: rows,
        metadata: {
          page,
          limit,
          totalRecords,
          totalPages,
        },
      });
    });
  });
};
