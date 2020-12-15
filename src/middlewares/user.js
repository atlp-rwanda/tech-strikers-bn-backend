import { validator, validationErrors } from "../validation";

export const UserValidation = async (req, res, next) => {
  const { error } = validator("signup", req.body);
  if (error) {
    const errorMessage = validationErrors(error);

    return res.status(400).send({
      status: 400,
      error: errorMessage,
    });
  }
  return next();
};
