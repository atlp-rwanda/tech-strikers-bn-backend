const router = require("express").Router();
const passport = require("passport");
const User = require("../../database/models/user");

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

module.exports = router;
