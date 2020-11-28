import express from "express";
import login from "../../controllers/authController.js";
import validUser from "../../validation/index.js";
const router = express.Router();

router.post("/auth/signIn", async(req, res, next) => {
});

router.put("/user", (req, res, next) => {
  res.status(200).json({
    message: "successfully sent"
  });
});

router.post("/user/register", (req, res) => {
  
});

router.post("/user", (req, res, next) => {
  res.status(200).json({
    message: "successfully sent"
  });
});

router.post("/auth/siginIn",validUser,login);
export default router;
