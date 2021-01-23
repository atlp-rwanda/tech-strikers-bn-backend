import express from "express";
import tokenAuthentication from "../../middlewares/tokenAuthentication";
import TripControllers from "../../controllers/oneWaytrip.controller";
import tripRequestController from "../../controllers/multcityRequest.controller";
import checkblockedtoken from "../../middlewares/blacklist";

const { checklisted } = checkblockedtoken;

const router = express.Router();
const {
  createOneWayTripRequest,
  getAllOneWayTripRequest,
  updateOneWayTripRequest,
  deleteOneWayTripRequest,
} = TripControllers;

const { sendTripRequest, getUserTripRequests } = tripRequestController;

router.get(
  "/trip/one-way",
  checklisted,
  tokenAuthentication,
  getAllOneWayTripRequest
);
router.post(
  "/trip/one-way",
  checklisted,
  tokenAuthentication,
  createOneWayTripRequest
);
router.put(
  "/trip/one-way/:id",
  checklisted,
  tokenAuthentication,
  updateOneWayTripRequest
);
router.delete(
  "/trip/one-way/:id",
  checklisted,
  tokenAuthentication,
  deleteOneWayTripRequest
);
router.post('/multiCityRequest', checklisted, tokenAuthentication, sendTripRequest);
router.get('/tripRequests', checklisted, tokenAuthentication, getUserTripRequests)

export default router;
