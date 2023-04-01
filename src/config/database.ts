import sqlite3 from "sqlite3";
import path from "path";

const db = new sqlite3.Database(
  path.resolve(__dirname, `../data/farmAPI.db`),
  sqlite3.OPEN_READWRITE,
  (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log("Connected to the SQL database...");
  }
);

export { db };
