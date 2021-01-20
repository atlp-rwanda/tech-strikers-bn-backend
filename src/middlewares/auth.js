import UserServices from "../services/user.service";
import customMessage from "../utils/customMessage";
import responses from "../utils/responses";
import statusCode from "../utils/statusCode";


const { getUserByIdOrEmail,getUserByIdOrUsername} = UserServices;
const { errorResponse } = responses;
const { conflict } = statusCode;
const { duplicateEmail,duplicateUsername } = customMessage;
const checkEmailExist = async (req, res, next) => {
  const user = await getUserByIdOrEmail(req.body.email);

  if (user) {
    return errorResponse(res, conflict, duplicateEmail);
  }
  return next();
};

const checkUsernameExist = async (req, res, next) => {
  const user = await getUserByIdOrUsername(req.body.username);
  if (user) {
    return errorResponse(res, conflict, duplicateUsername);
  }
  return next();
};
export default { checkEmailExist, checkUsernameExist};
