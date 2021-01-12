import express from "express";
import User from "./users.route";
import Booking from "./booking.route"
import i18n from "../../utils/i18n"
const router = express.Router();
router.use(i18n.init)
router.use("/", User);
router.use("/",Booking)

export default router;
