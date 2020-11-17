import express from "express";
import UserControllers from "../../controllers/user.controller.js";
import authMiddleware from "../../middlewares/auth";

const router = express.Router();
const { signup } = UserControllers;
const { checkEmailExist } = authMiddleware;

router.get("/user", (req, res) => {
  res.status(200).json({ message: "successfully sent" });
});

router.put("/user", (req, res) => {
  res.status(200).json({ message: "successfully sent" });
});

router.post("/user/signup", checkEmailExist, signup);

router.delete("/user", (req, res) => {
  res.status(200).json({ message: "successfully sent" });
});

export default router;
