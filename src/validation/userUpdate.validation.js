import Joi from "joi";
const updateUserInfoValidation = Joi.object({
  fullname: Joi.string().min(8),
  email: Joi.string(),
  username: Joi.string().min(5),
  password: Joi.string().min(6),
});
export default { updateUserInfoValidation };
