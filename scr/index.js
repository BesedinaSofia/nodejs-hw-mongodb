// import dotenv from 'dotenv';
// dotenv.config();

// import { initMongoConnection } from './db/initMongoConnection.js';
// import { setupServer } from './server.js';

// const start = async () => {
//   await initMongoConnection();
//   setupServer();
// };

// start();

import("dotenv/config");
import app from "./server.js"; // або твоя Express-апка
import { initMongoConnection } from "./db/initMongoConnection.js";

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  await initMongoConnection();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();

