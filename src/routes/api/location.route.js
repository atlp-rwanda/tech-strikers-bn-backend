import express from "express";
import locationController from "../../controllers/location.controller";
//import token from "../../middlewares/tokenAuthentication";

const router = express.Router();
const { addLocation,getAllLocations,removeLocation } = locationController;

router.post("/location", addLocation);
router.get("/location", getAllLocations);
router.delete("/location/:id", removeLocation);

export default router;
