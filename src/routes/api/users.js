import express from "express";
import checkblockedtoken from "../../middlewares/blacklist"
import tokenlist from "../../controllers/list.controllers"

const router = express.Router();
const { checklisted } = checkblockedtoken
const { listed } = tokenlist
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

router.post("/user/login", checklisted, (req, res, next) => {
  res.status(200).json({
    message: "successfully sent"
  });
});
router.post("/v1/user/logout", checklisted, listed);
router.post("/user", (req, res, next) => {
  res.status(200).json({
    message: "successfully sent"
  });
});

export default router;
