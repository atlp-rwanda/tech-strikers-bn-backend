import express from "express";
import User from "./users.route";
import Request from "./request.route";
import Comment from "./comment.route";
import tripRequest from "./tripRequest.route";
import i18n from "../../utils/i18n";
import Accommodation from "./accommodation.route"
const router = express.Router();

router.use(i18n.init);
router.use("/", User);
router.use("/", Comment);
router.use("/", tripRequest);
router.use("/", Request);
router.use("/",Accommodation);


export default router;
