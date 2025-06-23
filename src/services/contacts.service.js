import mongoose from 'mongoose';
import Contact from "../models/contact.model.js";

export const listContacts = async ({
  page = 1,
  perPage = 10,
  sortBy = 'name',
  sortOrder = 'asc',
  type,
  isFavourite
}) => {
  const filter = {};
  if (type) filter.contactType = type;
  if (isFavourite !== undefined) {
    filter.isFavourite = isFavourite === 'true';
  }

  const skip = (page - 1) * perPage;
  const sort = { [sortBy]: sortOrder === 'desc' ? -1 : 1 };

  const totalItems = await Contact.countDocuments(filter);
  const totalPages = Math.ceil(totalItems / perPage);

  const contacts = await Contact.find(filter)
    .sort(sort)
    .skip(skip)
    .limit(perPage);

  return {
    data: contacts,
    page,
    perPage,
    totalItems,
    totalPages,
    hasPreviousPage: page > 1,
    hasNextPage: page < totalPages
  };
};

export const getContactById = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return null;
  }
  return await Contact.findById(id);
};

export const deleteContact = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return false;
  }
  const result = await Contact.findByIdAndDelete(id);
  return result !== null;
};
