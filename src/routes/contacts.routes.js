import express from 'express';
import {
  handleGetContacts,
  handleGetContactById,
} from '../controllers/contacts.controller.js';

const router = express.Router();

router.get('/', handleGetContacts);
router.get('/:contactId', handleGetContactById);

export default router;
