import { Contact } from '../models/contact.model.js';

export const getAllContactsService = async () => {
  return Contact.find();
};

export const getContactByIdService = async (id) => {
  return Contact.findById(id);
};
