import express from "express";
import tokenAuth from "../../middlewares/tokenAuthentication";
import commentsController from "../../controllers/comment.controller";

const router = express.Router();
const { addComment, getAllComments } = commentsController;

router.post("/request/comment/:id", tokenAuth, addComment);
router.get("/request/comment/:id", tokenAuth, getAllComments);

export default router;
