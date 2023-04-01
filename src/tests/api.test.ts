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

test("Test data response from fetch product by ID controller", async () => {
  const response = await request(app).get("/product").query({ id: 1654847 });
  expect(response.status).toBe(200);
  expect(response.body).toEqual(
    expect.objectContaining({
      id: 1654847,
      type: "savings",
      name: "45 Day Notice Account",
    })
  );
});

test("Test response from add product controller", async () => {
  const newProduct = {
    id: 888,
    type: "savings",
    name: "45 Day Notice Account",
  };
  const response = await request(app).post("/product").send(newProduct);
  expect(response.status).toBe(201);
  expect(response.body).toEqual(
    expect.objectContaining({
      message: "New product has been added",
    })
  );
});

test("Test response from alter product controller", async () => {
  const newProduct = {
    type: "saving",
  };
  const response = await request(app)
    .put("/product")
    .query({ id: 888 })
    .send(newProduct);
  expect(response.status).toBe(202);
  expect(response.body).toEqual(
    expect.objectContaining({
      message: "product has been modified in database",
    })
  );
});

test("Test response from delete product by ID controller", async () => {
  const response = await request(app).delete("/product").query({ id: 888 });
  expect(response.status).toBe(202);
  expect(response.body).toEqual(
    expect.objectContaining({
      message: "product has been deleted from database",
    })
  );
});

test("Test response from select application-product details controller", async () => {
  const response = await request(app)
    .get("/application/product")
    .query({ id: 1052768 });
  expect(response.status).toBe(200);
  expect(response.body).toEqual({
    id: 1052768,
    type: "flexi_credit",
    amount_requested: 58600,
    status: "declined",
    product_id: 1435004,
    product_type: "flexi_credit",
    name: "Flexible Credit",
  });
});

test("Test response from select application-farmer details controller", async () => {
  const response = await request(app)
    .get("/application/farmer")
    .query({ id: 1052768 });
  expect(response.status).toBe(200);
  expect(response.body).toEqual({
    id: 1052768,
    type: "flexi_credit",
    amount_requested: 58600,
    status: "declined",
    product_id: 1435004,
    farmer_id: 1215200,
    name: "Gary Schmidt",
    age: 57,
    phone_number: "7700900276",
  });
});

test("Test response from select farmer's farm details controller", async () => {
  const response = await request(app)
    .get("/farmer/farm")
    .query({ id: 1215200 });
  expect(response.status).toBe(200);
  expect(response.body).toEqual({
    id: 1215200,
    name: "Stephen Dozier & Brothers",
    age: 57,
    phone_number: "7700900276",
    farm_id: 1206952,
    num_cows: 14,
    num_chickens: 1,
    num_pigs: 92,
    acres_farmed: 1700,
  });
});
