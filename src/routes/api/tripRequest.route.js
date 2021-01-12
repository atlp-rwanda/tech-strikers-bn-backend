import express from "express";
import tokenAuthentication from "../../middlewares/tokenAuthentication";
import TripControllers from "../../controllers/oneWaytrip.controller";

const router = express.Router();
const {
  createOneWayTripRequest,
  getAllOneWayTripRequest,
  updateOneWayTripRequest,
  deleteOneWayTripRequest,
  getOneWayTripRequestById
} = TripControllers;

router.get("/trip/one-way", tokenAuthentication, getAllOneWayTripRequest);
router.get("/trip/one-way/:id", tokenAuthentication, getOneWayTripRequestById);
router.post("/trip/one-way", tokenAuthentication, createOneWayTripRequest);
router.put("/trip/one-way/:id", tokenAuthentication, updateOneWayTripRequest);
router.delete("/trip/one-way/:id", tokenAuthentication, deleteOneWayTripRequest);

export default router;
