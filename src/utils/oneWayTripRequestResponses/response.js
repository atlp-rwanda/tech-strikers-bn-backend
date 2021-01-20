import message from "../customMessage";
import errorMessage from "../errorMessages";
import status from "../statusCode";

const { ok, badRequest, created, unprocessableEntity } = status;
const { onCreate, onDelete, onUpdate } = message;
const {
  errorOnCreate,
  errorOnDelete,
  errorOnGet,
  errorOnUpdate,
  errorIfNonPending,
} = errorMessage;
const getResponseOnValidation = (res, valid) => {
  if (valid) {
    return res.status(unprocessableEntity).json({ error: valid });
  }
};
const getResponseOnCreate = (res, trip) => {
  if (!trip) {
    return res.status(badRequest).json({ message: errorOnCreate });
  }

  return res.status(created).json({ message: res.__(onCreate), trip });
};
const getResponseOnGet = (res, trip) => {
  return res.status(ok).json(trip);
};
const getResponseOnUpdate = (res, response) => {
  if (response === "no request") {
    return res.status(badRequest).json({ message: res.__(errorOnUpdate) });
  } else if (response === "can't update") {
    return res.status(badRequest).json({ message: res.__(errorIfNonPending) });
  }
  return res.status(ok).json({ message: res.__(onUpdate) });
};
const getResponseOnDelete = (res, trip) => {
  if (trip === 0) {
    return res.status(badRequest).json({ message: errorOnDelete });
  }
  return res.status(ok).json({ message: onDelete });
};
export default {
  getResponseOnCreate,
  getResponseOnGet,
  getResponseOnUpdate,
  getResponseOnDelete,
  getResponseOnValidation,
};
