// import httpErrors from 'http-errors';
// const { BadRequest } = httpErrors;

// export const validateBody = (schema) => (req, res, next) => {
//   const { error } = schema.validate(req.body);
//   if (error) {
//     next(BadRequest(error.message));
//   } else {
//     next();
//   }
// };

export const validateBody = (schema) => {
  return (req, res, next) => {
    console.log("Validating body:", req.body);
    const { error } = schema.validate(req.body);
    if (error) {
      console.log("Validation error:", error.message);
      return res.status(400).json({
        status: 400,
        message: error.message,
        data: error.message,
      });
    }
    next();
  };
};

