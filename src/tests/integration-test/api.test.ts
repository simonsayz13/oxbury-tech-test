import { createServer } from "../../config/express";
import request from "supertest";
import { config } from "dotenv";
config();
const app = createServer();

test("Test data response from fetch all in product controller", async () => {
  const response = await request(app)
    .get("/product")
    .set("X-API-Key", process.env.API_Key!);
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
  const response = await request(app)
    .get("/product")
    .set("X-API-Key", process.env.API_Key!);
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
  const response = await request(app)
    .get("/product")
    .query({ id: 1654847 })
    .set("X-API-Key", process.env.API_Key!);
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
  const response = await request(app)
    .post("/product")
    .send(newProduct)
    .set("X-API-Key", process.env.API_Key!);
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
    .set("X-API-Key", process.env.API_Key!)
    .send(newProduct);
  expect(response.status).toBe(202);
  expect(response.body).toEqual(
    expect.objectContaining({
      message: "product has been modified in database",
    })
  );
});

test("Test response from delete product by ID controller", async () => {
  const response = await request(app)
    .delete("/product")
    .query({ id: 888 })
    .set("X-API-Key", process.env.API_Key!);
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
    .query({ id: 1052768 })
    .set("X-API-Key", process.env.API_Key!);
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
    .query({ id: 1052768 })
    .set("X-API-Key", process.env.API_Key!);
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
    .query({ id: 1215200 })
    .set("X-API-Key", process.env.API_Key!);
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

test("should return 401 unauthorised when request contains incorrect 'X-API-Key'", async () => {
  const response1 = await request(app).get("/product").set("X-API-Key", "");
  expect(response1.status).toBe(401);
});

test("test response from filter data", async () => {
  const response = await request(app)
    .get("/product/filter")
    .query({ type: "savings" })
    .set("X-API-Key", process.env.API_Key!);
  expect(response.status).toBe(200);
  expect(response.body.data).toEqual([
    {
      id: 123,
      type: "savings",
      name: "45 Day Notice Account",
    },
    {
      id: 11111,
      type: "savings",
      name: "45 days notice account",
    },
    {
      id: 222222,
      type: "savings",
      name: "45 Day Notice Account",
    },
    {
      id: 1614351,
      type: "savings",
      name: "90 Day Notice Account",
    },
    {
      id: 1654847,
      type: "savings",
      name: "45 Day Notice Account",
    },
  ]);
});

test("should return 400 invalid request when query of filter data request is empty", async () => {
  const response = await request(app)
    .get("/product/filter")
    .query({})
    .set("X-API-Key", process.env.API_Key!);
  expect(response.status).toBe(400);
});
