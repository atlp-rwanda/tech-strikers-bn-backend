import express from "express";
import NotificationControllers from "../../controllers/notification.controller";

const router = express.Router();

const { getAllNotification, getOneNotification } = NotificationControllers;

router.get("/notifications", getAllNotification);
router.get("/notifications/:id", getOneNotification);

export default router;
