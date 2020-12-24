import express from "express";
import api from "./api/index.js";


const router = express.Router();
const apiVersion = process.env.API_VERSION;
const baseUrl = `/api/${apiVersion}`;

router.get("/api", (req, res) => {
  res.status(200).json({ message: "Well Connected api" });
});

router.use(baseUrl, api);

export default router;
