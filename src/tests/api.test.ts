import { createServer } from "../config/express";
import request from "supertest";
import { config } from "dotenv";
config();
const app = createServer();

test("Test response from database using test-controller", async () => {
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

test("Test response from fetch all in product controller", async () => {
  const response = await request(app).get("/products");
  expect(response.status).toBe(200);
  expect(response.body).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        type: "savings",
      }),
    ])
  );
});
