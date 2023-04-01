import { Response } from "express";
import { db } from "../config/database";

export const getFarmerFarmData = (id: number, res: Response): void => {
  let sql = `SELECT farmer.id, farmer.name, farmer.age,
      farmer.phone_number,  farm.id AS farm_id, farm.name,
      farm.num_cows, farm.num_chickens, farm.num_pigs, farm.acres_farmed
      FROM farmer JOIN farm 
      ON farmer.farm_id = farm.id
      WHERE farmer.id = ?;`;
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
