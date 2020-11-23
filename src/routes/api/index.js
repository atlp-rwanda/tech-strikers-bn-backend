import express from "express";
import User from "./users.route";

const router = express.Router();

router.use("/", User);

export default router;
