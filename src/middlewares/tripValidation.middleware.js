import tripValidation from "../validation/tripRequest.validation";
import Response from "../utils/responses";
import statusCode from "../utils/statusCode";

const { tripRequestValidation } = tripValidation;
const { errorResponse } = Response;
const { unprocessableEntity, badRequest } = statusCode;

const validateTripRequest = (req, res, next) => {
  const validationInfo = tripRequestValidation.validate(req.body);
  if (validationInfo.error) {
    return errorResponse(res, unprocessableEntity, validationInfo.error.details[0].message);
  }
  return next();
};

const departureDateValidation = (req, res, next) => {
  const { departureDate } = req.body;
  if (new Date().getFullYear() !== new Date(departureDate).getFullYear()) {
    return errorResponse(res, badRequest, res.__("invalidDepartureDate"));
  }
  if (Date.parse(departureDate) < Date.parse(new Date())) {
    return errorResponse(res, badRequest, res.__("invalidDepartureDate"));
  }
  return next();
};

const returnDateValidation = (req, res, next) => {
  const { returnDate, departureDate } = req.body;
  if (Date.parse(returnDate) < Date.parse(new Date())) {
    return errorResponse(res, badRequest, res.__("invalidReturnDate"));
  }
  if (Date.parse(returnDate) < Date.parse(departureDate)) {
    return errorResponse(res, badRequest, res.__("invalidReturnDate"));
  }
  return next();
};

export default { validateTripRequest, returnDateValidation, departureDateValidation };
