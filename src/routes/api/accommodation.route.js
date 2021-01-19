import express from "express";
import RoleCheckMiddleware from "../../middlewares/superAdminCheck";
import  { multerAccommodationUploads } from "../../middlewares/accommodation.multer";
const router = express.Router();
import CrudAccommodations from "../../controllers/add.accommodation";
import Validations from "../../validation/crud.accommodation.validations";
import CrudRoom from "../../controllers/room.controller"
import checkblockedtoken from "../../middlewares/blacklist";
const { createAccommodationValidations, createRoomValidations} = Validations;
const { checklisted } = checkblockedtoken
const { addRoom,getRooms, deleteRooms,updateRooms} = CrudRoom; 
const { createAccommodation, GetAllAccommodations, deleteAccommodation, updateAccommodation} = CrudAccommodations;
const { isTravelAdministator} = RoleCheckMiddleware;


router.post("/createAccommodation",checklisted,isTravelAdministator,multerAccommodationUploads, createAccommodationValidations, createAccommodation)
router.get("/getallaccommodations",checklisted,isTravelAdministator, GetAllAccommodations)
router.delete("/deleteAccommodation/:id", checklisted,isTravelAdministator, deleteAccommodation)
router.put("/updateaccommodation/:id", checklisted,isTravelAdministator, multerAccommodationUploads,updateAccommodation)
router.post("/accommodation/:id/createRoom", checklisted,isTravelAdministator,createRoomValidations, addRoom )
router.get("/accommodation/:id/getRooms", checklisted,isTravelAdministator, getRooms)
router.delete("/accommodation/:id/deleteRoom",checklisted,isTravelAdministator, deleteRooms)
router.patch("/accommodation/:id/updateRoom", checklisted,isTravelAdministator, updateRooms)

export default router;
