import { createServer } from "../../config/express";
import request from "supertest";
import { config } from "dotenv";
config();
const app = createServer();

test("should return 429 Too Many Requests when rate limit of 15 is exceeded", async () => {
  const agent = request.agent(app);

  // Make 15 requests before exceeding the limit of 15
  for (let i = 0; i < 15; i++) {
    await agent
      .get("/product")
      .set("X-API-Key", process.env.API_Key!)
      .expect(200);
  }

  // Make one more request and expect a 429 response
  const res = await agent
    .get("/product")
    .set("X-API-Key", process.env.API_Key!)
    .expect(429);

  // // Check that the response includes the rate limit headers
  expect(res.get("RateLimit-Limit")).toBe("15");
  expect(res.get("RateLimit-Remaining")).toBe("0");
});
