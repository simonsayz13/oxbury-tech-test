import { createServer } from "../config/express";
import request from "supertest";
import { config } from "dotenv";
config();

test("Test response from API", async () => {
  const app = createServer();
  const response = await request(app).get("/api");
  expect(response.status).toBe(200);
  expect(response.body).toEqual({ message: "OK" });
});
