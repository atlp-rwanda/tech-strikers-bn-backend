import express from "express";
import tokenAuth from "../../middlewares/tokenAuthentication";
import commentsController from "../../controllers/comment.controller";
import checkblockedtoken from "../../middlewares/blacklist";

const router = express.Router();
const { addComment, getAllComments } = commentsController;
const { checklisted } = checkblockedtoken
router.post("/request/comment/:id",checklisted, tokenAuth, addComment);
router.get("/request/comment/:id", checklisted,tokenAuth, getAllComments);

export default router;
