import express from "express";
import RequestController from "../../controllers/request.controller";
import token from "../../middlewares/tokenAuthentication";
import tripValidationMiddleware from "../../middlewares/tripValidation.middleware";

const router = express.Router();
const { makeRequest } = RequestController;
const { validateTripRequest, returnDateValidation, departureDateValidation } = tripValidationMiddleware;

router.post("/return_trip", [token, validateTripRequest, departureDateValidation, returnDateValidation], makeRequest);

export default router;
