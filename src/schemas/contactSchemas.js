import Joi from "joi";

export const createContactSchema = Joi.object({
  name: Joi.string().min(3).max(20).required().messages({
    "string.min": "Name must be at least 3 characters long",
    "string.max": "Name must be at most 20 characters long",
    "any.required": "Name is required",
  }),
  phoneNumber: Joi.string().min(3).max(20).required().messages({
    "string.min": "Phone number must be at least 3 characters long",
    "string.max": "Phone number must be at most 20 characters long",
    "any.required": "Phone number is required",
  }),
  email: Joi.string().min(3).max(20).email().optional().messages({
    "string.min": "Email must be at least 3 characters long",
    "string.max": "Email must be at most 20 characters long",
    "string.email": "Invalid email format",
  }),
  isFavourite: Joi.boolean().optional().default(false),
  contactType: Joi.string()
    .valid("work", "home", "personal")
    .required()
    .messages({
      "any.only": "Contact type must be one of: work, home, personal",
      "any.required": "Contact type is required",
    }),
});

export const updateContactSchema = Joi.object({
  name: Joi.string().min(3).max(20).optional().messages({
    "string.min": "Name must be at least 3 characters long",
    "string.max": "Name must be at most 20 characters long",
  }),
  phoneNumber: Joi.string().min(3).max(20).optional().messages({
    "string.min": "Phone number must be at least 3 characters long",
    "string.max": "Phone number must be at most 20 characters long",
  }),
  email: Joi.string().min(3).max(20).email().optional().messages({
    "string.min": "Email must be at least 3 characters long",
    "string.max": "Email must be at most 20 characters long",
    "string.email": "Invalid email format",
  }),
  isFavourite: Joi.boolean().optional(),
  contactType: Joi.string()
    .valid("work", "home", "personal")
    .optional()
    .messages({
      "any.only": "Contact type must be one of: work, home, personal",
    }),
}).min(1).messages({
  "object.min": "At least one field must be provided for update",
});


// import Joi from "joi";

// const contactTypeEnum = ["personal", "work"];

// export const createContactSchema = Joi.object({
//   name: Joi.string().min(3).max(20).required(),
//   email: Joi.string().email().required(),
//   phone: Joi.string().min(5).max(20).required(),
//   contactType: Joi.string().valid(...contactTypeEnum).required(),
//   isFavourite: Joi.boolean().optional()
// }).options({ abortEarly: false });

// export const updateContactSchema = Joi.object({
//   name: Joi.string().min(3).max(20),
//   email: Joi.string().email(),
//   phone: Joi.string().min(5).max(20),
//   contactType: Joi.string().valid(...contactTypeEnum),
//   isFavourite: Joi.boolean()
// })
//   .min(1)
//   .options({ abortEarly: false });