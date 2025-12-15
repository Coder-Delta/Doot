import dotenv from "dotenv";
import http from "http";
import connectDB from "./db/index.js";
import { app } from "./app.js";
import { initSocket } from "./config/socket.config.js";

dotenv.config({
  path: "./env",
});

const port = process.env.PORT || 8000;

// Create HTTP server
const server = http.createServer(app);

connectDB()
  .then(() => {
    initSocket(server); //init the server

    server.listen(port, () => {
      console.log(`\nServer is running at http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.log(`mongo_db failed to connect in index.js ${error}`);
    process.exit(1);
  });
