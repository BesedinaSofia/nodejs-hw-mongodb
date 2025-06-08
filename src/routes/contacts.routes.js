// import express from 'express';
// import {
//   getAllContactsController,
//   getContactByIdController,
// } from '../controllers/contacts.controller.js';

// const router = express.Router();

// router.get('/', getAllContactsController);
// router.get('/:contactId', getContactByIdController);

// export default router;

import express from 'express';
import { getContactsController } from '../controllers/contacts.controller.js';

const router = express.Router();

router.get('/', getContactsController);

export default router;
