// import express from 'express';
// import {
//   handleGetContacts,
//   handleGetContactById,
// } from '../controllers/contacts.controller.js';

// const router = express.Router();

// router.get('/', handleGetContacts);
// router.get('/:contactId', handleGetContactById);

// export default router;



import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import contactsRouter from './routes/contacts.routes';

const app = express();

app.use(cors());
app.use(pino());
app.use(express.json());

app.use('/contacts', contactsRouter);

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});


export default app;
