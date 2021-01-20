import express from "express";
import User from "./users.route";
import Comment from "./comment.route";
import i18n from "../../utils/i18n";
import tripRequest from "./tripRequest.route";

const router = express.Router();

router.use(i18n.init);
router.use("/", User);
router.use("/", Comment);
router.use("/", tripRequest);

export default router;
