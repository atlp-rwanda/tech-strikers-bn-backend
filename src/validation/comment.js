import Joi from "joi";

const commentValidation = (req, res, next) => {
  const schema = Joi.object({
    comment: Joi.string()
      .min(4)
      .trim()
      .empty()
      .required(),
  });
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ error: "Invalid comment" });
  return next();
};

export default commentValidation;
