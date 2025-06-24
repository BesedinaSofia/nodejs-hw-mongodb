
import * as contactsService from "../services/contacts.service.js";
import createError from "http-errors";

export const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const contact = await contactsService.getContactById(contactId);
  if (!contact) throw createError(404, "Contact not found");
  res.status(200).json({ status: 200, data: contact });
};

export const deleteContact = async (req, res) => {
  const { contactId } = req.params;
  const isDeleted = await contactsService.deleteContact(contactId);
  if (!isDeleted) throw createError(404, "Contact not found");
  res.status(204).send();
};

export const getAllContacts = async (req, res) => {
  const {
    page = 1,
    perPage = 10,
    sortBy = 'name',
    sortOrder = 'asc',
    type,
    isFavourite
  } = req.query;

  const result = await contactsService.listContacts({
    page: Number(page),
    perPage: Number(perPage),
    sortBy,
    sortOrder,
    type,
    isFavourite
  });

  res.status(200).json({
    status: 200,
    message: "Successfully found contacts!",
    data: result
  });
};

export const createContact = async (req, res) => {
  const newContact = await contactsService.createContact(req.body);
  res.status(201).json({ status: 201, data: newContact });
};

export const updateContact = async (req, res) => {
  const { contactId } = req.params;
  const updatedContact = await contactsService.updateContact(contactId, req.body);
  if (!updatedContact) throw createError(404, "Contact not found");
  res.status(200).json({ status: 200, data: updatedContact });
};
