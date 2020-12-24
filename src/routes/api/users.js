
import express from "express";

const router = express.Router();

router.post("/user/login", (req, res, next) => {
  res.json({ message: "successfully sent query" });
});

export default router;



