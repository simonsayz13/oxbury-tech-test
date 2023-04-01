import { Response } from "express";
import { db } from "../config/database";

export const getApplicationProduct = (id: number, res: Response): void => {
  let sql = `SELECT application.id, application.type, application.amount_requested,
      application.status, application.product_id, product.id AS product_id, product.type AS product_type,
      product.name
      FROM application JOIN product 
      ON application.product_id = product.id
      WHERE application.id = ?`;
  db.get(sql, [id], (err: Error, row: any) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (!row) {
      res.status(404).json({ error: `Product with ID ${id} not found.` });
      return;
    }
    res.status(200).send(row);
  });
};

export const getApplicationFarmer = (id: number, res: Response): void => {
  let sql = `SELECT application.id, application.type, application.amount_requested,
      application.status, application.product_id, farmer.id AS farmer_id, farmer.name,
      farmer.age, farmer.phone_number
      FROM application JOIN farmer 
      ON application.farmer_id = farmer.id
      WHERE application.id = ?;`;
  db.get(sql, [id], (err: Error, row: any) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (!row) {
      res.status(404).json({ error: `Product with ID ${id} not found.` });
      return;
    }
    res.status(200).send(row);
  });
};
