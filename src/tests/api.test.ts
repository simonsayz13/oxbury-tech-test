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

test("Test data response from fetch all in product controller", async () => {
  const response = await request(app).get("/products");
  expect(response.status).toBe(200);
  expect(response.body).toEqual(
    expect.objectContaining({
      data: expect.arrayContaining([
        expect.objectContaining({
          id: 1614351,
          type: "savings",
          name: "90 Day Notice Account",
        }),
      ]),
    })
  );
});

test("Test pagination metadata response from fetch all in product controller", async () => {
  const response = await request(app).get("/products");
  expect(response.status).toBe(200);
  expect(response.body).toEqual(
    expect.objectContaining({
      metadata: {
        page: 1,
        limit: 30,
        totalRecords: 7,
        totalPages: 1,
      },
    })
  );
});
