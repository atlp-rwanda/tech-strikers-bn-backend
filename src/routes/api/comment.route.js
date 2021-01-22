import express from "express";
import tokenAuth from "../../middlewares/tokenAuthentication";
import commentsController from "../../controllers/comment.controller";
import checkblockedtoken from "../../middlewares/blacklist";
import commentValidation from "../../validation/comment";

const router = express.Router();

const { checklisted } = checkblockedtoken;
const { addComment, getAllComments, deleteComment } = commentsController;

router.post("/request/comment/:id", checklisted, tokenAuth, commentValidation, addComment);
router.get("/request/comment/:id", checklisted, tokenAuth, getAllComments);
router.delete("/request/comment/:id", checklisted, tokenAuth, deleteComment);

export default router;
