import express from "express";
import User from "./users";

const router = express.Router();

router.use("/", User);

export default router;
