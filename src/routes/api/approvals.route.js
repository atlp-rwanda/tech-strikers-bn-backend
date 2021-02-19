import express from "express";
import approvalsController from "../../controllers/approvals.controller";

const router = express.Router();
const { getAllPendingRequests } = approvalsController;
router.get("/approvals", getAllPendingRequests);


export default router;