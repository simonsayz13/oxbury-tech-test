import { Response } from "express";
import { db } from "../config/database";
import { Application, Product, Farm, Farmer, RowCount } from "../type";

export const getAllData = (
  table: string,
  res: Response,
  page: number,
  limit: number,
  offset: number
): void => {
  const selectSql: string = `SELECT * FROM ${table} ORDER BY id LIMIT ? OFFSET ?`;
  db.all(
    selectSql,
    [limit, offset],
    (err: Error, rows: [Application | Product | Farm | Farmer]) => {
      if (err) {
        res.status(500).send({ error: err.message });
        return;
      }
      const countSql: string = `SELECT COUNT(*) AS count FROM ${table} `;
      db.get(countSql, (err: Error, row: RowCount) => {
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
    }
  );
};

export const getDataByID = (id: Number, table: string, res: Response): void => {
  let selectSql: string = `SELECT * FROM ${table} WHERE id = ?`;
  db.get(
    selectSql,
    [id],
    (err: Error, row: [Application | Product | Farm | Farmer]) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      if (!row) {
        res.status(404).json({ error: `${table} with ID ${id} not found.` });
        return;
      }
      res.status(200).send(row);
    }
  );
};

export const addData = (
  newData: Application | Product | Farm | Farmer,
  res: Response,
  table: string
): void => {
  let insertSQL: string = `INSERT INTO ${table} (`;
  let sqlValues: string = `VALUES (`;
  let queryParams: Array<string | number> = [];
  for (const [key, value] of Object.entries(newData)) {
    insertSQL += `${key},`;
    sqlValues += `?,`;
    queryParams.push(value);
  }
  insertSQL = insertSQL.slice(0, -1) + `) ` + sqlValues.slice(0, -1) + `)`;
  db.run(insertSQL, queryParams, (err: Error) => {
    if (err) {
      res.status(404).send({ error: err.message });
    } else {
      res.status(201).send({ message: `New ${table} has been added` });
    }
  });
};
