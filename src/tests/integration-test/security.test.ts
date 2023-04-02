import { createServer } from "../../config/express";
import request from "supertest";
import { config } from "dotenv";
config();
const app = createServer();

test("should return 401 unauthorised when request contains incorrect 'X-API-Key'", async () => {
  const response1 = await request(app).get("/product").set("X-API-Key", "");
  expect(response1.status).toBe(401);
});

test("GET products should NOT return result to a simulated SQL injection attack", async () => {
  const agent = request.agent(app);
  const response = await agent
    .get("/product")
    .set("X-API-Key", process.env.API_Key!)
    .query({ id: "123; DROP TABLE test" });
  expect(response.body).toEqual({ error: "product with ID NaN not found." });
});

test("DELETE product should prevent SQL Injection attacks", async () => {
  const agent = request.agent(app);
  const response = await agent
    .delete("/product")
    .set("X-API-Key", process.env.API_Key!)
    .query({ id: "123; DROP TABLE test--" });
  expect(response.body).toEqual({
    error: "product with ID NaN not found",
  });
});

test("PUT product should prevent SQL Injection attack", async () => {
  const newProduct = {
    type: "; DROP TABLE test--",
  };
  const agent = request.agent(app);
  const response1 = await agent
    .put("/product")
    .set("X-API-Key", process.env.API_Key!)
    .query({ id: 123 })
    .send(newProduct);

  console.log(response1);
  expect(response1.body).toEqual({
    message: "product has been modified in database",
  });

  const response2 = await agent
    .get("/product")
    .set("X-API-Key", process.env.API_Key!)
    .query({ id: 123 });

  // Returning the modified product type as the sql attack command shows it was negated.
  expect(response2.body).toEqual({
    id: 123,
    type: "; DROP TABLE test--",
    name: "45 Day Notice Account",
  });
});
