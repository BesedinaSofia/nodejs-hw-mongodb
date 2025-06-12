// import express from "express";
// import mongoose from "mongoose";
// import dotenv from "dotenv";
// import morgan from "morgan";

// import contactsRouter from "./routers/contacts.js";
// import notFoundHandler from "./middlewares/notFoundHandler.js";
// import errorHandler from "./middlewares/errorHandler.js";

// dotenv.config();
// const app = express();

// app.use(morgan("dev"));
// app.use(express.json());
// app.use("/contacts", contactsRouter);

// app.use(notFoundHandler);
// app.use(errorHandler);

// const PORT = process.env.PORT || 3000;

// mongoose
//   .connect(process.env.MONGO_URL)
//   .then(() => {
//     app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
//   })
//   .catch((err) => {
//     console.error("DB connection error:", err.message);
//     process.exit(1);
//   });

import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import contactsRouter from './routers/contacts.routers'; 

const app = express();

app.use(cors());
app.use(pino());
app.use(express.json());

app.use('/contacts', contactsRouter);

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

export default app;
