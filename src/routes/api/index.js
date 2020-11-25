import express from "express";
import User from "./users.js";

const router = express.Router();

router.use("/", User);

export default router;
