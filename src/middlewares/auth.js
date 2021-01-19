import UserServices from "../services/user.service";
import customMessage from "../utils/customMessage";
import responses from "../utils/responses";
import statusCode from "../utils/statusCode";

const { getUserByIdOrEmail } = UserServices;
const { errorResponse } = responses;
const { conflict } = statusCode;
const { duplicateEmail } = customMessage;

const checkEmailExist = async (req, res, next) => {
  const user = await getUserByIdOrEmail(req.body.email);

  if (user) {
    return errorResponse(res, conflict, duplicateEmail);
  }
  return next();
};

export default { checkEmailExist };
