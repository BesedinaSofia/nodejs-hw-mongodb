import express from 'express';
import { handleGetContacts, handleGetContactById } from '../controllers/contacts.controller.js';

const router = express.Router();
router.get('/contacts', handleGetContacts);
router.get('/contacts/:contactId', handleGetContactById);

export default router;

// import express from 'express';
// import { getContactsController } from '../controllers/contacts.controller';

// const router = express.Router();

// router.get('/', getContactsController);

// export default router;
