import { createServer } from "../config/express";
import request from "supertest";
import { config } from "dotenv";
config();
const app = createServer();

test("Test response from database", async () => {
  const response = await request(app).get("/api");
  expect(response.status).toBe(200);
  expect(response.body).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        id: 1661474,
      }),
    ])
  );
});
