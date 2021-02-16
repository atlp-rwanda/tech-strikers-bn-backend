import express from "express";
import tokenAuthentication from "../../middlewares/tokenAuthentication";
import TripControllers from "../../controllers/oneWaytrip.controller";
import checkblockedtoken from "../../middlewares/blacklist";
import tripRequestController from "../../controllers/multcityRequest.controller";
import rolecheck from "../../middlewares/ismanager"

const router = express.Router();
const { sendTripRequest, getUserTripRequests,AproveOrRejectRequest } = tripRequestController;
const { checklisted } = checkblockedtoken;
const {isManager}=rolecheck

const {
  createOneWayTripRequest,
  getAllOneWayTripRequest,
  updateOneWayTripRequest,
  deleteOneWayTripRequest,
} = TripControllers;

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
router.put('/tripRequestsDecision/:id', checklisted, isManager,tokenAuthentication, AproveOrRejectRequest)


export default router;
