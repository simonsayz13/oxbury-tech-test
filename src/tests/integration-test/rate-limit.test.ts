import { createServer } from "../../config/express";
import request from "supertest";
import { config } from "dotenv";
config();
const app = createServer();
test("should return 429 Too Many Requests when rate limit of 15 is exceeded", async () => {
  const agent = request.agent(app);

  for (let i = 0; i < 15; i++) {
    await agent
      .get("/product")
      .set("X-API-Key", process.env.API_Key!)
      .expect(200);
  }
  const res = await agent
    .get("/product")
    .set("X-API-Key", process.env.API_Key!)
    .expect(429);

  expect(res.get("RateLimit-Limit")).toBe("15");
  expect(res.get("RateLimit-Remaining")).toBe("0");
});
