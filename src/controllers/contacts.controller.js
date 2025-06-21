import * as contactsService from "../services/contacts.service.js";

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
