import { createServer } from "./config/express";
import { config } from "dotenv";

config();

const PORT = process.env.PORT || 8080;

const startServer = () => {
  const app = createServer();
  app.listen(PORT, async () => {
    console.log(`Listening on port ${PORT}...`);
  });
};

startServer();
