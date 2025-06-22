import Joi from "joi";

export const createContactSchema = Joi.object({
  name: Joi.string().min(3).max(20).required(),
  phoneNumber: Joi.string().min(3).max(20).required(),
  contactType: Joi.string().min(3).max(20).required(),
  isFavourite: Joi.boolean().optional()
}).options({ abortEarly: false });

export const updateContactSchema = Joi.object({
  name: Joi.string().min(3).max(20),
  phoneNumber: Joi.string().min(3).max(20),
  contactType: Joi.string().min(3).max(20),
  isFavourite: Joi.boolean()
})
  .min(1)
  .options({ abortEarly: false });
