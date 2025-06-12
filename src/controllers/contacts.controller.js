import * as contactsService from "../services/contacts.js";
import createError from "http-errors";

export const getAllContacts = async (req, res) => {
  const contacts = await contactsService.listContacts();
  res.json({ status: 200, data: contacts });
};

export const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const contact = await contactsService.getContactById(contactId);
  if (!contact) throw createError(404, "Contact not found");
  res.json({ status: 200, data: contact });
};

export const createContact = async (req, res) => {
  const { name, phoneNumber, contactType } = req.body;
  if (!name || !phoneNumber || !contactType) {
    throw createError(400, "Missing required fields");
  }
  const newContact = await contactsService.createContact(req.body);
  res.status(201).json({
    status: 201,
    message: "Successfully created a contact!",
    data: newContact,
  });
};

export const updateContact = async (req, res) => {
  const { contactId } = req.params;
  const updatedContact = await contactsService.updateContact(contactId, req.body);
  if (!updatedContact) throw createError(404, "Contact not found");
  res.json({
    status: 200,
    message: "Successfully patched a contact!",
    data: updatedContact,
  });
};

export const deleteContact = async (req, res) => {
  const { contactId } = req.params;
  const isDeleted = await contactsService.deleteContact(contactId);
  if (!isDeleted) throw createError(404, "Contact not found");
  res.status(204).send();
};
