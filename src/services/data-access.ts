import { Response } from "express";
import { db } from "../config/database";
import {
  Application,
  Product,
  Farm,
  Farmer,
  RowCount,
  FormValues,
  FilterFields,
} from "../type";
import { isEmpty } from "../util/data-service-util";

export const getAllData = (
  table: string,
  res: Response,
  page: number,
  limit: number,
  offset: number,
  tableColumns: Array<string>
): void => {
  const selectSql: string = `SELECT ${tableColumns.join(
    `,`
  )} FROM ${table} ORDER BY id LIMIT ? OFFSET ?`;
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

export const deleteData = (id: number, res: Response, table: string): void => {
  let deleteSQL: string = `DELETE FROM ${table} WHERE id = ?`;
  let selectSQL: string = `SELECT id FROM ${table} WHERE id = ?`;
  db.get(
    selectSQL,
    [id],
    (err: Error, row: [Application | Product | Farm | Farmer]) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      if (!row) {
        res.status(404).send({ error: `${table} with ID ${id} not found` });
      } else {
        db.run(deleteSQL, [id], (err) => {
          if (err) {
            res
              .status(500)
              .send({ error: `Failed to delete ${table} with ID ${id}` });
          } else {
            res
              .status(202)
              .send({ message: `${table} has been deleted from database` });
          }
        });
      }
    }
  );
};

export const alterData = (
  id: number,
  res: Response,
  table: string,
  newDataField: FormValues
): void => {
  let selectSQL: string = `SELECT * FROM ${table} WHERE id = ?`;
  db.get(
    selectSQL,
    [id],
    (err: Error, row: Application | Product | Farm | Farmer) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      if (!row) {
        res.status(404).send({ error: `${table} with ID ${id} not found` });
      } else {
        let updateSql: string = `UPDATE ${table} SET `;
        let queryParams: Array<string | number> = [];
        for (const [key, value] of Object.entries(newDataField)) {
          updateSql += key + `=?,`;
          queryParams.push(value);
        }
        updateSql = updateSql.slice(0, -1);
        updateSql += ` where id = ?`;
        queryParams.push(id);
        db.run(updateSql, queryParams, (err: Error) => {
          if (err) {
            res
              .status(500)
              .send({ error: `${table} with ID ${id} failed to update` });
          } else {
            res
              .status(202)
              .send({ message: `${table} has been modified in database` });
          }
        });
      }
    }
  );
};

export const filterData = (
  res: Response,
  table: string,
  filterFields: FilterFields,
  tableColumns: Array<string>,
  page: number,
  limit: number,
  offset: number
): void => {
  if (!isEmpty(filterFields)) {
    let filterSql: string = `SELECT ${tableColumns.join(
      `,`
    )} FROM ${table} WHERE `;
    let queryParams: Array<string | number> = [];
    for (const [key, value] of Object.entries(filterFields)) {
      filterSql += key + `=? AND `;
      queryParams.push(value);
    }
    filterSql = filterSql.slice(0, -4) + `ORDER BY id LIMIT ? OFFSET ?`;
    db.all(
      filterSql,
      [...queryParams, limit, offset],
      (err: Error, rows: [Application | Product | Farm | Farmer]) => {
        if (err) {
          res.status(500).send({ error: err.message });
          return;
        }

        let countSql: string = `SELECT COUNT(*) AS count FROM ${table} WHERE `;
        for (const [key] of Object.entries(filterFields)) {
          countSql += key + `=? AND `;
        }
        countSql = countSql.slice(0, -4);
        db.get(countSql, queryParams, (err: Error, rowCount: RowCount) => {
          if (err) {
            res.status(500).send({ error: err.message });
            return;
          }
          const totalRecord: number = rowCount.count;
          const totalPages: number = Math.ceil(totalRecord / limit);
          res.status(200).send({
            data: rows,
            metadata: {
              page,
              limit,
              totalRecord,
              totalPages,
            },
          });
        });
      }
    );
  } else {
    res.status(400).send({ error: `Invalid filter parameters` });
  }
};
