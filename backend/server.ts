import "dotenv/config";
import { createServer } from "http";
import app from "./src/app";

process.env.NODE_ENV = process.env.NODE_ENV || "development";

const server = createServer(app);

const PORT = process.env.PORT || 9000;
app.set("port", PORT);

server.listen(PORT, () =>
  console.log(`[server]: server is running at ${PORT}`)
);
