import express from "express";

const router = express.Router();

router.get("/user", (req, res, next) => {
  res.status(200).json({
    message: "successfully sent query"
  });
});

router.put("/user", (req, res, next) => {
  res.status(200).json({
    message: "successfully sent"
  });
});

router.post("/user/login", (req, res, next) => {
  res.status(200).json({
    message: "successfully sent"
  });
});

router.post("/user", (req, res, next) => {
  res.status(200).json({
    message: "successfully sent"
  });
});

export default router;
