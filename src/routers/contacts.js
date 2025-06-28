
import express from "express";
import * as contactsController from "../controllers/contacts.controller.js";
import ctrlWrapper from "../utils/ctrlWrapper.js";
import { validateBody } from "../middlewares/validateBody.js";
import { isValidId } from "../middlewares/isValidId.js";
import {
  createContactSchema,
  updateContactSchema,
} from "../schemas/contactSchemas.js";
import authenticate from '../middlewares/authenticate.js';


// const router = express.Router();

// router.use(authenticate);

// router.get("/", ctrlWrapper(contactsController.getAllContacts));

// router.get("/:contactId", isValidId, ctrlWrapper(contactsController.getContactById));

// router.post(
//   "/",
//   validateBody(createContactSchema),
//   ctrlWrapper(contactsController.createContact)
// );

// router.patch(
//   "/:contactId",
//   isValidId,
//   validateBody(updateContactSchema),
//   ctrlWrapper(contactsController.updateContact)
// );

// router.delete("/:contactId", isValidId, ctrlWrapper(contactsController.deleteContact));

// export default router;

const router = express.Router();

// Отримання всіх контактів користувача
router.get('/', authenticate, async (req, res, next) => {
  try {
    const contacts = await Contact.find({ userId: req.user._id });
    res.status(200).json({
      status: 200,
      message: 'Successfully retrieved contacts!',
      data: contacts,
    });
  } catch (error) {
    console.error('Get contacts error:', error);
    next(error);
  }
});

export default router;