import express from "express";
import tokenVerify from "../../middlewares/tokenAuthentication"
import tripRequestController from "../../controllers/trip.request";

const router = express.Router();
const { sendTripRequest } = tripRequestController;

router.post('/multiCityRequest', tokenVerify, sendTripRequest);

export default router;
