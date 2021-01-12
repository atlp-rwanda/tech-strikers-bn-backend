import express from "express";
import BookingController from "../../controllers/booking.controller"
import tokenAuth from "../../middlewares/tokenAuthentication"
import isOwner from "../../middlewares/isOwner"
const router = express.Router();

// router.get("/booking/:id",tokenAuth,BookingController.bookingById)
// router.get("/bookings",tokenAuth,BookingController.allBookings)


router.get("/booking/:id",tokenAuth,BookingController.bookingById)
router.get("/bookings",tokenAuth,BookingController.allBookings)
router.post("/create/booking",tokenAuth,BookingController.createBooking)

export default router;