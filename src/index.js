import connectDB from "./db/index.db.js";
import { app } from "../src/app.js";

const PORT = process.env.PORT || 8000;

const startServer = async () => {
  try {
    await connectDB();
    console.log("MongoDB Connected");

    Bun.serve({
      port: PORT,
      fetch: app.fetch,
    });

    console.log(`Server is running on port: ${PORT}`);
  } catch (error) {
    console.log("MONGODB CONNECTION FAILED!", error);
    process.exit(1);
  }
};

startServer();
