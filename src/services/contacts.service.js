// import { Contact } from '../models/contact.model.js';

// export const getAllContactsService = async () => {
//   return Contact.find();
// };

// export const getContactByIdService = async (id) => {
//   return Contact.findById(id);
// };

import fs from 'fs/promises';
import path from 'path';

const contactsPath = path.resolve('src', 'db', 'contacts.json');

export const getAllContacts = async () => {
  const data = await fs.readFile(contactsPath, 'utf-8');
  return JSON.parse(data);
};
